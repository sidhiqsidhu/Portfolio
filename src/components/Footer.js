// Footer component with elegant design and animations
import React from 'react';
import { motion } from 'framer-motion';
import { Heart, ArrowUp, Github, Linkedin, Twitter, Mail } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { scrollToSection } from '../utils/helpers';

const Footer = () => {
  const { personal, social } = portfolioData;
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { Icon: Github, href: social.github, label: 'GitHub' },
    { Icon: Linkedin, href: social.linkedin, label: 'LinkedIn' },
    { Icon: Twitter, href: social.twitter, label: 'Twitter' },
    { Icon: Mail, href: `mailto:${personal.email}`, label: 'Email' },
  ];

  const quickLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Blog', href: '#blog' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleQuickLinkClick = (href) => {
    const elementId = href.replace('#', '');
    scrollToSection(elementId);
  };

  return (
    <footer className="relative bg-cyber-dark border-t border-white/10">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-cyber-grid opacity-5" />
      
      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="container mx-auto px-6 py-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2"
            >
              <div className="mb-6">
                <h3 className="text-3xl font-cyber font-bold text-gradient mb-4">
                  {personal.name}
                </h3>
                <p className="text-white/70 text-lg leading-relaxed max-w-md">
                  Creating innovative digital experiences that inspire and engage. 
                  Let's build something amazing together.
                </p>
              </div>
              
              {/* Social Links */}
              <div className="flex space-x-4">
                {socialLinks.map(({ Icon, href, label }, index) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 glass rounded-lg hover:shadow-neon-blue transition-all duration-300 text-white/70 hover:text-cyber-blue group"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={`Visit my ${label} profile`}
                  >
                    <Icon size={20} />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h4 className="text-lg font-semibold text-white mb-6">Quick Links</h4>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 + index * 0.05 }}
                  >
                    <button
                      onClick={() => handleQuickLinkClick(link.href)}
                      className="text-white/60 hover:text-cyber-blue transition-colors duration-200 hover:translate-x-1 transform"
                      aria-label={`Navigate to ${link.name} section`}
                    >
                      {link.name}
                    </button>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h4 className="text-lg font-semibold text-white mb-6">Get in Touch</h4>
              <div className="space-y-3">
                <p className="text-white/60">
                  <span className="text-white/80">Email:</span><br />
                  <a 
                    href={`mailto:${personal.email}`}
                    className="text-cyber-blue hover:text-cyber-purple transition-colors duration-200"
                  >
                    {personal.email}
                  </a>
                </p>
                <p className="text-white/60">
                  <span className="text-white/80">Location:</span><br />
                  {personal.location}
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10">
          <div className="container mx-auto px-6 py-6">
            <div className="flex flex-col md:flex-row items-center justify-between">
              {/* Copyright */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="flex items-center text-white/50 text-sm mb-4 md:mb-0"
              >
                <span>© {currentYear} {personal.name}. Made with </span>
                <Heart size={14} className="mx-1 text-red-400 fill-current" />
                <span> and lots of ☕</span>
              </motion.div>

              {/* Back to Top Button */}
              <motion.button
                onClick={handleScrollToTop}
                className="flex items-center space-x-2 px-4 py-2 glass rounded-lg hover:shadow-neon transition-all duration-300 text-white/70 hover:text-white group"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Scroll to top"
              >
                <span className="text-sm">Back to Top</span>
                <ArrowUp size={16} className="group-hover:-translate-y-1 transition-transform duration-200" />
              </motion.button>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <motion.div
          className="absolute top-10 left-10 text-4xl opacity-10"
          animate={{
            y: [-10, 10, -10],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          aria-hidden="true"
        >
          ✨
        </motion.div>

        <motion.div
          className="absolute bottom-10 right-10 text-3xl opacity-10"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          aria-hidden="true"
        >
          🚀
        </motion.div>
      </div>

      {/* Gradient Line Animation */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyber-blue via-cyber-purple to-cyber-pink"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 2, ease: "easeInOut" }}
        style={{ transformOrigin: "left" }}
      />
    </footer>
  );
};

export default Footer;