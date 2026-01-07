// React
import ReactDOM from 'react-dom/client'
import { StrictMode } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

// Styles
import 'leaflet/dist/leaflet.css';
import './scss/index.scss';

// Components
import App from './App.tsx'
import Signup from './pages/Signup.tsx'
import Login from './pages/Login.tsx'
import HomePage from './pages/HomePage.tsx'
import City from './pages/City.tsx'
import Pois from './pages/Pois.tsx'
import Account from './pages/Account.tsx'
import LegalNotice from "./pages/LegalNotice.tsx";
import NotFound from "./pages/NotFound.tsx";

// Apollo
import {
	ApolloClient,
	InMemoryCache,
	ApolloProvider,
} from "@apollo/client";

const client = new ApolloClient({
	uri: "/api",
	cache: new InMemoryCache(),
});

const router = createBrowserRouter([
	{
		element: <App />,
		children: [
			{
				path: '',
				element: <HomePage />
			},
			{
				path: '/signup',
				element: <Signup />,
			},
			{
				path: '/login',
				element: <Login />,
			},
			{
				path: '/city/:cityId',
				element: <City />,
			},
			{
				path: '/pois',
				element: <Pois />,
			},
			{
				path: '/account',
				element: <Account />,
			},
			{
				path: '/legalNotice',
				element: <LegalNotice />,
			},
			{
			  path: '*',
			  element: <NotFound/>,
			},
		],
	},
])

ReactDOM.createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<ApolloProvider client={client}>
			<RouterProvider router={router}/>
		</ApolloProvider>
	</StrictMode>,
)
