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

// Default styles that can be overridden by your app
import '@solana/wallet-adapter-react-ui/styles.css';

const Airdrop = () => {
    const wallet = useWallet();
    const { connection } = useConnection();

    async function getBalance() {
        if (wallet.publicKey) {

            const balance = await connection.getBalance(wallet.publicKey);
            document.getElementById("balance").innerHTML = `${balance / LAMPORTS_PER_SOL} SOL`;
        }
    }
    // State to manage alert visibility
    const [alertVisible, setAlertVisible] = useState(false);
    const [errorVisible, setErrorVisible] = useState(false);
    const [amount, setAmount] = useState(''); // State to manage input amount

    // Check if the wallet is connected and publicKey is not null
    if (wallet.connected && wallet.publicKey) {
        console.log(wallet.publicKey);
    } else {
        console.log("Wallet Not Connected");
    }

    const sendAirdrop = async () => {
        if (amount && wallet.publicKey) {
            try {
                await connection.requestAirdrop(wallet.publicKey, amount * LAMPORTS_PER_SOL);
                setAlertVisible(true); // Show the alert on success
                setErrorVisible(false); // Ensure error alert is hidden

                // Optionally hide the alert after a few seconds
                setTimeout(() => {
                    setAlertVisible(false); // Hide success alert after 3 seconds
                }, 3000);
            } catch (error) {
                console.error("Airdrop failed:", error);
                setErrorVisible(true); // Show the error alert on failure
                setAlertVisible(false); // Ensure success alert is hidden

                // Optionally hide the error alert after a few seconds
                setTimeout(() => {
                    setErrorVisible(false); // Hide error alert after 3 seconds
                }, 3000);
            }
        }
    };
    getBalance();
    return (
        <div className='flex flex-col space-y-2 md:space-y-0 md:flex-row justify-around mt-5 '>
            <div className="stats bg-primary text-primary-content flex text-center">
                <div className="stat">
                    <div className="stat-title text-black"><h2 className='text-center mt-3 text-4xl font-bold '>Balance</h2></div>
                    <div id="balance" className="stat-value text-2xl text-white">Connect to Wallet</div>
                </div>
            </div>
            <div>
                <h3 className='text-center mt-3 text-4xl font-bold '>Airdrop Sols</h3>
                <div className='flex justify-center flex-colspace-y-2 mt-4'>
                    <input
                        type='text'
                        id="amount"
                        value={amount} // Controlled input
                        onChange={(e) => setAmount(e.target.value)} // Update amount state
                        placeholder='Enter Amount To AirDrop'
                        className="input input-bordered input-accent w-full max-w-xs"
                    />
                    <button
                        onClick={wallet.connected && wallet.publicKey ? sendAirdrop : () => alert("Wallet not Connected")}
                        className="btn btn-outline btn-info"
                    >
                        Send Airdrop
                    </button>

                    {alertVisible && ( // Conditional rendering of the success alert
                        <div role="alert" className="alert alert-success mt-4">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 shrink-0 stroke-current"
                                fill="none"
                                viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                            <span>Your purchase has been confirmed!</span>
                        </div>
                    )}

                    {errorVisible && ( // Conditional rendering of the error alert
                        <div role="alert" className="alert alert-error mt-4">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 shrink-0 stroke-current"
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
