import type { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export default function Input({ label, ...props }: Props) {
  return (
    <div className="relative w-[399px] mb-6">
      <input
        {...props}
        className="w-full h-[59px] rounded-[10px] border-1 border-[#D9D9D9] 
                   px-2 pb-1 text-base text-gray-900 
                   focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <label
        className="
          absolute -top-2 left-4 bg-white px-1 text-sm text-gray-500
        "
      >
        {label}
      </label>
    </div>
  );
}
