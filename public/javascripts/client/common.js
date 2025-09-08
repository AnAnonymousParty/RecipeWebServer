function GenerateUID(length) {
 return window.btoa(String.fromCharCode(...window.crypto.getRandomValues(new Uint8Array(length * 2)))).replace(/[+/]/g, "").substring(0, length);
}

function HideElement(id) {
 var e = document.getElementById(id);
 
 e.style.display    = 'none';
 e.style.visibility = "collapse";
}

function IsImageShared(mainImageName, stepImageName, tbody, rowNum) {
 if (mainImageName == stepImageName) {
  return true;
 }
 
 for (rowNdx = 0; rowNdx < tbody.rows.length; ++rowNdx) {
   if (rowNdx == rowNum) {
    continue;  // Ignore current row being edited.
   }
   
   if (undefined == tbody.rows[rowNdx].cells[1].childNodes[1]) {   
    continue;
   }
   
   var stepImage = tbody.rows[rowNdx].cells[1].childNodes[1].value; 
   
   if ("" == stepImage) { 
    continue;
   } 
   
   if (stepImage == stepImageName) {
    return true;
   }
 } 
 
 return false;
}

function ToggleVisibility(id) {
 var e = document.getElementById(id);
 
 var style = e.style;
 
 var display = style.display;

 if ('block' == e.style.display) {
  HideElement(id);
    
  return;
 }
 
 UnHideElement(id);
}

function UnHideElement(id, display) {
 var e = document.getElementById(id);
 
 if (null == e) {
  return;
 }
 
 if (undefined == display) {
  e.style.display = 'block';
 } else {
   e.style.display = display;
 }
 
 e.style.visibility = "visible";
}

function ViewImage(imageSrc) {
  window.open(imageSrc);
}
