/**
* Class that associates markup string delimiters with their
* corresponding IDs.
*/
class MarkupIds {
 static BOLD        = "**";
 static ITALICS     = "--";
 static LINK        = "##";
 static RECIPELINK  = "@@";
 static TEMPERATURE = "%%";
 static UNDERLINE   = "__";

 static IsMarkup(candidate) {
  if (true == candidate.includes(MarkupIds.BOLD))        { return true; }
  if (true == candidate.includes(MarkupIds.ITALICS))     { return true; }     
  if (true == candidate.includes(MarkupIds.LINK))        { return true; }        
  if (true == candidate.includes(MarkupIds.RECIPELINK))  { return true; }                 
  if (true == candidate.includes(MarkupIds.TEMPERATURE)) { return true; } 
  if (true == candidate.includes(MarkupIds.UNDERLINE))   { return true; }

  return false;
 }
}

let TEMPCOUNT = 0;  // Used to ensure all temperature fields have have unique IDs.


/**
	* Container of information related to a string contained within a pair of
 * delimiters
	*/
class DelimitedString { 
	/**
		* Constructor, given:
		* <p>
  * @param delimitedString   The delimited string.
		* @param undelimitedString The undelimited string.
		*/
		constructor(delimitedString, undelimitedString) {
   this.delimitedString   = delimitedString;
			this.undelimitedString = undelimitedString;
		}
  
	/**
	* Get the delimited string.
	* <p>
	* @returns The delimited string.
	*/
		GetDelimitedString() {
			return this.delimitedString;
		}
  
   /**
	* Get the length of the delimited string.
	* <p>
	* @returns The length of the delimited string.
	*/
		GetDelimitedStringLength() {
			return (undefined == this.delimitedString ? 0 : this.delimitedString.length);
		}

	/**
	* Get the undelimited string.
	* <p>
	* @returns The undelimited string.
	*/
		GetUndelimitedString() {
			return this.undelimitedString;
		}
  
 /**
	* Get the length of the undelimited string.
	* <p>
	* @returns The length of the undelimited string.
	*/
		GetUndelimitedStringLength() {
			return (undefined == this.undelimitedString ? 0 : this.undelimitedString.length);
		}
}

/**
* Convert any markup sequences in the supplied string to its corresponding
* html/string equivalents.
* 
* @param raw String to be converted.
*
* @returns String containing the converted result.
*/
export 
function ConvertMarkup(raw) {
 console.log("> ConvertMarkup(" + raw + ")");
 
 if (false == MarkupIds.IsMarkup(raw)) {
  console.log("< ConvertMarkup(): No markup found  [" + raw + "]");
 
  return raw;
 }
 
 raw = PerformBoldSubstitutions(raw);
 raw = PerformItalicSubstitutions(raw);
 raw = PerformLinkSubstitutions(raw);
 raw = PerformRecipeLinkSubstitutions(raw);
 raw = PerformTempSubstitutions(raw);
 raw = PerformUnderlineSubstitutions(raw);
 
 console.log("< ConvertMarkup() [" + raw + "]");
 
 return raw;
}

/**
* Search the input string for a string delimited by a delimiting strung,
* 
* @param candidate String to be search.
* @param delimiter String containing the delimiter sequence.
*
* @returns A DelimitedString object containing the result of the search.
*/
function FindDelimitedString(candidate, delimiter) {
 console.log("> FindDelimitedString(" + candidate + ", " + delimiter + ")");
 
 if ("" == candidate || "" == delimiter) {
  console.log("< FindDelimitedString(): No string or delimiter  [0, '']");

  return new DelimitedString(candidate, "");  // Stupid cases handled.
 }
  
 let occurances = candidate.split(delimiter).length - 1;
 
 if (occurances < 2) {
  console.log("< FindDelimitedString(): Missing delimiter  [0, ''");
  
  return new DelimitedString(candidate, "");  // Another stupid case handled.
 }  
 
 let delimiterLen = delimiter.length;
 
 let start = candidate.indexOf(delimiter);
 let end   = candidate.indexOf(delimiter, start + delimiterLen);
 
 let rv = new DelimitedString(candidate.substring(start, end + delimiterLen), candidate.substring(start + delimiterLen, end));
  
 console.log("< FindDelimitedString() [" + rv.GetDelimitedString() + ", " + rv.GetDelimitedStringLength() + ", " + rv.GetUndelimitedString() + ", " + rv.GetUndelimitedStringLength() +  "]");

 return rv;
}

