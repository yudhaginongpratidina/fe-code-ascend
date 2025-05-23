"use client"
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight, FaCode, FaPlay } from 'react-icons/fa';
import { IoTerminalSharp } from 'react-icons/io5';
import { MdOutlineLanguage } from 'react-icons/md';
import { VscDebugConsole, VscVmRunning } from 'react-icons/vsc';

const Button = ({ onClick, children, variant = "default", className = "" }: Readonly<{ onClick: () => void; children: React.ReactNode; variant?: "default" | "outline" | "ghost"; className?: string }>) => {
    const baseStyles = "px-6 py-3 rounded-sm font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 transform hover:scale-105 flex items-center";
    const variants = {
        default: "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 focus:ring-blue-500 shadow-lg hover:shadow-xl",
        outline: "border-2 border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-blue-500 backdrop-blur-sm",
        ghost: "text-white hover:bg-white/10 focus:ring-white/20"
    };
    return (
        <button onClick={onClick} className={`${baseStyles} ${variants[variant]} ${className}`}>
            {children}
        </button>
    );
};

const CodeBlock = () => {
    const [currentLine, setCurrentLine] = useState(0);
    const codeLines = [
        { line: 1, code: "// Welcome to CodeFlow Editor", type: "comment" },
        { line: 2, code: "function fibonacci(n) {", type: "function" },
        { line: 3, code: "  if (n <= 1) return n;", type: "logic" },
        { line: 4, code: "  return fibonacci(n-1) + fibonacci(n-2);", type: "logic" },
        { line: 5, code: "}", type: "function" },
        { line: 6, code: "", type: "empty" },
        { line: 7, code: "console.log(fibonacci(10));", type: "output" },
        { line: 8, code: "// Output: 55", type: "comment" }
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentLine((prev) => (prev + 1) % codeLines.length);
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="bg-gray-900 rounded-sm overflow-hidden shadow-2xl border border-gray-700">
            {/* Terminal Header */}
            <div className="bg-gray-800 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="flex items-center space-x-2 text-gray-400 text-sm">
                    <IoTerminalSharp className="w-4 h-4" />
                    <span>main.js</span>
                </div>
                <div className="flex items-center space-x-2">
                    <FaPlay className="w-4 h-4 text-green-400" />
                    <span className="text-green-400 text-sm">Running</span>
                </div>
            </div>

            {/* Code Content */}
            <div className="p-6 font-mono text-sm">
                {codeLines.map((item, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{
                            opacity: index <= currentLine ? 1 : 0.3,
                            x: 0,
                            scale: index === currentLine ? 1.02 : 1
                        }}
                        transition={{ delay: index * 0.1, duration: 0.3 }}
                        className={`flex items-center space-x-4 py-1 rounded ${index === currentLine ? 'bg-blue-900/30' : ''}`}
                    >
                        <span className="text-gray-500 w-6 text-right">{item.line}</span>
                        <span className={`${item.type === 'comment' ? 'text-green-400' :
                            item.type === 'function' ? 'text-blue-400' :
                                item.type === 'logic' ? 'text-purple-400' :
                                    item.type === 'output' ? 'text-yellow-400' :
                                        'text-gray-300'
                            }`}>
                            {item.code}
                        </span>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

const FeatureCard = ({ icon: Icon, title, description, delay = 0 }: Readonly<{ icon: React.ReactNode, title: string, description: string, delay?: number }>) => (
    <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 0.5 }}
        whileHover={{ scale: 1.05, rotateY: 5 }}
        className="bg-white/10 backdrop-blur-lg rounded-sm p-6 border border-white/20 hover:bg-white/20 transition-all duration-300"
    >
        <div className="bg-white/20 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
            {Icon}
        </div>
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-white/80">{description}</p>
    </motion.div>
);

const Screenshot = ({ src, title, description }: Readonly<{ src: string, title: string, description: string }>) => (
    <motion.div
        whileHover={{ scale: 1.05 }}
        className="bg-white rounded-sm overflow-hidden shadow-xl border border-gray-200"
    >
        <div className="bg-gray-100 p-4">
            <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                <span className="text-gray-600 text-sm ml-2">{title}</span>
            </div>
        </div>
        <div className="relative aspect-video bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center" style={{ backgroundImage: `url(${src})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}>
            <div className="absolute inset-0 bg-black/80 z-0"></div>
            <div className="relative z-10 text-center p-8">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaCode className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">{title}</h4>
                <p className="text-gray-200">{description}</p>
            </div>
        </div>

    </motion.div>
);

export default function CodeFlowLanding() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAutoplay, setIsAutoplay] = useState(true);

    const slides = [
        {
            title: "Real-Time Code Execution",
            description: "Write and run code with instant feedback directly in your browser. See results as you type with our lightning-fast execution engine.",
            icon: <FaCode className="w-8 h-8 text-white" />,
            gradient: "from-yellow-400 to-orange-600"
        },
        {
            title: "User-Friendly Interface",
            description: "Enjoy a seamless coding experience with our intuitive editor. Dark mode, syntax highlighting, and smart auto-completion included.",
            icon: <FaCode className="w-8 h-8 text-white" />,
            gradient: "from-purple-400 to-pink-600"
        },
        {
            title: "Multi-Language Support",
            description: "Write in JavaScript, Python, Go, Rust, and 20+ more languages — all in one powerful, unified platform.",
            icon: <FaCode className="w-8 h-8 text-white" />,
            gradient: "from-blue-400 to-cyan-600"
        }
    ];

    const features = [
        {
            icon: <VscVmRunning className="w-8 h-8 text-white" />,
            title: "Instant Execution",
            description: "Run code instantly without setup. No configuration needed, just pure coding bliss."
        },
        {
            icon: <MdOutlineLanguage className="w-8 h-8 text-white" />,
            title: "Multi-Language Support",
            description: "Write in JavaScript, Python, Go, Rust, and 20+ more languages — all in one powerful, unified platform."
        },
        {
            icon: <VscDebugConsole className="w-8 h-8 text-white" />,
            title: "Instant Feedback",
            description: "See results as you type with our lightning-fast execution engine. No waiting for compilation, just pure coding magic."
        },
    ];

    const screenshots = [
        {
            title: "Main Editor",
            description: "Clean, distraction-free coding environment",
            src: "/img/main-editor.png"
        },
        {
            title: "Multi-Language Support",
            description: "Write in JavaScript, Python, Go, Rust, and 20+ more languages — all in one powerful, unified platform.",
            src: "/img/multi-language.png"
        },
    ];

    useEffect(() => {
        if (isAutoplay) {
            const timer = setInterval(() => {
                setCurrentSlide((prev) => (prev + 1) % slides.length);
            }, 4000);
            return () => clearInterval(timer);
        }
    }, [isAutoplay, slides.length]);

    const nextSlide = () => {
        setIsAutoplay(false);
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setIsAutoplay(false);
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            {/* Animated Background */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    animate={{ rotate: 360, scale: [1, 1.1, 1] }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
                />
                <motion.div
                    animate={{ rotate: -360, scale: [1, 1.2, 1] }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
                />
            </div>

            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative z-10 text-center pt-20 pb-12 px-4"
            >
                <motion.div
                    animate={{ scale: [1, 1.05, 1], rotate: [0, 1, -1, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="inline-block mb-6"
                >
                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto shadow-2xl">
                        <FaCode className="w-10 h-10 text-white" />
                    </div>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-6"
                >
                    Live Code Editor
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto mb-8 leading-relaxed"
                >
                    Write, compile, and run code directly in the browser with our user-friendly code editor and real-time feedback.
                </motion.p>
            </motion.div>

            {/* Code Editor Preview */}
            <div className="relative z-10 max-w-6xl mx-auto px-4 mb-20">
                <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    viewport={{ once: true }}
                >
                    <CodeBlock />
                </motion.div>
            </div>

            {/* Feature Slider */}
            <div className="relative z-10 max-w-6xl mx-auto px-4 mb-20">
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-4xl md:text-5xl font-bold text-center text-white mb-12"
                >
                    Powerful Features
                </motion.h2>

                <div className="relative">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentSlide}
                            initial={{ opacity: 0, x: 300 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -300 }}
                            transition={{ duration: 0.5 }}
                            className={`rounded-sm overflow-hidden shadow-2xl bg-gradient-to-r ${slides[currentSlide].gradient} p-12 text-center`}
                        >
                            <div className="bg-white/20 w-20 h-20 rounded-sm flex items-center justify-center mx-auto mb-6">
                                <FaCode className="w-10 h-10 text-white" />
                            </div>
                            <h3 className="text-3xl font-bold text-white mb-4">{slides[currentSlide].title}</h3>
                            <p className="text-xl text-white/90 max-w-2xl mx-auto">{slides[currentSlide].description}</p>
                        </motion.div>
                    </AnimatePresence>

                    <div className="flex justify-between items-center mt-8">
                        <Button variant="ghost" onClick={prevSlide} className="!p-3">
                            <FaChevronLeft className="w-6 h-6" />
                        </Button>
                        <div className="flex space-x-2">
                            {slides.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => {
                                        setCurrentSlide(index);
                                        setIsAutoplay(false);
                                    }}
                                    className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide ? 'bg-white scale-125' : 'bg-white/50'}`}
                                />
                            ))}
                        </div>
                        <Button variant="ghost" onClick={nextSlide} className="!p-3">
                            <FaChevronRight className="w-6 h-6" />
                        </Button>
                    </div>
                </div>
            </div>

            {/* Features Grid */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 mb-20">
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-4xl md:text-5xl font-bold text-center text-white mb-12"
                >
                    Why Choose CodeFlow?
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <FeatureCard
                            key={index}
                            icon={feature.icon}
                            title={feature.title}
                            description={feature.description}
                            delay={index * 0.1}
                        />
                    ))}
                </div>
            </div>

            {/* Screenshots Section */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 pb-6">
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-4xl md:text-5xl font-bold text-center text-white mb-12"
                >
                    Screenshots
                </motion.h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {screenshots.map((screenshot, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.2, duration: 0.5 }}
                        >
                            <Screenshot {...screenshot} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}