// React
import ReactDOM from 'react-dom/client'
import { StrictMode } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

// Styles
import './scss/index.scss'

// Components
import App from './App.tsx'
import Signup from './pages/Signup.tsx'
import Login from './pages/Login.tsx'
import HomePage from './pages/HomePage.tsx'
import Cities from './pages/City.tsx'
import Pois from './pages/Pois.tsx'
import Account from './pages/Account.tsx'

// Apollo
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
} from "@apollo/client";

const client = new ApolloClient({
    uri: "http://localhost:7000/api",
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
                path: '/cities',
                element: <Cities />,
            },
            {
                path: '/pois',
                element: <Pois />,
            },
            {
                path: '/account',
                element: <Account />,
            }
            // {
            //     path: '*',
            //     element: <NotFound/>,
            // },
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
