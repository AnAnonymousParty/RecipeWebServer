const express          = require('express');
const fs               = require('fs');
const path             = require('path');
const router           = express.Router();
const xmlBuilder       = require('xmlbuilder2');
const xml2js           = require('xml2js');
const xml2jsParser     = require('xml2js-parser');

const { DOMParser, XMLSerializer } = require('xmldom');

const common           = require('../public/javascripts/server/common.js');
const configManagerLib = require('../public/javascripts/server/ConfigManager.js');
const enums            = require('../public/javascripts/server/enums.js');

let configManager = null;

router.get('/', function(req, res, next) {
 console.log("> EditConfig()");
 
 try {
  configManager = new configManagerLib.ConfigManager(enums, fs, DOMParser, path.join(__dirname, '../private/Config/', 'Config.xml'));
} catch (err) {
  console.log("  EditConfig(): Err= " + err);
}

 try {
  console.log("  EditConfig(): Rendering...");
  
  let renderParameters = { 
   commonUtils:  common,    
   enums:        enums,
   configMgr:    configManager
  };
  
  res.render('editConfig', renderParameters, function (errors, htmlOutput) {
   if (undefined != errors) {
    console.log("< EditConfig: Error = " + errors);
   
    res.send("Internal Server Error. Unable to edit configuration.<br><br>" + errors);                
   } else {
    res.send(htmlOutput);
   }
  })
 } catch (err) {
  console.log("  EditConfig(): Error - " + err);
  
  res.send("Internal Server Error. Unable to edit configuration.<br><br>" + err); 
 } 
 
 console.log("< EditConfig()");
});

module.exports = router;
