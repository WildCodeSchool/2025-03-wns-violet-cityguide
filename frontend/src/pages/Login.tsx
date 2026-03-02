// React
import type { FormEvent } from "react";
import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";


// GraphQL
import { useLoginMutation } from "../generated/graphql-types";
import { ApolloError } from "@apollo/client";

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
		const email = String(formData.get("email") ?? "");
		const password = String(formData.get("password") ?? "");

		try {
			const result = await doLogin({
				variables: { data: { email, password } }
			});

			if (result.errors?.length) {
				setError("Email ou mot de passe incorrect.");
				return;
			}

			const login = result.data?.login;

			if (!login || !("token" in login) || !login.token) {
				setError("Email ou mot de passe incorrect.");
				return;
			}

			loginToStore(login);

			path("/home-page");
		} catch (error) {
			if (error instanceof ApolloError) {
				// si GraphQL renvoie un message d'erreur
				const gqlMsg = error.graphQLErrors?.[0]?.message;

				if (gqlMsg === "Argument Validation Error") {
					setError("Les champs envoyés ne sont pas valides (vérifiez l'email et/ou le mot de passe).");
					return;
				}

				setError(gqlMsg ?? "Email ou mot de passe incorrect.");
				return;
			}

			setError("Email ou mot de passe incorrect.");
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