import React from 'react';
import { ArrowRight, Lightbulb } from 'lucide-react';
import Card from '../common/Card';

const ExplainSimple = ({ comparisons = [] }) => {
  return (
    <section className="py-2">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <Lightbulb size={18} className="text-amber-500" />
          <span className="text-xs font-bold text-amber-600 uppercase tracking-widest">ELI18</span>
        </div>
        <h2 className="text-2xl font-bold text-slate-800">Explain Like I'm 18</h2>
        <p className="text-slate-600 mt-1">Legal jargon translated into plain language you can actually understand</p>
      </div>

      <div className="space-y-5">
        {comparisons.map((c, i) => (
          <Card key={i} className="overflow-hidden p-0 border-2 border-slate-200">
            <div className="grid md:grid-cols-2">
              <div className="p-6 bg-slate-50 border-b md:border-b-0 md:border-r border-slate-200">
                <span className="inline-block rounded px-2 py-1 text-xs font-bold uppercase tracking-wider text-slate-600 bg-slate-200 mb-3">
                  Legal Text
                </span>
                <p className="text-sm italic text-slate-700">
                  "{c.legal}"
                </p>
              </div>
              <div className="relative p-6 bg-emerald-50">
                <ArrowRight className="absolute -left-3 top-1/2 hidden h-6 w-6 -translate-y-1/2 rounded-full bg-blue-600 p-1 text-white md:block" />
                <span className="inline-block rounded px-2 py-1 text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-200 mb-3">
                  Plain English
                </span>
                <p className="text-sm font-bold text-slate-900">
                  {c.simple}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default ExplainSimple;
