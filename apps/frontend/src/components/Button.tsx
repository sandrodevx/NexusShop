import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '../utils/cn';

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: 'neon' | 'plasma' | 'electric' | 'cyber' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  loading?: boolean;
  glow?: boolean;
  children: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant = 'neon', 
    size = 'md', 
    loading = false, 
    glow = false,
    children, 
    disabled, 
    ...props 
  }, ref) => {
    const baseClasses = "relative inline-flex items-center justify-center font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark-50 disabled:pointer-events-none disabled:opacity-50 overflow-hidden group";
    
    const variantClasses = {
      neon: `
        bg-gradient-to-r from-neon-500 to-neon-400 
        text-dark-50 
        hover:from-neon-400 hover:to-neon-300 
        focus:ring-neon-400
        shadow-lg shadow-neon-500/20
        border border-neon-400/30
        ${glow ? 'neon-glow' : ''}
      `,
      plasma: `
        bg-gradient-to-r from-plasma-500 to-plasma-400 
        text-white 
        hover:from-plasma-400 hover:to-plasma-300 
        focus:ring-plasma-400
        shadow-lg shadow-plasma-500/20
        border border-plasma-400/30
        ${glow ? 'neon-glow-pink' : ''}
      `,
      electric: `
        bg-gradient-to-r from-electric-500 to-electric-400 
        text-dark-900 
        hover:from-electric-400 hover:to-electric-300 
        focus:ring-electric-400
        shadow-lg shadow-electric-500/20
        border border-electric-400/30
        ${glow ? 'neon-glow-yellow' : ''}
      `,
      cyber: `
        glass-dark 
        text-neon-400 
        hover:text-neon-300 
        focus:ring-neon-400
        hover:bg-dark-100/20
        hover:border-neon-400/50
        shadow-lg shadow-dark-900/50
      `,
      ghost: `
        text-cyber-300 
        hover:text-neon-400 
        hover:bg-dark-100/10 
        focus:ring-cyber-400
      `,
      outline: `
        border-2 border-neon-400/50 
        text-neon-400 
        hover:bg-neon-400/10 
        hover:border-neon-400 
        focus:ring-neon-400
        backdrop-blur-sm
      `,
    };
    
    const sizeClasses = {
      sm: "h-9 px-4 text-sm rounded-lg font-heading",
      md: "h-11 px-6 text-base rounded-xl font-heading",
      lg: "h-13 px-8 text-lg rounded-xl font-heading",
      xl: "h-16 px-10 text-xl rounded-2xl font-heading",
    };

    return (
      <motion.button
        className={cn(baseClasses, variantClasses[variant], sizeClasses[size], className)}
        ref={ref}
        disabled={disabled || loading}
        whileHover={{ scale: loading ? 1 : 1.05 }}
        whileTap={{ scale: loading ? 1 : 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        {...props}
      >
        {/* Background Animation */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          initial={{ x: '-100%' }}
          whileHover={{ x: '100%' }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        />
        
        {/* Border Animation */}
        <motion.div
          className="absolute inset-0 border-2 border-transparent rounded-inherit"
          style={{
            background: variant !== 'ghost' ? 
              'linear-gradient(45deg, transparent, rgba(34, 197, 94, 0.3), transparent)' : 
              'none'
          }}
          animate={glow ? {
            opacity: [0.5, 1, 0.5],
          } : {}}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Loading Spinner */}
        {loading && (
          <motion.div
            className="mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        )}

        {/* Content */}
        <span className="relative z-10 flex items-center">
          {children}
        </span>

        {/* Particle Effect on Hover */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          whileHover={{
            background: [
              'radial-gradient(circle at 20% 80%, rgba(34, 197, 94, 0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 20%, rgba(34, 197, 94, 0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 40% 40%, rgba(34, 197, 94, 0.1) 0%, transparent 50%)',
            ]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        />
      </motion.button>
    );
  }
);

Button.displayName = "Button";

export { Button }; 