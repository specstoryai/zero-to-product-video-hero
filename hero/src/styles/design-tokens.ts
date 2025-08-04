export const colors = {
  // Match main app color scheme
  background: {
    primary: 'oklch(1 0 0)', // white in light mode
    secondary: 'oklch(0.97 0 0)',
    dark: 'oklch(0.145 0 0)', // dark background
    darkSecondary: 'oklch(0.205 0 0)'
  },
  
  text: {
    primary: 'oklch(0.145 0 0)', // dark text in light
    secondary: 'oklch(0.556 0 0)', // muted text
    inverse: 'oklch(0.985 0 0)', // light text in dark
    muted: 'oklch(0.708 0 0)'
  },
  
  brand: {
    primary: 'oklch(0.205 0 0)', // primary brand color
    secondary: 'oklch(0.922 0 0)',
    accent: 'oklch(0.97 0 0)'
  },
  
  medieval: {
    parchment: '#F4E8D0',
    parchmentDark: '#D4C5A0',
    ink: '#2C1810',
    candleGlow: '#FFA500',
    candleLight: '#FFE4B5'
  },
  
  modern: {
    codeEditor: 'oklch(0.205 0 0)', // matches card in dark mode
    codeText: 'oklch(0.985 0 0)',
    codeHighlight: 'oklch(0.269 0 0)',
    monitorGlow: '#00D4FF'
  },
  
  border: {
    default: 'oklch(0.922 0 0)',
    dark: 'oklch(1 0 0 / 10%)'
  }
};

export const typography = {
  fonts: {
    sans: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    outfit: 'Outfit, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    dmSans: '"DM Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    serif: 'Georgia, Cambria, "Times New Roman", Times, serif',
    mono: '"SF Mono", Monaco, "Inconsolata", "Fira Code", monospace'
  },
  
  sizes: {
    xs: 16,
    sm: 20,
    base: 24,
    lg: 28,
    xl: 32,
    '2xl': 40,
    '3xl': 48,
    '4xl': 56,
    '5xl': 72,
    '6xl': 96,
    '7xl': 120
  }
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 48,
  '3xl': 64
};

export const animation = {
  duration: {
    fast: 0.2,
    normal: 0.3,
    slow: 0.5,
    slower: 1.0
  },
  
  easing: {
    smooth: [0.16, 1, 0.3, 1],
    bounce: [0.34, 1.56, 0.64, 1],
    default: [0.4, 0, 0.2, 1]
  }
};