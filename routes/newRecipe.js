var express = require('express');
var router  = express.Router();

var common  = require('../public/javascripts/server/common.js');
var enums   = require('../public/javascripts/server/enums.js');

router.get('/', function(req, res, next) {
  try {
   res.render('newRecipe', { commonUtils: common,
                             enums:       enums });
  } catch (error) {
   console.log("Error = " + error);
  }
});

module.exports = router;
