function CupsToMilliliters(cupsVal) {
 return OzsToMilliliters(cupsVal * 8.0);
}

function FToC(fval) {
 return (fval - 32.0) / 1.8;
}

function GalsToMilliliters(galsVal) {
 return OzsToMilliliters(cupsVal * 128.0);
}

function JiggersToMilliliters(jigsVal) {
  return OzsToMilliliters(jigdVal * 1.5);
}

function OzsToGrams(ozVal) {
 return(ozVal * 28.34952);
}

function OzsToMilliliters(ozVal) {
 return(ozVal * 29.57353);
}

function PintsToMilliliters(pintsVal) {
 return OzsToMilliliters(cupsVal * 16.0); 
}

function PoundsToGrams(lbsVal) {
 return OzsToGrams(lbsVal * 16.0); 
}

function QuartzToMilliliters(qtsVal) {
 return OzsToMilliliters(cupsVal * 32.0);
}

function ShotsToMilliliters(shotsVal) {
 JiggersToMilliliters(shotsVal)
}

function TbspsToMilliliters(tbspsVal) {
 return OzsToMilliliters(tspVal * 0.5);
}

function TspsToMilliliters(tspVal) {
 return OzsToMilliliters(tspVal * 0.1666667);
}

