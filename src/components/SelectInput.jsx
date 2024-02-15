import React from "react";

const SelectInput = ({ label, name, options, value, onChange }) => {
  return (
    <div className="w-full mb-4">
      <label className="block text-white text-sm font-medium mb-2">
        {label}:
      </label>
      <select
        name={name}
        value={value}
        className="w-full p-3 border border-gray-300 rounded-md shadow-sm bg-white text-gray-700 leading-tight focus:outline-none focus:shadow-outline hover:border-gray-400"
        onChange={(e) => onChange(name, e.target.value)}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {typeof option === "string"
              ? option.replace("text-", "").charAt(0).toUpperCase() +
                option.replace("text-", "").slice(1)
              : option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectInput;
