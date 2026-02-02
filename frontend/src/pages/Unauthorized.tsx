// React & React Router
import { Link } from "react-router-dom";

export default function Unauthorized() {
	return (
		<section className="notFound">
			<h1>401</h1>
			<p>Oups ! Vous n'êtes pas autorisé<br/>
				à accéder à cette page</p>
			Veuillez
            <Link to="/login">vous connecter</Link> ou
			<Link to="/signup">vous inscrire</Link>
		</section>
	)
}