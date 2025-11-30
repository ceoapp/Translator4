import React from 'react';
import { Clock, Trash2, ArrowRight } from 'lucide-react';
import { TranslationHistoryItem } from '../types';

interface HistoryPanelProps {
  history: TranslationHistoryItem[];
  onClear: () => void;
  onSelect: (item: TranslationHistoryItem) => void;
}

export const HistoryPanel: React.FC<HistoryPanelProps> = ({ history, onClear, onSelect }) => {
  if (history.length === 0) return null;

  return (
    <div className="mt-8 bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
        <div className="flex items-center text-slate-700 font-medium">
          <Clock className="w-4 h-4 mr-2 text-primary" />
          Recent Translations
        </div>
        <button 
          onClick={onClear}
          className="text-xs text-red-500 hover:text-red-700 flex items-center transition-colors"
        >
          <Trash2 className="w-3 h-3 mr-1" />
          Clear History
        </button>
      </div>
      <div className="max-h-60 overflow-y-auto">
        {history.map((item) => (
          <div 
            key={item.id}
            onClick={() => onSelect(item)}
            className="p-4 border-b border-slate-50 hover:bg-slate-50 cursor-pointer transition-colors group last:border-0"
          >
            <div className="flex items-start gap-3">
              <div className="flex-1 min-w-0">
                <p className="text-sm text-slate-900 truncate font-medium">{item.source}</p>
                <div className="flex items-center gap-2 mt-1">
                  <ArrowRight className="w-3 h-3 text-slate-400 flex-shrink-0" />
                  <p className="text-sm text-primary truncate">{item.target}</p>
                </div>
              </div>
              <span className="text-xs text-slate-400 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                Restore
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};