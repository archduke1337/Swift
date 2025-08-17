import plugin from 'tailwindcss/plugin'

export const customPlugin = plugin(function({ addUtilities }) {
  addUtilities({
    '.theme-transition': {
      'transition-property': 'color, background-color, border-color, box-shadow',
      'transition-duration': '200ms',
      'transition-timing-function': 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
    '.theme-transition-all': {
      'transition-property': 'all',
      'transition-duration': '200ms',
      'transition-timing-function': 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
    '.hover-lift': {
      '@apply transition-transform hover:-translate-y-1 hover:shadow-lg': {},
    },
    '.hover-grow': {
      '@apply transition-all duration-300 ease-out hover:scale-105 hover:shadow-lg': {},
    },
    '.hover-shrink': {
      '@apply transition-all duration-300 ease-out hover:scale-95 hover:opacity-90': {},
    },
    '.hover-glow': {
      '@apply transition-all duration-300': {},
      '&:hover': {
        'box-shadow': '0 0 20px rgba(0, 188, 212, 0.5)',
      },
    },
    '.card-hover': {
      '@apply transition-all duration-300 hover:-translate-y-1 hover:shadow-lg': {},
    },
    '.button-hover': {
      '@apply transform transition-all duration-300 hover:scale-105 hover:shadow-md active:scale-95': {},
    },
    '.glass-effect': {
      '@apply bg-opacity-20 backdrop-blur-lg backdrop-saturate-150 border border-white/20': {},
    },
    '.text-gradient': {
      'background-clip': 'text',
      '-webkit-background-clip': 'text',
      '-webkit-text-fill-color': 'transparent',
      'background-image': 'linear-gradient(45deg, #00BCD4, #006064)',
    },
  })
})
