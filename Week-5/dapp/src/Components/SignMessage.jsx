import { ed25519 } from '@noble/curves/ed25519';
import { useWallet } from '@solana/wallet-adapter-react';
import bs58 from 'bs58';
import React from 'react';

export function SignMessage() {
    const { publicKey, signMessage } = useWallet();

    async function onClick() {
        if (!publicKey) throw new Error('Wallet not connected!');
        if (!signMessage) throw new Error('Wallet does not support message signing!');

        const message = document.getElementById("message").value;
        const encodedMessage = new TextEncoder().encode(message);
        const signature = await signMessage(encodedMessage);

        if (!ed25519.verify(signature, encodedMessage, publicKey.toBytes())) throw new Error('Message signature invalid!');
        alert('success', `Message signature: ${bs58.encode(signature)}`);
    };

    return (
        <div className="flex items-center justify-center mt-5">
  <div className="w-full rounded-lg shadow-lg card bg-primary text-primary-content md:w-96">
    <div className="p-5 card-body">
      <h2 className="mb-4 text-3xl card-title">Send Tokens</h2>
      <input
        className="w-full mb-4 text-black placeholder-gray-500 bg-white rounded-md input input-bordered focus:outline-none focus:ring-2 focus:ring-primary"
        id="message"
        type="text"
        placeholder="Message"
      />
      <button
        className="px-4 py-2 font-semibold text-black transition duration-300 ease-in-out bg-white border border-black rounded-md hover:bg-black hover:text-white"
        onClick={onClick}
      >
        Sign Message
      </button>
    </div>
  </div>
</div>

    );
};