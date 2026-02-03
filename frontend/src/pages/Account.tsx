// Zustand - Context
import { useCurrentUser } from "../zustand/userStore";
import CookieSettings from "../components/CookieSettings";

export default function Account() {
	const user = useCurrentUser();

	return (
		<div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
			<h1>Mon compte</h1>
			<p>Bonjour {user?.email}</p>
			
			<div style={{ marginTop: '30px' }}>
				<h2>Paramètres de confidentialité</h2>
				<CookieSettings />
			</div>
		</div>
	)
}