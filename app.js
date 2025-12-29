// javascript libraries we need:

const bodyParser   = require("body-parser");
const cookieParser = require('cookie-parser');
const createError  = require('http-errors');
const eformidable  = require('express-formidable-v2');
const express      = require('express');
const favicon      = require('serve-favicon');
const fractional   = require('fractional');
const fs           = require('fs');
const fsExtra      = require('fs-extra');
const logger       = require('morgan');
const path         = require('path');
const puppeteer    = require('puppeteer');
const xmlBuilder   = require('xmlbuilder2');
const xml2js       = require('xml2js');
const xml2jsParser = require('xml2js-parser');
const zipUtils     = require('adm-zip');

const { DOMParser, XMLSerializer } = require('xmldom');

// javascript we provide:

var common      = require(path.join(__dirname, '/public/javascripts/server/common.js'));
var enums       = require(path.join(__dirname, '/public/javascripts/server/enums.js'));
var searchUtils = require(path.join(__dirname, '/public/javascripts/server/search.js'));

// Route Handlers:

var indexRouter       = require('./routes/index');
var editRecipeRouter  = require('./routes/editRecipe');
var getRecipeRouter   = require('./routes/getRecipe');
var newRecipeRouter   = require('./routes/newRecipe');
var printRecipeRouter = require('./routes/printRecipe');
var viewRecipeRouter  = require('./routes/viewRecipe');


var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(__dirname + "/public/images/favicon.ico"));
app.use(eformidable( { uploadDir: path.join(__dirname, "/public/images/Staging"), keepExtensions: true, maxFileSize: 1000 * 1024 * 1024 } ));

// Enable logging, but not every GET for static resources:
app.use(logger('dev', {
 skip(req, res) {
   return -1 !== ['.jpg', '.jpeg', '.png'].indexOf(path.extname(req.path));
 }
}));


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
 console.log("> DeleteAllRecipes()");

 fsExtra.emptyDirSync(__dirname + "/public/data/recipes");
 fsExtra.emptyDirSync(__dirname + "/public/images/recipes");

 // Return the new (empty) list of recipes: 
 
 var rv = common.GenerateFilesList(fs, xml2jsParser, path.join(__dirname, '/public/data/recipes'), 'ALL', 'ALL');
    
 res.status(enums.HttpStatusTypes.OK).send(rv);
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

// Handle Export All recipes.
app.get("/ExportAllRecipes", function (req, res) {
 console.log("> ExportAllRecipes()"); 
 
 const exportPath               = path.join(__dirname,  "/public/exports");
 const imagesPath               = path.join(__dirname,  "/public/images/Recipes");
 const recipesExportPathNameExt = path.join(exportPath, "recipes.zip");
 const recipesPath              = path.join(__dirname,  "/public/data/recipes");
 
 if (false == fs.existsSync(exportPath)) {
  fs.mkdirSync(exportPath);
 }

 var zip = new zipUtils();
 
 try {
  zip.addLocalFolder(recipesPath, "recipes");
  zip.addLocalFolder(imagesPath,  "images");
 
  zip.writeZip(recipesExportPathNameExt);
 } catch (err) {
  console.log("  ExportAllRecipes() " + err); 
 }
 
 ExportRecipes(recipesExportPathNameExt, req, res) 
 
 console.log("< ExportAllRecipes()"); 
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
   
   res.responseText = err;
   res.status(enums.HttpStatusTypes.INTERNALSERVERERROR).send(err);
   
   return;
  }   
 } catch (err) {
  
  console.log(err);
  
  res.responseText = err;
  res.status(enums.HttpStatusTypes.INTERNALSERVERERROR).send(err);
  
  return;
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
    
res.status(enums.HttpStatusTypes.OK).send(rv);
});

app.get('/GetRecipesList', (req, res) => {
 var category = req.query.category;
 var cuisine  = req.query.cuisine; 
 
 var dirPath = path.join(__dirname, '/public/data/recipes');

 // Return the list of recipes: 
 
 var rv = common.GenerateFilesList(fs, xml2jsParser, path.join(__dirname, '/public/data/recipes'), category, cuisine);
    
 res.status(enums.HttpStatusTypes.OK).send(rv);
});

