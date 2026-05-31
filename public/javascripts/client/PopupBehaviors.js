/**
 The PopupBehavior class is the base class for all other popup behaviors.
 
 It is a container for the Popup Type ID and an optional Parent Element ID,
 The Parent Element ID is used to keep track if a Popup was spawned from
 another popup so that parent element can be deactivated/activated when the
 current popup is opened and closed.
 
 It defines the HidePopup() and RevealPopup() functions.
*/
class PopupBehavior {
 constructor(popupTypeId, parentElement) {
  this.parentElement = parentElement;  
  this.popupId       = popupTypeId;
 }

 HidePopup() {
  document.getElementById("overlayContainer").className = "no-overlay";
 }
  
 RevealPopup() {
  document.getElementById("overlayContainer").className = "overlay";
 }
}

/**
 The PopupBehaviors class is a factory for all the other PopupBehavior derived
 classes.
 
 The static HidePopup() and RevealPopup() functions select a particular 
 PopupBehavior instance via the passed PopupTypeId parameter.
*/
class PopupBehaviors {
 static HidePopup(popupId) {
  const behaviors = new PopupBehaviors();
  const behavior  = behaviors.GetBehavior(popupId);
  
  behavior.HidePopup();
 }


 static RevealPopup(popupId, parentElement) {
  const behaviors = new PopupBehaviors();
  const behavior  = behaviors.GetBehavior(popupId, parentElement);
  
  behavior.RevealPopup();
 }
 
 GetBehavior(popupTypeId, parentElement) {
  switch (popupTypeId) {
   case PopupTypes.AddIngredient: {
    return new AddIngredientPopupBehavior(popupTypeId);
   }
   
   case PopupTypes.AddIngredientHeading: {
    return new AddIngredientHeadingPopupBehavior(popupTypeId);
   }   
   
   case PopupTypes.AddPrerequisite: {
    return new AddPrerequisitePopupBehavior(popupTypeId);
   }   
   
   case PopupTypes.AddRecipe: {
    return new AddRecipePopupBehavior(popupTypeId);
   }
   
   case PopupTypes.AddStep: {
    return new AddStepPopupBehavior(popupTypeId);
   }

   case PopupTypes.AddStepHeadingRecipe: {
    return new AddStepHeadingPopupBehavior(popupTypeId);
   }   
   
   case PopupTypes.AddVariation: {
    return new AddVariationPopupBehavior(popupTypeId);
   }   
   
   case PopupTypes.EditIngredient: {
    return new EditIngredientPopupBehavior(popupTypeId);
   }
   
   case PopupTypes.EditIngredientHeading: {
    return new EditIngredientHeadingPopupBehavior(popupTypeId);
   }   
   
   case PopupTypes.EditPrerequisite: {
    return new EditPrerequisitePopupBehavior(popupTypeId);
   }   
   
   case PopupTypes.EditRecipe: {
    return new EditRecipePopupBehavior(popupTypeId);
   }
   
   case PopupTypes.EditStep: {
    return new EditStepPopupBehavior(popupTypeId);
   }

   case PopupTypes.EditStepHeadingRecipe: {
    return new EditStepHeadingPopupBehavior(popupTypeId);
   }   
   
   case PopupTypes.EditVariation: {
    return new EditVariationPopupBehavior(popupTypeId);
   }   
    
   case PopupTypes.Error: {
    return new ErrorPopupBehavior(popupTypeId);
   }
   
   case PopupTypes.ExportRecipes: {
    return new ExportRecipesPopupBehavior(popupTypeId, parentElement);
   }
    
   case PopupTypes.Help: {
    return new HelpPopupBehavior(popupTypeId, parentElement);
   }    
   
   case PopupTypes.ImportRecipes: {
    return new ImportRecipesPopupBehavior(popupTypeId, parentElement);
   }
    
   case PopupTypes.PrepList: {
    return new PrepListPopupBehavior(popupTypeId);
   }
    
   case PopupTypes.RecipeExistsWarning: {
    return new RecipeExistsWarningPopupBehavior(popupTypeId);
   }
   
   case PopupTypes.Settings: {
    return new SettingsPopupBehavior(popupTypeId);
   }

   case PopupTypes.ShoppingList: {
    return new ShoppingListPopupBehavior(popupTypeId);
   }    
    
   default: {
   
   }
  }
 }
}
 

