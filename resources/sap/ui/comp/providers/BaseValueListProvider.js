/*
 * ! SAP UI development toolkit for HTML5 (SAPUI5)

		(c) Copyright 2009-2017 SAP SE. All rights reserved
	
 */
sap.ui.define(['jquery.sap.global','sap/ui/base/EventProvider','sap/ui/comp/odata/ODataType','sap/ui/comp/odata/MetadataAnalyser','sap/ui/comp/util/FormatUtil'],function(q,E,O,M,F){"use strict";var B=E.extend("sap.ui.comp.providers.BaseValueListProvider",{constructor:function(p){E.call(this);this.sFieldName=p.fieldName;this.oControl=p.control;this.sValueListEntitySetName=null;this.oODataModel=p.model;this.oFilterModel=p.filterModel;this.oFilterProvider=p.filterProvider;this.sDisplayFormat=p.displayFormat;this._oDateFormatSettings=p.dateFormatSettings;this._fieldViewMetadata=p.fieldViewMetadata;if(!this._oDateFormatSettings){this._oDateFormatSettings={};}if(!this._oDateFormatSettings.hasOwnProperty("UTC")){this._oDateFormatSettings["UTC"]=true;}this.bResolveInOutParams=(p.resolveInOutParams===false)?false:true;this.sDisplayBehaviour=p.displayBehaviour;this.sDDLBDisplayBehaviour=this.sDisplayBehaviour;if(!this.sDDLBDisplayBehaviour||this.sDDLBDisplayBehaviour===sap.ui.comp.smartfilterbar.DisplayBehaviour.auto){this.sDDLBDisplayBehaviour=this.oFilterProvider?this.oFilterProvider.sDefaultDropDownDisplayBehaviour:sap.ui.comp.smartfilterbar.DisplayBehaviour.descriptionOnly;}this.sPropertyTypePath="";if(this.bResolveInOutParams&&!this.oFilterModel&&!this.oFilterProvider){this._resolvePropertyPath();}if(p.loadAnnotation&&p.fullyQualifiedFieldName){this._oMetadataAnalyser=p.metadataAnalyser;this._sFullyQualifiedFieldName=p.fullyQualifiedFieldName;this._attachAnnotationLoadOnRender();}else{this._onAnnotationLoad({primaryValueListAnnotation:p.annotation,additionalAnnotations:p.additionalAnnotations});}if(!sap.ui.comp.smartfilterbar||!sap.ui.comp.smartfilterbar.FilterProvider){q.sap.require("sap.ui.comp.smartfilterbar.FilterProvider");}}});B.prototype._attachAnnotationLoadOnRender=function(){this.oBeforeRenderingEventDelegate={onBeforeRendering:function(){this.oControl.removeEventDelegate(this.oBeforeRenderingEventDelegate,this);delete this.oBeforeRenderingEventDelegate;if(!this._bValueListRequested){if(this.bInitialised){if(this._onMetadataInitialised&&this.sAggregationName&&!this.bTypeAheadEnabled&&this.oControl.$()){this._onMetadataInitialised();}}else{this._loadAnnotation();}}}};this.oControl.addEventDelegate(this.oBeforeRenderingEventDelegate,this);};B.prototype.loadAnnotation=function(){if(this.oBeforeRenderingEventDelegate){this.oControl.removeEventDelegate(this.oBeforeRenderingEventDelegate,this);delete this.oBeforeRenderingEventDelegate;}if(this.oAfterRenderingEventDelegate){this.oControl.removeEventDelegate(this.oAfterRenderingEventDelegate,this);delete this.oAfterRenderingEventDelegate;}this._loadAnnotation();};B.prototype._loadAnnotation=function(){if(!this._bValueListRequested){this._bValueListRequested=true;if(!this._oMetadataAnalyser){this._oMetadataAnalyser=new M(this.oODataModel);this._bCleanupMetadataAnalyser=true;}this._oMetadataAnalyser.getValueListAnnotationLazy(this._sFullyQualifiedFieldName).then(this._onAnnotationLoad.bind(this),function(e){this._oError=e;this.bInitialised=true;q.sap.log.debug(e);}.bind(this));}};B.prototype.attachValueListChanged=function(f,l){this.attachEvent("valueListChanged",f,l);};B.prototype.detachValueListChanged=function(f,l){this.detachEvent("valueListChanged",f,l);};B.prototype._onAnnotationLoad=function(v){this.oPrimaryValueListAnnotation=v.primaryValueListAnnotation;this.additionalAnnotations=v.additionalAnnotations;this._resolveAnnotationData(this.oPrimaryValueListAnnotation);this.bInitialised=true;if(this._onMetadataInitialised&&this.sAggregationName&&!this.bTypeAheadEnabled&&this.oControl.$()){this._onMetadataInitialised();}};B.prototype._resolvePropertyPath=function(){var b=this.oControl.getBindingInfo("value"),p,P,a;if(b&&b.parts){p=b.parts[0]?b.parts[0].path:"";}if(p){a=p.split("/");if(a.length>1){P=a[a.length-1];this.sPropertyTypePath=p.replace("/"+P,"");}}};B.prototype._resolveAnnotationData=function(a){var l=0,i=0,c,f,t,T,C,o;if(this.oODataModel&&a){this.bSupportBasicSearch=a.isSearchSupported;this.sValueListTitle=a.valueListTitle||a.qualifier;this.sKey=a.keyField;this._aKeys=a.keys;this.sValueListEntitySetName=a.valueListEntitySetName;this.mInParams=a.inParams;this.mOutParams=a.outParams;this.sTokenDisplayBehaviour=this.sDisplayBehaviour;if(!this.sTokenDisplayBehaviour||this.sTokenDisplayBehaviour===sap.ui.comp.smartfilterbar.DisplayBehaviour.auto){this.sTokenDisplayBehaviour=this.oFilterProvider?this.oFilterProvider.sDefaultTokenDisplayBehaviour:sap.ui.comp.smartfilterbar.DisplayBehaviour.descriptionAndId;}if(!a.descriptionField){this.sTokenDisplayBehaviour=sap.ui.comp.smartfilterbar.DisplayBehaviour.idOnly;}this.sDescription=a.descriptionField||this.sKey;if(this.sValueListEntitySetName&&this.sKey){this._aCols=[];this.aSelect=[];c=a.valueListFields;l=c.length;for(i=0;i<l;i++){f=c[i];t=null;T=null;C=undefined;o=undefined;if(f.type==="Edm.Boolean"){t="boolean";}else if(f.type==="Edm.DateTime"&&f.displayFormat==="Date"){t="date";o=this._oDateFormatSettings;C={displayFormat:"Date"};}else if(f.type==="Edm.Decimal"){t="decimal";C={precision:f.precision,scale:f.scale};}else if(f.type==="Edm.String"){t="string";}T=O.getType(f.type,o,C);if(f.visible){this._aCols.push({label:f.fieldLabel,tooltip:f.quickInfo||f.fieldLabel,type:t,oType:T,width:F.getWidth(f,15),template:f.name,sort:f.sortable?f.name:undefined,sorted:f.sortable&&f.name===this.sKey,sortOrder:"Ascending"});}this.aSelect.push(f.name);}if(a.descriptionField){this.aSelect.push(a.descriptionField);}}else{if(!this.sKey){q.sap.log.error("BaseValueListProvider","key for ValueListEntitySetName '"+this.sValueListEntitySetName+"' missing! Please check your annotations");}}}};B.prototype._getFilterData=function(){var d,f={};if(this.oFilterProvider&&this.oFilterProvider._oSmartFilter){d=this.oFilterProvider._oSmartFilter.getFilterData();if(this._fieldViewMetadata&&this._fieldViewMetadata.fieldName&&(this._fieldViewMetadata.fieldName.indexOf(sap.ui.comp.ANALYTICAL_PARAMETER_PREFIX)===0)){Object.keys(d).forEach(function(n){var a=n.split(sap.ui.comp.ANALYTICAL_PARAMETER_PREFIX);f[a[a.length-1]]=d[n];});return f;}}return d;};B.prototype._setFilterData=function(f){var d=f,o={};if(this.oFilterProvider){if(this._fieldViewMetadata&&this._fieldViewMetadata.fieldName&&(this._fieldViewMetadata.fieldName.indexOf(sap.ui.comp.ANALYTICAL_PARAMETER_PREFIX)===0)){Object.keys(f).forEach(function(n){o[sap.ui.comp.ANALYTICAL_PARAMETER_PREFIX+n]=f[n];});d=o;}this.oFilterProvider.setFilterData(d);}};B.prototype._calculateFilterInputData=function(){var l,v,d=null;delete this.mFilterInputData;if(this.oFilterProvider&&this.oFilterProvider._oSmartFilter){d=this._getFilterData();}else if(this.oFilterModel){d=this.oFilterModel.getData();}else if(this.oODataModel&&this.bResolveInOutParams){d=this.oODataModel.getData(this.sPropertyTypePath,this.oControl.getBindingContext());}if(this.mInParams&&d){this.mFilterInputData={};this.aFilterField=[];for(l in this.mInParams){if(l){v=this.mInParams[l];if(v!==this.sKey){if(d[l]){this.mFilterInputData[v]=d[l];this.aFilterField.push(v);}}}}}};B.prototype._calculateAndSetFilterOutputData=function(d){var l,v,f=null,D,e,n,i,a;if(this.mOutParams&&d&&(this.oFilterProvider||this.oFilterModel)){f={};a=function(o){return o.key===n.key;};for(l in this.mOutParams){if(l){v=this.mOutParams[l];if(v!==this.sKey){e=null;i=d.length;while(i--){D=d[i];if(D[v]){n={key:D[v]};if(!f[l]){if(!e&&this.oFilterModel){e=this.oFilterModel.getData();}if(e&&e[l]&&e[l].items){f[l]=e[l];}else{f[l]={items:[]};}}if(f[l].items.filter(a).length<=0){var b=false;if(this.oFilterProvider&&e&&e[l]&&e[l].ranges){e[l].ranges.some(function(r){if(r.operation==="EQ"&&r.value1===n.key){b=true;}return b;});}if(!b){f[l].items.push(n);}}}}}}}if(f){if(this.oFilterProvider){this._setFilterData(f);if(!q.isEmptyObject(f)){this.fireEvent("valueListChanged",{"changes":Object.keys(f)});}}else if(this.oFilterModel){this.oFilterModel.setData(f,true);}}}else if(this.oODataModel&&this.bResolveInOutParams){this._calculateAndSetODataModelOutputData(d[0]);}};B.prototype._calculateAndSetODataModelOutputData=function(d){var b,l,v,p,V,c={};if(d&&this.mOutParams){b=this.oControl.getBindingContext();for(l in this.mOutParams){if(l){v=this.mOutParams[l];if(v!==this.sKey){V=d[v];c[l]=V;p=this.sPropertyTypePath?this.sPropertyTypePath+"/"+l:l;this.oODataModel.setProperty(p,V,b,true);}}}if(c&&!q.isEmptyObject(c)){this.fireEvent("valueListChanged",{"changes":c});}}};B.prototype.destroy=function(){sap.ui.base.EventProvider.prototype.destroy.apply(this,arguments);if(this._bCleanupMetadataAnalyser&&this._oMetadataAnalyser){this._oMetadataAnalyser.destroy();}this._oMetadataAnalyser=null;this.oControl=null;this.sFieldName=null;this.mFilterInputData=null;this.aFilterField=null;this.sValueListEntitySetName=null;this.oODataModel=null;this.oFilterModel=null;this.oFilterProvider=null;this.oPrimaryValueListAnnotation=null;this.additionalAnnotations=null;this.sDisplayFormat=null;this.bSupportBasicSearch=null;this.bInitialised=null;this._oError=null;this.sValueListTitle=null;this.sKey=null;this._aKeys=null;this.mInParams=null;this.mOutParams=null;this.sDescription=null;this.aSelect=null;this._aCols=null;this.sDDLBDisplayBehaviour=null;this.sTokenDisplayBehaviour=null;this._oDateFormatSettings=null;this.bIsDestroyed=true;};return B;},true);
