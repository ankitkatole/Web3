import { Keypair, SystemProgram, Transaction } from "@solana/web3.js";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { MINT_SIZE, TOKEN_PROGRAM_ID, createInitializeMintInstruction } from "@solana/spl-token";
import { useRef } from "react";

export function CreateToken() {
    const { connection } = useConnection();
    const wallet = useWallet();
    const nameRef = useRef();
    const symbolRef = useRef();

    async function createToken() {
        const mintKeyPair = Keypair.generate();
        const lamports = await connection.getMinimumBalanceForRentExemption(MINT_SIZE);
    }

    return (
        <>
            <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-br from-indigo-500 to-purple-600 font-inter">
                <style>
                    {`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
                .font-inter {
                    font-family: 'Inter', sans-serif;
                }
                `}
                </style>

                <div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-8 transform transition-all duration-300 hover:scale-[1.01]">
                    <div className="flex flex-col items-center justify-center gap-8">
                        <h2 className="text-4xl font-extrabold leading-tight text-center text-gray-800 sm:text-5xl">
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
                            
                        </div>
                        <p className="text-sm text-gray-600">
                            By clicking "Mint New Token", you agree to the terms and conditions of token creation.
                        </p>
                        <button
                            onClick={() => {
                                // 👇 Add your createToken logic here
                                console.log('Token Name:', nameRef.current?.value);
                                console.log('Symbol Name:', symbolRef.current?.value);
                            }}
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