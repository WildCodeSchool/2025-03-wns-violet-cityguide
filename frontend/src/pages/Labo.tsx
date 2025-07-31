import type {FormEvent} from "react";
import { type NewUserInput, useSignupMutation } from "../generated/graphql-types";
import { useCurrentUser, useLogin } from "../zustand/userStore";

export default function Labo() {
    // form signup
    // il doit contacter le backend
    // il faut stocker une info excessible à tous (store global)
    const [ signup ] = useSignupMutation();
    const toto = useCurrentUser();
    const loginToStore = useLogin();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.target;
        const forDate = new FormData(form as HTMLFormElement);
        const formJson = Object.fromEntries(forDate.entries());

        try {
            const { data } = await signup({variables: {data: formJson as NewUserInput}});

            if (!data) throw new Error("Missing data");

            const publicProfile = JSON.parse(data.signup);
            loginToStore(publicProfile);
            console.log(`Salut ${publicProfile.email}`);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <h1>Authentification</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="email" placeholder="Email" />
                <input type="password" name="password" placeholder="Mot de passe" />
                <input type="submit" value="S'inscrire" />
            </form>
            <h2>Zustand</h2>
            <p>User: {toto?.email}</p>
        </>
    )
}
