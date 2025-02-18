import React, { useEffect } from 'react';
import EmbeddableTranslator from '../components/EmbeddableTranslator';

function EmbedPage() {
  useEffect(() => {
    // Remove any margin/padding from body when embedded
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.overflow = 'hidden';
  }, []);

  return (
    <div style={{ width: '100%', height: '100vh', overflow: 'hidden' }}>
      <EmbeddableTranslator />
    </div>
  );
}

export default EmbedPage;