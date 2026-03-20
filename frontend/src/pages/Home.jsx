import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Target, Leaf, Database, Award, FileText, Layers, Cpu, Activity, CheckCircle2 } from 'lucide-react';
import Button from '../components/common/Button';

const Home = () => {
    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="py-24 px-6 lg:px-12 bg-slate-50 border-b border-slate-200 text-center">
                <div className="max-w-4xl mx-auto">
                    <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-bold mb-8">
                        ⭐ PolicyLens Civic AI Student Project
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-6 leading-tight">
                        Decode Laws in <span className="text-blue-600">Seconds.</span>
                    </h1>
                    <p className="text-xl text-slate-600 font-medium mb-10 leading-relaxed">
                        Transform complex legal documents into simple, actionable insights.
                        Experience legislative intelligence with AI-powered analysis that makes policy comprehension easy and fun!
                    </p>
                    <Link to="/dashboard">
                        <Button variant="primary" className="text-lg">
                            Start Analyzing <ArrowRight size={20} className="inline ml-2" />
                        </Button>
                    </Link>
                </div>
            </section>

            {/* Key Metrics Section */}
            <section className="py-20 px-6 lg:px-12">
                <div className="max-w-6xl mx-auto text-center">
                    <h2 className="text-3xl font-bold text-slate-900 mb-4">Proven Results</h2>
                    <p className="text-lg text-slate-600 mb-12">See how PolicyLens transforms legislative analysis.</p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                        {[
                            { icon: Target, label: 'Token Reduction', value: '82%' },
                            { icon: Zap, label: 'Faster Analysis', value: '50x' },
                            { icon: Leaf, label: 'CO₂ Saved', value: '2.3 tons border' },
                            { icon: Database, label: 'Document Capacity', value: '100k+' },
                            { icon: Award, label: 'Accuracy Rate', value: '98.7%' }
                        ].map((metric, i) => (
                            <div key={i} className="bg-slate-50 border-2 border-slate-200 rounded-xl p-6 hover:border-blue-400 transition-colors">
                                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mx-auto mb-4">
                                    <metric.icon size={24} />
                                </div>
                                <div className="text-2xl font-bold text-slate-900 mb-1">{metric.value}</div>
                                <div className="text-xs font-bold text-slate-500 uppercase">{metric.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="py-20 px-6 lg:px-12 bg-slate-50 border-y border-slate-200">
                <div className="max-w-6xl mx-auto text-center">
                    <h2 className="text-3xl font-bold text-slate-900 mb-12">How It Works</h2>
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                        {[
                            { icon: FileText, title: 'PDF Ingestion', desc: 'Upload legal PDF' },
                            { icon: Layers, title: 'Smart Parsing', desc: 'Structure text' },
                            { icon: Cpu, title: 'Token Compression', desc: 'Optimize content' },
                            { icon: Activity, title: 'Deep Analysis', desc: 'Identify insights' },
                            { icon: CheckCircle2, title: 'Simple Output', desc: 'Clear summaries' }
                        ].map((step, i) => (
                            <div key={i} className="text-center relative">
                                <div className="w-16 h-16 mx-auto mb-4 bg-white border-2 border-slate-300 rounded-full flex items-center justify-center text-blue-600 font-bold z-10 relative">
                                    <step.icon size={28} />
                                </div>
                                <div className="absolute top-8 left-1/2 w-full h-1 bg-slate-300 -z-10 hidden md:block"></div>
                                <h3 className="font-bold text-slate-900 mb-2">{i + 1}. {step.title}</h3>
                                <p className="text-sm text-slate-600">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-24 px-6 lg:px-12 bg-blue-600 text-center">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-4xl font-bold text-white mb-6">Ready to Transform Legislative Access?</h2>
                    <p className="text-lg text-blue-100 mb-10">
                        Join users making sense of complex laws with our student project model.
                    </p>
                    <Link to="/dashboard">
                        <Button variant="secondary" className="text-lg">
                            Start Analyzing Bills
                        </Button>
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Home;
