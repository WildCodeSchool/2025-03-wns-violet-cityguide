import { useNavigate } from "react-router-dom";
import  image  from "../assets/img/map_paris_pour_landing_page.webp"


export default function Welcome() {

	const navigate = useNavigate();

	return (
		<div className="landing__page">
			<div className="landing__page__buttons">
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

			<div className="landing__page__text">
				<p>
					Grâce à Où, découvrez de nouveaux lieux dans vos villes favorites ! <br />
					Vous préparez une visite touristique ? <br />
					Vous êtes lassé de sortir toujours dans les mêmes lieux de votre ville ? <br />
					Vous ne savez pas où manger, vous cherchez une sortie, un musée, un bar sympa ? Où est là pour vous !
				</p>

				<h3>
					En utilisant Où! vous trouverez des points d'intérêt pour chaque ville sur une carte interactive alimentée par la communauté.
				</h3>

				<img src={ image } alt="Capture d'écran de la carte de Paris avec des points d'intérêts" />

			</div>
		</div>
	)
}