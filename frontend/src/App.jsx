import React from 'react';
import { HashRouter } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import AppRoutes from './routes/AppRoutes';

function App() {
    return (
        <HashRouter>
            <div className="min-h-screen font-sans antialiased text-slate-900 bg-gradient-to-br from-indigo-100 via-purple-100 to-blue-100">
                <Sidebar />
                <div className="flex flex-col flex-1 ml-72">
                    <Navbar />
                    <main className="p-6">
                        <AppRoutes />
                    </main>
                </div>
            </div>
        </HashRouter>
    );
}

export default App;
