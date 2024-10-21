import React, { FC, useMemo } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { UnsafeBurnerWalletAdapter } from '@solana/wallet-adapter-wallets';
import {
  WalletModalProvider,
  WalletDisconnectButton,
  WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';

// Default styles that can be overridden by your app
import '@solana/wallet-adapter-react-ui/styles.css';
import Navbar from './Components/Navbar';
import ConnectionButtons from './Components/ConnectionButtons';
import Hero from './Components/Hero';
import Airdrop from './Components/Airdrop';
import Footer from './Components/Footer';

const App = () => {

  const RPC_URL = import.meta.env.VITE_RPC_URL;

  // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.
  const network = WalletAdapterNetwork.Devnet;

  // You can also provide a custom RPC endpoint.
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  return (
    <>
    <ConnectionProvider endpoint={RPC_URL}>
      <WalletProvider wallets={[]}>
        <WalletModalProvider>
    <Navbar />
    <Hero />
    <ConnectionButtons />
    <Airdrop />
    <Footer />
    </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
    </>
    
  )
}

export default App



