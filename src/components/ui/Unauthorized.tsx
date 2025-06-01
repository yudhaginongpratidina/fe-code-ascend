import React from 'react';
import { MdBlock, MdArrowBack, MdHome, MdSecurity } from 'react-icons/md';
import { RiShieldCrossLine } from 'react-icons/ri';
import { BiLockAlt } from 'react-icons/bi';

export default function Unauthorized() {
    return (
        <div className=" bg-white flex items-center justify-center p-4">
            <div className="max-w-2xl w-full text-center">
                {/* Animated Icon Container */}
                <div className="relative mb-8">
                    <div className="w-32 h-32 mx-auto bg-black rounded-full flex items-center justify-center relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-black opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <RiShieldCrossLine className="text-white text-6xl z-10 transform group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    {/* Floating decorative elements */}
                    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 -translate-y-4">
                        <BiLockAlt className="text-gray-300 text-2xl animate-bounce" style={{ animationDelay: '0.5s' }} />
                    </div>
                    <div className="absolute bottom-4 right-1/4 transform translate-x-4 translate-y-4">
                        <MdSecurity className="text-gray-400 text-xl animate-pulse" />
                    </div>
                </div>

                {/* Main Content */}
                <div className="space-y-6">
                    <div className="space-y-3">
                        <h1 className="text-6xl font-bold text-black tracking-tight">
                            4<span className="text-gray-400">0</span>3
                        </h1>
                        <h2 className="text-3xl font-semibold text-black">
                            Unauthorized Access
                        </h2>
                    </div>

                    <div className="max-w-md mx-auto space-y-4">
                        <p className="text-gray-600 text-lg leading-relaxed">
                            You don't have permission to access this resource. Please contact your administrator or sign in with proper credentials.
                        </p>

                        <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                            <MdBlock className="text-lg" />
                            <span>Access Denied</span>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
                        <button type="button" onClick={() => window.history.back()} className="group flex items-center space-x-3 bg-black text-white px-8 py-4 rounded-full hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 shadow-lg">
                            <MdArrowBack className="text-xl group-hover:-translate-x-1 transition-transform duration-300" />
                            <span className="font-medium">Go Back</span>
                        </button>

                        <button type="button" onClick={() => window.location.href = '/'} className="group flex items-center space-x-3 border-2 border-black text-black px-8 py-4 rounded-full hover:bg-black hover:text-white transition-all duration-300 transform hover:scale-105">
                            <MdHome className="text-xl group-hover:rotate-12 transition-transform duration-300" />
                            <span className="font-medium">Home Page</span>
                        </button>
                    </div>
                </div>

                {/* Bottom decorative line */}
                <div className="mt-16 flex justify-center">
                    <div className="w-24 h-1 bg-gradient-to-r from-transparent via-black to-transparent opacity-30"></div>
                </div>
            </div>

            {/* Background Pattern */}
            <div className="fixed inset-0 pointer-events-none opacity-[0.02]">
                <div className="absolute inset-0"
                    style={{
                        backgroundImage: `radial-gradient(circle at 20% 50%, black 1px, transparent 1px), 
                                          radial-gradient(circle at 80% 50%, black 1px, transparent 1px)`,
                        backgroundSize: '100px 100px'
                    }}>
                </div>
            </div>
        </div>
    );
}