app.get('/GetRecipesToExportList', (req, res) => {
 console.log("> GetRecipesToExportList()");

 // Return the list of recipes: 
 
 var rv = common.GenerateExportList(fs, path, path.join(__dirname, '/public/data/recipes'));
    
 res.status(enums.HttpStatusTypes.OK).send(rv);
});

app.get('/RenameRecipe', (req, res) => {
 console.log("> RenameRecipe(" + decodeURIComponent(req.query.oldRecipeName) + ", " + decodeURIComponent(req.query.newRecipeName) + ")");

 RenameExistingRecipe(decodeURIComponent(req.query.oldRecipeName), decodeURIComponent(req.query.newRecipeName));
    
 console.log("< RenameRecipe()");  

 try {
  var recipeDataXml = fs.readFileSync(path.join(__dirname, '/public/data/recipes/', decodeURIComponent(req.query.newRecipeName + '.xml'))); 
 } catch (err) {
  console.log(err);
 }
 
 var recipeDataJson = xml2jsParser.parseStringSync(recipeDataXml);
 
 //console.log("JSONs: ", JSON.stringify(recipeDataJson, null, 2));
 
 try {
  res.render('editRecipe', { commonUtils: common,    
                                   enums: enums,
                              recipeData: recipeDataJson });
 } catch (err) {
  console.log(err);
 }
});

app.get('/SavePDF', (req, res) => {
 var recipeName = req.query.recipeName;
 var scaling    = req.query.scaling;
 
 console.log("> savePDF(" + recipeName + ", " + scaling + ")");
 
 var recipeDataXml  = fs.readFileSync(path.join(__dirname, '/public/data/recipes/', recipeName + '.xml')); 
 var recipeDataJson = xml2jsParser.parseStringSync(recipeDataXml); 
 
 try {                          
  HandleSavePDF(req, res);
 }
 catch(err) {
  console.error('Error generating PDF:', err);
 } 
 
 console.log("< savePDF()");
});

app.get('/SearchRecipes', (req, res) => {
 console.log("> /SearchRecipe ");
 
 var searchTerm = req.query.searchTerm;

 var dirPath = path.join(__dirname, '/public/data/recipes')
 
 var filesList = [];
 
 filesList = searchUtils.SearchDirectory(fs, path, dirPath, searchTerm);
 
 // Return the list of recipes: 
 
 var rv = common.GenerateFilesListHtmlFromList(fs, xml2jsParser, path.join(__dirname, '/public/data/recipes'), filesList);
    
 console.log("< /SearchRecipe");
 
 res.status(enums.HttpStatusTypes.OK).send(rv);
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
    
 res.status(enums.HttpStatusTypes.OK).send(rv);
 
 console.log("< AddNewRecipe(" + recipeName + ")"); 
});

// Handle Export Selected recipes.
app.post("/ExportSelectedRecipes", function (req, res) {
 console.log("> ExportSelectedRecipes()"); 
 
 var formData = req.body;
 
 if (0 == Object.keys(formData).length) {
  console.log("< ExportSelectedRecipes() - No Data"); 
  
  res.status(enums.HttpStatusTypes.OK).send("No files to export");
  
  return;
 }
 
 const exportPath               = path.join(__dirname,  "/public/exports");
 const imagesPath               = path.join(__dirname,  "/public/images/Recipes");
 const recipesExportPathNameExt = path.join(exportPath, "recipes.zip");
 const recipesPath              = path.join(__dirname,  "/public/data/recipes");
 
 if (false == fs.existsSync(exportPath)) {
  fs.mkdirSync(exportPath);
 }
 
 const imagesList = fs.readdirSync(path.join(__dirname,  "/public/images/Recipes"));
 
 var zip = new zipUtils();
  
 for (var key in formData) { 
  console.log("> ExportSelectedRecipes(): Exporting " + key);
  
  try {
   zip.addLocalFile(path.join(recipesPath, key + ".xml"), "recipes");
  } catch (err) {
   console.log("  ExportSelectedRecipes() " + err); 
  }  
  
  var imageNamePrefix = key + "_";
  
  for (var imageFile of imagesList) {
	  if (false == imageFile.startsWith(imageNamePrefix)) {
		  continue;
	  }
   try {
    zip.addLocalFile(path.join(imagesPath, imageFile), "images");
   } catch (err) {
    console.log("  ExportSelectedRecipes() " + err); 
   }  
  }
 }
 
 zip.writeZip(recipesExportPathNameExt);
 
 ExportRecipes(recipesExportPathNameExt, req, res);
 
 console.log("< ExportSelectedRecipes()"); 
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
 
 console.log("< UpdateRecipe()"); 
    
 res.status(enums.HttpStatusTypes.OK).send(rv);
});

