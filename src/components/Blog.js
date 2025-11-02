// Blog Section for technical articles and thought leadership
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, ArrowRight, User, Tag, X } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useAnimations';
import { portfolioData } from '../data/portfolioData';
import { formatDate } from '../utils/helpers';

const Blog = () => {
  const { ref, inView } = useScrollAnimation();
  const { blogPosts } = portfolioData;
  const [selectedPost, setSelectedPost] = useState(null);
  const [selectedTag, setSelectedTag] = useState('All');

  const allTags = ['All', ...new Set(blogPosts.flatMap(post => post.tags))];
  const filteredPosts = selectedTag === 'All' 
    ? blogPosts 
    : blogPosts.filter(post => post.tags.includes(selectedTag));

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

  const BlogCard = ({ post, index }) => (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ delay: index * 0.1 }}
      className="glass rounded-2xl overflow-hidden hover-lift group cursor-pointer"
      onClick={() => setSelectedPost(post)}
      whileHover={{ y: -5 }}
    >
      {/* Featured Image */}
      <div className="relative h-48 bg-gradient-to-br from-cyber-blue/20 to-cyber-purple/20 overflow-hidden">
        <img
          src={post.image || "https://via.placeholder.com/400x200"}
                          alt={`${post.title} header`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-cyber-dark/80 via-transparent to-transparent" />
        
        {/* Read Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <motion.button
            className="px-6 py-3 bg-cyber-blue rounded-full text-white font-medium hover:shadow-neon transition-all duration-200"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label={`Read ${post.title}`}
          >
            Read Article
          </motion.button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Meta Info */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center text-white/60 text-sm">
            <Calendar size={14} className="mr-2" />
            <span>{formatDate(post.date)}</span>
          </div>
          <div className="flex items-center text-white/60 text-sm">
            <Clock size={14} className="mr-2" />
            <span>{post.readTime}</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-gradient transition-all duration-300 line-clamp-2">
          {post.title}
        </h3>

        {/* Excerpt */}
        <p className="text-white/70 mb-4 line-clamp-3 leading-relaxed">
          {post.excerpt}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.slice(0, 3).map((tag, tagIndex) => (
            <span
              key={tagIndex}
              className="px-2 py-1 bg-cyber-blue/20 text-cyber-blue rounded text-xs font-medium"
            >
              #{tag}
            </span>
          ))}
          {post.tags.length > 3 && (
            <span className="px-2 py-1 bg-white/10 text-white/60 rounded text-xs">
              +{post.tags.length - 3} more
            </span>
          )}
        </div>

        {/* Author and Read More */}
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-gradient-to-r from-cyber-blue to-cyber-purple rounded-full flex items-center justify-center mr-3">
              <User size={14} className="text-white" />
            </div>
            <span className="text-white/60 text-sm">{post.author}</span>
          </div>
          
          <motion.div
            className="flex items-center text-cyber-blue text-sm font-medium group-hover:text-cyber-purple transition-colors duration-200"
            whileHover={{ x: 5 }}
          >
            <span className="mr-2">Read More</span>
            <ArrowRight size={14} />
          </motion.div>
        </div>
      </div>
    </motion.article>
  );

  const BlogModal = ({ post, onClose }) => (
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
              aria-label="Close article"
            >
              <X size={24} className="text-white/70" />
            </button>
            
            <div className="flex items-center text-white/60 text-sm mb-4">
              <Calendar size={14} className="mr-2" />
              <span>{formatDate(post.date)}</span>
              <Clock size={14} className="ml-4 mr-2" />
              <span>{post.readTime}</span>
            </div>
            
            <h1 className="text-3xl font-bold text-gradient mb-4">{post.title}</h1>
            <p className="text-white/70 text-lg leading-relaxed">{post.excerpt}</p>
            
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-4">
              {post.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-cyber-blue/20 text-cyber-blue rounded-full text-sm font-medium"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Featured Image */}
            <div className="mb-8 rounded-xl overflow-hidden">
              <img
                src={post.image || "https://via.placeholder.com/800x400"}
                alt={`${post.title} preview`}
                className="w-full h-64 object-cover"
              />
            </div>

            {/* Article Content - In a real app, this would be rich content */}
            <div className="prose prose-invert max-w-none">
              <p className="text-white/80 leading-relaxed text-lg mb-6">
                {post.content || `This is where the full article content for "${post.title}" would be displayed. In a real implementation, this would contain the complete article with rich formatting, code blocks, images, and other interactive elements.`}
              </p>
              
              <p className="text-white/80 leading-relaxed text-lg mb-6">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
              
              <p className="text-white/80 leading-relaxed text-lg">
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </div>

            {/* Author Info */}
            <div className="mt-8 p-6 glass rounded-xl">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-cyber-blue to-cyber-purple rounded-full flex items-center justify-center mr-4">
                  <User size={20} className="text-white" />
                </div>
                <div>
                  <h4 className="text-white font-semibold">Written by {post.author}</h4>
                  <p className="text-white/60 text-sm">Full Stack Developer & Technical Writer</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );

  return (
    <section id="blog" className="py-20 bg-slate-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-cyber-grid opacity-5" />
      
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {/* Blog removed: compact placeholder */}
          <motion.div variants={itemVariants} className="text-center mb-8">
            <h2 className="text-3xl font-semibold text-white/80 mb-4">Blog temporarily removed</h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              The blog/insights section has been disabled. If you want the posts restored, let me know which posts or categories to bring back.
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Blog Modal */}
      {selectedPost && (
        <BlogModal
          post={selectedPost}
          onClose={() => setSelectedPost(null)}
        />
      )}
    </section>
  );
};

export default Blog;