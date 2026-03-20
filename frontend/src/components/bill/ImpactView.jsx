import React from 'react';
import { Users } from 'lucide-react';
import Card from '../common/Card';

const ImpactView = ({ groups = [] }) => {
  return (
    <section className="py-2">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <Users size={18} className="text-blue-600" />
          <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">Impact Analysis</span>
        </div>
        <h2 className="text-2xl font-bold text-slate-800">Who Is Affected</h2>
        <p className="text-slate-600 mt-1">How this legislation affects different groups</p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {groups.map((g, i) => (
          <Card key={g.label || i} className="h-full hover:border-blue-400 transition-colors">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded bg-slate-100">
                {g.icon && <g.icon className="h-5 w-5 text-slate-600" />}
              </div>
              <h3 className="text-base font-bold text-slate-800">{g.label}</h3>
            </div>
            <ul className="space-y-3">
              {(g.impacts || []).map((impact, j) => (
                <li key={j} className="flex gap-3 text-sm text-slate-600">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
                  <span>{impact}</span>
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default ImpactView;
