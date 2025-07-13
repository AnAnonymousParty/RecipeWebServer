var express      = require('express');
var fractional   = require('fractional');
var fs           = require('fs');
var path         = require('path');
var router       = express.Router();
var xmlBuilder   = require('xmlbuilder2');
var xml2js       = require('xml2js');
var xml2jsParser = require('xml2js-parser')

var common = require('../public/javascripts/server/common.js');
var enums  = require('../public/javascripts/server/enums.js');

router.get('/', function(req, res, next) {  
 var recipeName = req.query.recipeToPrint;
 
 console.log("> printRecipe(" + recipeName + ")");
 
 var recipeDataXml  = fs.readFileSync(path.join(__dirname, '/../public/data/recipes/', recipeName + '.xml')); 
 var recipeDataJson = xml2jsParser.parseStringSync(recipeDataXml);
 
 res.render('printRecipe', { commonUtils: common, enumUtils: enums, fractionUtils: fractional, recipeData: recipeDataJson });
 
 console.log("< printRecipe()");
});

module.exports = router;