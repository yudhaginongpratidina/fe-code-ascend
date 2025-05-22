"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import api from "@/utils/api";

import { FaSwatchbook } from "react-icons/fa";

type DataModule = {
    id: number | string;
    module_id: {
        id: number | string;
        title: string;
        level: string;
        count_chapters: number;
    }
}

export default function Page() {
    const [status, setStatus] = useState({ isError: false, isLoading: false, message: "" });
    const [myLearning, setMyLearning] = useState<DataModule[]>([]);

    const displayMessage = (isError: boolean, message: string) => {
        setStatus({ isError, isLoading: false, message });
        setTimeout(() => setStatus({ isError: false, isLoading: false, message: "" }), 4000);
    };

    const getMyLearning = async () => {
        try {
            const response = await api.get("/enrollments");
            const { data, message } = response.data;
            console.log(data);
            setMyLearning(data);
            displayMessage(false, message);
        } catch (error: any) {
            const errorMessage = error?.response?.data?.message || "An error occurred";
            // console.error(errorMessage);
            displayMessage(true, errorMessage);
        }
    }

    useEffect(() => {
        getMyLearning();
    }, []);

    return (
        <>
            <div className="w-full max-h-[80vh] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-auto">
                {myLearning.map((item, index) => (
                    <CardLearning
                        key={index}
                        href={`/my-learning/${item.module_id.id}`}
                        title={item.module_id.title}
                        level={item.module_id.level}
                        total_chapter={item.module_id.count_chapters}
                    />
                ))}
            </div>
        </>
    )
}

const CardLearning = ({ href, level, title, total_chapter }: { href: string, level: string, title: string, total_chapter: number }) => {
    return (
        <Link href={href} className="w-full bg-white rounded-md shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300">
            <div className="h-48 w-full bg-gradient-to-r from-gray-800 via-gray-700 to-gray-900 flex items-center justify-center">
                <span className="text-white text-lg font-semibold">Thumbnail</span>
            </div>
            <div className="h-fit p-4 flex flex-col gap-3">
                <div className="flex gap-2">
                    <span className="text-xs font-semibold capitalize text-blue-700 bg-blue-100 px-3 py-1 rounded-sm shadow-sm hover:bg-blue-200 transition-colors duration-200">
                        {level}
                    </span>
                </div>
                <h2 className="text-md font-semibold text-gray-900 leading-snug">
                    {title}
                </h2>
                <hr className="border-gray-300" />
                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <FaSwatchbook className="w-4 h-4" />
                    <span>{total_chapter} Chapters</span>
                </div>
            </div>
        </Link>
    )
}