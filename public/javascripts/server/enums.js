export
const CategoryTypes = Object.freeze({
 ALL:            "All",
 APPETIZER:      "Appetizer",
 BAKEDGOOD:      "Baked Good",
 BEVERAGE:       "Beverage",
 BREAKFAST:      "Breakfast",
 CASSEROLE:      "Casserole",
 DESSERT:        "Dessert",
 ELEMENT:        "Element",
 ENTREE:         "Entree",
 ENTREE_BEEF:    "Entree (beef)",
 ENTREE_FISH:    "Entree (fish)",
 ENTREE_PORK:    "Entree (pork)",
 ENTREE_POULTRY: "Entree (poultry)",
 ENTREE_SEAFOOD: "Entree (seafood)",  
 PASTA:          "Pasta",
 SALAD:          "Salad",
 SANDWICH:       "Sandwich", 
 SAUCE:          "Sauce",
 SIDE:           "Side Dish",
 SNACK:          "Snack",
 SOUP:           "Soup",
 STEW:           "Stew",
 TECHNIQUE:      "Technique"
});

export
function GetDescFromCategoryType(enumVal) {
 for (var key in CategoryTypes) {
  if (key == enumVal) {
   return CategoryTypes[key];
  } 
 }
 
  return "Undefined";
}

export
function GetEnumFromCategoryDesc(desc) {
 for (var key in CategoryTypes) {
  if (desc == CategoryTypes[key]) {
   return key;
  } 
 }
 
  return "UNDEFINED";
}


export
const CuisineTypes = Object.freeze({
 ALL:           "All",
 AFRICAN:       "African",
 AMERICAN:      "American",
 ASIAN:         "Asian",
 CAJUN:         "Cajun",
 CARIBBEAN:     "Caribbean",
 EASTEUROPE:    "Easern European", 
 FRENCH:        "French",
 GERMAN:        "German",
 ITALIAN:       "Italian",
 INDIAN:        "Indian", 
 MEDITERRANEAN: "Mediterranean",
 MEXICAN:       "Mexican",
 POLYNESIAN:    "Polynesian",
 SOUTHAMERICAN: "South American",
 SPANISH:       "Spanish"
});

export
function GetDescFromCuisineType(enumVal) {
 for (var key in CuisineTypes) {
  if (key == enumVal) {
   return CuisineTypes[key];
  } 
 }
 
  return "Undefined";
}

export
function GetEnumFromCuisineDesc(desc) {
 for (var key in CuisineTypes) {
  if (desc == CuisineTypes[key]) {
   return key;
  } 
 }
 
  return "UNDEFINED";
}


export
const HttpStatusTypes = Object.freeze({
	CONTINUE:           100,
	SWITCHINGPROTOCOLS: 101,
	PROCESSING:         102,

	OK:                          200,
	CREATED:                     201,
	ACCEPTED:                    202,
	NONAUTHORITATIVEINFORMATION: 203,
	NOCONTENT:                   204,
	RESETCONTENT:                205,
	PARTIALCONTENT:              206,
	MULTISTATUS:                 207,
	ALREADYREPORTED:             208,
	IMUSED:                      226,

	MULTIPLECHOICES:   300,
	MOVEDPERMANENTLY:  301,
	FOUND:             302,
	SEEOTHER:          303,
	NOTMODIFIED:       304,
	USEPROXY:          305,
	TEMPORARYREDIRECT: 307,
	PERMANENTREDIRECT: 308,

	BADREQUEST:                      400,
	UNAUTHORIZED:                    401,
	PAYMENTREQUIRED:                 402,
	FORBIDDEN:                       403,
	NOTFOUND:                        404,
	METHODNOTALLOWED:                405,
	NOTACCEPTABLE:                   406,
	PROXYAUTHENTICATIONREQUIRED:     407,
	REQUESTTIMEOUT:                  408,
	CONFLICT:                        409,
	GONE:                            410,
	LENGTHREQUIRED:                  411,
	PRECONDITIONFAILED:              412,
	PAYLOADTOOLARGE:                 413,
	REQUESTURITOOLONG:               414,
	UNSUPPORTEDMEDIATYPE:            415,
	REQUESTEDRANGENOTSATISFIABLE:    416,
	EXPECTATIONFAILED:               417,
	IMATEAPOT:                       418,
	MISDIRECTEDREQUEST:              421,
	UNPROCESSABLEENTITY:             422,
	LOCKED:                          423,
	FAILEDDEPENDENCY:                424,
	UPGRADEREQUIRED:                 426,
	PRECONDITIONREQUIRED:            428,
	TOOMANYREQUESTS:                 429,
	REQUESTHEADERFIELDSTOOLARGE:     431,
	CONNECTIONCLOSEDWITHOUTRESPONSE: 444,
	UNAVAILABLEFORLEGALREASONS:      451,
	CLIENTCLOSEDREQUEST:             499,

	INTERNALSERVERERROR:           500,
	NOTIMPLEMENTED:                501,
	BADGATEWAY:                    502,
	SERVICEUNAVAILABLE:            503,
	GATEWAYTIMEOUT:                504,
	HTTPVERSIONNOTSUPPORTED:       505,
	VARIANTALSONEGOTIATES:         506,
	INSUFFICIENTSTORAGE:           507,
	LOOPDETECTED:                  508,
	NOTEXTENDED:                   510,
	NETWORKAUTHENTICATIONREQUIRED: 511,
	NETWORKCONNECTTIMEOUTERROR:    599
});


