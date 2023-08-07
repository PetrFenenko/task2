/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        // Simple 16 column grid
        notes: "19% 12.5% 12.5% 27% 10% 14%",
        summary: "40% 20% 40%",
      },
    },
    plugins: [],
  },
};
