import React, { useState } from "react";

const TextInput = ({ label, name, value, onChange, placeholder, type }) => {
  const [isTransparent, setIsTransparent] = useState(value === "transparent");

  const handleChange = (e) => {
    if (name === "backgroundColor" && isTransparent) {
      setIsTransparent(false);
      onChange(name, "#ffffff");
    } else {
      onChange(name, e.target.value);
    }
  };

  const handleDoubleClick = () => {
    if (type === "color" && name === "backgroundColor") {
      const newValue = isTransparent ? "#ffffff" : "transparent";
      setIsTransparent(!isTransparent);
      onChange(name, newValue);
    }
  };

  return (
    <div className="mb-6">
      <label className="block text-white text-sm font-medium mb-2">
        {label}:
      </label>
      <input
        type={
          name === "textColor" || name === "backgroundColor" ? "color" : "text"
        }
        placeholder={placeholder}
        name={name}
        value={isTransparent ? "#ffffff" : value}
        className={`w-full p-3 text-gray-700 bg-white border ${
          isTransparent ? "border-red-500" : "border-gray-300"
        } rounded-md shadow-sm leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out`}
        onChange={handleChange}
        onDoubleClick={handleDoubleClick}
      />
    </div>
  );
};

export default TextInput;
