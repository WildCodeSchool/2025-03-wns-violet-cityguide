// React
import {Outlet, useParams} from 'react-router-dom';

// Components
import Header from './components/Header';
import Footer from './components/Footer';
import SignupHeader from "./components/SignupHeader";

export default function App() {
    const { pathname } = useParams();
    const showSignupHeader = pathname === '/login' || pathname === '/signup';

  return (
    <>
        {showSignupHeader ? <SignupHeader /> : <Header />}
        <Outlet />
        <Footer />
    </>
  )
}
