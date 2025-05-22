import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Members of Module',
}

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            {children}
        </>
    );
}