/**
* Convert any sequence contained within "**" to "<b>...</b>".
* 
* @param raw String to be converted.
*
* @returns String containing the converted result.
*/
function PerformBoldSubstitutions(raw) {
 console.log("> PerformBoldSubstitutions(" + raw + ")");
  
 for (;;) {
  let startNdx = raw.indexOf(MarkupIds.BOLD);
  
  if (-1 == startNdx) {
   break;
  }

  let delimitedString = FindDelimitedString(raw, MarkupIds.BOLD);
 
  let delimitedStringLength = delimitedString.GetDelimitedStringLength();
 
  if (0 == delimitedStringLength) {
   break;
  }
  
  let newStr = "<b>" 
             + delimitedString.GetUndelimitedString()
             + "</b>";
  
  let oldStr = raw.substring(startNdx, startNdx + delimitedStringLength);

  raw = raw.replace(oldStr, newStr);
  
  console.log("  PerformBoldSubstitutions() raw = " + raw);
 }
  
 console.log("< PerformBoldSubstitutions() [" + raw + "]");
  
 return raw;
}

/**
* Convert any sequence contained within "--" to "<i>...</i>".
* 
* @param raw String to be converted.
*
* @returns String containing the converted result.
*/
function PerformItalicSubstitutions(raw) {
 console.log("> PerformItalicSubstitutions(" + raw + ")");
  
 for (;;) {
  let startNdx = raw.indexOf(MarkupIds.ITALICS);
  
  if (-1 == startNdx) {
   break;
  }

  let delimitedString = FindDelimitedString(raw, MarkupIds.ITALICS);
 
  let delimitedStringLength = delimitedString.GetDelimitedStringLength();
 
  if (0 == delimitedStringLength) {
   break;
  }
  
  let newStr = "<i>" 
             + delimitedString.GetUndelimitedString()
             + "</i>";
  
  let oldStr = raw.substring(startNdx, startNdx + delimitedStringLength);

  raw = raw.replace(oldStr, newStr);
 }
  
 console.log("< PerformItalicSubstitutions() [" + raw + "]");
  
 return raw;
}

/**
* Convert any sequence contained within "##" to "<a href>...</a>".
* 
* @param raw String to be converted.
*
* @returns String containing the converted result.
*/
function PerformLinkSubstitutions(raw) {
  console.log("> PerformLinkSubstitutions(" + raw + ")");
  
 for (;;) {
  let startNdx = raw.indexOf(MarkupIds.LINK);
  
  if (-1 == startNdx) {
   break;
  }

  let delimitedString = FindDelimitedString(raw, MarkupIds.LINK);
 
  let delimitedStringLength = delimitedString.GetDelimitedStringLength();
 
  if (0 == delimitedStringLength) {
   break;
  }
  
  let parts = delimitedString.GetUndelimitedString().split("|");
  
  let link    = "";
  let linkTxt = "";
  
  if (parts.length < 2) {
   link = linkTxt = delimitedString.GetUndelimitedString();
  } else {
   link    = parts[0];
   linkTxt = parts[1];
  }

  let newStr = "<a href=\"" 
             + link
             + "\">"
             + linkTxt
             + "</a>";
 
  let oldStr = raw.substring(startNdx, startNdx + delimitedStringLength);

  raw = raw.replace(oldStr, newStr);
 }  
  
 console.log("< PerformLinkSubstitutions() [" + raw + "]");
  
 return raw;
}

