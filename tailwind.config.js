/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/**/*.html"],
  theme: {
    extend: {
      inset: {
        90: "90%",
      },
    },
  },
  plugins: [],
};
