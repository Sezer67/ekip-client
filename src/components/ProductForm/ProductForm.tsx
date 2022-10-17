import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  Spin,
  Upload,
  UploadFile,
  UploadProps,
} from "antd";
import React, { useEffect, useState } from "react";
import { icons } from "../../constants";
import { imageHelper } from "../../helpers";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setNotification } from "../../redux/userSlice/notificationSlice";
import { productService } from "../../service";
import { CreateProductType } from "../../types/product-service.type";
import Loading from "../Loading/Loading";
import {
  FormDataType,
  FormDataVariables,
  PropType,
} from "./product-form.config";

const ProductForm: React.FC<PropType> = ({ isEdit }) => {
  const [imageList, setImageList] = useState<UploadFile[]>([]);
  const [selectImage, setSelectImage] = useState<{
    url: string;
    visible: boolean;
  }>({ url: "", visible: false });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const selectedProduct = useAppSelector(
    (state) => state.product.selectedProduct
  );
  const categoryState = useAppSelector((state) => state.category.initialState);

  const dispatch = useAppDispatch();

  const handleImageChange: UploadProps["onChange"] = ({ fileList }) => {
    fileList.forEach((a) => (a.status = "success"));
    setImageList(fileList);
  };

  const handleSave = async (values: FormDataType) => {
    // loading
    setIsLoading(true);
    let imageUrls: string[] = [];
    let categoryIds: string[] = [];
    for await (const image of imageList) {
      if (image.originFileObj) {
        const uri = await imageHelper.fileToDataUri(image.originFileObj);
        imageUrls.push(uri.split("base64,")[1]);
      }
    }
    debugger;

    values.categories.forEach((option, index) => {
      categoryIds.push(option.value);
    });
    const formData: CreateProductType = {
      categories: categoryIds,
      name: values.name,
      images: imageUrls.length > 0 ? imageUrls : null,
      price: Number(values.price),
      stock: Number(values.stock),
    };

    try {
      if (isEdit) {
      } else {
        const { data } = await productService.createProdutc(formData);
      }
      dispatch(
        setNotification({
          isNotification: true,
          message: "İşlem Başarılı",
          description: isEdit
            ? "Ürün Güncellemesi Başarılı"
            : "Yeni ürününüz satışa sunuldu",
          placement: "top",
          status: "success",
        })
      );
    } catch (error: any) {
      dispatch(
        setNotification({
          isNotification: true,
          message: "İşlem Başarısız",
          description: error.message,
          placement: "top",
          status: "error",
        })
      );
    } finally {
      setIsLoading(false);
    }
    console.log(formData);
  };

  return (
    <div className="relative">
      <Loading loading={isLoading} />
      <Form
        layout="vertical"
        onFinish={handleSave}
        initialValues={{
          name: isEdit ? selectedProduct.name : undefined,
          price: isEdit ? selectedProduct.price : undefined,
          stock: isEdit ? selectedProduct.stock : undefined,
          categories: isEdit ? selectedProduct.categories : [],
        }}
      >
        {isEdit &&
        selectedProduct.images &&
        selectedProduct.images.length >= 4 ? null : (
          <Form.Item
            label={FormDataVariables.names.images.label}
            name={FormDataVariables.names.images.name}
          >
            <Upload
              action="/"
              listType="picture-card"
              fileList={imageList}
              onChange={handleImageChange}
              onPreview={(file) =>
                setSelectImage({ url: file.thumbUrl || "", visible: true })
              }
              className="bg-transparent"
            >
              {isEdit && selectedProduct.images ? (
                selectedProduct.images?.length + imageList.length >=
                4 ? null : (
                  <img src={icons.image} alt="icon" />
                )
              ) : imageList.length >= 4 ? null : (
                <img src={icons.image} alt="icon" />
              )}
            </Upload>
          </Form.Item>
        )}
        <Form.Item
          rules={[
            { required: true, message: FormDataVariables.rules.name.message },
          ]}
          label={FormDataVariables.names.name.label}
          name={FormDataVariables.names.name.name}
        >
          <Input autoComplete="off" className="max-w-[500px]" />
        </Form.Item>
        <Form.Item
          rules={[
            { required: true, message: FormDataVariables.rules.price.message },
          ]}
          label={FormDataVariables.names.price.label}
          name={FormDataVariables.names.price.name}
        >
          <InputNumber
            stringMode
            min={0}
            style={{ width: "500px" }}
            className="w-[500px]"
            addonAfter="₺"
          />
        </Form.Item>
        <Form.Item
          rules={[
            { required: true, message: FormDataVariables.rules.stock.message },
          ]}
          label={FormDataVariables.names.stock.label}
          name={FormDataVariables.names.stock.name}
        >
          <Input
            type="number"
            min={1}
            className="max-w-[500px]"
            addonAfter="adet"
          />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              message: FormDataVariables.rules.categories.message,
            },
          ]}
          label={FormDataVariables.names.categories.label}
          name={FormDataVariables.names.categories.name}
        >
          <Select
            defaultValue={isEdit ? selectedProduct.categories : []}
            labelInValue
            mode="multiple"
            className="max-w-[500px]"
          >
            {categoryState.map((option) => (
              <Select.Option key={option.id}>{option.name}</Select.Option>
            ))}
          </Select>
        </Form.Item>
        {isEdit && (
          <>
            <Form.Item label="Tıklanma Sayısı">
              <Input disabled value={selectedProduct.showCount} />
            </Form.Item>
            <Form.Item label="Satışa Sunulduğu Tarih">
              <Input disabled value={selectedProduct.createdAt.toString()} />
            </Form.Item>
          </>
        )}
        <Form.Item className="max-w-[500px] flex flex-row justify-end ">
          <Button type="primary" htmlType="submit">
            Kaydet
          </Button>
        </Form.Item>
      </Form>
      <Modal
        visible={selectImage.visible}
        footer={null}
        title={null}
        onCancel={() => setSelectImage({ url: "", visible: false })}
        width={500}
        bodyStyle={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          src={selectImage.url}
          alt="clicked-img"
          className="object-contain"
        />
      </Modal>
    </div>
  );
};

export default ProductForm;
