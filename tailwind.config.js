/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        container: {
            padding: '2rem',
            center: true,
        },
        extend: {
            fontFamily: {
                roboto: ["Roboto", "sans-serif"]
            }
        },
    },
    plugins: [],
});

//require('@tailwindcss/forms'),