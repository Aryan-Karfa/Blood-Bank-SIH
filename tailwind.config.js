/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        appbg: '#F4F3EF',
        surface: {
          DEFAULT: '#FFFFFF',
          secondary: '#EAE9E4',
        },
        border: {
          DEFAULT: '#C9C8C2',
          strong: '#9C9A91',
        },
        content: {
          primary: '#171817',
          secondary: '#3D3E3A',
          muted: '#5D5E5A',
        },
        blood: '#BB0A1E',
        critical: {
          DEFAULT: '#BB0A1E',
          bg: '#FEF3F2',
          border: '#FECDCA',
        },
        warning: {
          DEFAULT: '#A15C00',
          bg: '#FFFAEB',
          border: '#FEDF89',
        },
        success: {
          DEFAULT: '#216E4E',
          bg: '#EDF7EE',
          border: '#B7DFB9',
        },
        info: {
          DEFAULT: '#245B73',
          bg: '#F0F7FA',
          border: '#C2E2EF',
        },
      },
      fontFamily: {
        sans: ['"IBM Plex Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
        condensed: ['"IBM Plex Sans Condensed"', 'sans-serif'],
      },
      borderRadius: {
        none: '0px',
        xs: '2px',
        sm: '2px',
        DEFAULT: '4px',
        md: '4px',
        lg: '6px',
      },
      boxShadow: {
        none: 'none',
      },
    },
  },
  plugins: [],
};
