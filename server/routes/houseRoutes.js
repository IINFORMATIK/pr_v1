const express = require('express');
const router = express.Router();
const House = require('../models/House');

// Добавить дом
router.post('/add', async (req, res) => {
  const newHouse = new House(req.body);
  await newHouse.save();
  res.send('Дом добавлен');
});

// Найти дом
router.get('/find', async (req, res) => {
  const { street, houseNumber } = req.query;
  const house = await House.findOne({ street, houseNumber });
  res.json(house);
});

// Получить список улиц
router.get('/streets', async (req, res) => {
  const streets = await House.distinct('street');
  res.json(streets);
});

// Получить список домов по улице
router.get('/houses', async (req, res) => {
  const { street } = req.query;
  const houses = await House.find({ street }, 'houseNumber');
  res.json(houses);
});

module.exports = router;
