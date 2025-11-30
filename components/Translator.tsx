import React, { useState, useCallback, useEffect } from 'react';
import { ArrowRightLeft, Copy, Check, Sparkles, Languages } from 'lucide-react';
import { Button } from './Button';
import { HistoryPanel } from './HistoryPanel';
import { translateText } from '../services/geminiService';
import { TranslationHistoryItem } from '../types';

export const Translator: React.FC = () => {
  const [sourceText, setSourceText] = useState('');
  const [targetText, setTargetText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [history, setHistory] = useState<TranslationHistoryItem[]>([]);

  // Load history from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem('translator4_history');
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse history", e);
      }
    }
  }, []);

  // Save history when it changes
  useEffect(() => {
    localStorage.setItem('translator4_history', JSON.stringify(history));
  }, [history]);

  const handleTranslate = async () => {
    if (!sourceText.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const result = await translateText(sourceText);
      setTargetText(result);

      // Add to history
      const newItem: TranslationHistoryItem = {
        id: Date.now().toString(),
        source: sourceText.trim(),
        target: result,
        timestamp: Date.now()
      };
      
      setHistory(prev => [newItem, ...prev].slice(0, 10)); // Keep last 10
    } catch (err: any) {
      setError(err.message || "Failed to translate. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = useCallback(() => {
    if (!targetText) return;
    navigator.clipboard.writeText(targetText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [targetText]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      handleTranslate();
    }
  };

  const restoreHistoryItem = (item: TranslationHistoryItem) => {
    setSourceText(item.source);
    setTargetText(item.target);
  };

  return (
    <div className="max-w-4xl mx-auto w-full">
      <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
        
        {/* Header Area inside Card */}
        <div className="bg-slate-50 p-4 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
                <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">English</span>
                <ArrowRightLeft className="w-4 h-4 text-slate-400" />
                <span className="bg-indigo-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Thai</span>
            </div>
            <div className="text-xs text-slate-500 hidden sm:block">
                Press <kbd className="font-mono bg-white border border-slate-300 rounded px-1">Ctrl + Enter</kbd> to translate
            </div>
        </div>

        <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-200 min-h-[300px]">
          
          {/* Input Section */}
          <div className="flex flex-col p-6 bg-white relative group">
            <label className="text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wide">Source Text</label>
            <textarea
              className="flex-1 w-full resize-none border-0 p-0 text-slate-800 placeholder:text-slate-300 focus:ring-0 text-lg leading-relaxed bg-transparent outline-none"
              placeholder="Enter English text here..."
              value={sourceText}
              onChange={(e) => setSourceText(e.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus
            />
            {sourceText && (
               <button 
                onClick={() => { setSourceText(''); setTargetText(''); }}
                className="absolute top-4 right-4 text-slate-300 hover:text-slate-500 p-1 rounded-full transition-colors"
               >
                 <span className="sr-only">Clear</span>
                 <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                 </svg>
               </button>
            )}
          </div>

          {/* Output Section */}
          <div className="flex flex-col p-6 bg-slate-50/50 relative">
             <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-semibold text-indigo-500 uppercase tracking-wide flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    Translation
                </label>
                {targetText && (
                    <button
                        onClick={copyToClipboard}
                        className="text-slate-400 hover:text-indigo-600 transition-colors flex items-center gap-1 text-xs font-medium"
                    >
                        {copied ? (
                            <>
                                <Check className="w-3 h-3" /> Copied
                            </>
                        ) : (
                            <>
                                <Copy className="w-3 h-3" /> Copy
                            </>
                        )}
                    </button>
                )}
             </div>
            
            {isLoading ? (
              <div className="flex-1 flex flex-col items-center justify-center space-y-4 animate-pulse opacity-70">
                <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                <div className="h-4 bg-slate-200 rounded w-1/2"></div>
                <div className="h-4 bg-slate-200 rounded w-5/6"></div>
              </div>
            ) : targetText ? (
              <div className="flex-1 text-lg leading-relaxed text-indigo-900 font-thai">
                {targetText}
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center text-slate-300 text-sm italic select-none">
                Translation will appear here
              </div>
            )}
          </div>
        </div>

        {/* Action Bar */}
        <div className="p-4 bg-white border-t border-slate-100 flex justify-end">
            <Button 
                onClick={handleTranslate} 
                isLoading={isLoading} 
                disabled={!sourceText.trim()}
                className="w-full sm:w-auto shadow-indigo-200 shadow-lg hover:shadow-xl transition-shadow"
                icon={<Languages className="w-4 h-4" />}
            >
                Translate Now
            </Button>
        </div>
      </div>

      {error && (
        <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-xl border border-red-100 flex items-center animate-fade-in-up">
            <svg className="w-5 h-5 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            {error}
        </div>
      )}

      <HistoryPanel 
        history={history} 
        onClear={() => setHistory([])} 
        onSelect={restoreHistoryItem}
      />
    </div>
  );
};