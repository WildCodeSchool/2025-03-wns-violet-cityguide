// React & React Router
import { Link } from "react-router-dom";

// Images
import LogoSVG from "./LogoSVG";
import OuTextSVG from "./OuTextSVG";

export default function SignupHeader() {

    return (
        <header className="signupHeader">
            <Link to="" className="signupHeader__brand">
                <span className="signupHeader__logo"><LogoSVG/></span>
                <span className="signupHeader__ou-text"><OuTextSVG/></span>
            </Link>
        </header>
    );
}