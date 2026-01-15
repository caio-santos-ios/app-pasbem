import React, { FC, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface LabelProps {
  htmlFor?: string;
  label: string;
  required?: boolean;
  className?: string;
}

const LabelForm: FC<LabelProps> = ({ htmlFor, label, required = true, className }) => {
  return (
    <label
      htmlFor={htmlFor}
      className={twMerge("mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400",   className)}>
      {label}
      {
        required &&
        <span className="text-error-500 ms-1">*</span>
      }
    </label>
  );
};

export default LabelForm;
