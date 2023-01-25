import React from 'react';
import ReactDOM from 'react-dom/client';
import './Styles/global.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { Amplify } from 'aws-amplify';

import AWS from 'aws-sdk';
Amplify.configure({
    // OPTIONAL - if your API requires authentication 
    API: {
        endpoints: [
            {
                name: process.env.REACT_APP_API_NAME,
                endpoint: process.env.REACT_APP_AOI_ENDPOINT
            }
        ]
    }
});

AWS.config.region = process.env.REACT_APP_REGION;

AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: process.env.REACT_APP_POOLID
});

// Obtain the credentials
AWS.config.credentials.get(function(error) {
    if (error) {
      console.error(`Error obtaining credentials: ${error}`);
    } else {
      console.log(`Successfully obtained credentials`);
    }
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
