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

  errs += "Quantity must be a number 0.01 - 999.\n";

  document.getElementById("quantity2Add").style.backgroundColor = errBg;
 } else {
  if (false == IsNumeric(quantity)) {
   valid = false;
 
   errs += "Quantity must be a number 0.01 - 999.\n";
 
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
 
 cell.innerHTML      = ingredient + '<input name="ingredient"     type="hidden" value="' + ingredient + '">'
                                  + '<input name="ingredientType" type="hidden" value="INGREDIENT">'; 
 cell.style.maxWidth = "200px";
 cell.style.minWidth = "200px";
 cell.style.wordWrap = "break-word";


 var quantity = document.getElementById("quantity2Add").value;
 
 cell = row.insertCell();
 
 cell.innerHTML       = quantity + '<input name="quantity" type="hidden" value="' + quantity + '">';
 cell.style.maxWidth  = "70px"; 
 cell.style.minWidth  = "70px"; 
 cell.style.textAlign = "right"; 
 cell.style.wordWrap  = "break-word";


 var measure = GetDescFromUnitType(document.getElementById("measure2Add").value);
 
 cell = row.insertCell();
 
 cell.innerHTML      = measure + '<input name="measure" type="hidden" value="' + measure + '">';
 cell.style.maxWidth = "80px"; 
 cell.style.minWidth = "80px";  
 cell.style.wordWrap = "break-word";


 var prep = GetDescFromPrepType(document.getElementById("preparation2Add").value);
 
 cell = row.insertCell();
 
 cell.innerHTML      = prep + '<input name="prep" type="hidden" value="' + prep + '">';
 cell.style.maxWidth = "130px"; 
 cell.style.minWidth = "130px";  
 cell.style.wordWrap = "break-word";


 var notes = document.getElementById("notes2Add").value;
 
 cell = row.insertCell();
 
 cell.innerHTML      = notes + '<input name="notes" type="hidden" value="' + notes + '">'; 
 cell.style.maxWidth = "200px"; 
 cell.style.minWidth = "200px";  
 cell.style.wordWrap = "break-word"; 
 
 var cell = row.insertCell();
 
 cell.colSpan         = "2";                      
 cell.innerHTML       = "<span>"
                      + "<img height='24px' onclick='DeleteIngredient("
                      + (tbody.rows.length - 1)
                      + ");' src='/images/Buttons/DeleteBtn_48X48.jpg' title='Delete Ingredient' width='24px'> &nbsp;"
                      + "<img height='24px' onclick='EditIngredient("
                      + (tbody.rows.length - 1)
                      + ");' src='/images/Buttons/EditBtn_48X48.jpg' title='Edit Ingredient' width='24px'> &nbsp;"
                      + "<img height='24px' onclick='MoveIngredientUp("
                      + (tbody.rows.length - 1) 
                      + ");' src='/images/Buttons/UpBtn_48X48.png' title='Move Ingredient Up' width='24px'> &nbsp;"
                      + "<img height='24px' onclick='MoveIngredientDown("
                      + (tbody.rows.length - 1)
                      + ");' src='/images/Buttons/DownBtn_48X48.png' title='Move Ingredient Down' width='24px'>"
                      + "</span>";                                            
 cell.style.maxWidth  = "150px"; 
 cell.style.minWidth  = "150px"; 
 cell.style.textAlign = "right";                 
 
 var btnStyle = document.getElementById("delAllIngredientsBtn").style;
 
 btnStyle.display    = "inline";
 btnStyle.visibility = "visible"; 
 
 HideAddIngredientPopup();
}

function AddIngredientHeading() {
 var errs       = "";
 var headingTxt = document.getElementById("heading2Add").value;
 var ingredient = document.getElementById("ingredient2Add").value;
 var quantity   = document.getElementById("quantity2Add").value;
 var valid      = true;

 if (true == IsEmpty(headingTxt)) {
  valid = false;

  errs += "A heading must be provided.\n";

  document.getElementById("heading2Add").style.backgroundColor = errBg;
 } else {
  document.getElementById("heading2Add").style.backgroundColor = validBg;
 }    

 if (false == valid) {
  errs = "The following problems were detected and must be corrected:\n\n" + errs;
  
  alert(errs);
  
  return;
 } 
 
 var tbody = document.getElementById("ingredientsTable").getElementsByTagName('tbody')[0];
 var row   = tbody.insertRow();
 var cell  = row.insertCell();
 
 var heading = document.getElementById("heading2Add").value;
 
 cell.colSpan          = "5";
 cell.innerHTML        = heading + '<input name="ingredient"     type="hidden" value="' + heading + '">'
                                 + '<input name="ingredientType" type="hidden" value="HEADING">'
                                 + '<input name="quantity"       type="hidden" value="0">'
                                 + '<input name="measure"        type="hidden" value="">'
                                 + '<input name="prep"           type="hidden" value="">'
                                 + '<input name="notes"          type="hidden" value="">'; 
 cell.style.fontWeight = "bold";
 cell.style.maxWidth   = "500px";
 cell.style.minWidth   = "700px";
 cell.style.textAlign  = "center"; 
 cell.style.wordWrap   = "break-word";                          
 
 var cell  = row.insertCell();
 
 cell.colSpan         = "2";
 cell.innerHTML       = "<img height='24px' onclick='DeleteIngredient("
                      + (tbody.rows.length - 1)
                      + ");' src='/images/Buttons/DeleteBtn_48X48.jpg' title='Delete Ingredient' width='24px'> &nbsp;"
                      + "<img height='24px' onclick='EditIngredient("
                      + (tbody.rows.length - 1)
                      + ");' src='/images/Buttons/EditBtn_48X48.jpg' title='Edit Ingredient' width='24px'> &nbsp;"
                      + "<img height='24px' onclick='MoveIngredientUp("
                      + (tbody.rows.length - 1)
                      + ");' src='/images/Buttons/UpBtn_48X48.png' title='Move Ingredient Up' width='24px'> &nbsp;"
                      + "<img height='24px' onclick='MoveIngredientDown("
                      + (tbody.rows.length - 1)
                      + ");' src='/images/Buttons/DownBtn_48X48.png' title='Move Ingredient Down' width='24px'>";                       
                      
 cell.style.maxWidth  = "150px"; 
 cell.style.minWidth  = "150px"; 
 cell.style.textAlign = "right";                 
 
 var btnStyle = document.getElementById("delAllIngredientsBtn").style;
 
 btnStyle.display    = "inline";
 btnStyle.visibility = "visible";
 
 HideAddIngredientHeadingPopup();
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
 cell.innerHTML       = "<span>"
                      + "<img height='24px' onclick='DeletePrerequisite(" + (tbody.rows.length - 1) + ");' src='/images/Buttons/DeleteBtn_48X48.jpg' title='Delete Prerequisite' width='24px'> &nbsp;"
                      + "<img height='24px' onclick='EditPrerequisite("   + (tbody.rows.length - 1) + ");' src='/images/Buttons/EditBtn_48X48.jpg'   title='Edit Prerequisite'   width='24px'>" 
                      + "</span>"
 
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
    
 xmlhttp.onreadystatechange = function() {
  if (ReadyStateTypes.DONE != xmlhttp.readyState) {
   return;
  }
 
  if (HttpStatusTypes.OK == xmlhttp.status || HttpStatusTypes.NOTMODIFIED == xmlhttp.status) {
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
 
 cell.innerHTML      = document.getElementById("step2Add").value 
                     + '<input name="step"     type="hidden" value="' + document.getElementById("step2Add").value + '">'
                     + '<input name="stepType" type="hidden" value="STEP">'; 
 cell.style.maxWidth = "500px";
 cell.style.minWidth = "500px";  
 cell.style.wordWrap = "break-word";                       
 
 
 cell = row.insertCell(-1); 

 cell.innerHTML      = '<img height="80px" src="' + ("" == imgName ? '' : imgSrc) + '" ' + ("" == imgName ? 'style="display: none; visibility: collapse;" ' : '') + 'width="80px">'
                     + '<input name="stepImage" type="hidden" value="' + imgName + '">';
 cell.style.maxWidth = "130px";
 cell.style.minWidth = "130px";
 cell.style.wordWrap = "break-word";                
 
 
 cell = row.insertCell(-1);
 cell.colspan         = "2";
 cell.style.maxWidth  = "130px"; 
 cell.style.minWidth  = "130px"; 
 cell.style.textAlign = "left"; 
 cell.innerHTML       = "<img height='24px' onclick='DeleteStep("
                      + (tbody.rows.length - 1)
                      + ");' src='/images/Buttons/DeleteBtn_48X48.jpg' title='Delete Step' width='24px'> &nbsp;"
                      + "<img height='24px' onclick='EditStep("
                      + (tbody.rows.length - 1)
                      + ");' src='/images/Buttons/EditBtn_48X48.jpg' title='Edit Step' width='24px'> &nbsp;"
                      + "<img height='24px' onclick='MoveStepUp("
                      + (tbody.rows.length - 1)
                      + ");' src='/images/Buttons/UpBtn_48X48.png' title='Move Step Up' width='24px'> &nbsp;"
                      + "<img height='24px' onclick='MoveStepDown("
                      + (tbody.rows.length - 1)
                      + ");' src='/images/Buttons/DownBtn_48X48.png' title='Move Step Down' width='24px'>";                 

 var btnStyle = document.getElementById("delAllStepsBtn").style;
 
 btnStyle.display    = "inline";
 btnStyle.visibility = "visible";
 
 HideAddStepPopup();
}

function AddStepHeading() {
 var errs         = "";
 var stepHeading  = document.getElementById("stepHeading2Add").value;
 var valid        = true;
 
 if (true == IsEmpty(stepHeading)) {
  valid = false;
  
  errs += "Step heading text must be provided.\n";
  
  document.getElementById("stepHeading2Add").style.backgroundColor = errBg;
 } else {
  document.getElementById("stepHeading2Add").style.backgroundColor = validBg;
 } 
  
 if (false == valid) {
  errs = "The following problems were detected and must be corrected:\n\n" + errs;
  
  alert(errs);
  
  return;
 }  
  
 var tbody = document.getElementById("stepsTable").getElementsByTagName('tbody')[0];
 var row   = tbody.insertRow();
 
 var cell  = row.insertCell(-1);
 
 cell.colSpan          = "2";
 cell.innerHTML        = document.getElementById("stepHeading2Add").value 
                       + '<input name="step"      type="hidden" value="' + document.getElementById("stepHeading2Add").value + '">'
                       + '<input name="stepType"  type="hidden" value="HEADING">'
                       + '<input name="stepImage" type="hidden" value="">'    
 cell.style.fontWeight = "bold";                      
 cell.style.minWidth   = "640px";
 cell.style.textAlign  = "center"; 
 cell.style.wordWrap   = "break-word";

 
 cell = row.insertCell(-1);
 
 cell.style.maxWidth  = "130px"; 
 cell.style.minWidth  = "130px"; 
 cell.style.textAlign = "left"; 
 cell.innerHTML       = "<img height='24px' onclick='DeleteStep("
                      + (0 == tbody.rows.length ? 0 : tbody.rows.length - 1)
                      + ");' src='/images/Buttons/DeleteBtn_48X48.jpg' title='Delete Step' width='24px'> &nbsp;"
                      + "<img height='24px' onclick='EditStep("
                      + (0 == tbody.rows.length ? 0 : tbody.rows.length - 1)
                      + ");' src='/images/Buttons/EditBtn_48X48.jpg' title='Edit Step' width='24px'> &nbsp;"
                      + "<img height='24px' onclick='MoveStepUp("
                      + (0 == tbody.rows.length ? 0 : tbody.rows.length - 1)
                      + ");' src='/images/Buttons/UpBtn_48X48.png' title='Move Step Up' width='24px'> &nbsp;"
                      + "<img height='24px' onclick='MoveStepDown("
                      + (0 == tbody.rows.length ? 0 : tbody.rows.length - 1)
                      + ");' src='/images/Buttons/DownBtn_48X48.png' title='Move Step Down' width='24px'>"; 

 var btnStyle = document.getElementById("delAllStepsBtn").style;
 
 btnStyle.display    = "inline";
 btnStyle.visibility = "visible";
 
 HideAddStepHeadingPopup();
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
 cell.innerHTML       = "<span>"
                      + "<img height='24px' onclick='DeleteVariation(" + (tbody.rows.length - 1) 
                      + ");' src='/images/Buttons/DeleteBtn_48X48.jpg' title='Delete Variation' width='24px'> &nbsp;"
                      + "<img height='24px' onclick='EditVariation(" + (tbody.rows.length - 1) 
                      + ");' src='/images/Buttons/EditBtn_48X48.jpg' title='Edit Variation' width='24px'>"
                      + "</span>";

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
 
 xmlhttp.onreadystatechange = function() {
  if (ReadyStateTypes.DONE != xmlhttp.readyState) {
   return;
  }
  
  if (HttpStatusTypes.OK == xmlhttp.status) {
   var data = xmlhttp.responseText;
   
   const parser = new DOMParser();
   const doc    = parser.parseFromString(data, 'text/html');
   
   document.getElementById("displayCnt").innerText = doc.getElementById("filesListCnt").value;
   document.getElementById("totalCnt").innerText   = doc.getElementById("totalFilesCnt").value;  
   
   if (0 == doc.getElementById("totalFilesCnt").value) { 
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
  
  cell.innerHTML = "<img height='24px' onclick='DeleteIngredient(" + (i) + ");' src='/images/Buttons/DeleteBtn_48X48.jpg' title='Delete Ingredient' width='24px'> &nbsp;"
                 + "<img height='24px' onclick='EditIngredient("   + (i) + ");' src='/images/Buttons/EditBtn_48X48.jpg'   title='Edit Ingredient'   width='24px'>"                 
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
  
  cell.innerHTML = "<img height='24px' onclick='DeletePrerequisite(" + (i) + ");' src='/images/Buttons/DeleteBtn_48X48.jpg' title='Delete Prerequisite' width='24px'> &nbsp;"
                 + "<img height='24px' onclick='EditPrerequisite("   + (i) + ");' src='/images/Buttons/EditBtn_48X48.jpg'   title='Edit Prerequisite'   width='24px'>" 
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
  if (ReadyStateTypes.DONE != xmlhttp.readyState) {
   return;
  }
  
  if (HttpStatusTypes.OK == xmlhttp.status) {
   var data = xmlhttp.responseText;
   
   const parser = new DOMParser();
   const doc    = parser.parseFromString(data, 'text/html');
   
   document.getElementById("displayCnt").innerText = doc.getElementById("filesListCnt").value;
   document.getElementById("totalCnt").innerText   = doc.getElementById("totalFilesCnt").value;
      
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
  
  cell.innerHTML = "<img height='24px' onclick='DeleteStep(" + (i) + ");' src='/images/Buttons/DeleteBtn_48X48.jpg' title='Delete Step' width='24px'> &nbsp;"
                 + "<img height='24px' onclick='EditStep("   + (i) + ");' src='/images/Buttons/EditBtn_48X48.jpg'   title='Edit Step'   width='24px'>"  
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
 var type            = "INGREDIENT";
 
 for (var elemNdx = 0; elemNdx < row.cells[0].children.length; ++elemNdx) {
  var elem = row.cells[0].children[elemNdx];
  
  if ("ingredient" == elem.name) {
   ingredient2Edit = elem.value;
  }
  
  if ("ingredientType" == elem.name) {
   type = elem.value;
  }
 }
 
 if ("INGREDIENT" == type) {
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
 }
 
 document.getElementById("overlayContainer").className = "overlay";
 
 if ("INGREDIENT" == type) {
  ToggleVisibility("editIngredientPopup");
 } else {
  document.getElementById("headingRowId").value = rowNum;
  document.getElementById("heading2Edit").value = ingredient2Edit;
  
  ToggleVisibility("editIngredientHeadingPopup");
 }
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
  if (ReadyStateTypes.DONE == xmlhttp.readyState && HttpStatusTypes.OK == xmlhttp.status) {
   var data = xmlhttp.responseText;
    
   document.getElementById("recipesListContainer").innerHTML = data;
   document.getElementById("recipeTitle").innerText          = document.getElementById("recipeName").value; 
   
   HideElement("indexPageBtns");
   HideElement("filtersContainer");
   HideElement("viewPageBtns");
   
   UnHideElement("editPageBtns");
   UnHideElement("recipeTitleContainer", "inline-block");
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
 var type      = "STEP";
 
 for (var elemNdx = 0; elemNdx < row.cells[0].children.length; ++elemNdx) {
  var elem = row.cells[0].children[elemNdx];
  
  if ("step" == elem.name) {
   step2Edit = elem.value;
  }
  
  if ("stepType" == elem.name) {
   type = elem.value;
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
 
 document.getElementById("overlayContainer").className = "overlay";
 
 if ("STEP" == type) {
  ToggleVisibility("editStepPopup");
 } else {
  document.getElementById("stepHeadingRowId").value = rowNum;
  document.getElementById("stepHeading2Edit").value = step2Edit;
  
  ToggleVisibility("editStepHeadingPopup");
 }
} 

function EditStepHeading(rowNum) {
 var tbody = document.getElementById("stepsTable").getElementsByTagName('tbody')[0];
 var row   = tbody.rows[rowNum];
 
 var stepHeading2Edit = "";
 
 for (var elemNdx = 0; elemNdx < row.cells[0].children.length; ++elemNdx) {
  var elem = row.cells[0].children[elemNdx];
  
  if ("step" == elem.name) {
   stepHeading2Edit = elem.value;
   
   break;
  }
 }

 document.getElementById("stepHeadingRowId").value = rowNum;
 document.getElementById("stepHeading2Edit").value = stepHeading2Edit;  
 
 document.getElementById("overlayContainer").className = "overlay";
 
 ToggleVisibility("editStepHeadingPopup");
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
 
 document.getElementById("heading2Add").value    = ""; 
 document.getElementById("ingredient2Add").value = "";
 document.getElementById("notes2Add").value      = "";
 document.getElementById("quantity2Add").value   = "1";
 
 ToggleVisibility("addIngredientPopup");
 
 document.getElementById('ingredient2Add').focus();
}

function HandleAddIngredientHeadingBtnClkd() {
 document.getElementById("overlayContainer").className = "overlay";
 
 document.getElementById("heading2Add").value    = ""; 
 document.getElementById("ingredient2Add").value = "";
 document.getElementById("notes2Add").value      = "";
 document.getElementById("quantity2Add").value   = "";
 
 ToggleVisibility("addIngredientHeadingPopup");
 
 document.getElementById('heading2Add').focus();
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
 
 document.getElementById("image2Upload").value = "";
 
 ToggleVisibility("addStepPopup");
 
 document.getElementById('step2Add').focus();
}

function HandleAddStepHeadingBtnClkd() {
 document.getElementById("overlayContainer").className = "overlay";
 
 document.getElementById("stepHeading2Add").value = "";
 
 ToggleVisibility("addStepHeadingPopup");
 
 document.getElementById('stepHeading2Add').focus();
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

function HandleImageSelectionChanged() {
 let imagePathFile = document.getElementById('image2Upload').files[0];
 
 if ('undefined' === typeof imagePathFile) {
  HideElement("uploadImgBtn");
 } else {
  UnHideElement("uploadImgBtn", "inline");
 }
}

function HandleExportAllBtnClkd() {
 var xmlhttpReq = new XMLHttpRequest();
 
 document.getElementById("ExportRecipesResponseContainer").innerHTML = "Exporting all recipes.<br><br>Depending on the number of recipes, this can take some time.<br><br>Please be patient.";
 
 HideElement("ExportContainer"); 
 HideElement("ExportButtonsContainer");
 UnHideElement("ExportRecipesResponseContainer"); 
 
 xmlhttpReq.open("GET", "/ExportAllRecipes"); 
 
 xmlhttpReq.responseType = "blob";

 xmlhttpReq.onload = function() {
  HideElement("editPageBtns");
  HideElement("recipeTitleContainer");
  HideElement("viewPageBtns");
  
  UnHideElement("indexPageBtns"); 
  UnHideElement("filtersContainer");
  
  if (ReadyStateTypes.DONE != xmlhttpReq.readyState) { 
   return;
  }
  
  if (HttpStatusTypes.OK === xmlhttpReq.status) {
   document.getElementById("ExportRecipesResponseContainer").innerText = "Recipes Exported.";
   
   HideElement("ExportContainer");
   UnHideElement("ExportRecipesResponseContainer");

   let blob = new Blob([xmlhttpReq.response], {type: 'application/zip'});
   let uri  = URL.createObjectURL(blob);
   let link = document.createElement("a");
   
   link.download = "recipes.zip";
   link.href     = uri;

   document.body.appendChild(link);
   link.click();
   document.body.removeChild(link);
  } else {
   alert("Unable to download .zip file");
  }
 };

 xmlhttpReq.send(); 
}

function HandleExportSelectedBtnClkd() {
 var xmlhttpReq = new XMLHttpRequest();
 
 xmlhttpReq.open("POST", "/ExportSelectedRecipes", true); 
 xmlhttpReq.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
 
 xmlhttpReq.responseType = "blob";
 
 xmlhttpReq.onload = function() {
  if (ReadyStateTypes.DONE != xmlhttpReq.readyState) {
   return;
  }
  
  if (HttpStatusTypes.OK === xmlhttpReq.status) {
   document.getElementById("ExportRecipesResponseContainer").innerText = "Recipes Exported.";
   
   HideElement("ExportContainer");
   UnHideElement("ExportRecipesResponseContainer");
  
   let blob = new Blob([xmlhttpReq.response], {type: 'application/octet-stream'});
   let uri  = URL.createObjectURL(blob);
   let link = document.createElement("a");
   
   link.download = "recipes.zip";
   link.href     = uri;

   document.body.appendChild(link);
   link.click();
   document.body.removeChild(link);
  } else {
   alert("Unable to download .zip file");
  }
 }; 
 
 var formData = new FormData(document.getElementById("ExportRecipesForm"));
 var obj      = Object.fromEntries(Array.from(formData.keys()).map(key => [key, formData.getAll(key).length > 1 ? formData.getAll(key) : formData.get(key)]))
 var json     = JSON.stringify(obj); 
 
 document.getElementById("ExportRecipesResponseContainer").innerText = "Exporting selected recipes.<br><br>Depending on the number of recipes, this can take some time.<br><br>Please be patient.";
 
 HideElement("ExportContainer"); 
 UnHideElement("ExportButtonsContainer");

 xmlhttpReq.send(json); 
}

function HandleRequestRenameRecipeBtnClkd() {
 let newRecipeName = prompt("Enter new name for recipe and click OK to proceed.");
 
 if (null == newRecipeName) {
  return;
 }
 
 if (false == IsFileName(newRecipeName)) {
  alert("A name must be provided and may contain \"'0123456789 abcdefghijklmnopqrstuvwxyz-_\".");
  
  return;
 }
 
 if (false == IsNotOnlySpaces(newRecipeName)) {
  alert("A name cannot be just spaces,");
  
  return;
 }

 var xmlhttp = new XMLHttpRequest();
    
 xmlhttp.onreadystatechange = function() {
  if (ReadyStateTypes.DONE != xmlhttp.readyState) {
   return;
  }
 
  if (HttpStatusTypes.OK == xmlhttp.status || HttpStatusTypes.NOTMODIFIED == xmlhttp.status) {
   if ("NO" == xmlhttp.response) {
    let oldRecipeName = encodeURIComponent(document.getElementById("recipeTitle").innerText);
    
    RequestRenameRecipe(oldRecipeName, encodeURIComponent(newRecipeName));
   } else {
    alert("Recipe '" + newRecipeName + "' already exists.");
   } 
  }
  else {
   // TODO: Handle failure, if needed.
  }
 }
  
 var params = encodeURIComponent(newRecipeName);
    
 xmlhttp.open("GET", "/CheckRecipeExists?file2Check=" + params, true);
 
 xmlhttp.send();
}

function HandleSearchBtnClkd() {
 var xmlhttpReq = new XMLHttpRequest();
 
 var searchTerm = document.getElementById("searchTerm").value;
 
 if ("" == searchTerm) {
  alert("Please enter a search term to perform a search.");
  
  return;  
 }
 
 xmlhttpReq.open("GET", "/SearchRecipes?searchTerm=" + searchTerm); 

 xmlhttpReq.onload = function() {
   HideElement("editPageBtns");
   HideElement("recipeTitleContainer");
   HideElement("viewPageBtns");
   
   UnHideElement("indexPageBtns"); 
   UnHideElement("filtersContainer");
  
  if (ReadyStateTypes.DONE == xmlhttpReq.readyState && HttpStatusTypes.OK === xmlhttpReq.status) {
   var data = xmlhttpReq.responseText;
   
   const parser = new DOMParser();
   const doc    = parser.parseFromString(data, 'text/html');
   
   var filesListCnt = doc.getElementById("filesListCnt").value;
    
   document.getElementById("displayCnt").innerText = filesListCnt;
   
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

function HideAddIngredientPopup() {
 document.getElementById("overlayContainer").className = "no-overlay";
 
 ToggleVisibility("addIngredientPopup");
}

function HideAddIngredientHeadingPopup() {
 document.getElementById("overlayContainer").className = "no-overlay";
 
 ToggleVisibility("addIngredientHeadingPopup");
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

function HideAddStepHeadingPopup() {
 document.getElementById("overlayContainer").className = "no-overlay";
 
 ToggleVisibility("addStepHeadingPopup");
}

function HideAddVariationPopup() {
 document.getElementById("overlayContainer").className = "no-overlay";
 
 ToggleVisibility("addVariationPopup");
}

function HideEditIngredientPopup() {
 document.getElementById("overlayContainer").className = "no-overlay";
 
 ToggleVisibility("editIngredientPopup");
}

function HideEditIngredientHeadingPopup() {
 document.getElementById("overlayContainer").className = "no-overlay";
 
 ToggleVisibility("editIngredientHeadingPopup");
}

function HideEditPrerequisitePopup() {
 document.getElementById("overlayContainer").className = "no-overlay";
 
 ToggleVisibility("editPrerequisitePopup");
}

function HideEditStepPopup() {
 document.getElementById("overlayContainer").className = "no-overlay";
 
 ToggleVisibility("editStepPopup");
}

function HideEditStepHeadingPopup() {
 document.getElementById("overlayContainer").className = "no-overlay";
 
 ToggleVisibility("editStepHeadingPopup");
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

function HideExportRecipesPopup() {
 document.getElementById("overlayContainer").className = "no-overlay";
 
 ToggleVisibility("exportRecipesPopup");
}

function HideFileUploadPopup() {
 document.getElementById("overlayContainer").className = "no-overlay";
 
 var imageUse = document.getElementById("imageUse").value;
     
 if ("stepImage" == imageUse) {
  UnHideElement(document.getElementById("puInvoker").value);
 }
 
 ToggleVisibility("fileUploadPopup");
}

function HideImportRecipesPopup() {
 document.getElementById("overlayContainer").className = "no-overlay";
 
 UnHideElement(document.getElementById("ppuInvoker").value);
 
 ToggleVisibility("importRecipesPopup");
}

function HideRecipeExistsWarningPopup() {
 document.getElementById("overlayContainer").className = "no-overlay";
     
 UnHideElement("addRecipePopup");

 ToggleVisibility("recipeExistsWarningPopup");
}

function HideSettingsPopup() {
 document.getElementById("overlayContainer").className = "no-overlay";

 ToggleVisibility("SettingsPopup");
}

function InitPage() {
 var recipesCnt = document.getElementById("filesListCnt").value;
 
 if (0 == recipesCnt) {
  document.getElementById("recipesListContainer").innerHTML = "There are no recipes in the system.<br><br>Why don't you add some?";
  
  HideElement("DeleteAllRecipesBtn");
 } else {
   document.getElementById("displayCnt").innerText = recipesCnt;
   
   UnHideElement("DeleteAllRecipesBtn", "inline");
 }
}

function MoveIngredientDown(rowNum) {
 var tbody = document.getElementById("ingredientsTable").getElementsByTagName('tbody')[0];
 
 if (rowNum == tbody.rows.length - 1) {
  return;  // Already at the bottom.
 }
 
 var currentRow = tbody.rows[rowNum].innerHTML;
 var targetRow  = tbody.rows[rowNum + 1].innerHTML;
 
 tbody.rows[rowNum + 1].innerHTML = currentRow;
 tbody.rows[rowNum].innerHTML     = targetRow; 
 
 for (var rowNdx = 0; rowNdx < tbody.rows.length; ++rowNdx) {
  var cellCnt = tbody.rows[rowNdx].cells.length;
  
  var cell = tbody.rows[rowNdx].cells[cellCnt - 1];
  
  cell.innerHTML = "<img height='24px' onclick='DeleteIngredient("
                 + rowNdx 
                 + ");' src='/images/Buttons/DeleteBtn_48X48.jpg' title='Delete Ingredient' width='24px'> &nbsp;"
                 + "<img height='24px' onclick='EditIngredient("
                 + rowNdx 
                 + ");' src='/images/Buttons/EditBtn_48X48.jpg' title='Edit Ingredient' width='24px'> &nbsp;"
                 + "<img height='24px' onclick='MoveIngredientUp("
                 + rowNdx 
                 + ");' src='/images/Buttons/UpBtn_48X48.png' title='Move Ingredient Up' width='24px'> &nbsp;"
                 + "<img height='24px' onclick='MoveIngredientDown("
                 + rowNdx
                 + ");' src='/images/Buttons/DownBtn_48X48.png' title='Move Ingredient Down' width='24px'>"; 
 } 
}

function MoveIngredientUp(rowNum) {
 if (0 == rowNum) {
  return;  // Row is as up as it can be.
 } 
 
 var tbody      = document.getElementById("ingredientsTable").getElementsByTagName('tbody')[0];
 var currentRow = tbody.rows[rowNum].innerHTML;
 var targetRow  = tbody.rows[rowNum - 1].innerHTML;
 
 tbody.rows[rowNum - 1].innerHTML = currentRow;
 tbody.rows[rowNum].innerHTML     = targetRow; 
 
 for (var rowNdx = 0; rowNdx < tbody.rows.length; ++rowNdx) {
  var cellCnt = tbody.rows[rowNdx].cells.length;
  
  var cell = tbody.rows[rowNdx].cells[cellCnt - 1];
  
  cell.innerHTML = "<img height='24px' onclick='DeleteIngredient("
                 + rowNdx 
                 + ");' src='/images/Buttons/DeleteBtn_48X48.jpg' title='Delete Ingredient' width='24px'> &nbsp;"
                 + "<img height='24px' onclick='EditIngredient("
                 + rowNdx 
                 + ");' src='/images/Buttons/EditBtn_48X48.jpg' title='Edit Ingredient' width='24px'> &nbsp;"
                 + "<img height='24px' onclick='MoveIngredientUp("
                 + rowNdx 
                 + ");' src='/images/Buttons/UpBtn_48X48.png' title='Move Ingredient Up' width='24px'> &nbsp;"
                 + "<img height='24px' onclick='MoveIngredientDown("
                 + rowNdx
                 + ");' src='/images/Buttons/DownBtn_48X48.png' title='Move Ingredient Down' width='24px'>"; 
 }
}

function MoveStepDown(rowNum) {
 var tbody = document.getElementById("stepsTable").getElementsByTagName('tbody')[0];
 
 if (rowNum == tbody.rows.length - 1) {
  return;
 }
 
 var currentRow = tbody.rows[rowNum].innerHTML;
 var targetRow  = tbody.rows[rowNum + 1].innerHTML;
 
 tbody.rows[rowNum + 1].innerHTML = currentRow;
 tbody.rows[rowNum].innerHTML     = targetRow; 
 
 for (var rowNdx = 0; rowNdx < tbody.rows.length; ++rowNdx) {
  var cellCnt = tbody.rows[rowNdx].cells.length;
  
  var cell = tbody.rows[rowNdx].cells[cellCnt - 1];
  
  cell.innerHTML = "<img height='24px' onclick='DeleteStep("
                 + rowNdx 
                 + ");' src='/images/Buttons/DeleteBtn_48X48.jpg' title='Delete Step' width='24px'> &nbsp;"
                 + "<img height='24px' onclick='EditStep("
                 + rowNdx 
                 + ");' src='/images/Buttons/EditBtn_48X48.jpg' title='Edit Step' width='24px'> &nbsp;"
                 + "<img height='24px' onclick='MoveStepUp("
                 + rowNdx 
                 + ");' src='/images/Buttons/UpBtn_48X48.png' title='Move Step Up' width='24px'> &nbsp;"
                 + "<img height='24px' onclick='MoveStepDown("
                 + rowNdx
                 + ");' src='/images/Buttons/DownBtn_48X48.png' title='Move Step Down' width='24px'>"; 
 }
}

function MoveStepUp(rowNum) {
 if (0 == rowNum) {
  return;
 } 
 
 var tbody      = document.getElementById("stepsTable").getElementsByTagName('tbody')[0];
 var currentRow = tbody.rows[rowNum].innerHTML;
 var targetRow  = tbody.rows[rowNum - 1].innerHTML;
 
 tbody.rows[rowNum - 1].innerHTML = currentRow;
 tbody.rows[rowNum].innerHTML     = targetRow; 
 
 for (var rowNdx = 0; rowNdx < tbody.rows.length; ++rowNdx) {
  var cellCnt = tbody.rows[rowNdx].cells.length;
  
  var cell = tbody.rows[rowNdx].cells[cellCnt - 1];
  
  cell.innerHTML = "<img height='24px' onclick='DeleteStep("
                 + rowNdx 
                 + ");' src='/images/Buttons/DeleteBtn_48X48.jpg' title='Delete Step' width='24px'> &nbsp;"
                 + "<img height='24px' onclick='EditStep("
                 + rowNdx 
                 + ");' src='/images/Buttons/EditBtn_48X48.jpg' title='Edit Step' width='24px'> &nbsp;"
                 + "<img height='24px' onclick='MoveStepUp("
                 + rowNdx 
                 + ");' src='/images/Buttons/UpBtn_48X48.png' title='Move Step Up' width='24px'> &nbsp;"
                 + "<img height='24px' onclick='MoveStepDown("
                 + rowNdx
                 + ");' src='/images/Buttons/DownBtn_48X48.png' title='Move Step Down' width='24px'>"; 
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
  if (ReadyStateTypes.DONE == xmlhttp.readyState && HttpStatusTypes.OK == xmlhttp.status) {
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
  if (ReadyStateTypes.DONE != xmlhttp.readyState) {
   return;
  }
  
  if (HttpStatusTypes.OK == xmlhttp.status) {
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
 
 var loc = "/ShowPrintRecipePage?recipeToPrint=" + params + "&scaling="
 
 let sElem = document.getElementById("scaling");
 
 let scaling = 1;
 
 if (null != sElem) {
  if (0 == sElem.selectedIndex) {
    scaling = 0.5;
   } else {
    scaling = sElem.selectedIndex;
   }
 } 
 
 loc += (scaling.toString());
    
 window.open(loc); 
}

function RequestRenameRecipe(oldRecipeName, newRecipeName) {
 var xmlhttp = new XMLHttpRequest();
    
 xmlhttp.onreadystatechange = function() {
  if (ReadyStateTypes.DONE != xmlhttp.readyState) {
   return;
  }
 
  if (HttpStatusTypes.OK == xmlhttp.status || HttpStatusTypes.NOTMODIFIED == xmlhttp.status) {
   var data = xmlhttp.responseText;
   
   document.getElementById("recipeTitle").innerHTML = decodeURI(newRecipeName);
   
   document.getElementById("recipesListContainer").innerHTML = data;
  }
  else {
   // TODO: Handle failure, if needed.
  }
 }
    
 xmlhttp.open("GET", "/RenameRecipe?oldRecipeName=" + oldRecipeName + "&newRecipeName=" + newRecipeName, true);
 
 xmlhttp.send();
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
 
  errs += "Quantity must be a number 0 - 999.\n";
 
  document.getElementById("quantity2Edit").style.backgroundColor = errBg;
 } else {
  if (false == IsNumeric(quantity)) {
   valid = false;
  
   errs += "Quantity must be a number 0 - 999.\n";
  
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
                                       + '<input name="ingredient"     type="hidden" value="' + ingredient + '">'
                                       + '<input name="ingredientType" type="hidden" value="INGREDIENT">'; 
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

function SaveIngredientHeading() {
 var errs        = "";
 var headingTxt  = document.getElementById("heading2Edit").value;
 var valid       = true;
 
  if (true == IsEmpty(headingTxt)) {
   valid = false;
  
   errs += "A heading must be provided.\n";
  
   document.getElementById("heading2Edit").style.backgroundColor = errBg;
  } else {
   document.getElementById("heading2Edit").style.backgroundColor = validBg;
  } 
 
 if (false == valid) {
  errs = "The following problems were detected and must be corrected:\n\n" + errs;
  
  alert(errs);
  
  return;
 } 
 
 var rowNdx = document.getElementById("headingRowId").value;
 var tbody  = document.getElementById("ingredientsTable").getElementsByTagName('tbody')[0];

 tbody.rows[rowNdx].cells[0].innerHTML = headingTxt
                                       + '<input name="ingredient"     type="hidden" value="' + headingTxt + '">'
                                       + '<input name="ingredientType" type="hidden" value="HEADING">'
                                       + '<input name="quantity"       type="hidden" value="0">'
                                       + '<input name="measure"        type="hidden" value="BAG">'
                                       + '<input name="prep"           type="hidden" value="NONE">'
                                       + '<input name="notes"          type="hidden" value=" ">'; 
 HideEditIngredientHeadingPopup();
} 

function SavePDF(recipeName, scaling) {
 var xmlhttp = new XMLHttpRequest();
 
 xmlhttp.responseType = "blob";
    
 xmlhttp.onreadystatechange = function() {
  if (ReadyStateTypes.DONE == xmlhttp.readyState) {
   if (HttpStatusTypes.OK == xmlhttp.status) {
    let blob = new Blob([xmlhttp.response], {type: 'application/octet-stream'});
    let uri = URL.createObjectURL(blob);
    let link = document.createElement("a");
    
    link.download = recipeName + ".pdf";
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
   } else {
    alert("Unable to download PDF");
   }
  }
 }

 xmlhttp.open("GET", "/SavePDF?recipeName=" + encodeURIComponent(recipeName) + "&scaling=" + scaling.toString(), true);
 
 xmlhttp.send();  
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
    
    if (ReadyStateTypes.DONE != xmlhttpReq.readyState) {
     return;
    }

    if (HttpStatusTypes.OK === xmlhttpReq.status) {
     var data = xmlhttpReq.responseText;
     
     if ("" == data) { 
      document.getElementById("recipesListContainer").innerHTML = "There are no recipes in the system.<br><br>Why don't you add some?";
      
      HideElement("DeleteAllRecipesBtn");
     } else {   
      document.getElementById("recipesListContainer").innerHTML = data;
      
      ApplyFilter();
      
      UnHideElement("DeleteAllRecipesBtn", "inline");
     } 
    } else {
     document.getElementById("recipesListContainer").innerHTML =  "Recipe not saved";
    }
    
    document.getElementById("displayCnt").innerText = doc.getElementById("filesListCnt").value;
    document.getElementById("totalCnt").innerText   = doc.getElementById("totalFilesCnt").value;
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
     
    if (ReadyStateTypes.DONE != xmlhttpReq.readyState) {
     return;
    }

    if (HttpStatusTypes.OK === xmlhttpReq.status) {
     var data = xmlhttpReq.responseText;
     
     if ("" == data) { 
      document.getElementById("recipesListContainer").innerHTML = "There are no recipes in the system.<br><br>Why don't you add some?";
      
      HideElement("DeleteAllRecipesBtn");
     } else {   
      document.getElementById("recipesListContainer").innerHTML = data;
      
      ApplyFilter();
      
      UnHideElement("DeleteAllRecipesBtn", "inline");
     } 
    } else {
     document.getElementById("recipesListContainer").innerHTML = "Recipe not saved";
    }
    
    document.getElementById("displayCnt").innerText = doc.getElementById("filesListCnt").value;
    document.getElementById("totalCnt").innerText   = doc.getElementById("totalFilesCnt").value;
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

 tbody.rows[rowNdx].cells[0].innerHTML = step
                                       + '<input name="step"     type="hidden" value="' + step + '">'
                                       + '<input name="stepType" type="hidden" value="STEP">';
 
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

function SaveStepHeading() {
 var errs       = "";
 var headingTxt = document.getElementById("stepHeading2Edit").value;
 var valid      = true;
 
 if (true == IsEmpty(headingTxt)) {
  valid = false;
  
  errs += "Heading text must be provided.\n";
  
  document.getElementById("stepHeading2Edit").style.backgroundColor = errBg;
 } else {
  document.getElementById("stepHeading2Edit").style.backgroundColor = validBg;
 } 
  
 if (false == valid) {
  errs = "The following problems were detected and must be corrected:\n\n" + errs;
  
  alert(errs);
  
  return;
 }  
 
 var rowNdx = document.getElementById("stepHeadingRowId").value;
 var tbody  = document.getElementById("stepsTable").getElementsByTagName('tbody')[0];

 tbody.rows[rowNdx].cells[0].innerHTML = headingTxt
                                       + '<input name="step"      type="hidden" value="' + headingTxt + '">'
                                       + '<input name="stepType"  type="hidden" value="HEADING">'
                                       + '<input name="stepImage" type="hidden" value="noimg.jpg">';
 HideEditStepHeadingPopup();
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

function ScaleRecipe() {
 let scaleFactor = GetEnumFromScalingValue(document.getElementById("scaling").selectedIndex);
 
 let multiplier = 1;
 
 switch (scaleFactor) {
  case ScalingTypes.HALVE: {
   multiplier = 0.5;
  }
  break;  
  
  case ScalingTypes.NONE: {
   multiplier = 1;
  }
  break;   
  
  case ScalingTypes.DOUBLE: {
   multiplier = 2;
  }
  break;  
  
  case ScalingTypes.TRIPLE:  {
   multiplier = 3;
  }
  break;
  
  case ScalingTypes.QUADRUPLE: {
   multiplier = 4;
  }
  break;
 }
 
 let origYieldVal = document.getElementById("originalYield").value;
 
 let yieldFld = document.getElementById("yieldFld").innerText;
 
 const parts = yieldFld.split(" ");
 
 let yieldQuan = origYieldVal * multiplier;
 
 document.getElementById("yieldFld").innerText = yieldQuan.toString() + " " + parts[1];
 
 let iTable = document.getElementById("ingredientsTable");
 
 for (var rowNdx = 1; rowNdx < iTable.rows.length; ++rowNdx) {
  let oldVal = document.getElementById("i." + (rowNdx - 1).toString()).value;
  
  iTable.rows[rowNdx].cells[1].innerHTML = (oldVal * multiplier).toString(); 
 }
}

function ShowAddRecipePopup() {
 document.getElementById("recipeName2Add").value = "";
 
 ToggleVisibility("addRecipePopup");
 
 document.getElementById('recipeName2Add').focus();
}

function ShowExportRecipesPopup(parentElement) {
 HideElement("ExportRecipesResponseContainer");
 UnHideElement("ExportContainer"); 
 UnHideElement("ExportButtonsContainer");
 
 var xmlhttpReq = new XMLHttpRequest();
 
 xmlhttpReq.open("GET", "/GetRecipesToExportList"); 

 xmlhttpReq.onload = function() {  
  if (ReadyStateTypes.DONE != xmlhttpReq.readyState) {
   return;
  }
  
  if (HttpStatusTypes.OK === xmlhttpReq.status) {
   document.getElementById("overlayContainer").className = "overlay";
 
   if ("" != parentElement) {  
    HideElement(parentElement);
    
    document.getElementById("ppuInvoker").value = parentElement;
   }
   
   ToggleVisibility("exportRecipesPopup");
   
   var html = xmlhttpReq.responseText;
   
   if ("" == html) {
    document.getElementById("exportFilesList").innerHTML = "There are no recipes in the system. Why do you add/import some?";
    
    HideElement("ExportButtonsContainer");
   } else {
    document.getElementById("exportFilesList").innerHTML = html;
    
    UnHideElement("ExportButtonsContainer");
   }
  }
 };

 xmlhttpReq.send();
}

function ShowFileUploadPopup(imageTgt, parentElement) {
 document.getElementById("imageUse").value             = imageTgt;
 document.getElementById("overlayContainer").className = "overlay";
 document.getElementById("image2Upload").value         = "";
 
 if ("" != parentElement) {  
  HideElement(parentElement);
  
  document.getElementById("puInvoker").value = parentElement;
 }
 
 HideElement("uploadImgBtn");
 HideElement("response");
 
 ToggleVisibility("fileUploadPopup");
 
 UnhideElement("FileUploadForm");
}

function ShowImportRecipesPopup(parentElement) {
 document.getElementById("overlayContainer").className = "overlay";
 
 HideElement("recipesUploadResponse");
 UnHideElement("recipesImportForm");
 
 if ("" != parentElement) {  
  HideElement(parentElement);
  
  document.getElementById("ppuInvoker").value = parentElement;
 }
 
 ToggleVisibility("importRecipesPopup");
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
  
  if (ReadyStateTypes.DONE != xmlhttpReq.readyState) {
   return;
  }
  
  if (HttpStatusTypes.OK === xmlhttpReq.status) {
   var data = xmlhttpReq.responseText;
   
   const parser = new DOMParser();
   const doc = parser.parseFromString(data, 'text/html');
   
   var filesListCnt = doc.getElementById("filesListCnt").value;
   
   document.getElementById("displayCnt").innerText = filesListCnt;
   
   if (0 == filesListCnt) { 
    document.getElementById("recipesListContainer").innerHTML = "There are no recipes in the system for the selected filters.<br><br>Why don't you add some?";
    
    HideElement("DeleteAllRecipesBtn");
   } else {   
    document.getElementById("recipesListContainer").innerHTML = data;
    
    UnHideElement("DeleteAllRecipesBtn", "inline");
   }
   
   document.getElementById("displayCnt").innerText = doc.getElementById("filesListCnt").value;
   document.getElementById("totalCnt").innerText   = doc.getElementById("totalFilesCnt").value; 
  } else {
   document.getElementById("recipesListContainer").innerHTML = "No recipes can be displayed.";
  }
 };

 xmlhttpReq.send();
}

function ShowSettingsPopup() {
 document.getElementById("overlayContainer").className = "overlay";
 
 ToggleVisibility("SettingsPopup");
}

function SubmitFileForUpload(imageUse) { 
 // Create a FormData object and add to it the fields that we'll need in the
 // request we'll send to the server to upload the file:
 
 let formData = new FormData();
 let image    = document.getElementById('image2Upload').files[0];

 formData.append('recipeName', document.getElementById('recipeName').value);
 formData.append('image',      image);
 

 let response = document.getElementById('response');
 
 HideElement("response");
 
 
 // Build the request to send to the server:
 
 var xmlhttpReq = new XMLHttpRequest();

 xmlhttpReq.open('POST', '/UploadImage', true);


 // Provide the callback function to handle the response from the server:
 
 xmlhttpReq.onload = function() {
  if (ReadyStateTypes.DONE != xmlhttpReq.readyState) {
   return;  // I shall serve no data before its time.
  }  
  
  if (HttpStatusTypes.OK === xmlhttpReq.status) {
   var data = xmlhttpReq.responseText;
   
   response.innerHTML = data;
   
   HideElement("uploadImgBtn");
   
   UnHideElement("response");
    
   document.getElementById("fileUploadForm").style.display = "none";
    
   setTimeout(function() {
               document.getElementById("image2Upload").value = "";
  
               ToggleVisibility("response");
               ToggleVisibility("fileUploadForm");
              }, 3000);
   
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
     document.getElementById("mainImage").src       = "images/Staging/" + recipeName + '_' + image.name;
     
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
  } else {
   //TODO: Handle server error somehow.
  }
   
  response.innerHTML = xmlhttpReq.responseText;
 };
 
 
 // Send the request to the server:
 
 response.innerHTML = "Uploading image...";
 
 UnHideElement("response");

 xmlhttpReq.send(formData);
}

function SubmitRecipesForUpload() {
 // Create a FormData object and add the fields to it that we'll need in the
 // request we'll send to the server to upload the recipes import (.zip) file:
 
 var formData           = new FormData();
 var recipesFile2Upload = document.getElementById('recipesFile2Upload').files[0];
 
 if ('undefined' === typeof recipesFile2Upload) {
  alert("A recipe import file must be provided.");
  
  return;
 }
 
 formData.append('recipesFile', recipesFile2Upload);
 
 
 // Build the request to send to the server:
 
 var xmlhttpReq = new XMLHttpRequest();

 xmlhttpReq.open('POST', '/UploadRecipes', true);
 

 // Provide the callback function to handle the response from the server:
 
 xmlhttpReq.onload = function() {
  if (ReadyStateTypes.DONE != xmlhttpReq.readyState) {
   return;  // I shall serve no data before its time.
  }
  
  if (HttpStatusTypes.OK === xmlhttpReq.status) {
   var response = document.getElementById('recipesUploadResponse');
   
   document.getElementById('recipesUploadResponse').innerHTML = "Recipes Imported";
   
   UnHideElement("recipesUploadResponse");
   
   setTimeout(function() {
               document.getElementById("recipesFile2Upload").value = "";

               HideElement("recipesUploadResponse");
               UnHideElement("recipesImportForm");
              }, 3000);

    var data = xmlhttpReq.responseText;
    
    const parser = new DOMParser();
    const doc    = parser.parseFromString(data, 'text/html');
    
    var errs = doc.getElementById("messageFromServer").value;
    
    if ("" != errs) {
       alert(errs);
    }
    
    var filesListCnt = doc.getElementById("filesListCnt").value;
    var totFilesCnt  = doc.getElementById("totalFilesCnt").value;
    
    document.getElementById("displayCnt").innerText = filesListCnt;
    document.getElementById("totalCnt").innerText   = totFilesCnt;
    
    if ("" == data) { 
     document.getElementById("recipesListContainer").innerHTML = "There are no recipes in the system.<br><br>Why don't you add some?";
     
     HideElement("DeleteAllRecipesBtn");
    } else {   
     document.getElementById("recipesListContainer").innerHTML = data;
     
     UnHideElement("DeleteAllRecipesBtn", "inline");
    }
  } 
 };
 
 
 // Send the request to the server:
 
 document.getElementById('recipesUploadResponse').innerHTML = "Importing...";
 
 UnHideElement("recipesUploadResponse");
 HideElement("recipesImportForm");

 xmlhttpReq.send(formData);
}

function ViewRecipe(recipeName) {
 var xmlhttp = new XMLHttpRequest();
    
 xmlhttp.onreadystatechange = function() {
  if (ReadyStateTypes.DONE == xmlhttp.readyState && HttpStatusTypes.OK == xmlhttp.status) {
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