// Handle image uploaded.
app.post("/UploadImage", function (req, res) {
 console.log("> UploadImage"); 

 var recipeName       = req.fields.recipeName; 
 var uploadedFileName = req.files.image.path;  
 var targetFileName   = path.join(__dirname, "/public/images/Staging/") + common.UnEscapeHtml(recipeName) + '_' + req.files.image.name;
 
 fs.rename(uploadedFileName, targetFileName, function(err) {
  if (err) {
   console.log('ERROR: ' + err);
  }
 });
 
 console.log("< UploadImage()"); 
 
 return res.send("Successfully uploaded");
});

// Handle recipes (import) file uploaded.
app.post("/UploadRecipes", function (req, res) {
 console.log("> UploadRecipes()"); 
 
 var uploadedFileName = req.files.recipesFile.path; 
 var uploadPath = path.join(__dirname, "/public/import/");
 
 if (false == fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath);
 }
 
 var uploadedFileName = req.files.recipesFile.path;  
 var targetFileName   = uploadPath + req.files.recipesFile.name;
 
 fs.rename(uploadedFileName, targetFileName, function(err) {
  if (err) {
   console.log('ERROR: ' + err);
  }
 });
 
 var errMsg = UnpackImport(targetFileName);
 
 var dirPath = path.join(__dirname, '/public/data/recipes');

 // Return the list of recipes: 
 
 var rv = '<input id="messageFromServer" type="hidden" value="' + errMsg + '">'
        + common.GenerateFilesList(fs, xml2jsParser, path.join(__dirname, '/public/data/recipes'), "ALL", "ALL");
 
 console.log("< UploadRecipes()"); 
    
 res.status(enums.HttpStatusTypes.OK).send(rv);
});


/*------------------------ Route handlers ----------------------------------*/

app.use('/',                    indexRouter);
app.use('/GetRecipe',           getRecipeRouter);
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
  res.status(err.status || enums.HttpStatusTypes.INTERNALSERVERERROR);
  res.render('error');
});


function CheckForDuplicateRecipes(importPath) {
 console.log("> CheckForDuplicateRecipes(" + importPath + ")");
 
 var msg = ""
 
 var filesList     = fs.readdirSync(path.join(importPath, "/Recipes/"));
 var totalFilesCnt = filesList.length;
  
 for (var i = 0; i < totalFilesCnt; ++i) { 
  var fileNameExt           = filesList[i];
  var recipeFilePathNameExt = path.join(__dirname, "/public/data/recipes/") + fileNameExt;
  
  if (true == fs.existsSync(recipeFilePathNameExt)) {
   msg += path.basename(fileNameExt, ".xml") + ".\n";
   
   // Append "-2" to whatever the recipe file is currently named:
   
   var oldRecipeNamePath    = path.join(importPath, "Recipes");
   var oldRecipeNamePathExt = path.join(oldRecipeNamePath, oldNameExt);
   var oldRecipeName        = path.basename(oldNameExt, ".xml");
   var newRecipeName        = oldRecipeName + "-2";
   var newRecipeNamePathExt = path.join(oldRecipeNamePath, newRecipeName + ".xml");
   
   
   // Try to rename the existing recipe:
 
   RenameExistingRecipeFile(oldRecipeName, newRecipeName);
  }
 }  
 
 if ("" != msg) {
  msg = "The following recipes already exist:\n\n" + msg + "\n"
      + "They have been renamed by adding '-2' to their names.\n\n"
      + "If they are updates to existing recipes you may delete "
      + "the old recipes.";
 }
     
 console.log("< CheckForDuplicateRecipes() [" + msg + "]");     
 
 return(msg);
}

