// style:
import "../scss/pages/backoffice.scss"

import BackofficeCategory from "../components/BackofficeCategory";
import BackofficeCity from "../components/BackofficeCity";
import BackofficeUser from "../components/BackofficeUser";
import BackofficePoi from "../components/BackofficePoi";

export default function BackofficeAdmin() {

	return (
		<>
			<div id="admin">
				<div className="backoffice-banner">
					<h1>Administration</h1>
					<div className="href-container">
						<a href="#admin-ville">Villes</a>
						<a href="#admin-poi">Utilisateurs</a>
						<a href="#admin-users">Point d'intêret</a>
						<a href="#admin-categories">Catégories</a>
					</div>
				</div>

				<section id="admin-ville">
					<BackofficeCity />
				</section>

				<section id="admin-poi">
					<BackofficePoi />
				</section>

				<section id="admin-users section-part">
					<BackofficeUser />
				</section>

				<section id="admin-categories">
					<BackofficeCategory />
				</section>
			</div>
		</>
	)
}