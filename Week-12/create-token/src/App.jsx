import { useState, useMemo } from 'react'
import {ConnectionProvider, WalletProvider} from '@solana/wallet-adapter-react';
import {WalletAdapterNetwork} from '@solana/wallet-adapter-base';
import {UnsafeBurnerWalletAdapter} from '@solana/wallet-adapter-wallets';
import {
  WalletModalProvider,
  WalletDisconnectButton,
  WalletMultiButton,
  WalletModal,
} from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';
import '@solana/wallet-adapter-react-ui/styles.css';

function App() {
  const [token,setToken] = useState(null);
  
  const network = WalletAdapterNetwork.Devnet;
  const endpoint = import.meta.env.VITE_DEVNET_URI || clusterApiUrl(network);

  return (
    <>
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={[]} autoconnect>
          <WalletModalProvider>
            <WalletMultiButton />
            <WalletDisconnectButton />

          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>

    </>
  )
}

export default App
