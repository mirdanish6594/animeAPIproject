// index.js

import express from 'express';
import axios from 'axios';
import path from 'path';      // ✅ Make sure this line is here
import { fileURLToPath } from 'url'; // ✅ And this one

// ESM workaround for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

// ✅ This line is CRUCIAL for Vercel to find your templates
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// This line is also important for CSS/JS files
app.use(express.static(path.join(__dirname, 'public')));

// Main route
app.get('/', async (req, res) => {
    const query = req.query.q || '';
    let animeData = [];

    try {
        if (query) {
            const response = await axios.get(`https://api.jikan.moe/v4/anime`, {
                params: { q: query }
            });
            animeData = response.data.data;
        }
        // This is the line that causes the error if 'index.ejs' can't be found
        res.render('index', { animeData, query });
    } catch (error) {
        console.error('API Error:', error.message);
        res.render('index', { animeData: [], query, error: 'Could not fetch anime data.' });
    }
});

// For local development
if (process.env.NODE_ENV !== 'production') {
    app.listen(port, () => {
        console.log(`Server is running locally on http://localhost:${port}`);
    });
}

export default app;
