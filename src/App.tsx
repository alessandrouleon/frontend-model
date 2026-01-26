import { BrowserRouter } from 'react-router'
import { ThemeProvider } from 'styled-components'
import { AuthProvider } from './contexts/AuthProvider'
import { AppRoutes } from './routes'
import { LightTheme } from './themes'
import { GlobalStyle } from './themes/global'

function App() {
  return (
    <ThemeProvider theme={LightTheme}>
      <GlobalStyle />
      <AuthProvider>
        <BrowserRouter>
         <AppRoutes /> 
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