class AddIngredientPopupBehavior extends PopupBehavior {
 constructor(popupTypeId, parentElement) {
  super(popupTypeId, parentElement);
 }

 HidePopup() {
  super.HidePopup();

  ToggleVisibility(this.popupId);
 }
  
 RevealPopup() {
  super.RevealPopup();  
  
  document.getElementById("recipeName2Add").value = "";
 
  document.getElementById("heading2Add").value    = ""; 
  document.getElementById("ingredient2Add").value = "";
  document.getElementById("notes2Add").value      = "";
  document.getElementById("quantity2Add").value   = "1";
 
  ToggleVisibility(this.popupId);
 
  document.getElementById('ingredient2Add').focus();  
 }
}
  

class AddIngredientHeadingPopupBehavior extends PopupBehavior {
 constructor(popupTypeId, parentElement) {
  super(popupTypeId, parentElement);
 }

 HidePopup() {
  super.HidePopup();

  ToggleVisibility(this.popupId);
 }
  
 RevealPopup() {
  super.RevealPopup();
 
  document.getElementById("heading2Add").value    = ""; 
  document.getElementById("ingredient2Add").value = "";
  document.getElementById("notes2Add").value      = "";
  document.getElementById("quantity2Add").value   = "";
  
  ToggleVisibility(this.popupId);
  
  document.getElementById('heading2Add').focus();  
 }
}
    

class AddPrerequisitePopupBehavior extends PopupBehavior {
 constructor(popupTypeId, parentElement) {
  super(popupTypeId, parentElement);
 }

 HidePopup() {
  super.HidePopup();

  ToggleVisibility(this.popupId);
 }
  
 RevealPopup() {
  super.RevealPopup();
 
  document.getElementById("prerequisite2Add").value = "";
  
  ToggleVisibility(this.popupId);
  
  document.getElementById('prerequisite2Add').focus();  
 }
}
  
  
class AddRecipePopupBehavior extends PopupBehavior {
 constructor(popupTypeId, parentElement) {
  super(popupTypeId, parentElement);
 }

 HidePopup() {
  super.HidePopup();

  ToggleVisibility(this.popupId);
 }
  
 RevealPopup() {
  document.getElementById("recipeName2Add").value = "";
  
  ToggleVisibility(this.popupId);
  
  document.getElementById('recipeName2Add').focus();
 }
}


class AddStepPopupBehavior extends PopupBehavior {
 constructor(popupTypeId, parentElement) {
  super(popupTypeId, parentElement);
 }

 HidePopup() {
  super.HidePopup();

  ToggleVisibility(this.popupId);
 }
  
 RevealPopup() {
  super.RevealPopup();
 
  document.getElementById("step2Add").value   = "";
  document.getElementById("stepAddImage").src = "";
 
  HideElement("stepAddImage");
 
  document.getElementById("image2Upload").value = "";
 
  ToggleVisibility(this.popupId);
 
  document.getElementById('step2Add').focus();  
 }
}  


class AddStepHeadingPopupBehavior extends PopupBehavior {
 constructor(popupTypeId, parentElement) {
  super(popupTypeId, parentElement);
 }

 HidePopup() {
  super.HidePopup();

  ToggleVisibility(this.popupId);
 }
  
 RevealPopup() {
  super.RevealPopup();
  
  document.getElementById("overlayContainer").className = "overlay";
 
  document.getElementById("stepHeading2Add").value = "";
 
  ToggleVisibility(this.popupId);
 
  document.getElementById('stepHeading2Add').focus();   
 }
}

  
class AddVariationPopupBehavior extends PopupBehavior {
 constructor(popupTypeId, parentElement) {
  super(popupTypeId, parentElement);
 }

 HidePopup() {
  super.HidePopup();

  ToggleVisibility(this.popupId);
 }
  
