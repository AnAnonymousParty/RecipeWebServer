export
function CupsToMilliliters(cupsVal) {
 return OzsToMilliliters(cupsVal * 8.0);
}

export 
function FToC(fval) {
 return (fval - 32.0) / 1.8;
}

export
function GalsToMilliliters(galsVal) {
 return OzsToMilliliters(cupsVal * 128.0);
}

export
function JiggersToMilliliters(jigsVal) {
 return OzsToMilliliters(jigdVal * 1.5);
}

export
function OzsToGrams(ozVal) {
 return(ozVal * 28.34952);
}

export
function OzsToMilliliters(ozVal) {
 return(ozVal * 29.57353);
}

export
function PintsToMilliliters(pintsVal) {
 return OzsToMilliliters(cupsVal * 16.0); 
}

export
function PoundsToGrams(lbsVal) {
 return OzsToGrams(lbsVal * 16.0); 
}

export
function QuartzToMilliliters(qtsVal) {
 return OzsToMilliliters(cupsVal * 32.0);
}

export
function ShotsToMilliliters(shotsVal) {
 JiggersToMilliliters(shotsVal)
}

export
function TbspsToMilliliters(tbspsVal) {
 return OzsToMilliliters(tspVal * 0.5);
}

export
function TspsToMilliliters(tspVal) {
 return OzsToMilliliters(tspVal * 0.1666667);
}

