// React
import type { FormEvent } from "react";
import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";

// GraphQL
import { type NewUserInput, useSignupMutation } from "../generated/graphql-types";

// Zustand - Context
import { useLogin } from "../zustand/userStore";

// Hooks
import { usePasswordValidation } from '../hooks/usePasswordValidation'
import { useEmailValidation } from '../hooks/useEmailValidation'

export default function Signup() {
	// form signup
	const [ signup ] = useSignupMutation();
	const loginToStore = useLogin();
	const path = useNavigate();
	const [password, setPassword] = useState("");
	const [passwordTouched, setPasswordTouched] = useState(false);
	const validation = usePasswordValidation(password);
	const [email, setEmail] = useState("");
	const emailValidation = useEmailValidation(email);
	const emailValid = emailValidation.hasMinLength
		&& emailValidation.hasAtSymbol
		&& emailValidation.hasNoSpaces
		&& emailValidation.hasValidDomain;

	const isFormValid =
		emailValid &&
		validation.hasMinLength &&
		validation.hasUppercase &&
		validation.hasSpecialChar &&
		validation.hasNumberChar;

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!isFormValid) {
			console.warn("Formulaire invalide");
			return;
		}

		const form = e.target;
		const forDate = new FormData(form as HTMLFormElement);
		const formJson = Object.fromEntries(forDate.entries());

		try {
			const { data, errors } = await signup({variables: {data: formJson as NewUserInput}});

			if (!data) throw new Error("Missing data");

			if (errors && errors?.length > 0) throw (errors[0] as Error);

			const publicProfile = data.signup;

			loginToStore(publicProfile);

			console.log(`Salut ${publicProfile.user?.email}`);

			path("/home-page");
		} catch (error) {
			console.error(error);
		}
	}

	return (
		<div className="signup">
			<section className="signup__card">
				<h1 className="signup__card__title">Avec Où, découvrez les points d'intérêts autour de vous</h1>
				<form onSubmit={handleSubmit} className="signup__card__form">
					<div className="signup__card__form__input">
						<label htmlFor="Email">Votre adresse email *</label>
						<input type="text"
							   name="email"
							   value={email}
							   onChange={(e) => setEmail(e.target.value)}
							   required
						/>
						<ul>
							{emailValid ? (
								<li className="validation">
									Votre adresse email est correcte
								</li>
							) : (
								<li className="invalide">
									Votre adresse email est incorrecte
								</li>
							)}
						</ul>
						<label htmlFor="password">Votre mot de passe *</label>
						<input type="password"
							   name="password"
							   value={password}
							   onChange={(e) => setPassword(e.target.value)}
							   onBlur={() => setPasswordTouched(true)}
							   required
						/>
						{passwordTouched && password.length > 0 && (
							<ul>
								<li className={`${validation.hasMinLength ? "validation" : "invalide"}`}>Contient au moins 7 caractères</li>
								<li className={`${validation.hasUppercase ? "validation" : "invalide"}`}>Contient au moins une majuscule</li>
								<li className={`${validation.hasSpecialChar ? "validation" : "invalide"}`}>Contient au moins un caractère spécial</li>
								<li className={`${validation.hasNumberChar ? "validation" : "invalide"}`}>Contient au moins un chiffre</li>
							</ul>
						)}
					</div>
					<input
						className="signup__card__form__button"
						type="submit"
						value="S'inscrire"
						disabled={!isFormValid}
					/>
					<Link to="/login" className="link-to-connect">Déjà un compte ? Connectez-vous</Link>
				</form>
			</section>
		</div>
	)
}
