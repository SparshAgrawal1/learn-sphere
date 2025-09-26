import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        tertiary: {
          DEFAULT: "hsl(var(--tertiary))",
          foreground: "hsl(var(--tertiary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        success: {
          DEFAULT: "hsl(var(--success))",
          foreground: "hsl(var(--success-foreground))",
        },
        warning: {
          DEFAULT: "hsl(var(--warning))",
          foreground: "hsl(var(--warning-foreground))",
        },
        info: {
          DEFAULT: "hsl(var(--info))",
          foreground: "hsl(var(--info-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        chat: {
          user: "hsl(var(--chat-user))",
          ai: "hsl(var(--chat-ai))",
          bg: "hsl(var(--chat-bg))",
        },
        sphere: {
          physics: "hsl(var(--sphere-physics))",
          chemistry: "hsl(var(--sphere-chemistry))",
          math: "hsl(var(--sphere-math))",
          biology: "hsl(var(--sphere-biology))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius-lg)",
        md: "var(--radius-md)",
        sm: "var(--radius-sm)",
        xl: "var(--radius-xl)",
        "2xl": "var(--radius-2xl)",
        full: "var(--radius-full)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg) scale(1)" },
          "33%": { transform: "translateY(-15px) rotate(2deg) scale(1.02)" },
          "66%": { transform: "translateY(8px) rotate(-1deg) scale(0.98)" },
        },
        "rotate": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        "pulse": {
          "0%, 100%": { opacity: "0.9", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.05)" },
        },
        "shimmer": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        "progress-shine": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        "pulse-success": {
          "0%": { boxShadow: "0 0 0 0 hsl(var(--success) / 0.7)", transform: "scale(1)" },
          "50%": { boxShadow: "0 0 0 15px hsl(var(--success) / 0.3)", transform: "scale(1.05)" },
          "100%": { boxShadow: "0 0 0 0 hsl(var(--success) / 0)", transform: "scale(1)" },
        },
        "shake-error": {
          "0%, 100%": { transform: "translateX(0) rotate(0deg)" },
          "10%, 30%, 50%, 70%, 90%": { transform: "translateX(-8px) rotate(-2deg)" },
          "20%, 40%, 60%, 80%": { transform: "translateX(8px) rotate(2deg)" },
        },
        "bounce-in": {
          "0%": { transform: "scale(0.3) rotate(-10deg)", opacity: "0" },
          "50%": { transform: "scale(1.1) rotate(5deg)", opacity: "0.8" },
          "100%": { transform: "scale(1) rotate(0deg)", opacity: "1" },
        },
        "slide-up": {
          "0%": { transform: "translateY(30px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "glow-pulse": {
          "0%, 100%": { boxShadow: "0 0 20px hsl(var(--primary) / 0.3)" },
          "50%": { boxShadow: "0 0 40px hsl(var(--primary) / 0.6), 0 0 60px hsl(var(--primary) / 0.3)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "float": "float 6s ease-in-out infinite",
        "rotate": "rotate 20s linear infinite",
        "pulse": "pulse 2s ease-in-out infinite",
        "shimmer": "shimmer 2s infinite",
        "progress-shine": "progress-shine 1.5s infinite",
        "pulse-success": "pulse-success 1.5s ease-out",
        "shake-error": "shake-error 0.5s ease-in-out",
        "bounce-in": "bounce-in 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
        "slide-up": "slide-up 0.5s ease-out",
        "fade-in": "fade-in 0.3s ease-out",
        "glow-pulse": "glow-pulse 2s ease-in-out infinite",
      },
      boxShadow: {
        'sm': 'var(--shadow-sm)',
        'md': 'var(--shadow-md)',
        'lg': 'var(--shadow-lg)',
        'xl': 'var(--shadow-xl)',
        '2xl': 'var(--shadow-2xl)',
        'inner': 'var(--shadow-inner)',
        'glow': 'var(--shadow-glow)',
        'glow-cyan': 'var(--shadow-glow-cyan)',
        'glow-pink': 'var(--shadow-glow-pink)',
        'neo-light': 'var(--neo-light)',
        'neo-dark': 'var(--neo-dark)',
        'neo-inset-light': 'var(--neo-inset-light)',
        'neo-inset-dark': 'var(--neo-inset-dark)',
        'neo-pressed': 'var(--neo-pressed)',
        'neo-hover': 'var(--neo-hover)',
        'neo-active': 'var(--neo-active)',
      },
      backgroundImage: {
        'gradient-primary': 'var(--gradient-primary)',
        'gradient-secondary': 'var(--gradient-secondary)',
        'gradient-tertiary': 'var(--gradient-tertiary)',
        'gradient-hero': 'var(--gradient-hero)',
        'gradient-sphere': 'var(--gradient-sphere)',
        'gradient-card': 'var(--gradient-card)',
        'gradient-glass': 'var(--gradient-glass)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
