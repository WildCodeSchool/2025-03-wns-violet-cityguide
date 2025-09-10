import ReactDOM from 'react-dom/client'
import { StrictMode } from 'react'
import './scss/index.scss'
import App from './App.tsx'
import Signup from './pages/Signup.tsx'
import HomePage from './pages/HomePage.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
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
