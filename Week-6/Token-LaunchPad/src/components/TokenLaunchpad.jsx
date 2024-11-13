import { ConnectionProvider,useConnection, useWallet, WalletProvider } from '@solana/wallet-adapter-react';
import {
    WalletModalProvider,
    WalletDisconnectButton,
    WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import '@solana/wallet-adapter-react-ui/styles.css';
import { MINT_SIZE, TOKEN_PROGRAM_ID, createInitializeMint2Instruction, createMint, getMinimumBalanceForRentExemptMint } from "@solana/spl-token"
import {Keypair, SystemProgram, Transaction} from "@solana/web3.js";

export function TokenLaunchpad() {
    const {connection} = useConnection();
    const wallet = useWallet();//provides wallet data(eg public key,balance)
    async function createToken(){
        const name = document.getElementById("name").value;
        const symbol = document.getElementById("symbol").value;
        const imageurl = document.getElementById("imageurl").value;
        const initialSuppy = document.getElementById("initialSuppy").value;
        const lamports = await getMinimumBalanceForRentExemptMint(connection);
        const keypair = Keypair.generate();
        
        const transaction = new Transaction().add(
            SystemProgram.createAccount({
                fromPubkey: wallet.publicKey,
                newAccountPubkey: keypair.publicKey,
                space: MINT_SIZE,
                lamports,
                programId: TOKEN_PROGRAM_ID,
            }),
            createInitializeMint2Instruction(keypair.publicKey, 6, wallet.publicKey, wallet.publicKey, TOKEN_PROGRAM_ID),
        );

        transaction.feePayer = wallet.publicKey;
        transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
        transaction.partialSign(keypair);

        let response = await wallet.sendTransaction(transaction, connection);
        console.log(response)
    }

    return  <div style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    }}>
        <h1>Solana Token Launchpad</h1>
        <input className='inputText' id='name' type='text' placeholder='Name'></input> <br />
        <input className='inputText' id='symbol' type='text' placeholder='Symbol'></input> <br />
        <input className='inputText' id='imageurl' type='text' placeholder='Image URL'></input> <br />
        <input className='inputText' id='initialSuppy' type='text' placeholder='Initial Supply'></input> <br />
        <button className='btn' onClick={createToken} >Create a token</button>
    </div>
}