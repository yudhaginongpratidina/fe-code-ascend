"use client";
import { useState, useEffect } from "react";
import api from "@/utils/api";
import ModuleCard from "@/components/ui/ModuleCard";

type DataModule = {
    id: string | number,
    title: string,
    level: string,
    points_required: number
    author: {
        id: string | number,
        name: string
    },
    free: boolean,
    chapter_count: number
}


export default function Page() {
    const [modules, setModules] = useState<DataModule[]>([]);
    const [activeTab, setActiveTab] = useState("all");
    const [isLoading, setIsLoading] = useState(true);

    const getAllModule = async () => {
        setIsLoading(true);
        try {
            const response = await api.post("/modules/search", {
                type: "search_all"
            });
            const { data } = response.data;
            setModules(data);
        } catch (error: any) {
            const errorMessage = error?.response?.data?.message || error?.response?.data[0]?.message || error?.response?.data?.data[0].message || "An error occurred";
            console.error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getAllModule();
    }, []);

    const filteredModules = activeTab === "all"
        ? modules
        : activeTab === "free"
            ? modules.filter(module => module.free)
            : modules.filter(module => !module.free);

    return (
        <>
            <main className="w-full py-20 px-4 md:px-6">
                <div className="w-full max-w-screen-xl mx-auto">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-10">
                        <div>
                            <h2 className="text-3xl font-bold text-black mb-2">List of Modules</h2>
                            <div className="w-20 h-1 bg-blue-600 mb-6 rounded-sm"></div>
                            <p className="text-black max-w-xl">
                                Explore our comprehensive learning tracks designed by industry professionals
                            </p>
                        </div>

                        {/* Module Filter Tabs */}
                        <div className="mt-6 md:mt-0 flex p-1 bg-gray-800/60 rounded-sm">
                            {["all", "free", "premium"].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-5 py-2 rounded-sm text-sm font-medium transition-all duration-200 ${activeTab === tab
                                        ? "bg-blue-600 text-white shadow-lg"
                                        : "text-gray-300 hover:text-white"
                                        }`}
                                >
                                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                                </button>
                            ))}
                        </div>
                    </div>

                    {isLoading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-400"></div>
                        </div>
                    ) : (
                        <>
                            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredModules.map((module) => (
                                    <ModuleCard
                                        key={module.id}
                                        title={module.title}
                                        author={module.author.name}
                                        label={module.level}
                                        isFree={module.free}
                                        pointsRequired={module.points_required}
                                        chapters={module.chapter_count}
                                        href={`/list-module/${module.id}`}
                                    />
                                ))}
                            </div>

                            {filteredModules.length === 0 && (
                                <div className="flex flex-col items-center justify-center h-40 rounded-sm text-gray-500">
                                    <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <p className="mt-2">No modules found for this filter</p>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </main>
        </>
    )
}