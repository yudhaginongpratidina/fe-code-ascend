import Link from "next/link";
import { FaAward, FaCrown, FaMedal, FaTrophy, FaUser } from "react-icons/fa";

type LeaderboardDashboardProps = {
    leaderboardData: any[];
    myexperience: string | number;
    myrank: number;
}

export default function LeaderboardDashboard({ leaderboardData, myexperience, myrank }: LeaderboardDashboardProps) {
    return (
        <div className="rounded-sm bg-white p-6 shadow-lg border border-gray-100 h-full">
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                    <FaTrophy className="text-yellow-500 text-xl" />
                    <h3 className="text-xl font-bold text-gray-800">Leaderboard</h3>
                </div>
                <Link href='/leaderboard' className="text-blue-600 text-sm font-medium hover:text-blue-800 transition-colors duration-200 flex items-center">
                    View All
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </Link>
            </div>
            <div className="space-y-4">
                {leaderboardData.map((user, index) => (
                    <div key={user.id} className="flex justify-between items-center p-2 hover:bg-gray-50 rounded-sm transition-colors duration-150">
                        <div className="flex items-center gap-3">
                            <div className="w-8 text-center">
                                {index === 0 ? <FaCrown className="text-yellow-500 text-xl mx-auto" /> :
                                    index === 1 ? <FaMedal className="text-gray-400 text-xl mx-auto" /> :
                                        index === 2 ? <FaAward className="text-orange-400 text-xl mx-auto" /> :
                                            <span className="font-bold text-gray-600">{index + 1}</span>}
                            </div>
                            <div className="relative">
                                <div className="w-10 h-10 rounded-full flex justify-center items-center object-cover border-2 border-blue-200 shadow-sm">
                                    <FaUser className="text-blue-500 text-xl" />
                                </div>
                                {index === 0 && <div className="absolute -top-1 -right-1 bg-yellow-500 rounded-full w-4 h-4 border-2 border-white"></div>}
                            </div>
                            <span className="font-medium text-gray-800">{user.name}</span>
                        </div>
                        <span className="font-bold text-gray-700 bg-gray-100 px-3 py-1 rounded-full">
                            {user.experience} xp
                        </span>
                    </div>
                ))}
                <div className="border-t border-gray-200 pt-4 mt-4">
                    <div className="flex justify-between items-center p-2 bg-blue-50 rounded-sm">
                        <div className="flex items-center gap-3">
                            <div className="w-8 text-center">
                                <span className="font-bold text-blue-800">{myrank}</span>
                            </div>
                            <div className="relative">
                                <div className="w-10 h-10 rounded-full flex justify-center items-center object-cover border-2 border-blue-200 shadow-sm">
                                    <FaUser className="text-blue-500 text-xl" />
                                </div>
                                <div className="absolute -top-1 -right-1 bg-blue-500 rounded-full w-4 h-4 border-2 border-white"></div>
                            </div>
                            <span className="font-medium text-blue-800">You</span>
                        </div>
                        <span className="font-bold text-blue-800 bg-blue-100 px-3 py-1 rounded-full">
                            {myexperience} xp
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}