import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    LayoutDashboard,
    Home as HomeIcon,
    Zap,
    Sparkles,
    TrendingUp
} from 'lucide-react';

const Sidebar = () => {
    const links = [
        { icon: HomeIcon, label: 'Overview', path: '/', color: 'text-violet-500' },
        { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard', color: 'text-indigo-500' },
    ];

    return (
        <aside className="w-72 h-screen bg-white/80 backdrop-blur-2xl border-r border-violet-100/50 flex flex-col fixed left-0 top-0 z-30 shadow-2xl shadow-violet-500/5">
            {/* Decorative gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-transparent to-fuchsia-500/5 pointer-events-none"></div>
            
            {/* Logo */}
            <div className="h-24 flex items-center px-6 border-b border-violet-100/50 relative">
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <div className="w-12 h-12 bg-gradient-to-br from-violet-600 via-purple-500 to-fuchsia-500 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-violet-500/30 animate-pulse-slow">
                            P
                        </div>
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                            <Sparkles size={10} className="text-white" />
                        </div>
                    </div>
                    <div>
                        <span className="text-xl font-display font-black bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent tracking-tight block">PolicyLens</span>
                        <span className="text-[11px] text-violet-500/70 font-bold uppercase tracking-[0.2em]">Civic AI</span>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <div className="flex-1 overflow-y-auto py-8 relative">
                <div className="px-5 mb-10">
                    <p className="px-4 text-[10px] font-black text-violet-400/80 uppercase tracking-[0.25em] mb-4">Platform</p>
                    <nav className="space-y-2">
                        {links.map((link) => (
                            <NavLink
                                key={link.path}
                                to={link.path}
                                className={({ isActive }) => `
                                    flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-300 group relative overflow-hidden
                                    ${isActive
                                        ? 'bg-gradient-to-r from-violet-500 to-purple-500 text-white shadow-lg shadow-violet-500/25'
                                        : 'text-slate-600 hover:bg-violet-50 hover:text-violet-600'}
                                `}
                            >
                                {({ isActive }) => (
                                    <>
                                        {!isActive && <div className="absolute inset-0 bg-gradient-to-r from-violet-500/0 to-fuchsia-500/0 group-hover:from-violet-500/5 group-hover:to-fuchsia-500/5 transition-all duration-300"></div>}
                                        <span className={`relative z-10 p-2 rounded-lg transition-all duration-300 ${isActive ? 'bg-white/20' : 'bg-violet-50 group-hover:bg-violet-100'}`}>
                                            <link.icon size={20} className={isActive ? 'text-white' : link.color} />
                                        </span>
                                        <span className="relative z-10 text-sm font-bold tracking-tight">{link.label}</span>
                                        {isActive && (
                                            <div className="absolute right-4 w-2 h-2 bg-white rounded-full animate-pulse"></div>
                                        )}
                                    </>
                                )}
                            </NavLink>
                        ))}
                    </nav>
                </div>
            </div>

            {/* Footer */}
            <div className="p-5 border-t border-violet-100/50 relative">
                <div className="rounded-2xl p-5 bg-slate-50 border border-slate-200 text-slate-700">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-9 h-9 rounded-xl bg-slate-900 flex items-center justify-center">
                            <Zap size={16} className="text-white" />
                        </div>
                        <div>
                            <p className="text-[12px] font-bold">System Active</p>
                            <p className="text-[10px] text-slate-500 font-semibold">v2.4.0</p>
                        </div>
                    </div>
                    <p className="text-[12px] text-slate-600 font-medium leading-relaxed">
                        Upload a bill and review the citizen summary + compression stats.
                    </p>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
