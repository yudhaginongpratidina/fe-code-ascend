import React, { memo } from "react";

interface ButtonProps {
    type: "submit" | "reset" | "button";
    name: string;
    disabled: boolean;
    isLoading: boolean;
    fullWidth: boolean;
    className?: string;
}

const Button = ({ type, name, disabled, isLoading, fullWidth, className = "" }: ButtonProps) => {
    const isButtonDisabled = disabled || isLoading;

    const baseClass = "px-6 py-2.5 border rounded-sm text-center font-semibold text-md duration-150";
    const widthClass = fullWidth ? "w-full" : "w-fit";
    const cursorClass = isLoading ? "hover:cursor-wait" : "hover:cursor-pointer";

    const combinedClass = `${baseClass} ${widthClass} ${cursorClass} ${className}`;

    return (
        <button type={type} disabled={isButtonDisabled} className={combinedClass}>
            {isLoading ? "Loading..." : name}
        </button>
    );
};

export default memo(Button);