import React from 'react';
import { Leaf } from 'lucide-react';
import Card from '../common/Card';

const TokenSavings = ({ metrics }) => {
  if (!metrics) return null;

  return (
    <section className="py-2">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <Leaf size={18} className="text-emerald-600" />
          <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">Environmental Impact</span>
        </div>
        <h2 className="text-2xl font-bold text-slate-800">Token Savings</h2>
        <p className="text-slate-600 mt-1">How summary compression reduces digital carbon footprint</p>
      </div>

      <Card className="p-6">
        <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
                <p className="text-3xl font-bold text-slate-800 mb-2">{metrics.compression_rate || '0%'}</p>
                <p className="text-xs font-bold text-slate-500 uppercase">Tokens Saved</p>
            </div>
            <div className="md:border-l md:border-r border-slate-200">
                <p className="text-3xl font-bold text-emerald-600 mb-2">82.5g</p>
                <p className="text-xs font-bold text-slate-500 uppercase">CO2 Optimised</p>
            </div>
            <div>
                <p className="text-3xl font-bold text-blue-600 mb-2">0.14kWh</p>
                <p className="text-xs font-bold text-slate-500 uppercase">Energy Delta</p>
            </div>
        </div>
      </Card>
    </section>
  );
};

export default TokenSavings;
