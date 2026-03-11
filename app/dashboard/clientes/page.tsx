import { getClients } from "@/lib/actions";
import ClientesClientTable from "./ClientesClientTable";

export default async function ClientesPage() {
    const clients = await getClients();

    return <ClientesClientTable initialClientes={clients} />;
}
