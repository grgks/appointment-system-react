import React from 'react';

const LoadingSpinner: React.FC = () => {
    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #4A90E2 0%, #357ABD 50%, #2E5A87 100%)'
        }}>
            <div style={{
                background: 'rgba(255, 255, 255, 0.9)',
                padding: '2rem',
                borderRadius: '1rem',
                textAlign: 'center'
            }}>
                <div style={{
                    width: '40px',
                    height: '40px',
                    border: '4px solid #f3f3f3',
                    borderTop: '4px solid #3498db',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite',
                    margin: '0 auto 1rem'
                }}></div>
                <p>Loading...</p>

                <style>{`
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                `}</style>
            </div>
        </div>
    );
};

export default LoadingSpinner;