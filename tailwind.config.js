export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
      },
      colors: {
        primary: '#8B5CF6',
        secondary: '#EC4899',
        background: '#0F172A',
        card: '#1E293B',
        card_light: '#334155',
        text_primary: '#F1F5F9',
        text_secondary: '#94A3B8',
      },
    },
  },
  plugins: [],
}
