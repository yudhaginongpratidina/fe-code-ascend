import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function Layout({ children }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <>
            <Navbar />
            <main className="w-full min-h-screen pt-14">
                {children}
            </main>
            <Footer />
        </>
    );
}