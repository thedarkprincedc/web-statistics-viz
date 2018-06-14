/*
 * ! UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2017 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/dt/OverlayRegistry','sap/ui/dt/ElementUtil'],function(q,O,E){"use strict";var c={};c.isInTargetZoneAggregation=function(e){var a=e.getParent();return a&&a.isTargetZone&&a.isTargetZone();};c.getParentInformation=function(e){var p=e.getParentElementOverlay();if(p){var P=p.getElementInstance();var s=e.getParentAggregationOverlay().getAggregationName();var C=E.getAggregation(P,s);var o=e.getElementInstance();var i=C.indexOf(o);return{parent:P,aggregation:s,index:i};}else{return{parent:null,aggregation:"",index:-1};}};c.getClosestOverlayFor=function(e){if(!e){return null;}var p=e;var P=O.getOverlay(p);while(p&&!P){p=p.getParent();P=O.getOverlay(p);}return P;};c.getGeometry=function(g){var m,a,b,d;g.forEach(function(e){if(e){if(!m||e.position.left<m){m=e.position.left;}if(!b||e.position.top<b){b=e.position.top;}var r=e.position.left+e.size.width;if(!a||r>a){a=r;}var B=e.position.top+e.size.height;if(!d||B>d){d=B;}}});if(typeof m==="number"){return{size:{width:a-m,height:d-b},position:{left:m,top:b},visible:true};}};c.getClosestOverlayForType=function(t,o){while(o&&!E.isInstanceOf(o.getElementInstance(),t)){o=o.getParentElementOverlay();}return o;};c.getClosestScrollable=function(o){if(!o){return undefined;}o=o.getParent();while(o&&o.isScrollable&&!o.isScrollable()){o=o.getParent();}return o&&o.isScrollable?o:null;};c.getFirstDescendantByCondition=function(o,C){if(!C){throw new Error("expected condition is 'undefined' or not a function");}var a=c.getAllChildOverlays(o);for(var i=0,n=a.length;i<n;i++){var b=a[i];if(C(b)){return b;}var d=this.getFirstDescendantByCondition(b,C);if(d){return d;}}return undefined;};c.getAllChildOverlays=function(o){var C=[],a=[];if(!o){return C;}var A=o.getAggregationOverlays();for(var i=0;i<A.length;i++){a=A[i].getChildren();if(a&&a.length>0){C=C.concat(a);}}return C;};c.getFirstChildOverlay=function(o){var C=this.getAllChildOverlays(o);if(C.length){return C[0];}return undefined;};c.getLastChildOverlay=function(o){var C=this.getAllChildOverlays(o);if(C.length){return C[C.length-1];}return undefined;};c.getNextSiblingOverlay=function(o){if(!o){return undefined;}var p=o.getParentAggregationOverlay();if(p){var a=p.getChildren();var i=a.indexOf(o);if(i!==a.length-1){return a[i+1];}else if(i===a.length-1){var P=o.getParentElementOverlay();a=P.getAggregationOverlays();for(i=a.indexOf(p)+1;i<a.length;i++){var b=a[i].getChildren();if(b.length){return b[0];}}}}};c.getPreviousSiblingOverlay=function(o){if(!o){return undefined;}var p=o.getParentAggregationOverlay();if(p){var a=p.getChildren();var i=a.indexOf(o);if(i>0){return a[i-1];}else if(i===0){var P=o.getParentElementOverlay();a=P.getAggregationOverlays();for(i=a.indexOf(p)-1;i>=0;i--){var b=a[i].getChildren();if(b.length){return b[b.length-1];}}}}};c.getNextOverlay=function(o){if(!o){return undefined;}var f=this.getFirstChildOverlay(o);if(f){return f;}var n=this.getNextSiblingOverlay(o);if(n){return n;}do{o=o.getParentElementOverlay();n=this.getNextSiblingOverlay(o);}while(o&&!n);return n;};c.getPreviousOverlay=function(o){if(!o){return undefined;}var p=o.getParentAggregationOverlay();if(!p){return undefined;}var P=this.getPreviousSiblingOverlay(o);if(P){var l=P;do{P=l;l=this.getLastChildOverlay(P);}while(l);return P;}return o.getParentElementOverlay();};c.getRootOverlay=function(o){var p=o;do{o=p;p=o.getParentElementOverlay();}while(p);return o;};c.iterateOverlayElementTree=function(e,C){C(e);e.getAggregationOverlays().forEach(function(a){a.getChildren().forEach(function(o){this.iterateOverlayElementTree(o,C);},this);},this);};c.iterateOverAggregationLikeChildren=function(e,a,C){var o=e.getElementInstance();var v;if(e.getAggregationOverlay(a).isAssociation()){v=E.getAssociationInstances(o,a);}else{v=E.getAggregation(o,a);}E.iterateOverElements(v,C);};c.iterateOverlayTree=function(o,C){C(o);o.getChildren().forEach(function(a){this.iterateOverlayTree(a,C);},this);};c.isInOverlayContainer=function(n){if(n&&q(n).closest(".sapUiDtOverlay, #overlay-container").length){return true;}};c.getClosestOverlayForNode=function(n){var e=E.getClosestElementForNode(n);return c.getClosestOverlayFor(e);};c.findAllSiblingOverlaysInContainer=function(o,r){var p=o.getParentElementOverlay();var R=[];if(p){if(p!==r){var P=c.findAllSiblingOverlaysInContainer(p,r);R=P.map(function(p){var a=p.getAggregationOverlay(o.getParentAggregationOverlay().getAggregationName());return a?a.getChildren():[];}).reduce(function(f,C){return f.concat(C);},[]);}else{R=o.getParentElementOverlay().getAggregationOverlay(o.getParentAggregationOverlay().getAggregationName()).getChildren();}}R=R.filter(function(o){return o.getDesignTimeMetadata();});return R;};c.findAllOverlaysInContainer=function(o){var r=o.getRelevantContainer()||o.getElementInstance();var R=O.getOverlay(r);var a=[];var m=c._findAllSiblingsAndParents(o,R,0);if(m[0]){for(var l in m){a=a.concat(m[l]);}var C=[];m[0].forEach(function(o){C=C.concat(c._findAllChildrenInContainer(o,r));});a=a.concat(C);}else{a=c._findAllChildrenInContainer(o,r);}a.push(R);a=a.filter(function(o){return o.getDesignTimeMetadata();});return a;};c._findAllSiblingsAndParents=function(o,r,l){var p=o.getParentElementOverlay();if(!p){return[];}if(p!==r){var P=c._findAllSiblingsAndParents(p,r,l+1);var d=P[l+1].map(function(p){var a=p.getAggregationOverlay(o.getParentAggregationOverlay().getAggregationName());return a?a.getChildren():[];}).reduce(function(a,b){return a.concat(b);},[]);P[l]=d;return P;}var C=o.getParentElementOverlay().getAggregationOverlay(o.getParentAggregationOverlay().getAggregationName()).getChildren();var R={};R[l]=C;return R;};c._findAllChildrenInContainer=function(e,r,_){_=_?_:[];if(e.getChildren().length>0){e.getChildren().forEach(function(a){a.getChildren().forEach(function(C){if(C.getRelevantContainer()===r){_.push(C);c._findAllChildrenInContainer(C,r,_);}});});}return _;};c.findAllUniqueAggregationOverlaysInContainer=function(o,r){var a=c.findAllSiblingOverlaysInContainer(o,r);return a.map(function(o){return o.getParentAggregationOverlay();}).filter(function(o,p,A){return A.indexOf(o)===p;});};return c;},true);
