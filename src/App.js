import './App.css';

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import { useState, useEffect } from 'react';

import HomePage from "./HomePage";
import PageA from "./PageA";
import PageB from "./PageB";
import PageBlocked from "./PageBlocked";

import { Amplify, Auth } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import awsExports from './aws-exports';
Amplify.configure(awsExports);

async function fetchTenant(setTenant, setUserIsCustomer, setUserIsReseller, setUserIsEmployee) {
  // get the access token of the signed in user
  const {accessToken} = await Auth.currentSession();
  // get the tenant from the top of the cognito groups list
  const cognitogroups = accessToken.payload['cognito:groups'];
  const tenant = cognitogroups[0];
  setTenant(tenant);
  setUserIsCustomer(tenant.indexOf('customer') !== -1);
  setUserIsReseller(tenant.indexOf('reseller') !== -1);
  setUserIsEmployee(tenant.indexOf('employee') !== -1);
}

function App({ signOut, user }) {

  const [tenant, setTenant] = useState('');
  const [userIsCustomer, setUserIsCustomer] = useState(false);
  const [userIsReseller, setUserIsReseller] = useState(false);
  const [userIsEmployee, setUserIsEmployee] = useState(false);

  useEffect(() => {
    fetchTenant(setTenant, setUserIsCustomer, setUserIsReseller, setUserIsEmployee);
  }, []);

  return (
    <>
      <Router>
        <div>
          <h1>Hello {user.username}</h1>
          <p>Current User's Group includes 'customer': {String(tenant.indexOf('customer') !== -1)}</p>
          <p>Current User's Group includes 'reseller': {String(tenant.indexOf('reseller') !== -1)}</p>
          <p>Current User's Group includes 'employee': {String(tenant.indexOf('employee') !== -1)}</p>
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
            {!userIsCustomer && <Route path="/pagea" element={<PageBlocked />} />}
            {userIsCustomer && <Route path="/pagea" element={<PageA />} />}
            {!userIsEmployee && <Route path="/pageb" element={<PageBlocked />} />}
            {userIsEmployee && <Route path="/pageb" element={<PageB />} />}
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default withAuthenticator(App);
