import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Fast and Interactive Learning",
};

export default function Layout({ children }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <>{children}</>
    );
}