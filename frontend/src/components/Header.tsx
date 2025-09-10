// React & React Router
import { Link } from "react-router-dom";

// Images
import LogoSVG from "./LogoSVG";
import OuTextSVG from "./OuTextSVG";


export default function Header() {

    return (
        <header className="header">
            <div className="header__fullLogo">
                <LogoSVG />
                <OuTextSVG />
            </div>
            <nav>
                <Link to="/signup">S'inscrire</Link>
            </nav>
        </header>
    )
}