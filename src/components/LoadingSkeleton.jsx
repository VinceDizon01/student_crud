import React from 'react';

export default function LoadingSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4 animate-pulse">
      <div className="h-4 bg-slate-200 rounded w-1/4"></div>
      <div className="space-y-3">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex items-center space-x-4 py-2 border-b border-slate-100 last:border-0">
            <div className="w-8 h-8 bg-slate-200 rounded-full"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-slate-200 rounded w-1/3"></div>
              <div className="h-3 bg-slate-100 rounded w-1/4"></div>
            </div>
            <div className="h-6 bg-slate-200 rounded w-16"></div>
            <div className="h-6 bg-slate-200 rounded w-12"></div>
            <div className="h-8 bg-slate-200 rounded w-20"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
