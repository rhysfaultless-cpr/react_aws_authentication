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

/*
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
*/

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
