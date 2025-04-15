var express      = require('express');
var fs           = require('fs');
var path         = require('path');
var router       = express.Router();
var xml2jsParser = require('xml2js-parser');

var common = require(path.join(__dirname, '../public/javascripts/server/common.js'));
var enums  = require(path.join(__dirname, '../public/javascripts/server/enums.js'));

router.get('/', function(req, res, next) {
  var rv = common.GenerateFilesList(fs, xml2jsParser, path.join(__dirname, '../public/data/recipes'), 'ALL', 'ALL');
 
  res.render('index', { title: 'Recipe Server', categoryTypes: enums.CategoryTypes, cuisineTypes: enums.CuisineTypes, filesList: rv});
});

module.exports = router;
