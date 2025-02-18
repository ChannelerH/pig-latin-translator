import React, { useState } from 'react';
import { ArrowDownUp, Sparkles } from 'lucide-react';
import { translateToPigLatin, translateFromPigLatin } from '../utils/translator';

export default function EmbeddableTranslator() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [mode, setMode] = useState<'toPigLatin' | 'fromPigLatin'>('toPigLatin');

  const handleTranslate = () => {
    if (mode === 'toPigLatin') {
      setOutputText(translateToPigLatin(inputText));
    } else {
      setOutputText(translateFromPigLatin(inputText));
    }
  };

  const toggleMode = () => {
    setMode(prev => prev === 'toPigLatin' ? 'fromPigLatin' : 'toPigLatin');
    setInputText(outputText);
    setOutputText('');
  };

  return (
    <div className="w-full h-full bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-4">
      <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md p-4 border border-purple-100">
        <div className="space-y-4">
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {mode === 'toPigLatin' ? 'English Text' : 'Pig Latin Text'}
            </label>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="w-full h-24 p-3 bg-white border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200 resize-none text-sm"
              placeholder={mode === 'toPigLatin' 
                ? 'Enter English text here...' 
                : 'Enter Pig Latin text here...'}
            />
          </div>

          <div className="flex justify-center gap-2">
            <button
              onClick={handleTranslate}
              className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 flex items-center gap-1 text-sm font-medium shadow-sm hover:shadow-md"
            >
              <Sparkles size={16} />
              Translate
            </button>
            <button
              onClick={toggleMode}
              className="px-3 py-2 border border-purple-200 rounded-lg hover:bg-purple-50 transition-all duration-200 flex items-center gap-1 text-sm text-gray-700"
            >
              <ArrowDownUp size={14} />
              Swap
            </button>
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {mode === 'toPigLatin' ? 'Pig Latin Translation' : 'English Translation'}
            </label>
            <textarea
              value={outputText}
              readOnly
              className="w-full h-24 p-3 bg-purple-50 border border-purple-200 rounded-lg resize-none text-sm"
              placeholder="Translation will appear here..."
            />
          </div>
        </div>
      </div>
    </div>
  );
}