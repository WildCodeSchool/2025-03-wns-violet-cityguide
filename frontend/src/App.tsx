// React
import {Outlet, useLocation} from 'react-router-dom';
import { useEffect } from 'react';

// Components
import Header from './components/Header';
import Footer from './components/Footer';
import SignupHeader from './components/SignupHeader';
// import CookieDebugger from './components/CookieDebugger';
import CookieConsent from './components/CookieConsent';
import CookieProtection from './components/CookieProtection';

// Hooks
import { useConsentCookies } from './hooks/useCookieConsent';

export default function App() {
	console.log('App component loading...'); // Debug
	
	const { pathname } = useLocation();
	const showSignupHeader = pathname === '/' || pathname === '/unauthorized' || pathname === '/login' || pathname === '/signup';

	console.log('Current pathname:', pathname, 'showSignupHeader:', showSignupHeader); // Debug

	// Gestion des cookies pour les préférences globales (avec consentement)
	const [cookies, setCookie] = useConsentCookies(['cityGuide-theme', 'cityGuide-preferences']);

	// Appliquer le thème depuis les cookies au chargement
	useEffect(() => {
		if (cookies['cityGuide-theme']) {
			document.body.setAttribute('data-theme', cookies['cityGuide-theme']);
		}
	}, [cookies]);

	// Fonction pour basculer le thème (accessible globalement)
	const toggleTheme = () => {
		const newTheme = cookies['cityGuide-theme'] === 'dark' ? 'light' : 'dark';
		setCookie('cityGuide-theme', newTheme, { 
			path: '/',
			maxAge: 365 * 24 * 3600 // 1 an
		});
		document.body.setAttribute('data-theme', newTheme);
	};

	return (
		<>
			{showSignupHeader ? <SignupHeader /> : <Header />}
			<CookieProtection>
				<Outlet context={{ toggleTheme, theme: cookies['cityGuide-theme'] }} />
			</CookieProtection>
			<Footer />
			<CookieConsent />
			{/* <CookieDebugger /> */}
		</>
	)
}
