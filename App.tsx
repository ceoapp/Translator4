import React from 'react';
import { Translator } from './components/Translator';
import { Zap } from 'lucide-react';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50/30 flex flex-col font-sans">
      
      {/* Navbar */}
      <header className="w-full bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-1.5 rounded-lg">
                <Zap className="w-5 h-5 text-white fill-current" />
            </div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">
              Translator4
            </h1>
          </div>
          <a 
            href="https://ai.google.dev/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-xs font-medium text-slate-500 hover:text-indigo-600 transition-colors flex items-center gap-1"
          >
            Powered by Gemini
          </a>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-5xl mx-auto px-4 py-8 sm:py-12 flex flex-col items-center">
        
        <div className="text-center mb-10 max-w-2xl">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4 tracking-tight">
                Seamless English to Thai Translation
            </h2>
            <p className="text-lg text-slate-600">
                Experience instant, context-aware translations powered by Google's advanced Gemini 2.5 AI model.
            </p>
        </div>

        <Translator />

      </main>

      {/* Footer */}
      <footer className="w-full border-t border-slate-200 py-6 mt-auto bg-white/50">
        <div className="max-w-5xl mx-auto px-4 text-center text-slate-400 text-sm">
          &copy; {new Date().getFullYear()} Translator4. Built with React, Tailwind & Gemini API.
        </div>
      </footer>
    </div>
  );
};

export default App;