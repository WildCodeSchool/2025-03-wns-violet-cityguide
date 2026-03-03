import { useNavigate } from "react-router-dom";
import image from "../assets/img/map_paris_pour_landing_page.webp"

import logo from "../assets/img/ou.svg"

import illu1 from "../assets/img/welcome_ou_1.png";
import illu2 from "../assets/img/welcome_ou_2.png";
import illu3 from "../assets/img/welcome_ou_3.png";

export default function Welcome() {

	const navigate = useNavigate();

	return (
		<div className="welcome__page">

			<div className="welcome__presentation">
				<div>
				<img src={logo} className="logo"/>
					<h2>Grâce à Où, découvrez de nouveaux lieux dans vos villes favorites ! </h2>
					<p>
						Vous préparez une visite touristique ? <br />
						Vous êtes lassé de sortir toujours dans les mêmes lieux de votre ville ?<br />
						Vous ne savez pas où manger, vous cherchez une sortie, un musée, un bar sympa ? Où est là pour vous !<br />
					</p>
					<div className="welcome__button">
						<button
							className="signup__card__form__button landing__page__buttons__button"
							aria-label="Bouton de redirection vers le formulaire de connexion"
							onClick={() => navigate("/login")}>
							Connexion
						</button>
						<button
							className="signup__card__form__button landing__page__buttons__button"
							aria-label="Bouton de redirection vers le formulaire d'inscription"
							onClick={() => navigate("/signup")}>
							Inscription
						</button>
					</div>
				</div>

				<div className="container">
					<img src={image} alt="Capture d'écran de la carte de Paris avec des points d'intérêts" className="container__mapexample"/>
				</div>

			</div>

			<div className="catchphrase">
				<h3>
					En utilisant Où! vous trouverez des points d'intérêt pour chaque ville sur une carte interactive alimentée par la communauté.
				</h3>
			</div>

			<div className="welcome__tuto">
				<div className="tuto__cards">
					<img src={illu1} />
					<div className="tuto__text">
						<h4>Inscrivez-vous</h4>
						<p>En quelques secondes</p>
					</div>
				</div>
				<div className="tuto__cards">
					<img src={illu2} />
					<div className="tuto__text">
						<h4>Trouvez et explorez</h4>
						<p>des lieux sur la carte</p></div>
				</div>
				<div className="tuto__cards">
					<img src={illu3} />
					<div className="tuto__text">
						<h4>Partagez</h4>
						<p>et découvrez facilement</p></div>
				</div>
			</div>
		</div>
	)
}