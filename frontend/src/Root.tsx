import React from 'react';
import App from './App';
import { CookiesProvider } from 'react-cookie';

export default function Root(): React.ReactElement {
  return (
    <CookiesProvider defaultSetOptions={{ path: '/' }}>
      <App />
    </CookiesProvider>
  );
}