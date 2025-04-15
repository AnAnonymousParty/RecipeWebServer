function AddIngredient() {
 var errs       = "";
 var ingredient = document.getElementById("ingredient2Add").value;
 var quantity   = document.getElementById("quantity2Add").value;
 var valid      = true;
 
 if (true == IsEmpty(ingredient)) {
  valid = false;
  
  errs += "An ingredient must be provided.\n";
  
  document.getElementById("ingredient2Add").style.backgroundColor = errBg;
 } else {
  document.getElementById("ingredient2Add").style.backgroundColor = validBg;
 } 
 
 if (true == IsEmpty(quantity)) {
  valid = false;
  
  errs += "Quantity must be a number 1 - 999.\n";
  
  document.getElementById("quantity2Add").style.backgroundColor = errBg;
 } else {
  if (false == IsDigits(quantity)) {
   valid = false;
   
   errs += "Quantity must be a number 1 - 999.\n";
   
   document.getElementById("quantity2Add").style.backgroundColor = errBg;
  } else {
   document.getElementById("quantity2Add").style.backgroundColor = validBg;
  }
 }
 
 if (false == valid) {
  errs = "The following problems were detected and must be corrected:\n\n" + errs;
  
  alert(errs);
  
  return;
 } 
 
 var tbody = document.getElementById("ingredientsTable").getElementsByTagName('tbody')[0];
 var row   = tbody.insertRow();
 var cell  = row.insertCell();
 
 var ingredient = document.getElementById("ingredient2Add").value;
 cell.style.maxWidth = "200px";
 cell.style.minWidth = "200px";
 cell.style.wordWrap = "break-word";
 cell.innerHTML = ingredient + '<input name="ingredient" type="hidden" value="' + ingredient + '">';
 
 var quantity = document.getElementById("quantity2Add").value;
 cell = row.insertCell();
 cell.style.maxWidth  = "70px"; 
 cell.style.minWidth  = "70px"; 
 cell.style.textAlign = "right"; 
 cell.style.wordWrap  = "break-word";
 cell.innerHTML = quantity + '<input name="quantity" type="hidden" value="' + quantity + '">';
 
 var measure = GetDescFromUnitType(document.getElementById("measure2Add").value);
 cell = row.insertCell();
 cell.style.maxWidth = "80px"; 
 cell.style.minWidth = "80px";  
 cell.style.wordWrap = "break-word";
 cell.innerHTML = measure + '<input name="measure" type="hidden" value="' + measure + '">';
 
 var prep = GetDescFromPrepType(document.getElementById("preparation2Add").value);
 cell = row.insertCell();
 cell.style.maxWidth = "130px"; 
 cell.style.minWidth = "130px";  
 cell.style.wordWrap = "break-word";
 cell.innerHTML = prep + '<input name="prep" type="hidden" value="' + prep + '">';
 
 var notes = document.getElementById("notes2Add").value;
 cell = row.insertCell();
 cell.style.maxWidth = "200px"; 
 cell.style.minWidth = "200px";  
 cell.style.wordWrap = "break-word";
 cell.innerHTML = notes + '<input name="notes" type="hidden" value="' + notes + '">';
 
 cell = row.insertCell();
 cell.colspan         = "2";
 cell.style.maxWidth  = "95px"; 
 cell.style.minWidth  = "95px"; 
 cell.style.textAlign = "right"; 
 cell.innerHTML = "<button onclick=\"DeleteIngredient("   + (tbody.rows.length - 1) + ");\" type=\"button\">Delete</button>&nbsp;"
                + "<button onclick=\"EditIngredient("     + (tbody.rows.length - 1) + ");\" type=\"button\">Edit</button>&nbsp;"
                + "<button onclick=\"MoveIngredientUp("   + (tbody.rows.length - 1) + ");\" type=\"button\">↑</button>&nbsp;"   
                + "<button onclick=\"MoveIngredientDown(" + (tbody.rows.length - 1) + ");\" type=\"button\">↓</button>"; 
 
 var btnStyle = document.getElementById("delAllIngredientsBtn").style;
 
 btnStyle.display    = "inline";
 btnStyle.visibility = "visible";
 
 HideAddIngredientPopup();
}

function AddPrerequisite() { 
 var errs         = "";
 var prerequisite = document.getElementById("prerequisite2Add").value;
 var valid        = true;
 
 if (true == IsEmpty(prerequisite)) {
  valid = false;
  
  errs += "Prerequisite text must be provided.\n";
  
  document.getElementById("prerequisite2Add").style.backgroundColor = errBg;
 } else {
  document.getElementById("prerequisite2Add").style.backgroundColor = validBg;
 } 
  
 if (false == valid) {
  errs = "The following problems were detected and must be corrected:\n\n" + errs;
  
  alert(errs);
  
  return;
 }

 var tbody = document.getElementById("prerequisitesTable").getElementsByTagName('tbody')[0];
 var row   = tbody.insertRow();
 var cell  = row.insertCell();
 
 cell.style.maxWidth = "200px";
 cell.style.minWidth = "200px";
 cell.style.wordWrap = "break-word";
 cell.innerHTML = document.getElementById("prerequisite2Add").value + '<input name="prerequisite" type="hidden" value="' + prerequisite + '">';
 
 cell = row.insertCell();
 cell.colspan         = "2";
 cell.style.maxWidth  = "95px"; 
 cell.style.minWidth  = "95px"; 
 cell.style.textAlign = "right"; 
 cell.innerHTML = "<span> <button onclick=\"DeletePrerequisite(" + (tbody.rows.length - 1) + ");\" type=\"button\">Delete</button>&nbsp;"
                + "<button onclick=\"EditPrerequisite("   + (tbody.rows.length - 1) + ");\" type=\"button\">Edit</button></span>";
 
 var btnStyle = document.getElementById("delAllPrerequisitesBtn").style;
 
 btnStyle.display    = "inline";
 btnStyle.visibility = "visible";
 
 HideAddPrerequisitePopup();
}

