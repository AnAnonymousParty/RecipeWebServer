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
 SPANISH:       "Spainsh"
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
 PEELVEIN:     "Peeled & de-veined",
 PEELEDSEEDED: "Peeled & Seed(s) removed", 
 PITTED:       "Pitted",
 POACHED:      "Poached",
 POUNDED:      "Pounded",
 POWDERED:     "Powdered",
 QUARTERED:    "Quartered", 
 REHYDRATE:    "Re-hydrated",
 SCALD:        "Scalded",
 SEARED:       "Seared",  
 SEASONED:     "Seasoned with salt & pepper",  
 SEPARATED:    "Separated",
 SIFT:         "Sifted",
 SHAVED:       "Shaved",
 SHELLED:      "Shelled",
 SHREAD:       "Shreaded",
 SHUCKED:      "Shucked",
 SKINNED:      "Skinned",
 SLICED:       "Sliced",
 SOAKED:       "Soaked",
 SOFTENED:     "Softened",
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
const UnitTypes = Object.freeze({
 BAG:      "Bag",
 BATCH:    "Batch",
 BOTTLE:   "Bottle", 
 BULB:     "Bulb", 
 BUNCH:    "Bunch",
 BUSHEL:   "Bushels",
 CAN:      "Can", 
 CLOVE:    "Cloves",    
 CUP:      "Cups",
 DASH:     "Dash",
 DROP:     "Drop",
 EACH:     "Each", 
 GALLON:   "Gallons",
 GRAM:     "Grams",
 HEAD:     "Head",  
 JIGGER:   "Jigger",
 LITER:    "Liters",
 LOAF:     "Loaf",
 ML:       "mLs",    
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
 for (var key in UnitTypes) {
  if (desc == UnitTypes[key]) {
   return key;
  } 
 }
 
 return "UNDEFINED";
}