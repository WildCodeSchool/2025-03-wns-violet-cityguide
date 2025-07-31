import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './scss/index.scss'
import App from './App.tsx'
import { BrowserRouter } from "react-router-dom";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
} from "@apollo/client";

const client = new ApolloClient({
    uri: "http://localhost:7000/api",
    cache: new InMemoryCache(),
});

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ApolloProvider client={client}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </ApolloProvider>
    </StrictMode>,
)
