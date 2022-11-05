import { Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Idea, IdeaTexts } from "../../enums/idea.enum";
import { UserType } from "../../redux/types/user.types";
import { ideaService } from "../../service";
import { IdeaType } from "../../types/idea-service.type";

const UsersIdea = () => {
  const [userIdeas, setUserIdeas] = useState<IdeaType[]>([]);
  useEffect(() => {
    const getAllIdeas = async () => {
      try {
        const { data } = await ideaService.allIdeas();
        setUserIdeas(data);
      } catch (error) {
        console.log(error);
      }
    };
    getAllIdeas();
  }, []);

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
  ];

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
          columns={columns}
          dataSource={userIdeas}
        />
      </div>
    </div>
  );
};

export default UsersIdea;