function AddRecipe() {
 var recipeName = document.getElementById("recipeName2Add").value;
 
 if ("" == recipeName) {
  alert("Recipe name must be provided.");
  
  return;
 }
 
 if (false == IsFileName(recipeName)) {
  alert("Recipe name my contain only 0-9, A-Z, a-z and '-_ '.");
  
  return;
 } 
 
 var xmlhttp = new XMLHttpRequest();
    
 xmlhttp.onreadystatechange = function()
 {
  if (4 == xmlhttp.readyState && 200 == xmlhttp.status) {
   if ("NO" == xmlhttp.response) {
    ToggleVisibility("addRecipePopup");
    RequestNewRecipePage(recipeName);
   } else {
    HideElement("addRecipePopup");
    ToggleVisibility("recipeExistsWarningPopup");
   } 
  }
  else {
   // TODO: Handle failure, if needed.
  }
 }
 
 var params = encodeURIComponent(recipeName);
    
 xmlhttp.open("GET", "/CheckRecipeExists?file2Check=" + params, true);
 
 xmlhttp.send();
}

function AddStep() {
 var errs  = "";
 var step  = document.getElementById("step2Add").value;
 var valid = true;
 
 if (true == IsEmpty(step)) {
  valid = false;
  
  errs += "Step text must be provided.\n";
  
  document.getElementById("step2Add").style.backgroundColor = errBg;
 } else {
  document.getElementById("step2Add").style.backgroundColor = validBg;
 } 
  
 if (false == valid) {
  errs = "The following problems were detected and must be corrected:\n\n" + errs;
  
  alert(errs);
  
  return;
 }  
 
 var imgSrc  = document.getElementById("stepAddImage").src;
 var imgName = imgSrc.substring(imgSrc.lastIndexOf("/") + 1, imgSrc.length);
  
 var tbody = document.getElementById("stepsTable").getElementsByTagName('tbody')[0];
 var row   = tbody.insertRow();
 var cell  = row.insertCell(-1);
 
 cell.style.maxWidth = "400px";
 cell.style.minWidth = "400px";
 cell.style.wordWrap = "break-word";
 cell.innerHTML = document.getElementById("step2Add").value 
                + '<input name="step" type="hidden" value="' + document.getElementById("step2Add").value + '">';
 
 cell = row.insertCell(-1); 
 cell.style.maxWidth = "100px";
 cell.style.minWidth = "100px";
 cell.style.wordWrap = "break-word";
 cell.innerHTML = '<img height="80px" src="' + ("" == imgName ? '' : imgSrc) + '" ' + ("" == imgName ? 'style="display: none; visibility: collapse;" ' : '') + 'width="80px">'
                + '<input name="stepImage" type="hidden" value="' + imgName + '">';
 
 cell = row.insertCell(-1);
 cell.colspan         = "2";
 cell.style.maxWidth  = "90px"; 
 cell.style.minWidth  = "90px"; 
 cell.style.textAlign = "right"; 
 cell.innerHTML = "<button onclick=\"DeleteStep(" + (tbody.rows.length - 1) + ");\" type=\"button\">Delete</button>&nbsp;"
                + "<button onclick=\"EditStep("   + (tbody.rows.length - 1) + ");\" type=\"button\">Edit</button>";
 
 var btnStyle = document.getElementById("delAllStepsBtn").style;
 
 btnStyle.display    = "inline";
 btnStyle.visibility = "visible";
 
 HideAddStepPopup();
}

function AddVariation() { 
 var errs      = "";
 var variation = document.getElementById("variation2Add").value;
 var valid     = true;
 
 if (true == IsEmpty(variation)) {
  valid = false;
  
  errs += "Variation text must be provided.\n";
  
  document.getElementById("variation2Add").style.backgroundColor = errBg;
 } else {
  document.getElementById("variation2Add").style.backgroundColor = validBg;
 } 
  
 if (false == valid) {
  errs = "The following problems were detected and must be corrected:\n\n" + errs;
  
  alert(errs);
  
  return;
 }

 var tbody = document.getElementById("variationsTable").getElementsByTagName('tbody')[0];
 var row   = tbody.insertRow();
 var cell  = row.insertCell();
 
 cell.style.maxWidth = "200px";
 cell.style.minWidth = "200px";
 cell.style.wordWrap = "break-word";
 cell.innerHTML = variation + '<input name="variation" type="hidden" value="' + variation + '">';
 
 cell = row.insertCell();
 cell.colspan         = "2";
 cell.style.maxWidth  = "95px"; 
 cell.style.minWidth  = "95px"; 
 cell.style.textAlign = "right"; 
 cell.innerHTML = "<span> <button onclick=\"DeleteVariation(" + (tbody.rows.length - 1) + ");\" type=\"button\">Delete</button>&nbsp;"
                + "<button onclick=\"EditVariation("   + (tbody.rows.length - 1) + ");\" type=\"button\">Edit</button></span>";
 
 var btnStyle = document.getElementById("delAllVariationsBtn").style;
 
 btnStyle.display    = "inline";
 btnStyle.visibility = "visible";
 
 HideAddVariationPopup();
}

function ApplyFilter() {
 var category = document.getElementById("categories").value;
 var cuisine  = document.getElementById("cuisines").value;
 
 ShowRecipesList(category, cuisine);
} 

function DeleteAllIngredients() {
 var tbody = document.getElementById("ingredientsTable").getElementsByTagName('tbody')[0];
  
 tbody.innerHTML = "";
 
 var btnStyle = document.getElementById("delAllIngredientsBtn").style;
 
 btnStyle.display    = "none";
 btnStyle.visibility = "collapse";
}

function DeleteAllPrerequisites() {
 var tbody = document.getElementById("prerequisitesTable").getElementsByTagName('tbody')[0];
  
 tbody.innerHTML = "";
 
 var btnStyle = document.getElementById("delAllPrerequisitesBtn").style;
 
 btnStyle.display    = "none";
 btnStyle.visibility = "collapse";
}

function DeleteAllRecipes() {
 var word = GenerateUID(8);
 
 var rsp = prompt("Deleting all recipes is irrevocable.\n\nEnter '" + word + "' and click OK to proceed.");
 
 if (rsp != word) {
  return;
 }
 
 var xmlhttp = new XMLHttpRequest();
 
 xmlhttp.onreadystatechange = function()
 {
  if (4 == xmlhttp.readyState && 200 == xmlhttp.status) {
   var data = xmlhttp.responseText;
   
   if ("" == data) { 
    document.getElementById("recipesListContainer").innerHTML = "There are no recipes in the system.<br><br>Why don't you add some?";
    HideElement("DeleteAllRecipesBtn");
   } else {   
    document.getElementById("recipesListContainer").innerHTML = data;
    UnHideElement("DeleteAllRecipesBtn", "inline");
   }
  }
  else {
   // TODO: Handle failure, if needed.
  }
 }
    
 xmlhttp.open("GET", "/DeleteAllRecipes", true);
 
 xmlhttp.send();  
}

