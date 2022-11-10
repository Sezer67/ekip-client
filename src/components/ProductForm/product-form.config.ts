export type PropType = {
  isEdit: boolean;
};

export type FormDataType = {
  name: string;
  price: number;
  stock: number;
  images: any[];
  categories: SelectType[];
  description: string;
};
type SelectType = {
  key: string;
  label: string;
  value: string;
};
export const FormDataVariables = {
  names: {
    name: {
      label: "Ürün Adı",
      name: "name",
    },
    price: {
      label: "Ürün Fiyatı",
      name: "price",
    },
    stock: {
      label: "Stok",
      name: "stock",
    },
    images: {
      label: "Görseller",
      name: "images",
    },
    categories: {
      label: "Hangi Kategoriye/Kategorilere Ait",
      name: "categories",
    },
    descriptionn: {
      label: "Ürün Hakkında",
      name: "description",
    },
  },
  rules: {
    name: {
      message: "Ürün Adı Zorunludur!",
    },
    price: {
      message: "Fiyat Girmek Zorunludur!",
    },
    stock: {
      message: "Stok Adedi Zorunludur!",
    },
    categories: {
      message: "Kategori Seçmediniz!",
    },
  },
};
