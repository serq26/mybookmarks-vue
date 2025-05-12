import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi'

export default createVuetify({
  theme: {
    defaultTheme: 'dark',
    themes: {
      dark: {
        dark: true,
        colors: {
          background: '#121212',
          surface: '#1e1e1e',
          primary: '#bb86fc',
          secondary: '#03dac6',
          error: '#cf6679',
          onBackground: '#eaeaea',
          onSurface: '#eaeaea',
        }
      },
      light: {
        dark: false,
        colors: {
          background: '#ffffff',
          surface: '#f5f5f5',
          primary: '#6200ea',
          secondary: '#03dac6',
          error: '#b00020',
          onBackground: '#000000',
          onSurface: '#000000',
        }
      }
    }
  },
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
})
