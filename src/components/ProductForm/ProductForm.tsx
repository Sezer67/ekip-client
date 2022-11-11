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
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { icons } from "../../constants";
import { imageHelper } from "../../helpers";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setSelectedProduct } from "../../redux/productSlice/productSlice";
import { setNotification } from "../../redux/userSlice/notificationSlice";
import { productService } from "../../service";
import {
  CreateProductType,
  UpdateProductType,
} from "../../types/product-service.type";
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
  const [form] = Form.useForm();

  const selectedProduct = useAppSelector(
    (state) => state.product.selectedProduct
  );
  const categoryState = useAppSelector((state) => state.category.initialState);

  const location = useLocation();
  const dispatch = useAppDispatch();

  const handleImageChange: UploadProps["onChange"] = ({ fileList }) => {
    fileList.forEach((a) => (a.status = "success"));
    setImageList(fileList);
  };

  useEffect(() => {
    const getProductById = async (id: string) => {
      const { data } = await productService.getProductById(id);
      dispatch(setSelectedProduct(data));
      setIsLoading(false);
    };

    if (!selectedProduct.id) {
      setIsLoading(true);
      const productId = location.pathname.split("product/edit/")[1];
      getProductById(productId);
    }
  }, [selectedProduct, dispatch, location.pathname]);

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

    values.categories.forEach((option, index) => {
      if (option.value) categoryIds.push(option.value);
      else categoryIds.push(option as never);
    });
    const formData: CreateProductType = {
      categories: categoryIds,
      name: values.name,
      images: imageUrls.length > 0 ? imageUrls : null,
      price: Number(values.price),
      stock: Number(values.stock),
      description: values.description.trim(),
    };

    try {
      if (isEdit) {
        const editFormData: UpdateProductType = {
          ...formData,
        };
        if (selectedProduct.images) {
          selectedProduct.images.forEach((uri) => {
            imageUrls.push(uri);
          });
        }

        if (imageUrls.length > 0) {
          editFormData.images = imageUrls;
        }
        const { data } = await productService.updateProductById(
          selectedProduct.id,
          editFormData
        );
        dispatch(setSelectedProduct(data));
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
      if (!isEdit) {
        form.resetFields();
      }
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
  };

  if (isEdit && !selectedProduct.id) {
    return <Loading loading={isLoading} />;
  }

  return (
    <div className="relative">
      <Form
        layout="vertical"
        onFinish={handleSave}
        form={form}
        initialValues={{
          name: isEdit ? selectedProduct.name : undefined,
          price: isEdit ? selectedProduct.price : undefined,
          stock: isEdit ? selectedProduct.stock : undefined,
          description: isEdit ? selectedProduct.description : undefined,
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
            className="w-full sm:w-[500px]"
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
          label={FormDataVariables.names.descriptionn.label}
          name={FormDataVariables.names.descriptionn.name}
        >
          <Input.TextArea
            rows={4}
            maxLength={5000}
            className="!max-w-[500px]"
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
              <Input
                disabled
                value={selectedProduct.showCount}
                className="max-w-[500px]"
              />
            </Form.Item>
            <Form.Item label="Satışa Sunulduğu Tarih">
              <Input
                className="max-w-[500px]"
                disabled
                value={moment(selectedProduct.createdAt.toString()).format(
                  "DD/MM/YYYY HH:mm"
                )}
              />
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
