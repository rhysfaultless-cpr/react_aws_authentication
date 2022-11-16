import './App.css';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from "react-router-dom";
  
// import Home component
import HomePage from "./HomePage";
import PageA from "./PageA";
import PageB from "./PageB";

import { Amplify, Auth } from 'aws-amplify';
// import awsconfig from './aws-exports';
// Amplify.configure(awsconfig);

import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import awsExports from './aws-exports';
Amplify.configure(awsExports);

//const currentUser = Auth.currentAuthenticatedUser();
const curerentUser = Auth.currentAuthenticatedUser({
  bypassCache: false  // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
}).then(
  user => console.log(user)
)
.catch(err => console.log(err));
//console.log(currentUser['signInUserSession']['accessToken']['payload']['cognito:groups'])

function App({ signOut, user }) {

  return (
    <>
      <Router>
        <div>
          <h1>Hello {user.username}</h1>

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
