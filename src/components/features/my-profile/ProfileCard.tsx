import { FaRegDotCircle, FaUserCircle, FaStar, FaTrophy, FaFire, FaSync } from "react-icons/fa";
import { HiSparkles, HiLightningBolt } from "react-icons/hi";

type ProfileCardProps = {
    isLoading: boolean
    data: {
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
        isError: boolean
        isLoading: boolean
        message: string
    }
    myrank: number
}

export default function ProfileCard({ isLoading, data, myrank }: ProfileCardProps) {
    const getRankIcon = (rank: number) => {
        if (rank <= 3) return <FaTrophy className="text-yellow-500" />;
        if (rank <= 10) return <FaStar className="text-purple-500" />;
        return <FaFire className="text-orange-500" />;
    };

    const getRankColor = (rank: number) => {
        if (rank <= 3) return "from-yellow-400 to-yellow-600";
        if (rank <= 10) return "from-purple-400 to-purple-600";
        return "from-orange-400 to-orange-600";
    };

    return (
        <>
            {isLoading || !data ? (
                <SkeletonProfile />
            ) : (
                <div className="w-full relative overflow-hidden">
                    {/* Main Profile Card */}
                    <div className="bg-white rounded-sm shadow-sm border border-gray-100 overflow-hidden backdrop-blur-sm">
                        {/* Cover with animated gradient */}
                        <div className="relative h-64 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 overflow-hidden">
                            {/* Animated background elements */}
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 animate-pulse"></div>
                            <div className="absolute top-4 right-4 w-32 h-32 bg-white/10 rounded-full blur-xl animate-float"></div>
                            <div className="absolute bottom-8 left-8 w-24 h-24 bg-white/5 rounded-full blur-lg animate-float-delayed"></div>

                            {/* Profile Picture */}
                            {/* <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 md:left-12 md:translate-x-0">
                                <div className="relative">
                                    <div className="w-32 h-32 rounded-full bg-gradient-to-r from-white to-gray-100 p-1 shadow-2xl">
                                        <div className="w-full h-full rounded-full bg-gray-50 flex items-center justify-center overflow-hidden">
                                            <FaUserCircle className="text-gray-400 w-24 h-24" />
                                        </div>
                                    </div>
                                    <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-400 rounded-full border-4 border-white shadow-lg">
                                        <div className="w-full h-full bg-green-400 rounded-full animate-ping opacity-75"></div>
                                    </div>
                                </div>
                            </div> */}

                            {/* Floating elements */}
                            <HiSparkles className="absolute top-6 left-6 text-white/60 w-6 h-6 animate-pulse" />
                            <HiLightningBolt className="absolute top-12 right-12 text-white/40 w-5 h-5 animate-bounce" />
                        </div>

                        {/* Content */}
                        <div className="pt-20 px-8 pb-8">
                            {/* Name and status */}
                            <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
                                <div className="flex flex-col items-center md:items-start">
                                    <div className="flex items-center space-x-3 mb-2">
                                        <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent capitalize">
                                            {data.full_name}
                                        </h1>
                                        <div className="flex items-center space-x-1">
                                            <FaRegDotCircle className="text-indigo-500 w-4 h-4" />
                                            <span className="text-xs font-semibold text-green-500 bg-green-50 px-2 py-1 rounded-full">
                                                Active
                                            </span>
                                        </div>
                                    </div>
                                    <p className="text-gray-500 font-medium">@{data.username}</p>
                                </div>

                                <button
                                    onClick={() => window.location.reload()}
                                    className="mt-4 md:mt-0 group relative overflow-hidden bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                                >
                                    <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                                    <div className="relative flex items-center space-x-2">
                                        <FaSync className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
                                        <span>Refresh</span>
                                    </div>
                                </button>
                            </div>

                            {/* Stats Cards */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {/* Badge */}
                                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100 hover:shadow-lg transition-all duration-300 group">
                                    <div className="flex items-center space-x-2 mb-2">
                                        <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                                            <HiSparkles className="text-white w-4 h-4" />
                                        </div>
                                        <span className="text-xs font-medium text-blue-600 uppercase tracking-wide">Badge</span>
                                    </div>
                                    <p className="font-bold text-blue-900 group-hover:scale-105 transition-transform duration-200">
                                        {data.badge}
                                    </p>
                                </div>

                                {/* Experience */}
                                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-100 hover:shadow-lg transition-all duration-300 group">
                                    <div className="flex items-center space-x-2 mb-2">
                                        <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                                            <HiLightningBolt className="text-white w-4 h-4" />
                                        </div>
                                        <span className="text-xs font-medium text-purple-600 uppercase tracking-wide">XP</span>
                                    </div>
                                    <p className="font-bold text-purple-900 group-hover:scale-105 transition-transform duration-200">
                                        {data.experience.toLocaleString()}
                                    </p>
                                </div>

                                {/* Rank */}
                                <div className={`bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-4 border border-yellow-100 hover:shadow-lg transition-all duration-300 group`}>
                                    <div className="flex items-center space-x-2 mb-2">
                                        <div className={`w-8 h-8 bg-gradient-to-r ${getRankColor(myrank)} rounded-lg flex items-center justify-center`}>
                                            {getRankIcon(myrank)}
                                        </div>
                                        <span className="text-xs font-medium text-yellow-600 uppercase tracking-wide">Rank</span>
                                    </div>
                                    <p className="font-bold text-yellow-900 group-hover:scale-105 transition-transform duration-200">
                                        #{myrank}
                                    </p>
                                </div>

                                {/* Points */}
                                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-100 hover:shadow-lg transition-all duration-300 group">
                                    <div className="flex items-center space-x-2 mb-2">
                                        <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                                            <FaStar className="text-white w-4 h-4" />
                                        </div>
                                        <span className="text-xs font-medium text-green-600 uppercase tracking-wide">Points</span>
                                    </div>
                                    <p className="font-bold text-green-900 group-hover:scale-105 transition-transform duration-200">
                                        {data.point.toLocaleString()}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

const SkeletonProfile = () => (
    <div className="w-full bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden animate-pulse">
        {/* Cover skeleton */}
        <div className="h-64 bg-gradient-to-br from-gray-300 to-gray-400 relative">
            <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 md:left-12 md:translate-x-0">
                <div className="w-32 h-32 rounded-full bg-gray-300 border-4 border-white shadow-2xl"></div>
            </div>
        </div>

        {/* Content skeleton */}
        <div className="pt-20 px-8 pb-8">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
                <div className="flex flex-col items-center md:items-start">
                    <div className="h-8 w-48 bg-gray-300 rounded-lg mb-2"></div>
                    <div className="h-5 w-32 bg-gray-200 rounded-lg"></div>
                </div>
                <div className="h-12 w-28 bg-gray-300 rounded-xl mt-4 md:mt-0"></div>
            </div>

            {/* Stats skeleton */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                        <div className="flex items-center space-x-2 mb-2">
                            <div className="w-8 h-8 bg-gray-300 rounded-lg"></div>
                            <div className="h-3 w-12 bg-gray-300 rounded"></div>
                        </div>
                        <div className="h-6 w-16 bg-gray-300 rounded"></div>
                    </div>
                ))}
            </div>
        </div>
    </div>
);