/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)

		(c) Copyright 2009-2017 SAP SE. All rights reserved
	
 */
sap.ui.define(["jquery.sap.global","sap/ui/fl/Utils","sap/ui/fl/changeHandler/Base"],function(q,F,B){"use strict";var C={};C._evaluteElementForIndex=function(m,g){var M=-1;var s=[];var b=g.some(function(G){s=m.getAggregation(G,"fields");return s.some(function(S){M++;return m.getProperty(S,"mandatory");});});if(b){return M;}return-1;};C.applyChange=function(c,o,p){var a=c.getDefinition();var M=p.modifier;var A=p.appComponent;var v=p.view;var s=M.bySelector(a.content.sourceSelector,A,v);var l=[];var L;var P;var t;var b;var S=[];var g=a.content.combineFieldSelectors.map(function(e){return M.bySelector(e,A,v);});var d=this._evaluteElementForIndex(M,g);if(d>0){M.setProperty(s,"elementForLabel",d);}var I=sap.ui.getCore().getConfiguration().getRTL();for(var i=0;i<g.length;i++){L="fieldLabel"+i.toString();t=a.texts[L];if(t&&t.value!==P&&t.value.length>0){I?l.unshift(t.value):l.push(t.value);P=t.value;}S=M.getAggregation(g[i],"elements");if(g[i]!==s){for(var k=0,m=S.length;k<m;k++){M.removeAggregation(g[i],"elements",S[k]);M.insertAggregation(s,"elements",S[k],i+k,v);}b=M.getParent(g[i]);M.removeAggregation(b,"groupElements",g[i]);M.insertAggregation(b,"dependents",g[i],0,v);}}if(l.length>0){M.setProperty(s,"label",l.join("/"));}return true;};C.completeChangeContent=function(c,s,p){var m=p.modifier;var a=p.appComponent;var o=c.getDefinition();var b=s.combineFieldIds;if(b&&b.length>=2){o.content.combineFieldSelectors=b.map(function(d){return m.getSelector(d,a);});c.addDependentControl(b,"combinedFields",p);}else{throw new Error("oSpecificChangeInfo.combineFieldIds attribute required");}if(s.sourceControlId){o.content.sourceSelector=m.getSelector(s.sourceControlId,a);c.addDependentControl(s.sourceControlId,"sourceControl",p);}else{throw new Error("oSpecificChangeInfo.sourceControlId attribute required");}var t;var f;var g;for(var i=0;i<b.length;i++){g=m.byId(b[i]);t=g.getLabelText();if(t){f="fieldLabel"+i;B.setTextInChange(o,f,t,"XFLD");}}};return C;},true);
