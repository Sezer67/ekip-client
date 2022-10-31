import { ideaEnum } from "../enums";
import { UserType } from "../redux/types/user.types";

export type IdeaCreateFormDataType = {
  subject: string;
  type: ideaEnum.Idea;
  description: string;
};

export type IdeaType = {
  id: string;
  type: ideaEnum.Idea;
  subject: string;
  description: string;
  createdAt: Date;
  answer: string | null;
  answerAt: Date | null;
  userId: UserType;
};
