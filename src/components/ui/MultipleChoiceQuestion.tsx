"use client";
import React, { memo } from "react";
import dynamic from "next/dynamic";
import MarkdownContentChoiceQuestion from "@/components/ui/MarkdownContentChoiceQuestion";
const MarkdownContentQuestion = dynamic(() => import('@/components/ui/MarkdownContentQuestion'), { ssr: false });

interface MultipleChoiceQuestionProps {
    id: string;
    question: string;
    options: { value: string; label: string }[];
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    disabled?: boolean;
}

const MultipleChoiceQuestion: React.FC<MultipleChoiceQuestionProps> = ({
    id,
    question,
    options,
    value,
    onChange,
    disabled = false,
}) => {
    return (
        <div className="w-full select-none flex flex-col gap-4">
            <MarkdownContentQuestion content={question} />
            <div className="w-full flex flex-col items-start gap-3">
                {options.map((option, index) => {
                    const inputId = `${id}_${index}`;
                    const isChecked = value === option.value;

                    return (
                        <label
                            key={index + 1}
                            htmlFor={inputId}
                            className={`
                                flex items-center w-full gap-3 px-4 py-3 rounded-md border 
                                cursor-pointer transition-all duration-200
                                ${isChecked ? "bg-black text-white border-black" : "bg-white text-gray-700 border-gray-300"}
                                ${disabled ? "opacity-50 cursor-not-allowed" : "hover:border-gray-500"}
                            `}
                        >
                            <input
                                type="radio"
                                name={id}
                                id={inputId}
                                value={option.value}
                                checked={isChecked}
                                onChange={onChange}
                                disabled={disabled}
                                className="hidden"
                            />
                            <span className="font-bold">{String.fromCharCode(65 + index)}.</span>
                            <div className="w-full text-sm capitalize"><MarkdownContentChoiceQuestion content={option.label} /></div>
                        </label>
                    );
                })}
            </div>
        </div>
    );
};

export default memo(MultipleChoiceQuestion);