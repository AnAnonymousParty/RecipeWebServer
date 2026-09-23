const express = require('express');
const router  = express.Router();

const commonLib          = require('../public/javascripts/server/common.js');
const enumsLib           = require('../public/javascripts/server/enums.js');
const validationRulesLib = require('../public/javascripts/server/validationRules.js');

const validationRules = new validationRulesLib.ValidationRules();

router.get('/', function(req, res, next) {
  console.log("> newArticle()");
  
  let renderParameters = { 
   commonUtils:     commonLib,
   enums:           enumsLib,
   validationRules: validationRules 
  };
  
  try {
   res.render('newArticle', renderParameters, RenderResultsHandler);
  } catch (error) {
   console.log("  newArticle: Error = " + error);
  }
  
 console.log("< newArticle()");
 
 /**
  Nested function to process the rendering results by either returning an error
  message or the rendered html results back to the client.
 */
 function RenderResultsHandler(errors, htmlOutput) {
  if (undefined != errors) {
   console.log("  newArticle: Error = " + errors);
   
   res.send("Internal Server Error. Unable to add new article.<br><br>" + errors);                
  } else {
   res.send(htmlOutput);
  }
 } 
});

module.exports = router;
