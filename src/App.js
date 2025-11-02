// Main App component with all portfolio sections
import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeProvider } from './hooks/useTheme';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Blog from './components/Blog';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { updateMetaTags } from './utils/helpers';
import { portfolioData } from './data/portfolioData';
import './App.css';

function App() {
  const { personal } = portfolioData;

  useEffect(() => {
    // Update SEO meta tags
    updateMetaTags(
      `${personal.name} - ${personal.title}`,
      personal.bio,
      personal.avatar
    );

    // Add structured data for SEO
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": personal.name,
      "jobTitle": personal.title,
      "email": personal.email,
      "telephone": personal.phone,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": personal.location
      },
      "url": window.location.origin,
      "sameAs": [
        portfolioData.social.github,
        portfolioData.social.linkedin,
        portfolioData.social.twitter
      ]
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      // Cleanup
      const existingScript = document.querySelector('script[type="application/ld+json"]');
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, [personal]);

  return (
    <ThemeProvider>
      <div className="App bg-cyber-dark min-h-screen">
        {/* Skip to main content for accessibility */}
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 px-4 py-2 bg-cyber-blue text-white rounded"
        >
          Skip to main content
        </a>

        <Header />
        
        <main id="main-content" role="main">
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Hero />
              <About />
              <Experience />
              <Skills />
              <Projects />
              <Blog />
              <Contact />
            </motion.div>
          </AnimatePresence>
        </main>

        <Footer />

        {/* Loading Screen (optional) */}
        <motion.div
          className="fixed inset-0 z-50 bg-cyber-dark flex items-center justify-center"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          style={{ pointerEvents: 'none' }}
        >
          <motion.div
            className="text-4xl font-cyber font-bold text-gradient"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            {personal.name.split(' ').map((word, index) => word.charAt(0)).join('')}
          </motion.div>
        </motion.div>
      </div>
    </ThemeProvider>
  );
}

export default App;
