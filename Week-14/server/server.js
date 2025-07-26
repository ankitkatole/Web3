const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
const { Keypair, Transaction, Connection, PublicKey } = require('@solana/web3.js');
const bs58 = require('bs58');
const cors = require('cors');

require('dotenv').config();
const { userModel } = require('./models');


const app = express();
const connection = new Connection(process.env.RPC_URL);

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173', // Adjust this to your client URL
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
}));

const mongo_local = "mongodb://localhost:27017/BonkBot";
const secretKey = "your_jwt_secret";//Dummy

//Connect to MongoDB
// mongoose.connect(mongo_local).then(() => {
//     console.log("Connected to MongoDB successfully");
// }).catch(err => {
//     console.error("Error connecting to MongoDB:", err);
// });


app.post("/api/v1/signUp", async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({
                error: "Username and password are required",
            });
        }

        const existingUser = await userModel.find({ username });
        if (existingUser.length > 0) {
            return res.status(409).json({
                error: "Username already exists",
            });
        }
        const hashPassWord = await bcrypt.hash(password, 10);
        const keypair = new Keypair();
        const publicKey = keypair.publicKey.toString();
        const privateKey = keypair.secretKey.toString();
        const user = await userModel.create({
            username,
            password: hashPassWord,
            publicKey,
            privateKey,
        });
        res.status(201).json({
            message: "User created successfully",
            data: {
                username,
                publicKey
            }
        });
    }
    catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({
            error: "Internal server error",
        });
    }

});

app.post("/api/v1/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({
                error: "Username and password are required",
            });
        }
        const user = await userModel.findOne({ username });
        if (!user) {
            return res.status(404).json({
                error: "User not found",
            });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                error: "Invalid password",
            });
        }
        const token = jsonwebtoken.sign({ userId: user._id }, secretKey, {
            expiresIn: '1h',
        });
        res.status(200).json({
            message: "Login successful",
            data: {
                token,
                userId: user._id,
                username: user.username,
                publicKey: user.publicKey,
            }
        });
    }
    catch (error) {
        console.error("Error logging in:", error);
        res.status(500).json({
            error: "Internal server error",
        });
    }
});

app.post("/api/v1/txn/sign", async (req, res) => {
    try {
        const { message, retry } = req.body;
        if (!message) {
            return res.status(400).json({
                error: "Message is required",
            });
        }
        const tx = Transaction.from(Buffer.from(message));

        //We sign trasaction by getting users private key from user. then sign it for nw using a private key of my acc
        const keypair = Keypair.fromSecretKey(bs58.default.decode(process.env.SECRETKEY_SOL.toString()));

        tx.sign(keypair);

        const sign = await connection.sendTransaction(tx,[keypair]);
        console.log('Transaction signature:', sign);

        res.status(200).json({
            message: "Transaction signed successfully",
        });
    }
    catch (error) {
        console.error("Error signing transaction:", error);
        res.status(500).json({
            error: "Internal server error",
        });
    }
});

app.get("/api/v1/txn ", (req, res) => {
    res.status(200).json({
        message: "Transaction status retrieved successfully",
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})