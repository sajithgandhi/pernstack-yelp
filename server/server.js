require('dotenv').config();
const express = require('express');
const cors = require('cors');
const pino = require('pino-http')();

const db = require('./db');

const PORT = process.env.PORT || 3002;

const app = express();
app.use(cors());
app.use(express.json());
app.use(pino);

// Get all restaurants
app.get('/api/v1/restaurants', async (req, res) => {
  req.log.info('something');
  try {
    const results = await db.query('SELECT * FROM pernyelp_restaurants');
    res.status(200).json({
      status: 'success',
      results: results.rows.length,
      data: {
        restaurants: results.rows,
      },
    });
  } catch (error) {
    console.log(error);
  }
});

// Get a single restaurant
app.get('/api/v1/restaurants/:id', async (req, res) => {
  const restaurantId = req.params.id;
  try {
    const results = await db.query(
      'SELECT * FROM pernyelp_restaurants WHERE id = $1',
      [restaurantId]
    );
    res.status(200).json({
      status: 'success',
      data: {
        restaurant: results.rows[0],
      },
    });
  } catch (error) {
    console.log(error);
  }
});

// Create a restaurant
app.post('/api/v1/restaurants', async (req, res) => {
  const { name, location, price_range } = req.body;
  try {
    const results = await db.query(
      'INSERT INTO pernyelp_restaurants (name, location, price_range) values ($1, $2, $3) returning *',
      [name, location, price_range]
    );
    res.status(201).json({
      status: 'success',
      data: {
        restaurant: results.rows[0],
      },
    });
  } catch (error) {
    console.log(error);
  }
});

// Update a restaurant
app.put('/api/v1/restaurants/:id', async (req, res) => {
  const restaurantId = req.params.id;
  const { name, location, price_range } = req.body;
  try {
    const results = await db.query(
      'UPDATE pernyelp_restaurants SET name = $1, location = $2, price_range = $3 where id = $4 returning *',
      [name, location, price_range, restaurantId]
    );
    res.status(200).json({
      status: 'success',
      data: {
        restaurant: results.rows[0],
      },
    });
  } catch (error) {
    console.log(error);
  }
});

// Delete a restaurant
app.delete('/api/v1/restaurants/:id', async (req, res) => {
  const restaurantId = req.params.id;
  try {
    await db.query('DELETE FROM pernyelp_restaurants WHERE id = $1', [
      restaurantId,
    ]);
    res.status(204).json({
      status: 'success',
    });
  } catch (error) {
    console.log(error);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
