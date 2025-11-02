// Custom hook for scroll-triggered animations
import { useState } from 'react';
import { useInView } from 'react-intersection-observer';

export const useScrollAnimation = (threshold = 0.1) => {
  const { ref, inView } = useInView({
    threshold,
    triggerOnce: true,
  });

  return { ref, inView };
};

// Custom hook for managing animation delays
export const useAnimationDelay = (baseDelay = 0, increment = 100) => {
  const [delay, setDelay] = useState(baseDelay);

  const getDelay = (index) => baseDelay + (index * increment);

  const resetDelay = () => setDelay(baseDelay);

  return { delay, getDelay, resetDelay };
};

// Custom hook for managing focus for accessibility
export const useFocusManagement = () => {
  const [focusableElements, setFocusableElements] = useState([]);

  const getFocusableElements = (container) => {
    const elements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    setFocusableElements(Array.from(elements));
    return elements;
  };

  const focusFirst = (container) => {
    const elements = getFocusableElements(container);
    if (elements.length > 0) elements[0].focus();
  };

  const focusLast = (container) => {
    const elements = getFocusableElements(container);
    if (elements.length > 0) elements[elements.length - 1].focus();
  };

  return { focusableElements, getFocusableElements, focusFirst, focusLast };
};