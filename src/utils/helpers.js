// Utility functions
export const scrollToSection = (elementId) => {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

export const downloadResume = () => {
  // Method 1: Try XMLHttpRequest with proper headers
  const xhr = new XMLHttpRequest();
  xhr.open('GET', '/assets/MOHAMMED%20SIDHIQ%20M%20Resume.pdf', true);
  xhr.responseType = 'arraybuffer';
  
  xhr.onload = function(e) {
    if (this.status === 200) {
      // Create blob from array buffer
      const blob = new Blob([this.response], {type: 'application/pdf'});
      
      // Create download URL
      const url = window.URL.createObjectURL(blob);
      
      // Create temporary link and trigger download
      const link = document.createElement('a');
      link.href = url;
      link.download = 'MOHAMMED_SIDHIQ_M_Resume.pdf';
      
      // Ensure link is hidden and add to DOM
      link.style.display = 'none';
      document.body.appendChild(link);
      
      // Trigger the download
      link.click();
      
      // Clean up
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      console.log('Resume downloaded successfully via XHR method');
    } else {
      fallbackDownload();
    }
  };
  
  xhr.onerror = function() {
    console.log('XHR method failed, trying fallback');
    fallbackDownload();
  };
  
  xhr.send();
};

// Fallback download method
const fallbackDownload = () => {
  console.log('Using fallback download method');
  
  // Method 2: Direct link with download attribute using URL encoding for spaces
  const link = document.createElement('a');
  link.href = '/assets/MOHAMMED%20SIDHIQ%20M%20Resume.pdf';
  link.download = 'MOHAMMED_SIDHIQ_M_Resume.pdf';
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  
  // Force the browser to treat it as download
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  // Show instructions to user
  setTimeout(() => {
    const userAgent = navigator.userAgent;
    if (userAgent.includes('Chrome')) {
      alert('Resume download started! If it opened in a new tab instead of downloading:\n\n1. Right-click on the PDF\n2. Select "Save as..."\n3. Choose your download location\n\nOr check your Downloads folder - it may have downloaded automatically.');
    } else {
      alert('Resume download initiated! Please check your Downloads folder or browser\'s download manager.');
    }
  }, 500);
};

export const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

export const calculateReadTime = (content) => {
  const wordsPerMinute = 200;
  const words = content.split(' ').length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
};

export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export const throttle = (func, limit) => {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// SEO utilities
export const updateMetaTags = (title, description, image) => {
  document.title = title;
  
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    metaDescription.setAttribute('content', description);
  }
  
  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) {
    ogTitle.setAttribute('content', title);
  }
  
  const ogDescription = document.querySelector('meta[property="og:description"]');
  if (ogDescription) {
    ogDescription.setAttribute('content', description);
  }
  
  if (image) {
    const ogImage = document.querySelector('meta[property="og:image"]');
    if (ogImage) {
      ogImage.setAttribute('content', image);
    }
  }
};