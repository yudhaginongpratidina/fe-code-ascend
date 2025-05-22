import { FaCoins, FaUserCircle } from "react-icons/fa";
import { IoIosRocket } from "react-icons/io";
import { TbBadgesFilled } from "react-icons/tb";

export default function LeverProgressCardDashboard({ currentUser }: { currentUser: any }) {
    return (
        <div className="rounded-sm bg-white p-6 shadow-lg border border-gray-100 h-full">
            <div className="flex items-center gap-2 mb-6">
                <IoIosRocket className="text-purple-500 text-xl" />
                <h3 className="text-xl font-bold text-gray-800">Your Info</h3>
            </div>
            <div className="grid grid-cols-3 gap-4">
                <div className="bg-blue-50 p-3 rounded-sm text-center">
                    <div className="flex justify-center text-blue-600 mb-1">
                        <TbBadgesFilled className="text-xl" />
                    </div>
                    <div className="font-bold text-gray-800">{currentUser?.badge}</div>
                    <div className="text-xs text-gray-600">Badge</div>
                </div>
                <div className="bg-green-50 p-3 rounded-sm text-center">
                    <div className="flex justify-center text-green-600 mb-1">
                        <FaCoins className="text-xl" />
                    </div>
                    <div className="font-bold text-gray-800">{currentUser?.point || 0} point</div>
                    <div className="text-xs text-gray-600">Remaining points</div>
                </div>
                <div className="bg-yellow-50 p-3 rounded-sm text-center">
                    <div className="flex justify-center text-yellow-600 mb-1">
                        <FaUserCircle className="text-xl" />
                    </div>
                    <div className="font-bold text-gray-800 capitalize">{currentUser?.role}</div>
                    <div className="text-xs text-gray-600">Status</div>
                </div>
            </div>
        </div>
    )
}