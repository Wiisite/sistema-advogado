import { getAppointments } from "@/lib/actions";
import AgendaClient from "./AgendaClient";

export default async function AgendaPage() {
    const appointments = await getAppointments();

    return <AgendaClient initialAppointments={appointments} />;
}
