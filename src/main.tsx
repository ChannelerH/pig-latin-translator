import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import EmbedPage from './pages/Embed';
import EmbedInstructions from './pages/EmbedInstructions';
import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/embed',
    element: <EmbedPage />,
  },
  {
    path: '/embed-instructions',
    element: <EmbedInstructions />,
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);