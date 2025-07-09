"use client"
import { useState, useEffect, useRef, useMemo } from "react";
import secureLocalStorage from "react-secure-storage";
import { usePathname } from "next/navigation";
import { getCookie } from "@/utils/cookie";
import Link from "next/link";
import clsx from "clsx";
import api from "@/utils/api";

import { FaLaptopCode, FaUser, FaUserCircle } from "react-icons/fa";
import { AiOutlineLoading } from "react-icons/ai";
import { RxDashboard } from "react-icons/rx";
import { MdMenu } from "react-icons/md";

export default function Navbar() {
    const pathname = usePathname();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLogin, setIsLogin] = useState(false);
    const [hamburgerRightIsAcitive, setHamburgerRightIsAcitive] = useState<boolean>(false);

    const handleLogout = async () => {
        try {
            await api.get("/auth/logout"); 
            secureLocalStorage.removeItem("token");
            window.location.href = "/login";
        } catch (error: any) {
            console.error(error?.response?.data?.message);
        }
    };

    const get_authenticated_status = async () => {
        const authenticated = await getCookie('authenticated');
        if (authenticated) {
            setIsAuthenticated(true);
        }

        const get_is_login = secureLocalStorage.getItem("is_login");
        if (get_is_login) {
            setIsLogin(true);
        }
    }

    useEffect(() => {
        get_authenticated_status();
    }, []);

    return (
        <nav className="w-full fixed top-0 z-30">
            <div className="w-full h-14 px-4 md:px-14 box-border flex justify-between items-center shadow drop-shadow-sm bg-white">
                <NavbarItems>
                    <NavbarBrand />
                </NavbarItems>
                {(pathname === "/home" || pathname.startsWith("/list-module") || pathname.startsWith("/docs") || pathname === "/interactive-code-editor" || pathname === "/fast-and-interactive-learning" || pathname === "/learning-progress") && (
                    <NavbarItems className="hidden md:flex">
                        <NavbarLink href="/home" name="Home" />
                        <NavbarLink href="/list-module" name="Module" />
                    </NavbarItems>
                )}
                <NavbarItems>
                    {isLogin
                        ? (
                            <>
                                {isLogin && (
                                    <>
                                        <NavbarAvatar>
                                            <NavbarAvatarItem
                                                fullWidth
                                                name="dashboard"
                                                type="button"
                                                icon={<RxDashboard className="w-4 h-4" />}
                                                onClick={() => { window.location.href = "/dashboard" }}
                                                className="justify-start py-2 px-1.5 border-transparent hover:border-gray-100 hover:bg-gray-100"
                                            />
                                            <NavbarAvatarItem
                                                fullWidth
                                                name="profile"
                                                type="button"
                                                icon={<FaUser className="w-4 h-4" />}
                                                onClick={() => { window.location.href = "/my-profile" }}
                                                className="justify-start py-2 px-1.5 border-transparent hover:border-gray-100 hover:bg-gray-100"
                                            />
                                            <hr className="w-full text-gray-300" />
                                            <NavbarAvatarItem
                                                fullWidth
                                                name="log out"
                                                type="button"
                                                onClick={() => { handleLogout() }}
                                                className="py-2 px-4 border-red-500 bg-red-500 hover:bg-red-600 text-white"
                                            />
                                        </NavbarAvatar>
                                    </>
                                )}
                            </>
                        )
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

export const NavbarAvatar = ({ children }: { children: React.ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <button type="button" onClick={toggleDropdown} className="w-9 h-9 flex items-center justify-center border rounded-sm shadow-sm border-gray-200 hover:bg-black hover:text-white">
                {<FaUserCircle className="w-5 h-5" />}
            </button>
            {isOpen && (
                <div className="absolute right-0 mt-3 z-30 w-64 rounded-md bg-white shadow-lg ring-1 ring-black/10 p-4 animate-fade-in">
                    {children}
                </div>
            )}
        </div>
    );
};

const NavbarAvatarItem = ({ name, type, fullWidth = false, onClick, icon, isLoading = false, className, ...props }: { name: string; type: "submit" | "reset" | "button"; fullWidth?: boolean; onClick?: () => void; icon?: React.ReactNode; isLoading?: boolean; className?: string;[key: string]: any; }) => {

    const buttonClasses = useMemo(() => clsx(
        "capitalize border rounded-sm flex justify-center items-center gap-4 duration-200",
        fullWidth ? "w-full" : "w-fit",
        {
            "cursor-not-allowed opacity-60": isLoading,
            "cursor-pointer": !isLoading,
        },
        className
    ), [fullWidth, isLoading, className]);

    return (
        <button type={type} className={buttonClasses} disabled={isLoading} onClick={onClick} {...props} >
            {isLoading
                ? (<AiOutlineLoading className="w-5 h-5 animate-spin" />)
                : (
                    <>
                        {icon && <span>{icon}</span>}
                        <span className="capitalize text-sm font-semibold text-nowrap">{name}</span>
                    </>
                )}
        </button>
    );
}