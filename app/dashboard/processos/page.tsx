import { getProcesses, getClients } from "@/lib/actions";
import ProcessosClientPage from "./ProcessesClient";

export default async function ProcessosPage() {
    const [processos, clients] = await Promise.all([
        getProcesses(),
        getClients()
    ]);

    return <ProcessosClientPage initialProcessos={processos} clients={clients} />;
}
