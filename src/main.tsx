import "./polyFills"
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ApolloWrapper from "../src/context/apolloClient.tsx"
import {AppProvider} from "./context/myContext.tsx"
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApolloWrapper>
      <AppProvider>
        <App />
      </AppProvider>
    </ApolloWrapper>   
  </StrictMode>,
)
