// Используем CommonJS
const express = require("express");
const path = require("path");
const PocketBase = require("pocketbase/cjs");

const app = express();
app.use(express.json());
app.use(express.static(__dirname));

// Параметры из окружения
const PORT = process.env.PORT || 3000;
const PB_URL = process.env.PB_URL;
const NIMI = process.env.MY_NAME || "Tundmatu nimi (Viga!)";

if (!PB_URL) {
    console.error("Ошибка: переменная окружения PB_URL не задана!");
    process.exit(1);
}

// Подключение PocketBase
const pb = new PocketBase(PB_URL);

// Тестовый endpoint
app.get('/api/info', (req, res) => {
    res.status(200).json({
        misioon: "Iseseisev deplomine edukas",
        meeskond: NIMI,
        aeg: new Date().toISOString()
    });
});

// Получение всех пользователей
app.get("/api/users", async (req, res) => {
    try {
        const users = await pb.collection('_pb_users_auth_').getFullList();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Главная страница
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Успешная оплата
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