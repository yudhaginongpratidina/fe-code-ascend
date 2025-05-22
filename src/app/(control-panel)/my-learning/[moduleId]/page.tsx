"use client"
import { useState, useEffect, memo } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import api from "@/utils/api";

import { FaBook, FaChevronRight, FaCheckCircle } from "react-icons/fa";

type LessonItemProps = {
    href: string;
    title: string;
    hasQuiz: boolean;
    index: number;
    isCompleted: boolean;
    id: string | number;
};
const LessonItem = memo(({ href, title, hasQuiz, index, isCompleted, id }: LessonItemProps) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        className="w-full mb-4"
    >
        <div className="group hover:scale-[1.02] transition-all duration-300">
            <Link href={href} className="block w-full">
                <div className={`p-5 border ${isCompleted ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-white'} rounded-sm hover:shadow-lg transition-all duration-300 group-hover:border-blue-200`}>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className={`p-3 ${isCompleted ? 'bg-green-100 text-green-600' : 'bg-blue-50 text-blue-600'} rounded-sm group-hover:bg-blue-600 group-hover:text-white transition-all duration-300`}>
                                {isCompleted ? (
                                    <FaCheckCircle className="w-5 h-5" />
                                ) : (
                                    <FaBook className="w-5 h-5" />
                                )}
                            </div>
                            <div>
                                <h3 className="font-bold text-lg text-gray-800 group-hover:text-blue-600 transition-all">{title}</h3>
                                <div className="flex items-center gap-2 mt-1">
                                    {hasQuiz ? (
                                        <span className="flex items-center gap-1 text-green-600 text-sm">
                                            <FaCheckCircle className="w-4 h-4" />
                                            With Quiz
                                        </span>
                                    ) : (
                                        <span className="text-gray-500 text-sm">No Quiz</span>
                                    )}
                                    {isCompleted && (
                                        <span className="flex items-center gap-1 text-green-600 text-sm ml-2 bg-green-100 px-2 py-0.5 rounded-full">
                                            <FaCheckCircle className="w-3 h-3" />
                                            Completed
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <span className={`p-2 ${isCompleted ? 'bg-green-100 text-green-500' : 'bg-gray-100 text-gray-500'} rounded-full group-hover:bg-blue-600 group-hover:text-white transition-all duration-300`}>
                                <FaChevronRight className="w-4 h-4" />
                            </span>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    </motion.div>
));
LessonItem.displayName = "LessonItem";
type DataDetailModule = {
    id: number | string;
    title: string;
    with_question: boolean;
    module: {
        id: number | string;
        title: string;
    }
}
type DataChapterIsCompleted = {
    id: number | string;
}
export default function Page() {
    const { moduleId } = useParams();
    const [myLearning, setMyLearning] = useState<DataDetailModule[]>([]);
    const [status, setStatus] = useState({ isError: false, isLoading: false, message: "" });
    const [moduleTitle, setModuleTitle] = useState("");
    const [completedIds, setCompletedIds] = useState<string[]>([]);
    const displayMessage = (isError: boolean, message: string) => {
        setStatus({ isError, isLoading: false, message });
        setTimeout(() => setStatus({ isError: false, isLoading: false, message: "" }), 4000);
    };
    const getModuleById = async () => {
        setStatus({ isError: false, isLoading: true, message: "" });
        try {
            const response = await api.post("/chapters/search", {
                type: "search_by_module_id_enrolled",
                value: moduleId
            })
            const { data, message } = response.data;
            displayMessage(false, message);
            // console.log(data);
            setMyLearning(data);
            setModuleTitle(data[0]?.module?.title || "");
        } catch (error) {
            const errorMessage = (error as any)?.response?.data?.message || "Failed to load module data";
            displayMessage(true, errorMessage);
        }
    }
    const checkingChapterisCompletedByModuleId = async () => {
        try {
            const response = await api.post("/chapter-progress/find-chapters", {
                module_id: moduleId,
            })
            const { data } = response.data;
            // console.log(data);
            const completedIds = data.map((item: any) => item.id.toString());
            setCompletedIds(completedIds);
        } catch (error) {
            const errorMessage = (error as any)?.response?.data?.message || "Failed to load module data";
            console.log(errorMessage);
        }
    }

    useEffect(() => {
        getModuleById();
        checkingChapterisCompletedByModuleId();
    }, [moduleId]);

    const isChapterCompleted = (chapterId: string | number) => {
        return completedIds.includes(chapterId.toString());
    };

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 rounded-sm mb-8 shadow-lg"
            >
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold">Module {moduleTitle}</h1>
                        <p className="mt-2 text-blue-100">Select a chapter to start learning</p>
                    </div>
                    <div className="hidden md:block p-4 bg-white/10 rounded-sm">
                        <FaBook className="w-8 h-8" />
                    </div>
                </div>
            </motion.div>

            {myLearning.length > 0 && (
                <div className="mb-6 p-4 bg-white rounded-sm shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="font-medium text-gray-700">Progress</h3>
                            <p className="text-sm text-gray-500">
                                {completedIds.length} of {myLearning.length} chapters completed
                            </p>
                        </div>
                        <div className="w-32 bg-gray-200 rounded-sm h-2.5">
                            <div
                                className="bg-green-500 h-2.5 rounded-full"
                                style={{ width: `${(completedIds.length / myLearning.length) * 100}%` }}
                            ></div>
                        </div>
                    </div>
                </div>
            )}

            {status.isLoading ? (
                <div className="w-full flex justify-center py-12">
                    <div className="animate-spin rounded-sm h-12 w-12 border-b-2 border-blue-600"></div>
                </div>
            ) : myLearning.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-sm">
                    <div className="mb-4 text-gray-400">
                        <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                        </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-700">No chapters found</h3>
                    <p className="mt-2 text-gray-500">There are no chapters available for this module.</p>
                </div>
            ) : (
                <div className="space-y-2">
                    {myLearning.map((item, index) => (
                        <LessonItem
                            key={item.id}
                            href={`/my-learning/${moduleId}/${item.id}`}
                            title={item.title}
                            hasQuiz={item.with_question}
                            index={index}
                            isCompleted={isChapterCompleted(item.id)}
                            id={item.id}
                        />
                    ))}
                </div>
            )}
        </>
    );
}