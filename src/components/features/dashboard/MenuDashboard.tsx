"use client";

import secureLocalStorage from "react-secure-storage";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import api from "@/utils/api";

import { FaUsers, FaBook, FaGraduationCap } from "react-icons/fa";
import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa6";
import { IoLogOut } from "react-icons/io5";

export default function MenuDashboard() {
    const router = useRouter();
    const [role, setRole] = useState<string | null>(null);

    const handleLogout = async () => {
        try {
            await api.get("/auth/logout");
            secureLocalStorage.removeItem("token");
            window.location.href = "/login";
        } catch (error: any) {
            console.error(error?.response?.data?.message);
        }
    };

    useEffect(() => {
        const role: any = secureLocalStorage.getItem("role");
        setRole(role);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white border border-gray-200 rounded-sm p-6 shadow-sm mb-10"
        >
            <h2 className="text-xl font-bold text-gray-800 mb-6">📚 Menu</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {(role === "superadmin" || role === "admin" || role === "contributor") && (
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => router.push("/my-module")}
                        className="flex flex-col items-center justify-center p-4 rounded-sm hover:cursor-pointer bg-green-50 text-green-700 hover:bg-green-100 transition-all shadow group"
                    >
                        <FaBook size={26} className="mb-2 group-hover:scale-110 transition-transform" />
                        <span className="text-sm font-medium text-center">Modul Management</span>
                    </motion.button>
                )}

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => router.push("/my-learning")}
                    className="flex flex-col items-center justify-center p-4 rounded-sm hover:cursor-pointer bg-purple-50 text-purple-700 hover:bg-purple-100 transition-all shadow group"
                >
                    <FaGraduationCap size={26} className="mb-2 group-hover:scale-110 transition-transform" />
                    <span className="text-sm font-medium text-center">My Learning</span>
                </motion.button>


                {role === "superadmin" && (
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => router.push("/user-management")}
                        className="flex flex-col items-center justify-center p-4 rounded-sm hover:cursor-pointer bg-blue-50 text-blue-700 hover:bg-blue-100 transition-all shadow group"
                    >
                        <FaUsers size={26} className="mb-2 group-hover:scale-110 transition-transform" />
                        <span className="text-sm font-medium text-center">User Management</span>
                    </motion.button>
                )}

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => router.push("/my-profile")}
                    className="flex flex-col items-center justify-center p-4 rounded-sm hover:cursor-pointer bg-gray-800 text-gray-100 hover:bg-gray-700 transition-all shadow group"
                >
                    <FaUser size={26} className="mb-2 group-hover:scale-110 transition-transform" />
                    <span className="text-sm font-medium text-center">Profile</span>
                </motion.button>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleLogout}
                    className="flex flex-col items-center justify-center p-4 rounded-sm hover:cursor-pointer bg-rose-500 text-white hover:bg-rose-600 transition-all shadow group"
                >
                    <IoLogOut size={26} className="mb-2 group-hover:scale-110 transition-transform" />
                    <span className="text-sm font-medium text-center">Logout</span>
                </motion.button>
            </div>
        </motion.div>
    );
}
