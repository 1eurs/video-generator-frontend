import React from "react";
import PreviewText from "./PreviewText";

const PreviewRatio = ({ formData }) => {
  const ratioClass =
    formData.aspectRatio === "16:9"
      ? "w-[540px] h-[350px]"
      : "w-[320px] h-[540px]";

  return (
    <div className={`bg-black ${ratioClass}`}>
      <PreviewText formData={formData} />
    </div>
  );
};

export default PreviewRatio;
