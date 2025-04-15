var express = require('express');
var router  = express.Router();

var common = require('../public/javascripts/server/common.js');
var enums  = require('../public/javascripts/server/enums.js');

router.get('/', function(req, res, next) {
  res.render('newRecipe', { commonUtils:      common,
                            categoryTypes:    enums.CategoryTypes, 
                            cuisineTypes:     enums.CuisineTypes, 
                            preparationTypes: enums.PreparationTypes,
                            unitTypes:        enums.UnitTypes          });
});

module.exports = router;
