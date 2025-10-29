// React
import type {FormEvent} from "react";
import { useNavigate } from "react-router-dom";

// GraphQL
// import { type NewUserInput, useSignupMutation } from "../generated/graphql-types";

// Zustand - Context
// import { useLogin } from "../zustand/userStore";

// Images
import img from "../assets/img/parisByNight.png"

export default function Signup() {
    // form signup
    // il doit contacter le backend
    // il faut stocker une info excessible à tous (store global)
    // const [ signup ] = useSignupMutation();
    // const toto = useCurrentUser();
    // const loginToStore = useLogin();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // const form = e.target;
        // const forDate = new FormData(form as HTMLFormElement);
        // const formJson = Object.fromEntries(forDate.entries());

        // try {
        //     const { data } = await signup({variables: {data: formJson as NewUserInput}});

        //     if (!data) throw new Error("Missing data");

        //     const publicProfile = JSON.parse(data.signup);
        //     loginToStore(publicProfile);
        //     console.log(`Salut ${publicProfile.email}`);
        // } catch (error) {
        //     console.error(error);
        // }
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
                        <label htmlFor="Email">Votre adresse email *</label>
                        <input type="text" name="email" required/>
                        <label htmlFor="password">Votre mot de passe *</label>
                        <input type="password" name="password" required/>
                        {/* <label htmlFor="favoriteCity">Votre ville favorite *</label> */}
                        {/* <select name="favoriteCity" required>
                        <option value="paris">Paris</option>
                        <option value="lyon">Lyon</option>
                        <option value="marseille">Marseille</option>
                        <option value="toulouse">Toulouse</option>
                    </select> */}
                    </div>
                    <input className="signup__card__form__button" type="submit" value="S'inscrire"/>
                </form>
                {/*<h2>Zustand</h2>*/}
                {/*<p>User: {toto?.email}</p>*/}
            </section>
        </div>
    )
}
