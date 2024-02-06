import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.css'
import { SnackbarProvider } from 'notistack';


// import * as serviceWorker from './serviceWorker';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <SnackbarProvider maxSnack={3}>
    <App />
  </SnackbarProvider>
);