/**
 The ConfigManager class is a container for configuration parameters.
*/
export
class ConfigManager {
 constructor(enums, fs, DOMParser, configFilePathName, xmlBuilder) { 
  this.configFilePathName    = configFilePathName;
  this.fs                    = fs;
  this.nativeUnits           = enums.SystemOfUnitsTypes.US;
  this.validateUploadedFiles = true;  
  this.xmlBuilder            = xmlBuilder;
  
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
  console.log("< IsValidateUploadedFileEnabled(): " + this.validateUploadedFiles); 
  return "true" == this.validateUploadedFiles;
 }
 
 SaveConfiguration() {
  console.log("> SaveConfiguration()");
  
  let doc = this.xmlBuilder.create({ version: '1.0' });
 
  let root = doc.ele('Config');
   
  let validation = root.ele('Validation');
  let validateFiles = validation.ele('ValidateUploadedFiles');
  
  validateFiles.txt(this.validateUploadedFiles);
  
  let ui = root.ele('UserInterface');
  let units = ui.ele('Units');
  let nativeUnits = units.ele('NativeUnits');
  
  nativeUnits.txt(this.nativeUnits);
  
  let rv = doc.end({ prettyPrint: true});
  
  console.log("  SaveConfiguration(): Writing " + this.configFilePathName);
  
  try {
   this.fs.writeFileSync(this.configFilePathName, rv);
   console.log("  SaveConfiguration(): Configuration file saved.");
  } catch (err) {
    console.log("  SaveConfiguration():"  + err);
  }
 
  console.log("< SaveConfiguration() [" + rv + "]");
 }
 
 SetNativeUnits(units) {
  this.nativeUnits = units;
 }
 
 SetValidateUploadedFiles(validateUploadedFiles) {
  this.validateUploadedFiles = validateUploadedFiles;
 }
}