function DeleteAllSteps() {
 var tbody = document.getElementById("stepsTable").getElementsByTagName('tbody')[0];
 
 for (var i = 0; i < tbody.rows.length; ++i) {
  if (undefined == tbody.rows[i].cells[1].childNodes[1]) {
   continue;
  }
  
  if ("" == tbody.rows[i].cells[1].childNodes[1].value) {
   continue;
  } 
  
  var stepImageFileName = tbody.rows[i].cells[1].childNodes[1].value;
  
  if ("" == stepImageFileName) {
   continue;
  }
  
  if (false == IsImageShared(document.getElementByName("mainImageName").value, stepImageFileName, tbody, i)) {
   RequestFileDelete(imgName);
  }   
 }
  
 tbody.innerHTML = "";
 
 var btnStyle = document.getElementById("delAllStepsBtn").style;
 
 btnStyle.display    = "none";
 btnStyle.visibility = "collapse";
}

function DeleteAllVariations() {
 var tbody = document.getElementById("variationsTable").getElementsByTagName('tbody')[0];
  
 tbody.innerHTML = "";
 
 var btnStyle = document.getElementById("delAllVariationsBtn").style;
 
 btnStyle.display    = "none";
 btnStyle.visibility = "collapse";
}

function DeleteIngredient(rowNum) {
 var tbody = document.getElementById("ingredientsTable").getElementsByTagName('tbody')[0];
 
 if (rowNum < 0 || rowNum > tbody.rows.length) {
  return;  // Don't try to do anything stupid.
 }

 tbody.deleteRow(rowNum);  // Yeet it.
 
 // Renumber rows:
 
 for (var i = 0; i < tbody.rows.length; ++i) {
  var row  = tbody.rows[i];
  var cell = row.cells[5];
  
  cell.innerHTML = "<button onclick=\"DeleteIngredient(" + (i) + ");\" type=\"button\">Delete</button>&nbsp;"
                 + "<button onclick=\"EditIngredient("   + (i) + ");\" type=\"button\">Edit</button>";
 }
 
 if (0 == tbody.rows.length) {
  var btnStyle = document.getElementById("delAllIngredientsBtn").style;
 
  btnStyle.display    = "none";
  btnStyle.visibility = "collapse";
 }
}

function DeletePrerequisite(rowNum) {
 var tbody = document.getElementById("prerequisitesTable").getElementsByTagName('tbody')[0];
 
 if (rowNum < 0 || rowNum > tbody.rows.length) {
  return;  // Don't try to do anything stupid.
 }

 tbody.deleteRow(rowNum);  // Yeet it.
 
 // Renumber rows:
 
 for (var i = 0; i < tbody.rows.length; ++i) {
  var row  = tbody.rows[i];
  var cell = row.cells[1];
  
  cell.innerHTML = "<button onclick=\"DeletePrerequisite(" + (i) + ");\" type=\"button\">Delete</button>&nbsp;"
                 + "<button onclick=\"EditPrerequisite("   + (i) + ");\" type=\"button\">Edit</button>";
 }
 
 if (0 == tbody.rows.length) {
  var btnStyle = document.getElementById("delAllPrerequisitesBtn").style;
 
  btnStyle.display    = "none";
  btnStyle.visibility = "collapse";
 }
}

function DeleteRecipe(recipeName) {
 // recipeName is provided when a Delete button is clicked in the Recipes List.
 // If the Delete button is clicked on the Recipe View page, recipeName will be
 // empty, implying that it is meant to delete THAT recipe, and the name can be 
 // obtained from within the hidden page data:
 
 if (undefined == recipeName || "" == recipeName) {
  recipeName = document.getElementById("recipeName").value;
 } 
 
 if (false == confirm("Are you sure you want to delete the recipe?")) {
  return;
 }
 
 var xmlhttp = new XMLHttpRequest();
    
 xmlhttp.onreadystatechange = function()
 {
  if (4 == xmlhttp.readyState && 200 == xmlhttp.status) {
   var data = xmlhttp.responseText;
    
   if ("" == data) { 
    document.getElementById("recipesListContainer").innerHTML = "There are no recipes in the system.<br><br>Why don't you add some?";
    HideElement("DeleteAllRecipesBtn");
   } else {   
    document.getElementById("recipesListContainer").innerHTML = data;
    UnHideElement("DeleteAllRecipesBtn", "inline");
   }
  }
  else {
   // TODO: Handle failure, if needed.
  }
 }
 
 var params = encodeURIComponent(recipeName);
    
 xmlhttp.open("GET", "/DeleteRecipe?recipe2Delete=" + params, true);
 
 xmlhttp.send(); 
 
 if (null != document.getElementById("viewRecipeForm")) {
   HideElement("editPageBtns");
   HideElement("recipeTitleContainer");  
   HideElement("viewPageBtns");
   
   UnHideElement("filtersContainer");
   UnHideElement("indexPageBtns"); 
 }
}

function DeleteStep(rowNum) {
 var tbody = document.getElementById("stepsTable").getElementsByTagName('tbody')[0];
 
 if (rowNum < 0 || rowNum > tbody.rows.length) {
  return;  // Don't try to do anything stupid.
 }

 // Get name of image file and send request to delete it to server:
 
 var stepImageFileName = tbody.rows[rowNum].cells[1].childNodes[1].value;
 
 if ("" != stepImageFileName && false == IsImageShared(document.getElementById("mainImageName").value, stepImageFileName, tbody, rowNum)) {
  RequestFileDelete(stepImageFileName);
 }

 tbody.deleteRow(rowNum);  // Yeet it.
 
 // Renumber rows:
 
 for (var i = 0; i < tbody.rows.length; ++i) {
  var row = tbody.rows[i];
  var cell= row.cells[2];
  
  cell.innerHTML = "<button onclick=\"DeleteStep(" + (i) + ");\" type=\"button\">Delete</button>&nbsp;"
                 + "<button onclick=\"EditStep("   + (i) + ");\" type=\"button\">Edit</button>";
 }
 
 if (0 == tbody.rows.length) {
  var btnStyle = document.getElementById("delAllStepsBtn").style;
 
  btnStyle.display    = "none";
  btnStyle.visibility = "collapse";
 }
}

