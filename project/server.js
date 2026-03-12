const express = require("express");
const path = require("path");


const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;
const NIMI = process.env.MY_NAME || "Tundmatu nimi (Viga!)";

app.get('/api/info', (req, res) => {
    res.status(200).json({
        misioon: "Iseseisev deplomine edukas",
        meeskond: NIMI,
        aeg: new Date().toISOString()
    });
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

import PocketBase from 'pocketbase';

const pb = new PocketBase(
  "http://pocketbase-zl9hsd9zdins8346q7v5fc4a.176.112.158.15.sslip.io"
);

app.get("/api/users", async (req, res) => {
    try {
        const users = await pb.collection('_pb_users_auth_').getFullList();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/success', (req, res) => {
    const { session_id } = req.query;
    res.send(`
        <h1>Payment Successful!</h1>
        <p>Thank you for your purchase. Session ID: ${session_id}</p>
        <a href="/">Back to Home</a>
    `);
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`API Server töötab selle pordi peale: ${PORT}`);
});