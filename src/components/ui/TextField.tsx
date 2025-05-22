import React, { useRef, useState, memo } from "react";
import { FaEye } from "react-icons/fa";

type TextFieldProps = {
    type: "text" | "password" | "email" | "number" | "tel" | "url" | "search"
    name: string
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void

    required: boolean
    disabled: boolean
    isLoading: boolean
    isError: boolean
} & React.InputHTMLAttributes<HTMLInputElement>;

const TextField = ({ type, name, value, onChange, required = false, disabled = false, isLoading = false, isError = false }: TextFieldProps) => {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const isDisabled = disabled || isLoading;
    const inputClass =
        `w-full p-2.5 rounded-sm outline-none border border-gray-200 focus:shadow focus:shadow duration-150 ` +
        (isLoading ? "bg-gray-100 cursor-not-allowed" : "") +
        (isError ? "border-red-600" : "border-gray-200");

    return (
        <div className="w-full relative">
            {type === "password"
                ? <input ref={inputRef} type={showPassword ? "text" : "password"} id={name} name={name} value={value} onChange={onChange} required={required} disabled={isDisabled} className={inputClass} />
                : <input ref={inputRef} type={type} id={name} name={name} value={value} onChange={onChange} required={required} disabled={isDisabled} className={inputClass} />
            }
            {type === "password" && (
                <button
                    type="button"
                    className="absolute top-1/2 right-2.5 -translate-y-1/2 text-sm hover:cursor-pointer duration-150"
                    onClick={() => setShowPassword(!showPassword)}
                ><FaEye className="w-4 h-4" /></button>
            )}
        </div>
    );
};

export default memo(TextField);