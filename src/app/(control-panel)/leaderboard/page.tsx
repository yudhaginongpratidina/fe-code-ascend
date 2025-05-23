"use client";
import api from '@/utils/api';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTrophy, FaMedal, FaChevronUp, FaChevronDown, FaUser, FaFire, FaStar, FaCrown, FaGem, FaBolt, FaRocket, FaGamepad, FaShieldAlt } from 'react-icons/fa';

type LeaderboardData = {
    id: number | string;
    name: string;
    experience: number;
}

export default function ModernLeaderboard() {
    const [users, setUsers] = useState<LeaderboardData[]>([]);

    // Calculate level from experience (every 500 XP = 1 level)
    const calculateLevel = (experience: number) => {
        return Math.floor(experience / 500) + 1;
    };

    // Generate random streak (for demo purposes)
    const generateStreak = (experience: number) => {
        return Math.floor((experience / 1000) * Math.random() * 50) + 1;
    };

    // Generate badge based on level
    const getBadge = (level: number) => {
        if (level >= 25) return 'expert';
        if (level >= 20) return 'challenger';
        if (level >= 15) return 'rising';
        if (level >= 10) return 'dedicated';
        if (level >= 5) return 'learner';
        return 'newcomer';
    };

    // Generate random change status
    const generateChange = () => {
        const changes = ['up', 'down', 'same'];
        return changes[Math.floor(Math.random() * changes.length)] as 'up' | 'down' | 'same';
    };

    const getLeaderboard = async () => {
        try {
            const response = await api.post('/leaderboard', {
                type: "search_all"
            });
            const { data } = response.data;
            setUsers(data);
        } catch (error: any) {
            console.error(error);
        }
    };

    // Get the top 3 users for the podium
    const topUsers = [...users].sort((a, b) => b.experience - a.experience).slice(0, 3);

    useEffect(() => {
        getLeaderboard();
    }, []);

    const getBadgeIcon = (badge: string) => {
        const badges = {
            expert: FaCrown,
            streak: FaFire,
            consistent: FaShieldAlt,
            challenger: FaGamepad,
            rising: FaRocket,
            dedicated: FaGem,
            learner: FaStar,
            persistent: FaBolt,
            newcomer: FaUser
        };
        return badges[badge as keyof typeof badges] || FaStar;
    };

    const getBadgeColor = (badge: string) => {
        const colors = {
            expert: 'text-purple-500',
            streak: 'text-red-500',
            consistent: 'text-blue-500',
            challenger: 'text-green-500',
            rising: 'text-orange-500',
            dedicated: 'text-pink-500',
            learner: 'text-yellow-500',
            persistent: 'text-indigo-500',
            newcomer: 'text-gray-500'
        };
        return colors[badge as keyof typeof colors] || 'text-gray-500';
    };

    const podiumVariants = {
        hidden: { y: 100, opacity: 0 },
        visible: (i: number) => ({
            y: 0,
            opacity: 1,
            transition: {
                delay: i * 0.2,
                duration: 0.8,
                type: "spring",
                stiffness: 100
            }
        })
    };

    const listItemVariants = {
        hidden: { x: -50, opacity: 0 },
        visible: (i: number) => ({
            x: 0,
            opacity: 1,
            transition: {
                delay: i * 0.1,
                duration: 0.5,
                ease: "easeOut"
            }
        })
    };

    return (
        <>
            <div className="w-full">
                <motion.div initial="hidden" animate="visible" className="flex items-end justify-center gap-8 mb-8">
                    <motion.div custom={1} variants={podiumVariants} className="flex flex-col items-center group cursor-pointer" whileHover={{ scale: 1.05 }}>
                        <motion.div className="relative mb-4" whileHover={{ rotate: [0, -10, 10, 0] }} transition={{ duration: 0.5 }}>
                            <div className="w-20 h-20 rounded-sm bg-gradient-to-r from-gray-400 to-gray-600 flex items-center justify-center text-white text-2xl border-4 border-gray-300 shadow-lg">
                                <FaUser />
                            </div>
                            <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-gray-400 to-gray-600 rounded-sm flex items-center justify-center">
                                <FaMedal className="text-white text-sm" />
                            </div>
                        </motion.div>
                        <div className="bg-gradient-to-t from-gray-500 to-gray-400 rounded-sm w-28 h-32 flex flex-col items-center justify-end p-4 shadow-2xl relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                            <div className="relative z-10">
                                <div className="text-4xl font-bold text-white mb-1">2</div>
                                <FaMedal className="text-gray-200 text-xl" />
                            </div>
                        </div>
                        <div className="mt-4 text-center">
                            <p className="font-bold text-gray-800 text-lg">{topUsers[1]?.name}</p>
                            <p className="text-gray-600 text-sm">{topUsers[1]?.experience?.toLocaleString()} XP</p>
                        </div>
                    </motion.div>

                    {/* 1st Place */}
                    <motion.div custom={0} variants={podiumVariants} className="flex flex-col items-center group cursor-pointer" whileHover={{ scale: 1.05 }}>
                        <motion.div className="relative mb-4" animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.1, 1] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <div className="w-24 h-24 rounded-sm bg-gradient-to-r from-yellow-400 to-yellow-600 flex items-center justify-center text-white text-3xl border-4 border-yellow-300 shadow-2xl">
                                <FaUser />
                            </div>
                            <motion.div
                                className="absolute -top-3 -right-3 w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-sm flex items-center justify-center"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                            >
                                <FaCrown className="text-white text-lg" />
                            </motion.div>
                        </motion.div>

                        <div className="bg-gradient-to-t from-yellow-600 to-yellow-400 rounded-sm w-32 h-40 flex flex-col items-center justify-end p-4 shadow-2xl relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                            <motion.div
                                className="absolute top-2 left-2 right-2"
                                animate={{ opacity: [0.5, 1, 0.5] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                <div className="h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent rounded-sm" />
                            </motion.div>
                            <div className="relative z-10">
                                <div className="text-5xl font-bold text-white mb-2">1</div>
                                <FaTrophy className="text-yellow-200 text-2xl" />
                            </div>
                        </div>
                        <div className="mt-4 text-center">
                            <p className="font-bold text-gray-800 text-xl">{topUsers[0]?.name}</p>
                            <p className="text-gray-600">{topUsers[0]?.experience?.toLocaleString()} XP</p>
                        </div>
                    </motion.div>

                    {/* 3rd Place */}
                    <motion.div custom={2} variants={podiumVariants} className="flex flex-col items-center group cursor-pointer" whileHover={{ scale: 1.05 }}>
                        <motion.div className="relative mb-4" whileHover={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 0.5 }}>
                            <div className="w-18 h-18 rounded-sm bg-gradient-to-r from-amber-600 to-amber-800 flex items-center justify-center text-white text-xl border-4 border-amber-500 shadow-lg">
                                <FaUser />
                            </div>
                            <div className="absolute -top-2 -right-2 w-7 h-7 bg-gradient-to-r from-amber-600 to-amber-800 rounded-full flex items-center justify-center">
                                <FaMedal className="text-white text-xs" />
                            </div>
                        </motion.div>
                        <div className="bg-gradient-to-t from-amber-700 to-amber-600 rounded-sm w-24 h-24 flex flex-col items-center justify-end p-3 shadow-2xl relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                            <div className="relative z-10">
                                <div className="text-3xl font-bold text-white mb-1">3</div>
                                <FaMedal className="text-amber-200 text-lg" />
                            </div>
                        </div>
                        <div className="mt-4 text-center">
                            <p className="font-bold text-gray-800">{topUsers[2]?.name}</p>
                            <p className="text-gray-600 text-sm">{topUsers[2]?.experience?.toLocaleString()} XP</p>
                        </div>
                    </motion.div>
                </motion.div>
            </div>

            {/* Full Rankings */}
            <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="bg-gray-50/70 backdrop-blur-xl border border-gray-200 rounded-sm shadow-2xl overflow-hidden"
            >
                {/* Header */}
                <div className="bg-gradient-to-r from-gray-700 to-gray-800 p-6">
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                            <FaGamepad className="text-purple-400" />
                            Global Rankings
                        </h2>
                        <div className="flex gap-4 text-sm">
                            <div className="flex items-center gap-2 bg-green-500/20 px-3 py-1 rounded-sm">
                                <FaChevronUp className="text-green-400" />
                                <span className="text-green-400 font-medium">Rising</span>
                            </div>
                            <div className="flex items-center gap-2 bg-red-500/20 px-3 py-1 rounded-sm">
                                <FaChevronDown className="text-red-400" />
                                <span className="text-red-400 font-medium">Falling</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Rankings List */}
                <div className="max-h-96 overflow-y-auto custom-scrollbar">
                    <AnimatePresence>
                        {users.map((user, index) => {
                            const level = calculateLevel(user.experience);
                            const streak = generateStreak(user.experience);
                            const badge = getBadge(level);
                            const change = generateChange();
                            const BadgeIcon = getBadgeIcon(badge);
                            return (
                                <motion.div
                                    key={user.id}
                                    custom={index}
                                    initial="hidden"
                                    animate="visible"
                                    variants={listItemVariants}
                                    whileHover={{ scale: 1.02, backgroundColor: "rgba(0,0,0,0.05)" }}
                                    className={`flex items-center justify-between p-6 border-b border-gray-200 transition-all duration-300 cursor-pointer ${index < 3 ? 'bg-gradient-to-r from-gray-100/70 to-transparent' : ''}`}
                                >
                                    <div className="flex items-center gap-6">
                                        <motion.div
                                            className={`w-12 h-12 flex items-center justify-center rounded-sm text-lg font-bold relative ${index === 0 ? 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white shadow-lg' :
                                                index === 1 ? 'bg-gradient-to-r from-gray-400 to-gray-600 text-white shadow-lg' :
                                                    index === 2 ? 'bg-gradient-to-r from-amber-600 to-amber-800 text-white shadow-lg' :
                                                        'bg-gray-100 text-gray-700 border border-gray-300'
                                                }`}
                                            whileHover={{ rotate: 360 }}
                                            transition={{ duration: 0.5 }}
                                        >
                                            {index + 1}
                                            {index < 3 && (
                                                <motion.div
                                                    className="absolute -inset-1 rounded-sm"
                                                    animate={{
                                                        boxShadow: [
                                                            "0 0 0 0 rgba(255,215,0,0.7)",
                                                            "0 0 0 10px rgba(255,215,0,0)",
                                                            "0 0 0 0 rgba(255,215,0,0)"
                                                        ]
                                                    }}
                                                    transition={{
                                                        duration: 2,
                                                        repeat: Infinity,
                                                        ease: "easeInOut"
                                                    }}
                                                />
                                            )}
                                        </motion.div>

                                        {/* User Info */}
                                        <div className="flex items-center gap-4">
                                            <div className="relative">
                                                <div className="w-14 h-14 rounded-sm bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center text-white text-xl shadow-lg">
                                                    <FaUser />
                                                </div>
                                                <motion.div
                                                    className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center"
                                                    animate={{ scale: [1, 1.2, 1] }}
                                                    transition={{ duration: 2, repeat: Infinity }}
                                                >
                                                    <span className="text-white text-xs font-bold">{level}</span>
                                                </motion.div>
                                            </div>

                                            <div>
                                                <div className="flex items-center gap-3">
                                                    <h3 className="font-bold text-gray-800 text-lg">{user.name}</h3>
                                                    <BadgeIcon className={`text-lg ${getBadgeColor(badge)}`} />
                                                </div>
                                                <div className="flex items-center gap-4 text-sm">
                                                    <div className="flex items-center gap-1">
                                                        {change === 'up' ? (
                                                            <FaChevronUp className="text-green-500" />
                                                        ) : change === 'down' ? (
                                                            <FaChevronDown className="text-red-500" />
                                                        ) : null}
                                                        <span className="text-gray-600">
                                                            Rank #{index + 1} • Level {level}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* XP and Trophy */}
                                    <div className="flex items-center gap-4">
                                        <motion.div
                                            className="bg-gradient-to-r from-purple-100 to-blue-100 border border-purple-200 rounded-sm px-4 py-2"
                                            whileHover={{ scale: 1.1 }}
                                        >
                                            <span className="text-gray-800 font-bold text-lg">
                                                {user.experience.toLocaleString()} XP
                                            </span>
                                        </motion.div>
                                        {index === 0 && (
                                            <motion.div
                                                animate={{ rotate: [0, 10, -10, 0] }}
                                                transition={{ duration: 2, repeat: Infinity }}
                                            >
                                                <FaTrophy className="text-yellow-500 text-2xl" />
                                            </motion.div>
                                        )}
                                    </div>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>
            </motion.div>
        </>
    );
}