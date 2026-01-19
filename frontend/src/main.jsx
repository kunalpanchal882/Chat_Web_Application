import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import ChatProvider from './context/ChatProvider'

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
  <ChatProvider>
        <App />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="dark"
      />
  </ChatProvider>,
    </BrowserRouter>  
)
