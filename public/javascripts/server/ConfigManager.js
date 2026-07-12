/**
 The ConfigManager class is a container for configuration parameters.
*/
export
class ConfigManager {
 constructor(enums, fs, DOMParser, configFilePathName) { 
  this.nativeUnits           = enums.SystemOfUnitsTypes.US;
  this.validateUploadedFiles = true;  
  
  let configDataXml = fs.readFileSync(configFilePathName); 

  try {
   let xmlParser = new DOMParser();
   let xmlDoc    = xmlParser.parseFromString(configDataXml.toString(), "text/xml");
   
   let nativeUnitsElement          = xmlDoc.getElementsByTagName("NativeUnits")[0];
   let validateUploadedFileElement = xmlDoc.getElementsByTagName("ValidateUploadedFiles")[0];

   this.nativeUnits           = nativeUnitsElement.textContent;
   this.validateUploadedFiles = validateUploadedFileElement.textContent;  

  } catch(err) {
   console.log("< ConfigManager.constructor(): Error = " + err); 
  }
 }

 GetNativeUnits() {
  return this.nativeUnits;
 }

 IsValidateUploadedFileEnabled() {
  return this.validateUploadedFiles;
 }
}