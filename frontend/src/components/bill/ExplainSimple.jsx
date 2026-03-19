import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Lightbulb } from 'lucide-react';
import Card from '../common/Card';

const defaultComparisons = [
  {
    legal: "Data Fiduciary shall process personal data for lawful purposes only and shall obtain consent of the Data Principal before processing.",
    simple: "Companies can only use your data legally and must ask your permission first.",
  },
  {
    legal: "The Data Principal shall have the right to nominate any other individual who shall exercise the rights of the Data Principal in the event of death or incapacity.",
    simple: "You can choose someone to manage your data rights if you pass away or become unable to do so.",
  },
  {
    legal: "Notwithstanding anything contained in sub-section (1), the Central Government may, by notification, exempt any instrumentality of the State from the provisions of this Act.",
    simple: "The government can exempt its own agencies from following this law for security reasons.",
  },
];

const ExplainSimple = ({ comparisons = defaultComparisons }) => {
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
          <Lightbulb size={18} className="text-amber-500" />
          <span className="text-xs font-black text-amber-600 uppercase tracking-widest">ELI18</span>
        </div>
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">Explain Like I'm 18</h2>
        <p className="text-slate-500 font-medium mt-1">Legal jargon translated into plain language you can actually understand</p>
      </motion.div>

      <div className="space-y-5">
        {comparisons.map((c, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
          >
            <Card className="overflow-hidden border-slate-100 p-0">
              <div className="grid md:grid-cols-2">
                <div className="border-b md:border-b-0 md:border-r border-slate-100 p-5 bg-slate-50/50">
                  <span className="inline-block rounded-md bg-red-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-red-600 mb-3">
                    Legal Text
                  </span>
                  <p className="text-sm italic leading-relaxed text-slate-600">
                    "{c.legal}"
                  </p>
                </div>
                <div className="relative p-5 bg-emerald-50/30">
                  <ArrowRight className="absolute -left-3 top-1/2 hidden h-6 w-6 -translate-y-1/2 rounded-full bg-indigo-500 p-1 text-white md:block shadow-lg" />
                  <span className="inline-block rounded-md bg-emerald-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-700 mb-3">
                    Plain English
                  </span>
                  <p className="text-sm font-medium leading-relaxed text-slate-800">
                    {c.simple}
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ExplainSimple;
