import './App.css';

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import { useState, useEffect } from 'react';

import HomePage from "./HomePage";
import PageA from "./PageA";
import PageB from "./PageB";

import { Amplify, Auth } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import awsExports from './aws-exports';
Amplify.configure(awsExports);

async function fetchTenant(setTenant) {
  // get the access token of the signed in user
  const {accessToken} = await Auth.currentSession();
  // get the tenant from the top of the cognito groups list
  const cognitogroups = accessToken.payload['cognito:groups'];
  const tenant = cognitogroups[0];
  setTenant(tenant);
}


function App({ signOut, user }) {

  const [tenant, setTenant] = useState('');
  useEffect(() => {
    fetchTenant(setTenant);
  }, []);

  return (
    <>
      <Router>
        <div>
          <h1>Hello {user.username}</h1>
          <p>Current User's Groups: {tenant}</p>
          <button onClick={signOut}>Sign out</button>

          <hr />
          
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/pagea">Page A</Link>
            </li>
            <li>
              <Link to="/pageb">Page B</Link>
            </li>
          </ul>

          <hr />

          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/pagea" element={<PageA />} />
            <Route path="/pageb" element={<PageB />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default withAuthenticator(App);
