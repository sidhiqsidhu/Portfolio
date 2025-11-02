// Projects Section with case studies, filters, and 3D effects
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, Eye, Filter, X, Calendar, Users, Zap } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useAnimations';
import { portfolioData } from '../data/portfolioData';

const Projects = () => {
  const { ref, inView } = useScrollAnimation();
  const { projects } = portfolioData;
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);

  const categories = ['All', ...new Set(projects.map(project => project.category))];
  const filteredProjects = selectedCategory === 'All' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

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
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  const ProjectCard = ({ project, index }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ delay: index * 0.1 }}
      className="group glass rounded-2xl overflow-hidden hover-lift"
      whileHover={{ y: -10, rotateX: 5, rotateY: 5 }}
      style={{ perspective: 1000 }}
    >
      {/* Project Image */}
      <div className="relative overflow-hidden h-48 bg-gradient-to-br from-cyber-blue/20 to-cyber-purple/20">
        <img
          src={project.image || "https://via.placeholder.com/400x200"}
          alt={`${project.title} preview`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-cyber-dark/80 via-transparent to-transparent" />
        
        {/* Overlay Actions */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex space-x-4">
            <motion.button
              onClick={() => setSelectedProject(project)}
              className="p-3 bg-cyber-blue rounded-full text-white hover:shadow-neon transition-all duration-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label={`View ${project.title} case study`}
            >
              <Eye size={20} />
            </motion.button>
            
            {project.github && (
              <motion.a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-slate-700 rounded-full text-white hover:shadow-neon transition-all duration-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label={`View ${project.title} source code`}
              >
                <Github size={20} />
              </motion.a>
            )}
            
            {project.demo && (
              <motion.a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-cyber-purple rounded-full text-white hover:shadow-neon transition-all duration-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label={`View ${project.title} live demo`}
              >
                <ExternalLink size={20} />
              </motion.a>
            )}
          </div>
        </div>

        {/* Featured Badge */}
        {project.featured && (
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 bg-gradient-to-r from-cyber-blue to-cyber-purple rounded-full text-xs font-semibold text-white">
              Featured
            </span>
          </div>
        )}
      </div>

      {/* Project Content */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <span className="px-3 py-1 bg-cyber-blue/20 text-cyber-blue rounded-full text-sm font-medium">
            {project.category}
          </span>
        </div>
        
        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-gradient transition-all duration-300">
          {project.title}
        </h3>
        
        <p className="text-white/70 mb-4 line-clamp-2">
          {project.description}
        </p>
        
        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.slice(0, 4).map((tag, tagIndex) => (
            <span
              key={tagIndex}
              className="px-2 py-1 bg-white/10 text-white/80 rounded text-xs"
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 4 && (
            <span className="px-2 py-1 bg-white/10 text-white/60 rounded text-xs">
              +{project.tags.length - 4} more
            </span>
          )}
        </div>
        
        {/* Action Buttons */}
        <div className="flex space-x-3">
          <motion.button
            onClick={() => setSelectedProject(project)}
            className="flex-1 py-2 px-4 bg-gradient-to-r from-cyber-blue to-cyber-purple rounded-lg text-white font-medium hover:shadow-neon transition-all duration-200"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            View Details
          </motion.button>
        </div>
      </div>
    </motion.div>
  );

  const CaseStudyModal = ({ project, onClose }) => (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-cyber-dark border border-white/20 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="relative p-6 border-b border-white/10">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-lg transition-colors duration-200"
              aria-label="Close case study"
            >
              <X size={24} className="text-white/70" />
            </button>
            
            <h2 className="text-3xl font-bold text-gradient mb-2">{project.title}</h2>
            <p className="text-white/70">{project.longDescription}</p>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Project Image */}
            <div className="mb-8 rounded-xl overflow-hidden">
              <img
                src={project.image || "https://via.placeholder.com/800x400"}
                alt={`${project.title} detailed view`}
                className="w-full h-64 object-cover"
              />
            </div>

            {project.caseStudy && (
              <div className="grid md:grid-cols-2 gap-8">
                {/* Left Column */}
                <div className="space-y-6">
                  <div>
                    <h4 className="text-xl font-semibold text-white mb-3 flex items-center">
                      <Zap className="mr-2 text-cyber-blue" />
                      Challenge
                    </h4>
                    <p className="text-white/70 leading-relaxed">{project.caseStudy.challenge}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-xl font-semibold text-white mb-3 flex items-center">
                      <Eye className="mr-2 text-cyber-purple" />
                      Solution
                    </h4>
                    <p className="text-white/70 leading-relaxed">{project.caseStudy.solution}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-xl font-semibold text-white mb-3 flex items-center">
                      <Zap className="mr-2 text-cyber-pink" />
                      Results
                    </h4>
                    <p className="text-white/70 leading-relaxed">{project.caseStudy.results}</p>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  <div>
                    <h4 className="text-xl font-semibold text-white mb-3">Technologies Used</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.caseStudy.technologies.map((tech, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-gradient-to-r from-cyber-blue/20 to-cyber-purple/20 text-cyber-blue rounded-full text-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="glass p-4 rounded-lg">
                      <div className="flex items-center mb-2">
                        <Calendar className="mr-2 text-cyber-blue" size={16} />
                        <span className="text-white/60 text-sm">Duration</span>
                      </div>
                      <span className="text-white font-semibold">{project.caseStudy.duration}</span>
                    </div>
                    
                    <div className="glass p-4 rounded-lg">
                      <div className="flex items-center mb-2">
                        <Users className="mr-2 text-cyber-purple" size={16} />
                        <span className="text-white/60 text-sm">Team Size</span>
                      </div>
                      <span className="text-white font-semibold">{project.caseStudy.team}</span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-4">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors duration-200"
                      >
                        <Github size={16} />
                        <span>Source Code</span>
                      </a>
                    )}
                    
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-cyber-blue to-cyber-purple hover:shadow-neon rounded-lg transition-all duration-200"
                      >
                        <ExternalLink size={16} />
                        <span>Live Demo</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );

  return (
    <section id="projects" className="py-20 bg-cyber-gradient relative overflow-hidden">
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
              Featured Projects
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
              A showcase of my recent work, featuring detailed case studies and technical insights
            </p>
          </motion.div>

          {/* Category Filter */}
          <motion.div variants={itemVariants} className="flex flex-wrap justify-center mb-12 gap-3">
            {categories.map((category) => (
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
                aria-label={`Filter projects by ${category}`}
              >
                <Filter size={16} />
                <span>{category}</span>
              </motion.button>
            ))}
          </motion.div>

          {/* Projects Grid */}
          <motion.div variants={itemVariants}>
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedCategory}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {filteredProjects.map((project, index) => (
                  <ProjectCard key={`${project.id}-${selectedCategory}`} project={project} index={index} />
                ))}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>

      {/* Case Study Modal */}
      {selectedProject && (
        <CaseStudyModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
};

export default Projects;