import express from 'express';
import axios from 'axios';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index');
  });
  
  app.get('/search', async (req, res) => {
    try {
      const query = req.query.q;
  
      if (!query) {
        // If the search query is empty, redirect to the homepage
        return res.redirect('/');
      }
  
      const response = await axios.get(`https://api.jikan.moe/v4/anime?q=${query}`);
      const animeData = response.data.data; 
  
      res.render('index', { animeData });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
