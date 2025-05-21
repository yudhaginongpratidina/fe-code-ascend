import { Metadata } from "next";

export const metadata: Metadata = {
    title: "My Module",
};

export default function Layout({ children }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <>{children}</>
    );
}