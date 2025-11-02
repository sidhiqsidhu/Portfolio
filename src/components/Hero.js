// Hero Section with typing animation and floating elements
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { ChevronDown, Github, Linkedin, Mail, Twitter } from 'lucide-react';
import AnimatedBackground from './AnimatedBackground';
import { portfolioData } from '../data/portfolioData';
import { scrollToSection } from '../utils/helpers';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { personal, social } = portfolioData;

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleHireMeClick = () => {
    scrollToSection('contact');
  };

  const socialIcons = [
    { Icon: Github, href: social.github, label: 'GitHub' },
    { Icon: Linkedin, href: social.linkedin, label: 'LinkedIn' },
    { Icon: Twitter, href: social.twitter, label: 'Twitter' },
    { Icon: Mail, href: `mailto:${personal.email}`, label: 'Email' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <AnimatedBackground />
      
      <motion.div
        className="relative z-10 container mx-auto px-6 text-center"
        variants={containerVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
      >
        {/* Floating Avatar */}
        <motion.div
          variants={itemVariants}
          className="mb-8 flex justify-center"
        >
          <motion.div
            className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-gradient-to-r from-cyber-blue to-cyber-purple shadow-neon"
            animate={{
              y: [-10, 10, -10],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <img
              src={personal.avatar || "https://via.placeholder.com/150"}
              alt={`${personal.name} - Portfolio Avatar`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-cyber-blue/20 to-transparent" />
          </motion.div>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          variants={itemVariants}
          className="text-4xl md:text-6xl lg:text-7xl font-cyber font-bold mb-4"
        >
          <span className="text-white">Hi, I'm </span>
          <span className="text-gradient">{personal.name}</span>
        </motion.h1>

        {/* Subtitle with typing animation */}
        <motion.div
          variants={itemVariants}
          className="text-xl md:text-2xl lg:text-3xl text-white/80 mb-6 h-16 flex items-center justify-center"
        >
          <TypeAnimation
            sequence={[
              'Designer',
              2000,
              'Developer',
              2000,
              'Freelancer',
              2000,
              'Software Developer',
              2000,
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
            className="font-modern"
            aria-label="Professional titles"
          />
        </motion.div>

        {/* Tagline */}
        <motion.p
          variants={itemVariants}
          className="text-lg md:text-xl text-white/70 mb-8 max-w-2xl mx-auto font-modern leading-relaxed"
        >
          {personal.tagline}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
        >
          <motion.button
            onClick={handleHireMeClick}
            className="px-8 py-4 bg-gradient-to-r from-cyber-blue to-cyber-purple rounded-full text-white font-semibold text-lg hover:shadow-neon transition-all duration-300 hover:scale-105 focus-visible"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Contact me for work opportunities"
          >
            Let's Work Together
          </motion.button>
          
          <motion.button
            onClick={() => scrollToSection('projects')}
            className="px-8 py-4 border-2 border-cyber-blue rounded-full text-cyber-blue font-semibold text-lg hover:bg-cyber-blue hover:text-white transition-all duration-300 hover:scale-105 focus-visible"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="View my projects"
          >
            View My Work
          </motion.button>
        </motion.div>

        {/* Social Links */}
        <motion.div
          variants={itemVariants}
          className="flex justify-center space-x-6 mb-16"
        >
          {socialIcons.map(({ Icon, href, label }, index) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full glass hover:shadow-neon-blue transition-all duration-300 text-white/70 hover:text-cyber-blue focus-visible"
              whileHover={{ scale: 1.1, y: -5 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + index * 0.1 }}
              aria-label={`Visit my ${label} profile`}
            >
              <Icon size={24} />
            </motion.a>
          ))}
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          variants={itemVariants}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.button
            onClick={() => scrollToSection('about')}
            className="text-white/50 hover:text-cyber-blue transition-colors duration-300 focus-visible"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            aria-label="Scroll to about section"
          >
            <ChevronDown size={32} />
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Floating Elements */}
      <motion.div
        className="absolute top-20 left-10 text-6xl opacity-10"
        animate={{
          rotate: [0, 360],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        aria-hidden="true"
      >
        ⚛️
      </motion.div>

      <motion.div
        className="absolute bottom-20 right-10 text-4xl opacity-10"
        animate={{
          y: [-20, 20, -20],
          rotate: [0, 10, -10, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        aria-hidden="true"
      >
        💻
      </motion.div>

      <motion.div
        className="absolute top-1/2 left-5 text-3xl opacity-10"
        animate={{
          x: [-10, 10, -10],
          opacity: [0.1, 0.3, 0.1],
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
    </section>
  );
};

export default Hero;