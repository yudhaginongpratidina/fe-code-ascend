import Link from "next/link";
import { FaDisplay } from "react-icons/fa6";
import { IoCode } from "react-icons/io5";
import { MdTrackChanges } from "react-icons/md";

export default function FeatureHome() {
    return (
        <section className="w-full py-10 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <CardFeature
                        icon={<IoCode className="w-6 h-6 text-blue-600" />}
                        name="Live Code Editor"
                        description="Write, compile, and run code directly in the browser with our user-friendly code editor and real-time feedback."
                        href="/interactive-code-editor"
                        borderColor="border-blue-500"
                        iconColor="bg-blue-100"
                    />
                    <CardFeature
                        icon={<FaDisplay className="w-6 h-6 text-indigo-600" />}
                        name="Fast and Interactive Learning"
                        description="An interactive learning method that makes it easy to understand basic programming concepts."
                        href="/fast-and-interactive-learning"
                        borderColor="border-indigo-500"
                        iconColor="bg-indigo-100"
                    />
                    <CardFeature
                        icon={<MdTrackChanges className="w-6 h-6 text-yellow-600" />}
                        name="Learning Progress"
                        description="Learning progress that shows the development of understanding of basic programming concepts."
                        href="/learning-progress"
                        borderColor="border-yellow-500"
                        iconColor="bg-yellow-100"
                    />
                </div>
            </div>
        </section>
    )
}

const CardFeature = ({ icon, name, description, href, borderColor, iconColor }: Readonly<{ icon: React.ReactNode, name: string, description: string, href: string, borderColor: string, iconColor: string }>) => {
    return (
        <>
            <div className={`bg-white rounded-sm shadow-lg p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-xl border-t-4 ${borderColor}`}>
                <div className="flex items-center mb-4">
                    <div className={`w-12 h-12 rounded-full ${iconColor} flex items-center justify-center mr-4`}>
                        {icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">{name}</h3>
                </div>
                <p className="text-gray-600">{description}</p>
                <Link href={href} className="mt-4 flex items-center text-blue-600 font-semibold hover:underline hover:underline-offset-4">
                    <span>Learn More</span>
                </Link>
            </div>
        </>
    )
}