/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        accent: "var(--color-accent)",
        neon: "var(--color-neon)",
        "bg-deep": "var(--color-bg)",
        glass: "var(--color-glass)"
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: 0, transform: "translateY(20px)" },
          "100%": { opacity: 1, transform: "translateY(0)" }
        },
        floatSoft: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" }
        },
        glowPulse: {
          "0%, 100%": { boxShadow: "0 0 18px rgba(42, 255, 163, 0.15)" },
          "50%": { boxShadow: "0 0 32px rgba(42, 255, 163, 0.3)" }
        },
        shimmer: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "100% 50%" }
        }
      },
      animation: {
        fadeUp: "fadeUp 0.7s ease-out forwards",
        floatSoft: "floatSoft 6s ease-in-out infinite",
        glowPulse: "glowPulse 3.4s ease-in-out infinite",
        shimmer: "shimmer 6s ease-in-out infinite"
      }
    }
  },
  plugins: []
};
