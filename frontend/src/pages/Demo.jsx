import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button';

const Demo = () => {
    return (
        <div className="p-10 min-h-screen animate-fade-in">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-display font-black text-slate-900 tracking-tight mb-4">Demo</h1>
                <p className="text-slate-600 font-medium mb-8">Use this page as a quick walkthrough entrypoint.</p>
                <Link to="/dashboard">
                    <Button variant="primary" className="h-12 px-6">Go to Dashboard</Button>
                </Link>
            </div>
        </div>
    );
};

export default Demo;
