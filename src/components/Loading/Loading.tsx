import { Spin } from "antd";
import React from "react";

const Loading: React.FC<{ loading: boolean }> = ({ loading }) => {
  if (loading) {
    return (
      <div className="absolute w-full h-[100vh] flex justify-center items-center z-50 bg-transparent">
        <Spin size="large" />
      </div>
    );
  } else {
    return <></>;
  }
};

export default Loading;
