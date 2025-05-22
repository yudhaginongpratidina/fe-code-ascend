"use client"
import { usePathname, useParams } from "next/navigation"
import Link from "next/link";

import { FaHome } from "react-icons/fa";

export default function Header() {
    const pathname = usePathname();
    const params = useParams();

    return (
        <>
            {pathname === "/dashboard" && (
                <HeaderContainer>
                    <HeaderTitleAndDescription title="Dashboard" description="Welcome back! Here's your learning progress overview." />
                </HeaderContainer>
            )}

            {pathname === "/my-module" && (
                <HeaderContainer>
                    <HeaderTitleAndDescription title="Module Management" />
                    <HeaderBredcrumbContainer>
                        <HeaderRootLink icon={<FaHome />} href="/dashboard" />
                        <HeaderBredCrumbSlash />
                        <HeaderBredCrumbLink name="My Module" href="/my-module" />
                    </HeaderBredcrumbContainer>
                </HeaderContainer>
            )}

            {pathname === `/my-module/${params.moduleId}` && (
                <HeaderContainer>
                    <HeaderTitleAndDescription title="Chapter Management" />
                    <HeaderBredcrumbContainer>
                        <HeaderRootLink icon={<FaHome />} href="/dashboard" />
                        <HeaderBredCrumbSlash />
                        <HeaderBredCrumbLink name="My Module" href="/my-module" />
                    </HeaderBredcrumbContainer>
                </HeaderContainer>
            )}

            {pathname === `/my-module/users/${params.moduleId}` && (
                <HeaderContainer>
                    <HeaderTitleAndDescription title="Member of Module" />
                    <HeaderBredcrumbContainer>
                        <HeaderRootLink icon={<FaHome />} href="/dashboard" />
                        <HeaderBredCrumbSlash />
                        <HeaderBredCrumbLink name="My Module" href="/my-module" />
                    </HeaderBredcrumbContainer>
                </HeaderContainer>
            )}

            {pathname === `/my-learning` && (
                <HeaderContainer>
                    <HeaderTitleAndDescription title="My Learning" />
                    <HeaderBredcrumbContainer>
                        <HeaderRootLink icon={<FaHome />} href="/dashboard" />
                        <HeaderBredCrumbSlash />
                        <HeaderBredCrumbLink name="My Learning" href="/my-learning" />
                    </HeaderBredcrumbContainer>
                </HeaderContainer>
            )}

            {pathname === `/my-learning/${params.moduleId}` && (
                <HeaderContainer>
                    <HeaderTitleAndDescription title="Learning" />
                    <HeaderBredcrumbContainer>
                        <HeaderRootLink icon={<FaHome />} href="/dashboard" />
                        <HeaderBredCrumbSlash />
                        <HeaderBredCrumbLink name="My Learning" href="/my-learning" />
                    </HeaderBredcrumbContainer>
                </HeaderContainer>
            )}

            {pathname === `/user-management` && (
                <HeaderContainer>
                    <HeaderTitleAndDescription title="User Management" />
                    <HeaderBredcrumbContainer>
                        <HeaderRootLink icon={<FaHome />} href="/dashboard" />
                        <HeaderBredCrumbSlash />
                        <HeaderBredCrumbLink name="User Management" href="/user-management" />
                    </HeaderBredcrumbContainer>
                </HeaderContainer>
            )}

            {pathname === `/my-profile` && (
                <HeaderContainer>
                    <HeaderTitleAndDescription title="My Profile" />
                    <HeaderBredcrumbContainer>
                        <HeaderRootLink icon={<FaHome />} href="/dashboard" />
                        <HeaderBredCrumbSlash />
                        <HeaderBredCrumbLink name="My Profile" href="/my-profile" />
                    </HeaderBredcrumbContainer>
                </HeaderContainer>
            )}
        </>
    )
}

const HeaderContainer = ({ children }: Readonly<{ children: React.ReactNode; }>) => {
    return (
        <header className="w-full flex flex-col gap-2.5">
            {children}
        </header>
    )
}

const HeaderTitleAndDescription = ({ title, description }: { title: string, description?: string }) => {
    return (
        <div className="w-full">
            <h1 className="uppercase text-xl font-semibold">{title}</h1>
            <p className="text-sm text-gray-600">{description}</p>
        </div>
    )
}

const HeaderBredcrumbContainer = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex items-center gap-2">
            {children}
        </div>
    )
}

const HeaderRootLink = ({ icon, href }: { icon: React.ReactNode, href: string }) => {
    return (
        <Link href={href} className="text-blue-500 font-medium hover:underline hover:underline-offset-4">
            {icon}
        </Link>
    )
}

const HeaderBredCrumbLink = ({ name, href }: { name: string, href: string }) => {
    return (
        <Link href={href} className="text-blue-500 font-medium hover:underline hover:underline-offset-4">
            {name}
        </Link>
    )
}

const HeaderBredCrumbSlash = () => {
    return (
        <span className="text-gray-600">/</span>
    )
}