async function ExportRecipes(recipesExportPathNameExt, req, res) {
 console.log("> ExportRecipes(" + recipesExportPathNameExt + ")");
 
 const options = { headers: { 'Content-Type': 'application/zip', }, }; 
  
 await res.download(recipesExportPathNameExt, "recipes", options, (err) => {
  if (err) {
   console.log("  ExportRecipesPDF(): err=" + err);
   
   res.status(500).send({ message: "Could not download the file. " + err});
  } else {
   try {
    fs.rmdirSync(path.join(__dirname,  "/public/exports"), { recursive: true, force: true });
   } catch (err) {
    console.log("  ExportAllRecipes(): " + err);
   }    
  }
 }); 
  
 console.log("< ExportRecipesPDF()");  
}

async function GeneratePDFfromHTML(recipeName, scaling, outputFile) {
 // Use the puppeteer library to convert the printable version of the given
 // named recipe to a PDF document.
 
 var url = "http://127.0.0.1:3000/ShowPrintRecipePage?recipeToPrint=" 
         + encodeURIComponent(recipeName)
         + "&scaling=" + scaling + "&ShowButtons=N";
 
 const browser = await puppeteer.launch();
 const page    = await browser.newPage();
 
 await page.goto(url, { waitForOptions: "networkidle0" }); 
 await page.pdf({ path: __dirname + "/public/data/PDFs/" + outputFile, format: 'A4' });
 await browser.close();
}

async function HandleSavePDF(req, res) {
  var recipeName = req.query.recipeName;
  var scaling    = req.query.scaling;
  
  console.log("> HandleSavePDF(" + recipeName + ", " + scaling + ")");
  
  // Generate PDF file from recipe's 'print' view:
  
  await GeneratePDFfromHTML(recipeName, scaling, recipeName + '.pdf');
  
  // Send the PDF file to the client:
  
  console.log('  HandleSavePDF(): PDF ' + recipeName + '.pdf generated successfully.'); 
  
  var pdfFile = decodeURIComponent(req.query.recipeName);
 
  var pdfFilePath = __dirname + "\\public\\data\\PDFs\\" + pdfFile + ".pdf";
 
  const options = { headers: { 'Content-Type': 'application/octet-stream', }, };
  
  await res.download(pdfFilePath, pdfFile, options, (err) => {
   if (err) {
    res.status(500).send({ message: "Could not download the file. " + err});
   } else {
    // Remove the generated PDF file once it has been downloaded:
    
    fs.access(pdfFilePath, fs.constants.F_OK, (err) => {
     if (err) {
      fs.rmSync(pdfFilePath, {
       force: true,
      });
     }
     else {
      fs.rmSync(pdfFilePath, {
       force: true,
      });
     }
    });     
   }
  });    

  console.log("< HandleSavePDF()");  
}

