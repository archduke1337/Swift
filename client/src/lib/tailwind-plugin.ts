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
      '@apply transition-transform hover:-translate-y-1': {},
    },
    '.hover-grow': {
      '@apply transition-transform hover:scale-105': {},
    },
    '.hover-shrink': {
      '@apply transition-transform hover:scale-95': {},
    },
  })
})