function DeleteStepImage() {
 var rowNum = document.getElementById("stepRowId").value;
  
 var tbody   = document.getElementById("stepsTable").getElementsByTagName('tbody')[0];
 var row     = tbody.rows[rowNum];
 var imgUri  = row.cells[1].childNodes[0].src;
 var imgName = imgUri.substring(imgUri.lastIndexOf("/") + 1, imgUri.length);
 
 HideElement("delImgBtn");
 UnHideElement("addImgBtn");
 
 row.cells[1].innerHTML = "";
 
 document.getElementById("image2Edit").src = "";
 HideElement("image2Edit");
 
 if ("" == imgName) {
  return;
 }
 
 if (false == IsImageShared(document.getElementById("mainImageName").value, imgName, tbody, rowNum)) {
  RequestFileDelete(imgName);
 }
}

function DeleteVariation(rowNum) {
 var tbody = document.getElementById("variationsTable").getElementsByTagName('tbody')[0];
 
 if (rowNum < 0 || rowNum > tbody.rows.length) {
  return;  // Don't try to do anything stupid.
 }

 tbody.deleteRow(rowNum);  // Yeet it.
 
 // Renumber rows:
 
 for (var i = 0; i < tbody.rows.length; ++i) {
  var row  = tbody.rows[i];
  var cell = row.cells[1];
  
  cell.innerHTML = "<button onclick=\"DeleteVariation(" + (i) + ");\" type=\"button\">Delete</button>&nbsp;"
                 + "<button onclick=\"EditVariation("   + (i) + ");\" type=\"button\">Edit</button>";
 }
 
 if (0 == tbody.rows.length) {
  var btnStyle = document.getElementById("delAllVariationsBtn").style;
 
  btnStyle.display    = "none";
  btnStyle.visibility = "collapse";
 }
}

function DisplayError(errorMsg, originator) {
 document.getElementById("errorMsg").innerHTML = errorMsg;
 
 document.getElementById("epCloseImg").onclick = function() { HideErrorPopup(originator); };
 
 ToggleVisibility("errorPopup");
 ToggleVisibility(originator);
}

function EditIngredient(rowNum) {
 var tbody = document.getElementById("ingredientsTable").getElementsByTagName('tbody')[0];
 var row   = tbody.rows[rowNum];

 var ingredient2Edit = "";
 var notes2Edit      = "";
 var quantity2Edit   = "";
 
 for (var elemNdx = 0; elemNdx < row.cells[0].children.length; ++elemNdx) {
  var elem = row.cells[0].children[elemNdx];
  
  if ("ingredient" == elem.name) {
   ingredient2Edit = elem.value;
   
   break;
  }
 }
 
 for (var elemNdx = 0; elemNdx < row.cells[4].children.length; ++elemNdx) {
  var elem = row.cells[4].children[elemNdx];
  
  if ("notes" == elem.name) {
   notes2Edit = elem.value;
   
   break;
  }
 }
 
   for (var elemNdx = 0; elemNdx < row.cells[1].children.length; ++elemNdx) {
  var elem = row.cells[1].children[elemNdx];
  
  if ("quantity" == elem.name) {
   quantity2Edit = elem.value;
   
   break;
  }
 }

 document.getElementById("ingredientRowId").value = rowNum;
 document.getElementById("ingredient2Edit").value = ingredient2Edit;
 document.getElementById("quantity2Edit").value   = quantity2Edit;
 document.getElementById("notes2Edit").value      = notes2Edit;
 
 var selectedMeasure = GetEnumFromUnitDesc(row.cells[2].innerText);
 
 if ("UNDEFINED" != selectedMeasure) {
  document.getElementById("measure2Edit").value = selectedMeasure;
 }
 
  var selectedPrep = GetEnumFromPrepDesc(row.cells[3].innerText);
 
 if ("UNDEFINED" != selectedPrep) {
  document.getElementById("preparation2Edit").value = selectedPrep;
 }
 
 document.getElementById("overlayContainer").className = "overlay";
 
 ToggleVisibility("editIngredientPopup");
}

function EditPrerequisite(rowNum) { 
 var tbody = document.getElementById("prerequisitesTable").getElementsByTagName('tbody')[0];
 var row   = tbody.rows[rowNum];
 
 var prerequisite2Edit = "";
 
 for (var elemNdx = 0; elemNdx < row.cells[0].children.length; ++elemNdx) {
  var elem = row.cells[0].children[elemNdx];
  
  if ("prerequisite" == elem.name) {
   prerequisite2Edit = elem.value;
   
   break;
  }
 }
 
 document.getElementById("prerequisiteRowId").value    = rowNum;
 document.getElementById("prerequisite2Edit").value    = prerequisite2Edit;
 document.getElementById("overlayContainer").className = "overlay";
 
 ToggleVisibility("editPrerequisitePopup");
}

function EditRecipe(recipeName) {
 // recipeName is provided when an Edit button is clicked in the Recipes List.
 // If the Edit button is clicked on the Recipe View page, recipeName will be
 // empty, implying that it is meant to edit THAT recipe, and the name can be 
 // obtained from within the hidden page data:
 
 if (undefined == recipeName || "" == recipeName) {
  recipeName = document.getElementById("recipeName").value;
 }
 
 var xmlhttp = new XMLHttpRequest();
    
 xmlhttp.onreadystatechange = function()
 {
  if (4 == xmlhttp.readyState && 200 == xmlhttp.status) {
   var data = xmlhttp.responseText;
    
   document.getElementById("recipesListContainer").innerHTML = data;
   document.getElementById("recipeTitle").innerText          = document.getElementById("recipeName").value; 
   
   HideElement("indexPageBtns");
   HideElement("filtersContainer");
   HideElement("viewPageBtns");
   
   UnHideElement("editPageBtns");
   UnHideElement("recipeTitleContainer");
  }
  else {
   // TODO: Handle failure, if needed.
  }
 }
 
 var params = encodeURIComponent(recipeName);
    
 xmlhttp.open("GET", "/ShowEditRecipePage?recipeToEdit=" + params, true);
 
 xmlhttp.send();  
}

