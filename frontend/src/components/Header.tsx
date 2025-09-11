// React & React Router
import { Link } from "react-router-dom";

// Images
import LogoSVG from "./LogoSVG";
import OuTextSVG from "./OuTextSVG";


export default function Header() {

    return (
        <header className="header">
            <div className="header__fullLogo">
                <Link to="">
                    <LogoSVG />
                    <OuTextSVG />
                </Link>
            </div>
            <nav>
                <Link to="">Accueil</Link>
                <Link to="/cities">Villes</Link>
                <Link to="/pois">Points d'intérêts</Link>
                <Link to="/signup">S'inscrire</Link>
            </nav>
        </header>
    )
} 