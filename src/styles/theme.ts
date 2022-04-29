import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
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
        }
    },

    breakpoints:{
        base : '0em',   //0px and values above
        sm: '20em',     //320px ...
        md: '48em',     //768px ...
        lg: '62em',     //992px ...
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
        "4xl": "2.1875rem",//35px  
        "5xl": "2.5rem",   //40px
        "6xl": "3.125rem", //50px
        "7xl": "3.5rem",   //56px
        "8xl": "4.375rem", //70px
        "9xl": "8rem",     //128px
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



