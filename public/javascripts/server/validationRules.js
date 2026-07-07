/**
 The ValidationRule class is a container for a set of validation data/rules 
 associated with an entry field, indentifying the field, its type, maximum/ 
 minimum length, maximum/minimum values, and whether an entry is required.
*/
export
class ValidationRule {
 constructor(fieldId, fieldTypeId, maxLength, maxValue, minLength, minValue, required) {
  this.fieldId     = fieldId
  this.fieldTypeId = fieldTypeId;
  this.maxLength   = maxLength;
  this.maxValue    = maxValue;
  this.minLength   = minLength;
  this.minValue    = minValue;
  this.required    = required;
 }
 
 GetFieldId() {
  return this.fieldId;
 }
 
 GetFieldTypeId() {
  return this.fieldTypeId;
 }
 
 GetMaxLength() {
  return this.maxLength;
 }
 
 GetMaxValue() {
  return this.maxValue;
 } 
 
 GetMinLength() {
  return this.minLength;
 } 
 
 GetMinValue() {
  return this.minValue;
 } 
 
 IsRequired() {
  return (true == this.required ? "required" : "");
 }
}


/**
 The ValidationRules class maintains a collection of Validation Rule objects
 in the form of associative array (i.e. a 'Map'), where the field ID serves 
 as the key for a corresponding Validation Rule object.
*/
export
class ValidationRules {
 constructor() {
  this.rules = new Map();
  
  this.InitRules();
 }
 
 AddRule(validationRule) {
  this.rules.set(validationRule.GetFieldId(), validationRule);
 }

 GetValidationRule(fieldId) {
  return (this.rules.get(fieldId));
 }
 
 InitRules() {
  this.rules.clear();
  
  //                                   ID              TYPE        ML   MV   mL mV   REQ
  this.AddRule(new ValidationRule("calories",       "vNumeric",   3,    999, 1, 0,  false));
  this.AddRule(new ValidationRule("carbs",          "vNumeric",   3,    999, 1, 0,  false));    
  this.AddRule(new ValidationRule("cookTime",       "vNumeric",   3,    999, 1, 0,  false));  
  this.AddRule(new ValidationRule("cholesterol",    "vNumeric",   3,    999, 1, 0,  false));
  this.AddRule(new ValidationRule("description",    "vText",      4096, "",  1, "", true));  
  this.AddRule(new ValidationRule("fat",            "vNumeric",   3,    999, 1, 0,  false)); 
  this.AddRule(new ValidationRule("fiber",          "vNumeric",   3,    999, 1, 0,  false));
  this.AddRule(new ValidationRule("heading",        "vText",      256,  "",  1, "", true));    
  this.AddRule(new ValidationRule("ingredientName", "vText",      256,  "",  1, "", true));   
  this.AddRule(new ValidationRule("mainImageName",  "vImageName", 128,  "",  1, "", false)); 
  this.AddRule(new ValidationRule("notes",          "vText",      4096, "",  1, "", true));    
  this.AddRule(new ValidationRule("prepTime",       "vNumeric",   3,    999, 1, 0,  false));
  this.AddRule(new ValidationRule("prerequisite",   "vAlnum",     4096, "",  1, "", true));    
  this.AddRule(new ValidationRule("protein",        "vNumeric",   3,    999, 1, 0,  false));  
  this.AddRule(new ValidationRule("quantity",       "vNumeric",   3,    999, 1, 0,  true));   
  this.AddRule(new ValidationRule("recipeName",     "vFileName",  128,  "",  1, "", true));
  this.AddRule(new ValidationRule("saturatedFat",   "vNumeric",   3,    999, 1, 0,  false)); 
  this.AddRule(new ValidationRule("search",         "vText",      256,  "",  1, "", true));   
  this.AddRule(new ValidationRule("servings",       "vNumeric",   3,    999, 1, 1,  false));
  this.AddRule(new ValidationRule("sodium",         "vNumeric",   3,    999, 1, 0,  false));  
  this.AddRule(new ValidationRule("step",           "vText",      4096, "",  1, "", true));   
  this.AddRule(new ValidationRule("sugar",          "vNumeric",   3,    999, 1, 0,  false));   
  this.AddRule(new ValidationRule("variation",      "vText",      4096, "",  1, "", true));   
  this.AddRule(new ValidationRule("yield",          "vDigits",    3,    999, 1, 1,  false));
 }
}