/** @type {import('tailwindcss').Config}*/
const config = {
    content: ["./src/**/*.{html,js,svelte,ts}"],

    theme: {
        extend: {
            colors: {
                primary: {
                    100: "#ffd231",
                },
                light: {
                    900: "#ffe895",
                },
                busBlue: {
                    100: "#3c2aa9",
                },
                busRed: {
                    100: "#e4002b",
                },
                busPurple: {
                    100: "#7a1fa2",
                },
                busCyan: {
                    100: "#00a1e4",
                },
                busBrown: {
                    100: "#a6703b",
                },
            },
            textColor: {
                dark: "#343434",
                light: "#F4F4F4",
            },
        },
    },

    plugins: [],
};

module.exports = config;
