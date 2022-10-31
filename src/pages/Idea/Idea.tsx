import { Button, Collapse, Form, Input, Select, Tooltip } from "antd";
import TextArea from "antd/lib/input/TextArea";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { icons } from "../../constants";
import { ideaEnum } from "../../enums";
import { useAppDispatch } from "../../redux/hooks";
import { setNotification } from "../../redux/userSlice/notificationSlice";
import { ideaService } from "../../service";
import { IdeaType } from "../../types/idea-service.type";

const Idea = () => {
  const [ideas, setIdeas] = useState<IdeaType[]>([]);
  const [isHistoryShow, setIsHistoryShow] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const getMyIdeas = async () => {
      try {
        const { data } = await ideaService.getMyIdeas();
        setIdeas(data);
      } catch (error) {
        console.log(error);
      }
    };
    getMyIdeas();
  }, []);

  const handleOnFinish = async (values: {
    subject: string;
    type: { key: ideaEnum.Idea };
    description: string;
  }) => {
    try {
      const formData = {
        ...values,
        type: ideaEnum.Idea[values.type.key],
      };
      const { data } = await ideaService.createIdea(formData as any);
      setIdeas([data, ...ideas]);
      dispatch(
        setNotification({
          message: "Görüşünüz Yöneticiye İletildi",
          description: "Görüşleriniz bizim için çok değerli",
          isNotification: true,
          placement: "top",
          status: "success",
        })
      );
    } catch (error: any) {
      dispatch(
        setNotification({
          message: "Görüşünüz Yöneticiye İletilemedi",
          description: `${error.response.data.message} `,
          isNotification: true,
          placement: "top",
          status: "error",
        })
      );
    }
  };

  const handleHistoryShow = () => {
    setIsHistoryShow(!isHistoryShow);
  };

  const CollapseHeader: React.FC<{ subject: string; date: Date }> = ({
    subject,
    date,
  }) => {
    return (
      <div className="flex flex-row justify-between items-center">
        <div>
          <span className="text-primary font-semibold">ÖNERİ</span>
          <span className="pl-3 capitalize">{subject}</span>
        </div>
        <span className="text-sm">
          {moment(date).format("DD/MM/YYYY HH:mm")}
        </span>
      </div>
    );
  };
  return (
    <div className="p-3 h-full">
      {isHistoryShow ? (
        <div className="w-full h-full flex justify-center">
          <div className="w-full">
            <Collapse accordion defaultActiveKey={ideas[0].id} bordered>
              {ideas.map((idea) => (
                <Collapse.Panel
                  showArrow={false}
                  className="py-2"
                  header={
                    <CollapseHeader
                      subject={idea.subject}
                      date={idea.createdAt}
                    />
                  }
                  key={idea.id}
                >
                  <div>
                    <div className="flex flex-col px-2">
                      <span className="text-sm text-thirdy font-semibold">
                        Sizin açıklamanız
                      </span>
                      <span className="indent-4 px-2 text-secondary">
                        {idea.description}
                      </span>
                    </div>
                    {idea.answer ? (
                      <div className="flex flex-col px-2 pt-3 border-t">
                        <div className="w-full flex flex-row justify-between">
                          <span className="text-sm text-primary font-semibold">
                            Yöneticinin Yanıtı
                          </span>
                          <span className="text-sm text-thirdy">
                            {moment(idea.answerAt).format("DD/MM/YYYY HH:mm")}
                          </span>
                        </div>
                        <span className="indent-4 px-2 text-primary">
                          {idea.description}
                        </span>
                      </div>
                    ) : (
                      <div className="mt-4">
                        <span className="text-thirdy font-bold ">
                          Yöneticiden yanıt bekleniyor...
                        </span>
                      </div>
                    )}
                  </div>
                </Collapse.Panel>
              ))}
            </Collapse>
          </div>
        </div>
      ) : (
        <div className="w-full h-full flex justify-center items-center">
          <div className="w-full sm:w-3/4 lg:w-1/2 bg-white rounded-md shadow-md py-3 px-6">
            <h3 className="text-primary font-bold my-4">
              ÖNERİ VE ŞİKAYET KUTUSU
            </h3>
            <Form layout="vertical" onFinish={handleOnFinish}>
              <Form.Item
                name="subject"
                rules={[
                  {
                    required: true,
                    message: "Konu Başlığı Zorunludur!",
                  },
                ]}
              >
                <Input placeholder="Konu" />
              </Form.Item>
              <Form.Item
                name="type"
                rules={[
                  {
                    required: true,
                    message: "Mesaj Türü Zorunludur!",
                  },
                ]}
              >
                <Select labelInValue placeholder="Bu bir öneri mesajıdır...">
                  {Object.keys(ideaEnum.Idea)
                    .slice(2, 4)
                    .map((key) => {
                      return (
                        <Select.Option key={key}>
                          {ideaEnum.IdeaTexts[key as never]}
                        </Select.Option>
                      );
                    })}
                </Select>
              </Form.Item>
              <Form.Item
                name="description"
                rules={[
                  {
                    required: true,
                    message: "Açıklama Zorunludur!",
                  },
                ]}
              >
                <TextArea rows={6} placeholder="Açıklama..." />
              </Form.Item>
              <Form.Item>
                <Button
                  className="float-right"
                  type="primary"
                  htmlType="submit"
                >
                  Gönder
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      )}

      {ideas.length > 0 && (
        <div className="absolute bottom-10 right-10">
          <Tooltip title="Geçmiş Öneri ve Şikayetlerim">
            <button
              onClick={handleHistoryShow}
              className="w-11 h-11 shadow-md flex justify-center items-center bg-white rounded-full"
            >
              <img
                alt=""
                src={isHistoryShow ? icons.back_page : icons.history}
              />
            </button>
          </Tooltip>
        </div>
      )}
    </div>
  );
};

export default Idea;
