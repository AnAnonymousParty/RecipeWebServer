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
 return OzsToMilliliters(galsVal * 128.0);
}

export
function GramsToOzs(gramVal) {
 return(gramVal / 28.34952);
}

export
function JiggersToMilliliters(jigsVal) {
 return OzsToMilliliters(jigsVal * 1.5);
}

export
function MillilitersToOzs(mlVal) {
 return(mlVal / 29.57353);
}

export
function MillilitersToTsps(mlVal) {
 return mlVal / 5.0;
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
 return OzsToMilliliters(pintsVal * 16.0); 
}

export
function PoundsToGrams(lbsVal) {
 return OzsToGrams(lbsVal * 16.0); 
}

export
function QuartzToMilliliters(qtsVal) {
 return OzsToMilliliters(qtsVal * 32.0);
}

export
function ShotsToMilliliters(shotsVal) {
 JiggersToMilliliters(shotsVal)
}

export
function TbspsToMilliliters(tbspsVal) {
 return OzsToMilliliters(tbspsVal * 0.5);
}

export
function TspsToMilliliters(tspVal) {
 return OzsToMilliliters(tspVal * 0.1666667);
}