/**
* Convert any sequence contained within "@@" to "<a href="/GetRecipe?recipeName=>...</a>".
* 
* @param raw String to be converted.
*
* @returns String containing the converted result.
*/
function PerformRecipeLinkSubstitutions(raw) {
  console.log("> PerformRecipeLinkSubstitutions(" + raw + ")");
  
 for (;;) {
  let startNdx = raw.indexOf(MarkupIds.RECIPELINK);
  
  if (-1 == startNdx) {
   break;
  }

  let delimitedString = FindDelimitedString(raw, MarkupIds.RECIPELINK);
 
  let delimitedStringLength = delimitedString.GetDelimitedStringLength();
 
  if (0 == delimitedStringLength) {
   break;
  }

  let newStr = "<a href=\"/GetRecipe?recipeName=" 
             + delimitedString.GetUndelimitedString()
             + "\">"
             + delimitedString.GetUndelimitedString()
             + "</a>";
  
  let oldStr = raw.substring(startNdx, startNdx + delimitedStringLength);

  raw = raw.replace(oldStr, newStr);
 }  
  
 console.log("< PerformRecipeLinkSubstitutions() [" + raw + "]");
  
 return raw;
}

/**
* Convert any sequence contained within "%%" to a temperature string inside
* a span with a click handler that allows the display to be toggled C/F.
* 
* @param raw String to be converted.
*
* @returns String containing the converted result.
*/
function PerformTempSubstitutions(raw) {
 console.log("> PerformTempSubstitutions(" + raw + ")");
  
 for (;;) {
  let startNdx = raw.indexOf(MarkupIds.TEMPERATURE);
  
  if (-1 == startNdx) {
   break;
  }

  let delimitedString = FindDelimitedString(raw, MarkupIds.TEMPERATURE);
 
  let delimitedStringLength = delimitedString.GetDelimitedStringLength();
 
  if (0 == delimitedStringLength) {
   break;
  }
  
  // We save the original temperature in a hidden field so that if the user 
  // clicks the temperature to toggle between Celcius and Fahrenheit we can 
  // restore the original value instead of reconverting it back and then
  // having a cascade of rounding issues.
  
  let newStr = "<input id=\"Otemp_" + TEMPCOUNT + "\" type=\"hidden\" value=\"" + delimitedString.GetUndelimitedString() + "\"> "  
             + "<span class=\"tempF\" id=\"temp_" + TEMPCOUNT + "\" onclick=\"ToggleTemp('temp_" + TEMPCOUNT + "');\" title=\"Click to toggle C/F\">" 
             + delimitedString.GetUndelimitedString() + "° F"
             + "</span>";
  
  let oldStr = raw.substring(startNdx, startNdx + delimitedStringLength);

  raw = raw.replace(oldStr, newStr);
  
  ++TEMPCOUNT;
 }
 
 console.log("< PerformTempSubstitutions() [" + raw + "]");
 
 return raw;
}

/**
* Convert any sequence contained within "__" to "<u>...</u>".
* 
* @param raw String to be converted.
*
* @returns String containing the converted result.
*/
function PerformUnderlineSubstitutions(raw) {
 console.log("> PerformUnderlineSubstitutions(" + raw + ")");
  
 for (;;) {
  let startNdx = raw.indexOf(MarkupIds.UNDERLINE);
  
  if (-1 == startNdx) {
   break;
  }

  let delimitedString = FindDelimitedString(raw, MarkupIds.UNDERLINE);
 
  let delimitedStringLength = delimitedString.GetDelimitedStringLength();
 
  if (0 == delimitedStringLength) {
   break;
  }
  
  let newStr = "<u>" 
             + delimitedString.GetUndelimitedString()
             + "</u>";
 
  let oldStr = raw.substring(startNdx, startNdx + delimitedStringLength);

  raw = raw.replace(oldStr, newStr);
 }
  
 console.log("< PerformUnderlineSubstitutions() [" + raw + "]");
  
 return raw;
}
