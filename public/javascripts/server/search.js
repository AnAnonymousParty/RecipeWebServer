export
function SearchDirectory(fs, path, directoryPath, searchTerm) {
 console.log("> SearchDirectory(" + directoryPath + ", " + searchTerm + ")");
 
 const results = [];
 
 try {
  const files = fs.readdirSync(directoryPath);
  
  for (const file of files) {
   const filePath = path.join(directoryPath, file);
   const stats    = fs.statSync(filePath);
   
   if (true == stats.isDirectory()) {
    results.push(SearchDirectory(fs, filePath, searchTerm)); 
   } else {
    if (true == SearchFile(fs, filePath, searchTerm)) {
     results.push(file);
    }
   }
  }
 } catch (error) {
    console.error("  SearchDirectory(): Error reading '" + directoryPath + "' = " + error);
 }
 
 console.log("< SearchDirectory()");
 
 return results;
}


function SearchFile(fs, filePath, searchTerm) {
 console.log("> SearchFile(" + filePath + ", " + searchTerm + ")");
 
 const searchRegex = new RegExp(searchTerm, "gi");
 
 try {
  const fileContent = fs.readFileSync(filePath);
  
  if (true == searchRegex.test(fileContent)) {
   console.log("< SearchFile() {true}");
   
   return true;
  }
 } catch (error) {
   console.error("  SearchFile(): Error reading '" + filePath + "' - " + error);
 }
 
 return false;
}