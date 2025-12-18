// import React from 'react';
// import { Shield, AlertTriangle, CheckCircle, XCircle, Clock } from 'lucide-react';
// import StatCard from '../ui/StatCard';
// import Card from '../ui/Card';
// import type { SecurityMetrics as SecurityMetricsType } from '../../types/security';
//
// interface SecurityMetricsProps {
//     metrics?: SecurityMetricsType;
//     loading?: boolean;
// }
//
// const SecurityMetrics: React.FC<SecurityMetricsProps> = ({
//                                                              metrics,
//                                                              loading = false
//                                                          }) => {
//     if (loading || !metrics) {
//         return (
//             <div className="space-y-4">
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//                     {[...Array(4)].map((_, index) => (
//                         <div key={index} className="animate-pulse bg-white rounded-xl border border-gray-100 p-6">
//                             <div className="h-4 bg-gray-200 rounded mb-4"></div>
//                             <div className="h-8 bg-gray-200 rounded w-1/2"></div>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         );
//     }
//
//     return (
//         <div className="space-y-6">
//             {/* Main Stats Grid */}
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//                 <StatCard
//                     title="Συνολικά Events"
//                     value={metrics.totalEvents}
//                     icon={<Shield className="w-6 h-6" />}
//                 />
//
//                 <StatCard
//                     title="Επιτυχημένα Logins"
//                     value={metrics.successfulLoginsLast24h}
//                     icon={<CheckCircle className="w-6 h-6" />}
//                     changeType="positive"
//                 />
//
//                 <StatCard
//                     title="Αποτυχημένα Logins"
//                     value={metrics.failedLoginsLast24h}
//                     icon={<XCircle className="w-6 h-6" />}
//                     changeType={metrics.failedLoginsLast24h > 0 ? 'negative' : undefined}
//                 />
//
//                 <StatCard
//                     title="Token Errors"
//                     value={metrics.tokenErrorsLast24h}
//                     icon={<Clock className="w-6 h-6" />}
//                     changeType={metrics.tokenErrorsLast24h > 0 ? 'negative' : undefined}
//                 />
//             </div>
//
//             {/* Additional Info Cards */}
//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
//                 {/* Success Rate */}
//                 <Card title="Success Rate" subtitle="Last 24 hours">
//                     <div className="text-center py-6">
//                         <div className="text-4xl font-bold text-green-600">
//                             {metrics.successRate.toFixed(1)}%
//                         </div>
//                         <p className="text-sm text-gray-500 mt-2">
//                             Ποσοστό επιτυχίας
//                         </p>
//                     </div>
//                 </Card>
//
//                 {/* Suspicious IPs */}
//                 <Card
//                     title="Ύποπτες IP Διευθύνσεις"
//                     subtitle={`${metrics.suspiciousIPs.length} detected`}
//                 >
//                     <div className="space-y-2">
//                         {metrics.suspiciousIPs.length === 0 ? (
//                             <div className="text-center py-8 text-gray-500">
//                                 Καμία ύποπτη δραστηριότητα
//                             </div>
//                         ) : (
//                             metrics.suspiciousIPs.slice(0, 5).map((ip, index) => (
//                                 <div
//                                     key={index}
//                                     className="flex items-center justify-between p-3 bg-red-50 rounded-lg"
//                                 >
//                                     <span className="text-sm font-mono text-red-700">{ip}</span>
//                                     <AlertTriangle className="w-4 h-4 text-red-500" />
//                                 </div>
//                             ))
//                         )}
//                     </div>
//                 </Card>
//
//                 {/* Recent Failures */}
//                 <Card
//                     title="Πρόσφατες Αποτυχίες"
//                     subtitle={`${metrics.recentFailures.length} failures`}
//                 >
//                     <div className="space-y-2">
//                         {metrics.recentFailures.length === 0 ? (
//                             <div className="text-center py-8 text-gray-500">
//                                 Καμία πρόσφατη αποτυχία
//                             </div>
//                         ) : (
//                             metrics.recentFailures.slice(0, 3).map((failure, index) => (
//                                 <div
//                                     key={index}
//                                     className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
//                                 >
//                                     <div className="flex items-center justify-between mb-1">
//                                         <span className="text-sm font-medium text-gray-900">
//                                             {failure.username}
//                                         </span>
//                                         <span className="text-xs text-gray-500">
//                                             {new Date(failure.timestamp).toLocaleTimeString('el-GR', {
//                                                 hour: '2-digit',
//                                                 minute: '2-digit'
//                                             })}
//                                         </span>
//                                     </div>
//                                     <div className="text-xs text-gray-600">
//                                         {failure.eventType}
//                                     </div>
//                                 </div>
//                             ))
//                         )}
//                     </div>
//                 </Card>
//             </div>
//         </div>
//     );
// };
//
// export default SecurityMetrics;

import React from 'react';
import { Shield, CheckCircle, XCircle, Clock, TrendingUp, AlertTriangle, Ban } from 'lucide-react';
import StatCard from '../ui/StatCard';
import type { SecurityMetrics as SecurityMetricsType } from '../../types/security';

interface SecurityMetricsProps {
    metrics?: SecurityMetricsType;
    loading?: boolean;
}

const SecurityMetrics: React.FC<SecurityMetricsProps> = ({ metrics, loading = false }) => {
    if (loading || !metrics) {
        return (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4">
                {[...Array(7)].map((_, index) => (
                    <div key={index} className="animate-pulse bg-white rounded-xl border border-gray-100 p-6">
                        <div className="h-4 bg-gray-200 rounded mb-4"></div>
                        <div className="h-8 bg-gray-200 rounded w-1/2"></div>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4">
            <StatCard title="Συνολικά Events"
                      value={metrics.totalEvents}
                      icon={<Shield className="w-5 h-5" />}
            />
            <StatCard title="Επιτυχημένα Logins"
                      value={metrics.successfulLoginsLast24h}
                      icon={<CheckCircle className="w-5 h-5" />}
                      changeType="positive"
            />
            <StatCard title="Αποτυχημένα Logins"
                      value={metrics.failedLoginsLast24h}
                      icon={<XCircle className="w-5 h-5" />}
                      changeType={metrics.failedLoginsLast24h > 0 ? 'negative' : undefined}
            />
            <StatCard title="Token Errors"
                      value={metrics.tokenErrorsLast24h}
                      icon={<Clock className="w-5 h-5" />}
                      changeType={metrics.tokenErrorsLast24h > 0 ? 'negative' : undefined}
            />
            <StatCard title="Success Rate"
                      value={`${metrics.successRate.toFixed(1)}%`}
                      icon={<TrendingUp className="w-5 h-5" />}
                      valueClassName={metrics.successRate >= 50 ? 'text-green-600' : 'text-red-600'}
                      // changeType={metrics.successRate >= 50 ? 'positive' : 'negative'}
            />
            <StatCard title="Ύποπτες IP"
                      value={metrics.suspiciousIPs.length}
                      icon={<AlertTriangle className="w-5 h-5" />}
                      changeType={metrics.suspiciousIPs.length > 0 ? 'negative' : undefined}
            />
            <StatCard title="Auth Failures"
                      value={metrics.authorizationFailuresLast24h}
                      icon={<Ban className="w-5 h-5" />}
                      changeType={metrics.authorizationFailuresLast24h > 0 ? 'negative' : undefined}
            />
        </div>
    );
};

export default SecurityMetrics;