import { getInvoices, getClients, getProcesses, getProfile } from "@/lib/actions";
import FinanceiroClient from "./FinanceiroClient";
import { redirect } from "next/navigation";

export default async function FinanceiroPage() {
    const profile = await getProfile();

    if (profile.role !== 'admin') {
        redirect('/dashboard');
    }

    const [invoices, clients, processes] = await Promise.all([
        getInvoices(),
        getClients(),
        getProcesses()
    ]);

    return (
        <FinanceiroClient
            initialInvoices={invoices}
            clients={clients}
            processes={processes}
        />
    );
}
