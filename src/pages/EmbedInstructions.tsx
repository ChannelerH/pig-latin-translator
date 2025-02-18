import React from 'react';
import { Code } from 'lucide-react';

export default function EmbedInstructions() {
  const embedUrl = 'https://piglatintranslator.pro/embed';
  const iframeCode = `<iframe 
  src="${embedUrl}"
  width="100%"
  height="400"
  frameborder="0"
  style="border-radius: 12px; overflow: hidden;"
></iframe>`;

  const copyCode = () => {
    navigator.clipboard.writeText(iframeCode);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-purple-100">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
            Embed Pig Latin Translator
          </h1>
          
          <div className="space-y-6">
            <p className="text-gray-600 text-lg">
              You can easily embed our Pig Latin Translator into your website using an iframe. Simply copy the code below and paste it into your HTML:
            </p>

            <div className="relative">
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-xl overflow-x-auto">
                <code>{iframeCode}</code>
              </pre>
              <button
                onClick={copyCode}
                className="absolute top-3 right-3 p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                title="Copy code"
              >
                <Code size={20} />
              </button>
            </div>

            <div className="bg-purple-50 rounded-xl p-6 border border-purple-100">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Preview</h2>
              <div className="border border-purple-200 rounded-xl overflow-hidden">
                <iframe
                  src={embedUrl}
                  width="100%"
                  height="400"
                  frameBorder="0"
                ></iframe>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800">Customization Options</h2>
              <ul className="space-y-2 text-gray-600">
                <li>• <code className="text-sm bg-gray-100 px-2 py-1 rounded">width</code> - Adjust the width of the translator (default: 100%)</li>
                <li>• <code className="text-sm bg-gray-100 px-2 py-1 rounded">height</code> - Set the height of the translator (default: 400px)</li>
                <li>• <code className="text-sm bg-gray-100 px-2 py-1 rounded">style</code> - Add custom CSS styles to the iframe</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}