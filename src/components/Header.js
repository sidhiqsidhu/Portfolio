// Header/Navigation component with accessibility features
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon, Download } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import { scrollToSection, downloadResume } from '../utils/helpers';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  const navigation = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href) => {
    const elementId = href.replace('#', '');
    scrollToSection(elementId);
    setIsOpen(false);
  };

  const handleKeyDown = (e, action) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      action();
    }
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'backdrop-blur-xl bg-black/30 border-b border-white/10' : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-6 py-4" role="navigation" aria-label="Main navigation">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="relative"
            role="banner"
          >
            <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center shadow-lg shadow-purple-500/25 group cursor-pointer transform hover:scale-105 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-2xl scale-0 group-hover:scale-100 transition-transform duration-300"></div>
              <span className="relative z-10 text-xl font-bold text-white font-cyber tracking-wider">MS</span>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {navigation.map((item, index) => (
              <motion.button
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                whileHover={{ 
                  scale: 1.05,
                  background: "linear-gradient(135deg, rgba(147, 51, 234, 0.3) 0%, rgba(219, 39, 119, 0.3) 100%)"
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleNavClick(item.href)}
                onKeyDown={(e) => handleKeyDown(e, () => handleNavClick(item.href))}
                className="relative px-6 py-3 text-white/80 hover:text-white transition-all duration-300 font-medium text-sm tracking-wider rounded-full border border-purple-500/30 hover:border-purple-400/50 backdrop-blur-sm group"
                style={{
                  background: 'linear-gradient(135deg, rgba(99, 65, 165, 0.1) 0%, rgba(147, 51, 234, 0.1) 100%)'
                }}
                aria-label={`Navigate to ${item.name} section`}
              >
                {/* Gradient glow effect on hover */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-all duration-500 blur-sm"></div>
                
                {/* Text */}
                <span className="relative z-10">{item.name}</span>
                
                {/* Inner glow border animation */}
                <div className="absolute inset-0 rounded-full border border-gradient-to-r from-purple-400/0 via-purple-400/50 to-purple-400/0 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
              </motion.button>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              onClick={toggleTheme}
              onKeyDown={(e) => handleKeyDown(e, toggleTheme)}
              className="relative p-3 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm border border-white/10 hover:border-purple-400/50 transition-all duration-300 group overflow-hidden"
              aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400/0 to-pink-400/0 group-hover:from-purple-400/10 group-hover:to-pink-400/10 transition-all duration-300 rounded-full"></div>
              {isDark ? <Sun size={18} className="relative z-10" /> : <Moon size={18} className="relative z-10" />}
            </motion.button>

            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
              onClick={downloadResume}
              onKeyDown={(e) => handleKeyDown(e, downloadResume)}
              className="relative flex items-center space-x-2 px-6 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full hover:from-purple-500 hover:to-pink-500 transition-all duration-300 group overflow-hidden shadow-lg hover:shadow-purple-500/25"
              aria-label="Download resume"
            >
              <div className="absolute inset-0 bg-white/10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300"></div>
              <Download size={16} className="relative z-10" />
              <span className="relative z-10 font-medium">Resume</span>
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="md:hidden relative p-3 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm border border-white/10 hover:border-purple-400/50 transition-all duration-300 group overflow-hidden"
            onClick={() => setIsOpen(!isOpen)}
            onKeyDown={(e) => handleKeyDown(e, () => setIsOpen(!isOpen))}
            aria-label="Toggle mobile menu"
            aria-expanded={isOpen}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400/0 to-pink-400/0 group-hover:from-purple-400/10 group-hover:to-pink-400/10 transition-all duration-300 rounded-full"></div>
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="relative z-10"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </motion.div>
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -20 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -20 }}
              className="md:hidden mt-6 relative"
            >
              <div className="backdrop-blur-xl bg-gradient-to-br from-purple-900/30 to-pink-900/20 rounded-3xl border border-purple-400/20 shadow-2xl shadow-purple-500/10 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-3xl"></div>
                <div className="relative p-6 space-y-1">
                {navigation.map((item, index) => (
                  <motion.button
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => handleNavClick(item.href)}
                    onKeyDown={(e) => handleKeyDown(e, () => handleNavClick(item.href))}
                    className="block w-full text-left py-3 px-4 text-white/70 hover:text-white transition-all duration-300 focus-visible font-medium text-base tracking-wide relative group"
                    aria-label={`Navigate to ${item.name} section`}
                  >
                    {item.name}
                    <span className="absolute bottom-1 left-4 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 transition-all duration-300 group-hover:w-8"></span>
                  </motion.button>
                ))}
                
                <div className="flex items-center justify-between pt-6 mt-4 border-t border-purple-400/20">
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                    onClick={toggleTheme}
                    onKeyDown={(e) => handleKeyDown(e, toggleTheme)}
                    className="relative p-3 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm border border-white/10 hover:border-purple-400/50 transition-all duration-300 group"
                    aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-400/0 to-pink-400/0 group-hover:from-purple-400/10 group-hover:to-pink-400/10 transition-all duration-300 rounded-full"></div>
                    {isDark ? <Sun size={18} className="relative z-10" /> : <Moon size={18} className="relative z-10" />}
                  </motion.button>

                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                    onClick={downloadResume}
                    onKeyDown={(e) => handleKeyDown(e, downloadResume)}
                    className="relative flex items-center space-x-2 px-5 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full hover:from-purple-500 hover:to-pink-500 transition-all duration-300 group shadow-lg"
                    aria-label="Download resume"
                  >
                    <div className="absolute inset-0 bg-white/10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300"></div>
                    <Download size={16} className="relative z-10" />
                    <span className="relative z-10 font-medium">Resume</span>
                  </motion.button>
                </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
};

export default Header;