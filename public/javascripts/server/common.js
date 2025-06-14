export 
function FormatTime(timeVal) {
 var sTime = "";
 
 if (timeVal > 59) {
  sTime = Math.trunc(timeVal / 60).toString() + ":";
  
  var frac = (timeVal % 60).toString();
  
  if (1 == frac.length) {
   frac = "0" + frac;
  }
  
  sTime += frac;
 } else {
  sTime = timeVal.toString() + " minutes";
 }
 
 return sTime;
}

export
function GenerateFilesList(fs, xml2jsParser, directoryPath, categoryFilter, cuisineFilter) {
 var htmlRsp = "";
 
 var filesList = fs.readdirSync(directoryPath);
  
 for (var i = 0; i < filesList.length; ++i) { 
  var fileNameExt = filesList[i];
  
  var fobj;

  try {
   fobj = fs.statSync(directoryPath + "/" + fileNameExt);
  } catch (err) {
   console.log(err);
  }

 if (false == fobj.isFile()) { 
  continue;
 }
  
 var recipeDataXml = "";
 
 var fname = directoryPath + "/" + fileNameExt;
 
 try {
  recipeDataXml = fs.readFileSync(fname, {encoding: 'utf8', flag: 'r'}); 
 } catch (err) {
  console.log(err);  
 } 
 
 var recipeDataJson = "";
 
 try {
  recipeDataJson = xml2jsParser.parseStringSync(recipeDataXml);
 } catch (err) {
  console.log(err);
 }
  
 var fext = GetFileExtension(directoryPath + "/" + fileNameExt);
  
 var category = recipeDataJson.Recipe.Title[0].$.category;
 var cuisine  = recipeDataJson.Recipe.Title[0].$.cuisine;
 var imageSrc = recipeDataJson.Recipe.Title[0].$.image;
 var imgStyle = ("" == imageSrc ? "display: none;   height: 50px; margin: 0px 5px 0px 5px; visibility: visible; width: 50px;" 
                                : "display: inline; height: 50px; margin: 0px 5px 0px 5px; visibility: visible; width: 50px;");
 
 if ("ALL" != categoryFilter && "ALL" != category) {
  if (category != categoryFilter) {
   continue;
  }
 } else {
  if ("ELEMENT" == category || "SAUCE" == category || "TECHNIQUE" == category) {
   continue;  // Some things are shown only when specifically requested.
  }
 }
  
 if ("ALL" != cuisineFilter) {
  if (cuisine != cuisineFilter) {
   continue;
  }
 }
   
 var fileName = "";
  
 try { 
  fileName = fileNameExt.split('.').slice(0, -1).join('.');
 } catch (err) {
  console.log(err);
 }
   
 if ("xml" == fext) {   
  htmlRsp += ('<div class="recipeLine">'
           +  '<span class="recipeTitle">' 
           +  '<span style="display: inline-block; vertical-align: middle; height: 50px;">' + fileName + '</span>'
           +  '<img onclick=\'ViewImage("/images/Recipes/' + imageSrc + '");\' src="/images/Recipes/' + imageSrc + '" style="' + imgStyle + '">'
           +  '</span> '
           +  '<span class="recipeActions">'
           +  '<button style="margin: 0px 5px 0px 20px;" onclick=\'ViewRecipe("'           + EscapeHtml(fileName) + '");\' type="button">View</button>'
           +  '<button style="margin: 0px 5px 0px 0px;"  onclick=\'RequestPrintableView("' + EscapeHtml(fileName) + '");\' type="button">View Print Ready Version</button>'              
           +  '<button style="margin: 0px 5px 0px 0px;"  onclick=\'EditRecipe("'           + EscapeHtml(fileName) + '");\' type="button">Edit</button>'
           +  '<button style="margin: 0px 0px 0px 0px;"  onclick=\'DeleteRecipe("'         + EscapeHtml(fileName) + '");\' type="button">Delete</button>'          
           +  '</span><'
           +  '/div>\n');
  }
 }
  
 return htmlRsp;
}

function GetFileExtension(pathFileName) {
 var pieces = pathFileName.split(".");

 if (1 === pieces.length || ("" === pieces[0] && 2 === pieces.length)) {
  return "";
 }
 
 return pieces.pop().toLowerCase(); 
}

export
function EscapeHtml(text) {
 var rv = String(text).replaceAll("&", "&amp;")
                      .replaceAll("<", "&lt;")
                      .replaceAll(">", "&gt;")
                      .replaceAll('"', "&quot;")
                      .replaceAll("'", "&#39;");
 return rv;
}

export
function RenderNewlines(text) {
 var unexplodedText = String(text);
 var tl = unexplodedText.length;
 var rv = "";
 
 for (var txtNdx = 0; txtNdx < tl; ++txtNdx) {
  var char = unexplodedText.substr(txtNdx, 1);

  if ('\n' == char) {
   rv += "<br>";
  } else {
   rv += char;
  }
 }

 return rv;
}

export
function UnEscapeHtml(text) {
 var rv = String(text).replaceAll("&amp;",  "&")
                      .replaceAll("&lt;",   "<")
                      .replaceAll("&gt;",   ">")
                      .replaceAll("&quot;", '"')
                      .replaceAll("&#39;",  "'");
 return rv;
}
