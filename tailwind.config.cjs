/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            boxShadow: {
                main: "0 2px 10px 2px rgba(0,0,0,0.25)",
                sub: "0 2px 6px 0 rgba(0,0,0,0.25)",
            },
            lineHeight: 1.5,
        },
        colors: {
            transparent: "transparent",
            primary: {
                1: "#263F59",
                2: "#4D7EB3",
                3: "#A6BED9",
                4: "#e6f0ff",
            },
            accent: {
                1: "#FC8403",
                2: "#FECE9A",
            },
            neutron: {
                1: "#16181D",
                2: "#656A81",
                3: "#F6F6F6",
                4: "#FFFFFF",
            },
            warning: { 1: "#D83704", 2: "#FFCDD2" },
            hoverBg: "rgba(0,0,0,0.08)",
        },
        screens: {
            "3xl": { max: "1800px" },

            "2xl": { max: "1600px" },

            xl: { max: "1279px" },

            lg: { max: "1023px" },

            md: { max: "767px" },

            sm: { max: "639px" },
        },
    },
    plugins: [],
}
