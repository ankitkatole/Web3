import React from 'react';

import {
  WalletModalProvider,
  WalletDisconnectButton,
  WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
const Hero = () => {
  return (
    <div className="hero bg-base-200 mt-5">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-4xl font-bold">Welcome to SolDrop</h1>
          <p className="py-6">
            Ready to sprinkle some SOL magic? 🌟 Dive into our Devnet airdrops! It's like a free candy store, but for developers! Get your hands on some pretend tokens—because who doesn't love a good simulation?
          </p>
          <WalletMultiButton />
        </div>
      </div>
    </div>
  )
}

export default Hero
