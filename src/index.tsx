import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './components/app'; 
import PhonestoreService from './services/phonestore-service';
import { PhonestoreServiceProvider } from './components/context/phonestore-service-context'

const phonestoreService = new PhonestoreService();

ReactDOM.render(
    <PhonestoreServiceProvider value={phonestoreService}>
      <Router>
        <App />    
      </Router>
    </PhonestoreServiceProvider>
  ,
  document.getElementById('root')
);