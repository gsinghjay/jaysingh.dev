/** @type {import('tailwindcss').Config} */
export default {
  content: [
    // 11ty templates
    './_includes/**/*.njk',
    './_content/**/*.njk',
    './_content/**/*.md',
    './*.njk',
    './js/**/*.js',
  ],
  theme: {
    extend: {
      colors: {
        cream: '#FFFBEB',
      },
      fontFamily: {
        mono: ['ui-monospace', 'SFMono-Regular', 'SF Mono', 'Menlo', 'Consolas', 'Liberation Mono', 'monospace'],
      },
      boxShadow: {
        'brutal-sm': '3px 3px 0 #000',
        'brutal': '4px 4px 0 #000',
        'brutal-md': '6px 6px 0 #000',
        'brutal-lg': '8px 8px 0 #000',
      },
      borderRadius: {
        'none': '0',
      },
    },
  },
  plugins: [],
};
