// React & React Router
import { Link, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

// Images
import LogoSVG from "./LogoSVG";
import OuTextSVG from "./OuTextSVG";

export default function Header() {
    const [open, setOpen] = useState(false);
    const btnRef = useRef<HTMLButtonElement | null>(null);
    const panelRef = useRef<HTMLDivElement | null>(null);
    const { pathname } = useLocation();

    // Fermer le menu quand on change de route
    useEffect(() => {
        setOpen(false);
    }, [pathname]);

    // Fermer au clic en dehors
    useEffect(() => {
        if (!open) return;
        const onClick = (e: MouseEvent) => {
            if (
                panelRef.current &&
                !panelRef.current.contains(e.target as Node) &&
                btnRef.current &&
                !btnRef.current.contains(e.target as Node)
            ) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", onClick);
        return () => document.removeEventListener("mousedown", onClick);
    }, [open]);

    // Fermer avec Echap
    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") setOpen(false);
        };
        document.addEventListener("keydown", onKey);
        return () => document.removeEventListener("keydown", onKey);
    }, [open]);

    return (
        <header className="header">
            <div className="header__fullLogo">
                <Link to="" className="header__brand">
                    <span className="header__logo"><LogoSVG /></span>
                    <span className="header__ou-text"><OuTextSVG /></span>
                </Link>
            </div>

            {/* Bouton burger (affiché en mobile) */}
            <button
                ref={btnRef}
                className={`header__burger ${open ? "is-open" : ""}`}
                aria-label="Ouvrir le menu"
                aria-expanded={open}
                aria-controls="main-nav"
                onClick={() => setOpen(v => !v)}
            >
                <svg className="header__burger__icon size-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
                </svg>
            </button>

            {/* Nav desktop */}
            <nav className="header__nav header__nav--desktop" aria-label="Navigation principale">
                <Link to="">Accueil</Link>
                <Link to="/cities">Villes</Link>
                <Link to="/pois">Points d'intérêts</Link>
                <Link to="/signup">S'inscrire</Link>
            </nav>

            {/* Offcanvas mobile */}
            <div className={`header__backdrop ${open ? "is-open" : ""}`} />
            <div
                id="main-nav"
                ref={panelRef}
                className={`header__panel ${open ? "is-open" : ""}`}
                role="dialog"
                aria-modal="true"
                aria-label="Menu"
            >
                <nav className="header__nav--mobile">
                    <Link to="">Accueil</Link>
                    <Link to="/cities">Villes</Link>
                    <Link to="/pois">Points d'intérêts</Link>
                    <Link to="/signup">S'inscrire</Link>
                </nav>
                <button
                className="header__panel__cross"
                aria-label="Fermer le menu"
                aria-expanded={!open}
                aria-controls="main-nav"
                onClick={() => setOpen(false)}
            >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 header__panel__cross__icon">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
        </header>
    );
}