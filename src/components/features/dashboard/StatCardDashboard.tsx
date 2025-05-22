import { JSX } from "react";

export default function StatCardDashboard({ icon, title, value, bgColor }: { icon: JSX.Element; title: string; value: any; bgColor: string; percentage?: number | null; }) {
    return (
        <div className={`rounded-sm p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${bgColor}`}>
            <div className="flex items-center justify-between">
                <div className="text-4xl opacity-90">{icon}</div>
            </div>
            <div className="mt-6">
                <div className="text-3xl font-bold">
                    {value}
                </div>
                <div className="text-sm font-medium mt-1 opacity-80">{title}</div>
            </div>
        </div>
    )
}