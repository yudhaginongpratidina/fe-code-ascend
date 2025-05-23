"use client"
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRocket, FaTrophy, FaChartLine, FaStar, FaGamepad, FaBolt, FaGem, FaArrowRight, FaPlay, FaCode, FaUsers, FaMedal, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export default function Page() {
    const [currentSlide, setCurrentSlide] = useState(0);

    const heroStats = [
        { icon: FaUsers, value: '50K+', label: 'Active Learners' },
        { icon: FaCode, value: '200+', label: 'Programming Challenges' },
        { icon: FaMedal, value: '98%', label: 'Success Rate' },
        { icon: FaTrophy, value: '10K+', label: 'Achievements Unlocked' }
    ];

    const features = [
        {
            icon: FaChartLine,
            title: 'Real-time Progress Tracking',
            description: 'Monitor your coding journey with detailed analytics and visual progress indicators that update in real-time.',
            color: 'from-blue-500 to-cyan-500'
        },
        {
            icon: FaTrophy,
            title: 'Achievement System',
            description: 'Unlock badges, trophies, and rewards as you complete challenges and reach new milestones.',
            color: 'from-yellow-500 to-orange-500'
        },
        {
            icon: FaGamepad,
            title: 'Gamified Learning',
            description: 'Experience points, level progression, and competitive leaderboards make learning addictive.',
            color: 'from-purple-500 to-pink-500'
        },
    ];

    const testimonials = [
        {
            name: 'Sarah Chen',
            role: 'Frontend Developer',
            image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
            content: 'The gamification approach completely changed how I learn programming. Seeing my progress visualized keeps me motivated every day!'
        },
        {
            name: 'Marcus Johnson',
            role: 'Full Stack Engineer',
            image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
            content: 'I love the achievement system! It makes every small win feel significant and keeps me coming back for more challenges.'
        },
        {
            name: 'Elena Rodriguez',
            role: 'Software Engineer',
            image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
            content: 'The progress tracking is incredibly detailed. I can see exactly where I improve and what areas need more focus.'
        }
    ];

    const progressDemo = [
        { skill: 'JavaScript', progress: 85, level: 'Advanced' },
        { skill: 'React', progress: 70, level: 'Intermediate' },
        { skill: 'Python', progress: 92, level: 'Expert' },
        { skill: 'Node.js', progress: 60, level: 'Intermediate' }
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % testimonials.length);
        }, 4000);
        return () => clearInterval(timer);
    }, []);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
            {/* Hero Section */}
            <motion.section
                className="relative min-h-screen flex items-center justify-center px-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                {/* Background Elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <motion.div
                        className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-sm blur-3xl"
                        animate={{
                            scale: [1, 1.2, 1],
                            rotate: [0, 180, 360]
                        }}
                        transition={{
                            duration: 20,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                    />
                    <motion.div
                        className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-sm blur-3xl"
                        animate={{
                            scale: [1.2, 1, 1.2],
                            rotate: [360, 180, 0]
                        }}
                        transition={{
                            duration: 25,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                    />
                </div>

                <div className="container mx-auto text-center relative z-10">
                    <motion.div
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="mb-8"
                    >
                        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-sm border border-purple-500/30 rounded-sm px-6 py-3 mb-6">
                            <FaBolt className="text-yellow-400" />
                            <span className="text-sm font-medium">New Feature Launch</span>
                        </div>

                        <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
                            Track Your
                            <br />
                            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                                Learning Journey
                            </span>
                        </h1>

                        <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed">
                            Experience the future of programming education with our gamified learning progress system.
                            Track achievements, unlock rewards, and level up your coding skills like never before.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
                    >
                        <button
                            onClick={() => { window.location.href = "/login"; }}
                            className="group bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-8 py-4 rounded-sm font-semibold text-lg transition-all duration-300 flex items-center gap-3 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25"
                        >
                            <FaPlay className="group-hover:translate-x-1 transition-transform" />
                            Start Learning Now
                        </button>
                    </motion.div>

                    {/* Stats */}
                    <motion.div
                        initial={{ y: 40, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
                    >
                        {heroStats.map((stat, index) => (
                            <motion.div
                                key={index}
                                whileHover={{ scale: 1.05 }}
                                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-sm p-6 text-center hover:bg-white/10 transition-all duration-300"
                            >
                                <stat.icon className="text-3xl text-purple-400 mx-auto mb-3" />
                                <div className="text-3xl font-bold mb-1">{stat.value}</div>
                                <div className="text-gray-400 text-sm">{stat.label}</div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </motion.section>

            {/* Features Section */}
            <section className="py-20 px-6 relative">
                <div className="container mx-auto">
                    <motion.div
                        initial={{ y: 50, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                            Powerful Features
                        </h2>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                            Our gamified learning system is packed with features designed to keep you motivated and on track
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ y: 50, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                whileHover={{ y: -10, scale: 1.02 }}
                                className="group relative"
                            >
                                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-sm p-8 h-full hover:bg-white/10 transition-all duration-300 hover:border-white/20">
                                    <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                        <feature.icon className="text-2xl text-white" />
                                    </div>
                                    <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                                    <p className="text-gray-300 leading-relaxed">{feature.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
            {/* CTA Section */}
            <section className="py-20 px-6 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20" />
                <div className="container mx-auto text-center relative z-10">
                    <motion.div
                        initial={{ y: 50, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                            Ready to Level Up?
                        </h2>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12">
                            Join the gamified learning revolution and transform your programming skills today
                        </p>

                        <motion.button
                            onClick={() => { window.location.href = "/login"; }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-12 py-6 rounded-sm font-bold text-xl transition-all duration-300 flex items-center gap-4 mx-auto hover:shadow-2xl hover:shadow-purple-500/25"
                        >
                            <FaRocket className="text-2xl" />
                            Start Your Journey Now
                        </motion.button>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};
