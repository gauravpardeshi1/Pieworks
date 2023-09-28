const express = require('express');
const router = express.Router();
const {CityModel} = require('../models/citydata');
const userRouter=express.Router()

userRouter.post('/', async (req, res) => {
  try {
    const Cities= new CityModel(req.body)
    await Cities.save()
    res.status(200).send({"msg":"City addded"})
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while saving the data.' });
  }
});

userRouter.get('/', async (req, res) => {
    try {
      const weatherData = await CityModel.find();
      res.status(200).json(weatherData);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'An error occurred while fetching the data.' });
    }
  });



  userRouter.patch('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const updatedData = req.body;
      const updatedWeather = await CityModel.findByIdAndUpdate(id, updatedData, { new: true });
  
      if (!updatedWeather) {
        return res.status(404).json({ error: 'Weather record not found.' });
      }
  
      res.status(200).json(updatedWeather);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'An error occurred while updating the data.' });
    }
  });

module.exports = {userRouter};