function EditStep(rowNum) {
 var tbody = document.getElementById("stepsTable").getElementsByTagName('tbody')[0];
 var row   = tbody.rows[rowNum];
 
  var step2Edit = "";
 
 for (var elemNdx = 0; elemNdx < row.cells[0].children.length; ++elemNdx) {
  var elem = row.cells[0].children[elemNdx];
  
  if ("step" == elem.name) {
   step2Edit = elem.value;
   
   break;
  }
 }

 document.getElementById("stepRowId").value = rowNum;
 document.getElementById("step2Edit").value = step2Edit;
 
 var imgName = "";
 
 var imgUri  = row.cells[1].childNodes[0].src;
 
 if (undefined != imgUri) {
  var imgName = imgUri.substring(imgUri.lastIndexOf("/") + 1, imgUri.length);
 }
 
 if ("" == imgName) {
  document.getElementById("image2Edit").src = "";
  
  HideElement("image2Edit");
  HideElement("delImgBtn");
  UnHideElement("addImgBtn");
 } else {
  document.getElementById("image2Edit").src = imgUri;
    
  HideElement("addImgBtn");
  UnHideElement("delImgBtn");
  UnHideElement("image2Edit");
 }  
 
 // Handle image here.
 
 document.getElementById("overlayContainer").className = "overlay";
 
 ToggleVisibility("editStepPopup");
} 

function EditVariation(rowNum) { 
 var tbody = document.getElementById("variationsTable").getElementsByTagName('tbody')[0];
 var row   = tbody.rows[rowNum];
 
  var variation2Edit = "";
 
 for (var elemNdx = 0; elemNdx < row.cells[0].children.length; ++elemNdx) {
  var elem = row.cells[0].children[elemNdx];
  
  if ("variation" == elem.name) {
   variation2Edit = elem.value;
   
   break;
  }
 }

 document.getElementById("variationRowId").value       = rowNum;
 document.getElementById("variation2Edit").value       = variation2Edit;
 document.getElementById("overlayContainer").className = "overlay";
 
 ToggleVisibility("editVariationPopup");
}

function HandleAddIngredientBtnClkd() {
 document.getElementById("overlayContainer").className = "overlay";
 
 document.getElementById("ingredient2Add").value = "";
 document.getElementById("notes2Add").value      = "";
 document.getElementById("quantity2Add").value   = "";
 
 ToggleVisibility("addIngredientPopup");
 
 document.getElementById('ingredient2Add').focus();
}

function HandleAddPrerequisiteBtnClkd() {
 document.getElementById("overlayContainer").className = "overlay";
 
 document.getElementById("prerequisite2Add").value = "";
 
 ToggleVisibility("addPrerequisitePopup");
 
 document.getElementById('prerequisite2Add').focus();
}

function HandleAddStepBtnClkd() {
 document.getElementById("overlayContainer").className = "overlay";
 
 document.getElementById("step2Add").value   = "";
 document.getElementById("stepAddImage").src = "";
 
 HideElement("stepAddImage");
 
 ToggleVisibility("addStepPopup");
 
 document.getElementById('step2Add').focus();
}

function HandleAddVariationBtnClkd() {
 document.getElementById("overlayContainer").className = "overlay";
 
 document.getElementById("variation2Add").value = "";
 
 ToggleVisibility("addVariationPopup");
 
 document.getElementById('variation2Add').focus();
}

function HandleDelAllIngredientsBtnClkd() {
 if (true == confirm("Are you sure you want to delete all of the ingredients in the recipe?")) {
  DeleteAllIngredients();
 } 
}

function HandleDelAllPrerequisitesBtnClkd() {
 if (true == confirm("Are you sure you want to delete all of the prerequisites in the recipe?")) {
  DeleteAllPrerequisites();
 }
}

function HandleDelAllStepsBtnClkd() {
  if (true == confirm("Are you sure you want to delete all of the steps in the recipe?")) {
  DeleteAllSteps();
 }
}

function HandleDelAllVariationsBtnClkd() {
 if (true == confirm("Are you sure you want to delete all of the variations in the recipe?")) {
  DeleteAllVariations();
 }
}

function HideAddIngredientPopup() {
 document.getElementById("overlayContainer").className = "no-overlay";
 
 ToggleVisibility("addIngredientPopup");
}

function HideAddPrerequisitePopup() {
 document.getElementById("overlayContainer").className = "no-overlay";
 
 ToggleVisibility("addPrerequisitePopup");
}

function HideAddRecipePopup() {
 document.getElementById("overlayContainer").className = "no-overlay";
 
 ToggleVisibility("addRecipePopup");
}

function HideAddStepPopup() {
 document.getElementById("overlayContainer").className = "no-overlay";
 
 ToggleVisibility("addStepPopup");
}

function HideAddVariationPopup() {
 document.getElementById("overlayContainer").className = "no-overlay";
 
 ToggleVisibility("addVariationPopup");
}

function HideEditIngredientPopup() {
 document.getElementById("overlayContainer").className = "no-overlay";
 
 ToggleVisibility("editIngredientPopup");
}

function HideEditPrerequisitePopup() {
 document.getElementById("overlayContainer").className = "no-overlay";
 
 ToggleVisibility("editPrerequisitePopup");
}

function HideEditStepPopup() {
 document.getElementById("overlayContainer").className = "no-overlay";
 
 ToggleVisibility("editStepPopup");
}

function HideEditVariationPopup() {
 document.getElementById("overlayContainer").className = "no-overlay";
 
 ToggleVisibility("editVariationPopup");
}

function HideErrorPopup(restoree) {
 document.getElementById("overlayContainer").className = "no-overlay";
 
 if ("" != restoree) {
  ToggleVisibility(restoree);
 }
 
 ToggleVisibility("errorPopup");
}

function HideFileUploadPopup() {
 document.getElementById("overlayContainer").className = "no-overlay";
 
 var imageUse = document.getElementById("imageUse").value;
     
 if ("stepImage" == imageUse) {
  UnHideElement(document.getElementById("puInvoker").value);
 }
 
 ToggleVisibility("fileUploadPopup");
}

function HideRecipeExistsWarningPopup() {
 document.getElementById("overlayContainer").className = "no-overlay";
     
 UnHideElement("addRecipePopup");

 ToggleVisibility("recipeExistsWarningPopup");
}

function InitPage() {
 if (0 == document.getElementById("recipesListContainer").children.length) {
  document.getElementById("recipesListContainer").innerHTML = "There are no recipes in the system.<br><br>Why don't you add some?";
  HideElement("DeleteAllRecipesBtn");
 } else {
   UnHideElement("DeleteAllRecipesBtn", "inline");
 }
}

