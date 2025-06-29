import React from 'react'
import { useRef, useState } from 'react'

import {
    getAssociatedTokenAddressSync,
    createAssociatedTokenAccountInstruction,
    createMintToInstruction,
    createSetAuthorityInstruction,
    TOKEN_PROGRAM_ID,
    AuthorityType,
    getAssociatedTokenAddress
} from "@solana/spl-token";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Transaction, PublicKey } from "@solana/web3.js";


import { LoadingSpinner } from './LoadingSpinner'
import { CustomAlert } from './CustomAlert'


const MintToken = ({onDone,mintAddress}) => {

    const wallet = useWallet();
    const { connection } = useConnection();
    const [revokeMintAuthority, setRevokeMintAuthority] = useState(false);
    const [alert, setAlert] = useState(null);
    const [loading, setLoading] = useState(false);

    const amtRef = useRef(null);
    const mintAuthorityRef = useRef(null);
    const privacyRef = useRef(null);

    async function mint(){
        console.log("Minting tokens...");

        if(!wallet.publicKey || !mintAddress) {
            setAlert({
                message: "Please connect your wallet and create a token first.",
                type: "error"
            });
            return;
        }
        if(!amtRef.current || !amtRef.current.value) {
            setAlert({
                message: "Please enter the amount to mint.",
                type: "error"
            });
            return;
        }
        const amount = parseInt(amtRef.current.value);
        setLoading(true);
        const associatedToken = getAssociatedTokenAddressSync(
            mintAddress,
            wallet.publicKey,
            false,
            TOKEN_PROGRAM_ID
        );

        console.log(associatedToken.toBase58());

        const ataTx = new Transaction().add(
            createAssociatedTokenAccountInstruction(
                wallet.publicKey,
                associatedToken,
                wallet.publicKey,
                mintAddress,
                TOKEN_PROGRAM_ID,
            )
        );
        await wallet.sendTransaction(ataTx, connection);
        const mintTx = new Transaction().add(
            createMintToInstruction(
                mintAddress,
                associatedToken,
                wallet.publicKey,
                amount,
                [],
                TOKEN_PROGRAM_ID
            )
        );
        await wallet.sendTransaction(mintTx, connection);
        if (mintAuthorityRef.current && mintAuthorityRef.current.checked) {
            const revokeTx = new Transaction().add(
                createSetAuthorityInstruction(
                    mintAddress,
                    wallet.publicKey,
                    AuthorityType.MintTokens,
                    null,
                    [],
                    TOKEN_PROGRAM_ID
                )
            );
            await wallet.sendTransaction(revokeTx, connection);
            setRevokeMintAuthority(true);
        }
        setLoading(false);
        setAlert({
            message: `Successfully minted ${amount} tokens to your wallet!` + (revokeMintAuthority ? " Mint authority has been revoked." : ""),
            type: "success"
        });
        onDone();
        
    }

    return (
        <>
            <div className="relative flex items-center justify-center w-full h-full p-4 font-inter">
                <style>
                    {`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
        .font-inter {
            font-family: 'Inter', sans-serif;
        }
      `}
                </style>

                {alert && (
                    <CustomAlert
                        message={alert.message}
                        type={alert.type}
                        onClose={() => setAlert(null)}
                    />
                )}
                {loading && <LoadingSpinner />}

                <div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-8 transform transition-all duration-300 hover:scale-[1.01]">
                    <div className="flex flex-col items-center justify-center gap-8">
                        <h2 className="text-2xl font-extrabold leading-tight text-center text-gray-800 sm:text-3xl">
                            Mint Tokens to Your Wallet
                        </h2>

                        <div className="flex flex-col w-full gap-5">

                            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                                <label htmlFor="amount" className="w-32 text-lg font-semibold text-gray-700 sm:w-auto">
                                    Amount to Mint:
                                </label>
                                <input
                                    id="amount"
                                    ref={amtRef}
                                    type="number"
                                    placeholder="e.g., 1000"
                                    className="flex-1 p-3 text-gray-800 transition-colors duration-200 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                                />
                            </div>

                            <h2 className="text-xl font-bold">Optional:</h2>

                            <div className="flex flex-row items-center justify-between gap-4">
                                <div className="flex flex-col items-start gap-2 sm:flex-row md:items-center">
                                    <input
                                        id="revokeMintAuthority"
                                        type="checkbox"
                                        ref={mintAuthorityRef}
                                        className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                    />
                                    <label htmlFor="revokeMintAuthority" className="text-lg font-semibold text-gray-700 sm:w-auto">
                                        Revoke Mint Authority
                                    </label>
                                </div>
                            </div>

                            <div className="flex items-start justify-between w-full gap-4 mt-6 sm:flex-row">
                                <input
                                    id="confirm"
                                    type="checkbox"
                                    ref={privacyRef}
                                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                />
                                <p className="text-sm text-gray-600">
                                    I confirm I want to mint these tokens to my associated wallet.
                                </p>
                            </div>
                        </div>

                        <button
                            onClick={mint}
                            disabled={revokeMintAuthority}
                            className={`w-full px-8 py-3 text-xl font-bold text-white transition-all duration-300 transform rounded-lg shadow-lg sm:w-auto bg-gradient-to-r ${confirm ? 'from-green-500 to-emerald-700 hover:from-green-600 hover:to-emerald-800' : 'from-gray-400 to-gray-500 cursor-not-allowed'} focus:outline-none focus:ring-4 focus:ring-green-300 hover:-translate-y-1 active:scale-95`}
                        >
                            Mint Tokens
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MintToken
