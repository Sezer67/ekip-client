import { Table, Tooltip } from "antd";
import { ColumnsType } from "antd/lib/table";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { gifs, icons } from "../../constants";
import { pathEnum } from "../../enums";
import { Idea, IdeaTexts } from "../../enums/idea.enum";
import { routeHelper } from "../../helpers";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { UserType } from "../../redux/types/user.types";
import { setIsLoading } from "../../redux/userSlice/notificationSlice";
import { ideaService } from "../../service";
import { IdeaType } from "../../types/idea-service.type";

const UsersIdea = () => {
  const [userIdeas, setUserIdeas] = useState<IdeaType[]>([]);
  const loading = useAppSelector((state) => state.notification.isLoading);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const getAllIdeas = async () => {
      try {
        dispatch(setIsLoading({ isLoading: true }));
        const { data } = await ideaService.allIdeas();
        setUserIdeas(data);
      } catch (error) {
        console.log(error);
      } finally {
        dispatch(setIsLoading({ isLoading: false }));
      }
    };
    getAllIdeas();
  }, []);

  const routeIdeaEdit = (id: string) => {
    routeHelper.navigation(navigate, `${pathEnum.Path.USERIDEA}/${id}`);
  };

  const columns: ColumnsType<IdeaType> = [
    {
      title: "Tip",
      dataIndex: "type",
      key: "type",
      render: (value: Idea) => (
        <span className="text-primary font-semibold">
          {IdeaTexts[Idea[value] as never]}
        </span>
      ),
    },
    {
      title: "Konu",
      dataIndex: "subject",
      key: "suject",
      render: (value: string) => (
        <span>
          {value.length > 18 ? value.substring(0, 15).concat("...") : value}
        </span>
      ),
    },
    {
      title: "Gönderici",
      dataIndex: "userId",
      key: "userId",
      render: (value: UserType) => (
        <span>{value.firstName.concat(" ", value.lastName)}</span>
      ),
    },
    {
      title: "Gönderim Tarihi",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (value: Date) => (
        <span className="text-sm text-thirdy">
          {moment(value).format("DD/MM/YYYY HH:mm")}
        </span>
      ),
    },
    {
      title: "Yanıt",
      dataIndex: "answer",
      key: "answer",
      render: (value: string | null) => (
        <span> {value ? "Yanıtlandı" : "Yanıtlanmadı"} </span>
      ),
    },
    {
      title: "Yanıt Tarihi",
      dataIndex: "answerAt",
      key: "answerAt",
      render: (value: Date | null) => (
        <div className="w-full flex justify-center items-center">
          <span>
            {" "}
            {value ? `${moment(value).format("DD/MM/YYYY HH:mm")}` : "-"}{" "}
          </span>
        </div>
      ),
    },
    {
      title: "",
      dataIndex: "actions",
      key: "actions",
      render: (_, record: IdeaType) => (
        <div className="w-full flex flex-row justify-start items-center">
          <Tooltip title="Görüntüle">
            <div
              onClick={() => routeIdeaEdit(record.id)}
              className="w-6 h-6 cursor-pointer"
            >
              <img src={icons.open_mail} alt="" />
            </div>
          </Tooltip>
        </div>
      ),
    },
  ];
  if (loading)
    return (
      <div className="w-full h-full flex justify-center items-center">
        <img alt="" src={gifs.ripple} />
      </div>
    );

  return (
    <div className="p-3">
      <div className="w-full">
        <Table
          locale={{
            triggerAsc: "Artan Sıralama",
            triggerDesc: "Azalan Sıralama",
            cancelSort: "Sıralamayı İptal Et",
            filterReset: false,
            filterConfirm: "Uygula",
          }}
          scroll={{ x: true }}
          columns={columns}
          dataSource={userIdeas}
        />
      </div>
    </div>
  );
};

export default UsersIdea;
