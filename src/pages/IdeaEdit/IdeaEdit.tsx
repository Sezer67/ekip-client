import { Button } from "antd";
import TextArea from "antd/lib/input/TextArea";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { pathEnum } from "../../enums";
import { Idea, IdeaTexts } from "../../enums/idea.enum";
import { routeHelper } from "../../helpers";
import { useAppDispatch } from "../../redux/hooks";
import { setNotification } from "../../redux/userSlice/notificationSlice";
import { ideaService } from "../../service";
import { IdeaType } from "../../types/idea-service.type";

const IdeaEdit = () => {
  const [idea, setIdea] = useState<IdeaType>();
  const [answer, setAnswer] = useState<string>("");
  const [isFocus, setIsFocus] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    const getIdea = async () => {
      const id = location.pathname.split(pathEnum.Path.USERIDEA.concat("/"))[1];
      try {
        const { data } = await ideaService.ideaById(id);
        setIdea(data);
        if (data.answer) setAnswer(data.answer);
      } catch (error) {
        dispatch(
          setNotification({
            message: "Hata",
            description: "Aradığınız fikir bulunamadı.",
            isNotification: true,
            placement: "top",
            status: "error",
          })
        );
      }
    };
    getIdea();
  }, [location, dispatch]);

  const handleIdeaUpdate = async () => {
    if (answer.trim().length < 1) {
      dispatch(
        setNotification({
          message: "Dikkat",
          description: "Yanıt alanını doldurmadınız.",
          isNotification: true,
          placement: "top",
          status: "error",
        })
      );
      return;
    }
    if (!idea) return;
    try {
      const { data } = await ideaService.updateIdeaById(idea.id, { answer });
      routeHelper.navigation(navigate, pathEnum.Path.USERIDEA);
    } catch (error: any) {
      setNotification({
        message: "Hata",
        description: error.response?.data,
        placement: "top",
        isNotification: true,
        status: "error",
      });
    }
  };

  return (
    <div className="p-3 h-full">
      {idea && (
        <div className="w-full">
          <div className="w-full flex justify-center">
            <h3 className="text-primary text-center font-semibold uppercase pb-2 w-full sm:w-1/2 border-b border-orange">
              {IdeaTexts[Idea[idea.type] as never]}
              {idea.type === Idea.Complaint ? (
                <span className="ml-3">&#128553;</span>
              ) : (
                <span className="ml-3">&#128522;</span>
              )}
            </h3>
          </div>
          <div className="mt-2">
            <span className="text-thirdy">
              &#x2022;{"\t"}
              <span className="text-primary font-semibold">
                {idea.userId.firstName.concat(" ", idea.userId.lastName)}
              </span>{" "}
              tarafından{" "}
              <span className="text-primary font-semibold">
                {moment(idea.createdAt).format("DD/MM/YYYY HH:mm")}
              </span>{" "}
              tarihinde oluşturuldu.
            </span>
          </div>
          <div className="ml-2 mt-2 border-b">
            <p className="text-secondary font-bold text-base mb-1">
              Konu : {idea.subject}
            </p>
          </div>
          <div className="my-1 max-h-[300px] overflow-y-auto">
            <p className="indent-3 px-3 font-sans">{idea.description}</p>
          </div>
          <div>
            <TextArea
              rows={4}
              value={answer}
              placeholder="Yanıtınız..."
              onChange={(e) => setAnswer(e.target.value)}
              className={`${!isFocus ? "!bg-transparent" : "bg-white"}`}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
            />
            {idea.answerAt && (
              <span className="text-thirdy ml-1 mb-3">
                <span className="text-primary font-semibold">
                  {moment(idea.answerAt).format("DD/MM/YYYY HH:mm")}
                </span>
                {"\t"}
                tarihinde yanıtlandı.
              </span>
            )}
            <Button
              onClick={handleIdeaUpdate}
              htmlType="submit"
              type="primary"
              className="float-right mt-3"
            >
              Yanıtla
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default IdeaEdit;
