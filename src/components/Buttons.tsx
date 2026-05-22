import React from "react";

interface ButtonProps {
  onClick: () => void;
  title: string;
  disabled: boolean;
}

function Buttons({ onClick, title, disabled }: ButtonProps) {
  return (
    <div className="flex justify-center p-1">
      <button
        onClick={onClick}
        disabled={disabled}
        className={`
          w-36 rounded-xl px-5 py-3 text-sm font-semibold text-white
          shadow-sm transition duration-200
          ${
            disabled
              ? "cursor-not-allowed bg-emerald-300"
              : "bg-emerald-500 hover:bg-emerald-600 active:scale-95"
          }
        `}
      >
        {title}
      </button>
    </div>
  );
}

export default Buttons;