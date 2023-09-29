const express = require('express');
const router = express.Router();
const {CityModel} = require('../models/citydata');
const userRouter=express.Router()

userRouter.post('/addcity', async (req, res) => {
  try {
    const Cities= new CityModel(req.body)
    await Cities.save()
    res.status(200).send({"msg":"City addded"})
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while saving the data.' });
  }
});

// userRouter.get('/', async (req, res) => {
//     try {
//       const weatherData = await CityModel.find();
//       res.status(200).json(weatherData);
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ error: 'An error occurred while fetching the data.' });
//     }
//   });
const ITEMS_PER_PAGE = 3; // Define the number of items per page

userRouter.get('/cities', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Get the requested page number from the query parameters
    const skip = (page - 1) * ITEMS_PER_PAGE; // Calculate the number of documents to skip

    const totalItems = await CityModel.countDocuments();
    
    const weatherData = await CityModel.find()
      .skip(skip)
      .limit(ITEMS_PER_PAGE)
      .exec();

    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

    res.status(200).json({
      weatherData,
      currentPage: page,
      totalPages,
      totalItems
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while fetching the data.' });
  }
});

userRouter.get('/cities/:id', async (req, res) => {
  try {
    const cityId = req.params.id; 
    const weatherData = await CityModel.findById(cityId); 

    if (!weatherData) {
    
      return res.status(404).json({ error: 'City not found' });
    }

    res.status(200).json(weatherData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while fetching the data.' });
  }
});




  userRouter.patch('/cities/:id', async (req, res) => {
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
