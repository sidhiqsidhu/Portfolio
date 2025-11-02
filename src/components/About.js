// About Section with interactive timeline and achievements
import React from 'react';
import { motion } from 'framer-motion';
import { Award, Briefcase, GraduationCap, Calendar, MapPin, Users, Star } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useAnimations';
import { portfolioData } from '../data/portfolioData';

const About = () => {
  const { ref, inView } = useScrollAnimation();
  const { personal, timeline, achievements } = portfolioData;

  const getTimelineIcon = (type) => {
    switch (type) {
      case 'work':
        return Briefcase;
      case 'education':
        return GraduationCap;
      case 'achievement':
        return Award;
      default:
        return Calendar;
    }
  };

  const getTimelineColor = (type) => {
    switch (type) {
      case 'work':
        return 'from-cyber-blue to-blue-500';
      case 'education':
        return 'from-cyber-purple to-purple-500';
      case 'achievement':
        return 'from-cyber-pink to-pink-500';
      default:
        return 'from-gray-400 to-gray-600';
    }
  };

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

  return (
    <section id="about" className="py-20 bg-cyber-gradient relative overflow-hidden">
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
              About Me
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
              Passionate about creating innovative solutions and pushing the boundaries of technology
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Bio Section */}
            <motion.div variants={itemVariants} className="space-y-8">
              <div className="glass p-8 rounded-2xl hover-lift">
                <div className="flex items-center mb-6">
                  <motion.img
                    src={personal.avatar || "https://via.placeholder.com/120"}
                    alt={`${personal.name} - About Me`}
                    className="w-24 h-24 rounded-full border-4 border-gradient-to-r from-cyber-blue to-cyber-purple shadow-neon mr-6"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  />
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">{personal.name}</h3>
                    <p className="text-cyber-blue font-semibold">{personal.title}</p>
                    <div className="flex items-center text-white/60 mt-2">
                      <MapPin size={16} className="mr-2" />
                      <span>{personal.location}</span>
                    </div>
                  </div>
                </div>
                
                <p className="text-white/80 leading-relaxed mb-6">
                  {personal.bio}
                </p>

                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-white/5 rounded-lg">
                    <div className="text-2xl font-bold text-cyber-blue">{personal.yearsOfExperience}+</div>
                    <div className="text-white/60 text-sm">Years Experience</div>
                  </div>
                  <div className="text-center p-4 bg-white/5 rounded-lg">
                    <div className="text-2xl font-bold text-cyber-purple">5+</div>
                    <div className="text-white/60 text-sm">Projects Completed</div>
                  </div>
                </div>
              </div>

              {/* Achievements */}
              <motion.div variants={itemVariants} className="space-y-4">
                <h4 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <Award className="mr-3 text-cyber-blue" />
                  Key Achievements
                </h4>
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={index}
                    className="glass p-6 rounded-xl hover-lift"
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                  >
                    <div className="flex items-start">
                      <span className="text-3xl mr-4" aria-hidden="true">{achievement.icon}</span>
                      <div className="flex-1">
                        <h5 className="text-lg font-semibold text-white mb-2">{achievement.title}</h5>
                        <p className="text-white/70 mb-2">{achievement.description}</p>
                        <span className="text-cyber-blue text-sm font-medium">{achievement.year}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Timeline Section */}
            <motion.div variants={itemVariants} className="space-y-6">
              <h4 className="text-2xl font-bold text-white mb-8 flex items-center">
                <Calendar className="mr-3 text-cyber-purple" />
                Professional Journey
              </h4>
              
              <div className="relative">
                {/* Timeline Line */}
                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyber-blue via-cyber-purple to-cyber-pink" />
                
                {timeline.map((item, index) => {
                  const Icon = getTimelineIcon(item.type);
                  const colorClass = getTimelineColor(item.type);
                  
                  return (
                    <motion.div
                      key={index}
                      className="relative pl-16 pb-12 last:pb-0"
                      initial={{ opacity: 0, x: 20 }}
                      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                    >
                      {/* Timeline Icon */}
                      <div className={`absolute left-0 w-12 h-12 bg-gradient-to-r ${colorClass} rounded-full flex items-center justify-center shadow-neon`}>
                        <Icon size={20} className="text-white" />
                      </div>
                      
                      {/* Timeline Content */}
                      <motion.div
                        className="glass p-6 rounded-xl hover-lift"
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-cyber-blue font-semibold text-sm">{item.year}</span>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            item.type === 'work' ? 'bg-blue-500/20 text-blue-300' :
                            item.type === 'education' ? 'bg-purple-500/20 text-purple-300' :
                            'bg-pink-500/20 text-pink-300'
                          }`}>
                            {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                          </span>
                        </div>
                        <h5 className="text-lg font-semibold text-white mb-2">{item.title}</h5>
                        <p className="text-cyber-blue font-medium mb-3">{item.company}</p>
                        <p className="text-white/70 leading-relaxed">{item.description}</p>
                      </motion.div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* Call to Action */}
          <motion.div
            variants={itemVariants}
            className="text-center mt-16"
          >
            <motion.div
              className="inline-flex items-center space-x-4 glass p-6 rounded-2xl"
              whileHover={{ scale: 1.05 }}
            >
              <Users className="text-cyber-blue" size={24} />
              <span className="text-white/80">
                Interested in collaborating? Let's create something amazing together!
              </span>
              <Star className="text-cyber-purple" size={24} />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;