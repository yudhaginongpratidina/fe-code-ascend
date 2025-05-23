"use client"
import React, { useState, useEffect } from 'react';
import { FaRocket, FaTrophy, FaGamepad, FaStar, FaCoins, FaChartLine, FaUsers, FaBolt, FaGift, FaCode, FaPlay, FaArrowRight, FaCheckCircle } from 'react-icons/fa';

type VisibilityKeys = 'hero' | 'stats' | 'slider' | 'features' | 'cta';
type VisibilityState = Partial<Record<VisibilityKeys, boolean>>;

const LandingPage = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isVisible, setIsVisible] = useState<VisibilityState>({});

    const slides = [
        {
            icon: <FaGamepad className="text-4xl text-purple-500" />,
            title: "Gamified Learning Experience",
            description: "Transform boring lessons into exciting adventures. Complete challenges, unlock achievements, and level up your programming skills in a game-like environment.",
            image: "🎮"
        },
        {
            icon: <FaCoins className="text-4xl text-yellow-500" />,
            title: "Earn Points & Rewards",
            description: "Complete quizzes and challenges to earn valuable points. Exchange your points for premium modules, exclusive content, and special features.",
            image: "💰"
        },
        {
            icon: <FaTrophy className="text-4xl text-orange-500" />,
            title: "Competitive Leaderboards",
            description: "Climb the rankings and showcase your progress. Compete with fellow learners and get motivated by friendly competition.",
            image: "🏆"
        }
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 4000);
        return () => clearInterval(timer);
    }, []);

    // Intersection Observer for animations
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
                    }
                });
            },
            { threshold: 0.1 }
        );

        const elements = document.querySelectorAll('[data-animate]');
        elements.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    const stats = [
        { icon: <FaUsers />, value: "50K+", label: "Active Learners" },
        { icon: <FaCode />, value: "200+", label: "Interactive Modules" },
        { icon: <FaTrophy />, value: "1M+", label: "Points Earned" },
    ];

    const features = [
        {
            icon: <FaBolt className="text-yellow-500" />,
            title: "Lightning Fast Learning",
            description: "Quick, bite-sized lessons that fit your schedule. Learn programming concepts in minutes, not hours."
        },
        {
            icon: <FaGamepad className="text-purple-500" />,
            title: "Interactive Challenges",
            description: "Hands-on coding challenges that make learning fun and engaging. Practice while you play."
        },
        {
            icon: <FaGift className="text-pink-500" />,
            title: "Reward System",
            description: "Earn points for every completed quiz and challenge. Unlock new modules and exclusive content."
        },
        {
            icon: <FaChartLine className="text-green-500" />,
            title: "Progress Tracking",
            description: "Visual progress tracking with XP system. See your growth and stay motivated to learn more."
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
            {/* Hero Section */}
            <div className="relative min-h-screen flex items-center justify-center px-4">
                {/* Animated Background Elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
                </div>

                <div className="relative z-10 text-center max-w-6xl mx-auto">
                    <div
                        className={`transform transition-all duration-1000 ${isVisible.hero ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                        id="hero"
                        data-animate
                    >
                        <div className="flex justify-center mb-8">
                            <div className="relative">
                                <FaRocket className="text-6xl text-purple-500 animate-bounce" />
                                <div className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-400 rounded-full animate-ping"></div>
                            </div>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent leading-tight">
                            Fast & Interactive
                            <br />
                            <span className="text-white">Learning</span>
                        </h1>

                        <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                            Master programming through gamified learning. Earn points, climb leaderboards,
                            and unlock new modules in the most engaging way possible.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <button onClick={() => { window.location.href = "/login"; }} className="group bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-8 py-4 rounded-sm font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25 flex items-center gap-3">
                                <FaPlay className="group-hover:translate-x-1 transition-transform duration-300" />
                                Start Learning Now
                            </button>
                        </div>
                    </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute top-32 left-10 animate-float">
                    <div className="bg-yellow-500/20 p-4 rounded-sm backdrop-blur-sm border border-yellow-500/30">
                        <FaCoins className="text-2xl text-yellow-400" />
                    </div>
                </div>

                <div className="absolute top-40 right-10 animate-float delay-1000">
                    <div className="bg-purple-500/20 p-4 rounded-sm backdrop-blur-sm border border-purple-500/30">
                        <FaTrophy className="text-2xl text-purple-400" />
                    </div>
                </div>
            </div>

            {/* Stats Section */}
            <div className="py-20 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                        {stats.map((stat, index) => (
                            <div
                                key={index}
                                className={`text-center transform transition-all duration-1000 delay-${index * 200} ${isVisible.stats ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                                id="stats"
                                data-animate
                            >
                                <div className="text-3xl text-purple-400 mb-2 flex justify-center">
                                    {stat.icon}
                                </div>
                                <div className="text-3xl md:text-6xl font-bold text-white mb-1">
                                    {stat.value}
                                </div>
                                <div className="text-gray-400">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Interactive Slider Section */}
            <div className="py-20 px-4">
                <div className="max-w-6xl mx-auto">
                    <div
                        className={`text-center mb-16 transform transition-all duration-1000 ${isVisible.slider ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                        id="slider"
                        data-animate
                    >
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                            Why Choose Our Platform?
                        </h2>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                            Experience the future of programming education with our innovative features
                        </p>
                    </div>

                    {/* Slider */}
                    <div className="relative bg-white/5 backdrop-blur-sm rounded-sm p-8 border border-white/10">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div className="order-2 md:order-1">
                                <div className="mb-6 flex justify-center md:justify-start">
                                    {slides[currentSlide].icon}
                                </div>
                                <h3 className="text-3xl font-bold mb-4 text-center md:text-left">
                                    {slides[currentSlide].title}
                                </h3>
                                <p className="text-lg text-gray-300 mb-6 text-center md:text-left leading-relaxed">
                                    {slides[currentSlide].description}
                                </p>

                                {/* Slide Indicators */}
                                <div className="flex justify-center md:justify-start gap-3">
                                    {slides.map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setCurrentSlide(index)}
                                            className={`w-3 h-3 rounded-sm transition-all duration-300 ${currentSlide === index ? 'bg-purple-500 scale-125' : 'bg-gray-600'
                                                }`}
                                        />
                                    ))}
                                </div>
                            </div>

                            <div className="order-1 md:order-2 flex justify-center">
                                <div className="text-8xl animate-bounce">
                                    {slides[currentSlide].image}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Grid */}
            <div className="py-20 px-4">
                <div className="max-w-6xl mx-auto">
                    <div
                        className={`text-center mb-16 transform transition-all duration-1000 ${isVisible.features ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                        id="features"
                        data-animate
                    >
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">
                            Powerful Features
                        </h2>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                            Everything you need to accelerate your programming journey
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className={`group bg-white/5 backdrop-blur-sm p-8 rounded-sm border border-white/10 hover:border-purple-500/50 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/10 transform delay-${index * 100} ${isVisible.features ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                            >
                                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-3 group-hover:text-purple-400 transition-colors duration-300">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Gamification Benefits */}
            <div className="py-20 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 backdrop-blur-sm rounded-sm p-12 border border-purple-500/20">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                                    Level Up Your Skills
                                </h2>
                                <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                                    Our gamification system makes learning addictive in the best way possible.
                                    Complete quizzes, earn XP, collect points, and unlock exclusive content.
                                </p>

                                <div className="space-y-4">
                                    {[
                                        "Complete interactive quizzes to earn points",
                                        "Gain XP and climb the global leaderboard",
                                        "Unlock premium modules with earned points",
                                        "Compete with friends and stay motivated"
                                    ].map((item, index) => (
                                        <div key={index} className="flex items-center gap-3">
                                            <FaCheckCircle className="text-green-400 text-xl flex-shrink-0" />
                                            <span className="text-lg">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="flex justify-center">
                                <div className="relative">
                                    <div className="w-80 h-80 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center animate-pulse">
                                        <div className="text-center">
                                            <FaTrophy className="text-6xl text-yellow-300 mb-4 mx-auto animate-bounce" />
                                            <div className="text-2xl font-bold">Level 42</div>
                                            <div className="text-sm opacity-75">Programming Master</div>
                                        </div>
                                    </div>

                                    {/* Floating achievement badges */}
                                    <div className="absolute -top-4 -left-4 bg-yellow-500 p-3 rounded-full animate-spin-slow">
                                        <FaStar className="text-white text-xl" />
                                    </div>
                                    <div className="absolute -bottom-4 -right-4 bg-green-500 p-3 rounded-full animate-bounce">
                                        <FaCoins className="text-white text-xl" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="py-20 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <div
                        className={`transform transition-all duration-1000 ${isVisible.cta ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                        id="cta"
                        data-animate
                    >
                        <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                            Ready to Start Your Journey?
                        </h2>
                        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                            Join thousands of learners who are already mastering programming through our gamified platform.
                        </p>
                        <button onClick={() => { window.location.href = "/login"; }} className="group bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 hover:from-purple-700 hover:via-pink-700 hover:to-blue-700 px-12 py-6 rounded-sm font-bold text-xl transition-all duration-300 transform hover:scale-110 hover:shadow-2xl hover:shadow-purple-500/25 flex items-center gap-4 mx-auto">
                            <FaRocket className="group-hover:translate-y-[-4px] transition-transform duration-300" />
                            Launch Your Learning Adventure
                            <FaArrowRight className="group-hover:translate-x-2 transition-transform duration-300" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Custom CSS for animations */}
            <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
        </div>
    );
};

export default LandingPage;