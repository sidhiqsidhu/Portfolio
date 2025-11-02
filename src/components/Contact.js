// Contact Section with animated form and EmailJS integration
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Mail, MapPin, Phone, Github, Linkedin, Twitter, CheckCircle, AlertCircle } from 'lucide-react';
import emailjs from 'emailjs-com';
import { useScrollAnimation } from '../hooks/useAnimations';
import { portfolioData } from '../data/portfolioData';
import { validateEmail } from '../utils/helpers';

const Contact = () => {
  const { ref, inView } = useScrollAnimation();
  const { personal, social } = portfolioData;
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  
  const [formState, setFormState] = useState({
    isSubmitting: false,
    isSubmitted: false,
    error: null,
    errorDetail: null,
  });

  const [formErrors, setFormErrors] = useState({});
  const [showErrorModal, setShowErrorModal] = useState(false);

  const copyErrorToClipboard = async () => {
    try {
      const text = formState.errorDetail || formState.error || 'No error details available';
      await navigator.clipboard.writeText(text);
      // small visual feedback could be added here
    } catch (err) {
      console.error('Copy failed', err);
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      errors.email = 'Please enter a valid email';
    }
    
    if (!formData.subject.trim()) {
      errors.subject = 'Subject is required';
    }
    
    if (!formData.message.trim()) {
      errors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      errors.message = 'Message must be at least 10 characters';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setFormState({ isSubmitting: true, isSubmitted: false, error: null });
    
    try {
      // Configure EmailJS (you'll need to set up your own service)
      const SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID || 'your_service_id';
      const TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID || 'your_template_id';
      const PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY || 'your_public_key';

      // If placeholders are present, fallback to mailto link
      const placeholders = ['your_service_id', 'your_template_id', 'your_public_key'];
      const isPlaceholder = [SERVICE_ID, TEMPLATE_ID, PUBLIC_KEY].some(val => placeholders.includes(val));

      if (isPlaceholder) {
        // Mailto fallback
        const subject = encodeURIComponent(formData.subject);
        const body = encodeURIComponent(`Name: ${formData.name}%0AEmail: ${formData.email}%0A%0A${formData.message}`);
        const mailto = `mailto:${personal.email}?subject=${subject}&body=${body}`;
        window.location.href = mailto;

        setFormState({ isSubmitting: false, isSubmitted: true, error: null, errorDetail: null });
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setFormState(prev => ({ ...prev, isSubmitted: false })), 5000);
        return;
      }

      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
          to_email: personal.email,
        },
        PUBLIC_KEY
      );

      setFormState({ isSubmitting: false, isSubmitted: true, error: null });
      setFormData({ name: '', email: '', subject: '', message: '' });

      // Reset success message after 5 seconds
      setTimeout(() => {
        setFormState(prev => ({ ...prev, isSubmitted: false }));
      }, 5000);
      
    } catch (error) {
      console.error('Email sending failed:', error);
      console.error('Contact submit error:', error);
      setFormState({
        isSubmitting: false,
        isSubmitted: false,
        error: 'Failed to send message. Please try again or contact me directly.',
        errorDetail: (error && (error.message || error.stack)) || String(error),
      });
      setShowErrorModal(true);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: personal.email,
      href: `mailto:${personal.email}`,
    },
    {
      icon: Phone,
      label: 'Phone',
      value: personal.phone,
      href: `tel:${personal.phone}`,
    },
    {
      icon: MapPin,
      label: 'Location',
      value: personal.location,
      href: '#',
    },
  ];

  const socialLinks = [
    { Icon: Github, href: social.github, label: 'GitHub' },
    { Icon: Linkedin, href: social.linkedin, label: 'LinkedIn' },
    { Icon: Twitter, href: social.twitter, label: 'Twitter' },
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
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  const FormField = ({ label, name, type = 'text', isTextarea = false, ...props }) => (
    <motion.div variants={itemVariants} className="space-y-2">
      <label htmlFor={name} className="block text-white/80 font-medium">
        {label} <span className="text-red-400">*</span>
      </label>
      {isTextarea ? (
        <textarea
          id={name}
          name={name}
          value={formData[name]}
          onChange={handleInputChange}
          className={`w-full px-4 py-3 bg-white/5 border rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:border-cyber-blue transition-all duration-200 resize-none ${
            formErrors[name] ? 'border-red-400' : 'border-white/20'
          }`}
          rows={6}
          {...props}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          value={formData[name]}
          onChange={handleInputChange}
          className={`w-full px-4 py-3 bg-white/5 border rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:border-cyber-blue transition-all duration-200 ${
            formErrors[name] ? 'border-red-400' : 'border-white/20'
          }`}
          {...props}
        />
      )}
      {formErrors[name] && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-400 text-sm flex items-center"
        >
          <AlertCircle size={14} className="mr-1" />
          {formErrors[name]}
        </motion.p>
      )}
    </motion.div>
  );

  return (
    <>
    <section id="contact" className="py-20 bg-slate-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-cyber-grid opacity-5" />
      
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="visible"
          animate={"visible"}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-cyber font-bold text-gradient mb-4">
              Let's Work Together
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
              Have a project in mind? Let's discuss how we can bring your ideas to life
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16">
            {/* Show banner when EmailJS is not configured */}
            {(() => {
              const SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID || 'your_service_id';
              const TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID || 'your_template_id';
              const PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY || 'your_public_key';
              const placeholders = ['your_service_id', 'your_template_id', 'your_public_key'];
              const isPlaceholder = [SERVICE_ID, TEMPLATE_ID, PUBLIC_KEY].some(val => placeholders.includes(val));
              if (isPlaceholder) {
                return (
                  <div className="lg:col-span-2 mb-4">
                    <div className="p-4 rounded-lg bg-yellow-800/20 border border-yellow-700 text-yellow-200">
                      Email delivery via EmailJS is not configured. Submissions will open your mail client as a fallback. To enable automatic emails, set REACT_APP_EMAILJS_SERVICE_ID, REACT_APP_EMAILJS_TEMPLATE_ID and REACT_APP_EMAILJS_PUBLIC_KEY in your environment.
                    </div>
                  </div>
                );
              }
              return null;
            })()}
            {/* Contact Form */}
            <motion.div variants={itemVariants}>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    label="Full Name"
                    name="name"
                    placeholder="Enter your full name"
                  />
                  <FormField
                    label="Email Address"
                    name="email"
                    type="email"
                    placeholder="your.email@example.com"
                  />
                </div>
                
                <FormField
                  label="Subject"
                  name="subject"
                  placeholder="What's this about?"
                />
                
                <FormField
                  label="Message"
                  name="message"
                  isTextarea
                  placeholder="Tell me about your project, ideas, or just say hello..."
                />

                {/* Form Status Messages */}
                {formState.isSubmitted && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center p-4 bg-green-500/20 border border-green-500/30 rounded-lg text-green-300"
                  >
                    <CheckCircle size={20} className="mr-3" />
                    <span>Message sent successfully! I'll get back to you soon.</span>
                  </motion.div>
                )}

                {formState.error && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center p-4 bg-red-500/20 border border-red-500/30 rounded-lg text-red-300"
                  >
                    <AlertCircle size={20} className="mr-3" />
                    <div>
                      <div>{formState.error}</div>
                      {formState.errorDetail && (
                        <pre className="text-xs text-red-200 mt-2">{formState.errorDetail}</pre>
                      )}
                    </div>
                  </motion.div>
                )}

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={formState.isSubmitting}
                  className={`w-full flex items-center justify-center space-x-2 px-8 py-4 rounded-lg font-semibold transition-all duration-300 ${
                    formState.isSubmitting
                      ? 'bg-white/10 text-white/50 cursor-not-allowed'
                      : 'bg-gradient-to-r from-cyber-blue to-cyber-purple text-white hover:shadow-neon hover:scale-105'
                  }`}
                  whileHover={!formState.isSubmitting ? { scale: 1.02 } : {}}
                  whileTap={!formState.isSubmitting ? { scale: 0.98 } : {}}
                >
                  {formState.isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      <span>Send Message</span>
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>

            {/* Contact Information */}
            <motion.div variants={itemVariants} className="space-y-8">
              {/* Contact Details */}
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-white mb-6">Get in Touch</h3>
                
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <motion.div
                      key={index}
                      className="flex items-center space-x-4 glass p-4 rounded-xl hover-lift"
                      initial={{ opacity: 0, x: 20 }}
                      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="w-12 h-12 bg-gradient-to-r from-cyber-blue to-cyber-purple rounded-lg flex items-center justify-center shadow-neon">
                        <Icon size={20} className="text-white" />
                      </div>
                      <div>
                        <p className="text-white/60 text-sm">{info.label}</p>
                        {info.href && info.href !== '#' ? (
                          <a
                            href={info.href}
                            className="text-white hover:text-cyber-blue transition-colors duration-200"
                          >
                            {info.value}
                          </a>
                        ) : (
                          <p className="text-white">{info.value}</p>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Social Links */}
              <div>
                <h4 className="text-xl font-semibold text-white mb-4">Follow Me</h4>
                <div className="flex space-x-4">
                  {socialLinks.map(({ Icon, href, label }, index) => (
                    <motion.a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 glass rounded-lg hover:shadow-neon-blue transition-all duration-300 text-white/70 hover:text-cyber-blue"
                      initial={{ opacity: 0, y: 20 }}
                      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      transition={{ delay: 0.8 + index * 0.1 }}
                      whileHover={{ scale: 1.1, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label={`Visit my ${label} profile`}
                    >
                      <Icon size={24} />
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Availability Status */}
              <motion.div
                className="glass p-6 rounded-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 1 }}
              >
                <div className="flex items-center mb-3">
                  <div className="w-3 h-3 bg-green-400 rounded-full mr-3 animate-pulse" />
                  <span className="text-green-400 font-semibold">Available for Projects</span>
                </div>
                <p className="text-white/70 text-sm">
                  I'm currently accepting new projects and would love to hear about yours. 
                  Let's discuss how we can work together to bring your ideas to life.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
    <AnimatePresence>
      {showErrorModal && (
        <motion.div
          className="fixed inset-0 z-60 flex items-center justify-center bg-black/70"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div className="bg-cyber-dark border border-white/10 rounded-2xl p-6 max-w-2xl w-full mx-4" initial={{ y: 20 }} animate={{ y: 0 }} exit={{ y: 20 }}>
            <div className="flex items-start justify-between">
              <h3 className="text-lg font-semibold text-white">Submission Error</h3>
              <button onClick={() => setShowErrorModal(false)} className="text-white/60">Close</button>
            </div>
            <div className="mt-4 bg-white/5 p-4 rounded">
              <pre className="text-xs text-white/70 max-h-64 overflow-auto">{formState.errorDetail || formState.error}</pre>
            </div>
            <div className="mt-4 flex justify-end gap-3">
              <button onClick={copyErrorToClipboard} className="px-4 py-2 bg-gradient-to-r from-cyber-blue to-cyber-purple text-white rounded">Copy Error</button>
              <button onClick={() => setShowErrorModal(false)} className="px-4 py-2 bg-white/10 text-white rounded">Close</button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
};

export default Contact;