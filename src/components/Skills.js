// Skills Section with animated progress bars and certifications
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, ExternalLink, Filter, Code, Database, Cloud, Palette } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useAnimations';
import { portfolioData } from '../data/portfolioData';

const Skills = () => {
  const { ref, inView } = useScrollAnimation();
  const { skills, certifications } = portfolioData;
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Frontend', 'Backend', 'Database', 'Cloud', 'Design'];
  
  const categoryIcons = {
    Frontend: Code,
    Backend: Database,
    Database: Database,
    Cloud: Cloud,
    Design: Palette,
    DevOps: Cloud,
  };

  const filteredSkills = selectedCategory === 'All' 
    ? skills 
    : skills.filter(skill => skill.category === selectedCategory);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  const SkillCard = ({ skill, index }) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ delay: index * 0.1 }}
      className="glass p-6 rounded-xl hover-lift group"
      whileHover={{ y: -5 }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <span className="text-2xl mr-3" aria-hidden="true">{skill.icon}</span>
          <div>
            <h4 className="text-lg font-semibold text-white">{skill.name}</h4>
            <span className="text-sm text-white/60">{skill.category}</span>
          </div>
        </div>
        <span className="text-cyber-blue font-bold text-lg">{skill.level}%</span>
      </div>
      
      {/* Progress Bar */}
      <div className="relative">
        <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-cyber-blue via-cyber-purple to-cyber-pink rounded-full"
            initial={{ width: 0 }}
            animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
            transition={{ duration: 1.5, delay: 0.5 + index * 0.1, ease: 'easeOut' }}
          />
        </div>
        
        {/* Glow effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-cyber-blue/30 via-cyber-purple/30 to-cyber-pink/30 rounded-full blur-sm"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
        />
      </div>
      
      {/* Hover Effect */}
      <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="text-xs text-white/50">
          Proficiency: {skill.level >= 90 ? 'Expert' : skill.level >= 75 ? 'Advanced' : skill.level >= 60 ? 'Intermediate' : 'Beginner'}
        </div>
      </div>
    </motion.div>
  );

  const CertificationCard = ({ cert, index }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="glass p-6 rounded-xl hover-lift group"
      whileHover={{ scale: 1.02 }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start">
          <div className="w-12 h-12 bg-gradient-to-r from-cyber-blue to-cyber-purple rounded-lg flex items-center justify-center mr-4 group-hover:shadow-neon transition-all duration-300">
            <Award size={24} className="text-white" />
          </div>
          <div>
            <h4 className="text-lg font-semibold text-white mb-1">{cert.name}</h4>
            <p className="text-cyber-blue font-medium mb-2">{cert.issuer}</p>
            <span className="text-white/60 text-sm">{cert.date}</span>
          </div>
        </div>
        
        {cert.link && (
          <motion.a
            href={cert.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/50 hover:text-cyber-blue transition-colors duration-200"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label={`View ${cert.name} certificate`}
          >
            <ExternalLink size={20} />
          </motion.a>
        )}
      </div>
      
      <div className="w-full h-1 bg-gradient-to-r from-cyber-blue to-cyber-purple rounded-full" />
    </motion.div>
  );

  return (
    <section id="skills" className="py-20 bg-slate-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-cyber-grid opacity-5" />
      
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-cyber font-bold text-gradient mb-4">
              Skills & Expertise
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
              Technologies and tools I use to bring ideas to life
            </p>
          </motion.div>

          {/* Category Filter */}
          <motion.div variants={itemVariants} className="flex flex-wrap justify-center mb-12 gap-3">
            {categories.map((category) => {
              const Icon = categoryIcons[category] || Filter;
              return (
                <motion.button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-cyber-blue to-cyber-purple text-white shadow-neon'
                      : 'glass text-white/70 hover:text-white hover:shadow-neon-blue'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={`Filter skills by ${category}`}
                >
                  {category !== 'All' && <Icon size={16} />}
                  <span>{category}</span>
                </motion.button>
              );
            })}
          </motion.div>

          {/* Skills Grid */}
          <motion.div variants={itemVariants} className="mb-20">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedCategory}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {filteredSkills.map((skill, index) => (
                  <SkillCard key={`${skill.name}-${selectedCategory}`} skill={skill} index={index} />
                ))}
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Certifications Section */}
          <motion.div variants={itemVariants}>
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-white mb-4 flex items-center justify-center">
                <Award className="mr-3 text-cyber-blue" />
                Certifications
              </h3>
              <p className="text-white/70">
                Professional certifications that validate my expertise
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {certifications.map((cert, index) => (
                <CertificationCard key={index} cert={cert} index={index} />
              ))}
            </div>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            variants={itemVariants}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {[
              { label: 'Technologies', value: skills.length, icon: '⚡' },
              { label: 'Certifications', value: certifications.length, icon: '🏆' },
              { label: 'Years Coding', value: '4+', icon: '💻' },
              { label: 'Projects Built', value: '5+', icon: '🚀' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center glass p-6 rounded-xl hover-lift"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.8 + index * 0.1 }}
              >
                <div className="text-3xl mb-2" aria-hidden="true">{stat.icon}</div>
                <div className="text-2xl font-bold text-gradient">{stat.value}</div>
                <div className="text-white/60 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;