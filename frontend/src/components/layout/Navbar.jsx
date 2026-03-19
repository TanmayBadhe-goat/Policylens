import React from 'react';
import { Bell, User, Globe } from 'lucide-react';

const Navbar = () => {
    return (
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-20">
            <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-700 select-none">
                    <Globe size={16} className="text-slate-600" />
                    PolicyLens
                </div>
            </div>

            <div className="flex items-center gap-6">
                <div className="h-8 w-px bg-slate-200"></div>

                {/* Notifications */}
                <button 
                    onClick={() => alert("No new notifications")}
                    className="relative p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
                >
                    <Bell size={20} />
                </button>

                {/* User Profile */}
                <div className="flex items-center gap-3 pl-4 border-l border-slate-200 -mr-2 px-3 py-2 rounded-lg">
                    <div className="text-right hidden sm:block">
                        <p className="text-sm font-semibold text-slate-700">Vipin Kumar</p>
                        <p className="text-xs text-slate-400 font-semibold uppercase tracking-widest">Student Build</p>
                    </div>
                    <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center text-white">
                        <User size={18} />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
