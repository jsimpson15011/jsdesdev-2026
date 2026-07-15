import type {Metadata} from "next";
import {IBM_Plex_Mono, IBM_Plex_Serif} from "next/font/google";
import "./globals.css";
import Image from "next/image";
import SlidingTextRotator from "@/app/components/SlidingTextRotator";
import Link from "next/link";

const ibmPlexSerif = IBM_Plex_Serif({
    variable: "--font-ibm-plex-serif",
    weight: ["400", "500", "600", "700"],
    subsets: ["latin"],
});

const ibmPlexMono = IBM_Plex_Mono({
    variable: "--font-ibm-plex-mono",
    weight: ["400", "500", "600", "700"],
    subsets: ["latin"],
});

export const metadata: Metadata = {
    metadataBase: new URL("https://jsdesdev.com"),
    title: {
        default: "Joseph Simpson | Software Design and Development",
        template: "%s | Joseph Simpson",
    },
    description:
        "Joseph Simpson is a software engineer focused on practical, scalable software, full-stack product development, and software architecture.",
    applicationName: "Joseph Simpson Development",
    authors: [{name: "Joseph Simpson", url: "https://jsdesdev.com"}],
    creator: "Joseph Simpson",
    publisher: "Joseph Simpson",
    keywords: [
        "Joseph Simpson",
        "software design",
        "software development",
        "full-stack development",
        "software architecture",
        "Next.js",
        "React",
        "TypeScript",
    ],
    icons: {
        icon: "/bracket-logo.png",
        shortcut: "/bracket-logo.png",
        apple: "/bracket-logo.png",
    },
    openGraph: {
        title: "Joseph Simpson | Software Design and Development",
        description:
            "Practical, scalable software design, architecture, and full-stack product development.",
        url: "/",
        siteName: "Joseph Simpson Development",
        images: [
            {
                url: "/bracket-logo.png",
                width: 431,
                height: 576,
                alt: "Joseph Simpson bracket logo",
            },
        ],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary",
        title: "Joseph Simpson | Software Design and Development",
        description:
            "Practical, scalable software design, architecture, and full-stack product development.",
        images: ["/bracket-logo.png"],
    },
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            className={`${ibmPlexSerif.variable} ${ibmPlexMono.variable} h-full antialiased`}
        >
        <body className="min-h-full flex flex-col items-center">
        <nav className="text-white bg-primary-900 dark:bg-gray-700 w-full py-4 px-16 border-accent-500 border-b-4">
            <div className="container mx-auto flex flex-wrap gap-2 items-center">
                <Link href="/" className="flex items-center">
                    <Image
                        src="/bracket-logo.png"
                        alt="Joseph Simpson bracket logo"
                        width={32}
                        height={32}
                        priority
                    />
                </Link>
                <div className="flex items-end gap-4 flex-wrap">
                    <div>
                        <h1 className="text-3xl font-bold">Joseph Simpson</h1>
                        <h2 className="font-mono">Software Design, Development, and <SlidingTextRotator
                            items={[
                                "Problem Solving",
                                "Curiosity",
                                "Teaching",
                                "Systems",
                                "Wonder",
                                "Understanding",
                                "Architecture"]}
                        /></h2>
                    </div>
                </div>
            </div>
        </nav>
        <div className="w-full container mx-auto">
            {children}
        </div>
        </body>
        </html>
    );
}
