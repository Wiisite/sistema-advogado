import { getDocuments } from "@/lib/actions";
import DocumentosClient from "./DocumentosClient";

export default async function DocumentosPage() {
    const documents = await getDocuments();

    return <DocumentosClient initialDocuments={documents} />;
}
