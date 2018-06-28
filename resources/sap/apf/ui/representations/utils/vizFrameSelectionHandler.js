/*!
 * SAP APF Analysis Path Framework
 *
 * (c) Copyright 2012-2014 SAP SE. All rights reserved
 */
jQuery.sap.declare("sap.apf.ui.representations.utils.vizFrameSelectionHandler");(function(){"use strict";sap.apf.ui.representations.utils.VizFrameSelectionHandler=function(p,A){this.oParameter=p;this.oApi=A;};var s=sap.apf.ui.representations.utils.VizFrameSelectionHandler.prototype;s.constructor=sap.apf.ui.representations.utils.VizFrameSelectionHandler;function _(r,S){var d=[];S.forEach(function(i){var b={data:{}};b.data[r]=i.data?i.data[r]:i;d.push(b);});return d;}function a(f){return f.filter(function(i,n,b){return b.indexOf(i)===n;});}s.getSelectionInfoFromEvent=function(c,i,C){var d,e,S=this;var r=S.oParameter.requiredFilters[0];var b=c.mParameters.data.map(function(f){return f.data[r];});var p=C.map(function(f){return f.data[r];});if(i){e=a(p).filter(function(f){return b.indexOf(f)===-1;});}else{e=a(b.concat(p));}d=_(r,e);return{dataPointsFromSelection:d,aUniqueFilterValueFromChart:e};};s.getSelectionInfoFromFilter=function(f,d){var D=[],S=this;var r=S.oParameter.requiredFilters[0];if(S.oParameter.requiredFilters[0]){d.forEach(function(b){f.forEach(function(c){if(c===b[S.oParameter.requiredFilters[0]]){var e={data:{}};e.data[r]=c;D.push(e);}});});}return D;};}());
