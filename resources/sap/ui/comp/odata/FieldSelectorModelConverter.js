/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)

		(c) Copyright 2009-2017 SAP SE. All rights reserved
	
 */
sap.ui.define(['jquery.sap.global','./MetadataAnalyser'],function(q,M){"use strict";var F=function(d){this._oMetadataAnalyzer=new M(d);this._aEntityTypes=[];this.invisibleFields={};};F.prototype.getMetaDataAnalyzer=function(){return this._oMetadataAnalyzer;};F.prototype.getConvertedModel=function(E,i){var c={};this._aEntityTypes=this._getEntityTypes(E);for(var e=0;e<this._aEntityTypes.length;e++){var f=this._oMetadataAnalyzer.getFieldsByEntityTypeName(this._aEntityTypes[e].key);if(f){c[this._aEntityTypes[e].key]=this._updateAndFilterFields(f,i,false,this._aEntityTypes[e].key);}}return c;};F.prototype.getEntityTypes=function(){return this._aEntityTypes;};F.prototype.getAllEntityTypeNames=function(){if(this._oMetadataAnalyzer){return this._oMetadataAnalyzer.getAllEntityTypeNames();}return null;};F.prototype._updateAndFilterFields=function(a,i,I,k){var v=[];for(var f=0;f<a.length;f++){var c=a[f];if(c.visible===false){this.invisibleFields[k]=this.invisibleFields[k]||[];if(this.invisibleFields[k].indexOf(c)===-1){c.isComplexType=I;this.invisibleFields[k].push(c);}continue;}var b=this._isFieldOnIgnoreList(c,i,I);var d=this._isFieldBlacklisted(c);if(!b&&!d){if(this._isComplexType(c)===true){var V=this._resolveComplexTypeToFlatFieldList(c,i);if(V){v=v.concat(V);}}else{v.push(c);}}}return v;};F.prototype._isComplexType=function(f){if(f&&f.type){if(f.type.toLowerCase().indexOf("edm")!==0){return true;}}return false;};F.prototype._resolveComplexTypeToFlatFieldList=function(c,I){var r=[];var s=this._oMetadataAnalyzer.getSchemaDefinition();if(c&&c.type&&s){var t=this._getComplexTypeName(c);if(t){var C=s.complexType;var i=0;for(i=0;i<C.length;i++){var o=C[i];if(o.name===t){r=this._getFieldsFromComplexType(o,I);break;}}}}return r;};F.prototype._getFieldsFromComplexType=function(c,i){var f=this._oMetadataAnalyzer.getFieldsByComplexTypeName(c.name);if(f){return this._updateAndFilterFields(f,i,true,c.name);}return[];};F.prototype._getComplexTypeName=function(c){var t=c.type.split(".");if(t.length===2){return t[1];}return null;};F.prototype._isFieldOnIgnoreList=function(c,i,I){if(i){var n=this._aEntityTypes.length;var Q=c.entityName+"."+c.name;if(n===1&&!I){if(i.indexOf(c.name)!==-1||i.indexOf(Q)!==-1){return true;}}else if(i.indexOf(Q)!==-1){return true;}}return false;};F.prototype._isFieldBlacklisted=function(c){if(c){if(c.name.toLowerCase().indexOf("uxfc")===0){return true;}else if(c.type.toLowerCase()==="edm.time"){return true;}}return false;};F.prototype._getEntityTypes=function(E,a){var b=[];var l;var c;if(!this._oMetadataAnalyzer||!this._oMetadataAnalyzer._oSchemaDefinition){return[];}var A=this._oMetadataAnalyzer._oSchemaDefinition.entityType;if(!E){c=[];for(var t=0;t<A.length;t++){c.push(A[t].name);}}if(!c){c=this._convertEntityTypesToArray(E);}for(var e=0;e<c.length;e++){l=this._oMetadataAnalyzer.getEntityLabelByEntityTypeName(c[e]);b.push({key:c[e],label:l||c[e]});}return b;};F.prototype._convertEntityTypesToArray=function(e){if(typeof(e)==="string"){var r=e.replace(/ /g,'');return r.split(',');}if(q.isArray(e)){return e;}return undefined;};F.prototype.destroy=function(){if(this._oMetadataAnalyzer&&this._oMetadataAnalyzer.destroy){this._oMetadataAnalyzer.destroy();}this._oMetadataAnalyzer=null;this._aEntityTypes=null;};return F;},true);
