import React from "react";
import ProductForm from "../../components/ProductForm/ProductForm";

const AddProduct = () => {
  return (
    <div className="m-3 ">
      <div className="w-full md:max-w-[500px]">
        <ProductForm isEdit={false} />
      </div>
    </div>
  );
};

export default AddProduct;
