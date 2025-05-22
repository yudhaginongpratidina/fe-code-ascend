"use client"
import { useRef } from "react";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    name: string;
    options: { value: any; label: string }[];
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;

    required: boolean
    disabled: boolean
    isLoading: boolean
    isError: boolean
}

export default function Select({ name, options, onChange, required = false, disabled = false, isLoading = false, isError = false, ...props }: SelectProps) {
    const selectRef = useRef<HTMLSelectElement>(null);
    const selectClass =
        `w-full p-2.5 rounded-sm outline-none border border-gray-200 focus:shadow focus:shadow duration-150 ` +
        (isLoading ? "bg-gray-100 cursor-not-allowed" : "") +
        (isError ? "border-red-600" : "border-gray-200");

    return (
        <div className="w-full select-none">
            <div className="w-full relative">
                <select
                    id={name}
                    name={name}
                    ref={selectRef}
                    disabled={disabled}
                    onChange={onChange}
                    {...props}
                    className={selectClass}
                >
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}