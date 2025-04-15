// What we need:

var bodyParser   = require("body-parser");
var cookieParser = require('cookie-parser');
var createError  = require('http-errors');
var eformidable  = require('express-formidable-v2');
var express      = require('express');
var favicon      = require('serve-favicon');
var fs           = require('fs');
var fsExtra      = require('fs-extra');
var logger       = require('morgan');
var path         = require('path');
var xmlBuilder   = require('xmlbuilder2');
var xml2js       = require('xml2js');
var xml2jsParser = require('xml2js-parser');

// What we provide:

var common            = require(path.join(__dirname, '/public/javascripts/server/common.js'));
var enums             = require(path.join(__dirname, '/public/javascripts/server/enums.js'));

var indexRouter       = require('./routes/index');
var editRecipeRouter  = require('./routes/editRecipe');
var newRecipeRouter   = require('./routes/newRecipe');
var printRecipeRouter = require('./routes/printRecipe');
var viewRecipeRouter  = require('./routes/viewRecipe');


var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(__dirname + "/public/images/favicon.ico"));
app.use(eformidable( { uploadDir: path.join(__dirname, "/public/images/Staging"), keepExtensions: true } ));


/*------------------------- GET handlers ------------------------------------*/

app.get('/CheckRecipeExists', (req, res) => {
 var f          = req.query.file2Check + ".xml"
 var file2Check = decodeURIComponent(f);
 
 if (fs.existsSync(__dirname + "/public/data/recipes/" + file2Check)) {
  res.send('YES');
 } else {
  res.send('NO');
 }
});

app.get('/DeleteAllRecipes', (req, res) => {
 console.log("DeleteAllRecipes");
js
 fsExtra.emptyDirSync(__dirname + "/public/data/recipes");
 fsExtra.emptyDirSync(__dirname + "/public/images/recipes");

 // Return the new (empty) list of recipes: 
 
 var rv = common.GenerateFilesList(fs, xml2jsParser, path.join(__dirname, '/public/data/recipes'), 'ALL', 'ALL');
    
 res.status(200).send(rv);
});

app.get('/DeleteFile', (req, res) => {
 var file2Delete = decodeURIComponent(req.query.file2Delete);
 
 fs.access(__dirname + "/public/images/Staging/" + file2Delete, fs.constants.F_OK, (err) => {
  if (err) {
   fs.rmSync(__dirname + "/public/images/recipes/" + file2Delete, {
    force: true,
   });
  }
  else {
   fs.rmSync(__dirname + "/public/images/Staging/" + file2Delete, {
    force: true,
   });
  }
 });
 
 res.send('ok');
});

app.get('/DeleteRecipe', (req, res) => {
var recipe2Delete = decodeURIComponent(req.query.recipe2Delete);

 // Delete the recipe .xml file:
 
 try {
  fs.accessSync(__dirname + "/public/data/recipes/" + recipe2Delete + ".xml", fs.constants.F_OK);

  try {
   fs.rmSync(__dirname + "/public/data/recipes/" + recipe2Delete + ".xml", { force: true, });
  } catch (err) {
   console.log(err);
  }   
 } catch (err) {
  
  console.log(err);
} 
 
 // Delete any image files associated with the recipe:
 
 fs.readdir(__dirname + "/public/images/Recipes", (err, files) => {
  if (err) {
   console.log(err);
  }
  
 files.forEach(file => {
  if (recipe2Delete == file.substring(0, recipe2Delete.length)) { 
   if (err) {
    console.log(err);
   }
   
   fs.rmSync(__dirname + "/public/images/recipes/" + file, { force: true, }); 
  }
 });
});

// Return the new list of recipes: 
 
var rv = common.GenerateFilesList(fs, xml2jsParser, path.join(__dirname, '/public/data/recipes'), 'ALL', 'ALL');
    
res.status(200).send(rv);
});


app.get('/GetRecipesList', (req, res) => {
 var category = req.query.category;
 var cuisine  = req.query.cuisine; 

 // Return the list of recipes: 
 
 var rv = common.GenerateFilesList(fs, xml2jsParser, path.join(__dirname, '/public/data/recipes'), category, cuisine);
    
 res.status(200).send(rv);
});


/*------------------------------- POST handlers -----------------------------*/