 RevealPopup() {
  super.RevealPopup();
 
  ToggleVisibility(this.popupId);
 
  document.getElementById("variation2Add").value = "";
  document.getElementById('variation2Add').focus();
 }
}  


class EditIngredientPopupBehavior extends PopupBehavior {
 constructor(popupTypeId, parentElement) {
  super(popupTypeId, parentElement);
 }

 HidePopup() {
  super.HidePopup();

  ToggleVisibility(this.popupId);
 }
  
 RevealPopup() {
  super.RevealPopup();  
 
  ToggleVisibility(this.popupId);
 }
}
  

class EditIngredientHeadingPopupBehavior extends PopupBehavior {
 constructor(popupTypeId, parentElement) {
  super(popupTypeId, parentElement);
 }

 HidePopup() {
  super.HidePopup();

  ToggleVisibility(this.popupId);
 }
  
 RevealPopup() {
  super.RevealPopup();
 
  ToggleVisibility(this.popupId);
 }
}
 

class EditPrerequisitePopupBehavior extends PopupBehavior {
 constructor(popupTypeId, parentElement) {
  super(popupTypeId, parentElement);
 }

 HidePopup() {
  super.HidePopup();

  ToggleVisibility(this.popupId);
 }
  
 RevealPopup() {
  super.RevealPopup();
 
  ToggleVisibility(this.popupId);
 }
}
  
  
class EditRecipePopupBehavior extends PopupBehavior {
 constructor(popupTypeId, parentElement) {
  super(popupTypeId, parentElement);
 }

 HidePopup() {
  super.HidePopup();

  ToggleVisibility(this.popupId);
 }
  
 RevealPopup() {
  document.getElementById("recipeName2Add").value = "";
  
  ToggleVisibility(this.popupId);
  

 }
}


class EditStepPopupBehavior extends PopupBehavior {
 constructor(popupTypeId, parentElement) {
  super(popupTypeId, parentElement);
 }

 HidePopup() {
  super.HidePopup();

  ToggleVisibility(this.popupId);
 }
  
 RevealPopup() {
  super.RevealPopup();
 
  ToggleVisibility(this.popupId);
 }
}  


class EditStepHeadingPopupBehavior extends PopupBehavior {
 constructor(popupTypeId, parentElement) {
  super(popupTypeId, parentElement);
 }

 HidePopup() {
  super.HidePopup();

  ToggleVisibility(this.popupId);
 }
  
 RevealPopup() {
  super.RevealPopup();
 
  ToggleVisibility(this.popupId);
 }
}

  
class EditVariationPopupBehavior extends PopupBehavior {
 constructor(popupTypeId, parentElement) {
  super(popupTypeId, parentElement);
 }

 HidePopup() {
  super.HidePopup();

  ToggleVisibility(this.popupId);
 }
  
 RevealPopup() {
  super.RevealPopup();
 
  ToggleVisibility(this.popupId);
 }
}  

  
class ErrorPopupBehavior extends PopupBehavior {
 constructor(popupTypeId, parentElement) {
  super(popupTypeId, parentElement);
 }

 HidePopup() {
 super.HidePopup();
  
 if (undefined != this.parentElement && "" != this.parentElement) {
  ToggleVisibility(this.parentElement);
 }
 
 ToggleVisibility(this.popupId);  
 }
  
 RevealPopup() {
  super.RevealPopup();
  
  document.getElementById("epCloseImg").onclick = function() { HidePopup(this.popupId); };
 
  ToggleVisibility(this.parentElement);  
  ToggleVisibility(this.popupId);  
 }
} 
  
 
class ExportRecipesPopupBehavior extends PopupBehavior {
 constructor(popupTypeId, parentElement) {
  super(popupTypeId, parentElement);
 }

 HidePopup() {
  super.HidePopup();
  
  ToggleVisibility(this.popupId);
 }
  
