import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
    components: {
        Checkbox: {
          baseStyle: {
            control: {
              borderColor: "#256de9",
              _checked: {
                bg: "#050e68"
              }
            }
          }
        }
      },

    colors:{
      blue:{
          "300" : "#256de9",
          "500" : "#050e68",
          
      },
      white: "#ffffff",
      black: "#000000"
    },

    fonts:{
        heading: 'Poppins, Arial, Helvetica, sans-serif',
        body: 'Poppins, Arial, Helvetica, sans-serif',
    },
    
    styles:{
        global:{
            body:{
                bg: 'white',
                color: 'black',
            },
        },
        
    },

    breakpoints:{
        base : '0em',   //0px and values above
        sm: '20em',     //320px ...
        md: '48em',     //768px ...
        lg: '64em',     //1024px ...
        xl: '80em',     //1280px ...
        "xl2": '120em', //1920px ...

        //chakra converts this into an array : ['0em','30em', '48em', '62em', '80em'], that's used to make the application responsiviness
    },

    fontSizes: {
        xs: "0.75rem",     //12px
        sm: "0.875rem",    //14px
        md: "1rem",        //16px
        lg: "1.125rem",    //18px
        xl: "1.25rem",     //20px
        "2xl": "1.5rem",   //24px
        "3xl": "1.75rem",  //28px
      },

    fontWeights: {
        hairline: 100,
        thin: 200,
        light: 300,
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
        extrabold: 800,
        black: 900,
    },

})



