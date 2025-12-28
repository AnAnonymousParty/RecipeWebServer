var express      = require('express');
var fs           = require('fs');
var path         = require('path');
var router       = express.Router();
var xmlBuilder   = require('xmlbuilder2');
var xml2js       = require('xml2js');
var xml2jsParser = require('xml2js-parser')

var common       = require('../public/javascripts/server/common.js');
var enums        = require('../public/javascripts/server/enums.js');
var stringUtils  = require('../public/javascripts/server/stringUtils.js');

router.get('/', function(req, res, next) { 
 var recipeName     = req.query.recipeName;
 var recipeDataXml  = fs.readFileSync(path.join(__dirname, '/../public/data/recipes/', recipeName + '.xml')); 
 var recipeDataJson = xml2jsParser.parseStringSync(recipeDataXml);
 
 console.log("> viewRecipe(" + recipeName + ")");
 //console.log("JSON: ", JSON.stringify(recipeDataJson, null, 2));
 
 try {
  res.render('viewRecipe', { commonUtils: common, 
                             enumUtils:   enums, 
                             stringUtils: stringUtils,
                             recipeData:  recipeDataJson });
 } catch(err) {
  console.log(err);
 }
 
 console.log("< viewRecipe()");
});

module.exports = router;