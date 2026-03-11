import { getPetitionTemplates, getClients, getProcesses } from "@/lib/actions";
import PeticoesClient from "./PeticoesClient";

export default async function PeticoesPage() {
    const [templates, clients, processes] = await Promise.all([
        getPetitionTemplates(),
        getClients(),
        getProcesses()
    ]);

    return (
        <PeticoesClient
            initialTemplates={templates}
            clients={clients}
            processes={processes}
            initialSavedPetitions={[]}
        />
    );
}
