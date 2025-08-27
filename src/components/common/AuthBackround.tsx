import React from 'react';

interface AuthBackgroundProps {
    children: React.ReactNode;
}

const AuthBackground: React.FC<AuthBackgroundProps> = ({ children }) => {
    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
            {/* Gradient Background */}
            <div className="absolute inset-0" style={{
                background: 'linear-gradient(135deg, #4A90E2 0%, #357ABD 50%, #2E5A87 100%)'
            }}>
                {/* Animated Background Elements */}
                <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-white/10 animate-pulse"></div>
                <div className="absolute bottom-1/4 -right-32 w-80 h-80 rounded-full bg-white/8 animate-pulse delay-1000"
                     style={{ animationDuration: '8s' }}></div>

                {/* Geometric Decorations */}
                <div className="absolute top-20 right-20">
                    <div className="w-16 h-16 border-2 border-white/20 rotate-45 animate-spin "
                         style={{ animationDuration: '6s',
                             transform: 'rotate(45deg)',
                             transformOrigin: 'center'}}></div>
                </div>


                <div className="absolute top-32 right-40">
                    <div className="w-8 h-8 border border-white/15 rotate-12 animate-spin"
                         style={{ animationDuration: '3s', animationDirection: 'reverse' }}></div>
                </div>


                <div className="absolute bottom-20 left-20">
                    <div className="w-12 h-12 bg-white/10 rounded-full animate-bounce"
                         style={{ animationDelay: '500ms' }}></div>
                </div>

                {/* Floating dots */}
                <div className="absolute top-1/2 left-20">
                    <div className="flex space-x-2">
                        <div className="w-3 h-3 rounded-full bg-white/20 animate-pulse"></div>
                        <div className="w-3 h-3 rounded-full bg-white/20 animate-pulse"
                             style={{ animationDelay: '500ms' }}></div>
                        <div className="w-3 h-3 rounded-full bg-white/20 animate-pulse"
                             style={{ animationDelay: '1000ms' }}></div>
                    </div>
                </div>

                <div className="absolute bottom-1/3 right-20">
                    <div className="flex space-x-1">
                        <div className="w-2 h-2 rounded-full bg-white/25 animate-pulse"></div>
                        <div className="w-2 h-2 rounded-full bg-white/25 animate-pulse"
                             style={{ animationDelay: '300ms' }}></div>
                    </div>
                </div>


            {/*extra animated elements*/}
            <div className="absolute top-1/3 left-1/4">
                <div className="w-6 h-6 border border-white/10 rounded-full animate-ping"
                     style={{ animationDuration: '12s' }}></div>
            </div>

            <div className="absolute bottom-1/2 right-1/3">
                <div className="w-4 h-4 bg-white/5 transform rotate-45 animate-pulse"
                     style={{ animationDuration: '2s' }}></div>
            </div>
        </div>

            {/* Content */}
            {children}
        </div>
    );
};

export default AuthBackground;