// React
import {Outlet, useLocation} from 'react-router-dom';

// Components
import Header from './components/Header';
import Footer from './components/Footer';
import SignupHeader from "./components/SignupHeader";

export default function App() {
    const { pathname } = useLocation();
    const showSignupHeader = pathname === '/login' || pathname === '/signup';

  return (
    <>
        {showSignupHeader ? <SignupHeader /> : <Header />}
        <Outlet />
        <Footer />
    </>
  )
}
