import SearchBar from './src/components/SearchBar';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Poppins: ["Poppins", "sans-serif"],
        Rubik: ["Rubik", "sans-serif"],
      },
      colors: {
        lightBlue: "#1d242c",
        darkBlue: "#16191e",
        darkTextColor: "#8e9196",
        lightTextColor: "#e2e8f0",
        lightTextColorSideNav: "#e7e5e4",
        blueTextColor: "#3b82f6",
        // btn
        blueBtnHoverColor: "#1e3a8a",
        blueBtnColor: "#2563eb",

        SearchBarBorderColor:"#52525b",

        darkTitle: "#e9e9e9",
        darkSongname: "#ffffffd6",
        skyBlue: "#007aff",
        grayBackground: "#1f2937",
      },
      screens: {
        xxs: "325px",
      },
    },
  },
  plugins: [],
};

