/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        blue:'#003E71',
        blueDark:'#002442',
        blueAccent:'#ADC1DC',
        white:'#ffffff',
        whiteAccent:'#F4F4F4'
      },
      fontSize:{
        base:'1rem',
        primaryHeading:'5rem',
        secondaryHeading:'2.5rem',
        tertiaryHeading:'1.5rem'
      },
      screens: {
        'xs': '480px',
        'sm': '600px',  
        'md': '768px',
        'lg': '1024px',  
        'xl': '1280px',  
        '2xl': '1536px', 
        '3xl': '1920px', 
      },
    },
  },
  plugins: [],
}