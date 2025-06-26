import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";


export function SendToken() {
    const wallet = useWallet();
    const { connection } = useConnection();

    async function sendTokens() {
        let to = document.getElementById("to").value;
        let amount = document.getElementById("amount").value;
        const transaction = new Transaction();
        transaction.add(SystemProgram.transfer({
            fromPubkey: wallet.publicKey,
            toPubkey: new PublicKey(to),
            lamports: amount * LAMPORTS_PER_SOL,
        }));

        await wallet.sendTransaction(transaction, connection);
        alert("Sent " + amount + " SOL to " + to);
    }

    return <div className="card bg-primary text-primary-content w-96">
        <div className="card-body">
            <h2 className="card-title">Send Tokens</h2>
            <input
                id="to"
                type="text"
                placeholder="To"
                className="w-full mb-3 text-black placeholder-gray-500 rounded-md bg-gray input input-bordered focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <input
                id="amount"
                type="text"
                placeholder="Amount"
                className="w-full mb-4 text-black placeholder-gray-500 rounded-md bg-gray input input-bordered focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <div className="justify-end card-actions">
                <button
                    className="px-4 py-2 font-semibold text-black transition duration-300 ease-in-out bg-white border border-black rounded-md hover:bg-black hover:text-white" onClick={sendTokens}>Send</button>
            </div>
        </div>
    </div>
}

