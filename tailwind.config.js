/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#10B981", // Emerald Green (Buy/Sell Buttons)
        secondary: "#2563EB", // Deep Blue (Other CTAs)
        bgColor: "#F9FAFB", // Soft Gray (Background)
        darkGray: "#1F2937", // Header/Footer
        textPrimary: "#111827", // Charcoal Black (Main Text)
        textSecondary: "#6B7280", // Cool Gray (Secondary Text)
        hover: "#34D399", // Light Green (Hover Effect)
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"], // Modern Sans-Serif Font
        heading: ["Poppins", "sans-serif"], // Stylish Heading Font
      },
      fontSize: {
        sm: "0.875rem", // Small Text
        base: "1rem", // Default Text
        lg: "1.125rem", // Large Text
        xl: "1.25rem", // Extra Large Text
        "2xl": "1.5rem", // Section Titles
        "3xl": "1.875rem", // Page Titles
      },
      spacing: {
        18: "4.5rem", // Custom Spacing
        22: "5.5rem",
        28: "7rem",
      },
      borderRadius: {
        md: "0.375rem", // Medium Rounded Corners
        lg: "0.5rem", // Large Rounded Corners
        xl: "0.75rem", // Extra Large
      },
      boxShadow: {
        card: "0 4px 10px rgba(0, 0, 0, 0.1)", // Custom Shadow for Cards
        button: "0 2px 8px rgba(16, 185, 129, 0.3)", // Soft Glow for Buttons
      },
    },
  },
  plugins: [],
}

