/*
 * SAP UI development toolkit for HTML5 (SAPUI5)

(c) Copyright 2009-2017 SAP SE. All rights reserved
 */
sap.ui.define(['sap/chart/AutoScaleMode','sap/chart/ScaleBehavior','sap/chart/ChartLog','sap/chart/utils/ChartUtils'],function(A,S,C,a){"use strict";var V={};V.getValueAxisScaleSetting=function(c,v,b,d){var m=b.filter(function(t){return d.indexOf(t.getName())!==-1;});var r,M,B={};m.forEach(function(t){M=t.getName();r=t._getFixedRole();if(r==='axis1'||r==='axis2'){if(!B[r]){B[r]={measures:[],min:Number.POSITIVE_INFINITY,max:Number.NEGATIVE_INFINITY};}B[r].measures.push(M);}});var o,f=v&&v.scaleBehavior===S.FixedScale,i=a.isStackedLikeChart(c)&&m.length>1,e=(v&&v.fixedScaleSettings&&v.fixedScaleSettings.measureBoundaryValues)||{};if(f){if(i){var s=(v&&v.fixedScaleSettings&&v.fixedScaleSettings.stackedMultipleMeasureBoundaryValues)||[];if(s&&s.length>0){var g=function(h){return s.filter(function(t){return t.measures&&t.measures.length>0&&t.measures.sort().toString()===h.measures.sort().toString();});};for(var k in B){if(B.hasOwnProperty(k)){var h=B[k];var j=g(h);if(j&&j.length>0){o=j[j.length-1].boundaryValues;if(o&&(isFinite(o.minimum)&&typeof o.minimum=="number")||(isFinite(o.maximum)&&typeof o.maximum=="number")){h.min=o.minimum;h.max=o.maximum;}}}}}}else{m.forEach(function(t){r=t._getFixedRole();if(r==='axis1'||r==='axis2'){M=t.getName();o=e[M];if(!o||!(isFinite(o.minimum)&&typeof o.minimum=="number")||!(isFinite(o.maximum)&&typeof o.maximum=="number")){B[r].min=Number.NEGATIVE_INFINITY;B[r].max=Number.POSITIVE_INFINITY;}else{if(B[r].min>o.minimum){B[r].min=o.minimum;}if(B[r].max<o.maximum){B[r].max=o.maximum;}}}});}}f=false;var l=[],I=a.isBulletChart(c);for(var k in B){if(B.hasOwnProperty(k)){var h=B[k];var n=!(isFinite(h.min)&&typeof h.min=="number"&&isFinite(h.max)&&typeof h.max=="number");var p=k==='axis1'?"valueAxis":"valueAxis2";if(I){p='actualValues';}if(n){if(v&&v.scaleBehavior===S.FixedScale){new C('error','Chart.ValueAxisScale',p+' was switched to auto scale, because minimum or maximum value is missing in measure').display();}}else if(h.min>h.max){new C('error','Chart.ValueAxisScale',p+' was switched to auto scale, because minimum value exceeds maximum value').display();}else{f=true;}l.push({"feed":p,"type":"linear","min":n?"auto":h.min,"max":n?"auto":h.max});}}var P={};if(!f){var z=true,q=false;if(v&&v.autoScaleSettings&&v.autoScaleSettings.zeroAlwaysVisible===false){z=false;}if(v&&v.autoScaleSettings&&v.autoScaleSettings.syncWith===A.VisibleData){q=true;}P={plotArea:{adjustScale:!z},interaction:{syncValueAxis:q}};}return{scale:l,property:P};};return V;});
