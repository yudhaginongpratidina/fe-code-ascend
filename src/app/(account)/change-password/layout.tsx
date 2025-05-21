import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Change Password",
};

export default function Layout({ children }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <>{children}</>
    );
}