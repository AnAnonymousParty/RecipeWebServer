const express      = require('express');
const fractional   = require('fractional');
const fs           = require('fs');
const path         = require('path');
const router       = express.Router();
const xmlBuilder   = require('xmlbuilder2');
const xml2js       = require('xml2js');
const xml2jsParser = require('xml2js-parser')

const common       = require('../public/javascripts/server/common.js');
const conversions  = require('../public/javascripts/server/conversions.js');
const enums        = require('../public/javascripts/server/enums.js');
const stringUtils  = require('../public/javascripts/server/stringUtils.js');

router.get('/', function(req, res, next) {  
 let recipeName    = req.query.recipeToPrint;
 let scaling       = req.query.scaling;
 let selectedUnits = req.query.units;
 let showButtons   = req.query.ShowButtons;
 let type          = req.query.type;

 console.log("> printRecipe(" + recipeName + ", " + type + ", " + scaling + ", " + showButtons + ", " + selectedUnits + ")");undefined
 
 if (undefined == type) {
  type = "recipe";  // TODO: Remove after new type handling fixed.
 }
 
 let recipeDataJson = "";
 
 if ("recipe" == type) {
  try {
   let pathFileExt = path.join(__dirname, '/../public/data/recipes/', recipeName + '.xml');
   let recipeDataXml = fs.readFileSync(pathFileExt); 
   recipeDataJson    = xml2jsParser.parseStringSync(recipeDataXml);
  } catch (err) {
   console.log(err);
  }
  
  res.render('printRecipe', { commonUtils:   common, 
                              conversions:   conversions,
                              enumUtils:     enums,  
                              fractionUtils: fractional, 
                              recipeData:    recipeDataJson, 
                              scaling:       scaling,
                              showButtons:   showButtons,
                              selectedUnits: selectedUnits,
                              stringUtils:   stringUtils});
 }
 
 if ("article" == type) {
  let content = "";
  
  try {
   content = fs.readFileSync(path.join(__dirname, "/../public/data/statics/" + recipeName + ".html"), {encoding: 'utf8', flag: 'r'}); 
   
   let renderParameters = { 
    articleName: recipeName,
    content:     content,
    showButtons: showButtons
   };
   
   res.render('printArticle', renderParameters, function (errors, htmlOutput) {
    if (undefined != errors) {
     console.log("  print: Error = " + errors);
     
     res.send("Internal Server Error. Unable to render print necipe page.<br><br>" + errors);                
    } else {
     console.log("  printRecipe(): " + htmlOutput);
     res.send(htmlOutput);
    }
   })
  } catch (err) {
   console.log(err);  
  } 
 }
 
 console.log("< printRecipe()");
}); 

module.exports = router;