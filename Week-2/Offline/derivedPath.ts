import nacl from "tweetnacl";
import { generateMnemonic, mnemonicToSeedSync } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";

// const mnemonic = generateMnemonic(); //This function is used to generatee random mnemonic

const mnemonic = 
"destroy retire candy cotton asset field wheel gate auction borrow join predict"; // Demo Mnemonic
const seed = mnemonicToSeedSync(mnemonic);
console.log(seed)
for (let i = 0; i < 4; i++) {//i iterating till no. of accounts we have this mnemonic is example mnemonic with 4 accounts
  const path = `m/44'/501'/${i}'/0'`; // This is the derivation path
  const derivedSeed = derivePath(path, seed.toString("hex")).key;
  const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
  console.log(Keypair.fromSecretKey(secret).publicKey.toBase58());
}