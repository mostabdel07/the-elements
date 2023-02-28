/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js}",
    "./node_modules/tw-elements/dist/js/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        "ctm-purple": "#191528",
        "ctm-light": "#F1FAEE",
        "ctm-darck": "#110E1B",
        "ctm-red": "#E63946",
        "ctm-light-blue": "#A8DADC",
      },
    },
  },
  plugins: [require("tw-elements/dist/plugin")],
};
