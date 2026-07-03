/**
 The ButtonBehavior class is the base class for all other Button behaviors.
 
 It is a container for the Button Type ID.
 
 It defines the HandleButtonClkd() function.
*/
class ButtonBehavior {
 constructor(buttonTypeId) { 
  this.buttonTypId = buttonTypeId;
 }

 HandleButtonClkd() {

 }
}

/**
 The ButtonBehaviors class is a factory for all the other ButtonBehavior derived
 classes.
 
 The static HandleButtonClkd function selects a particular ButtonBehavior instance via
 the passed buttonTypeId parameter.
*/
class ButtonBehaviors {
 static HandleButtonClkd(buttonTypeId) {
  const behaviors = new ButtonBehaviors();
  const behavior  = behaviors.GetBehavior(buttonTypeId);
  
  behavior.HandleButtonClkd();
 }
 
 GetBehavior(buttonTypeId, parentElement) {
  switch (buttonTypeId) {
   case ButtonTypes.AddIngredient: {
    return new AddIngredientButtonBehavior(buttonTypeId);
   }
   
   case ButtonTypes.AddIngredientHeading: {
    return new AddIngredientHeadingButtonBehavior(buttonTypeId);
   }
   
   case ButtonTypes.AddPrerequisite: {
    return new AddPrerequisiteButtonBehavior(buttonTypeId);
   }   
    
   case ButtonTypes.AddStep: {
    return new AddStepButtonBehavior(buttonTypeId);
   }

   case ButtonTypes.AddStepHeading: {
    return new AddStepHeadingButtonBehavior(buttonTypeId);
   }
   
   case ButtonTypes.AddVariation: {
    return new AddVariationButtonBehavior(buttonTypeId);
   }   
   
   case ButtonTypes.DeleteAllIngredients: {
    return new DeleteAllIngredientsButtonBehavior(buttonTypeId);
   }
   
   case ButtonTypes.DeleteAllSteps: {
    return new DeleteAllStepsButtonBehavior(buttonTypeId);
   }
   
   case ButtonTypes.DeleteAllPrerequisites: {
    return new DeleteAllPrerequisitesButtonBehavior(buttonTypeId);
   }   
    
   case ButtonTypes.DeleteAllSteps: {
    return new DeleteAllStepsButtonBehavior(buttonTypeId);
   }
   
   case ButtonTypes.DeleteAllVariations: {
    return new DeleteAllVariationsButtonBehavior(buttonTypeId);
   }
   
   case ButtonTypes.ExportAll: {
    return new ExportAllButtonBehavior(buttonTypeId);
   }   
   
   case ButtonTypes.ExportSelected: {
    return new ExportSelectedButtonBehavior(buttonTypeId);
   }  

   case ButtonTypes.RenameRecipe: {
    return new RenameRecipeButtonBehavior(buttonTypeId);
   }   

   case ButtonTypes.Search: {
    return new SearchButtonBehavior(buttonTypeId);
   }    
    
   default: {
   
   }
   break;
  }
 }
}


class AddIngredientButtonBehavior extends ButtonBehavior {
 constructor(buttonTypeId) {
  super(buttonTypeId);
 }

 HandleButtonClkd() {
  super.HandleButtonClkd();
 
  PopupBehaviors.RevealPopup(PopupTypes.AddIngredient); 
 }
}


class AddIngredientHeadingButtonBehavior extends ButtonBehavior {
 constructor(buttonTypeId) {
  super(buttonTypeId);
 }

 HandleButtonClkd() {
  super.HandleButtonClkd();
 
  PopupBehaviors.RevealPopup(PopupTypes.AddIngredientHeading); 
 }
}


class AddPrerequisiteButtonBehavior extends ButtonBehavior {
 constructor(buttonTypeId) {
  super(buttonTypeId);
 }

 HandleButtonClkd() {
  super.HandleButtonClkd();
 
  PopupBehaviors.RevealPopup(PopupTypes.AddPrerequisite); 
 }
}


class AddStepButtonBehavior extends ButtonBehavior {
 constructor(buttonTypeId) {
  super(buttonTypeId);
 }

 HandleButtonClkd() {
  super.HandleButtonClkd();
 
  PopupBehaviors.RevealPopup(PopupTypes.AddStep); 
 }
}


class AddStepHeadingButtonBehavior extends ButtonBehavior {
 constructor(buttonTypeId) {
  super(buttonTypeId);
 }

 HandleButtonClkd() {
  super.HandleButtonClkd();
 
  PopupBehaviors.RevealPopup(PopupTypes.AddStepHeading); 
 }
}


class AddVariationButtonBehavior extends ButtonBehavior {
 constructor(buttonTypeId) {
  super(buttonTypeId);
 }

 HandleButtonClkd() {
  super.HandleButtonClkd();
 
  PopupBehaviors.RevealPopup(PopupTypes.AddVariation); 
 }
}


class DeleteAllIngredientsButtonBehavior extends ButtonBehavior {
 constructor(buttonTypeId) {
  super(buttonTypeId);
 }

 HandleButtonClkd() {
  super.HandleButtonClkd();
 
  if (true == confirm("Are you sure you want to delete all of the ingredients in the recipe?")) {
   DeleteAllIngredients();
  }  
 }
}


class DeleteAllPrerequisitesButtonBehavior extends ButtonBehavior {
 constructor(buttonTypeId) {
  super(buttonTypeId);
 }

 HandleButtonClkd() {
  super.HandleButtonClkd();
  
  if (true == confirm("Are you sure you want to delete all of the prerequisites in the recipe?")) {
   DeleteAllPrerequisites();
  }
 }
}


class DeleteAllStepsButtonBehavior extends ButtonBehavior {
 constructor(buttonTypeId) {
  super(buttonTypeId);
 }

 HandleButtonClkd() {
  super.HandleButtonClkd();
  
  if (true == confirm("Are you sure you want to delete all of the steps in the recipe?")) {
   DeleteAllSteps();
  }
 }
}


class DelAllVariationsButtonBehavior extends ButtonBehavior {
 constructor(buttonTypeId) {
  super(buttonTypeId);
 }

 HandleButtonClkd() {
  super.HandleButtonClkd();
 
  if (true == confirm("Are you sure you want to delete all of the variations in the recipe?")) {
   DeleteAllVariations();
  } 
 }
}


class ExportAllButtonBehavior extends ButtonBehavior {
 constructor(buttonTypeId) {
  super(buttonTypeId);
 }

 HandleButtonClkd() {
  super.HandleButtonClkd();
 
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
   UnHideElement("filtersContainer", "inline-flex");
   
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
}


class ExportSelectedButtonBehavior extends ButtonBehavior {
 constructor(buttonTypeId) {
  super(buttonTypeId);
 }

 HandleButtonClkd() {
  super.HandleButtonClkd();
 
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
}


class RenameRecipeButtonBehavior extends ButtonBehavior {
 constructor(buttonTypeId) {
  super(buttonTypeId);
 }

 HandleButtonClkd() {
  super.HandleButtonClkd();
 
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
}


class SearchButtonBehavior extends ButtonBehavior {
 constructor(buttonTypeId) {
  super(buttonTypeId);
 }

 HandleButtonClkd() {
  super.HandleButtonClkd();
 
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
    UnHideElement("filtersContainer", "inline-flex");
   
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
   
   InitPage();
  };

  xmlhttpReq.send();
 }
}
