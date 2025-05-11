import { Plus } from "lucide-react";

interface ButtonProps {
  text: string;
  onClick?: () => void | Promise<void>;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

const Button = ({ text, onClick, type = "button", disabled }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 transition"
    >
      <Plus className="w-4 h-4" />
      {text}
    </button>
  );
};

export default Button;