export
const PopupTypes = Object.freeze({
 AddIngredient:            "AddIngredientPopup",
 AddIngredientHeading:     "AddIngredientHeadingPopup",
 AddPrerequisite:          "AddPrerequisitePopup",
 AddRecipe:                "AddRecipePopup",
 AddStep:                  "AddStepPopup",
 AddStepHeading:           "AddStepHeadingPopup", 
 AddVariation:             "AddVariationPopup",
 EditIngredient:           "AddIngredientPopup",
 EditIngredientHeading:    "AddIngredientHeadingPopup",
 EditPrerequisite:         "AddPrerequisitePopup",
 EditStep:                 "EditStepPopup",
 EditStepHeading:          "EditStepHeadingPopup",
 EditVariation:            "AddVariationPopup", 
 Error:                    "ErrorPopup",
 ExportRecipes:            "ExportRecipesPopup",
 Help:                     "HelpPopup",
 ImportRecipes:            "ImportRecipesPopup",
 PrepList:                 "PrepListPopup",
 RecipeExistsWarning:      "RecipeExistsWarningPopup",
 Settings:                 "SettingsPopup",
 ShoppingList:             "ShoppingListPopup",
 Undefined:                "Undefined"
});

export
function GetDescFromPopupType(enumVal) {
 switch(enumVal) {
  case PopupTypes.AddIngredient: {
   return "Add Ingredient";
  }   
  
  case PopupTypes.AddIngredientHeading: {
   return "Add Heading";
  }   
  
  case PopupTypes.AddPrerequisite: {
   return "Add Prerequisite";
  }    
  
  case PopupTypes.AddRecipe: {
   return "Add New Recipe";
  }   
  
  case PopupTypes.AddStep: {
   return "Add Step";
  }        
  
  case PopupTypes.AddStepHeading: {
   return "Add Heading";
  }   
  
  case PopupTypes.AddVariation: {
   return "Add Variation";
  }  
  
  case PopupTypes.EditIngredient: {
   return "Edit Ingredient";
  }        
  
  case PopupTypes.EditIngredientHeading: {
   return "Edit Heading";
  }        
  
  case PopupTypes.EditPrerequisite: {
   return "Edit Prerequisite";
  }        
  
  case PopupTypes.EditStep: {
   return "Edit Step";
  }   
  
  case PopupTypes.EditStepHeading: {
   return "Edit Heading";
  }    
 
  case PopupTypes.EditVariation: {
   return "Edit Variation";
  }  
   
  case PopupTypes.Error: {
   return "Error";
  }        
  
  case PopupTypes.ExportRecipes: {
   return "Export Recipes";
  }
  
  case PopupTypes.Help: {
   return "Help";
  }
  
  case PopupTypes.ImportRecipes: {
   return "Import Recipes";
  }   
  
  case PopupTypes.PrepList: {
   return "Prep List";
  }
  
  case PopupTypes.RecipeExistsWarning: {
   return "Recipe Exists";
  }
  
  case PopupTypes.Settings: {
   return "Settings";
  }
  
  case PopupTypes.ShoppingList: {
   return "Shopping List";
  }
  
  case PopupTypes.Undefined: {
   return "Undefined";
  }
  
  default: {
   return "Undefined";
  }
 }
 
  return "Undefined";
}

