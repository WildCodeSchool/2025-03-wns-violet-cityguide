import React from 'react';
import { useCookies } from 'react-cookie';

const CookieDebugger: React.FC = () => {
    const [cookies] = useCookies([
        'cityGuide-auth',
        'cityGuide-consent',
        'cityGuide-theme',
        'cityGuide-preferences',
        'cityGuide-favoriteCategories'
    ]);

    const cookieEntries = Object.entries(cookies);

    return (
        <div style={{
            position: 'fixed',
            bottom: '10px',
            right: '10px',
            background: '#f0f0f0',
            border: '1px solid #ccc',
            padding: '10px',
            borderRadius: '5px',
            fontSize: '12px',
            maxWidth: '300px',
            maxHeight: '400px',
            overflow: 'auto',
            zIndex: 1000,
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        }}>
            <h4 style={{ margin: '0 0 10px 0', color: '#333' }}>🍪 Cookie Debug</h4>
            {cookieEntries.length === 0 ? (
                <p>Aucun cookie trouvé</p>
            ) : (
                <div>
                    {cookieEntries.map(([key, value]) => (
                        <div key={key} style={{ marginBottom: '8px' }}>
                            <strong style={{ color: '#0066cc' }}>{key}:</strong>
                            <pre style={{ 
                                fontSize: '11px', 
                                margin: '2px 0',
                                background: '#fff',
                                padding: '4px',
                                border: '1px solid #ddd',
                                borderRadius: '3px',
                                wordBreak: 'break-all'
                            }}>
                                {typeof value === 'object' ? JSON.stringify(value, null, 2) : String(value)}
                            </pre>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CookieDebugger;