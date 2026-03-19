import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Zap } from 'lucide-react';
import Card from '../common/Card';

const TokenSavings = ({ metrics, stages, maxTokens }) => {
  const derivedStages = metrics
    ? [
        { label: 'Original Bill', tokens: metrics.original_tokens ?? 0, color: 'bg-slate-400' },
        { label: 'After Cleaning', tokens: metrics.after_cleaning ?? 0, color: 'bg-slate-500' },
        { label: 'Structural Compression', tokens: metrics.after_local_compression ?? 0, color: 'bg-slate-600' },
        { label: 'ScaleDown Filter', tokens: metrics.after_scaledown ?? 0, color: 'bg-slate-700' },
        { label: 'Final Summary', tokens: metrics.final_summary_tokens ?? 0, color: 'bg-slate-900' },
      ]
    : null;

  const resolvedStages = stages && stages.length ? stages : derivedStages;
  const resolvedMaxTokens =
    typeof maxTokens === 'number'
      ? maxTokens
      : metrics?.original_tokens ?? resolvedStages?.[0]?.tokens ?? 0;

  if (!resolvedStages || !resolvedStages.length || !resolvedMaxTokens) return null;

  const finalTokens = resolvedStages[resolvedStages.length - 1].tokens;
  const finalCompression = ((resolvedMaxTokens - finalTokens) / resolvedMaxTokens * 100).toFixed(2);

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
          <BarChart3 size={18} className="text-indigo-500" />
          <span className="text-xs font-black text-indigo-600 uppercase tracking-widest">Compression Pipeline</span>
        </div>
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">Token Reduction Visualization</h2>
        <p className="text-slate-500 font-medium mt-1">
          Watch {resolvedMaxTokens.toLocaleString()} tokens shrink to {finalTokens.toLocaleString()} — a {finalCompression}% reduction
        </p>
      </motion.div>

      <div className="space-y-4 mb-8">
        {resolvedStages.map((s, i) => {
          const width = Math.max((s.tokens / resolvedMaxTokens) * 100, 2);
          return (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="font-bold text-slate-700">{s.label}</span>
                <span className="font-black text-slate-900 tabular-nums">
                  {s.tokens.toLocaleString()}
                </span>
              </div>
              <div className="h-4 overflow-hidden rounded-full bg-slate-100">
                <motion.div
                  className={`h-full rounded-full ${s.color}`}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${width}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 + i * 0.12 }}
                />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Final stat card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <Card className="bg-slate-900 p-8 text-center border-none overflow-hidden relative">
          
          <div className="relative z-10">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Zap size={20} className="text-slate-300" />
              <span className="text-xs font-black text-slate-300 uppercase tracking-widest">Total Compression</span>
            </div>
            <div className="text-5xl font-black text-white tracking-tight mb-2">
              {finalCompression}%
            </div>
            <div className="text-sm text-slate-400 font-medium">
              Token Reduction Rate
            </div>
            <div className="flex items-center justify-center gap-4 mt-6 pt-6 border-t border-slate-700 text-xs text-slate-500">
              <span>{resolvedMaxTokens.toLocaleString()} input</span>
              <span className="text-slate-300">→</span>
              <span>{finalTokens.toLocaleString()} output</span>
            </div>
          </div>
        </Card>
      </motion.div>
    </section>
  );
};

export default TokenSavings;
