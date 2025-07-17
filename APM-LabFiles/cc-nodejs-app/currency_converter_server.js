const express = require('express');
const axios = require('axios');

const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

async function convertCurrency(convert_from, convert_to, amount) {
    try {
        const url = `https://api.vatcomply.com/rates?base=${convert_from}`;
        const response = await axios.get(url);

        if (response.status === 200) {
            const rate = response.data.rates[convert_to];
            if (rate) {
                const result = rate * amount;
                console.log(result);
                return { result };
            } else {
                return { error: `Invalid currency code: ${convert_to}` };
            }
        } else {
            return { error: "Failed to retrieve data from the API" };
        }
    } catch (error) {
        return { error: error.message };
    }
}

app.post('/', async (req, res) => {
    const { convert_from, convert_to, amount } = req.body;

    // Check if required fields are provided
    if (!convert_from || !convert_to || amount === undefined) {
        return res.status(400).json({ error: "Please provide convert_from, convert_to, and amount" });
    }

    const result = await convertCurrency(convert_from, convert_to, amount);
    return res.json(result);
});

// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