function MoveIngredientDown(rowNum) {
 var tbody = document.getElementById("ingredientsTable").getElementsByTagName('tbody')[0];
 
  if (rowNum == tbody.rows.length) {
  return;
 }
 
 var currentRow = tbody.rows[rowNum];
 var targetRow  = tbody.rows[rowNum + 1];
 
 for (var colNdx = 0; colNdx < currentRow.cells.length; ++colNdx) {
  if (5 == colNdx) { 
   continue;  // Don't swap the buttons, keep the row identifiers consistent.
  }
  
  var currentCell = currentRow.cells[colNdx].innerHTML;
  
  currentRow.cells[colNdx].innerHTML = targetRow.cells[colNdx].innerHTML;
  
  targetRow.cells[colNdx].innerHTML = currentCell;
 }
}

function MoveIngredientUp(rowNum) {
 if (0 == rowNum) {
  return;
 } 
 
 var tbody      = document.getElementById("ingredientsTable").getElementsByTagName('tbody')[0];
 var currentRow = tbody.rows[rowNum];
 
 var targetRow  = tbody.rows[rowNum - 1];
 
 for (var colNdx = 0; colNdx < currentRow.cells.length; ++colNdx) {
  if (5 == colNdx) { 
   continue;  // Don't swap the buttons, keep the row identifiers consistent.
  }
  
  var currentCell = currentRow.cells[colNdx].innerHTML;
  
  currentRow.cells[colNdx].innerHTML = targetRow.cells[colNdx].innerHTML;
  
  targetRow.cells[colNdx].innerHTML = currentCell;
 }
}

function PrintRecipe() {
 HideElement("PrintRecipeBtn");
 
 window.print();
 
 UnHideElement("PrintRecipeBtn", "inline");
}

function RequestFileDelete(fileName) {
 var xmlhttp = new XMLHttpRequest();
    
 xmlhttp.onreadystatechange = function()
 {
  if (4 == xmlhttp.readyState && 200 == xmlhttp.status) {
   // TODO: handle success.
  }
  else {
   // TODO: Handle failure, if needed.
  }
 }
 
 var params = encodeURIComponent(fileName);
    
 xmlhttp.open("GET", "/DeleteFile?file2Delete=" + params, true);
 
 xmlhttp.send();
}

function RequestNewRecipePage(recipeName) {
 var xmlhttp = new XMLHttpRequest();
    
 xmlhttp.onreadystatechange = function()
 {
  if (4 == xmlhttp.readyState && 200 == xmlhttp.status) {
   document.getElementById('recipesListContainer').innerHTML = xmlhttp.responseText;
   document.getElementById("recipeName").value               = recipeName;
   document.getElementById("recipeTitle").innerText          = document.getElementById("recipeName").value; 
   
   HideElement("indexPageBtns");
   HideElement("filtersContainer");
   HideElement("viewPageBtns");
   
   UnHideElement("editPageBtns");
   UnHideElement("recipeTitleContainer");
  }
 }
    
 xmlhttp.open("GET", "/ShowNewRecipePage", true);
 
 xmlhttp.send();
}

function RequestPrintableView(recipeName) {
 // recipeName is provided when an Edit button is clicked in the Recipes List.
 // If the Print button is clicked on the Recipe View page, recipeName will be
 // empty, implying that it is meant to print THAT recipe, and the name can be 
 // obtained from within the hidden page data:
 
 if (undefined == recipeName || "" == recipeName) {
  recipeName = document.getElementById("recipeName").value;
 }
 
 var params = encodeURIComponent(recipeName);
 
 var loc = "/ShowPrintRecipePage?recipeToPrint=" + params;
    
 window.open(loc); 
}

function SaveIngredient() {
 var errs        = "";
 var ingredient  = document.getElementById("ingredient2Edit").value;
 var measure     = GetDescFromUnitType(document.getElementById("measure2Edit").value);
 var notes       = document.getElementById("notes2Edit").value;
 var preparation = GetDescFromPrepType(document.getElementById("preparation2Edit").value);
 var quantity    = document.getElementById("quantity2Edit").value;
 var valid       = true;
 
 if (true == IsEmpty(ingredient)) {
  valid = false;
  
  errs += "An ingredient must be provided.\n";
  
  document.getElementById("ingredient2Edit").style.backgroundColor = errBg;
 } else {
  document.getElementById("ingredient2Edit").style.backgroundColor = validBg;
 } 
 
  if (true == IsEmpty(quantity)) {
  valid = false;
  
  errs += "Quantity must be a number 1 - 999.\n";
  
  document.getElementById("quantity2Edit").style.backgroundColor = errBg;
 } else {
  if (false == IsDigits(quantity)) {
   valid = false;
   
   errs += "Quantity must be a number 1 - 999.\n";
   
   document.getElementById("quantity2Edit").style.backgroundColor = errBg;
  } else {
   document.getElementById("quantity2Edit").style.backgroundColor = validBg;
  }
 } 
 
 if (false == valid) {
  errs = "The following problems were detected and must be corrected:\n\n" + errs;
  
  alert(errs);
  
  return;
 } 
 
 var rowNdx = document.getElementById("ingredientRowId").value;
 var tbody  = document.getElementById("ingredientsTable").getElementsByTagName('tbody')[0];

 tbody.rows[rowNdx].cells[0].innerHTML = ingredient
                                       + '<input name="ingredient" type="hidden" value="' + ingredient + '">';
 tbody.rows[rowNdx].cells[1].innerHTML = quantity
                                       + '<input name="quantity" type="hidden" value="' + quantity + '">'; 
 tbody.rows[rowNdx].cells[2].innerHTML = measure
                                       + '<input name="measure" type="hidden" value="' + measure + '">';
 tbody.rows[rowNdx].cells[3].innerHTML = preparation
                                       + '<input name="prep" type="hidden" value="' + preparation + '">';
 tbody.rows[rowNdx].cells[4].innerHTML = notes
                                       + '<input name="notes" type="hidden" value="' + notes + '">'; 
 HideEditIngredientPopup();
} 

