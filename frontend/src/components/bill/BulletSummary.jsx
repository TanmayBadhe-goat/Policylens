import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, AlertTriangle, Users, Scale, Building, Zap, Leaf } from 'lucide-react';
import Card from '../common/Card';

const defaultBullets = [
  {
    icon: ShieldCheck,
    title: "Your Rights",
    text: "You have the right to access, correct, and erase your personal data held by any company or Data Fiduciary.",
    color: "text-emerald-500",
    bg: "bg-emerald-50",
  },
  {
    icon: AlertTriangle,
    title: "Your Obligations",
    text: "You must provide accurate information when consenting to data processing. Filing false grievances can incur penalties.",
    color: "text-amber-500",
    bg: "bg-amber-50",
  },
  {
    icon: Scale,
    title: "Penalties",
    text: "Companies face fines up to ₹250 crore for data breaches. Non-compliance with consent norms carries significant penalties.",
    color: "text-red-500",
    bg: "bg-red-50",
  },
  {
    icon: Users,
    title: "Who Is Affected",
    text: "Every citizen whose personal data is processed digitally — including all app users, online shoppers, and social media users.",
    color: "text-blue-500",
    bg: "bg-blue-50",
  },
  {
    icon: Building,
    title: "Government Powers",
    text: "Government can exempt any agency from the Act citing national security. Data Processing Board adjudicates complaints.",
    color: "text-indigo-500",
    bg: "bg-indigo-50",
  },
];

const BulletSummary = ({ bullets = defaultBullets, title = "5-Bullet Citizen Summary", subtitle = "What you need to know" }) => {
  return (
    <section className="py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <div className="flex items-center gap-2 mb-2">
          <Zap size={18} className="text-indigo-500" />
          <span className="text-xs font-black text-indigo-600 uppercase tracking-widest">Quick Summary</span>
        </div>
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">{title}</h2>
        <p className="text-slate-500 font-medium mt-1">{subtitle}</p>
      </motion.div>

      <div className="space-y-4">
        {bullets.map((b, i) => (
          <motion.div
            key={b.title}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
          >
            <Card className="flex gap-4 p-5 hover:shadow-lg transition-all duration-300 border-slate-100">
              <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${b.bg}`}>
                <b.icon className={`h-5 w-5 ${b.color}`} />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-black text-slate-900 tracking-tight">{b.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-slate-500">{b.text}</p>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default BulletSummary;
