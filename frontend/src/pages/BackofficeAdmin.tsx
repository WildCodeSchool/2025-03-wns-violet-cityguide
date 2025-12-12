// style:
import "../scss/pages/backoffice.scss"
import React, { useState, type FormEvent } from "react"

import BackofficeCategory from "../components/BackofficeCategory";
import BackofficeCity from "../components/BackofficeCity";
import BackofficeUser from "../components/BackofficeUser";

export default function BackofficeAdmin() {

	const [isValidUser, setIsValidUser] = useState(false);
	let validatedUserName = 'Urban';

	return (
		<>
			<div id="admin">
				<div className="backoffice-banner">
					<h1>Administration</h1>
				</div>
				<section id="admin-ville">
					<BackofficeCity />
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