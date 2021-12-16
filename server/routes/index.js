var express = require('express');
var router = express.Router();
const Pet = require('../models/Pet')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send("this is showing up on idex");
});

router.post('/add-pet', function (req, res, next){
  console.log('The new pet:', req.body);

  const petToCreate = new Pet({
    name: req.body.name,
    age: req.body.age,
    likesVet: req.body.likesVet,
    animal: req.body.pet,
  });

  Pet.create(petToCreate)
    .then((results) => {
      console.log('These are the results', results);
      res.json(results);
    })
    .catch((err) => {
      console.log('Something went wrong', err);
      res.json(err);
    });

});

router.get('/all-pets', (req, res) => {
  Pet.find()
    .then((results) => {
      res.json(results);
    })
    .catch((err) => {
      console.log('Something went wrong', err);
      res.json({ error: err.message });
    });
});

module.exports = router;