export
function GetEnumFromPopupDesc(desc) {
 for (var key in PopupTypes) {
  if (desc == PopupTypes[key]) {
   return key;
  } 
 }
 
 return PopupTypes.Undefined;
}


export
const PreparationTypes = Object.freeze({
 NONE:         "",
 BATON:        "Batonned",
 BEATEN:       "Beaten", 
 BLANCH:       "Blanched",
 BROWNED:      "Browned",
 BRUNOISE:     "Brunoise",
 CHIFFONADE:   "Chiffonade",
 CHILLED:      "Chilled",
 CHIPPED:      "Chipped",
 CHOPCOARSE:   "Coarsely chopped",
 CHOPFINE:     "Finely chopped",
 CLEANED:      "Cleaned/rinsed", 
 CLEANPEEL:    "Cleaned & peeled",
 CLEANTRIM:    "Cleaned & trimmed", 
 CORED:        "Core removed", 
 CRACKED:      "Cracked",
 CRUMBLED:     "Crumbled", 
 CRUSHED:      "Crushed",
 CUBED:        "Cubed",
 DICELARGE:    "Diced large", 
 DICEMEDIUM:   "Diced medium",  
 DICESMALL:    "Diced small", 
 DRAINED:      "Drained",
 DRIED:        "Dried",
 FLATTENED:    "Flattened",
 FRENCHED:     "Frenched",
 GRATE:        "Grated",
 GROUND:       "Ground",
 JULIENNE:     "Julienned",
 MACERATED:    "Macerated",
 MARINATED:    "Marinated", 
 MASHED:       "Mashed",  
 MELTED:       "Melted", 
 MINCED:       "Minced",
 MIXED:        "Mixed",
 MUDDLED:      "Muddled",
 OBLIQUE:      "Oblique cut",
 PEELED:       "Peeled",
 PEELEDSEEDED: "Peeled & Seed(s) removed",  
 PEELVEIN:     "Peeled & de-veined",
 PITTED:       "Pitted",
 POACHED:      "Poached",
 POUNDED:      "Pounded",
 POWDERED:     "Powdered",
 QUARTERED:    "Quartered", 
 REHYDRATE:    "Re-hydrated",
 ROASTED:      "Roasted", 
 SCALD:        "Scalded",
 SEARED:       "Seared",  
 SEASONED:     "Seasoned with salt & pepper",  
 SEEDED:       "Seeds removed",
 SEEDEDPLUS:   "Seeds and membranes removed",
 SEPARATED:    "Separated",
 SIFT:         "Sifted",
 SHAVED:       "Shaved",
 SHELLED:      "Shelled",
 SHREAD:       "Shredded",
 SHUCKED:      "Shucked",
 SKINNED:      "Skinned",
 SLICED:       "Sliced",
 SOAKED:       "Soaked",
 SOFTENED:     "Softened",
 SQUEEZED:     "Squeezed",  
 SMASHED:      "Smashed",
 STRAIN:       "Strained",
 TOASTED:      "Toasted",
 TOURNEED:     "Tournéed",
 WHIPPED:      "Whipped",
 WHISKED:      "Whisked"
});

export
function GetDescFromPrepType(enumVal) {
 for (var key in PreparationTypes) {
  if (key == enumVal) {
   return PreparationTypes[key];
  } 
 }
 
  return "Undefined";
}

export
function GetEnumFromPrepDesc(desc) {
 for (var key in PreparationTypes) {
  if (desc == PreparationTypes[key]) {
   return key;
  } 
 }
 
  return "UNDEFINED";
}

