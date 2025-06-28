import {Keypair, SystemProgram, Transaction} from "solana-web3.js";
import {useConnection, useWallet} from "@solana/wallet-adapter-react";
import {MINT_SIZE, TOKEN_PROGRAM_ID, createInitializeMintInstruction} from "@solana/spl-token";
import { use } from "react";

export function CreateToken({onCreate}){
    const {vonnectipn} = useConnection();
    const wallet = useWallet();

    async
}