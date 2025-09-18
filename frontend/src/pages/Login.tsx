// React
import type {FormEvent} from "react";

// GraphQL
import { type NewUserInput, useSignupMutation } from "../generated/graphql-types";

// Zustand - Context
import { useCurrentUser, useLogin } from "../zustand/userStore";

// Images
import img from "../assets/img/parisByNight.png"


export default function Login() {
    // form signup
    // il doit contacter le backend
    // il faut stocker une info excessible à tous (store global)
    const [ login ] = useSignupMutation();
    // const toto = useCurrentUser();
    const loginToStore = useLogin();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.target;
        const forDate = new FormData(form as HTMLFormElement);
        const formJson = Object.fromEntries(forDate.entries());

        try {
            const { data } = await login({variables: {data: formJson as NewUserInput}});

            if (!data) throw new Error("Missing data");

            const publicProfile = JSON.parse(data.signup);
            loginToStore(publicProfile);
            console.log(`Salut ${publicProfile.email}`);
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
                <h1 className="signup__card__title">Avec où, découvrez les points d'intérêts autour de vous</h1>
                <form onSubmit={handleSubmit} className="signup__card__form">
                    <label htmlFor="Email">Email *</label>
                    <input type="text" name="email" required/>
                    <label htmlFor="password">Mot de passe *</label>
                    <input type="password" name="password" required/>
                </form>
                {/*<h2>Zustand</h2>*/}
                {/*<p>User: {toto?.email}</p>*/}
            </section>
            <input className="signup__button glassmorphism" type="submit" value="Connexion"/>
        </div>
    )
}
