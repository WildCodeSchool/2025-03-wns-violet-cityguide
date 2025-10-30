// Zustand - Context
import { useCurrentUser } from "../zustand/userStore";

export default function Account() {
    const user = useCurrentUser();

    return (
        <div>
            Bonjour {user?.email}
        </div>
    )
}