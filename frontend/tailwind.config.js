/** @type {import('tailwindcss').Config} */
// This file extends Tailwind's default theme to include custom assets and fonts,
// and is required to load the 'tailwindcss-animate' plugin.
export const darkMode = ["class"];
export const content = [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
];
export const theme = {
    // Customization happens inside 'extend'
    extend: {
        backgroundImage: {
            // Defines the utility class 'bg-hero-gradient' for the "zoomed" background
            'hero-gradient': "url('/assets/gradient_background.jpg')",
        },
        fontFamily: {
            // Defines the utility class 'font-display' for the serif title
            display: ['"Abril Fatface"', 'serif'],
            sans: ['"Inter"', 'sans-serif'], // Standard font for body text
        },
        colors: {
            // Custom colors defined to match the high-contrast button design from Image 1
            'primary': 'oklch(0.145 0 0)', // Near black for primary button
            'primary-foreground': 'oklch(1 0 0)', // White text
            'secondary': 'oklch(1 0 0)', // White for secondary button
            'secondary-foreground': 'oklch(0.145 0 0)', // Near black text


            // Retaining standard shadcn colors using your OKLCH variables
            'border': 'hsl(var(--border))',
            'input': 'hsl(var(--input))',
            'ring': 'hsl(var(--ring))',
            'background': 'oklch(1 0 0)',
            'foreground': 'oklch(0.145 0 0)',
        }
    },
};
export const plugins = [
    require("tailwindcss-animate"),
];
