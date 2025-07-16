require('dotenv').config();
import express from 'express';
import { burnTokens, mintTokens, sendNativeTokens } from './mintTokens';

const app = express();

const Helius_res =
{
    "description": "8XPovF32Ya1aJcoxbJLNrNGToRwvAQMzkTuQY81pk857 transferred 0.01 SOL to G6WVXCkT7xatjdAwqFAbFRmheVsQ5SEatX1Ew2ZDBZrU.", "events": [], "fee": 15000, "feePayer":
        "8XPovF32Ya1aJcoxbJLNrNGToRwvAQMzkTuQY81pk857",
    "nativeTransfers": [{
        "amount":
            10000000,
        "fromUserAccount": "8XPovF32Ya1aJcoxbJLNrNGToRwvAQMzkTuQY81pk857",
        "toUserAccount": "G6WVXCkT7xatjdAwqFAbFRmheVsQ5SEatX1Ew2ZDBZrU"
    }]
}
const VAULT = "77PjzyHS8haFowZKKZRVQ9eVmw6ys7axRNety7eV2hBn"

app.post('/helius', async (req, res) => {
    const incomingTx = HELIUS_RESSPONSE.nativeTransfers.filter(x => x.toUserAccount === VAULT);
    if(!incomingTx) {
        res.json({message: "Processed"});
        return;
    }
    const fromAddress = incomingTx.fromUserAccount;
    const toAddress = VAULT;
    const amount = incomingTx.amount;
    const type = "received_native_sol";

    await mintTokens(fromAddress, toAddress, amount);
    // if (type === "received_native_sol") {
    // } else {
    //     // What could go wrong here?
    //     await burnTokens(fromAddress, toAddress, amount);
    //     await sendNativeTokens(fromAddress, toAddress, amount);
    // }

    res.send('Transaction successful');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});