 RevealPopup() {
  HideElement("ExportRecipesResponseContainer");
  UnHideElement("ExportContainer"); 
  UnHideElement("ExportButtonsContainer");
 
  var xmlhttpReq = new XMLHttpRequest();
  
  xmlhttpReq.extraInfo = this;
 
  xmlhttpReq.open("GET", "/GetRecipesToExportList"); 

  xmlhttpReq.onload = function() {  
   if (ReadyStateTypes.DONE != xmlhttpReq.readyState) {
    return;
   }
  
   if (HttpStatusTypes.OK === xmlhttpReq.status) {
    document.getElementById("overlayContainer").className = "overlay";
 
    if (undefined != xmlhttpReq.extraInfo.parentElement && "" != xmlhttpReq.extraInfo.parentElement) {  
     HideElement(xmlhttpReq.extraInfo.parentElement);
    
     document.getElementById("ppuInvoker").value = xmlhttpReq.extraInfo.parentElement;
    }
   
    ToggleVisibility(PopupTypes.ExportRecipes);
   
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
}

  
class HelpPopupBehavior extends PopupBehavior {
 constructor(popupTypeId, parentElement) {
  super(popupTypeId, parentElement);
 }

 HidePopup() {
  ToggleVisibility(this.popupId);
 }
  
 RevealPopup() {
  var xmlhttpReq = new XMLHttpRequest();
  
  xmlhttpReq.extraInfo = this;
    
  xmlhttpReq.onreadystatechange = function() {
   if (ReadyStateTypes.DONE != xmlhttpReq.readyState) {
    return;
   }
  
   if (HttpStatusTypes.OK == xmlhttpReq.status) {
    document.getElementById("helpContainer").innerHTML = xmlhttpReq.responseText;
   
    ToggleVisibility(xmlhttpReq.extraInfo.popupId);
   } else {
    alert("Unable to access help: " + xmlhttpReq.responseText);
   }
  }
    
  xmlhttpReq.open("GET", "/GetHelpInfo", true);
 
  xmlhttpReq.send(); 
 }
}

 
class ImportRecipesPopupBehavior extends PopupBehavior {
 constructor(popupTypeId, parentElement) {
  super(popupTypeId, parentElement);
 }

 HidePopup() {
  super.HidePopup();
 
  UnHideElement(document.getElementById("ppuInvoker").value);
 
  ToggleVisibility(this.popupId);
 }
  
 RevealPopup() {
 super.RevealPopup();
 
 HideElement("recipesUploadResponse");
 UnHideElement("recipesImportForm");
 
 if (undefined != this.parentElement && "" != this.parentElement) {  
  HideElement(this.parentElement);
  
  document.getElementById("ppuInvoker").value = this.parentElement;
 }
 
 ToggleVisibility(this.popupId);
 }
}


class PrepListPopupBehavior extends PopupBehavior {
 constructor(popupTypeId) {
  super(popupTypeId);
 }

 HidePopup() {
  super.HidePopup();

  ToggleVisibility(this.popupId);
 }
  
 RevealPopup() {
  super.RevealPopup();
 
  ToggleVisibility(this.popupId);
 }
} 


class RecipeExistsWarningPopupBehavior extends PopupBehavior {
 constructor(popupTypeId) {
  super(popupTypeId);
 }

 HidePopup() {
  super.HidePopup();
     
  UnHideElement("AddRecipePopup");

  ToggleVisibility(this.popupId);
 }
  
 RevealPopup() {
super.RevealPopup();  document.getElementById("overlayContainer").className = "overlay";
 
  ToggleVisibility(this.popupId);
 } 
}


class SettingsPopupBehavior extends PopupBehavior {
 constructor(popupTypeId) {
  super(popupTypeId);
 }

 HidePopup() {
  super.HidePopup();

  ToggleVisibility(this.popupId);
 }
  
 RevealPopup() {
  super.RevealPopup();
 
  ToggleVisibility(this.popupId);
 }
}


class ShoppingListPopupBehavior extends PopupBehavior {
 constructor(popupTypeId) {
  super(popupTypeId);
 }

 HidePopup() {
  super.HidePopup();

  ToggleVisibility(this.popupId);
 }
  
 RevealPopup() {
  super.RevealPopup();
 
  ToggleVisibility(this.popupId);
 }
}