// Handle Recipe added:
app.post("/AddNewRecipe", function (req, res) {
 postData = req.body;

 var recipeName = postData.recipeName;
 
 console.log("> AddNewRecipe(" + recipeName + ")"); 
 //console.log("  AddNewRecipe(): JSON=", JSON.stringify(postData, null, 2));
 
 var xml = ParsePostDataToXml(postData); 
 
 try {
  fs.writeFileSync(__dirname + "/public/data/recipes/" + recipeName + ".xml", xml);
 } catch {
  console.log(error);
 }
  
 console.log("The file was saved!");

 var files;

 try {
  files = fs.readdirSync(__dirname + "/public/images/Staging");
 } catch (err) {
  console.log(err);
 }
  
 files.forEach(file => {
  if (recipeName == file.substring(0, recipeName.length)) {
   var uploadedFileName = path.join(__dirname, "/public/images/Staging/") + file;  
   var targetFileName   = path.join(__dirname, "/public/images/Recipes/") + file;
  
   try {
    fs.renameSync(uploadedFileName, targetFileName);
   } catch (err) {
    console.log('ERROR: ' + err);
   }
  }
 });

 RemoveStaleImages();
 
 var rv = common.GenerateFilesList(fs, xml2jsParser, path.join(__dirname, '/public/data/recipes'), 'ALL', 'ALL');
    
 res.status(200).send(rv);
 
 console.log("< AddNewRecipe(" + recipeName + ")"); 
});


// Handle Recipe updated:
app.post("/UpdateRecipe", function (req, res) {
 var postData   = req.body;
 var recipeName = postData.recipeName;
 
 console.log("> UpdateRecipe(" + recipeName + ")"); 
 //console.log("  UpdateRecipe(): JSON=", JSON.stringify(postData, null, 2));
 
 var xml = ParsePostDataToXml(postData);
 
 //console.log("  UpdateRecipe(" + recipeName + "): XML=" + xml); 

 try {
  fs.writeFileSync(__dirname + "/public/data/recipes/" + recipeName + ".xml", xml);
  console.log("The file was saved!");
 } catch (err) {
   console.log(error);
 }
 
 fs.readdir(__dirname + "/public/images/Staging", (err, files) => {
  if (err) {
   console.log(err);
  }
  
  files.forEach(file => {
   if (recipeName == file.substring(0, recipeName.length)) {
    var uploadedFileName = path.join(__dirname, "/public/images/Staging/") + file;  
    var targetFileName   = path.join(__dirname, "/public/images/Recipes/") + file;
    
    fs.rename(uploadedFileName, targetFileName, function(err) {
     if (err) {
      console.log('ERROR: ' + err);
     }
    });
   }
  });
 });

 var rv = common.GenerateFilesList(fs, xml2jsParser, path.join(__dirname, '/public/data/recipes'), 'ALL', 'ALL');
    
 res.status(200).send(rv);
});


// Handle image uploaded.
app.post("/uploadImage", function (req, res) {

 var recipeName       = req.fields.recipeName; 
 var uploadedFileName = req.files.image.path;  
 var targetFileName   = path.join(__dirname, "/public/images/Staging/") + recipeName + '_' + req.files.image.name;
 
 fs.rename(uploadedFileName, targetFileName, function(err) {
  if (err) {
   console.log('ERROR: ' + err);
  }
 });
 
 console.log("< UpdateRecipe()"); 
 
 return res.send("Successfully uploaded");
});


/*------------------------ Route handlers ----------------------------------*/

app.use('/',                    indexRouter);
app.use('/ShowEditRecipePage',  editRecipeRouter);
app.use('/ShowNewRecipePage',   newRecipeRouter);
app.use('/ShowPrintRecipePage', printRecipeRouter);
app.use('/ShowViewRecipePage',  viewRecipeRouter);

// Catch 404 and forward to error handler.
app.use(function(req, res, next) {
  next(createError(404));
});

// Error handler:
app.use(function(err, req, res, next) {
  // Set locals, only providing error in development.
  res.locals.message = err.message;
  res.locals.error   = req.app.get('env') === 'development' ? err : {};

  // Render the error page:
  res.status(err.status || 500);
  res.render('error');
});

