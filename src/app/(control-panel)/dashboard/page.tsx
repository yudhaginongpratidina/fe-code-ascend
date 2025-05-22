"use client";
import StatCardDashboard from "@/components/features/dashboard/StatCardDashboard";
import LeaderboardDashboard from "@/components/features/dashboard/LeaderboardDashboard";
import LeverProgressCardDashboard from "@/components/features/dashboard/LeverProgressCardDashboard";

import { useState, useEffect } from "react";
import api from '@/utils/api';
import { FaUsers, FaBook, FaGraduationCap, FaTrophy } from "react-icons/fa";

type Profile = {
    id: string;
    full_name: string;
    username: string;
    email: string;
    role: string;
    point: number;
    badge: string;
    experience: number;
    created_at: string;
    updated_at: string;
    deleted_at: string;
}

type LeaderboardData = {
    id: number | string;
    name: string;
    experience: number | string;
}

// Main Dashboard Component
export default function Page() {
    const [userData, setUserData] = useState<any | null>(null);
    const [myModules, setMyModules] = useState<any | null>(null);
    const [myLearning, setMyLearning] = useState<any | null>(null);
    const [myrank, setMyRank] = useState<number>(0);
    const [profileData, setProfileData] = useState<Profile | null>(null);
    const [leaderboardData, setLeaderboardData] = useState<LeaderboardData[]>([]);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const [
                    usersRes,
                    leaderboardAllRes,
                    profileRes,
                    myRankRes,
                    modulesRes,
                    learningRes
                ] = await Promise.all([
                    api.get("/users"),
                    api.post("/leaderboard", { type: "search_all" }),
                    api.get("/account"),
                    api.post("/leaderboard", { type: "search_by_me" }),
                    api.post("/modules/search", { type: "search_by_me" }),
                    api.get("/enrollments"),
                ]);

                setUserData(usersRes.data.data);
                setLeaderboardData(leaderboardAllRes.data.data);
                setProfileData(profileRes.data.data);
                setMyRank(myRankRes.data.data);
                setMyModules(modulesRes.data.data);
                setMyLearning(learningRes.data.data);
            } catch (error: any) {
                const getErrorMessage = (err: any) =>
                    err?.response?.data?.message ||
                    err?.response?.data?.[0]?.message ||
                    err?.response?.data?.data?.[0]?.message ||
                    "An error occurred";

                console.error("Failed to fetch dashboard data:", getErrorMessage(error));
            }
        };

        fetchDashboardData();
    }, []);


    // Determine which stat cards to show based on user role
    const getStatCardsConfig = () => {
        const role = profileData?.role;

        // Default - only show My Learning for regular users
        let showTotalUsers = false;
        let showTotalModules = false;
        let showMyLearning = true;

        // For admin - show Modules and My Learning
        // For contributor - show Modules and My Learning
        // For superadmin - show all stats
        // Count total visible cards
        if (role === "admin") { showTotalModules = true; }
        if (role === "contributor") { showTotalModules = true; }
        if (role === "superadmin") { showTotalUsers = true; showTotalModules = true; }
        const count = (showTotalUsers ? 1 : 0) + (showTotalModules ? 1 : 0) + (showMyLearning ? 1 : 0);
        return { showTotalUsers, showTotalModules, showMyLearning, count };
    };

    const statCardsConfig = getStatCardsConfig();

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header section */}
                <div className="mb-8">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Learning Dashboard</h1>
                            <p className="text-gray-600 mt-1">Welcome back! Here's your learning progress overview.</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="text-right">
                                <div className="text-sm text-gray-500">Current rank</div>
                                <div className="text-xl font-bold text-blue-700">#{myrank}</div>
                            </div>
                            <div className="w-12 h-12 rounded-full border-2 flex justify-center items-center border-blue-200">
                                <FaTrophy className="text-blue-500 text-2xl" />
                            </div>
                        </div>
                    </div>
                </div>

                {statCardsConfig.count === 1 ? (
                    <div className="mb-8">
                        <StatCardDashboard
                            icon={<FaGraduationCap />}
                            title="Total My Learning"
                            value={myLearning?.length}
                            bgColor="bg-gradient-to-br from-purple-500 to-purple-700"
                        />
                    </div>
                ) : statCardsConfig.count === 2 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        {statCardsConfig.showTotalUsers && (
                            <StatCardDashboard
                                icon={<FaUsers />}
                                title="Total Users"
                                value={userData?.total_user}
                                bgColor="bg-gradient-to-br from-blue-500 to-blue-700"
                            />
                        )}
                        {statCardsConfig.showTotalModules && (
                            <StatCardDashboard
                                icon={<FaBook />}
                                title="Total Modules"
                                value={myModules?.length}
                                bgColor="bg-gradient-to-br from-green-500 to-green-700"
                            />
                        )}
                        {statCardsConfig.showMyLearning && (
                            <StatCardDashboard
                                icon={<FaGraduationCap />}
                                title="Total My Learning"
                                value={myLearning?.length}
                                bgColor="bg-gradient-to-br from-purple-500 to-purple-700"
                            />
                        )}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        {statCardsConfig.showTotalUsers && (
                            <StatCardDashboard
                                icon={<FaUsers />}
                                title="Total Users"
                                value={userData?.total_user}
                                bgColor="bg-gradient-to-br from-blue-500 to-blue-700"
                            />
                        )}
                        {statCardsConfig.showTotalModules && (
                            <StatCardDashboard
                                icon={<FaBook />}
                                title="Total Modules"
                                value={myModules?.length}
                                bgColor="bg-gradient-to-br from-green-500 to-green-700"
                            />
                        )}
                        {statCardsConfig.showMyLearning && (
                            <StatCardDashboard
                                icon={<FaGraduationCap />}
                                title="Total My Learning"
                                value={myLearning?.length}
                                bgColor="bg-gradient-to-br from-purple-500 to-purple-700"
                            />
                        )}
                    </div>
                )}
                {statCardsConfig.count === 1 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <LeaderboardDashboard
                            leaderboardData={leaderboardData}
                            myexperience={profileData?.experience ?? 0}
                            myrank={myrank}
                        />
                        <LeverProgressCardDashboard currentUser={profileData} />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-1">
                            <LeaderboardDashboard
                                leaderboardData={leaderboardData}
                                myexperience={profileData?.experience ?? 0}
                                myrank={myrank}
                            />
                        </div>
                        <div className="lg:col-span-2">
                            <LeverProgressCardDashboard currentUser={profileData} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}