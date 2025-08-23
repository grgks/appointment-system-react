import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import {
    User,
    LogOut,
    //Settings,
    Menu,
    X,
    Calendar,
    Users,
    Home,
    ChevronDown
} from 'lucide-react';

interface HeaderProps {
    onLogout?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onLogout }) => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [showUserMenu, setShowUserMenu] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);

    const handleLogout = () => {
        if (onLogout) {
            onLogout();
        } else {
            logout();
            navigate('/login');
        }
        setShowUserMenu(false);
    };

    const handleNavigation = (section: string) => {
        console.log(`Navigate to: ${section}`);
        setShowMobileMenu(false);

        // Navigate to
        switch (section) {
            case 'dashboard':
                navigate('/dashboard');
                break;
            case 'clients':
                navigate('/clients');
                break;
            case 'appointments':
                navigate('/appointments');
                break;
            default:
                navigate('/dashboard');
        }
    };

    const navigationItems = [
        { icon: Home, label: 'Αρχική', path: 'dashboard' },
        { icon: Users, label: 'Πελάτες', path: 'clients' },
        { icon: Calendar, label: 'Ραντεβού', path: 'appointments' },
    ];

    return (
        <header className="sticky top-0 z-40 w-full backdrop-blur-md border-b" style={{
            background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.95) 0%, rgba(59, 130, 246, 0.95) 100%)',
            borderColor: 'rgba(255, 255, 255, 0.2)'
        }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">

                    {/* Logo & Brand */}
                    <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 rounded-3xl flex items-center justify-center shadow-lg" style={{
                            background: 'linear-gradient(135deg, #8B5CF6 0%, #3B82F6 100%)'
                        }}>
                            {/*<svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">*/}
                            {/*    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />*/}
                            {/*</svg>*/}
                            <img src="/WorkApp2.png"  className=" h-22 rounded-xl shadow-lg"/>
                        </div>
                        <div className="hidden sm:block">
                            <h1 className="text-xl font-bold text-white">WorkApp</h1>
                            <p className="text-xs text-white/70">Διαχείριση Πελατών & Ραντεβού</p>
                        </div>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-1">
                        {navigationItems.map((item) => (
                            <button
                                key={item.path}
                                onClick={() => handleNavigation(item.path)}
                                className="flex items-center space-x-2 px-4 py-2 rounded-xl text-white/90 hover:text-white transition-all duration-200 hover:bg-white/10"
                            >
                                <item.icon className="w-4 h-4" />
                                <span className="text-sm font-medium">{item.label}</span>
                            </button>
                        ))}
                    </nav>

                    {/* Right Side Actions */}
                    <div className="flex items-center space-x-4">

                        {/* Date & Time */}
                        <div className="hidden md:block text-right">
                            <p className="text-sm font-medium text-white">
                                {new Date().toLocaleDateString('el-GR', {
                                    weekday: 'long',
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric'
                                })}
                            </p>
                            <p className="text-xs text-white/70">
                                {new Date().toLocaleTimeString('el-GR', {
                                    hour: '2-digit',
                                    minute: '2-digit'
                                })}
                            </p>
                        </div>

                        {/* User Info */}
                        <div className="flex items-center space-x-3 px-3 py-2 rounded-xl" style={{
                            background: 'rgba(255, 255, 255, 0.1)',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(255, 255, 255, 0.2)'
                        }}>
                            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                                <User className="w-4 h-4 text-white" />
                            </div>
                            <div className="hidden sm:block text-left">
                                <p className="text-sm font-medium text-white">{user?.username}</p>
                                <p className="text-xs text-white/70">{user?.role}</p>
                            </div>

                            {/* User Menu Dropdown */}
                            <div className="relative">
                                <button
                                    onClick={() => setShowUserMenu(!showUserMenu)}
                                    className="p-1 rounded-lg text-white/90 hover:text-white hover:bg-white/10 transition-colors"
                                >
                                    <ChevronDown className="w-4 h-4" />
                                </button>

                                {/* User Dropdown */}
                                {showUserMenu && (
                                    <div className="absolute right-0 mt-2 w-48 rounded-2xl shadow-2xl z-50" style={{
                                        background: 'linear-gradient(135deg, #F8F6FF 0%, #F0EBFF 50%, #E8DDFF 100%)',
                                        backdropFilter: 'blur(10px)',
                                        border: '1px solid rgba(255, 255, 255, 0.3)'
                                    }}>
                                        <div className="py-2">
                                            <div className="px-4 py-3 border-b border-purple-200">
                                                <p className="text-sm font-medium text-gray-800">{user?.username}</p>
                                                <p className="text-xs text-gray-600">{user?.role}</p>
                                            </div>

                                            {/*<button*/}
                                            {/*    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-white/50 transition-colors flex items-center space-x-2"*/}
                                            {/*    onClick={() => {*/}
                                            {/*        console.log('Navigate to profile');*/}
                                            {/*        setShowUserMenu(false);*/}
                                            {/*    }}*/}
                                            {/*>*/}
                                            {/*    <User className="w-4 h-4" />*/}
                                            {/*    <span>Προφίλ</span>*/}
                                            {/*</button>*/}

                                            {/*button settings menu*/}
                                            {/*<button*/}
                                            {/*    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-white/50 transition-colors flex items-center space-x-2"*/}
                                            {/*    onClick={() => {*/}
                                            {/*        console.log('Navigate to settings');*/}
                                            {/*        setShowUserMenu(false);*/}
                                            {/*    }}*/}
                                            {/*>*/}
                                            {/*    <Settings className="w-4 h-4" />*/}
                                            {/*    <span>Ρυθμίσεις</span>*/}
                                            {/*</button>*/}

                                            <div className="border-t border-purple-200 mt-2 pt-2">
                                                <button
                                                    onClick={handleLogout}
                                                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center space-x-2"
                                                >
                                                    <LogOut className="w-4 h-4" />
                                                    <span>Έξοδος</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setShowMobileMenu(!showMobileMenu)}
                            className="md:hidden p-2 rounded-xl text-white/90 hover:text-white hover:bg-white/10 transition-colors ml-2"
                        >
                            {showMobileMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {showMobileMenu && (
                    <div className="md:hidden py-4 border-t border-white/20">
                        {/* Mobile Date & Time */}
                        <div className="px-4 py-2 mb-4 rounded-lg mx-4" style={{
                            background: 'rgba(255, 255, 255, 0.1)',
                            backdropFilter: 'blur(10px)'
                        }}>
                            <p className="text-sm font-medium text-white">
                                {new Date().toLocaleDateString('el-GR', {
                                    weekday: 'long',
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric'
                                })}
                            </p>
                            <p className="text-xs text-white/70">
                                {new Date().toLocaleTimeString('el-GR', {
                                    hour: '2-digit',
                                    minute: '2-digit'
                                })}
                            </p>
                        </div>

                        <nav className="space-y-2 px-4">
                            {navigationItems.map((item) => (
                                <button
                                    key={item.path}
                                    onClick={() => {
                                        handleNavigation(item.path);
                                        setShowMobileMenu(false);
                                    }}
                                    className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-white/90 hover:text-white hover:bg-white/10 transition-colors"
                                >
                                    <item.icon className="w-5 h-5" />
                                    <span className="font-medium">{item.label}</span>
                                </button>
                            ))}
                        </nav>
                    </div>
                )}
            </div>

            {/* Click outside for dropdown */}
            {showUserMenu && (
                <div
                    className="fixed inset-0 z-30"
                    onClick={() => setShowUserMenu(false)}
                />
            )}
        </header>
    );
};