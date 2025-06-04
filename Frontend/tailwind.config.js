/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx}",
        "./src/components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'kmit-teal': {
                    DEFAULT: '#14B8A6',
                    80: '#2EC4B6',
                    90: '#1ABFAA',
                },
            },
        },
    },
    plugins: [],
  };