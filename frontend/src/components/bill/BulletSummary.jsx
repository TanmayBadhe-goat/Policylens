import React from 'react';
import { Zap } from 'lucide-react';
import Card from '../common/Card';

const BulletSummary = ({ bullets = [], title = "5-Bullet Citizen Summary", subtitle = "What you need to know" }) => {
  return (
    <section className="py-2">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <Zap size={18} className="text-blue-600" />
          <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">Quick Summary</span>
        </div>
        <h2 className="text-2xl font-bold text-slate-800">{title}</h2>
        <p className="text-slate-600 mt-1">{subtitle}</p>
      </div>

      <div className="space-y-4">
        {bullets.map((b, i) => (
          <Card key={b.title || i} className="flex gap-4 p-5 hover:border-blue-300 transition-colors">
            <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-slate-100`}>
              {b.icon && <b.icon className="h-6 w-6 text-slate-600" />}
            </div>
            <div className="flex-1">
              <h3 className="text-base font-bold text-slate-800">{b.title}</h3>
              <p className="mt-1 text-sm text-slate-600 leading-relaxed">{b.text}</p>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default BulletSummary;
