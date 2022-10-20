export type OrderTableDataTypes = {
  id: string;
  name: string;
  piece: number;
  customer: string;
  date: string;
  answerDate: string | undefined;
  takings: number;
  status: StatusType;
  actions: string;
};

type StatusType = "ONAY BEKLENİYOR" | "REDDEDİLDİ" | "ONAYLANDI";

export type StatusFilterDataTypeForTable = {
  text: StatusType;
  value: StatusType;
}[];

export const StatusFilterDatas: StatusFilterDataTypeForTable = [
  {
    text: "ONAY BEKLENİYOR",
    value: "ONAY BEKLENİYOR",
  },
  {
    text: "ONAYLANDI",
    value: "ONAYLANDI",
  },
  {
    text: "REDDEDİLDİ",
    value: "REDDEDİLDİ",
  },
];
