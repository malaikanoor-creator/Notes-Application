import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { store } from './store.js'
import { Provider } from 'react-redux'
import { Toaster } from 'react-hot-toast';
import Notes from './Notes.jsx'
import Notes2 from './Notes2.jsx'

createRoot(document.getElementById('root')).render(
 <>
    <Provider store={store}>
      
     <Toaster/>
     <App /> 
    <Notes/> 
    </Provider>
  </>
)
