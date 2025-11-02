// Work Experience Section
import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Building, Code, Users } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useAnimations';
import { portfolioData } from '../data/portfolioData';

const Experience = () => {
  const { ref, inView } = useScrollAnimation();
  const { workExperience } = portfolioData;

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
        duration: 0.5,
      },
    },
  };

  return (
    <section id="experience" className="py-20 bg-cyber-gradient relative overflow-hidden">
      
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            Work <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">Experience</span>
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-300 max-w-3xl mx-auto"
          >
            Professional internships and hands-on experience in software development and data science
          </motion.p>
        </motion.div>

        {/* Experience Cards */}
        <motion.div
          variants={containerVariants}
          className="space-y-8"
        >
          {workExperience.map((job, index) => (
            <motion.div
              key={job.id}
              variants={itemVariants}
              className="group relative"
            >
              {/* Experience Card */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:border-purple-400/50 transition-all duration-300 hover:bg-white/15">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                  
                  {/* Left Side - Job Info */}
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-2">
                          {job.position}
                        </h3>
                        <div className="flex items-center gap-2 text-purple-300 mb-2">
                          <Building size={18} />
                          <span className="font-semibold">{job.company}</span>
                        </div>
                      </div>
                      
                      {/* Duration Badge */}
                      <div className="flex flex-col sm:items-end gap-2">
                        <div className="flex items-center gap-2 text-gray-300">
                          <Calendar size={16} />
                          <span>{job.startDate} - {job.endDate}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-300">
                          <MapPin size={16} />
                          <span>{job.location} ({job.type})</span>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-300 mb-6 leading-relaxed">
                      {job.description}
                    </p>

                    {/* Key Responsibilities */}
                    <div className="mb-6">
                      <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                        <Users size={18} className="text-purple-400" />
                        Key Responsibilities
                      </h4>
                      <ul className="space-y-2">
                        {job.responsibilities.map((responsibility, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-gray-300">
                            <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mt-2 flex-shrink-0"></div>
                            <span>{responsibility}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Technologies */}
                    <div>
                      <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                        <Code size={18} className="text-cyan-400" />
                        Technologies & Skills
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {job.technologies.map((tech, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-white text-sm rounded-full border border-purple-400/30 hover:border-purple-400/50 transition-colors"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Side - Company Logo Placeholder */}
                  <div className="lg:w-32 lg:h-32 flex-shrink-0">
                    <div className="w-full h-24 lg:h-32 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl flex items-center justify-center border border-purple-400/30">
                      <Building size={32} className="text-purple-300" />
                    </div>
                  </div>
                </div>

                {/* Hover Effect Gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>

              {/* Timeline Connector (except for last item) */}
              {index < workExperience.length - 1 && (
                <div className="flex justify-center py-4">
                  <div className="w-px h-8 bg-gradient-to-b from-purple-400 to-transparent"></div>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          variants={itemVariants}
          className="text-center mt-16"
        >
          <motion.div
            className="inline-block"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-2xl p-6 border border-purple-400/30">
              <p className="text-lg text-gray-300 mb-4">
                Ready to bring my experience to your next project
              </p>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300"
              >
                Let's Work Together
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;