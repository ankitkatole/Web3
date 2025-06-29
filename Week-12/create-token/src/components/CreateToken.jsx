import { Keypair, SystemProgram, Transaction, PublicKey, ComputeBudgetProgram } from "@solana/web3.js";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
    MINT_SIZE,
    TOKEN_PROGRAM_ID,
    createInitializeMint2Instruction,
    setAuthority,
    createSetAuthorityInstruction,
    AuthorityType
} from "@solana/spl-token";
import { useRef, useState } from "react";
import { CustomAlert } from "./CustomAlert";
import { LoadingSpinner } from "./LoadingSpinner";

export function CreateToken({onTokenCreate}) {
    const { connection } = useConnection();
    const wallet = useWallet();

    const [alert, setAlert] = useState(null);
    const [loading, setLoading] = useState(false);
    
    const nameRef = useRef();
    const symbolRef = useRef();
    const freezeRef = useRef();
    const updateRef = useRef();
    const privacyRef = useRef();

    async function createToken() {
        if (!wallet.connected || !wallet.publicKey) {
            setAlert({
                message: "Please connect your wallet first.",
                type: "error"
            });
            return;
        }
        if (!nameRef.current.value || !symbolRef.current.value) {
            setAlert({
                message: "Please fill in all fields.",
                type: "error"
            });
            return;
        }
        if (!privacyRef.current.checked) {
            setAlert({
                message: "You must agree to the terms and conditions.",
                type: "error"
            });
            return;
        }

        const mintKeyPair = Keypair.generate();
        console.log("Mint Keypair:", mintKeyPair.publicKey.toBase58());
        console.log("Wallet Public Key:", wallet.publicKey.toBase58());

        let lamports;
        try {
            lamports = await connection.getMinimumBalanceForRentExemption(MINT_SIZE);
        } catch (error) {
            console.error("Error fetching rent exemption balance:", error);
            setAlert({
                message: "Failed to get rent exemption. Please try again.",
                type: "error"
            });
            return;
        }

        const transaction = new Transaction();
        transaction.add(ComputeBudgetProgram.setComputeUnitLimit({ units: 200_000 }));


        transaction.add(ComputeBudgetProgram.setComputeUnitPrice({ microLamports: 10000 }));




        transaction.add(
            SystemProgram.createAccount({
                fromPubkey: wallet.publicKey,
                newAccountPubkey: mintKeyPair.publicKey,
                space: MINT_SIZE,
                lamports,
                programId: TOKEN_PROGRAM_ID,
            })
        );

        transaction.add(
            createInitializeMint2Instruction(
                mintKeyPair.publicKey,
                9, 
                wallet.publicKey, 
                wallet.publicKey, 
                TOKEN_PROGRAM_ID
            )
        );

        if (freezeRef.current.checked) {
            setAlert({
                message: "Attempting to revoke Freeze Authority...",
                type: "info"
            });
            transaction.add(
                createSetAuthorityInstruction(
                    mintKeyPair.publicKey, 
                    wallet.publicKey,    
                    AuthorityType.FreezeAccount,
                    null,                 
                    [],
                    TOKEN_PROGRAM_ID      
                )
            );
        } else {
            setAlert({
                message: "Freeze Authority will NOT be revoked (it will remain with your wallet).",
                type: "info"
            });
        }

        transaction.feePayer = wallet.publicKey;
        try {
            const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();
            transaction.recentBlockhash = blockhash;
        } catch (error) {
            console.error("Error getting latest blockhash:", error);
            setAlert({
                message: "Failed to get latest blockhash. Please try again.",
                type: "error"
            });
            return;
        }

        transaction.partialSign(mintKeyPair);

        const signature = await wallet.sendTransaction(transaction, connection, {
            signers: [mintKeyPair],
        });
        try {
            console.log("Transaction Signature:", signature);
            setAlert({
                message: "Transaction sent! Waiting for confirmation. With signature: " + signature,
                type: "info"
            });
            setLoading(true);
            await connection.confirmTransaction(signature, 'finalized');
            setLoading(false);
            setAlert({
                message: `Token created successfully! Mint Address: ${mintKeyPair.publicKey.toBase58()}`,
                type: "success"
            });
            console.log("Token created successfully:", mintKeyPair.publicKey.toBase58());
            console.log("Transaction Signature:", signature);
            if (onTokenCreate) {
                onTokenCreate(mintKeyPair.publicKey);
            }
        } catch (error) {
            console.error("Error creating token:", error);
            setLoading(false);

            if (error.name === 'TransactionExpiredTimeoutError') {
                const explorerUrl = `https://explorer.solana.com/tx/${signature}?cluster=devnet`;
                setAlert({
                    message: `Transaction may have succeeded but timed out. Please check Explorer: ${explorerUrl}`,
                    type: "warning"
                });
                if (onTokenCreate) {
                    onTokenCreate(mintKeyPair.publicKey);
                }
                setAlert({
                    message: `Token created successfully! Mint Address: ${mintKeyPair.publicKey.toBase58()}`,
                    type: "success"
                });
                console.log("Token created successfully:", mintKeyPair.publicKey.toBase58());
            }

            if (error.message.includes("User rejected")) {
                setAlert({ message: "Transaction was cancelled by the user.", type: "warning" });
            } else {
                setAlert({
                    message: "Failed to create token. See console for details.",
                    type: "error"
                });
            }
        }
        nameRef.current.value = '';
        symbolRef.current.value = '';
        freezeRef.current.checked = false;
        updateRef.current.checked = false; 
        privacyRef.current.checked = false;
        nameRef.current.focus();
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
                            Create Your New Token
                        </h2>

                        <div className="flex flex-col w-full gap-5">
                            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                                <label htmlFor="tokenName" className="w-32 text-lg font-semibold text-gray-700 sm:w-auto">
                                    Token Name:
                                </label>
                                <input
                                    id="tokenName"
                                    type="text"
                                    ref={nameRef}
                                    placeholder="e.g., My Awesome Coin"
                                    className="flex-1 p-3 text-gray-800 transition-colors duration-200 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                                />
                            </div>

                            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                                <label htmlFor="symbolName" className="w-32 text-lg font-semibold text-gray-700 sm:w-auto">
                                    Symbol Name:
                                </label>
                                <input
                                    id="symbolName"
                                    type="text"
                                    ref={symbolRef}
                                    placeholder="e.g., MAC"
                                    className="flex-1 p-3 text-gray-800 transition-colors duration-200 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                                />
                            </div>
                            <h2 className="text-xl font-bold">Revoke Authorities:</h2>
                            <div className="flex flex-row items-center justify-between gap-4">
                                <div className="flex flex-col items-start gap-2 sm:flex-row md:items-center">
                                    <input
                                        id="UpdateAuthority"
                                        type="checkbox"
                                        ref={updateRef}
                                        className="flex-1 p-3 text-gray-800 transition-colors duration-200 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" />

                                    <label htmlFor="UpdateAuthority" className="w-32 text-lg font-semibold text-gray-700 sm:w-auto">
                                        Update Authority
                                    </label>
                                </div>
                                <div className="flex flex-col items-start gap-2 sm:flex-row md:items-center">
                                    <input
                                        id="FreezeAuthority"
                                        type="checkbox"
                                        ref={freezeRef}
                                        className="flex-1 p-3 text-gray-800 transition-colors duration-200 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" />

                                    <label htmlFor="FreezeAuthority" className="w-32 text-lg font-semibold text-gray-700 sm:w-auto">
                                        Freeze Authority
                                    </label>
                                </div>
                            </div>

                            <div className="flex items-start justify-between w-full gap-4 mt-6 sm:flex-row">
                                <input id="privacy" ref={privacyRef} type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                                <p className="text-sm text-gray-600">
                                    By clicking "Mint New Token", you agree to the terms and conditions of token creation.
                                </p>
                            </div>
                        </div>


                        <button
                            onClick={createToken}
                            className="w-full px-8 py-3 text-xl font-bold text-white transition-all duration-300 transform rounded-lg shadow-lg sm:w-auto bg-gradient-to-r from-blue-500 to-indigo-700 hover:from-blue-600 hover:to-indigo-800 focus:outline-none focus:ring-4 focus:ring-blue-300 hover:-translate-y-1 active:scale-95"
                        >
                            Mint New Token
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}