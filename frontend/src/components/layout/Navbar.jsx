import React from 'react';
import { Bell, User, Globe } from 'lucide-react';

const Navbar = () => {
    return (
        <header className="h-20 bg-white border-b border-slate-300 flex items-center justify-between px-8 sticky top-0 z-20 shadow-sm">
            <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 text-slate-800 font-bold">
                    <Globe size={18} className="text-blue-600" />
                    <span>PolicyLens</span>
                </div>
            </div>

            <div className="flex items-center gap-6">
                {/* Notifications */}
                <button 
                    onClick={() => alert("No new notifications")}
                    className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors border border-transparent hover:border-blue-100"
                >
                    <Bell size={20} />
                </button>

                {/* User Profile */}
                <div className="flex items-center gap-3 pl-6 border-l border-slate-300">
                    <div className="text-right hidden sm:block">
                        <p className="text-sm font-bold text-slate-800">Tanmay Badhe</p>
                        <p className="text-xs text-slate-500">Student</p>
                    </div>
                    <div className="w-10 h-10 rounded border border-slate-300 bg-slate-100 flex items-center justify-center text-slate-600">
                        <User size={18} />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
