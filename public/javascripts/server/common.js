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

 var listCnt = 0;
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
  ++listCnt; 
  
  htmlRsp += ('<div class="recipeLine">'
           +  '<span class="recipeTitle">' 
           +  '<span style="display: inline-block; vertical-align: middle; height: 50px;">' + fileName + '</span>'
           +  '<img onclick=\'ViewImage("/images/Recipes/' + imageSrc + '");\' src="/images/Recipes/' + imageSrc + '" style="' + imgStyle + '">'
           +  '</span> '
           +  '<span class="recipeActions">'
           +  '<img height="20px" onclick=\'ViewRecipe("'           + EscapeHtml(fileName) + '");\' src="/images/Buttons/ViewBtn_48X48.jpg"   style="margin: 0px 5px 0px 20px;" title="View Recipe" width="20px">'           
           +  '<img height="20px" onclick=\'RequestPrintableView("' + EscapeHtml(fileName) + '");\' src="/images/Buttons/PrintBtn_48X48.png"  style="margin: 0px 5px 0px 0px;"  title="View Printable Version" width="20px">'           
           +  '<img height="20px" onclick=\'EditRecipe("'           + EscapeHtml(fileName) + '");\' src="/images/Buttons/EditBtn_48X48.jpg"   style="margin: 0px 5px 0px 0px;"  title="Edit Recipe" width="20px">'  
           +  '<img height="20px" onclick=\'DeleteRecipe("'         + EscapeHtml(fileName) + '");\' src="/images/Buttons/DeleteBtn_48X48.jpg" style="margin: 0px 5px 0px 0px;"  title="Delete Recipe" width="20px">'         
           +  '</span><'
           +  '/div>\n');
  }
 }
  
 htmlRsp += '<input id="filesListCnt" type="hidden" value="' + listCnt + '">';
  
 return htmlRsp;
}

export
function GenerateFilesListHtmlFromList(fs, xml2jsParser, directoryPath, filesArray) {
 console.log("> GenerateFilesListHtmlFromList()"); 
 
 var htmlRsp = '<input id="filesListCnt" type="hidden" value="' + filesArray.length + '">';
 
 if (0 == filesArray.length) {
  htmlRsp += "No recipes contain the search term.";
  
  return htmlRsp;
 }
  
 for (var i = 0; i < filesArray.length; ++i) { 
  var fileNameExt = filesArray[i];
  
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
           +  '<img height="20px" onclick=\'ViewRecipe("'           + EscapeHtml(fileName) + '");\' src="/images/Buttons/ViewBtn_48X48.jpg"   style="margin: 0px 5px 0px 20px;" title="View Recipe" width="20px">'            
           +  '<img height="20px" onclick=\'RequestPrintableView("' + EscapeHtml(fileName) + '");\' src="/images/Buttons/PrintBtn_48X48.png"  style="margin: 0px 5px 0px 0px;"  title="View Printable Version" width="20px">'               
           +  '<img height="20px" onclick=\'EditRecipe("'           + EscapeHtml(fileName) + '");\' src="/images/Buttons/EditBtn_48X48.jpg"   style="margin: 0px 5px 0px 0px;"  title="Edit Recipe" width="20px">'
           +  '<img height="20px" onclick=\'DeleteRecipe("'         + EscapeHtml(fileName) + '");\' src="/images/Buttons/DeleteBtn_48X48.jpg" style="margin: 0px 5px 0px 0px;"  title="Delete Recipe" width="20px">'         
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