export
function GetDirectionFromPrepType(enumVal) {
  if (enumVal == "NONE") {
   return "";
  } 
  
  if (enumVal == "BATON") {
   return "Cut into batons";
  } 
        
  if (enumVal == "BEATEN") {
   return "Beat";
  } 
        
  if (enumVal == "BLANCH") {
   return "Blanch";
  } 
       
  if (enumVal == "BROWNED") {
   return "Brown";
  } 
      
  if (enumVal == "BRUNOISE") {
   return "Cut into brunoise";
  } 
     
  if (enumVal == "CHIFFONADE") {
   return "Chiffonade";
  } 
   
  if (enumVal == "CHILLED") {
   return "Chill";
  } 
      
  if (enumVal == "CHIPPED") {
   return "Chip";
  } 
      
  if (enumVal == "CHOPCOARSE") {
   return "Coarsely chop";
  } 
    
  if (enumVal == "CHOPFINE") {
   return "Finely chop";
  } 
      
  if (enumVal == "CLEANED") {
   return "Clean";
  } 
       
  if (enumVal == "CLEANPEEL") {
   return "Clean and peel";
  } 
     
  if (enumVal == "CLEANTRIM") {
   return "Clean and trim";
  } 
     
  if (enumVal == "CORED") {
   return "Remove cores from";
  } 
        
  if (enumVal == "CRACKED") {
   return "Crack";
  } 
       
  if (enumVal == "CRUMBLED") {
   return "Crumble";
  } 
     
  if (enumVal == "CRUSHED") {
   return "Crush";
  } 
      
  if (enumVal == "CUBED") {
   return "Cube";
  } 
        
  if (enumVal == "DICELARGE") {
   return "Cut into large dice";
  } 
     
  if (enumVal == "DICEMEDIUM") {
   return "Cut into medium dice";
  } 
    
  if (enumVal == "DICESMALL") {
   return "Cut into smal dice";
  } 
    
  if (enumVal == "DRAINED") {
   return "Drain";
  } 
        
  if (enumVal == "DRIED") {
   return "Dry";
  } 
          
  if (enumVal == "FLATTENED") {
   return "Pound/Roll flat";
  } 
       
  if (enumVal == "FRENCHED") {
   return "Cut into frence style";
  } 
        
  if (enumVal == "GRATE") {
   return "Grate";
  } 
           
  if (enumVal == "GROUND") {
   return "Grind";
  } 
          
  if (enumVal == "JULIENNE") {
   return "Julienne";
  } 
        
  if (enumVal == "MACERATED") {
   return "Macerate";
  } 
      
  if (enumVal == "MARINATED") {
   return "Marinate";
  } 
      
  if (enumVal == "MASHED") {
   return "Mash";
  } 
         
  if (enumVal == "MELTED") {
   return "Melt";
  } 
         
  if (enumVal == "MINCED") {
   return "Mince";
  } 
          
  if (enumVal == "MIXED") {
   return "Combine";
  } 
          
  if (enumVal == "MUDDLED") {
   return "Muddle";
  } 
         
  if (enumVal == "OBLIQUE") {
   return "Cut into oblique pieces";
  } 
        
  if (enumVal == "PEELED") {
   return "Remove peels from";
  } 
         
  if (enumVal == "PEELEDSEEDED") {
   return "Remove peel and seeds from";
  } 
    
  if (enumVal == "PEELVEIN") {
   return "Peel and devein";
  } 
        
  if (enumVal == "PITTED") {
   return "Remove pits from";
  } 
         
  if (enumVal == "POACHED") {
   return "Poach";
  } 
        
  if (enumVal == "POUNDED") {
   return "Pound flat";
  } 
         
  if (enumVal == "POWDERED") {
   return "Turn into powder";
  } 
       
  if (enumVal == "QUARTERED") {
   return "Quarter";
  } 
       
  if (enumVal == "REHYDRATE") {
   return "Add water to";
  } 
      
  if (enumVal == "ROASTED") {
   return "Roast";
  } 
        
  if (enumVal == "SCALD") {
   return "Scald";
  } 
          
  if (enumVal == "SEARED") {
   return "Sear";
  } 
         
  if (enumVal == "SEASONED") {
   return "Season";
  } 
       
  if (enumVal == "SEEDED") {
   return "Remove seeds from";
  } 
         
  if (enumVal == "SEEDEDPLUS") {
   return "Remove seeds and membranes from";
  } 
      
  if (enumVal == "SEPARATED") {
   return "Separate";
  } 
       
  if (enumVal == "SIFT") {
   return "Sift";
  } 
           
  if (enumVal == "SHAVED") {
   return "Shave";
  } 
         
  if (enumVal == "SHELLED") {
   return "Remove shells from";
  } 
        
  if (enumVal == "SHREAD") {
   return "Shread";
  } 
         
  if (enumVal == "SHUCKED") {
   return "Shuck";
  } 
        
  if (enumVal == "SKINNED") {
   return "Remove shin from";
  } 
        
  if (enumVal == "SLICED") {
   return "Slice";
  } 
         
  if (enumVal == "SOAKED") {
   return "Soak";
  } 
         
  if (enumVal == "SOFTENED") {
   return "Soften";
  } 
       
  if (enumVal == "SQUEEZED") {
   return "Squeeze juice from";
  } 
       
  if (enumVal == "SMASHED") {
   return "Smash";
  } 
        
  if (enumVal == "STRAIN") {
   return "Strain";
  } 
         
  if (enumVal == "TOASTED") {
   return "Toast";
  } 
        
  if (enumVal == "TOURNEED") {
   return "Tournée";
  } 
      
  if (enumVal == "WHIPPED") {
   return "Whip";
  } 
      
  if (enumVal == "WHISKED") {
   return "Whisk";
  } 

 return "You decide what to do with";  
}
 
