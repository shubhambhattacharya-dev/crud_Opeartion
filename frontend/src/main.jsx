import * as React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import * as ReactDOM from 'react-dom/client'
import "./index.css";   


import App from './App'
import { BrowserRouter } from 'react-router-dom'


const rootElement = document.getElementById('root')
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
     <BrowserRouter>
    <ChakraProvider>
     
      <App />
   
    </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>,
)