import React, { useState } from 'react';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import TransferSol from './components/TransferSol';

const App = () => {
  const [isSignIn, setIsSignIn] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white flex items-center justify-center p-4 font-inter">
      {/* {isSignIn ? (
        <SignIn onSwitchToSignUp={() => setIsSignIn(false)} />
      ) : (
        <SignUp onSwitchToSignIn={() => setIsSignIn(true)} />
      )} */}

      <TransferSol />
    </div>
  );
};
export default App
