// index.js

import express from 'express';
import axios from 'axios';

const app = express();
const port = 3000;

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Main route for both rendering the page and handling search
app.get('/', async (req, res) => {
  // Get the search query from the URL, default to an empty string if not present
  const query = req.query.q || '';
  let animeData = []; // Initialize animeData as an empty array to prevent errors

  try {
    // Only perform the API call if there is a search query
    if (query) {
      const response = await axios.get(`https://api.jikan.moe/v4/anime`, {
        params: { q: query } // Use params for cleaner URL handling
      });
      animeData = response.data.data;
    }
    // Render the index page, passing the search query and the results
    res.render('index', { animeData, query });
  } catch (error) {
    console.error('Failed to fetch data from Jikan API:', error.message);
    // Render the page with an error message
    res.render('index', { animeData: [], query, error: 'Could not fetch anime data. Please try again later.' });
  }
});

// Start the server for local development
// Vercel will ignore this and use the exported 'app'
if (process.env.NODE_ENV !== 'production') {
  app.listen(port, () => {
    console.log(`Server is running locally on http://localhost:${port}`);
  });
}

// Export the app for Vercel
export default app;
