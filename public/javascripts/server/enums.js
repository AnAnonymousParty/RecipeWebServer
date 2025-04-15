export
const CategoryTypes = Object.freeze({
 ALL:            "All",
 APPETIZER:      "Appetizer",
 BAKEDGOOD:      "Baked Good",
 BEVERAGE:       "Beverage",
 CASSEROLE:      "Casserole",
 DESSERT:        "Dessert",
 ENTREE_BEEF:    "Entree (beef)",
 ENTREE_FISH:    "Entree (fish)",
 ENTREE_PORK:    "Entree (pork)",
 ENTREE_POULTRY: "Entree (poultry)",
 ENTREE_SEAFOOD: "Entree (seafood)",  
 PASTA:          "Pasta",
 SALAD:          "Salad",
 SIDE:           "Side Dish",
 SNACK:          "Snack",
 SOUP:           "Soup",
 STEW:           "Stew"
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
 AMERICAN:      "American",
 ASIAN:         "Asian",
 CAJUN:         "Cajun",
 CARIBBEAN:     "Caribbean",
 ITALIAN:       "Italian",
 INDIAN:        "Indian", 
 MEDITERRANEAN: "Mediterranean",
 MEXICAN:       "Mexican"
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
 NONE:        "",
 BATON:       "Batonned",
 BLANCH:      "Blanched",
 BRUNOISE:    "Brunoise",
 CHIFFONADE:  "Chiffonade",
 CHIPPED:     "Chipped",
 CHOPCOARSE:  "Coarsely chopped",
 CHOPFINE:    "Finely chopped",
 DICELARGE:   "Diced large", 
 DICEMEDIUM:  "Diced medium",  
 DICESMALL:   "Diced small", 
 DRAINED:     "Drained",
 DRIED:       "Dried",
 GRATE:       "Grated",
 GROUND:      "Ground",
 JULIENNE:    "Julienned",
 MASHED:      "Mashed",  
 MELTED:      "Melted", 
 MINCED:      "Minced",
 MIXED:       "Mixed",
 MUDDLED:     "Muddled",
 OBLIQUE:     "Oblique cut",
 PEELED:      "Peeled",
 PITTED:      "Pitted",
 POUNDED:     "Pounded",
 POWDERED:    "Powdered",
 REHYDRATE:   "Re-hydrated",
 SCALD:       "Scalded",
 SEPARATED:   "Separated",
 SIFT:        "Sifted",
 SHAVED:      "Shaved",
 SHELLED:     "Shelled",
 SHREAD:      "Shreaded",
 SKINNED:     "Skinned",
 SLICED:      "Sliced",
 SOAKED:      "Soaked",
 SMASHED:     "Smashed",
 STRAIN:      "Strained",
 TOASTED:     "Toasted",
 TOURNEED:    "Tournéed",
 WHIPPED:     "Whipped"
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
const UnitTypes = Object.freeze({
 BUSHEL:   "Bushels",
 CLOVE:    "Cloves",    
 CUP:      "Cups",
 DASH:     "Dash",
 DROP:     "Drop",
 EACH:     "Each", 
 GALLON:   "Gallons",
 GRAM:     "Grams",
 LITER:    "Liters",
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
 SHOT:     "Shot",
 SLICE:    "Slices",
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