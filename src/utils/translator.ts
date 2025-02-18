export function translateToPigLatin(text: string): string {
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

export function translateFromPigLatin(text: string): string {
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