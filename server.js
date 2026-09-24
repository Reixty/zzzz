const express = require('express');
const fetch = require('node-fetch');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static('public'));

// ТВОЙ КЛЮЧ ВСТАВЛЯТЬ СЮДА:
const API_KEY = "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";

app.post('/chat', async (req, res) => {
    try {
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "nvidia/llama-3.3-nemotron-super-49b-v1:free",
                messages: [{ role: "user", content: req.body.message }]
            })
        });
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
