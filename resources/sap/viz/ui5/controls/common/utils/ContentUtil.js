/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)

(c) Copyright 2009-2017 SAP SE. All rights reserved
 */
sap.ui.define(function(){"use strict";var C={};var M=15;var a=12;C.setContent=function(b,d){var v=d.val;var c=false;var n,e,f=[],r={},g="",h='';var m='';var j=function(){return sap.viz.extapi.env.Language.getResourceString("IDS_ISNOVALUE");};for(var i=0;i<v.length;i++){var k={};n=v[i].dataName||v[i].name;if(v[i].type&&v[i].type.toLowerCase()==='dimension'){e=v[i].value;if(d.isTimeSeries&&v.hasOwnProperty("timeDimensions")&&v.timeDimensions.indexOf(i)>-1){var l=(v[i].timeAxis&&v[i].timeAxis.getFiscalUnitLabels&&v[i].timeAxis.getFiscalUnitLabels());if(l&&l.length>0){f.push({name:l[0],value:e.fiscalyear,type:'dimension'});if(l.length>1){f.push({name:l[1],value:e.fiscalperiod,type:'dimension'});}if(b==='popover'){h=e.fiscalperiod;if(e.fiscalyear){if(!h||h.length<e.fiscalyear.length){h=e.fiscalyear;}}}}else{if(b==='toolTip'){if(e.time){var o='';if(e.day){o=e.time+" "+e.day;}else{o=e.time;}f.push({name:n,value:o,type:'dimension'});}if(e.day&&!e.time){f.push({name:n,value:e.day,type:'dimension'});}}else if(b==='popover'){if(e.time){f.push({name:n,value:e.time,type:'dimension'});}if(e.day){f.push({name:e.time?"":n,value:e.day,type:'dimension'});}h=e.time;if(e.day){if(!h||h.length<e.day.length){h=e.day;}}}}if(b==='popover'&&!c){if(v[i].name.length>M||h.length>a){c=true;}else{if(l&&l.length>0&&l[0].length>M){c=true;}if(l&&l.length>1&&l[1].length>M){c=true;}}}}else{if(g==null){g=j();}else if(g.length>0){if(e===null){g=g+' - '+j();}else{g=g+' - '+e;}}else{if(e===null){g=j();}else{g=e.toString();}}if(b==='toolTip'){f.push({name:n,value:e,type:'dimension'});}}}else if(v[i].type&&v[i].type.toLowerCase()==='measure'){f.push({name:n,value:v[i].value,unit:v[i].unit,type:'measure'});if(b==='popover'&&!c){m=v[i].value;if(m==null){m=j();}if((v[i].dataName||v[i].name).length>M||m.toString().length>a){c=true;}}}}r.items=f;r.isLongMode=c;r.dims=g;return r;};return C;});
