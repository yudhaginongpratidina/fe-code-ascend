"use client";
import Navbar from "@/components/layout/Navbar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function Layout({ children }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <>
            <Navbar />
            <main className="w-full pt-16 min-h-screen">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-4">
                    <Header />
                    {children}
                </div>
            </main>
            <Footer />
        </>
    );
}