import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import "qore-components/dist/style.css"
import {GlobalModalProvider, ReduxProvider} from "@/components/custom/reduxProvider";
import GlobalModal from "@/components/ui/modal/GlobalModal";
import BaseToastContainer from "@/components/ui/toast/BaseToastContainer";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import React from "react";

// const geistSans = Geist({
//     variable: "--font-geist-sans",
//     subsets: ["latin"],
// });
//
// const geistMono = Geist_Mono({
//     variable: "--font-geist-mono",
//     subsets: ["latin"],
// });
// const inter = Inter({subsets: ['latin']})
const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
    display: 'swap',
})

export const metadata: Metadata = {
    title: "CBA Dashboard",
    description: "Create CDA dashboard implementation",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body className={inter.className}>
        <ReduxProvider>
            <GlobalModalProvider>
                <GlobalModal/>
                <BaseToastContainer/>
                <DashboardLayout>
                    {children}
                </DashboardLayout>
            </GlobalModalProvider>
        </ReduxProvider>
        </body>
        </html>
    );
}
