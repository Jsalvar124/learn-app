import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter } from 'react-router-dom'



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename="/learn-app/">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <App />
        <Toaster position="top-right" />
      </LocalizationProvider>
    </BrowserRouter>
  </StrictMode>,
)
