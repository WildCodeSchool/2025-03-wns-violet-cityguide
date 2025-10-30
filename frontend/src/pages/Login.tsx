// React
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";

// GraphQL
import { type NewUserInput, useLoginMutation, useSignupMutation } from "../generated/graphql-types";

// Images
import img from "../assets/img/parisByNight.png"

export default function Login() {
    // form signup
    // il doit contacter le backend
    // il faut stocker une info excessible à tous (store global)
    const [ login ] = useLoginMutation();
    // const toto = useCurrentUser();
    const loginToStore = useLogin();
    const path = useNavigate();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // coucou j'ai tout commenté pour l'intégrer au merge
        // const form = e.target;
        // const forDate = new FormData(form as HTMLFormElement);
        // const formJson = Object.fromEntries(forDate.entries());

        // try {
        //     const { data } = await login({variables: {data: formJson as NewUserInput}});

        //     if (!data) throw new Error("Missing data");
            const publicProfile = data.login;
            loginToStore(publicProfile);
            console.log(`Salut ${publicProfile.user?.email}`);

            path("/");
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="signup"
             style={{
                 backgroundImage: `url(${img})`
             }}
        >
            <section className="signup__card glassmorphism">
                <h1 className="signup__card__title">Avec Où, découvrez les points d'intérêts autour de vous</h1>
                <form onSubmit={handleSubmit} className="signup__card__form">
                    <div className="signup__card__form__input">
                    <label htmlFor="Email">Email *</label>
                    <input type="text" name="email" required/>
                    <label htmlFor="password">Mot de passe *</label>
                    <input type="password" name="password" required/>
                    </div>
                    <input className="signup__card__form__button" type="submit" value="Connexion"/>
                </form>
                {/*<h2>Zustand</h2>*/}
                {/*<p>User: {toto?.email}</p>*/}
            </section>
        </div>
    )
}
