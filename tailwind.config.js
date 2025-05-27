// tailwind.config.js
module.exports = {
  content: [
    "./index.html", // Include your index.html
    "./src/**/*.{js,ts,jsx,tsx}", // Include your source code files
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [
    require("tailwind-scrollbar-hide")

  ],
};