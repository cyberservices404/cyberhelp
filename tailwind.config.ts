import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f4ff',
          100: '#e0e9ff',
          200: '#c7d7fe',
          300: '#a5bbfc',
          400: '#8195f8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#0f172b',
          800: '#3730a3',
          900: '#312e81',
          950: '#1e1b4b',
        },
        blue: {
          700: "#0f172b"
        }
      },
    },
  },
  plugins: [],
};
export default config;
