/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./<custom directory>/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#eee",
        secondary: { DEFAULT: "#17153B", 100: "#433D8B", 200: "#C8ACD6" },
        tertiary: "#C8ACD6",
      },
      fontFamily: {
        othin: ["Outfit-Thin", "sans-serif"],
        oextralight: ["Outfit-ExtraLight", "sans-serif"],
        olight: ["Outfit-Light", "sans-serif"],
        oregular: ["Outfit-Regular", "sans-serif"],
        omedium: ["Outfit-Medium", "sans-serif"],
        osemibold: ["Outfit-SemiBold", "sans-serif"],
        obold: ["Outfit-Bold", "sans-serif"],
        oextrabold: ["Outfit-ExtraBold", "sans-serif"],
        oblack: ["Outfit-Black", "sans-serif"],
      },
    },
  },
  plugins: [],
};
