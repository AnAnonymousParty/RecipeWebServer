export
function IsAlnum(sString)
 {
  for (var i = 0; i < sString.length; ++i)
   {
    if (!IsAlpha(sString.charAt(i)) && !IsDigits(sString.charAt(i)))
     {
      return(false);
     }
   }

  return(true);
 }

export
function IsAlpha(sString)
 {
  for (var i = 0; i < sString.length; ++i)
   {
    if (-1 == ("0123456789abcdefghijklmnopqrstuvwxyz").indexOf(sString.charAt(i).toLowerCase()))
     {
      return(false);
     }
   }

  return(true);
 }

export
function IsDigits(sString)
 {
  for (var i = 0; i < sString.length; ++i)
   {
   if (-1 == ("0123456789").indexOf(sString.charAt(i)))
     {
      return(false);
     }
   }

  return(true);
 }
 
export
function IsEmpty(sString)
 {
  return(0 == sString.length);
 }        

export
function IsFileName(fileName)
 {
  if (0 == fileName.length)
   {
    return(true);
   }

  for (var i = 0; i < fileName.length; ++i)
   {
    if (-1 == ("'0123456789abcdefghijklmnopqrstuvwxyz-_ ").indexOf(fileName.charAt(i).toLowerCase()))
     {
      return(false);
     }
   }

  return(true);
 }  
 
 export
function IsImageName(imageName)
 {
  for (var i = 0; i < imageName.length; ++i)
   {
    if (-1 == ("'0123456789abcdefghijklmnopqrstuvwxyz-_. ").indexOf(imageName.charAt(i).toLowerCase()))
     {
      return(false);
     }
   }

  return(true);
 } 
 
export
function IsNotOnlySpaces(sString)
 {
  return sString.trim();
 }   
 
export
function IsNumeric(sString)
 {
  if (0 == sString.length)
   {
    return(false);
   }

  for (var i = 0; i < sString.length; ++i)
   {
    if (-1 == (".0123456789").indexOf(sString.charAt(i)))
     {
      return(false);
     }
   }

  return(true);
 }   
 
export
function IsPunct(sString)
 {
  for (var i = 0; i < sString.length; ++i)
   {
    if (-1 == (" `~!@#$%^&*()_-+={[}]:;'<,>.?/|\\").indexOf(sString.charAt(i).toLowerCase()))
     {
      return(false);
     }
   }

  return(true);
 } 
 
 export
function IsText(sString)
 {
  for (var i = 0; i < sString.length; ++i)
   {
    if (!IsAlnum(sString.charAt(i)) && !IsPunct(sString.charAt(i)))
     {
      return(false);
     }
   }

  return(true);
 }

export
function ValidateField(fieldId, fieldValue, validationRules) {
 console.log("> ValidateField(" + fieldId + ", " + fieldValue + ")");
 
 let validationRule = validationRules.GetValidationRule(fieldId);
 
 if (undefined == validationRule) {
  console.log("< ValidateField() [true]  No validation rule defined");
   
  return (true);  // No rule? No problem! But there really should be a rule. Without rules there is chaos.
 }
 
 let retVal = true;
 
 let fieldTypeId = validationRule.GetFieldTypeId();
 
 switch (fieldTypeId) {
  case "vAlpha": {
   if (false == IsAlpha(fieldValue)) {
    retVal = false;
   }   
  }
  break;
  
  case "vAlnum": {
   if (false == IsAlnum(fieldValue)) {
    retVal = false;
   }   
  }
  break;
  
  case "vDigits": {
   if (false == IsDigits(fieldValue)) {
    retVal = false;
   }   
  }
  break;
  
  case "vFileName": {  
   if (0 == fieldValue.length && true == validationRule.IsRequired()) {
    retVal = false;
   }

   if (fieldValue.length > validationRule.GetMaxLength()) {
    retVal = false;
   }    
   
   if (false == IsFileName(fieldValue)) {
    retVal = false;
   }
  }
  break;  
  
  case "vImageName": {  
   if (0 == fieldValue.length && true == validationRule.IsRequired()) {
    retVal = false;
   }

   if (fieldValue.length > validationRule.GetMaxLength()) {
    retVal =  false;
   }    
   
   if (false == IsImageName(fieldValue)) {
    retVal = false;
   }
  }
  break;
  
  case "vNumeric": {
   if (false == IsNumeric(fieldValue)) {
    retVal = false;
   }   
  }
  break;  
  
  case "vPunct": {
   if (false == IsPunct(fieldValue)) {
    retVal = false;
   }   
  }
  break;  

  case "vText": {
   if (false == IsText(fieldValue)) {
    retVal = false;
   }   
  }
  break;    
  
  default: {
   retVal = false;
  }
  break;
 }
 
 console.log("< ValidateField() [" + retVal + "]");
 
 return (retVal);
}