function ParsePostDataToXml(postData) {
 //console.log("> ParsePostDataToXml(", JSON.stringify(postData, null, 2) + ")");
 
 var doc = xmlBuilder.create({ version: '1.0' });
 
 var root  = doc.ele('Recipe');
 var title = root.ele('Title');
 
 title.att('image',    postData.mainImageName);
 title.att('name',     postData.recipeName);
 title.att('category', postData.category);
 title.att('cuisine',  postData.cuisine);
 
 var yieldElem = title.ele('Yield');
 
 yieldElem.att('amount', postData.yield);
 yieldElem.att('units',  postData.yieldUnit);
 
 var times = title.ele('Times');
 
 times.att('prep', postData.prepTime);
 times.att('cook', postData.cookTime);
 
 
 var nutrition = root.ele('Nutrition');
 
 nutrition.att('calories', postData.calories);
 nutrition.att('fat',      postData.fat); 
 nutrition.att('carbs',    postData.carbs); 
 nutrition.att('sugar',    postData.sugar); 
 nutrition.att('fiber',    postData.fiber);  
 
 
 var desc = root.ele('Description');
 
 desc.txt(postData.description);
 
 
 var presElem = root.ele('Prerequisites');
 var preData  = postData.prerequisite;
 
 if (null != preData) {
  if (Array.isArray(preData)) {
   for (var i = 0; i < preData.length; ++i) {
    var prerequisite = preData[i];
   
    var preElem = presElem.ele('Prerequisite');
    
    preElem.txt(prerequisite);
   }
  } else {
   var preElem = presElem.ele('Prerequisite');
   
   preElem.txt(preData);
  }
 } 
 
 
 var ingredientsElem = root.ele('Ingredients');
 var ingredientsData = postData.ingredient;
 
 if (null != ingredientsData) {
  if (Array.isArray(ingredientsData)) {
   for (var i = 0; i < ingredientsData.length; ++i) {
    var ingredientName     = ingredientsData[i];
    var ingredientElem     = ingredientsElem.ele('Ingredient');
    var ingredientNameElem = ingredientElem.ele("Name");
    var quantityElem       = ingredientElem.ele("Quantity");
    var prepElem           = ingredientElem.ele("Prep");
    var notesElem          = ingredientElem.ele("Notes");
    
    ingredientNameElem.txt(ingredientName);
    quantityElem.att('units', enums.GetEnumFromUnitDesc(postData.measure[i]));
    quantityElem.txt(postData.quantity[i]);
    prepElem.txt(enums.GetEnumFromPrepDesc(postData.prep[i])); 
    notesElem.txt(postData.notes[i]);
   }
  } else {
    var ingredientName     = ingredientsData;
    var ingredientElem     = ingredientsElem.ele('Ingredient');
    var ingredientNameElem = ingredientElem.ele("Name");
    var quantityElem       = ingredientElem.ele("Quantity");
    var prepElem           = ingredientElem.ele("Prep");
    var notesElem          = ingredientElem.ele("Notes");
    
    ingredientNameElem.txt(ingredientName);
    quantityElem.att('units', enums.GetEnumFromUnitDesc(postData.measure));
    quantityElem.txt(postData.quantity);
    prepElem.txt(enums.GetEnumFromPrepDesc(postData.prep)); 
    notesElem.txt(postData.notes);
  }
 }
 
 
 var methodElem = root.ele('Method');
 var stepsData  = postData.step;
 
 if (null != stepsData) {
  if (Array.isArray(stepsData)) {  
   for (var i = 0; i < stepsData.length; ++i) {
    var step  = stepsData[i]; 
    
    var imgSrc = "";
    
    if ("undefined" != typeof(postData.stepImage)) {
     imgSrc = postData.stepImage[i];
    }
    
    var stepElem = methodElem.ele('Step');
    
    stepElem.att('image', imgSrc);
    stepElem.txt(step);
   }
  } else {
    var step = stepsData;
   
    var stepElem = methodElem.ele('Step');
    
    stepElem.att('image', postData.stepImage);
    stepElem.txt(step);
  }
 } 
 

 var varsElem = root.ele('Variations');
 var varData  = postData.variation;
 
 if (null != varData) {
  if (Array.isArray(varData)) {
   for (var i = 0; i < varData.length; ++i) {
    var variation = varData[i];
   
    var varElem = varsElem.ele('Variation');
    
    varElem.txt(variation);
   }
  } else {
   var varElem = varsElem.ele('Variation');
   
   varElem.txt(varData);
  }
 }
 
 var rv = doc.end({ prettyPrint: true });
 
 //console.log("< ParsePostDataToXml() [" + rv + "]");
 
 return(rv);
}

function RemoveStaleImages() {
 var now = new Date().getTime();
 
 fs.readdir(__dirname + "/public/images/Staging", (err, files) => {
  if (err) {
   console.log(err);
  }
  
  files.forEach(file => {
   var stats = fs.statSync(path.join(__dirname, "/public/images/Staging/") + file);
   var fileCreatedDate = stats.ctime;
  
   var expiredTime = new Date(fileCreatedDate).getTime() + (4 * 60 * 60 * 1000);
  
   if (now > expiredTime) {
    console.log("Removing " + file);
   
    fs.rmSync(path.join(__dirname, "/public/images/Staging/") + file, { force: true, });
   }
  });
 }); 
}

module.exports = app;
