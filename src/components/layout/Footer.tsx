import React from 'react';
import { Heart, Mail, Phone, MapPin, Github, Twitter, Linkedin } from 'lucide-react';

export const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="mt-auto border-t" style={{
            background: 'linear-gradient(135deg, #F8F6FF 0%, #F0EBFF 50%, #E8DDFF 100%)',
            borderColor: 'rgba(139, 92, 246, 0.2)'
        }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                {/* Main Footer */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">

                    {/* Description */}
                    <div className="md:col-span-2">
                        <div className="flex items-center space-x-3 mb-4">
                            <div className="w-12 h-12 rounded-3xl flex items-center justify-center shadow-lg" style={{
                                background: 'linear-gradient(135deg, #8B5CF6 0%, #3B82F6 100%)'
                            }}>
                                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-gray-800">WorkApp</h3>
                                <p className="text-sm text-gray-600">Διαχείριση Πελατών & Ραντεβού</p>
                            </div>
                        </div>

                        <p className="text-gray-600 text-sm mb-4 max-w-md">
                            Η πλατφόρμα διαχείρισης που απλοποιεί την οργάνωση των πελατών σας και των ραντεβού σας.
                            Εύκολη, γρήγορη και αξιόπιστη λύση για τις επαγγελματικές σας ανάγκες.
                        </p>

                        {/* Social Links */}
                        <div className="flex space-x-3">
                            <button className="p-2 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors">
                                <Github className="w-4 h-4" />
                            </button>
                            <button className="p-2 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors">
                                <Twitter className="w-4 h-4" />
                            </button>
                            <button className="p-2 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors">
                                <Linkedin className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-sm font-semibold text-gray-800 mb-4">Γρήγοροι Σύνδεσμοι</h4>
                        <ul className="space-y-2">
                            <li>
                                <button className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                                    Αρχική Σελίδα
                                </button>
                            </li>
                            <li>
                                <button className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                                    Διαχείριση Πελατών
                                </button>
                            </li>
                            <li>
                                <button className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                                    Προγραμματισμός Ραντεβού
                                </button>
                            </li>
                            <li>
                                <button className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                                    Αναφορές & Στατιστικά
                                </button>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-sm font-semibold text-gray-800 mb-4">Επικοινωνία</h4>
                        <ul className="space-y-3">
                            <li className="flex items-center space-x-2 text-sm text-gray-600">
                                <Mail className="w-4 h-4 text-blue-600" />
                                <span>support@workapp.gr</span>
                            </li>
                            <li className="flex items-center space-x-2 text-sm text-gray-600">
                                <Phone className="w-4 h-4 text-blue-600" />
                                <span>+30 210 123 4567</span>
                            </li>
                            <li className="flex items-start space-x-2 text-sm text-gray-600">
                                <MapPin className="w-4 h-4 text-blue-600 mt-0.5" />
                                <span>Αθήνα, Ελλάδα<br />Κεντρικά Γραφεία</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-purple-200 pt-6">
                    <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">

                        {/* Copyright */}
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <span>© {currentYear} WorkApp.</span>
                            <span>Φτιαγμένο με</span>
                            <Heart className="w-4 h-4 text-red-500" />
                            <span>στην Ελλάδα</span>
                        </div>

                        {/* Links */}
                        <div className="flex space-x-6">
                            <button className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                                Πολιτική Απορρήτου
                            </button>
                            <button className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                                Όροι Χρήσης
                            </button>
                            <button className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                                Cookies
                            </button>
                        </div>
                    </div>
                </div>

                {/* Version Info */}
                <div className="mt-4 text-center">
                    <p className="text-xs text-gray-500">
                        Version 1.0.0 • Τελευταία ενημέρωση: {new Date().toLocaleDateString('el-GR', {
                        month: 'long',
                        year: 'numeric'
                    })}
                    </p>
                </div>
            </div>
        </footer>
    );
};