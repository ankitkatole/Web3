# Solana Token Launchpad (Devnet)

This project provides a simple web interface to create custom Solana Program Library (SPL) tokens and mint an initial supply of these tokens on the Solana Devnet. You have control over revoking the Freeze Authority during token creation.

## ✨ Features

* **Custom Token Creation:** Create my own SPL tokens with a custom name and symbol.

* **Optional Freeze Authority Revocation:** I can choose to revoke the token's Freeze Authority during creation, making it impossible for anyone (including myself) to freeze token accounts.

* **Initial Token Minting:** I can mint a specified initial supply of my newly created token directly to my wallet.

* **User-Friendly Interface:** A clean, responsive design for easy interaction.

* **Wallet Integration:** Seamlessly connects with Solana wallets (e.g., Phantom, Solflare) using the `@solana/wallet-adapter-react` library.

## 🚀 Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes on the Solana Devnet.

### Prerequisites

Before you begin, ensure you have the following installed:

* **Node.js** (LTS version recommended)

* **npm** or **Yarn** (npm is used in examples)

* A **Solana-compatible** wallet browser **extension** (e.g., [Phantom](https://phantom.app/download), [Solflare](https://solflare.com/access)) with funds on **Solana Devnet**.

  * You can get Devnet SOL from a faucet, for example: [Solana Faucet](https://solana-labs.github.io/solana-web3.js/dev/faucet.html) or [QuickNode Faucet](https://faucet.quicknode.com/solana/devnet).

### Installation

1. **Clone the repository:**

`git clone`


2. **Install dependencies:**

`npm install`

OR
`yarn install`


### Configuration

This project uses an environment variable for the Solana Devnet RPC URL.

1. **Create a `.env` file** in the root of your project:

`.env`


2. **Add your Devnet RPC URL** to this file. It's crucial to use a reliable RPC endpoint, especially given potential network congestion. Public RPCs can be slow or unreliable. Consider using a dedicated provider like Helius, QuickNode, or Alchemy.

`VITE_DEVNET_URL="YOUR_SOLANA_DEVNET_RPC_URL_HERE"`


**Example** with a placeholder for a dedicated RPC **(replace `YOUR_API_KEY`):**

`VITE_DEVNET_URL="https://rpc.helius.xyz/?api-key=YOUR_HELIUS_API_KEY"`


**Example with a public RPC (less reliable, for testing only):**

`VITE_DEVNET_URL="https://api.devnet.solana.com"`


**Important:** Replace `"YOUR_SOLANA_DEVNET_RPC_URL_HERE"` with your actual RPC endpoint.

### Running the Project

1. **Start the development server:**

`npm run dev`

OR
`yarn dev`


2. Open your browser and navigate to the URL displayed in your terminal (usually `http://localhost:5173`).

## 👨‍💻 Usage

1. **Connect Your Wallet:** Click the "Connect Wallet" button and select your Solana wallet (ensure it's set to **Devnet**).

2. **Create Token Definition:**

* Fill in your desired **Token Name** and **Symbol**.

* Optionally, provide an **Image URL** (this would typically be for Metaplex metadata, which this current version doesn't fully implement for UI input, but it's a placeholder for future enhancements).

* Input your **Initial Supply** amount (this will be minted to your wallet in the next step).

* Check the "Revoke Freeze Authority" checkbox if you want to make your token accounts un-freezable.

* Agree to the terms and conditions.

* Click "Create Token Definition".

* Approve the transaction in your wallet.

* Upon success, you will see the new token's mint address. The Mint Authority will remain with my wallet, allowing me to mint tokens.

3. **Mint Initial Supply (Next Step in Application Flow):**

* After successful token creation, the application will proceed to the minting interface (if implemented as a separate component, like `MintToken.jsx`).

* Confirm the amount to mint (this will likely use the "Initial Supply" you entered earlier).

* Approve the transaction in your wallet.

* **Crucially:** After the initial minting, the application should provide an option to **revoke the Mint Authority**, thereby fixing the total supply of my token.

## 📚 What I've Learned

Through developing this project, I've covered several fundamental concepts in Solana token development:

* **SPL Token Standard:** I've gained an understanding of the core standard for fungible tokens on Solana, similar to ERC-20 on Ethereum.

* **Token Mint Account Creation:** I've learned the two-step process involving `SystemProgram.createAccount` to allocate space and `createInitializeMint2Instruction` to define the token's properties.

* **Solana Authorities:**

* **Mint Authority:** I've understood the power to create new tokens. I've learned how to initially assign it and the strategy to revoke it *after* initial minting.

* **Freeze Authority:** I've grasped the power to halt transfers for specific token accounts. I've implemented the option to revoke this authority immediately upon token creation for increased decentralization.

* **Update Authority:** I've learned about the power to change a token's metadata (name, symbol, image URI). While not fully implemented in the UI for user input, I understand its role in Metaplex Token Metadata and the concept of "burning" it for immutable metadata.

* **Transaction Construction:** I've learned how to build complex Solana transactions by adding multiple instructions sequentially (`transaction.add()`).

* **Transaction Reliability & Error Handling:**

* I've dealt with `TransactionExpiredBlockheightExceededError` due to network congestion.

* I've explored strategies to mitigate this error using `ComputeBudgetProgram` to add priority fees (setting `units` and `microLamports`) and extending `lastValidBlockHeight`.

* I've understood the critical role of a reliable **RPC endpoint** for successful transaction submission and confirmation.

* **React Hooks for Solana Development:** I've effectively used `useRef` for form inputs and `useState` for managing UI state and alerts.

* **User Feedback:** I've implemented a `CustomAlert` component for clear and non-blocking user notifications.

This journey has provided a solid foundation for building more advanced decentralized applications on the Solana blockchain!

## ⚠️ Important Notes

* **Devnet Only:** This project is configured and intended for use on the Solana Devnet. Do not use your mainnet funds.

* **Authority Revocation:**

* **Freeze Authority:** If I opt to revoke the Freeze Authority, it is **permanent**. No one will be able to freeze any token accounts for this token, even in emergency situations.

* **Mint Authority:** This version of the `CreateToken` component intentionally leaves the Mint Authority active after creation. It is expected that I will implement the revocation of the Mint Authority in a subsequent step (e.g., within my `MintToken.jsx` component or a dedicated "Finalize Token" function) *after* I have minted the desired initial supply. Once revoked, the total supply of my token cannot be increased.

* **Metaplex Metadata:** The "Image URL" input is present in the UI, but the current `CreateToken` component does not fully integrate with the Metaplex Token Metadata program to attach this information on-chain. This is a potential future enhancement.

* **Transaction Reliability:** Solana Devnet and Mainnet can experience periods of high congestion. If my transactions are consistently failing with "block height exceeded" errors, I should try increasing the `microLamports` value in the `ComputeBudgetProgram.setComputeUnitPrice` instruction in my `createToken` function, or switch to a more robust RPC endpoint.