export
const ScalingTypes = Object.freeze({
 HALVE:     "/ 2",
 NONE:      "X 1",
 DOUBLE:    "X 2",
 TRIPLE:    "X 3",
 QUADRUPLE: "X 4"
});

export
function GetDescFromScalingType(enumVal) {
 for (var key in ScalingTypes) {
  if (key == enumVal) {
   return ScalingTypes[key];
  } 
 }
 
  return "Undefined";
}

export
function GetEnumFromScalingDesc(desc) {
 for (var key in ScalingTypes) {
  if (desc == ScalingTypes[key]) {
   return key;
  } 
 }
 
  return "UNDEFINED";
}


export
const ServingSizeTypes = Object.freeze({   
 CUP:      "Cups",   
 ITEM:     "Item",
 OZ:       "Ozs",
 SLICE:    "Slice",
 TBSP:     "Tbsps",
 TSP:      "Tsp"   
});

export
function GetDescFromServingSizeType(enumVal) {
 for (var key in ServingSizeTypes) {
  if (key == enumVal) {
   return ServingSizeTypes[key];
  } 
 }
 
 return "Undefined";
}

export
function GetEnumFromServingSizeDesc(desc) {
 for (var key in ServingSizeTypes) {
  if (desc == ServingSizeTypes[key]) {
   return key;
  } 
 }
 
 return "UNDEFINED";
}


export
const SystemOfUnitsTypes = Object.freeze({
 US:     "US",
 METRIC: "Metric"
});

export
function GetDescFromSystemOfUnitsType(enumVal) {
 for (var key in SystemOfUnitsTypes) {
  if (key == enumVal) {
   return SystemOfUnitsTypes[key];
  } 
 }
 
  return "Undefined";
}

export
function GetEnumFromSystemOfUnitsDesc(desc) {
 for (var key in SystemOfUnitsTypes) {
  if (desc == SystemOfUnitsTypes[key]) {
   return key;
  } 
 }
 
  return "UNDEFINED";
}


export
const UnitTypes = Object.freeze({
 BAG:      "Bag",
 BATCH:    "Batch",
 BOTTLE:   "Bottle", 
 BOX:      "Box",
 BULB:     "Bulb", 
 BUNCH:    "Bunch",
 BUSHEL:   "Bushels",
 CAN:      "Can", 
 CLOVE:    "Cloves",    
 CUP:      "Cups",
 DASH:     "Dash",
 DROP:     "Drop",
 EACH:     "Each", 
 FLOZ:     "fl ozs",
 GALLON:   "Gallons",
 GRAM:     "Grams",
 HEAD:     "Head",  
 JIGGER:   "Jigger",
 LITER:    "Liters",
 LOAF:     "Loaf",
 ML:       "mls",    
 OZ:       "Ozs",
 PACKAGE:  "Pkgs",
 PECK:     "Peck",
 PIECE:    "Piece",
 PINCH:    "Pinch",
 PINT:     "Pints",
 POUND:    "Pounds",
 QUART:    "Quarts",
 SERVING:  "Servings",
 SHEET:    "Sheet",  
 SHOT:     "Shot",
 SLAB:     "Slab",
 SLICE:    "Slices",
 SPRIG:    "Sprigs",
 STALK:    "Stalk", 
 STICK:    "Stick", 
 TBSP:     "Tbsps",
 TSP:      "Tsp"   
});

export
function GetDescFromUnitType(enumVal) {
 for (var key in UnitTypes) {
  if (key == enumVal) {
   return UnitTypes[key];
  } 
 }
 
 return "Undefined";
}

export
function GetEnumFromUnitDesc(desc) {
 for (const key in UnitTypes) {
  if (desc == UnitTypes[key]) {
   return key;
  } 
 }
 
 return "UNDEFINED";
}