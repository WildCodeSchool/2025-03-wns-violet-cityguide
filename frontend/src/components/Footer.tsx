// React & React Router
import {Link} from "react-router-dom";

export default function Footer() {

	return (
		<footer>
			<Link to="/legalNotice">Mentions légales</Link>
			<Link to="/faq">FAQ</Link>
		</footer>
	)
}