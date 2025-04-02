import { useState } from 'react'
import {
  QueryClient,
  QueryClientProvider,
  useQueryClient,
  useQuery,
} from '@tanstack/react-query'
import './App.css'
import { createPublicClient, http } from 'viem'
import { mainnet } from 'viem/chains'
 
const client = createPublicClient({ 
  chain: mainnet, 
  transport: http(), 
}) 

function App() {
  const [balance, setBalance] = useState(0)
  async function fetchBalance(){
    const ba = await client.getBalance({address: "0x075c299cf3b9FCF7C9fD5272cd2ed21A4688bEeD"})
    console.log(ba)
    setBalance(ba)
    return balance;
  }
  return (
    <>
      <h1>Etherium Wallet</h1>
        <h2>Balance: {balance} </h2>
        <button onClick={fetchBalance}>Fetch Balance</button>
    </>
  )
}

export default App
