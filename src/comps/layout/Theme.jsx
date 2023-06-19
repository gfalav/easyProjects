export default function Theme(){
    const theme = {
        typography: {
          fontFamily: [
            'Open Sans Condensed',
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
          ].join(','),
        },
        palette: {
          warn: {
            light: '#fae4a7',
            main: '#ffd769',
            dark: '#fcbb08',
            contrastText: 'rgba(0, 0, 0, 0.87)'
          },
          back: {
            light: '#000000',
            main: '#000000',
            dark: '#000000',
            contrastText: 'rgba(0, 0, 0, 0.87)'
          },
          adv: {
            light: '#bdecff',
            main: '#70d7ff',
            dark: '#19bcfc',
            contrastText: 'rgba(0, 0, 0, 0.87)'
          }
        },
      }

    return (theme)
}