import './App.css';

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import { useState, useEffect } from 'react';

import HomePage from "./HomePage";
import PageA from "./PageA";
import PageB from "./PageB";
import PageC from "./PageC";
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
  const tenant = cognitogroups;
  setTenant(tenant);
  const tempUserIsCustomer = (tenant.indexOf('employee') !== -1) || (tenant.indexOf('reseller') !== -1) || (tenant.indexOf('customer') !== -1)
  const tempUserIsReseller = (tenant.indexOf('employee') !== -1) || (tenant.indexOf('reseller') !== -1)
  const tempUserIsEmployee = (tenant.indexOf('employee') !== -1)
  setUserIsCustomer(tempUserIsCustomer);
  setUserIsReseller(tempUserIsReseller);
  setUserIsEmployee(tempUserIsEmployee);
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
          <p>Current User's Group includes <em>customer</em>: <b>{String(userIsCustomer)}</b></p>
          <p>Current User's Group includes <em>reseller</em>: <b>{String(userIsReseller)}</b></p>
          <p>Current User's Group includes <em>employee</em>: <b>{String(userIsEmployee)}</b></p>
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
            <li>
              <Link to="/pagec">Page C</Link>
            </li>
          </ul>

          <hr />

          <Routes>
            <Route path="/" element={<HomePage />} />
            {!userIsCustomer && <Route path="/pagea" element={<PageBlocked />} />}
            {userIsCustomer && <Route path="/pagea" element={<PageA />} />}
            {!userIsReseller && <Route path="/pageb" element={<PageBlocked />} />}
            {userIsReseller && <Route path="/pageb" element={<PageB />} />}
            {!userIsEmployee && <Route path="/pagec" element={<PageBlocked />} />}
            {userIsEmployee && <Route path="/pagec" element={<PageC />} />}
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default withAuthenticator(App);
