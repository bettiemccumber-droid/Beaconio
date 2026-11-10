import { Route, Routes, useLocation } from 'react-router-dom';
import BackToTop from './components/BackToTop';
import Footer from './components/Footer';
import Header from './components/Header';
import ScrollToTop from './components/ScrollToTop';
import About from './pages/About';
import Article from './pages/Article';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import ProductDetail from './pages/ProductDetail';
import Products from './pages/Products';

/**
 * Beaconio shell: masthead, routed pages, footer, and the return-to-top control.
 */
export default function App() {
  const location = useLocation();

  return (
    <>
      <a className="skip" href="#content">
        Skip to content
      </a>
      <ScrollToTop />
      <Header />
      <main id="content" key={location.pathname} className="page-fade">
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<Article />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:slug" element={<ProductDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
