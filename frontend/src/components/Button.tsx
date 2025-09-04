import type { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
}

export default function Button({ text, ...props }: Props) {
  return (
    <button
      {...props}
      className="w-[399px] h-[59px] rounded-[10px] bg-blue-500 
                 text-white font-medium text-base hover:bg-blue-600 transition-colors"
    >
      {text}
    </button>
  );
}
