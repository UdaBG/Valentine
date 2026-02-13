
import type { Metadata } from "next";
import { Inter, Dancing_Script } from "next/font/google";
import "./globals.css";
import Background from "@/components/Background";
import Cursor from "@/components/Cursor";

const inter = Inter({ subsets: ["latin"] });
const dancingScript = Dancing_Script({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata: Metadata = {
    title: "For My Valentine 💖",
    description: "A special question for a special person.",
    icons: {
        icon: "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>💖</text></svg>",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${inter.className} ${dancingScript.className}`}>
                <Cursor />
                <Background />
                <main className="relative z-10 min-h-screen flex flex-col items-center justify-center">
                    {children}
                </main>
            </body>
        </html>
    );
}
