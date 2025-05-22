import Image from "next/image"
import Link from "next/link"

export default function JumbotronHome() {
    return (
        <section className="relative w-full min-h-[650px] flex flex-col justify-center bg-gradient-to-r from-indigo-900 to-blue-800 overflow-hidden">
            <div className="container relative mx-auto grid items-center grid-cols-1 lg:grid-cols-2 gap-12 px-4 md:px-6 z-10">
                <div className="w-full flex flex-col gap-6 py-12">
                    <div className="inline-block px-4 py-2 bg-blue-100 text-blue-800 rounded-sm text-sm font-semibold mb-2">
                        Best interactive learning
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                        Master <span className="text-yellow-400">Programming</span>
                        <br />Through Interactive
                        <br />Learning
                    </h1>
                    <p className="text-lg text-blue-100 max-w-md">
                        Join our gamified learning platform where you can practice coding, compete with peers,
                        and track progress. Start your journey to become a professional developer.
                    </p>
                    <div className="flex flex-wrap gap-4 mt-4">
                        <ButtonCTA href="/login" name="Start Learning" className="bg-yellow-400 hover:bg-yellow-500 text-blue-900" />
                        <ButtonCTA href="/list-module" name="View Module" className="bg-transparent border-2 border-white hover:bg-white/10 text-white" />
                    </div>
                </div>
                <div className="hidden lg:flex w-full h-[500px] relative rounded-xl overflow-hidden shadow-2xl transform rotate-2 hover:rotate-0 transition-all duration-500">
                    <Image
                        src="/img/hero_01.jpg"
                        alt="Developer coding"
                        fill
                        priority
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/60 to-transparent"></div>

                    {/* Floating Elements */}
                    <div className="absolute top-6 right-6 px-3 py-1 bg-white/90 rounded-lg text-xs font-bold text-blue-900 shadow-md">
                        PROFESSIONAL LEVEL
                    </div>
                    <div className="absolute bottom-6 left-6 px-4 py-2 bg-yellow-400/90 rounded-lg text-sm font-bold text-blue-900 shadow-md">
                        Start Today!
                    </div>
                </div>
            </div>
        </section>
    )
}

const ButtonCTA = ({ href, name, className }: { href: string, name: string, className?: string }) => {
    return (
        <Link href={href} className={`px-6 py-3 rounded-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${className}`}>
            {name}
        </Link>
    )
}