function ParsePostDataToXml(postData) {
 // Parse the POST data to XML for processing by converting it to JSON and
 // then using the sblBuilder library to convert the JSON to XML and return
 // it.
 
console.log("> ParsePostDataToXml(", JSON.stringify(postData, null, 2) + ")");
 
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
 
 nutrition.att('calories',     postData.calories);
 nutrition.att('fat',          postData.fat); 
 nutrition.att('saturatedFat', postData.saturatedFat);
 nutrition.att('cholesterol',  postData.cholesterol);  
 nutrition.att('carbs',        postData.carbs); 
 nutrition.att('protein',      postData.protein); 
 nutrition.att('sugar',        postData.sugar); 
 nutrition.att('sodium',       postData.sodium); 
 nutrition.att('fiber',        postData.fiber);  
 nutrition.att('servings',     postData.servings); 
 nutrition.att('servingsUnit', postData.servingsUnit);  
 
 
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
    var ingredientName = ingredientsData[i];
    var ingredientElem = ingredientsElem.ele('Ingredient');
    var ingredientType = postData.ingredientType[i];
    
    if ("INGREDIENT" == ingredientType) {
     var ingredientNameElem = ingredientElem.ele("Name");
     var quantityElem       = ingredientElem.ele("Quantity");
     var prepElem           = ingredientElem.ele("Prep");
     var notesElem          = ingredientElem.ele("Notes");     
     
     ingredientElem.att('type', "INGREDIENT");
     ingredientNameElem.txt(ingredientName);
     quantityElem.att('units', enums.GetEnumFromUnitDesc(postData.measure[i]));
     quantityElem.txt(postData.quantity[i]);
     prepElem.txt(enums.GetEnumFromPrepDesc(postData.prep[i])); 
     notesElem.txt(postData.notes[i]);
    } else {
      ingredientElem.att('type', "HEADING");
      
      var headingElem = ingredientElem.ele('Heading'); 

      headingElem.txt(ingredientName);     
    }
   }
  } else {
    var ingredientName = ingredientsData;   
    var ingredientType = postData.ingredientType;
    
    if ("INGREDIENT" == ingredientType) {
     var ingredientElem = ingredientsElem.ele('Ingredient');
     
     var ingredientNameElem = ingredientElem.ele("Name");
     var quantityElem       = ingredientElem.ele("Quantity");
     var prepElem           = ingredientElem.ele("Prep");
     var notesElem          = ingredientElem.ele("Notes");     
     
     ingredientElem.att('type', "INGREDIENT");
     ingredientNameElem.txt(ingredientName);
     quantityElem.att('units', enums.GetEnumFromUnitDesc(postData.measure));
     quantityElem.txt(postData.quantity);
     prepElem.txt(enums.GetEnumFromPrepDesc(postData.prep)); 
     notesElem.txt(postData.notes);
    } else {
      ingredientElem.att('type', "HEADING");
      
      var headingElem = ingredientElem.ele('Heading');
      
      headingElem.txt(heading);
    }
  }
 }
 
 
 var methodElem = root.ele('Method');
 var stepsData  = postData.step;
 
 if (null != stepsData) {
  if (Array.isArray(stepsData)) {   
   for (var i = 0; i < stepsData.length; ++i) {
    var step     = stepsData[i]; 
    var stepElem = methodElem.ele('Step');
    var stepType = postData.stepType[i]; 
    
    stepElem.txt(step);
    
    if ("STEP" == stepType) { 
     stepElem.att('type', "STEP");  
 
     var imgSrc = "";
     
     if ("undefined" != typeof(postData.stepImage[i])) {
      imgSrc = postData.stepImage[i];
     }
     
     stepElem.att('image', imgSrc);
    } else { 
     stepElem.att('type', "HEADING");    
    }
   }
  } else {
    var step     = stepsData;
    var stepElem = methodElem.ele('Step');
    var stepType = postData.stepType; 
    
    stepElem.txt(step);
   
    if ("STEP" == stepType) {
     stepElem.att('type', "STEP");
     stepElem.att('image', postData.stepImage);

    } else {
     stepElem.att('type', "HEADING");
    }
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
 // Remove any images from the image staging directory that are more than 
 // four hours old.
 
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

function RenameExistingRecipe(existingRecipeName, newRecipeName) {
 // Rename an existing recipe xml data file. 
 //
 // It's not as simple as just that. Once the file has been renamed, any images 
 // associated with that recipe need to be renamed as well. Then, any references
 // to the old name and any image files must also be renamed in the recipe file.
 // Finally, any links in any other recipe files need to be modified to refer to
 // the renamed recipe.
 
 console.log("> RenameExistingRecipe(" + existingRecipeName + ", " + newRecipeName + ")");
 
 let existingRecipePathNameExt = path.join(__dirname, 'public/data/recipes/') + existingRecipeName + ".xml";
 let newRecipePathNameExt      = path.join(__dirname, 'public/data/recipes/') + newRecipeName      + ".xml";
 
 console.log("  RenameExistingRecipe(): " + existingRecipePathNameExt + " " + newRecipePathNameExt);
 
 // Try to rename the recipe file:
 
 fs.renameSync(existingRecipePathNameExt, newRecipePathNameExt, function (err) {
  console.log("< RenameExistingRecipe(): Unable to rename file - " + err);
 });
 
 
 // Rename any associated image files:
 
 RenameImageFiles(existingRecipeName, newRecipeName);
  
  
 // Try to change all name references within the recipe file to reflect the new name:
 
 RenameRecipeFileInternalReferences(newRecipeName);

 
 // Update any hyperlinks in all of the other recipe files:
 
 UpdateAllLinks(fs, path, path.join(__dirname, 'public/data/recipes/'), existingRecipeName, newRecipeName)
 
 console.log("< RenameExistingRecipe()");
}

function RenameImageFileName(parsedExistingImagePathNameExt, newRecipeName) {
 console.log("> RenameImageFileName(" + parsedExistingImagePathNameExt.name + ", " + newRecipeName + ")");
 
 const parts = parsedExistingImagePathNameExt.name.split("_");
 
 let newImagePathNameExt = path.join(__dirname, "/public/images/Recipes/") + newRecipeName;

 for (var partNdx = 1; partNdx < parts.length; ++partNdx) {
  newImagePathNameExt += "_" + parts[partNdx];
 }
  
 newImagePathNameExt += parsedExistingImagePathNameExt.ext; 
 
 console.log("< RenameImageFileName() [" + newImagePathNameExt + "]");
 
 return newImagePathNameExt;
}

function RenameImageFiles(existingRecipeName, newRecipeName) {
 console.log("> RenameImageFiles(" + existingRecipeName + ", " + newRecipeName +")");
 
 var imagesPath        = path.join(__dirname, "/public/images/Recipes/");
 var imageFilesList    = fs.readdirSync(imagesPath);
 var imageFilesListCnt = imageFilesList.length;
  
 for (var i = 0; i < imageFilesListCnt; ++i) { 
  let existingImagePathNameExt = path.join(__dirname, "/public/images/Recipes/") + imageFilesList[i];
  
  let parsedExistingImagePathNameExt = path.parse(existingImagePathNameExt);
  
  const parts = parsedExistingImagePathNameExt.name.split("_");
  
  if (parts[0] != existingRecipeName) {
   continue;
  }
   
  let newImagePathNameExt = RenameImageFileName(parsedExistingImagePathNameExt, newRecipeName);
  
  fs.renameSync(existingImagePathNameExt, newImagePathNameExt, function (err) {
   if (err) {
    console.log("< RenameImageFiles(): Unable to rename file - " + err);
   }
  });
 } 
 
 console.log("< RenameImageFiles()");
}

function RenameRecipeFileInternalReferences(newRecipeName) {
 console.log("> RenameRecipeFileInternalReferences(" + newRecipeName +")");
 
 let recipeDataXml = fs.readFileSync(path.join(__dirname, '/public/data/recipes/', newRecipeName + '.xml')); 
 
 try {
  let xmlParser = new DOMParser();

  let xmlDoc = xmlParser.parseFromString(recipeDataXml.toString(), "text/xml");
  
  let titleElement = xmlDoc.getElementsByTagName("Title")[0];
  
  let title    = titleElement.getAttribute("name");
  let titleImg = titleElement.getAttribute("image");
  
  titleElement.setAttribute("name", newRecipeName);
  
  if ("" != titleImg) {
   titleElement.setAttribute("image", path.basename(RenameImageFileName(path.parse(titleImg), newRecipeName)));
  }
  
  let method = xmlDoc.getElementsByTagName("Method")[0];
  let steps  = method.getElementsByTagName("Step");
  
  for (var stepNdx = 0; stepNdx < steps.length; ++stepNdx) {
   let newImageName = path.basename(RenameImageFileName(path.parse(steps[stepNdx].getAttribute("image")), newRecipeName));
   
   if ("" != steps[stepNdx].setAttribute("image")) {
    steps[stepNdx].setAttribute("image", newImageName);
   }
  }
  
  let xml = new XMLSerializer().serializeToString(xmlDoc);
  
  fs.writeFileSync(__dirname + "/public/data/recipes/" + newRecipeName + ".xml", xml.toString());
 } catch(err) {
  console.log("  RenameRecipeFileInternalReferences(): err=" + err);
 }
 
 console.log("< RenameRecipeFileInternalReferences()");  
}

function UnpackImport(pathFile) {
 console.log("> UnpackImport(" + pathFile + ")");
 
 var zip = new zipUtils(pathFile);
 
 const importFileName = path.parse(path.basename(pathFile)).name;
 const destDir        = path.join(__dirname, "/public/import/", importFileName); 
 
 try {
  zip.extractAllTo(destDir, true);
 } catch (err) {
  console.log("  UnpackImport(): extractAllTo err = " + err);
  
  return(pathFile + " does not appear to be a (.zip) file. No recipes were imported.");
 }
 
 if (false == fs.existsSync(path.join(destDir + "/Recipes"))) {
  console.log("  UnpackImport(): import file malformed.");
  
  return(pathFile + " does not appear to be a valid import (.zip) file. No recipes were imported.");
 } 
 
 var msg = CheckForDuplicateRecipes(destDir);
 
 fs.cpSync(path.join(destDir, "/Recipes"), 
            path.join(__dirname, "/public/data/recipes"), 
            {recursive: true}, 
            (err) => {
                      if (err) {
                       console.error(err);
                      }
 });

 fs.cpSync(path.join(destDir, "/Images"),  
           path.join(__dirname, "/public/images/Recipes"), 
           {recursive: true}, 
           (err) => {
                     if (err) {
                      console.error(err);
                     }
 });
 
 var filesList = fs.readdirSync(path.join(__dirname, "/public/data/recipes"));
 
 console.log("  UnpackImport(): # files: " + filesList.length);
 
 try {
  fs.rmdirSync(path.join(__dirname, "/public/import"), { recursive: true, force: true });
 } catch (err) {
  console.log("  UnpackImport(): " + err);
 }
  
 console.log("< UnpackImport(): [" + msg + "]");
 
 return(msg);
}

function UpdateAllLinks(fs, path, recipesPath, oldRecipeName, newRecipeName) {
 console.log("> UpdateAllLinks(fs, path, " + recipesPath + ", " + oldRecipeName + ", " + newRecipeName + ")");
 
 try {
  const files = fs.readdirSync(recipesPath);
  
  for (const file of files) {
   const filePath = path.join(recipesPath, file);
   const stats    = fs.statSync(filePath);
   
   if (true == stats.isDirectory()) {
    continue;
   } 
   
   UpdateLinksInFile(fs, path, filePath, oldRecipeName, newRecipeName);
  }
 } catch (error) {
    console.error("  UpdateAllLinks(): Error reading '" + recipesPath + "' = " + error);
 }
 
 console.log("< UpdateAllLinks()");
}

function UpdateLinksInFile(fs, path, filePath, oldRecipeName, newRecipeName) {
console.log("> UpdateLinksInFile(fs, path, " + filePath + ", " + oldRecipeName + ", " + newRecipeName + ")");
 
 let encodedORN = encodeURI(oldRecipeName);
 let encodedNRN = encodeURI(newRecipeName);
 
 let content = fs.readFileSync(filePath);
 
 let changed = false;

 let lines = content.toString().split('\n');

 for (var lineNdx = 0; lineNdx < lines.length; ++lineNdx) {
  let line = lines[lineNdx];
  
  if (-1 == line.indexOf("href")) {
   continue;
  }
  
  let ol = "recipeName=" + encodedORN + "'";
  let nl = "recipeName=" + encodedNRN + "'";
  
  if (-1 == line.indexOf(ol)) {
   continue;
  }
  
  changed = true;
  
  line = line.replaceAll(ol, nl);
  
  let ot = "&gt;" + oldRecipeName + "&lt;";
  let nt = "&gt;" + newRecipeName + "&lt;";
  
  line = line.replaceAll(ot, nt);
  
  lines[lineNdx] = line;
 }
 
 if (true == changed) {
  let newContent = "";
  
  for (var lineNdx = 0; lineNdx < lines.length; ++lineNdx) {
   newContent += lines[lineNdx];
  }
  
  let xmlParser = new DOMParser();

  let xmlDoc = xmlParser.parseFromString(newContent, "text/xml");
  
  let xml = new XMLSerializer().serializeToString(xmlDoc);
  
  fs.writeFileSync(filePath, xml.toString());
 }
 
 console.log("< UpdateLinksInFile()");
}


module.exports = app;