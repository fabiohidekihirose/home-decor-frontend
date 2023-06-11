interface ButtonProps {
  text: string;
  className?: string;
}

export default function Button({ text, className = undefined }: ButtonProps) {
  return (
    <button
      className={`bg-[#30628b] hover:bg-[#4186BE] h-[40px] rounded-[10px] text-[#ffffff] ${className}`}
    >
      {text}
    </button>
  );
}
