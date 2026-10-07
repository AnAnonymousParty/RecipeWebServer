const express      = require('express');
const fs           = require('fs');
const path         = require('path');
const router       = express.Router();
const xmlBuilder   = require('xmlbuilder2');
const xml2js       = require('xml2js');
const xml2jsParser = require('xml2js-parser');

const common             = require('../public/javascripts/server/common.js');
const enums              = require('../public/javascripts/server/enums.js');
const validationRulesLib = require('../public/javascripts/server/validationRules.js');

router.get('/', function(req, res, next) {
 let recipeName = req.query.recipeToEdit;
 
 console.log("> EditRecipe(" + recipeName + ")");
 
 let validationRules = new validationRulesLib.ValidationRules();
 
 let recipeDataXml = "";
 
 try {
  recipeDataXml = fs.readFileSync(path.join(__dirname, '/../public/data/recipes/', recipeName + '.xml')); 
  
  //console.log("  EditRecipe(): xml = " + recipeDataXml);
 } catch (err) {
  console.log("  EditRecipe(): Error - " + err);
 }
 
 let recipeDataJson = xml2jsParser.parseStringSync(recipeDataXml);
 
 //console.log("JSONs: ", JSON.stringify(recipeDataJson, null, 2));
 
 try {
  console.log("  EditRecipe(): Rendering...");
  
  let renderParameters = { 
   commonUtils:     common,    
   enums:           enums,
   recipeData:      recipeDataJson,
   validationRules: validationRules
  };
  
  res.render('editRecipe', renderParameters, function (errors, htmlOutput) {
   if (undefined != errors) {
    console.log("  EditRecipe: Error = " + errors);
   
    res.send("Internal Server Error. Unable to edit recipe.<br><br>" + errors);                
   } else {
    res.send(htmlOutput);
   }
  })
 } catch (err) {
  console.log("  EditRecipe(): Error - " + err);
 } 
 
 console.log("< EditRecipe()");
});

module.exports = router;
