import daisyui from 'daisyui';

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: ["dark"], // List the themes you want
    darkTheme: "dark", // (optional) sets the default dark theme
    // defaultTheme: "cupcake", // (optional) sets the default theme
  },
};

