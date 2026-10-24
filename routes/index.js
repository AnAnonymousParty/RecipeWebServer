const express      = require('express');
const fs           = require('fs');
const path         = require('path');
const router       = express.Router();
const xml2jsParser = require('xml2js-parser');

const  commonLib          = require(path.join(__dirname, '../public/javascripts/server/common.js'));
const  enumsLib           = require(path.join(__dirname, '../public/javascripts/server/enums.js'));
const  validationRulesLib = require(path.join(__dirname, '../public/javascripts/server/validationRules.js'));

router.get('/', function(req, res, next) {
  console.log("> index()"); 
  
  let directoryPath   = path.join(__dirname, '../public/data/recipes'); 
  let recipesList     = fs.readdirSync(directoryPath); 
  let rv              = commonLib.GenerateFilesList(fs, path, xml2jsParser, 'ALL', 'ALL');
  let validationRules = new validationRulesLib.ValidationRules();
  
  let renderParameters = { 
   title:           'Recipe Server', 
   enums:           enumsLib,                        
   filesList:       rv,
   recipesCnt:      recipesList.length,
   validationRules: validationRules };
  
  res.render('index', renderParameters, function (errors, htmlOutput) {
   if (undefined != errors) {
    console.log("< index: Error = " + errors);
   
    res.send("Internal Server Error. Unable to obtain recipes.<br><br>" + errors);                
   } else {
    res.send(htmlOutput);
   }
  });
 
  console.log("< index()");
});

module.exports = router;
