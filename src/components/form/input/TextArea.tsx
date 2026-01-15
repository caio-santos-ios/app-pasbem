import { TextareaHTMLAttributes, forwardRef } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  placeholder?: string; 
  rows?: number; 
  className?: string; 
}

const TextArea = forwardRef<HTMLTextAreaElement, TextareaProps>(({
  placeholder = "Digite", 
  rows = 3, 
  className = "", 
  ...props
}, ref) => {
  let textareaClasses = `w-full rounded-lg border px-4 py-2.5 text-sm shadow-theme-xs focus:outline-hidden ${className}`;
  textareaClasses += ` bg-transparent text-gray-400 border-gray-300 focus:border-brand-300 focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-brand-800`;

  return (
    <div className="w-full">
      <textarea
        {...props}
        ref={ref}
        placeholder={placeholder}
        rows={rows}
        className={textareaClasses}
      />
    </div>
  );
});

export default TextArea;
