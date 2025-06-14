var express      = require('express');
var fs           = require('fs');
var path         = require('path');
var router       = express.Router();
var xml2jsParser = require('xml2js-parser');

var common = require(path.join(__dirname, '../public/javascripts/server/common.js'));
var enums  = require(path.join(__dirname, '../public/javascripts/server/enums.js'));

router.get('/', function(req, res, next) {
 var recipeName     = req.query.recipeName;
 var recipeDataXml  = fs.readFileSync(path.join(__dirname, '/../public/data/recipes/', recipeName + '.xml')); 
 var recipeDataJson = xml2jsParser.parseStringSync(recipeDataXml);
 
 res.render('getRecipe', { title: 'Recipe Server', commonUtils: common, enumUtils: enums, recipeData: recipeDataJson});
});

module.exports = router;
