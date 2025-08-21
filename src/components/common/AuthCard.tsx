import React from 'react';
import {Link} from "react-router-dom";
import {ArrowLeft} from "lucide-react";

interface AuthCardProps {
    children: React.ReactNode;
    title: string;
    subtitle: string;
    showBackButton?: boolean;
    backTo?: string;
}

const AuthCard: React.FC<AuthCardProps> = ({
                                               children,
                                               title,
                                               subtitle,
                                               showBackButton = false,
                                               backTo = "/login"
                                           }) => {
    return (
        <div className="max-w-md w-full mx-4 p-8 relative z-10 rounded-3xl shadow-2xl backdrop-blur-md" style={{
            background: 'linear-gradient(135deg, #F8F6FF 0%, #F0EBFF 50%, #E8DDFF 100%)',
            border: '1px solid rgba(255, 255, 255, 0.3)'
        }}>
            {/* Header */}
            <div className="text-center mb-8">
                {showBackButton && (
                    <div className="flex justify-start mb-4">
                        <Link to={backTo} className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors group">
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                            <span className="text-sm">Πίσω</span>
                        </Link>
                    </div>
                )}

                {/* Logo */}
                <div className="mx-auto w-20 h-20 rounded-3xl flex items-center justify-center mb-6 shadow-lg" style={{
                    background: 'linear-gradient(135deg, #8B5CF6 0%, #3B82F6 100%)'
                }}>
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                </div>

                <h1 className="text-3xl font-bold text-gray-800 mb-2">{title}</h1>
                <p className="text-gray-600">{subtitle}</p>
            </div>

            {/* Content */}
            {children}
        </div>
    );
};

export default AuthCard;