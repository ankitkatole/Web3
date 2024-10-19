import React from 'react'
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { WalletReadyState } from '@solana/wallet-adapter-base';

const Airdrop = () => {

    const wallet = useWallet();
    const { connection } = useConnection();

     // Check if the wallet is connected and publicKey is not null
     if (wallet.connected && wallet.publicKey) {  
        console.log(wallet.publicKey) 
    } else {
        console.log("Wallet Not Connected")
    }

    async function sendairDrop() {
        let amount = document.getElementById("amount").value;
        await connection.requestAirdrop(wallet.publicKey, amount * LAMPORTS_PER_SOL);
        alert("Airdropped " + amount + " SOL to " + wallet.publicKey.toBase58());
    }


  return (
    <div>
        <br /> <br />
      <input type='text' id="amount" placeholder='Enter Amount To AirDrop' />
      <button onClick={wallet.connected && wallet.publicKey ? sendairDrop : ()=> alert("Wallet not Connected")} >Send Airdrop</button>
    </div>
  )
}

export default Airdrop
