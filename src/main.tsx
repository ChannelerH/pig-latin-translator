import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import EmbedPage from './pages/Embed';
import EmbedInstructions from './pages/EmbedInstructions';
import './index.css';

// 声明全局 gtag 函数类型
declare global {
  interface Window {
    gtag: (command: string, ...args: any[]) => void;
  }
}

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

// 添加路由变化监听
router.subscribe((location) => {
  if (window.gtag) {
    window.gtag('event', 'page_view', {
      page_path: location.pathname,
      page_title: document.title
    });
  }
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);