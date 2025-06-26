import React, { FC, useMemo } from 'react';
import { ConnectionProvider, WalletProvider, useConnection, useWallet } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { UnsafeBurnerWalletAdapter } from '@solana/wallet-adapter-wallets';
import {
    WalletModalProvider,
    WalletDisconnectButton,
    WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';
import { SendToken } from './SendToken';


const ConnectionButtons = () => {
    const { publicKey, wallet, connected } = useWallet();
    const walletName = useMemo(() => {
        return connected && wallet ? wallet.adapter.name : 'Not connected';
    }, [connected, wallet]);
    return (
        <div className="flex flex-col justify-center mt-5 mt-10 space-y-1 md:flex-row md:space-x-3">
            <div className="card bg-primary text-primary-content w-96">
                <div className="card-body">
                    <h2 className="card-title">Connect to Your Wallet!</h2>
                    {connected ? (
                        <p><b>Wallet:</b> {walletName} </p>

                    ) : (
                        <p>No wallet connected</p>
                    )}
                    <div className="justify-end card-actions">
                        <WalletMultiButton />
                    </div>
                </div>
            </div>
            <div className="card bg-primary text-primary-content w-96">
                <div className="card-body">
                    <h2 className="card-title">Disconnect Wallet</h2>
                    <p>Click below to Disconnect your wallet</p>
                    <div className="justify-end card-actions">
                        <WalletDisconnectButton />
                    </div>
                </div>
            </div>
            <SendToken />
        </div>
    )
}

export default ConnectionButtons
