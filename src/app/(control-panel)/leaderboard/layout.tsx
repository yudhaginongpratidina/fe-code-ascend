import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Leaderboard",
};

export default function Layout({ children }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <>{children}</>
    );
}