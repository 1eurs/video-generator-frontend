import React from "react";

const PreviewText = ({ formData }) => {
  const {
    text,
    fontFamily,
    fontSize,
    textColor,
    bold,
    italic,
    underline,
    alignment,
    backgroundColor,
  } = formData;

  const textStyle = {
    fontFamily,
    fontSize: `${fontSize}px`,
    color: textColor,
    fontWeight: bold ? "bold" : "normal",
    fontStyle: italic ? "italic" : "normal",
    textDecoration: underline ? "underline" : "none",
    backgroundColor: backgroundColor,
  };

  const getAlignmentClasses = (alignment) => {
    switch (alignment) {
      case "bottom-left":
        return "items-end justify-start";
      case "bottom-center":
        return "items-end justify-center";
      case "bottom-right":
        return "items-end justify-end";
      case "top-left":
        return "items-start justify-start";
      case "top-center":
        return "items-start justify-center";
      case "top-right":
        return "items-start justify-end";
      case "middle-left":
        return "items-center justify-start";
      case "middle-center":
        return "items-center justify-center";
      case "middle-right":
        return "items-center justify-end";
      default:
        return "items-end justify-end";
    }
  };

  const alignmentClasses = getAlignmentClasses(alignment);

  return (
    <div
      className={`flex ${alignmentClasses} p-2`}
      style={{ position: "relative", height: "100%" }}
    >
      <div style={textStyle}>{text}</div>
    </div>
  );
};

export default PreviewText;
