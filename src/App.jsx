import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const HomePage = lazy(() => import('./pages/HomePage'));
const CatalogPage = lazy(() => import('./pages/CatalogPage'));
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));

const PageLoader = () => (
  <div className="min-h-[100dvh] bg-surface flex items-center justify-center">
    <div className="w-6 h-6 border border-zinc-600 border-t-transparent rounded-full animate-spin" />
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/catalogo" element={<CatalogPage />} />
          <Route path="/producto/:slug" element={<ProductDetailPage />} />
          <Route path="/contacto" element={<ContactPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;