function SavePrerequisite() {
 var errs         = "";
 var prerequisite = document.getElementById("prerequisite2Edit").value;
 var valid        = true;
 
 if (true == IsEmpty(prerequisite)) {
  valid = false;
  
  errs += "Prerequisite text must be provided.\n";
  
  document.getElementById("prerequisite2Edit").style.backgroundColor = errBg;
 } else {
  document.getElementById("prerequisite2Edit").style.backgroundColor = validBg;
 } 
  
 if (false == valid) {
  errs = "The following problems were detected and must be corrected:\n\n" + errs;
  
  alert(errs);
  
  return;
 } 
 
 var rowNdx = document.getElementById("prerequisiteRowId").value;
 var tbody  = document.getElementById("prerequisitesTable").getElementsByTagName('tbody')[0];

 tbody.rows[rowNdx].cells[0].innerHTML = document.getElementById("prerequisite2Edit").value
                                       + '<input name="prerequisite" type="hidden" value="' + document.getElementById("prerequisite2Edit").value + '">';

 HideEditPrerequisitePopup();
}  

function SaveRecipe() {
 var errs        = "";
 var description = document.getElementById("description").value;
 var valid       = true;
 
 if (true == IsEmpty(description)) {
  valid = false;
  
  errs += "Description text must be provided.\n";
  
  document.getElementById("description").style.backgroundColor = errBg;
 } else {
  document.getElementById("description").style.backgroundColor = validBg;
 } 
  
 if (false == valid) {
  errs = "The following problems were detected and must be corrected:\n\n" + errs;
  
  alert(errs);
  
  return;
 }
 
  var xmlhttpReq = new XMLHttpRequest();

 for (;;) {
  if (null != document.getElementById("newRecipeForm")) {
   var mainImageName = document.getElementById("mainImageName").value;
   
   if ("" != mainImageName) {
    document.getElementById("mainImageName").value = document.getElementById("recipeName").value + "_" + mainImageName;
   }
   
   var formData = new FormData(document.getElementById("newRecipeForm"));
   var obj      = Object.fromEntries(Array.from(formData.keys()).map(key => [key, formData.getAll(key).length > 1 ? formData.getAll(key) : formData.get(key)]))
   var json     = JSON.stringify(obj);  

   xmlhttpReq.open("POST", "/AddNewRecipe", true); 
   xmlhttpReq.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
   
   xmlhttpReq.onload = function() {
    HideElement("editPageBtns");
    HideElement("recipeTitleContainer");
    HideElement("viewPageBtns");
    
    UnHideElement("filtersContainer");
    UnHideElement("indexPageBtns"); 
    
    if (4 == xmlhttpReq.readyState && 200 === xmlhttpReq.status) {
     var data = xmlhttpReq.responseText;
     
     if ("" == data) { 
      document.getElementById("recipesListContainer").innerHTML = "There are no recipes in the system.<br><br>Why don't you add some?";
      HideElement("DeleteAllRecipesBtn");
     } else {   
      document.getElementById("recipesListContainer").innerHTML = data;
      UnHideElement("DeleteAllRecipesBtn", "inline");
     } 
    } else {
     document.getElementById("recipesListContainer").innerHTML =  "Recipe not saved";
    }
   };   

   xmlhttpReq.send(json);  

   break;    
  }
  
  if (null != document.getElementById("editRecipeForm")) {
   var mainImageName = document.getElementById("mainImageName").value;
   
   if ("" != mainImageName && mainImageName != document.getElementById("recipeName").value + "_" + mainImageName) {
    if (false == document.getElementById("mainImageName").value.startsWith(document.getElementById("recipeName").value + "_")) {
     document.getElementById("mainImageName").value = document.getElementById("recipeName").value + "_" + mainImageName;
    }
   }   
   
   var formData = new FormData(document.getElementById("editRecipeForm"));
   var obj      = Object.fromEntries(Array.from(formData.keys()).map(key => [key, formData.getAll(key).length > 1 ? formData.getAll(key) : formData.get(key)]))
   var json     = JSON.stringify(obj);  

   xmlhttpReq.open("POST", "/UpdateRecipe", true); 
   xmlhttpReq.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
   
   xmlhttpReq.onload = function() {
   HideElement("editPageBtns");
   HideElement("recipeTitleContainer");
   HideElement("viewPageBtns");
   
   UnHideElement("filtersContainer");
   UnHideElement("indexPageBtns");    
    
    if (4 == xmlhttpReq.readyState && 200 === xmlhttpReq.status) {
     var data = xmlhttpReq.responseText;
     
     if ("" == data) { 
      document.getElementById("recipesListContainer").innerHTML = "There are no recipes in the system.<br><br>Why don't you add some?";
      HideElement("DeleteAllRecipesBtn");
     } else {   
      document.getElementById("recipesListContainer").innerHTML = data;
      UnHideElement("DeleteAllRecipesBtn", "inline");
     } 
    } else {
     document.getElementById("recipesListContainer").innerHTML =  "Recipe not saved";
    }
   };   
      
   xmlhttpReq.send(json);  

   break;    
  }

  break;
 }
}

function SaveStep() {
 var errs  = "";
 var step  = document.getElementById("step2Edit").value;
 var valid = true;
 
 if (true == IsEmpty(step)) {
  valid = false;
  
  errs += "Step text must be provided.\n";
  
  document.getElementById("step2Edit").style.backgroundColor = errBg;
 } else {
  document.getElementById("step2Edit").style.backgroundColor = validBg;
 } 
  
 if (false == valid) {
  errs = "The following problems were detected and must be corrected:\n\n" + errs;
  
  alert(errs);
  
  return;
 }  
 
 var rowNdx = document.getElementById("stepRowId").value;
 var tbody  = document.getElementById("stepsTable").getElementsByTagName('tbody')[0];

 tbody.rows[rowNdx].cells[0].innerHTML = document.getElementById("step2Edit").value 
                                       + '<input name="step" type="hidden" value="' + document.getElementById("step2Edit").value + '">';
 
 var imgUri  = document.getElementById("image2Edit").src;
 var imgName = imgUri.substring(imgUri.lastIndexOf("/") + 1, imgUri.length);
 
 tbody.rows[rowNdx].cells[1].innerHTML = '<img height="80px" src="' + ("" == imgName ? '' : imgUri) + '" ' + ("" == imgName ? 'style="display: none; visibility: collapse;" ' : '') + 'width="80px">'
                                       + '<input name="stepImage" type="hidden" value="' + imgName + '">';

 if ("" == imgName) {
  HideElement("image2Edit");
  HideElement("delImgBtn");
  UnHideElement("addImgBtn");
 } else {
  HideElement("addImgBtn");
  UnHideElement("delImgBtn");
  UnHideElement("image2Edit");
 }

 HideEditStepPopup();
} 

