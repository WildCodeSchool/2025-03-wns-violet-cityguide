// React
import type { FormEvent } from "react";
import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";


// GraphQL
import { type NewUserInput, useLoginMutation } from "../generated/graphql-types";

// Zustand - Context
import { useLogin } from "../zustand/userStore";

export default function Login() {
	// form login
	const [ doLogin ] = useLoginMutation();
	const loginToStore = useLogin();
	const path = useNavigate();

	const [error, setError] = useState<string | null>(null);

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setError(null);

		const form = e.currentTarget;
		const formData = new FormData(form as HTMLFormElement);
		const formJson = Object.fromEntries(formData.entries());

		try {
			const { data } = await doLogin({
				variables: { data: formJson as NewUserInput }
			});

			if (!data?.login) throw new Error("LOGIN_FAILED");

			loginToStore(data.login);

			path("/home-page");
		} catch (error) {
			setError("Email ou mot de passe incorrect.");
			console.error(error);
		}
	}

	return (
		<div className="signup">
			<section className="signup__card">
				<h1 className="signup__card__title">Avec Où, découvrez les points d'intérêts autour de vous</h1>
				<form onSubmit={handleSubmit} className="signup__card__form">
					<div className="signup__card__form__input">
						<label htmlFor="Email">Email *</label>
						<input type="text" name="email" required/>
						<label htmlFor="password">Mot de passe *</label>
						<input type="password" name="password" required/>
					</div>

					{error && <p className="invalide">{error}</p>}

					<input className="signup__card__form__button" type="submit" value="Connexion"/>
					<Link to="/signup" className="link-to-connect">Pas encore de compte ? Inscrivez-vous</Link>
				</form>
			</section>
		</div>
	)
}
