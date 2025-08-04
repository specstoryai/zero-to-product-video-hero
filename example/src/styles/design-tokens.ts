// Design tokens based on tny.dev design system
// Using OKLCH color space for better color consistency

export const colors = {
  // Base colors
  background: {
    primary: '#FFFFFF',
    secondary: '#FAFAFA',
    tertiary: '#F3F4F6',
    dark: '#000000',
    darkSecondary: '#111111'
  },
  
  // Text colors
  text: {
    primary: '#111827', // Very dark gray
    secondary: '#6B7280', // Medium gray
    tertiary: '#9CA3AF', // Light gray
    inverse: '#FFFFFF',
    muted: '#D1D5DB'
  },
  
  // Brand colors
  brand: {
    purple: '#7C3AED', // Primary purple
    purpleLight: '#A78BFA',
    purpleDark: '#6D28D9',
    black: '#000000',
    white: '#FFFFFF'
  },
  
  // Semantic colors
  semantic: {
    success: '#10B981', // Green
    warning: '#F59E0B', // Amber
    error: '#EF4444', // Red
    info: '#3B82F6' // Blue
  },
  
  // Border colors
  border: {
    light: '#E5E7EB',
    default: '#D1D5DB',
    dark: '#374151',
    focus: 'rgba(59, 130, 246, 0.2)' // Blue with opacity
  }
};

export const typography = {
  fonts: {
    sans: 'Geist Sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    mono: 'Geist Mono, "SF Mono", Monaco, "Inconsolata", "Fira Code", monospace'
  },
  
  sizes: {
    xs: '12px',
    sm: '14px',
    base: '16px',
    lg: '18px',
    xl: '20px',
    '2xl': '24px',
    '3xl': '30px',
    '4xl': '36px',
    '5xl': '48px',
    '6xl': '60px'
  },
  
  weights: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700
  },
  
  lineHeights: {
    tight: 1.2,
    snug: 1.4,
    normal: 1.6,
    relaxed: 1.8
  },
  
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em'
  }
};

export const spacing = {
  px: '1px',
  0: '0',
  1: '4px',
  2: '8px',
  3: '12px',
  4: '16px',
  5: '20px',
  6: '24px',
  8: '32px',
  10: '40px',
  12: '48px',
  16: '64px',
  20: '80px',
  24: '96px'
};

export const borderRadius = {
  none: '0',
  sm: '6px',
  md: '8px',
  lg: '10px', // Base radius from tny.dev
  xl: '14px',
  '2xl': '16px',
  '3xl': '24px',
  full: '9999px'
};

export const shadows = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
  none: 'none'
};

export const animations = {
  // Cubic bezier functions from tny.dev
  easing: {
    bounce: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    smooth: 'cubic-bezier(0.16, 1, 0.3, 1)',
    default: 'cubic-bezier(0.4, 0, 0.2, 1)'
  },
  
  duration: {
    fast: '100ms',
    normal: '150ms',
    slow: '200ms',
    slower: '300ms'
  },
  
  // Keyframe animations
  keyframes: {
    fadeIn: {
      from: { opacity: 0 },
      to: { opacity: 1 }
    },
    slideIn: {
      from: { transform: 'translateY(10px)', opacity: 0 },
      to: { transform: 'translateY(0)', opacity: 1 }
    },
    scaleIn: {
      from: { transform: 'scale(0.9)', opacity: 0 },
      to: { transform: 'scale(1)', opacity: 1 }
    },
    pulse: {
      '0%, 100%': { opacity: 0.3, transform: 'scale(0.8)' },
      '50%': { opacity: 1, transform: 'scale(1)' }
    }
  }
};

// Breakpoints for responsive design
export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px'
};

// Z-index scale
export const zIndex = {
  base: 0,
  dropdown: 10,
  sticky: 20,
  overlay: 30,
  modal: 40,
  popover: 50,
  tooltip: 60
};

// Consistent button styles
export const buttonStyles = {
  primary: {
    background: colors.brand.black,
    color: colors.brand.white,
    hover: {
      background: '#1a1a1a'
    }
  },
  secondary: {
    background: colors.background.tertiary,
    color: colors.text.primary,
    hover: {
      background: colors.border.light
    }
  },
  ghost: {
    background: 'transparent',
    color: colors.text.secondary,
    hover: {
      background: colors.background.secondary,
      color: colors.text.primary
    }
  },
  gradient: {
    background: `linear-gradient(135deg, ${colors.brand.black} 0%, ${colors.brand.purple} 100%)`,
    color: colors.brand.white
  }
};

// Focus styles
export const focusStyles = {
  ring: `0 0 0 2px ${colors.border.focus}`,
  outline: 'none'
};