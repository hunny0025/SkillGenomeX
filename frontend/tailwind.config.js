/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "#0B0F1A",
                panel: "#111827",
                accent: "#6C5CE7",
                'accent-hover': "#5A4BD1",
                success: "#10B981",
                warning: "#F59E0B",
                danger: "#EF4444",
                text: "#E5E7EB",
                muted: "#9CA3AF"
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
            }
        },
    },
    plugins: [],
}
