// index.js

import express from 'express';
import axios from 'axios';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

// MODIFIED: Main route for search and default top anime
app.get('/', async (req, res) => {
    const query = req.query.q || '';
    let pageTitle = 'Search';
    let animeData = [];

    try {
        if (query) {
            // User is searching
            pageTitle = `Search Results for "${query}"`;
            const response = await axios.get(`https://api.jikan.moe/v4/anime`, {
                params: { q: query, sfw: true } // sfw=true filters inappropriate content
            });
            animeData = response.data.data;
        } else {
            // No search, show top anime by default
            pageTitle = 'Top Airing Anime';
            const response = await axios.get('https://api.jikan.moe/v4/top/anime', {
                params: { filter: 'airing' }
            });
            animeData = response.data.data;
        }
        res.render('index', { animeData, query, pageTitle });
    } catch (error) {
        console.error('API Error:', error.message);
        res.render('index', { animeData: [], query, pageTitle: 'Error', error: 'Could not fetch anime data.' });
    }
});

// NEW: Route for individual anime details
app.get('/anime/:id', async (req, res) => {
    try {
        const animeId = req.params.id;
        const response = await axios.get(`https://api.jikan.moe/v4/anime/${animeId}/full`);
        const anime = response.data.data;
        res.render('anime-details', { anime }); // We will create this new EJS file
    } catch (error) {
        console.error('API Error:', error.message);
        res.status(500).send('Could not fetch anime details. Please try again later.');
    }
});

// For local development only
if (process.env.NODE_ENV !== 'production') {
    app.listen(3000, () => console.log('Server running on http://localhost:3000'));
}

export default app;
