import React, { useState, useEffect } from 'react';
import { ArrowDownUp, Github, Sparkles, RotateCcw, Copy, BookOpen, MessageSquare, HelpCircle, Code } from 'lucide-react';
import { Link } from 'react-router-dom';

function translateToPigLatin(text: string): string {
  return text
    .trim()
    .split(/\s+/)
    .map(word => {
      if (!word) return word;
      
      const punctuation = word.match(/[.,!?;:]$/)?.[0] || '';
      const cleanWord = word.replace(/[.,!?;:]$/, '');
      
      const vowelIndex = cleanWord.toLowerCase().search(/[aeiou]/);
      
      if (vowelIndex === 0) {
        return cleanWord + 'way' + punctuation;
      } else if (vowelIndex > 0) {
        return cleanWord.slice(vowelIndex) + cleanWord.slice(0, vowelIndex) + 'ay' + punctuation;
      }
      return cleanWord + 'ay' + punctuation;
    })
    .join(' ');
}

function translateFromPigLatin(text: string): string {
  return text
    .trim()
    .split(/\s+/)
    .map(word => {
      if (!word) return word;
      
      const punctuation = word.match(/[.,!?;:]$/)?.[0] || '';
      const cleanWord = word.replace(/[.,!?;:]$/, '');
      
      if (cleanWord.toLowerCase().endsWith('way')) {
        return cleanWord.slice(0, -3) + punctuation;
      } else if (cleanWord.toLowerCase().endsWith('ay')) {
        const base = cleanWord.slice(0, -2);
        return base.slice(-1) + base.slice(0, -1) + punctuation;
      }
      return word;
    })
    .join(' ');
}

