// React & React Router
import { useState } from "react";

// Composants
import BackofficeCategory from "../components/BackofficeCategory";
import BackofficeCity from "../components/BackofficeCity";
import BackofficeUser from "../components/BackofficeUser";
import BackofficePoi from "../components/BackofficePoi";

// Types
type Panel = "cities" | "users" | "poi" | "categories";

export default function BackofficeAdmin() {
	const [activePanel, setActivePanel] = useState<Panel>("cities");

	return (
		<div id="admin" className="admin">
			<div className="admin__layout">
				<aside className="admin__sidebar">
					<div className="admin__brand">
						<h1>Administration</h1>
					</div>

					<nav className="admin__nav">
						<button
							type="button"
							className={`admin__navlink ${activePanel === "cities" ? "active" : ""}`}
							onClick={() => setActivePanel("cities")}
						>
							Villes
						</button>

						<button
							type="button"
							className={`admin__navlink ${activePanel === "users" ? "active" : ""}`}
							onClick={() => setActivePanel("users")}
						>
							Utilisateurs
						</button>

						<button
							type="button"
							className={`admin__navlink ${activePanel === "poi" ? "active" : ""}`}
							onClick={() => setActivePanel("poi")}
						>
							Points d&apos;intérêt
						</button>

						<button
							type="button"
							className={`admin__navlink ${activePanel === "categories" ? "active" : ""}`}
							onClick={() => setActivePanel("categories")}
						>
							Catégories
						</button>
					</nav>
				</aside>

				<main className="admin__main">
					{activePanel === "cities" && (
						<section>
							<BackofficeCity />
						</section>
					)}

					{activePanel === "poi" && (
						<section>
							<BackofficePoi />
						</section>
					)}

					{activePanel === "users" && (
						<section>
							<BackofficeUser />
						</section>
					)}

					{activePanel === "categories" && (
						<section>
							<BackofficeCategory />
						</section>
					)}
				</main>
			</div>
		</div>
	)
}