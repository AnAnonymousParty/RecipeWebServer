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
  
  this.AddRule(new ValidationRule("recipeName2Add", "vFileName", 128, "", 1, "", true));
 }
}
