import { useState, useMemo } from 'react'
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { UnsafeBurnerWalletAdapter } from '@solana/wallet-adapter-wallets';
import {
  WalletModalProvider,
  WalletDisconnectButton,
  WalletMultiButton,
  WalletModal,
} from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';
import '@solana/wallet-adapter-react-ui/styles.css';
import { CreateToken } from './components/CreateToken';
import MintToken from './components/MintToken';

function App() {
  const [token, setToken] = useState(null);
  const [mintDone, setMintDone] = useState(false);


  const network = WalletAdapterNetwork.Devnet;
  const endpoint = import.meta.env.VITE_DEVNET_URI;

  return (
    <>
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={[]} autoconnect>
          <WalletModalProvider>
            <div className='relative flex flex-col min-h-screen bg-gray-100'>
              <div className='flex flex-col items-center justify-between gap-10 p-4 md:flex-row'>
                <h1 className='text-4xl font-bold '>Solana Token Generator</h1>
                {token && <div className='flex justify-center p-4'>
                <h2 className='text-2xl '>Token Mint Address: {token.toBase58()}</h2>
              </div>}
                <div className='flex flex-row items-center space-x-4'>
                  <WalletMultiButton />
                  <WalletDisconnectButton />
                </div>
              </div>
              

              <div className="flex flex-col items-center justify-center flex-grow p-4 md:flex-row">
                
                <CreateToken onTokenCreate={(tokenMint) => {
                  setToken(tokenMint);
                }} />
                {/* <MintToken onDone={() => setMintDone(true)} mintAddress={token} /> */}
                {token && <MintToken onDone={() => setMintDone(true)} mintAddress={token} />}
              </div>
            </div>
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </>
  )
}

export default App