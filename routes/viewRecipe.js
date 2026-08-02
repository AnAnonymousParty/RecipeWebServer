const express      = require('express');
const fs           = require('fs');
const path         = require('path');
const router       = express.Router();
const xmlBuilder   = require('xmlbuilder2');
const xml2js       = require('xml2js');
const xml2jsParser = require('xml2js-parser')

const common       = require('../public/javascripts/server/common.js');
const enums        = require('../public/javascripts/server/enums.js');
const stringUtils  = require('../public/javascripts/server/stringUtils.js');

router.get('/', function(req, res, next) { 
 let recipeName     = req.query.recipeName;
 let recipeDataXml  = fs.readFileSync(path.join(__dirname, '/../public/data/recipes/', recipeName + '.xml')); 
 let recipeDataJson = xml2jsParser.parseStringSync(recipeDataXml);
 
 console.log("> viewRecipe(" + recipeName + ")");
 //console.log("JSON: ", JSON.stringify(recipeDataJson, null, 2));
 
 try {
  let renderParameters = { 
   commonUtils: common,    
   enumUtils:   enums,
   recipeData:  recipeDataJson,
   stringUtils: stringUtils
  };
  
  res.render('viewRecipe', renderParameters, RenderResultsHandler);
 } catch(err) {
  console.log(err);
 }
 
 /**
  Nested function to process the rendering results by either returning an error
  message or the rendered html results back to the client.
 */
 function RenderResultsHandler(errors, htmlOutput) {
  if (undefined != errors) {
   console.log("  ViewRecipe: Error = " + errors);
   
   res.send("Internal Server Error. Unable to display necipe.<br><br>" + errors);                
  } else {
   res.send(htmlOutput);
  }
 } 
 
 console.log("< viewRecipe()");
});

module.exports = router;