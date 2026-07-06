const express = require('express');
const router  = express.Router();

const commonLib          = require('../public/javascripts/server/common.js');
const enumsLib           = require('../public/javascripts/server/enums.js');
const validationRulesLib = require('../public/javascripts/server/validationRules.js');

const validationRules = new validationRulesLib.ValidationRules();

router.get('/', function(req, res, next) {
  console.log("> newRecipe()");
  
  let renderParameters = { 
   commonUtils:     commonLib,
   enums:           enumsLib,
   validationRules: validationRules 
  };
  
  try {
   res.render('newRecipe', renderParameters, RenderResultsHandler);
  } catch (error) {
   console.log("  newRecipe: Error = " + error);
  }
  
 console.log("< newRecipe()");
 
 /**
  Nested function to process the rendering results by either returning an error
  message or the rendered html results back to the client.
 */
 function RenderResultsHandler(errors, htmlOutput) {
  if (undefined != errors) {
   console.log("  newRecipe: Error = " + errors);
   
   res.send("Internal Server Error. Unable to add new necipe.<br><br>" + errors);                
  } else {
   res.send(htmlOutput);
  }
 } 
});

module.exports = router;
