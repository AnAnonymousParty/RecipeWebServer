var express      = require('express');
var fs           = require('fs');
var path         = require('path');
var router       = express.Router();
var xml2jsParser = require('xml2js-parser');

var commonLib          = require(path.join(__dirname, '../public/javascripts/server/common.js'));
var enumsLib           = require(path.join(__dirname, '../public/javascripts/server/enums.js'));
let validationRulesLib = require(path.join(__dirname, '../public/javascripts/server/validationRules.js'));

router.get('/', function(req, res, next) {
  var directoryPath    = path.join(__dirname, '../public/data/recipes'); 
  var recipesList      = fs.readdirSync(directoryPath); 
  var rv               = commonLib.GenerateFilesList(fs, xml2jsParser, directoryPath, 'ALL', 'ALL');
  var validationRules = new validationRulesLib.ValidationRules();
 
  res.render('index', { title:              'Recipe Server', 
                        enums:              enumsLib,                        
                        filesList:          rv,
                        recipesCnt:         recipesList.length,
                        validationRules:    validationRules});
});

module.exports = router;
