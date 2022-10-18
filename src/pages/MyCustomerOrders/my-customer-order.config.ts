export type OrderTableDataTypes = {
  name: string;
  piece: number;
  customer: string;
  date: string;
  takings: number;
  status: StatusType;
  actions: string;
};

type StatusType = "ONAY BEKLENİYOR" | "REDDEDİLDİ" | "ONAYLANDI";
