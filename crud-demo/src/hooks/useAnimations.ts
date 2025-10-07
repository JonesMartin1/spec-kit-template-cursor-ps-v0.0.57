import { useState, useCallback } from 'react';
import { Variants } from 'framer-motion';

/**
 * Custom hook for managing animations
 * Provides reusable animation variants and controls
 */
export const useAnimations = () => {
  const [isAnimating, setIsAnimating] = useState(false);

  /**
   * Common animation variants
   */
  const variants = {
    // Fade in/out animations
    fadeIn: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration: 0.3 }
    } as Variants,

    // Slide animations
    slideUp: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -20 },
      transition: { duration: 0.3, ease: "easeOut" }
    } as Variants,

    slideDown: {
      initial: { opacity: 0, y: -20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: 20 },
      transition: { duration: 0.3, ease: "easeOut" }
    } as Variants,

    slideLeft: {
      initial: { opacity: 0, x: 20 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: -20 },
      transition: { duration: 0.3, ease: "easeOut" }
    } as Variants,

    slideRight: {
      initial: { opacity: 0, x: -20 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: 20 },
      transition: { duration: 0.3, ease: "easeOut" }
    } as Variants,

    // Scale animations
    scaleIn: {
      initial: { opacity: 0, scale: 0.8 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0.8 },
      transition: { duration: 0.3, ease: "easeOut" }
    } as Variants,

    // Button hover animations
    buttonHover: {
      rest: { scale: 1 },
      hover: { scale: 1.05 },
      tap: { scale: 0.95 },
      transition: { duration: 0.2, ease: "easeInOut" }
    } as Variants,

    // Card hover animations
    cardHover: {
      rest: { 
        scale: 1, 
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" 
      },
      hover: { 
        scale: 1.02, 
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" 
      },
      transition: { duration: 0.3, ease: "easeOut" }
    } as Variants,

    // List item animations
    listItem: {
      initial: { opacity: 0, x: -20 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: 20 },
      transition: { duration: 0.3, ease: "easeOut" }
    } as Variants,

    // Stagger container for lists
    staggerContainer: {
      initial: {},
      animate: {
        transition: {
          staggerChildren: 0.1,
          delayChildren: 0.1
        }
      },
      exit: {
        transition: {
          staggerChildren: 0.05,
          staggerDirection: -1
        }
      }
    } as Variants,

    // Modal/Dialog animations
    modal: {
      initial: { opacity: 0, scale: 0.8, y: 20 },
      animate: { opacity: 1, scale: 1, y: 0 },
      exit: { opacity: 0, scale: 0.8, y: 20 },
      transition: { duration: 0.3, ease: "easeOut" }
    } as Variants,

    // Overlay animations
    overlay: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration: 0.2 }
    } as Variants,

    // Toast notification animations
    toast: {
      initial: { opacity: 0, x: 300, scale: 0.8 },
      animate: { opacity: 1, x: 0, scale: 1 },
      exit: { opacity: 0, x: 300, scale: 0.8 },
      transition: { duration: 0.3, ease: "easeOut" }
    } as Variants
  };

  /**
   * Create custom animation variant with parameters
   */
  const createCustomVariant = useCallback((
    initialState: Record<string, any>,
    animateState: Record<string, any>,
    exitState?: Record<string, any>,
    transitionConfig?: Record<string, any>
  ): Variants => {
    return {
      initial: initialState,
      animate: animateState,
      exit: exitState || initialState,
      transition: transitionConfig || { duration: 0.3, ease: "easeOut" }
    };
  }, []);

  /**
   * Animation control functions
   */
  const startAnimation = useCallback(() => {
    setIsAnimating(true);
  }, []);

  const endAnimation = useCallback(() => {
    setIsAnimating(false);
  }, []);

  /**
   * Get animation variant by name
   */
  const getVariant = useCallback((name: keyof typeof variants) => {
    return variants[name];
  }, []);

  /**
   * Create delayed animation
   */
  const createDelayedVariant = useCallback((
    baseVariant: any,
    delay: number
  ) => {
    return {
      ...baseVariant,
      transition: {
        ...baseVariant.transition,
        delay
      }
    };
  }, []);

  /**
   * Animation presets for common use cases
   */
  const presets = {
    // For page transitions
    pageTransition: variants.slideUp,
    
    // For form elements
    formElement: variants.fadeIn,
    
    // For list items
    listItem: variants.listItem,
    
    // For buttons
    button: variants.buttonHover,
    
    // For cards
    card: variants.cardHover,
    
    // For modals
    modal: variants.modal,
    
    // For notifications
    notification: variants.toast
  };

  return {
    // Animation variants
    variants,
    presets,
    
    // State
    isAnimating,
    
    // Control functions
    startAnimation,
    endAnimation,
    
    // Utility functions
    getVariant,
    createCustomVariant,
    createDelayedVariant
  };
};

export default useAnimations;
