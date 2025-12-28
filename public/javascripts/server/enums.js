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
 IMPERIAL:       "Imperial",
 METRIC:         "Metric"
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
 for (var key in UnitTypes) {
  if (desc == UnitTypes[key]) {
   return key;
  } 
 }
 
 return "UNDEFINED";
}