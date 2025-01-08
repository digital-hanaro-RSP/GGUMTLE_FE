import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#F6F7F9',
        primary: {
          main: '#069894',
          error: '#D80000',
          disable: '#C0C0C0',
          placeholder: '#B9B9B9',
        },
        bucket: {
          want: '#FFF89F', // 해보고 싶다
          become: '#CDF5D8', // 되고 싶다
          have: '#CDF7F7', // 갖고 싶다
          visit: '#F5CFF6', // 가보고 싶다
          learn: '#F3D0CE', // 배우고 싶다
        },
      },
    },
  },
  plugins: [],
};
export default config;
