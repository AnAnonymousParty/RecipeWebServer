var express      = require('express');
var fs           = require('fs');
var path         = require('path');
var router       = express.Router();
var xmlBuilder   = require('xmlbuilder2');
var xml2js       = require('xml2js');
var xml2jsParser = require('xml2js-parser');

var common = require('../public/javascripts/server/common.js');
var enums  = require('../public/javascripts/server/enums.js');

router.get('/', function(req, res, next) {
 var recipeName = req.query.recipeToEdit;
 
 console.log("> EditRecipe(" + recipeName + ")");
 
 try {
  var recipeDataXml = fs.readFileSync(path.join(__dirname, '/../public/data/recipes/', recipeName + '.xml')); 
 } catch (err) {
  console.log(err);
 }
 
 var recipeDataJson = xml2jsParser.parseStringSync(recipeDataXml);
 
 //console.log("JSONs: ", JSON.stringify(recipeDataJson, null, 2));
 
 try {
  res.render('editRecipe', { commonUtils: common,    
                                   enums: enums,
                              recipeData: recipeDataJson });
 } catch (err) {
  console.log(err);
 }
 
 console.log("< EditRecipe()");
});

module.exports = router;
