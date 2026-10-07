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
function GenerateExportList(fs, path, directoryPath) {
 console.log("> GetRecipesToExportList(,, " + directoryPath + ")"); 
 
 var listCnt       = 0;
 var htmlRsp       = "";
 var filesList     = fs.readdirSync(directoryPath);
 var totalFilesCnt = filesList.length;
  
 for (var i = 0; i < totalFilesCnt; ++i) { 
  var fileNameExt = filesList[i];
  
  var fobj;

  try {
   fobj = fs.statSync(path.join(directoryPath, fileNameExt));
  } catch (err) {
   console.log(err);
  }

  if (false == fobj.isFile()) { 
   continue;
  }
   
  if ("xml" != GetFileExtension(fileNameExt)) {
   continue;
  }
  
  var fileName = path.basename(fileNameExt, ".xml");
    
  ++listCnt; 
  
  htmlRsp += ('<div >'
          +  ' <span>'
          +  '  <input type="checkbox" id="' + EscapeHtml(fileName) + '" name="' + EscapeHtml(fileName) + '" value="' + EscapeHtml(fileName) + '">' + EscapeHtml(fileName)        
          +  ' </span><'
          +  '/div>\n');
 }
 
 console.log("< GetRecipesToExportList() size=" + htmlRsp.length);  
 
 return htmlRsp;
}

export
function GenerateFilesList(fs, path, xml2jsParser, categoryFilter, cuisineFilter) {
 console.log("> GenerateFilesList(,, " +  categoryFilter + ", " + cuisineFilter + ")"); 
 
 let filesList = new Array();
 
 let knowledgeFilesList = fs.readdirSync("public\\data\\statics");
 let recipeFilesList    = fs.readdirSync("public\\data\\recipes");
 
 knowledgeFilesList.forEach((file, ndx) => filesList.push("public\\data\\statics\\" + file)); 
 recipeFilesList.forEach((file, ndx)    => filesList.push("public\\data\\recipes\\" + file)); 
 
 let listCnt       = 0;
 let htmlRsp       = ""; 
 let totalFilesCnt = filesList.length;
  
 for (var i = 0; i < totalFilesCnt; ++i) { 
  let fileNameExt = filesList[i];
  
  //console.log("  GenerateFilesList() " + fileNameExt); 
  
  var fobj;

  try {
   fobj = fs.statSync(fileNameExt);
  } catch (err) {
   console.log(err);
  }

  if (false == fobj.isFile()) { 
   continue;
  }
  
  let fext = path.extname(fileNameExt);
  
  let fileName = "";
      
  try { 
   fileName = path.parse(fileNameExt).name;
  } catch (err) {
   console.log(err);
   
   continue;
  }
 
  for (;;) {
    if (".html" == fext) {  
     if ("ALL" != categoryFilter && "KNOWLEDGE" != categoryFilter) {
      break;
     }
    
     htmlRsp += ('<div class="recipeLine">\n'
              +  ' <span style="display: inline-block; vertical-align: middle; height: 50px; text-align: right; width: 40%;">' 
              +     fileName  
              +  ' </span>\n'
              +  ' <span style="display: inline-block; vertical-align: middle; width: auto;">\n'            
              +  '  <img src="/images/Article_276X328.png" style="display: inline; height: 50px; margin: 0px 5px 0px 5px; visibility: visible; width: 50px;">\n'
              +  ' </span>\n'
              +  ' <span class="recipeActions">\n'
              +  '  <img height="20px" onclick=\'ViewArticle("'          + EscapeHtml(fileName) + '");\'            src="/images/Buttons/ViewBtn_48X48.jpg"   style="margin: 0px 5px 0px 20px;" title="View Recipe"            width="20px">\n'           
              +  '  <img height="20px" onclick=\'RequestPrintableView("' + EscapeHtml(fileName) + '", "article");\' src="/images/Buttons/PrintBtn_48X48.png"  style="margin: 0px 5px 0px 0px;"  title="View Printable Version" width="20px">\n'           
              +  '  <img height="20px" onclick=\'EditArticle("'          + EscapeHtml(fileName) + '");\'            src="/images/Buttons/EditBtn_48X48.jpg"   style="margin: 0px 5px 0px 0px;"  title="Edit Recipe"            width="20px">\n'  
              +  '  <img height="20px" onclick=\'DeleteArticle("'        + EscapeHtml(fileName) + '");\'            src="/images/Buttons/DeleteBtn_48X48.jpg" style="margin: 0px 5px 0px 0px;"  title="Delete Recipe"          width="20px">\n'         
              +  ' </span>\n'
              +  '</div>\n');
     
     ++listCnt;      
     
     break;
    }
   
    if (".xml" == fext) {
     let recipeDataXml = "";
     
     try {
      recipeDataXml = fs.readFileSync(fileNameExt, {encoding: 'utf8', flag: 'r'}); 
     } catch (err) {
      console.log(err);  
     } 
     
     let recipeDataJson = "";
     
     try {
      recipeDataJson = xml2jsParser.parseStringSync(recipeDataXml);
     } catch (err) {
      console.log(err);
     }
      
     let category = recipeDataJson.Recipe.Title[0].$.category;
     let cuisine  = recipeDataJson.Recipe.Title[0].$.cuisine;
     let imageSrc = EscapeHtml(recipeDataJson.Recipe.Title[0].$.image);
     let imgStyle = "display: inline; height: 50px; margin: 0px 5px 0px 5px; visibility: visible; width: 50px;";
     
     if (null == imageSrc || "" == imageSrc) {
      imageSrc = "NoImage_290X330.png";
     } else {
      imageSrc = "Recipes/" + imageSrc;
     }
     
     if ("ALL" != categoryFilter && "ALL" != category) {
      if (category != categoryFilter) {
       break;
      }
     } else {
      if ("ELEMENT" == category || "SAUCE" == category || "TECHNIQUE" == category) {
       break;;  // Some things are shown only when specifically requested.
      }
     }
      
     if ("ALL" != cuisineFilter) {
      if (cuisine != cuisineFilter) {
       break;
      }
     }
      
     htmlRsp += ('<div class="recipeLine">\n'
              +  ' <span style="display: inline-block; vertical-align: middle; height: 50px; text-align: right; width: 40%;">' 
              +     fileName  
              +  ' </span>\n'
              +  ' <span style="display: inline-block; vertical-align: middle; width: auto;">\n'            
              +  '  <img onclick=\'ViewImage("/images/' + imageSrc + '");\' src="/images/' + imageSrc + '" style="' + imgStyle + '">\n'
              +  ' </span>\n'
              +  ' <span class="recipeActions">\n'
              +  '  <img height="20px" onclick=\'ViewRecipe("'           + EscapeHtml(fileName) + '");\'           src="/images/Buttons/ViewBtn_48X48.jpg"   style="margin: 0px 5px 0px 20px;" title="View Recipe"            width="20px">\n'           
              +  '  <img height="20px" onclick=\'RequestPrintableView("' + EscapeHtml(fileName) + '", "recipe");\' src="/images/Buttons/PrintBtn_48X48.png"  style="margin: 0px 5px 0px 0px;"  title="View Printable Version" width="20px">\n'           
              +  '  <img height="20px" onclick=\'EditRecipe("'           + EscapeHtml(fileName) + '");\'           src="/images/Buttons/EditBtn_48X48.jpg"   style="margin: 0px 5px 0px 0px;"  title="Edit Recipe"            width="20px">\n'  
              +  '  <img height="20px" onclick=\'DeleteRecipe("'         + EscapeHtml(fileName) + '");\'           src="/images/Buttons/DeleteBtn_48X48.jpg" style="margin: 0px 5px 0px 0px;"  title="Delete Recipe"          width="20px">\n'         
              +  ' </span>\n'
              +  '</div>\n');
     
     ++listCnt; 
     
     break;
    }  
  
   break;
  }
 }
  
 htmlRsp += '<input id="filesListCnt"  type="hidden" value="' + listCnt       + '">\n';
 htmlRsp += '<input id="totalFilesCnt" type="hidden" value="' + totalFilesCnt + '">';
 
 console.log("< GenerateFilesList() found " + listCnt + " items."); 
  
 return htmlRsp;
}

