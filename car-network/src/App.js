import './App.css';
import SignIn from './pages/SignIn';

import { Amplify } from 'aws-amplify';
import config from './aws-exports';

import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

console.log('aws config', config)
Amplify.configure({config});

function App() {
  return (
    <Authenticator>
    {({ signOut, user }) => (
      <main>
        <h1>Hello {user.username}</h1>
        <button onClick={signOut}>Sign out</button>
      </main>
    )}
  </Authenticator>
  );
}

export default App;
