const { Connection, Keypair, VersionedTransaction } = require('@solana/web3.js');
const axios = require('axios');
const { Wallet } = require('@project-serum/anchor');
const bs58 = require('bs58');
// const { transactionSenderAndConfirmationWaiter } = require('./transactionSender'); this file was added later related file was ts converted to js


// It is recommended that you use your own RPC endpoint.
// This RPC endpoint is only for demonstration purposes so that this example will run.
const connection = new Connection(process.env.RPC);

const wallet = new Wallet(Keypair.fromSecretKey(bs58.decode(process.env.SECRET_KEY)));

async function main() {
    const response = await (
        await axios.get('https://quote-api.jup.ag/v6/quote?inputMint=So11111111111111111111111111111111111111112&outputMint=EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v&amount=100000000&slippageBps=50')
      );
      const quoteResponse = response.data;
      console.log(quoteResponse);

      try {
        const { data: { swapTransaction } } = await (
            await axios.post('https://quote-api.jup.ag/v6/swap', {
                quoteResponse,
                userPublicKey: wallet.publicKey.toString()
            })
        );

        console.log("swapTransaction")
        const swapTransactionBuf = Buffer.from(swapTransaction, 'base64');
        const transaction = await VersionedTransaction.deserialize(swapTransactionBuf);
        console.log(transaction);
          
        transaction.sign([wallet.payer]);
        const latestBlockHash = await connection.getLatestBlockhash();

        //Edited v2(failed)
        // const blockhashWithExpiryBlockHeight = {
        //     blockhash: latestBlockHash.blockhash,
        //     lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
        // };
        //upto here

        // Execute the transaction
        const rawTransaction = await transaction.serialize()
        console.log("reached serialize: ",rawTransaction)
        const txid = await connection.sendRawTransaction(rawTransaction, {
            skipPreflight: true,
            maxRetries: 2
        });
        console.log("Ths tx id :",txid)
        const confirmation = await connection.confirmTransaction({
            blockhash: latestBlockHash.blockhash,
            lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
            signature: txid
        });
        console.log(confirmation)
        console.log(`https://solscan.io/tx/${txid}`);

        // const serializedTransaction = await transaction.serialize();
        // const txResponse = await transactionSenderAndConfirmationWaiter({
        //     connection,
        //     serializedTransaction,
        //     blockhashWithExpiryBlockHeight,
        // });


        // if (txResponse) {
        //     console.log(`Transaction successful: https://solscan.io/tx/${txResponse.signature}`);
        // } else {
        //     console.error('Transaction failed: Expired or not confirmed');
        // }
      } catch(e) {
        console.log(e.getLogs())
      }
      
}

main();