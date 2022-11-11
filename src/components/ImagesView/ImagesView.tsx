import { Image } from "antd";
import React, { useState } from "react";
import { imageHelper } from "../../helpers";

type PropsType = {
  images: string[];
};

const { PreviewGroup } = Image;

const ImagesView: React.FC<PropsType> = ({ images }) => {
  const [visible, setVisible] = useState<boolean>(false);

  if (images.length === 1) {
    return (
      <div className="w-full">
        <img
          className=" object-contain rounded-md"
          src={imageHelper.getBase64(images[0])}
          alt=""
        />
      </div>
    );
  } else if (images.length >= 2) {
    return (
      <div className="w-full flex flex-row flex-wrap">
        <img
          className="w-1/2 pr-1 object-cover rounded-l-md cursor-pointer"
          src={imageHelper.getBase64(images[0])}
          alt=""
          onClick={() => setVisible(true)}
        />
        <img
          className="w-1/2 pl-1 object-cover rounded-r-md cursor-pointer"
          src={imageHelper.getBase64(images[1])}
          alt=""
          onClick={() => setVisible(true)}
        />
        <div className="hidden">
          <PreviewGroup
            preview={{ visible, onVisibleChange: (value) => setVisible(value) }}
          >
            {images.map((data) => (
              <Image src={imageHelper.getBase64(data)} className="!w-80" />
            ))}
          </PreviewGroup>
        </div>
      </div>
    );
  }
  return <></>;
};

export default ImagesView;
