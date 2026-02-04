// Zustand - Context
import { useCurrentUser } from "../zustand/userStore";
import CookieSettings from "../components/CookieSettings";

// Image
import img from '../assets/img/en-construction.png';

export default function Account() {
	const user = useCurrentUser();

	return (
		<div className="account">
			<h1>Mon compte</h1>
			<h2>Bonjour {user?.email}</h2>
			
			<div className="account_confidentialSettings">
				<h3>Paramètres de confidentialité</h3>
				<CookieSettings />
			</div>
			<img src={img} alt="image de construction représentant la page account en construction"/>
		</div>
	)
}