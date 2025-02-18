# Pig Latin Translator

A modern, embeddable Pig Latin translation tool built with React and TypeScript. This application provides a sleek interface for translating between English and Pig Latin, with support for embedding the translator in other websites.

![Pig Latin Translator](public/og-image.svg)

## Features

- 🔄 Bi-directional translation between English and Pig Latin
- 💅 Modern, responsive UI with beautiful gradients
- 🎯 Embeddable widget for third-party websites
- ⚡ Built with Vite for lightning-fast development
- 🎨 Styled with Tailwind CSS
- 📱 Mobile-friendly design

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd pig-latin-translator
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Building for Production

To create a production build:

```bash
npm run build
```

The built files will be available in the `dist` directory.

## Embedding the Translator

You can embed the Pig Latin Translator in your website using an iframe. Visit the `/embed-instructions` page in the application for detailed instructions and code snippets.

Basic embedding example:

```html
<iframe 
  src="https://your-deployed-url/embed"
  width="100%"
  height="400"
  frameborder="0"
  style="border-radius: 12px; overflow: hidden;"
></iframe>
```

## Project Structure

```
src/
├── components/           # Reusable React components
│   └── EmbeddableTranslator.tsx
├── pages/               # Page components
│   ├── Embed.tsx
│   └── EmbedInstructions.tsx
├── utils/               # Utility functions
│   └── translator.ts    # Translation logic
├── App.tsx             # Main application component
└── main.tsx            # Application entry point
```

## Technology Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- React Router DOM
- Lucide React (for icons)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Built with [Vite](https://vitejs.dev/)
- Icons by [Lucide](https://lucide.dev/)
- Styling with [Tailwind CSS](https://tailwindcss.com/)