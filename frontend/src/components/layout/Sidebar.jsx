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
        { icon: HomeIcon, label: 'Overview', path: '/', color: 'text-blue-600' },
        { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard', color: 'text-blue-600' },
    ];

    return (
        <aside className="w-72 h-screen bg-slate-100 border-r border-slate-300 flex flex-col fixed left-0 top-0 z-30">
            
            {/* Logo */}
            <div className="h-20 flex items-center px-6 border-b border-slate-300">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                        P
                    </div>
                    <div>
                        <span className="text-xl font-bold tracking-tight block text-slate-800">PolicyLens</span>
                        <span className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">Civic AI</span>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <div className="flex-1 overflow-y-auto py-8">
                <div className="px-5 mb-10">
                    <p className="px-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-4">Platform</p>
                    <nav className="space-y-1">
                        {links.map((link) => (
                            <NavLink
                                key={link.path}
                                to={link.path}
                                className={({ isActive }) => `
                                    flex items-center gap-3 px-4 py-3 rounded-lg transition-colors font-medium
                                    ${isActive
                                        ? 'bg-blue-600 text-white'
                                        : 'text-slate-600 hover:bg-slate-200'}
                                `}
                            >
                                {({ isActive }) => (
                                    <>
                                        <link.icon size={20} className={isActive ? 'text-white' : link.color} />
                                        <span>{link.label}</span>
                                    </>
                                )}
                            </NavLink>
                        ))}
                    </nav>
                </div>
            </div>

            {/* Footer */}
            <div className="p-5 border-t border-slate-300 bg-slate-50">
                <div className="rounded-lg p-4 border border-slate-200 bg-white">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 rounded bg-slate-800 flex items-center justify-center">
                            <Zap size={14} className="text-white" />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-slate-800">System Active</p>
                            <p className="text-[10px] text-slate-500">Student Build v2.4</p>
                        </div>
                    </div>
                    <p className="text-[11px] text-slate-600 mt-2">
                        Upload a bill and review the citizen summary.
                    </p>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