export
function GenerateFilesListHtmlFromList(fs, xml2jsParser, directoryPath, filesArray) {
 console.log("> GenerateFilesListHtmlFromList(,, " + directoryPath + ")"); 
 
 var htmlRsp = '<input id="filesListCnt"  type="hidden" value="' + filesArray.length + '">\n'
             + '<input id="totalFilesCnt" type="hidden" value="' + filesArray.length + '">\n';
 
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
 var imgStyle = "display: inline; height: 50px; margin: 0px 5px 0px 5px; visibility: visible; width: 50px;";
 var fileName = "";
  
 try { 
  fileName = fileNameExt.split('.').slice(0, -1).join('.');
 } catch (err) {
  console.log(err);
 }
 
 if (null == imageSrc || "" == imageSrc) {
  imageSrc = "NoImage_290X330.png";
 } else {
  imageSrc = "Recipes/" + imageSrc;
 }
   
 if ("xml" == fext) {   
  htmlRsp += ('<div class="recipeLine">'
           +  ' <span style="display: inline-block; vertical-align: middle; height: 50px; text-align: right; width: 40%;">' 
           +     fileName 
           +  ' </span>'
           +  ' <span style="display: inline-block; vertical-align: middle; height: 50px; width: auto;">'           
           +  '  <img onclick=\'ViewImage("/images/' + imageSrc + '");\' src="/images/' + imageSrc + '" style="' + imgStyle + '">'
           +  ' </span> '
           +  ' <span class="recipeActions">'
           +  '  <img height="20px" onclick=\'ViewRecipe("'           + EscapeHtml(fileName) + '");\' src="/images/Buttons/ViewBtn_48X48.jpg"   style="margin: 0px 5px 0px 20px;" title="View Recipe" width="20px">'            
           +  '  <img height="20px" onclick=\'RequestPrintableView("' + EscapeHtml(fileName) + '");\' src="/images/Buttons/PrintBtn_48X48.png"  style="margin: 0px 5px 0px 0px;"  title="View Printable Version" width="20px">'               
           +  '  <img height="20px" onclick=\'EditRecipe("'           + EscapeHtml(fileName) + '");\' src="/images/Buttons/EditBtn_48X48.jpg"   style="margin: 0px 5px 0px 0px;"  title="Edit Recipe" width="20px">'
           +  '  <img height="20px" onclick=\'DeleteRecipe("'         + EscapeHtml(fileName) + '");\' src="/images/Buttons/DeleteBtn_48X48.jpg" style="margin: 0px 5px 0px 0px;"  title="Delete Recipe" width="20px">'         
           +  ' </span>'
           +  '</div>\n');
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
