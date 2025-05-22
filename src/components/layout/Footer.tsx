"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
    const pathname = usePathname();

    const isFixedFooter = !(
        pathname === "/home" ||
        pathname.startsWith("/list-module") ||
        pathname === "/docs"
    );

    return (
        <footer className={`w-full ${isFixedFooter ? "fixed bottom-0 z-10" : ""}`}>
            <div className="w-full h-14 px-4 md:px-14 box-border flex justify-between items-center shadow drop-shadow-sm bg-white">
                <p className="text-gray-500 text-sm">
                    © {new Date().getFullYear()} YourCompany. All rights reserved.
                </p>
                <div className="flex space-x-6 mt-4 md:mt-0">
                    <Link href="/privacy" className="text-gray-500 hover:text-blue-600 text-sm">
                        Privacy Policy
                    </Link>
                    <Link href="/terms" className="text-gray-500 hover:text-blue-600 text-sm">
                        Terms of Service
                    </Link>
                    <Link href="/cookies" className="text-gray-500 hover:text-blue-600 text-sm">
                        Cookie Policy
                    </Link>
                </div>
            </div>
        </footer>
    );
}
