import { getProfile } from "@/lib/actions";
import SettingsClient from "@/components/SettingsClient";

export default async function SettingsPage() {
    const profile = await getProfile();

    return <SettingsClient initialProfile={profile} />;
}
