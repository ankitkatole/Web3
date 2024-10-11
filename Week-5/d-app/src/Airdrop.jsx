import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Connection, clusterApiUrl, PublicKey } from "@solana/web3.js";

const Airdrop = () => {
    const wallet = useWallet();
    const { connection } = useConnection();

    const isConnected = wallet.connected;

    const checkAccountExists = async (publicKey) => {
        const accountInfo = await connection.getAccountInfo(publicKey);
        return accountInfo !== null;
    };

    const endAirdropToUser = async () => {
        if (!wallet.publicKey) return;

        const exists = await checkAccountExists(wallet.publicKey);
        if (!exists) {
            alert("Account does not exist. Please fund the wallet first.");
            return;
        }

        try {
            const signature = await connection.requestAirdrop(wallet.publicKey, 1000000000);
            await connection.confirmTransaction(signature, { commitment: 'processed', timeout: 60000 });
            alert("Airdrop successful");
        } catch (error) {
            console.error("Airdrop failed:", error);
            alert("Airdrop failed, check console for more details.");
        }
    };

    return (
        <div>
            <h1>Hello</h1>
            {isConnected ? (
                <div>
                    <p>Wallet Address: {wallet.publicKey.toString()}</p>
                    <input type="text" placeholder="Amount to Airdrop"></input>
                    <button onClick={endAirdropToUser}>Airdrop</button>
                </div>
            ) : (
                <p>Please connect your wallet.</p>
            )}
        </div>
    );
};

export default Airdrop;
