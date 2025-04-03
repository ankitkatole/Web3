import { useState } from 'react'
import './App.css'

import {
  http,
  createConfig,
  WagmiProvider,
  useConnect, useAccount,
  useBalance,
  useDisconnect,
  useEnsAvatar,
  useEnsName,
  useSendTransaction
} from 'wagmi'

import { parseEther } from 'viem'
import { base, mainnet, optimism } from 'wagmi/chains'
import { injected, metaMask, safe, walletConnect } from 'wagmi/connectors'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()


export const config = createConfig({
  chains: [mainnet, base],
  connectors: [
    injected(),
    metaMask(),
    safe(),
  ],
  transports: {
    [mainnet.id]: http(),
    [base.id]: http(),
  },
})

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <WalletConnector />
          <Account />
          <SendTransaction />
        </QueryClientProvider>
      </WagmiProvider>
    </div>
  )
}

function WalletOptions() {
  const { connectors, connect } = useConnect()

  return connectors.map((connector) => (
    <button key={connector.uid} onClick={() => connect({ connector })}>
      {connector.name}
    </button>
  ))
}

function WalletConnector() {
  return (
    <>
      <WalletOptions />
    </>
  )
}

function Account() {
  const { address } = useAccount()
  const { disconnect } = useDisconnect()

  const balance = useBalance({
    address
  })

  return (
    <div>
      {address && <div>
        <h2>Your Address: {address}</h2>
        <h2>Your balance - {balance.data?.formatted}</h2>
        <button onClick={() => disconnect()}>Disconnect</button>
      </div>}

    </div>
  )
}


function SendTransaction() {
  const { data: hash, sendTransaction } = useSendTransaction()

  async function sendTx() {
      const to = document.getElementById("to").value;
      const value = document.getElementById("value").value;
      sendTransaction({ to, value: parseEther(value) });
  }

  // Todo: use refs here
  return <div>
    <input id="to" placeholder="0xA0Cf…251e" required />
    <input id="value" placeholder="0.05" required />
    <button onClick={sendTx}>Send</button>
    {hash && <div>Transaction Hash: {hash}</div>}
  </div>
}

export default App
