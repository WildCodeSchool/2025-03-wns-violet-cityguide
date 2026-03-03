// style:
import "../scss/pages/backoffice.scss"

import BackofficeCategory from "../components/BackofficeCategory";
import BackofficeCity from "../components/BackofficeCity";
import BackofficeUser from "../components/BackofficeUser";
import BackofficePoi from "../components/BackofficePoi";

export default function BackofficeAdmin() {

	return (
		<>
			<div id="admin" className="admin">
				<div className="admin__layout">

					<div className="admin__banner">
						<h1>Panneaux d'administration</h1>
						<div className="id-container">
							<button id="#admin-ville">Villes</button>
							<button id="#admin-poi">Utilisateurs</button>
							<button id="#admin-users">Point d'intêret</button>
							<button id="#admin-categories">Catégories</button>
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
			</div>
		</>
	)
}