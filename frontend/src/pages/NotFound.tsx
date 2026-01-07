// React & React Router
import { Link } from "react-router-dom";

export default function NotFound() {
	return (
		<section className="notFound">
			<h1>404</h1>
			<p>Oups ! Page non trouvée</p>
            <Link to="/">Retour à l'accueil</Link>
		</section>
	)
}