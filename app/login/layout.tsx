import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Login | Dr. Advogado",
    description: "Acesse sua conta no sistema de gestão jurídica",
};

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            {children}
        </div>
    );
}
