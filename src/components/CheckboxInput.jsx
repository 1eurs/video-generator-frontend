import React from "react";

const CheckboxInput = ({ label, name, checked, onChange }) => {
  return (
    <div className="flex items-center mb-4">
      <input
        id={name}
        type="checkbox"
        name={name}
        checked={checked}
        onChange={(e) => onChange(name, e.target.checked)}
        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
      />
      <label
        htmlFor={name}
        className="ml-2 text-sm font-medium text-white dark:text-gray-300"
      >
        {label}
      </label>
    </div>
  );
};

export default CheckboxInput;
