@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --gradient: linear-gradient(45deg, 
    #1a1a1a,
    #2d2d2d,
    #1a1a1a
  );
}

body {
  @apply bg-dark-900 text-gray-100;
  background-image: var(--gradient);
  background-size: 200% 200%;
  animation: gradient 15s ease infinite;
}

.card {
  @apply bg-dark-800/80 backdrop-blur-sm border border-dark-700 rounded-xl shadow-lg;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  @apply transform -translate-y-1 shadow-xl;
}

.btn {
  @apply px-4 py-2 rounded-lg font-medium transition-all duration-200;
}

.btn-primary {
  @apply bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg;
}

module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          50: '#f7f7f8',
          100: '#eeeef1',
          200: '#d9d9e0',
          300: '#b9b9c6',
          400: '#8f8fa3',
          500: '#6e6e87',
          600: '#55556d',
          700: '#454559',
          800: '#3b3b4b',
          900: '#27272f',
        }
      },
      animation: {
        'gradient': 'gradient 8s linear infinite',
      },
      keyframes: {
        gradient: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          },
        },
      }
    },
  },
  plugins: [],
}