function SaveVariation() {
 var errs      = "";
 var variation = document.getElementById("variation2Edit").value;
 var valid     = true;
 
 if (true == IsEmpty(variation)) {
  valid = false;
  
  errs += "Variation text must be provided.\n";
  
  document.getElementById("variation2Edit").style.backgroundColor = errBg;
 } else {
  document.getElementById("variation2Edit").style.backgroundColor = validBg;
 } 
  
 if (false == valid) {
  errs = "The following problems were detected and must be corrected:\n\n" + errs;
  
  alert(errs);
  
  return;
 } 
 
 var rowNdx = document.getElementById("variationRowId").value;
 var tbody  = document.getElementById("variationsTable").getElementsByTagName('tbody')[0];

 tbody.rows[rowNdx].cells[0].innerHTML = document.getElementById("variation2Edit").value
                                       + '<input name="variation" type="hidden" value="' + document.getElementById("variation2Edit").value + '">';

 HideEditVariationPopup();
}  

function ShowAddRecipePopup() {
 document.getElementById("recipeName2Add").value = "";
 
 ToggleVisibility("addRecipePopup");
 
 document.getElementById('recipeName2Add').focus();
}

function ShowFileUploadForm() {
 ToggleVisibility("response");
 ToggleVisibility("fileUploadForm");
}

function ShowFileUploadPopup(imageTgt, parentElement) {
 document.getElementById("imageUse").value             = imageTgt;
 document.getElementById("overlayContainer").className = "overlay";
 document.getElementById("image2Upload").value         = "";
 
 if ("" != parentElement) {  
  HideElement(parentElement);
  
  document.getElementById("puInvoker").value = parentElement;
 }
 
 ToggleVisibility("fileUploadPopup");
}

function ShowRecipesList(category, cuisine) {
 var xmlhttpReq = new XMLHttpRequest();
 
 xmlhttpReq.open("GET", "/GetRecipesList?category=" + category + "&cuisine=" + cuisine, true); 

 xmlhttpReq.onload = function() {
   HideElement("editPageBtns");
   HideElement("recipeTitleContainer");
   HideElement("viewPageBtns");
   
   UnHideElement("indexPageBtns"); 
   UnHideElement("filtersContainer");
  
  if (4 == xmlhttpReq.readyState && 200 === xmlhttpReq.status) {
   var data = xmlhttpReq.responseText;
   
   if ("" == data) { 
    document.getElementById("recipesListContainer").innerHTML = "There are no recipes in the system for the selected filters.<br><br>Why don't you add some?";
    HideElement("DeleteAllRecipesBtn");
   } else {   
    document.getElementById("recipesListContainer").innerHTML = data;
    UnHideElement("DeleteAllRecipesBtn", "inline");
   }
  } else {
   document.getElementById("recipesListContainer").innerHTML =  "Recipe not saved";
  }
 };

 xmlhttpReq.send();
}

function SubmitFileForUpload(imageUse) {
 // Create a FormData object and add the fields to it that we'll need in the
 // request we;ll sedn to the server to uplad the file:
 
 var formData   = new FormData();
 var image      = document.getElementById('image2Upload').files[0];
 
 formData.append('recipeName', document.getElementById('recipeName').value);
 formData.append('image',      image);
 
 
 // Build the request to send to the server:
 
 var xmlhttpReq = new XMLHttpRequest();

 xmlhttpReq.open('POST', '/uploadImage', true);
 

 // Provide the callback function to handle the response from the server:
 
 xmlhttpReq.onload = function() {
  var response = document.getElementById('response');
  
  if (200 === xmlhttpReq.status) {
   var data = xmlhttpReq.responseText;
   
   response.innerHTML = data;
   
   ToggleVisibility("response");
    
   document.getElementById("fileUploadForm").style.display = "none";
    
   setTimeout(ShowFileUploadForm, 3000)
   
   var recipeName = document.getElementById("recipeName").value;
    
   for (;;) {
    var imageUse = document.getElementById("imageUse").value;
     
    var currentImageName = document.getElementById("mainImageName").value;
     
    if ("mainImage" == imageUse) {
     if ("" != currentImageName && currentImageName != image.name) {
      if (null != document.getElementById("newRecipeForm")) {
       RequestFileDelete(recipeName + '_' + document.getElementById("mainImageName").value);
      }
      
      if (null != document.getElementById("editRecipeForm")) {
       if (false == currentImageName.startsWith(document.getElementById("recipeName").value + "_")) {
        currentImageName = document.getElementById("recipeName").value + "_" + currentImageName;
        
        RequestFileDelete(currentImageName);
       } else {     
        RequestFileDelete(currentImageName);
       }
      }
     }
      
     document.getElementById("mainImageName").value = image.name;
     document.getElementById("mainImage").src = "images/Staging/" + recipeName + '_' + image.name;
     
     UnHideElement("mainImage");
     
     break;
    }
     
    if ("stepImage" == imageUse) {
     var e = document.getElementById("stepAddImage");
 
     e.style.display    = 'block';
     e.style.visibility = "visible";
      
     e.src = "images/Staging/" + recipeName + '_' + image.name;
     
     e = document.getElementById("image2Edit");
 
     e.style.display    = 'block';
     e.style.visibility = "visible";
      
     e.src = "images/Staging/" + recipeName + '_' + image.name;
      
     break;
    }
     
    break;  // Nothing lasts forever.
   }
   
   return;
  } 
  
  var data = xmlhttpReq.responseText;
   
  response.innerHTML = `${data.msg}`;
 };
 
 
 // Send the request to the server:

 xmlhttpReq.send(formData);
}

function ViewRecipe(recipeName) {
 var xmlhttp = new XMLHttpRequest();
    
 xmlhttp.onreadystatechange = function() {
  if (4 == xmlhttp.readyState && 200 == xmlhttp.status) {
   document.getElementById('recipesListContainer').innerHTML = xmlhttp.responseText;
   document.getElementById("recipeTitle").innerText          = document.getElementById("recipeName").value; 
   
   HideElement("editPageBtns");
   HideElement("filtersContainer");
   HideElement("indexPageBtns");
   
   UnHideElement("viewPageBtns"); 
   UnHideElement("recipeTitleContainer"); 
  }
 }

 var params = encodeURIComponent(recipeName);
    
 xmlhttp.open("GET", "/ShowViewRecipePage?recipeName=" + params, true);
 
 xmlhttp.send(); 
}