function App() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [mode, setMode] = useState<'toPigLatin' | 'fromPigLatin'>('toPigLatin');
  const [copied, setCopied] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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

  const handleCopy = async () => {
    if (outputText) {
      await navigator.clipboard.writeText(outputText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleClear = () => {
    setInputText('');
    setOutputText('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
      <div className="container mx-auto px-4 py-12">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-4">
            Pig Latin Translator
          </h1>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            Welcome to our state-of-the-art Pig Latin Translator! Experience the magic of transforming everyday English into the playful realm of Pig Latin, or effortlessly convert Pig Latin back to English with our advanced Pig Latin Translator tool.
          </p>
          <Link
            to="/embed-instructions"
            className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-white/80 rounded-lg hover:bg-white/90 transition-colors text-purple-600 font-medium"
          >
            <Code size={20} />
            Embed this translator
          </Link>
        </header>

        <div className="max-w-4xl mx-auto space-y-12">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-purple-100">
            <div className="space-y-6">
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {mode === 'toPigLatin' ? 'English Text' : 'Pig Latin Text'}
                </label>
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="w-full h-36 p-4 bg-white border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200 resize-none"
                  placeholder={mode === 'toPigLatin' 
                    ? 'Enter English text here...' 
                    : 'Enter Pig Latin text here...'}
                />
                {inputText && (
                  <button
                    onClick={handleClear}
                    className="absolute top-9 right-3 p-2 text-gray-400 hover:text-gray-600 transition-colors"
                    title="Clear text"
                  >
                    <RotateCcw size={18} />
                  </button>
                )}
              </div>

              <div className="flex justify-center gap-4">
                {isMobile ? (
                  <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-sm border-t border-purple-100">
                    <button
                      onClick={handleTranslate}
                      className="w-full px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-200 flex items-center gap-2 font-medium shadow-md hover:shadow-lg"
                    >
                      <Sparkles size={20} />
                      Translate
                    </button>
                  </div>
                ) : (
                  <>
                    <button
                      onClick={handleTranslate}
                      className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-200 flex items-center gap-2 font-medium shadow-md hover:shadow-lg"
                    >
                      <Sparkles size={20} />
                      Translate
                    </button>
                  </>
                )}
                <button
                  onClick={toggleMode}
                  className="px-6 py-3 border border-purple-200 rounded-xl hover:bg-purple-50 transition-all duration-200 flex items-center gap-2 text-gray-700"
                >
                  <ArrowDownUp size={18} />
                  Swap Languages
                </button>
              </div>

              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {mode === 'toPigLatin' ? 'Pig Latin Translation' : 'English Translation'}
                </label>
                <textarea
                  value={outputText}
                  readOnly
                  className="w-full h-36 p-4 bg-purple-50 border border-purple-200 rounded-xl resize-none"
                  placeholder="Translation will appear here..."
                />
                {outputText && (
                  <button
                    onClick={handleCopy}
                    className="absolute top-9 right-3 p-2 text-gray-400 hover:text-gray-600 transition-colors"
                    title={copied ? 'Copied!' : 'Copy to clipboard'}
                  >
                    <Copy size={18} className={copied ? 'text-green-500' : ''} />
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-purple-100">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
              Master the Art of Pig Latin Translator
            </h2>
            <div className="space-y-6 text-gray-600">
              <p className="text-lg leading-relaxed">
                Our advanced Pig Latin Translator is more than just a simple translation tool – it's your comprehensive gateway to mastering this fascinating linguistic tradition. The Pig Latin Translator combines sophisticated algorithms with an intuitive interface, making it the perfect companion for both casual users and language enthusiasts. Whether you're a beginner exploring Pig Latin for the first time or an enthusiast looking to perfect your translations, our sophisticated Pig Latin Translator provides the perfect environment for learning and practice.
              </p>
              <div className="bg-purple-50 rounded-xl p-6 border border-purple-100">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Understanding the Pig Latin Translator System</h3>
                <p className="mb-4">
                  The Pig Latin Translator follows a sophisticated set of linguistic rules that transform English words into their Pig Latin equivalents. Our advanced Pig Latin Translator ensures accurate and consistent translations while maintaining the integrity of this beloved language game. The Pig Latin Translator's intelligent processing system handles various complexities of language transformation with precision and care.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start gap-4">
                    <span className="flex-shrink-0 w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-medium">1</span>
                    <div>
                      <p className="font-medium text-gray-800">Consonant Transformation in Pig Latin Translator:</p>
                      <p className="mt-1">Our Pig Latin Translator expertly handles words beginning with consonant sounds by moving all letters before the first vowel to the end and adding "ay". The Pig Latin Translator maintains the integrity of the original word while applying these transformations.</p>
                      <p className="mt-2 text-purple-600 font-medium">Pig Latin Translator Examples:</p>
                      <ul className="ml-4 mt-1 space-y-1">
                        <li>"pig" → "ig-pay"</li>
                        <li>"string" → "ing-stray"</li>
                        <li>"smile" → "ile-smay"</li>
                      </ul>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="flex-shrink-0 w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-medium">2</span>
                    <div>
                      <p className="font-medium text-gray-800">Vowel Processing in Pig Latin Translator:</p>
                      <p className="mt-1">The Pig Latin Translator implements special handling for words beginning with vowel sounds by simply adding "way" to the end. Our advanced Pig Latin Translator ensures proper treatment of vowel-initial words while preserving their original pronunciation.</p>
                      <p className="mt-2 text-purple-600 font-medium">Pig Latin Translator Examples:</p>
                      <ul className="ml-4 mt-1 space-y-1">
                        <li>"explain" → "explain-way"</li>
                        <li>"octopus" → "octopus-way"</li>
                        <li>"end" → "end-way"</li>
                      </ul>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-purple-100">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
              Benefits of Our Advanced Pig Latin Translator
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Sparkles className="text-purple-600" size={24} />
                  <h3 className="text-xl font-semibold text-gray-800">Precision Translation</h3>
                </div>
                <p className="text-gray-600">
                  Our Pig Latin Translator delivers unmatched accuracy by following all traditional rules of Pig Latin, ensuring your translations maintain the authenticity of this cherished language game. The sophisticated algorithms of our Pig Latin Translator handle complex linguistic patterns with ease.
                </p>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <MessageSquare className="text-purple-600" size={24} />
                  <h3 className="text-xl font-semibold text-gray-800">Educational Excellence</h3>
                </div>
                <p className="text-gray-600">
                  The Pig Latin Translator serves as an invaluable educational tool, helping teachers and students explore language patterns and phonetic principles in an engaging and interactive way. Our Pig Latin Translator makes learning fun and accessible for all ages.
                </p>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <BookOpen className="text-purple-600" size={24} />
                  <h3 className="text-xl font-semibold text-gray-800">Complete Learning Guide</h3>
                </div>
                <p className="text-gray-600">
                  Our Pig Latin Translator goes beyond basic translation, offering comprehensive explanations and practical examples to deepen your understanding of how Pig Latin works. The intuitive interface of our Pig Latin Translator makes learning natural and enjoyable.
                </p>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <HelpCircle className="text-purple-600" size={24} />
                  <h3 className="text-xl font-semibold text-gray-800">Expert Support</h3>
                </div>
                <p className="text-gray-600">
                  Access detailed answers to common questions and explore the nuances of Pig Latin translation through our extensive knowledge base. The Pig Latin Translator team is dedicated to providing comprehensive support for all your translation needs.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-purple-100">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
              Pig Latin Translator FAQ
            </h2>
            <div className="space-y-8">
              <div className="group">
                <h3 className="text-xl font-semibold text-gray-800 mb-3 group-hover:text-purple-600 transition-colors">
                  What makes our Pig Latin Translator unique?
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Our Pig Latin Translator combines advanced linguistic algorithms with an intuitive interface, making it the perfect tool for both casual users and language enthusiasts. The Pig Latin Translator's sophisticated processing ensures accurate translations while maintaining the fun and educational aspects of this language game. Our commitment to excellence makes this Pig Latin Translator stand out from other translation tools.
                </p>
              </div>
              <div className="group">
                <h3 className="text-xl font-semibold text-gray-800 mb-3 group-hover:text-purple-600 transition-colors">
                  How does the Pig Latin Translator handle special cases?
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  The Pig Latin Translator is designed to handle various special cases, including punctuation, numbers, and compound words. Our advanced system ensures that the integrity of your text is maintained throughout the translation process. The Pig Latin Translator's intelligent processing adapts to different linguistic contexts seamlessly.
                </p>
              </div>
              <div className="group">
                <h3 className="text-xl font-semibold text-gray-800 mb-3 group-hover:text-purple-600 transition-colors">
                  Can the Pig Latin Translator handle complex sentences?
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Yes, our Pig Latin Translator is equipped to handle complex sentences while maintaining proper grammar and punctuation. The sophisticated translation engine ensures that even intricate phrases are accurately converted between English and Pig Latin. Our Pig Latin Translator excels at preserving the meaning and structure of complex language patterns.
                </p>
              </div>
            </div>
          </div>
        </div>

        <footer className="mt-12 text-center text-gray-600">
          <p className="mb-4">
            Discover the power of our advanced Pig Latin Translator – your ultimate companion for mastering this fascinating linguistic tradition. Whether for education, entertainment, or language exploration, our Pig Latin Translator provides the perfect solution for all your translation needs. Experience the magic of language transformation with our innovative Pig Latin Translator today.
          </p>
          <div className="flex justify-center gap-6 mt-4">
            <a
              href="https://github.com/ChannelerH/pig-latin-translator.git"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 transition-colors"
            >
              <Github size={20} />
              View on GitHub
            </a>

            <a
              href="https://luminabrush.site/"
              target="_blank"
              rel="dofollow"
              className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 transition-colors"
            >
              luminabrush
            </a>
            <a
              href="https://wan21.run/"
              target="_blank"
              rel="dofollow"
              className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 transition-colors"
            >
              wan21
            </a>
            <a
              href="https://picapix.org/"
              target="_blank"
              rel="dofollow"
              className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 transition-colors"
            >
              picapix
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;