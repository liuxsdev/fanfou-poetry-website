/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      serif: ["方正细金陵简体", "方正仿宋", "仿宋", "serif"],
      sans: ["梦源黑体 L CN", "Microsoft Yahei", "微软雅黑", "sans-serif"],
    },
    extend: {},
  },
  plugins: [],
};
