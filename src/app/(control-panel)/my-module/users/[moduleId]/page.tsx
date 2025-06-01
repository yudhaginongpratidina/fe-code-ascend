// client component
"use client";

import secureLocalStorage from "react-secure-storage";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import api from "@/utils/api";

import Unauthorized from "@/components/ui/Unauthorized";

import { FiChevronDown, FiChevronUp, FiSearch, FiRefreshCw } from "react-icons/fi";
import { FaUsers, FaBook, FaCheckCircle, FaChevronRight } from "react-icons/fa";

interface StatusType {
    isError: boolean;
    isLoading: boolean;
    message: string;
}

interface CompletedChapter {
    id: string | number;
    title: string;
}

interface UserData {
    id: string | number;
    name: string;
    completed_chapters_summary: string;
    completed_chapters: CompletedChapter[];
}

interface DataMemberOfModule {
    id: string | number;
    title: string;
    level: string;
    users: UserData[];
}

export default function Page() {
    const { moduleId } = useParams();
    const [role, setRole] = useState<string | null>(null);
    const [membersOfModule, setMembersOfModule] = useState<DataMemberOfModule | null>(null);
    const [status, setStatus] = useState<StatusType>({
        isError: false,
        isLoading: false,
        message: ""
    });
    const [searchTerm, setSearchTerm] = useState("");
    const [expandedUsers, setExpandedUsers] = useState<Record<string | number, boolean>>({});

    const displayMessage = (isError: boolean, message: string) => {
        setStatus({ isError, isLoading: false, message });

        if (message) {
            setTimeout(() => {
                setStatus(prev => ({ ...prev, message: "" }));
            }, 4000);
        }
    };

    const toggleUserExpand = (userId: string | number) => {
        setExpandedUsers(prev => ({
            ...prev,
            [userId]: !prev[userId]
        }));
    };

    const fetchMembersOfModule = async () => {
        try {
            setStatus(prev => ({ ...prev, isLoading: true }));
            const response = await api.post(`/modules/search`, {
                type: "search_member_by_module_id",
                value: moduleId
            });

            const { data, message } = response.data;
            setMembersOfModule(data);
            displayMessage(false, message);
        } catch (error: any) {
            const errorMessage = error?.response?.data?.message || "An error occurred";
            displayMessage(true, errorMessage);
        } finally {
            setStatus(prev => ({ ...prev, isLoading: false }));
        }
    };

    const filteredUsers = membersOfModule?.users?.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

    useEffect(() => {
        const role: any = secureLocalStorage.getItem("role");
        setRole(role);
        fetchMembersOfModule();
    }, [moduleId]);

    return (
        <>
            {role === "superadmin" || role === "admin" || role === "contributor" ? (
                <>
                    {/* Header */}
                    <div className="w-full bg-white p-6 rounded-sm shadow-sm">
                        <div className="flex justify-between items-center">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-800">Info</h1>
                                <p className="text-sm text-gray-600">
                                    {membersOfModule ? (
                                        <>
                                            Module: <span className="font-medium">{membersOfModule.title}</span> •
                                            Level: <span className="font-medium">{membersOfModule.level}</span> •
                                            <span className="font-medium">{filteredUsers.length} members</span>
                                        </>
                                    ) : "Loading module information..."}
                                </p>
                            </div>
                            <button
                                onClick={fetchMembersOfModule}
                                className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition-colors"
                            >
                                <FiRefreshCw size={16} className={status.isLoading ? "animate-spin" : ""} />
                                Refresh
                            </button>
                        </div>
                    </div>
                    {/* Search & Content Container */}
                    <div className="w-full bg-white rounded-sm shadow-sm overflow-hidden">
                        {/* Search Bar */}
                        <div className="p-4 border-b border-gray-100">
                            <div className="relative">
                                <FiSearch size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search members by name..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                />
                            </div>
                        </div>

                        {/* Main Content */}
                        <div className="w-full max-h-[60vh] overflow-auto">
                            {status.isLoading ? (
                                <div className="flex justify-center items-center p-8">
                                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                                </div>
                            ) : filteredUsers.length > 0 ? (
                                <ul className="divide-y divide-gray-100">
                                    {filteredUsers.map(user => (
                                        <li key={user.id} className="hover:bg-gray-50">
                                            <div
                                                className="p-4 cursor-pointer"
                                                onClick={() => toggleUserExpand(user.id)}
                                            >
                                                <div className="flex justify-between items-center">
                                                    <div className="flex items-center space-x-3">
                                                        <div className="bg-blue-100 text-blue-700 p-2 rounded-full">
                                                            <FaUsers size={20} />
                                                        </div>
                                                        <div>
                                                            <h3 className="font-medium text-gray-800">{user.name}</h3>
                                                            <p className="text-sm text-gray-500">{user.completed_chapters_summary}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                                                            <FaCheckCircle size={12} />
                                                            {user.completed_chapters.length} chapters
                                                        </span>
                                                        {expandedUsers[user.id] ?
                                                            <FiChevronUp size={18} className="text-gray-400" /> :
                                                            <FiChevronDown size={18} className="text-gray-400" />
                                                        }
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Dropdown Content */}
                                            {expandedUsers[user.id] && (
                                                <div className="bg-gray-50 px-4 pb-4">
                                                    <div className="ml-9 pl-3 border-l-2 border-blue-200">
                                                        <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                                                            <FaBook size={16} className="text-blue-500" />
                                                            Completed Chapters
                                                        </h4>
                                                        {user.completed_chapters.length > 0 ? (
                                                            <ul className="space-y-1">
                                                                {user.completed_chapters.map(chapter => (
                                                                    <li key={chapter.id} className="flex items-center gap-2 text-sm text-gray-600">
                                                                        <FaChevronRight size={14} className="text-green-500" />
                                                                        {chapter.title}
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        ) : (
                                                            <p className="text-sm text-gray-500 italic">No chapters completed yet</p>
                                                        )}
                                                    </div>
                                                </div>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <div className="flex flex-col items-center justify-center p-8 text-center">
                                    <FaUsers size={48} className="text-gray-300 mb-2" />
                                    <h3 className="text-lg font-medium text-gray-700">No members found</h3>
                                    <p className="text-gray-500 max-w-md">
                                        {searchTerm ?
                                            "No members match your search criteria. Try a different search term." :
                                            "This module doesn't have any members yet."}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </>
            ) : (
                <Unauthorized />
            )}
        </>
    );
}