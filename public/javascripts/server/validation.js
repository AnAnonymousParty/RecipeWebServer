export
function IsAlnum(sString)
 {
  if (0 == sString.length)
   {
    return(false);
   }

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
  if (0 == sString.length)
    {
     return(false);
    }

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
  if (0 == sString.length)
   {
    return(false);
   }

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
function IsFileName(sString)
 {
  if (0 == sString.length)
   {
    return(false);
   }

  for (var i = 0; i < sString.length; ++i)
   {
    if (-1 == ("'0123456789abcdefghijklmnopqrstuvwxyz-_ ").indexOf(sString.charAt(i).toLowerCase()))
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