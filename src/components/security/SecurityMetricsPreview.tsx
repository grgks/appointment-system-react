import React, { useState } from 'react';
import { Shield } from 'lucide-react';
import { securityService } from '../../services/securityService';
import type { SecurityMetrics } from '../../types/security';

const getSecurityStatus = (metrics: SecurityMetrics): {
    level: 'critical' | 'warning' | 'normal';
    label: string;
    color: string;
    bgColor: string;
} => {
    if (
        metrics.successRate < 50 ||
        metrics.failedLoginsLast24h > 10 ||
        metrics.suspiciousIPs.length > 3
    ) {
        return {
            level: 'critical',
            label: 'Critical',
            color: 'text-red-600',
            bgColor: 'bg-red-100'
        };
    }

    if (
        metrics.successRate < 80 ||
        metrics.failedLoginsLast24h > 5 ||
        metrics.suspiciousIPs.length > 0 ||
        metrics.tokenErrorsLast24h > 5
    ) {
        return {
            level: 'warning',
            label: 'Warning',
            color: 'text-orange-600',
            bgColor: 'bg-orange-100'
        };
    }

    return {
        level: 'normal',
        label: 'Secure',
        color: 'text-green-600',
        bgColor: 'bg-green-100'
    };
};

interface SecurityMetricsPreviewProps {
    onNavigate: () => void;
}

const SecurityMetricsPreview: React.FC<SecurityMetricsPreviewProps> = ({ onNavigate }) => {
    const [metrics, setMetrics] = useState<SecurityMetrics | null>(null);
    const [showPreview, setShowPreview] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleMouseEnter = async () => {
        if (!metrics && !loading) {
            setLoading(true);
            try {
                const data = await securityService.getMetrics();
                setMetrics(data);
            } catch (error) {
                console.error('Failed to fetch security metrics:', error);
            } finally {
                setLoading(false);
            }
        }
        setShowPreview(true);
    };

    const handleMouseLeave = () => {
        setShowPreview(false);
    };

    return (
        <div className="relative">
            <button
                onClick={onNavigate}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-lg hover:from-red-600 hover:to-orange-600 transition-all duration-200 hover:shadow-lg hover:scale-105"
            >
                <Shield className="w-5 h-5" />
                <span className="font-medium">Security</span>
            </button>

            {/* Tooltip Preview */}
            {showPreview && metrics && (
                <div className="absolute top-full right-0 mt-2 w-96 bg-white/95 backdrop-blur-md border border-gray-200 rounded-xl shadow-2xl p-4 z-[9999] animate-fadeIn">
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="text-sm font-semibold text-gray-700">Security Overview</h3>
                        {(() => {
                            const status = getSecurityStatus(metrics);
                            return (
                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${status.bgColor} ${status.color} flex items-center gap-1`}>
                                    {status.level === 'critical' && '🚨'}
                                    {status.level === 'warning' && '⚠️'}
                                    {status.level === 'normal' && '✅'}
                                    {status.label}
                                </span>
                            );
                        })()}
                    </div>

                    {loading ? (
                        <div className="text-center py-4 text-gray-500">Loading...</div>
                    ) : (
                        <>
                            <div className="grid grid-cols-2 gap-3">
                                <div className="bg-gray-50 rounded-lg p-3">
                                    <div className="text-xs text-gray-500">Total Events</div>
                                    <div className="text-lg font-bold text-gray-900">{metrics.totalEvents}</div>
                                </div>
                                <div className="bg-gray-50 rounded-lg p-3">
                                    <div className="text-xs text-gray-500">Success Rate</div>
                                    <div className={`text-lg font-bold ${metrics.successRate >= 50 ? 'text-green-600' : 'text-red-600'}`}>
                                        {metrics.successRate.toFixed(1)}%
                                    </div>
                                </div>
                                <div className="bg-gray-50 rounded-lg p-3">
                                    <div className="text-xs text-gray-500">Failed Logins</div>
                                    <div className="text-lg font-bold text-red-600">{metrics.failedLoginsLast24h}</div>
                                </div>
                                <div className="bg-gray-50 rounded-lg p-3">
                                    <div className="text-xs text-gray-500">Token Errors</div>
                                    <div className="text-lg font-bold text-orange-600">{metrics.tokenErrorsLast24h}</div>
                                </div>
                            </div>
                            <div className="mt-3 text-xs text-gray-500 text-center">
                                Click to view full dashboard
                            </div>
                            {(() => {
                                const status = getSecurityStatus(metrics);
                                if (status.level === 'critical') {
                                    return (
                                        <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded-lg">
                                            <p className="text-xs text-red-700 font-medium">
                                                ⚠️ Immediate attention required
                                            </p>
                                        </div>
                                    );
                                }
                                if (status.level === 'warning') {
                                    return (
                                        <div className="mt-2 p-2 bg-orange-50 border border-orange-200 rounded-lg">
                                            <p className="text-xs text-orange-700 font-medium">
                                                ⚡ Monitor closely
                                            </p>
                                        </div>
                                    );
                                }
                                return null;
                            })()}
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default SecurityMetricsPreview;