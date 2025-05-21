"use client"
import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

import { FaLaptopCode, FaUser } from "react-icons/fa";
import { IoMoon } from "react-icons/io5";
import { MdMenu } from "react-icons/md";

export default function Navbar() {
    const pathname = usePathname();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [hamburgerRightIsAcitive, setHamburgerRightIsAcitive] = useState<boolean>(false);

    return (
        <nav className="w-full fixed top-0 z-30">
            <div className="w-full h-14 px-4 md:px-14 box-border flex justify-between items-center shadow drop-shadow-sm bg-white">
                <NavbarItems>
                    <NavbarBrand />
                </NavbarItems>
                {(pathname === "/home" || pathname.startsWith("/list-module") || pathname.startsWith("/docs")) && (
                    <NavbarItems className="hidden md:flex">
                        <NavbarLink href="/home" name="Home" />
                        <NavbarLink href="/list-module" name="Module" />
                        <NavbarLink href="/docs" name="Docs" />
                    </NavbarItems>
                )}
                <NavbarItems>
                    <NavbarIconButton icon={<IoMoon className="w-6 h-6" />} onClick={() => { }} />
                    {isAuthenticated
                        ? <NavbarIconButton icon={<FaUser className="w-6 h-6" />} onClick={() => { }} />
                        : <NavbarButtonLink href="/login" name="Login" />
                    }
                    <NavbarHamburgerRight onClick={() => setHamburgerRightIsAcitive(!hamburgerRightIsAcitive)} />
                </NavbarItems>
            </div>
            {hamburgerRightIsAcitive && (
                <div className="md:hidden w-full px-4 md:px-14 py-4 flex flex-col gap-2.5 shadow drop-shadow-sm bg-white">
                    <NavbarLink href="/home" name="Home" />
                    <NavbarLink href="/list-module" name="Module" />
                    <NavbarLink href="/docs" name="Docs" />
                </div>
            )}
        </nav>
    )
}

const NavbarItems = ({ children, className }: Readonly<{ children: React.ReactNode; className?: string }>) => {
    return (
        <div className={`flex items-center gap-2.5 ${className}`}>
            {children}
        </div>
    )
}

const NavbarBrand = () => {
    return (
        <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 flex items-center justify-center border rounded-sm shadow-sm border-gray-200">
                <FaLaptopCode className="w-6 h-6" />
            </div>
            <h1 className="hidden md:block text-lg font-semibold">Code Ascend</h1>
        </Link>
    )
}

const NavbarLink = ({ href, name }: Readonly<{ href: string; name: string; }>) => {
    const pathname = usePathname();

    return (
        <Link href={href} className={`px-1.5 text-md font-semibold ${pathname === href ? "md:underline md:underline-offset-8" : "md:hover:underline md:hover:underline-offset-8"} duration-150`}>
            {name}
        </Link>
    )
}

const NavbarIconButton = ({ icon, onClick }: Readonly<{ icon: React.ReactNode; onClick: () => void }>) => {
    return (
        <button type="button" onClick={onClick} className="w-9 h-9 flex items-center justify-center border rounded-sm shadow-sm border-gray-200 hover:bg-black hover:text-white">
            {icon}
        </button>
    )
}

const NavbarButtonLink = ({ href, name }: Readonly<{ href: string; name: string; }>) => {
    return (
        <Link href={href} className="px-4 py-1.5 text-md font-semibold bg-black text-white rounded-sm hover:bg-gray-800 duration-150">
            {name}
        </Link>
    )
}

const NavbarHamburgerRight = ({ onClick }: Readonly<{ onClick: () => void }>) => {
    return (
        <button onClick={onClick} type="button" className="md:hidden w-9 h-9 flex items-center justify-center border rounded-sm shadow-sm border-gray-200 hover:bg-black hover:text-white">
            <MdMenu className="w-6 h-6" />
        </button>
    )
}