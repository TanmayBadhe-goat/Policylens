import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    ArrowRight, Zap, Target, Leaf, Sparkles, ChevronRight, Play,
    Shield, TrendingUp, FileSearch, BarChart3, Cpu, Globe,
    CheckCircle2, Layers, Activity, Rocket, Star, Award,
    FileText, Users, Clock, DollarSign, Database
} from 'lucide-react';
import Button from '../components/common/Button';
import Card from '../components/common/Card';

const AnimatedCounter = ({ end, duration = 2000, suffix = '' }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let startTime;
        const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            setCount(Math.floor(progress * end));
            if (progress < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
    }, [end, duration]);

    return <span>{count.toLocaleString()}{suffix}</span>;
};

const FloatingOrb = ({ className, delay = 0 }) => (
    <motion.div
        className={`absolute rounded-full blur-3xl ${className}`}
        animate={{
            y: [0, -30, 0],
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3]
        }}
        transition={{
            duration: 8,
            delay,
            repeat: Infinity,
            ease: "easeInOut"
        }}
    />
);

const DocumentFlow = () => (
    <motion.div
        className="hidden lg:flex items-center gap-8"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 1 }}
    >
        {/* Document */}
        <motion.div
            className="relative"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
        >
            <div className="w-20 h-24 bg-white/90 backdrop-blur-sm rounded-lg shadow-xl border border-white/20 p-3">
                <div className="h-full bg-gradient-to-br from-slate-200 to-slate-300 rounded flex items-center justify-center">
                    <FileText size={24} className="text-slate-600" />
                </div>
            </div>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-white"></div>
            <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs font-medium text-slate-500 whitespace-nowrap">Legal Document</span>
        </motion.div>

        {/* Arrow 1 */}
        <motion.div
            animate={{ x: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
        >
            <ChevronRight size={20} className="text-indigo-400" />
        </motion.div>

        {/* AI Processing */}
        <motion.div
            className="relative"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
        >
            <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full shadow-xl flex items-center justify-center">
                <Zap size={32} className="text-white" fill="currentColor" />
            </div>
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs font-medium text-slate-500 whitespace-nowrap">AI Processing</div>
        </motion.div>

        {/* Arrow 2 */}
        <motion.div
            animate={{ x: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
        >
            <ChevronRight size={20} className="text-indigo-400" />
        </motion.div>

        {/* Simplified Output */}
        <motion.div
            className="relative"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 3, repeat: Infinity, delay: 1 }}
        >
            <div className="w-20 h-24 bg-white/90 backdrop-blur-sm rounded-lg shadow-xl border border-white/20 p-3">
                <div className="h-full bg-gradient-to-br from-emerald-100 to-teal-100 rounded flex items-center justify-center">
                    <CheckCircle2 size={24} className="text-emerald-600" />
                </div>
            </div>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-white"></div>
            <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs font-medium text-slate-500 whitespace-nowrap">Simple Insights</span>
        </motion.div>
    </motion.div>
);

const Home = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-blue-50/20 overflow-x-hidden">
            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center px-6 lg:px-12 overflow-hidden">
                {/* Animated background */}
                <div className="absolute inset-0">
                    <FloatingOrb className="top-20 left-10 w-[800px] h-[800px] bg-gradient-to-r from-indigo-400/20 to-purple-400/15" delay={0} />
                    <FloatingOrb className="bottom-20 right-10 w-[600px] h-[600px] bg-gradient-to-r from-fuchsia-400/20 to-pink-400/15" delay={2} />
                    <FloatingOrb className="top-1/2 left-1/4 w-[500px] h-[500px] bg-gradient-to-r from-cyan-400/15 to-blue-400/10" delay={4} />
                    <FloatingOrb className="bottom-1/4 right-1/4 w-[400px] h-[400px] bg-gradient-to-r from-amber-400/15 to-orange-400/10" delay={1} />
                </div>

                {/* Grid pattern overlay */}
                <div className="absolute inset-0 opacity-[0.02]" style={{
                    backgroundImage: `linear-gradient(rgba(99, 102, 241, 0.4) 1px, transparent 1px),
                                     linear-gradient(90deg, rgba(99, 102, 241, 0.4) 1px, transparent 1px)`,
                    backgroundSize: '60px 60px'
                }}></div>

                <div className="relative z-10 max-w-7xl mx-auto text-center">
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center gap-3 bg-white/90 backdrop-blur-xl border border-slate-200/50 px-6 py-3 rounded-full text-slate-700 text-sm font-semibold mb-8 shadow-lg"
                    >
                        <div className="relative">
                            <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
                            <div className="absolute inset-0 w-3 h-3 bg-emerald-500 rounded-full animate-ping opacity-75"></div>
                        </div>
                        <Sparkles size={16} className="text-amber-500" />
                        PolicyLens Civic AI
                    </motion.div>

                    {/* Main heading */}
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-5xl md:text-7xl lg:text-8xl font-black text-slate-900 mb-6 leading-[0.9] tracking-tight"
                    >
                        Decode Laws in<br />
                        <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-fuchsia-600 bg-clip-text text-transparent">Seconds.</span>
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="text-xl md:text-2xl text-slate-600 font-medium max-w-4xl mx-auto mb-12 leading-relaxed"
                    >
                        Transform complex legal documents into simple, actionable insights.
                        Experience the future of legislative intelligence with AI-powered analysis that makes
                        policy comprehension accessible to every citizen.
                    </motion.p>

        {/* Document Flow Visualization */}
        <div className="relative h-64 mt-12 mb-16 flex items-center justify-center">
            <DocumentFlow />
        </div>

        {/* CTA Buttons */}
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center relative z-10"
        >
            <Link to="/dashboard">
                <Button variant="primary" className="text-lg px-8 py-4 h-auto group">
                    Start Analyzing
                    <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
            </Link>
        </motion.div>
    </div>
</section>

            {/* Key Metrics Section */}
            <section className="py-20 px-6 lg:px-12">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">Proven Results</h2>
                        <p className="text-xl text-slate-600 font-medium max-w-3xl mx-auto">
                            See how PolicyLens transforms legislative analysis across the board
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                        {[
                            { icon: Target, label: 'Token Reduction', value: '82%', suffix: '%', color: 'from-emerald-500 to-teal-600' },
                            { icon: Zap, label: 'Faster Analysis', value: '50', suffix: 'x', color: 'from-yellow-500 to-orange-500' },
                            { icon: Leaf, label: 'CO₂ Saved', value: '2.3', suffix: ' tons', color: 'from-green-500 to-emerald-600' },
                            { icon: Database, label: 'Document Capacity', value: '100', suffix: 'k+', color: 'from-blue-500 to-indigo-600' },
                            { icon: Award, label: 'Accuracy Rate', value: '98.7', suffix: '%', color: 'from-purple-500 to-pink-600' }
                        ].map((metric, index) => (
                            <motion.div
                                key={metric.label}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="group"
                            >
                                <div className="relative bg-white/70 backdrop-blur-xl border border-slate-200/50 rounded-3xl p-6 hover:bg-white/90 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500 hover:-translate-y-2">
                                    <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl blur-xl"></div>
                                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${metric.color} flex items-center justify-center text-white mb-4 shadow-lg`}>
                                        <metric.icon size={24} />
                                    </div>
                                    <div className="text-3xl font-black text-slate-900 mb-1">
                                        <AnimatedCounter end={parseFloat(metric.value)} suffix={metric.suffix} />
                                    </div>
                                    <div className="text-sm font-semibold text-slate-600 uppercase tracking-wider">{metric.label}</div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="py-20 px-6 lg:px-12 bg-gradient-to-br from-slate-50 to-indigo-50/20">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">How It Works</h2>
                        <p className="text-xl text-slate-600 font-medium max-w-3xl mx-auto">
                            Our intelligent pipeline transforms complex legal documents into citizen-friendly insights
                        </p>
                    </motion.div>

                    <div className="relative">
                        {/* Connection line */}
                        <div className="hidden lg:block absolute top-16 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-200 via-purple-200 to-fuchsia-200"></div>

                        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-4">
                            {[
                                { icon: FileText, title: 'PDF Ingestion', desc: 'Upload legal documents in any format' },
                                { icon: Layers, title: 'Smart Parsing', desc: 'AI extracts and structures legal text' },
                                { icon: Cpu, title: 'Token Compression', desc: 'Advanced algorithms optimize content' },
                                { icon: Activity, title: 'Deep Analysis', desc: 'ML models identify key insights' },
                                { icon: CheckCircle2, title: 'Simple Output', desc: 'Clear summaries for citizens' }
                            ].map((step, index) => (
                                <motion.div
                                    key={step.title}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: index * 0.2 }}
                                    className="text-center group"
                                >
                                    <div className="relative">
                                        <div className="w-20 h-20 mx-auto mb-6 bg-white/80 backdrop-blur-xl border border-slate-200/50 rounded-3xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:shadow-indigo-500/20 transition-all duration-300 group-hover:scale-110">
                                            <step.icon size={32} className="text-indigo-600" />
                                        </div>
                                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg">
                                            {index + 1}
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-2">{step.title}</h3>
                                    <p className="text-slate-600 font-medium">{step.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Demo Section */}
            <section className="py-20 px-6 lg:px-12 bg-gradient-to-br from-indigo-50 via-purple-50/30 to-fuchsia-50/20">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">Try It Yourself</h2>
                        <p className="text-xl text-slate-600 font-medium max-w-3xl mx-auto">
                            See PolicyLens transform complex legal text into clear, actionable insights
                        </p>
                    </motion.div>

                    <div className="max-w-4xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
                        >
                            {/* Input */}
                            <div className="space-y-4">
                                <h3 className="text-xl font-bold text-slate-900">Complex Legal Text</h3>
                                <div className="bg-white/80 backdrop-blur-xl border border-slate-200/50 rounded-3xl p-6 shadow-xl">
                                    <textarea
                                        className="w-full h-48 bg-transparent border-none outline-none text-slate-700 font-medium resize-none"
                                        placeholder="Paste legal text here..."
                                        defaultValue="Section 43A of the Information Technology Act, 2000, as amended by the Information Technology (Amendment) Act, 2008, and further modified by the Information Technology (Amendment) Act, 2023, shall apply mutatis mutandis to this Act."
                                    />
                                </div>
                            </div>

                            {/* Output */}
                            <div className="space-y-4">
                                <h3 className="text-xl font-bold text-slate-900">PolicyLens Summary</h3>
                                <div className="bg-white/80 backdrop-blur-xl border border-slate-200/50 rounded-3xl p-6 shadow-xl">
                                    <div className="flex items-center gap-2 mb-4 text-emerald-600">
                                        <CheckCircle2 size={16} />
                                        <span className="text-sm font-semibold uppercase tracking-wider">Processed</span>
                                    </div>
                                    <p className="text-slate-700 font-medium leading-relaxed">
                                        "This section extends IT Act rules for data protection and privacy to apply similarly to this new legislation, ensuring consistent treatment of digital information across laws."
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Final CTA Section */}
            <section className="py-20 px-6 lg:px-12 bg-gradient-to-br from-indigo-600 via-purple-600 to-fuchsia-600">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
                            Ready to Transform<br />
                            Legislative Access?
                        </h2>
                        <p className="text-xl text-white/90 font-medium mb-8 max-w-2xl mx-auto">
                            Join thousands of citizens and institutions already using PolicyLens to make sense of complex laws
                        </p>
                        <Link to="/dashboard">
                            <Button variant="secondary" className="text-lg px-8 py-4 h-auto group bg-white text-slate-900 hover:bg-slate-50">
                                Start Analyzing Bills
                                <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </Link>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default Home;
