"use client"
import { memo, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import api from "@/utils/api";

import { FormMessage } from "@/components/ui/Form";
import MarkdownContent from "@/components/ui/MarkdownContent";

import { FaSwatchbook, FaBook, FaTrophy, FaUser } from "react-icons/fa";

const LessonItem = memo(({ title, hasQuiz }: { title: string; hasQuiz: boolean }) => (
    <div className="w-full p-4 border border-gray-200 rounded-sm bg-white hover:shadow-xl transition-all duration-300 group">
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className="p-2 bg-gray-100 rounded-sm group-hover:bg-black group-hover:text-white transition-all duration-300">
                    <FaBook className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-lg">{title}</h3>
            </div>
            <div className="flex items-center gap-2 text-sm">
                {hasQuiz
                    ? <span className="px-3 py-1 bg-black text-white text-xs rounded-sm">With Quiz</span>
                    : <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-sm">No Quiz</span>
                }
            </div>
        </div>
    </div>
));

LessonItem.displayName = "LessonItem";

type DataModule = {
    id: string | number;
    title: string;
    description: string;
    level: string;
    point_required: number;
    author: { id: string | number; name: string };
    free: boolean;
    chapter_count: number;
};

type DataChapter = {
    id: string | number;
    title: string;
    with_question: boolean;
}

export default function Page() {
    const { id } = useParams();
    const [dataModule, setDataModule] = useState<DataModule | null>(null);
    const [dataChapter, setDataChapter] = useState<DataChapter[]>([]);
    const [status, setStatus] = useState({ isError: false, isLoading: false, message: "" });

    const displayMessage = (isError: boolean, message: string) => {
        setStatus({ isError, isLoading: false, message });
        setTimeout(() => setStatus({ isError: false, isLoading: false, message: "" }), 4000);
    };

    const getModuleById = async (id: any) => {
        try {
            const response = await api.post("/modules/search", {
                type: "search_by_id",
                value: id,
            });
            setDataModule(response.data.data);
        } catch (error: any) {
            const errorMessage = error?.response?.data?.message || "An error occurred";
            console.error(errorMessage);
        }
    };

    const getAllChapterByModuleId = async (id: any) => {
        try {
            const response = await api.post("/chapters/search", {
                type: "search_by_module_id",
                value: id
            })
            // console.log(response.data.data);
            setDataChapter(response.data.data);
        } catch (error: any) {
            const errorMessage = error?.response?.data?.message || error?.response?.data[0]?.message || error?.response?.data?.data[0].message || "An error occurred";
            console.error(errorMessage);
        }
    }

    const handleEnrollModule = async () => {
        try {
            const response = await api.post(`/enrollments`, {
                module_id: id
            });
            const { message } = response.data;
            displayMessage(false, message);
        } catch (error: any) {
            const errorMessage = error?.response?.data?.message || error?.response?.data[0]?.message || error?.response?.data?.data[0].message || "An error occurred";
            displayMessage(true, errorMessage);
        }
    }

    useEffect(() => {
        if (id) {
            getModuleById(id);
            getAllChapterByModuleId(id);
        }
    }, [id]);

    if (!dataModule) return <div>Loading...</div>;

    const { title, description, level, point_required, author, chapter_count, free } = dataModule;

    return (
        <main className="min-h-screen bg-gray-50 pb-16">
            <header className="w-full bg-black text-white">
                <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
                    <div className="flex flex-col gap-4">
                        <div className="bg-white/10 w-fit p-4 rounded-sm">
                            <FaSwatchbook className="w-16 h-16 text-white" />
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold">{title}</h1>
                        <div className="flex flex-wrap gap-4 text-sm">
                            <div className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-sm">
                                <FaSwatchbook className="w-4 h-4" />
                                <span>{chapter_count} Chapters</span>
                            </div>
                            <div className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-sm">
                                <FaTrophy className="w-4 h-4" />
                                <span className="capitalize">{level} Level</span>
                            </div>
                            <div className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-sm">
                                <FaUser className="w-4 h-4" />
                                <span className="capitalize">{author.name}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <div className="container mx-auto px-4 md:px-6 -mt-6">
                <div className="w-full bg-white shadow-md rounded-sm p-6 md:p-8 mb-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2">
                            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                                <span className="w-1 h-6 bg-black block"></span> Course Description
                            </h2>
                            <MarkdownContent content={description || ""} />
                        </div>

                        <div className="lg:border-l lg:pl-8 lg:border-gray-200">
                            <div className="bg-gray-50 p-6 rounded-sm border border-gray-100">
                                <div className="flex flex-col gap-6">
                                    {status.message && (
                                        <FormMessage isError={status.isError} message={status.message} />
                                    )}
                                    <div>
                                        <div className="text-sm text-gray-600 mb-1">Point Required</div>
                                        {free ? (
                                            <div className="text-3xl font-bold text-gray-800">Free</div>
                                        ) : (
                                            <div className="text-3xl font-bold text-gray-800">
                                                {point_required} <span className="text-sm font-normal text-gray-600">points</span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-gray-700">
                                        <FaSwatchbook className="w-4 h-4" />
                                        <span>{chapter_count} Chapters</span>
                                    </div>
                                    <button onClick={handleEnrollModule} className="w-full bg-black text-white py-3 px-4 rounded-sm font-medium hover:bg-gray-900 transition-colors duration-300 shadow-sm">
                                        Enroll Now
                                    </button>
                                    <div className="text-xs text-center text-gray-500">
                                        Start your learning journey today
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-full bg-white shadow-md rounded-sm p-6 md:p-8">
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                        <span className="w-1 h-6 bg-black block"></span> Course Lessons
                    </h2>
                    <div className="w-full flex flex-col gap-3">
                        {dataChapter.map((chapter, index) => (
                            <LessonItem
                                key={chapter.id}
                                title={`Chapter ${index + 1} - ${chapter.title}`}
                                hasQuiz={chapter.with_question}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}