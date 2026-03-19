import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Briefcase, Rocket, Building2, Smartphone, Users } from 'lucide-react';
import Card from '../common/Card';

const defaultGroups = [
  {
    icon: GraduationCap,
    label: "Students",
    impacts: [
      "EdTech platforms must get parental consent for minors under 18",
      "Right to erase your data from educational apps",
      "Schools cannot share student data without explicit consent",
    ],
  },
  {
    icon: Briefcase,
    label: "Small Businesses",
    impacts: [
      "Must appoint a Data Protection Officer if processing significant data",
      "Penalties can go up to ₹250 crore for data breaches",
      "Simplified compliance framework for startups",
    ],
  },
  {
    icon: Rocket,
    label: "Startups",
    impacts: [
      "Consent-based data collection increases compliance burden",
      "Cross-border data transfer now regulated",
      "Exemptions available for early-stage research and innovation",
    ],
  },
  {
    icon: Building2,
    label: "Employees",
    impacts: [
      "Employers must disclose what employee data they collect",
      "Workplace surveillance tools need explicit consent",
      "Right to correct personal data held by employer",
    ],
  },
  {
    icon: Smartphone,
    label: "Social Media Users",
    impacts: [
      "Platforms must provide option to delete account and all data",
      "Targeted advertising requires your consent",
      "You can request a copy of all data a platform holds about you",
    ],
  },
];

const ImpactView = ({ groups = defaultGroups }) => {
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
          <Users size={18} className="text-indigo-500" />
          <span className="text-xs font-black text-indigo-600 uppercase tracking-widest">Impact Analysis</span>
        </div>
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">Who Is Affected</h2>
        <p className="text-slate-500 font-medium mt-1">How this legislation affects different groups</p>
      </motion.div>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {groups.map((g, i) => (
          <motion.div
            key={g.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
          >
            <Card className="h-full hover:shadow-lg transition-all duration-300 border-slate-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50">
                  <g.icon className="h-5 w-5 text-indigo-600" />
                </div>
                <h3 className="text-base font-black text-slate-900 tracking-tight">{g.label}</h3>
              </div>
              <ul className="space-y-3">
                {g.impacts.map((impact, j) => (
                  <li key={j} className="flex gap-3 text-sm text-slate-600">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-400" />
                    <span className="leading-relaxed">{impact}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ImpactView;
