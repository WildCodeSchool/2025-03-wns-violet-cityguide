// React
import { Outlet } from 'react-router-dom';

// Components
import Header from './components/Header';
import Footer from './components/Footer';

export default function App() {

  return (
    <>
        <Header />
        <Outlet />
        <Footer />
    </>
  )
}
