const express = require('express');
const property = require('../models/property')
const router = express.Router();

router.get('/data', async (req, res) => {
    try {
      const data = await property.find(); 
      console.log(data)
      res.status(200).json(data); 
    } catch (error) {
      res.status(500).json({ message: 'Error fetching data', error });
    }
});

module.exports = router;