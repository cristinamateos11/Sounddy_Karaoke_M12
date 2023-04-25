import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
//import Lyrics from './lyrics';
import Lyrics2 from './lyrics2';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
    {/*<Lyrics/>*/}
    <Lyrics2/>
  </React.StrictMode>
);


