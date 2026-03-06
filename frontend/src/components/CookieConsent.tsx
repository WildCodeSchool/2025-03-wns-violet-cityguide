import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';

const CookieConsent: React.FC = () => {
    const [cookies, setCookie] = useCookies(['cityGuide-consent']);
    const [showBanner, setShowBanner] = useState(false);

    useEffect(() => {
        // Toujours afficher la bannière si l'utilisateur n'a pas encore donné son consentement
        if (!cookies['cityGuide-consent']) {
            setShowBanner(true);
        } else {
            setShowBanner(false);
        }
    }, [cookies]);

    const acceptAllCookies = () => {
        setCookie('cityGuide-consent', {
            necessary: true,
            preferences: true
        }, {
            path: '/',
            maxAge: 365 * 24 * 60 * 60, // 1 an
            secure: true,
            sameSite: 'strict'
        });
        setShowBanner(false);
    };

    const acceptOnlyNecessary = () => {
        setCookie('cityGuide-consent', {
            necessary: true,
            preferences: false
        }, {
            path: '/',
            maxAge: 365 * 24 * 60 * 60, // 1 an
            secure: true,
            sameSite: 'strict'
        });
        setShowBanner(false);
    };

    if (!showBanner) {
        return null;
    }

    return (
        <div style={{
            position: 'fixed',
            bottom: '5px',
            right: '5px',
            backgroundColor: '#eee0cb',
            color: 'white',
            padding: '20px',
            zIndex: 10000,
            boxShadow: '0 -2px 10px rgba(0,0,0,0.1)',
            border: '2px solid #342D29FF', 
			maxWidth: '500px', 
			borderRadius: '30px'

        }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <div style={{ marginBottom: '15px' }}>
                    <h3 style={{ margin: '0 0 10px 0', fontSize: '18px', color: '#342D29FF' }}>
                        🍪 Consentement aux cookies requis
                    </h3>
                    <p style={{ margin: '0 0 15px 0', fontSize: '14px', lineHeight: '1.5', fontStyle: 'normal', color: '#342D29FF'  }}>
                        <strong>Acceptation obligatoire :</strong> Nous utilisons des cookies pour améliorer votre expérience sur CityGuide. 
                        Ces cookies sont nécessaires au fonctionnement du site, d'autres nous permettent 
                        de sauvegarder vos préférences personnelles. Vous devez accepter au moins les cookies nécessaires pour continuer.
                    </p>
                    
                    <div style={{ 
                        display: 'grid', 
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                        gap: '10px', 
                        marginBottom: '15px',
                        fontSize: '12px'
                    }}>
                        <div style={{ padding: '8px', backgroundColor: '#FEFAF1', borderRadius: '4px', fontStyle: 'normal', color: '#342D29FF' }}>
                            <strong>🔒 Nécessaires</strong><br />
                            Authentification, sécurité
                        </div>
                        <div style={{ padding: '8px', backgroundColor: '#FEFAF1', borderRadius: '4px', fontStyle: 'normal', color: '#342D29FF'  }}>
                            <strong>⚙️ Préférences</strong><br />
                            Thème, langue, favoris
                        </div>
                    </div>
                </div>

                <div style={{ 
                    display: 'flex', 
                    flexWrap: 'wrap', 
                    gap: '10px', 
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <button
                        onClick={acceptAllCookies}
                        style={{
                            backgroundColor: '#FEFAF1',
                            color: '#000000',
                            border: '1px solid #ddd',
                            padding: '10px 20px',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            fontSize: '14px',
                            fontWeight: 'bold'
                        }}
                    >
                        ✅ Accepter tout
                    </button>

                    <button
                        onClick={acceptOnlyNecessary}
                        style={{
                            backgroundColor: '#FEFAF1',
                            color: '#000000',
                            border: '1px solid #ddd',
                            padding: '10px 20px',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            fontSize: '14px'
                        }}
                    >
                        🔒 Nécessaires uniquement
                    </button>

                    <a 
                        href="/legalNotice" 
                        style={{ 
                            color: '#bdc3c7', 
                            fontSize: '12px', 
                            textDecoration: 'underline',
                            marginLeft: '15px'
                        }}
                    >

                    </a>
                </div>
            </div>
        </div>
    );
};

export default CookieConsent;