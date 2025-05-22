import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function Layout({ children }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <>
            <Navbar />
            <main className="w-full min-h-screen p-4 flex items-center justify-center">
                {children}
            </main>
            <Footer />
        </>
    );
}