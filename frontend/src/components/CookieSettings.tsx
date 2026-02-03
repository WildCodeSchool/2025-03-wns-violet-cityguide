import React, { useState } from 'react';
import { useCookieConsent } from '../hooks/useCookieConsent';

const CookieSettings: React.FC = () => {
    const { consent, resetConsent } = useCookieConsent();
    const [showSettings, setShowSettings] = useState(false);

    if (!consent) {
        return null;
    }

    return (
        <div style={{ marginTop: '20px' }}>
            <button
                onClick={() => setShowSettings(!showSettings)}
                style={{
                    backgroundColor: '#FEFAF1',
                    color: '#000000',
                    border: '1px solid #ddd',
                    padding: '10px 15px',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontSize: '14px'
                }}
            >
                🍪 Gérer les cookies
            </button>

            {showSettings && (
                <div style={{
                    marginTop: '15px',
                    padding: '20px',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    backgroundColor: '#f8f9fa'
                }}>
                    <h4 style={{ margin: '0 0 15px 0' }}>Préférences de cookies actuelles</h4>
                    
                    <div style={{ display: 'grid', gap: '10px', marginBottom: '15px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span>🔒 Cookies nécessaires</span>
                            <span style={{ color: '#27ae60', fontWeight: 'bold' }}>
                                {consent.necessary ? '✅ Activés' : '❌ Désactivés'}
                            </span>
                        </div>
                        
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span>⚙️ Cookies de préférences</span>
                            <span style={{ color: consent.preferences ? '#27ae60' : '#e74c3c', fontWeight: 'bold' }}>
                                {consent.preferences ? '✅ Activés' : '❌ Désactivés'}
                            </span>
                        </div>
                    
                    </div>

                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                        <button
                            onClick={() => {
                                resetConsent();
                                setShowSettings(false);
                            }}
                            style={{
                                backgroundColor: '#FEFAF1',
                                color: '#000000',
                                border: '1px solid #ddd',
                                padding: '8px 15px',
                                borderRadius: '5px',
                                cursor: 'pointer',
                                fontSize: '12px'
                            }}
                        >
                            ↻ Modifier les préférences
                        </button>
                        
                        <button
                            onClick={() => setShowSettings(false)}
                            style={{
                                backgroundColor: '#FEFAF1',
                                color: '#000000',
                                border: '1px solid #ddd',
                                padding: '8px 15px',
                                borderRadius: '5px',
                                cursor: 'pointer',
                                fontSize: '12px'
                            }}
                        >
                            Fermer
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CookieSettings;