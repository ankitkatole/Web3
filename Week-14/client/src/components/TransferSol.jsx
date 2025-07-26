import React from 'react';
import { useState } from 'react';
import { Transaction, Connection, PublicKey, SystemProgram, LAMPORTS_PER_SOL } from '@solana/web3.js';
import axios from 'axios';

const connection = new Connection(import.meta.env.VITE_RPC);

const TransferSol = () => {
    const [recipientAddress, setRecipientAddress] = useState('');
    const [amount, setAmount] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Transfer Data:', { recipientAddress, amount });
        sendSol();
        console.log('Solana transfer attempted! Check console for data.');
    };

    async function sendSol() {
        const ix = SystemProgram.transfer({
            fromPubkey: new PublicKey("77PjzyHS8haFowZKKZRVQ9eVmw6ys7axRNety7eV2hBn"),
            toPubkey: new PublicKey(recipientAddress),
            lamports: amount * LAMPORTS_PER_SOL,
        });
        const tx = new Transaction().add(ix);
        const {blockhash } = await connection.getLatestBlockhash();
        console.log('Blockhash:', blockhash);
        tx.recentBlockhash = blockhash;
        tx.feePayer = new PublicKey("77PjzyHS8haFowZKKZRVQ9eVmw6ys7axRNety7eV2hBn");
        const serializedTx = tx.serialize({
            requireAllSignatures: false,
            verifySignatures: false,
        });
        console.log('Serialized Transaction:', serializedTx);
        await axios.post("http://localhost:3000/api/v1/txn/sign", {
            message: serializedTx,
            retry: false,
        })
    }

    return (
        <div className="bg-gray-800 bg-opacity-70 backdrop-filter backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-full max-w-md transform transition-all duration-500 hover:scale-[1.02] hover:shadow-purple-500/30 border border-gray-700 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-pink-500 opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl -z-10"></div>

            <h2 className="text-4xl font-extrabold mb-8 text-center text-purple-400 tracking-wide">Transfer Solana</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="recipient-address" className="block text-sm font-medium text-gray-300 mb-2 transform translate-x-1 transition duration-300 ease-out">
                        Recipient Address
                    </label>
                    <input
                        type="text"
                        id="recipient-address"
                        className="w-full px-5 py-3 rounded-lg bg-gray-700 border border-gray-600 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:ring-opacity-60 outline-none transition duration-300 ease-in-out placeholder-gray-400 text-lg"
                        value={recipientAddress}
                        onChange={(e) => setRecipientAddress(e.target.value)}
                        placeholder="e.g., 5vN7..."
                        required
                    />
                </div>
                <div>
                    <label htmlFor="amount" className="block text-sm font-medium text-gray-300 mb-2 transform translate-x-1 transition duration-300 ease-out">
                        Amount (SOL)
                    </label>
                    <input
                        type="number"
                        id="amount"
                        className="w-full px-5 py-3 rounded-lg bg-gray-700 border border-gray-600 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:ring-opacity-60 outline-none transition duration-300 ease-in-out placeholder-gray-400 text-lg"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="e.g., 1.5"
                        step="any" // Allows decimal numbers
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white font-extrabold py-3 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-75 text-lg tracking-wide"
                >
                    Send SOL
                </button>
            </form>
        </div>
    );
};


export default TransferSol
