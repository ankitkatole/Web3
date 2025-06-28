import React, { useState, FC, useMemo } from 'react';
import { useConnection, useWallet, ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { UnsafeBurnerWalletAdapter } from '@solana/wallet-adapter-wallets';
import {
    WalletModalProvider,
    WalletDisconnectButton,
    WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';
import '@solana/wallet-adapter-react-ui/styles.css';
import { SignMessage } from './SignMessage';

const Airdrop = () => {
    const wallet = useWallet();
    const { connection } = useConnection();

    async function getBalance() {
        if (wallet.publicKey) {

            const balance = await connection.getBalance(wallet.publicKey);
            document.getElementById("balance").innerHTML = `${balance / LAMPORTS_PER_SOL} SOL`;
        }
    }
    const [alertVisible, setAlertVisible] = useState(false);
    const [errorVisible, setErrorVisible] = useState(false);
    const [amount, setAmount] = useState('');


    if (wallet.connected && wallet.publicKey) {
        console.log(wallet.publicKey);
    } else {
        console.log("Wallet Not Connected");
    }

    const sendAirdrop = async () => {
    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
        alert("Enter a valid amount");
        return;
    }

    try {
        const lamports = parseFloat(amount) * LAMPORTS_PER_SOL;
        const res = await connection.requestAirdrop(wallet.publicKey, lamports);
        console.log("Airdrop signature:", res);
        setAlertVisible(true);
        setErrorVisible(false);
    } catch (error) {
        console.error("Airdrop failed:", error);
        setErrorVisible(true);
        setAlertVisible(false);
    }
};
    getBalance();
    return (
        <div className='flex flex-col justify-around mt-5 space-y-2 md:space-y-0 md:flex-row '>
            <div className="flex text-center stats bg-primary text-primary-content">
                <div className="stat">
                    <div className="text-black stat-title"><h2 className='mt-3 text-4xl font-bold text-center '>Balance</h2></div>
                    <div id="balance" className="text-2xl text-white stat-value">Connect to Wallet</div>
                </div>
            </div>
            {/* <SignMessage /> */}
            <div>
                <h3 className='mt-3 text-4xl font-bold text-center '>Airdrop Sols</h3>
                <div className='flex justify-center mt-4 flex-colspace-y-2 md:space-x-2'>
                    <input
                        type='text'
                        id="amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder='Enter Amount To AirDrop'
                        className="w-full max-w-xs input input-bordered input-accent"
                    />
                    <button
                        onClick={wallet.connected && wallet.publicKey ? sendAirdrop : () => alert("Wallet not Connected")}
                        className="btn btn-outline btn-info"
                    >
                        Send Airdrop
                    </button>

                    {alertVisible && (
                        <div role="alert" className="mt-4 alert alert-success">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-6 h-6 stroke-current shrink-0"
                                fill="none"
                                viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                            <span>Your Airdrop has been sent successfully!</span>
                        </div>
                    )}

                    {errorVisible && (
                        <div role="alert" className="mt-4 alert alert-error">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-6 h-6 stroke-current shrink-0"
                                fill="none"
                                viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                            <span>Error! Task failed successfully.</span>
                        </div>
                    )}
                </div>
            </div>

        </div>
    );
};

export default Airdrop;
