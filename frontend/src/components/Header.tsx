// React & React Router
import {Link, useLocation, useNavigate} from "react-router-dom";
import { useEffect, useRef, useState } from "react";

// Images
import LogoSVG from "./LogoSVG";
import OuTextSVG from "./OuTextSVG";

// Zustand - Context
import { useIsAuthenticated, useLogout, useCurrentUser } from "../zustand/userStore";
import { Role } from "../generated/graphql-types";

export default function Header() {
	const [open, setOpen] = useState(false);
	const btnRef = useRef<HTMLButtonElement | null>(null);
	const panelRef = useRef<HTMLDivElement | null>(null);
	const { pathname } = useLocation();

	// Récupère l'état depuis Zustand
	const isAuth = useIsAuthenticated();
	const logout = useLogout();
	const navigate = useNavigate();

	// Récupération des informations de l'utilisateur connecté
	const connectedUser = useCurrentUser();
	const connectedUserRoles = connectedUser?.roles;

	// Liste des roles autorisés à voir le bouton d'accès au panneau d'administration
	const authorizedAdminSite = Role['AdminSite'];
	const authorizedAdminCity = Role['AdminCity'];
	const authorizedPoiCreator = Role['PoiCreator'];

	// Est-ce que l'utilisateur connecté possède au moins un des roles autorisés ?
	let isAuthorized = false;
	if (connectedUserRoles?.includes(authorizedAdminSite) || connectedUserRoles?.includes(authorizedAdminCity) || connectedUserRoles?.includes(authorizedPoiCreator)) {
		isAuthorized = true;
	}

	const scrollToId = (id: string) => {
		const el = document.getElementById(id);
		if (el) {
			el.scrollIntoView({ behavior: "smooth" });
		}
	};

	const navigateToCities = () => {
		sessionStorage.setItem("scrollTo", "cities");
		navigate("/home-page/");
	};

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

	const onLogout = () => {
		logout();
		setOpen(false);
		navigate("/login");
	};

	return (
		<header className="header">
			<div className="header__fullLogo">
				<Link to="/home-page" className="header__brand">
					<LogoSVG />
					<OuTextSVG />
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
					<Link to="/home-page">Accueil</Link>
					<button
						type="button"
						onClick={() => {
								navigateToCities();
								scrollToId("cities");
						}}
						className="header__nav--desktop__linkLikeButton"
					>Villes</button>
					{isAuth ? (
						<>
							<Link to="/account">Mon compte</Link>
							{isAuthorized && (
								<Link aria-label="bouton d'accès au panneau d'administration" to="/admin">Admin</Link>
							)}
							<button className="auth-button" onClick={onLogout}>Déconnexion</button>
						</>
					) : (
						<>
							<Link to="/login">Se connecter</Link>
							<Link to="/signup">S'inscrire</Link>
						</>
					)}
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
						<Link to="/home-page">Accueil</Link>
						<button
							type="button"
							onClick={() => {
								navigateToCities();
								scrollToId("cities");
								setOpen(false);
							}}
							className="header__nav--mobile__linkLikeButton"
						>Villes</button>
						{isAuth ? (
							<>
								<Link to="/account" onClick={() => setOpen(false)}>Mon compte</Link>
								<button className="auth-button" onClick={onLogout}>Déconnexion</button>
							</>
						) : (
							<>
								<Link to="/login" onClick={() => setOpen(false)}>Se connecter</Link>
								<Link to="/signup" onClick={() => setOpen(false)}>S'inscrire</Link>
							</>
						)}
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