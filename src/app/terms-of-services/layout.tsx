import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Terms of Services",
};

export default function Layout({ children }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <>{children}</>
    );
}