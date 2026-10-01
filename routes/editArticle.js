const express = require('express');
const fs      = require('fs');
const router  = express.Router();

const commonLib          = require('../public/javascripts/server/common.js');
const enumsLib           = require('../public/javascripts/server/enums.js');
const validationRulesLib = require('../public/javascripts/server/validationRules.js');

const validationRules = new validationRulesLib.ValidationRules();

router.get('/', function(req, res, next) {
 let articleName = req.query.articleToEdit;
 
 console.log("> editArticle(" + articleName + ")");
 
 let renderParameters = { 
  commonUtils:     commonLib,
  enums:           enumsLib,
  validationRules: validationRules 
 };
  
 console.log("  editArticle(): Rendering...");
  
 try {
  articleHtml = "<input id='articleName'  type='hidden' value='" + articleName + "'>"
              + "<input id='documentType' type='hidden' value='article'>"
              + "<div class=\"centered\">" 
              + " <span style=\"display: inline-block; width: 400px;\">"
              + "  <div style=\"display: flex; align-items: center;\">"
              + "    <span style=\"display: inline-block; vertical-align: middle;\">"
              + "     <input id=\"articleFilePathName\"" 
              + "            onchange=\"HandleFileSelectionChanged('articleFilePathName', 'uploadNewContentBtn');\"" 
              + "            required\"required\""
              + "            style=\"color: black; vertical-align: middle;\""
              + "            type=\"file\""
              + "            value=\"\">"   
              + "     <img height=\"48px\"" 
              + "          id=\"uploadNewContentBtn\""
              + "          onclick=\"SendNewContentFile();\""
              + "          src=\"/images/Buttons/UploadBtn_48X48.png\""
              + "          style=\"display: hidden; visibility: collapse; vertical-align: middle;\""
              + "          title=\"Upload New Content File\""
              + "          width=\"48px\">" 
              + "    </span>" 
              + "   </div>"
              + "  <span>"
              + " </div>"    
              + " <br>"    
              + " <img height=\"100px\"" 
              + "      id=\"uploadNewContentSpinner\""
              + "      src=\"/images/Spinner.gif\""
              + "      style=\"display: hidden; margin: auto; visibility: collapse;\""
              + "      width=\"100px\">"               
              + fs.readFileSync(__dirname + "/../public/data/statics/" + articleName + ".html", {encoding: 'utf8', flag: 'r'}); 
 } catch (err) {
  console.log("< editArticle(): Error=" + err); 
   
  res.status(enumsLib.HttpStatusTypes.INTERNALSERVERERROR).send(err);

  return; 
 }    
   
 res.status(enumsLib.HttpStatusTypes.OK).send(articleHtml);
 
 console.log("< editArticle()");
});

module.exports = router;
