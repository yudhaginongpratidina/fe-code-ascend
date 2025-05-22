"use client";
import { memo } from "react";
import Link from "next/link";
import { FaSwatchbook } from "react-icons/fa";

interface ModuleCardProps {
    title: string;
    label: string;
    author: string;
    chapters: number;
    isFree: boolean;
    pointsRequired?: number;
    href: string;
}

const ModuleCard = memo(({
    title,
    label,
    author,
    chapters,
    isFree,
    pointsRequired,
    href,
}: ModuleCardProps) => (
    <Link
        href={href}
        className="w-full bg-white rounded-sm shadow-md overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300 group"
    >
        <div className="h-52 w-full bg-black relative flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-black opacity-90" />
            <span className="text-white text-lg font-semibold relative z-10">
                {title}
            </span>
        </div>
        <div className="p-5 flex flex-col gap-2.5">
            <div className="flex gap-2">
                <span className="text-xs font-semibold text-black bg-gray-200 px-3 py-1 rounded-sm group-hover:bg-gray-300 transition-colors duration-200">
                    {label}
                </span>
            </div>
            <h2 className="text-xl font-bold text-black leading-snug group-hover:text-gray-800">
                {title}
            </h2>
            <div className="text-xs text-gray-500">
                Author: <span className="capitalize font-semibold text-gray-700">{author}</span>
            </div>
            <hr className="border-gray-200" />
            <div className="flex items-center justify-between text-sm text-gray-700">
                <div className="flex items-center gap-2">
                    <FaSwatchbook className="w-4 h-4" />
                    <span>{chapters} Chapters</span>
                </div>
                {isFree ? (
                    <span className="px-3 py-1 bg-green-200 text-gray-600 text-xs rounded-sm">
                        Free
                    </span>
                ) : (
                    <span className="px-3 py-1 bg-yellow-200 text-gray-700 text-xs rounded-sm">
                        {pointsRequired} Points Required
                    </span>
                )}
            </div>
        </div>
    </Link>
));

ModuleCard.displayName = "ModuleCard";
export default ModuleCard;