/*
 * ! SAP UI development toolkit for HTML5 (SAPUI5)

		(c) Copyright 2009-2017 SAP SE. All rights reserved
	
 */
sap.ui.define(['jquery.sap.global','sap/ui/base/EventProvider','sap/ui/model/json/JSONModel','sap/m/Select'],function(q,E,J,S){"use strict";var T=E.extend("sap.ui.comp.config.condition.Type",{constructor:function(f,F,o){E.call(this);this.oFilterProvider=F;var d={condition:{operation:"",value1:null,value2:null,key:f},operations:[],controls:[],currentoperation:{},pending:false};this.oModel=new J(d);var c=this.oModel.checkUpdate;this.oModel.suspend=function(){this.bSuspended=true;this.checkUpdate=function(){};};this.oModel.resume=function(){this.bSuspended=false;this.checkUpdate=c;this.checkUpdate();};this.oContext=this.oModel.getContext("/");this.oConditionContext=this.oModel.getContext("/condition");this.sFieldName=f;var O=this.oModel.bindProperty("operation",this.oConditionContext),t=this;O.attachChange(function(){var s=t.oModel.getProperty("operation",t.getConditionContext()),a=t.getOperation(s);if(a){a=q.extend({},a);if(!t.bIgnoreBindingChange){var D=t.getDefaultValues(a);t.setDefaultValues(D[0],D[1]);}}t.setControls([]);t.setControls(t.getControls(a));if(a){if(a.getValueList){a.valueList=a.getValueList();}t.oModel.setProperty("/currentoperation",a);}if(!t.bIgnoreBindingChange){t.serialize(false,t.bFireFilterChange);}});var v=this.oModel.bindProperty("value1",this.oConditionContext);v.attachChange(function(){if(!t.bIgnoreBindingChange){t.serialize(false,t.bFireFilterChange);}});var V=this.oModel.bindProperty("value2",this.oConditionContext);V.attachChange(function(){if(!t.bIgnoreBindingChange){t.serialize(false,t.bFireFilterChange);}});var p=this.oModel.bindProperty("pending",this.oContext);p.attachChange(function(){if(t.bAsync){if(t._iPendingTimer){q.sap.clearDelayedCall(t._iPendingTimer);}t._iPendingTimer=q.sap.delayedCall(10,t,"fireEvent",["PendingChange",{oSource:t,pending:t.oModel.getProperty("/pending")}]);}});this._oOperationSelect=null;this.oFieldMetadata=o;this.oOperationFilter=null;this.bAsync=false;}});T._createStableId=function(i,s){if(i&&i.oFilterProvider&&i.oFieldMetadata){return i.oFilterProvider._createFilterControlId(i.oFieldMetadata)+(s?s:"");}else{return undefined;}};T.getTranslatedText=function(t,r){if(typeof t==="object"){r=t.bundle;t=t.key;}if(!r){r="sap.ui.comp";}return sap.ui.getCore().getLibraryResourceBundle(r).getText(t)||t;};T.prototype.getTranslatedText=T.getTranslatedText;T.prototype.applySettings=function(s){if(s&&s.operations&&s.operations.filter){this.oOperationFilter=s.operations.filter;}else{this.oOperationFilter=null;}};T.prototype.getParent=function(){return this.oFilterProvider._oSmartFilter;};T.prototype.getModel=function(){return this.oModel;};T.prototype.getConditionContext=function(){return this.oConditionContext;};T.prototype.setDefaultValues=function(v,V){this.oModel.setProperty("value1",v,this.getConditionContext(),true);this.oModel.setProperty("value2",V,this.getConditionContext(),true);};T.prototype.getContext=function(){return this.oContext;};T.prototype.getControls=function(o){return[];};T.prototype.getOperations=function(){return[];};T.prototype.isPending=function(){return this.getModel().getProperty("pending",this.getContext());};T.prototype.attachPendingChange=function(h){this.attachEvent("PendingChange",h);};T.prototype.detachPendingChange=function(h){this.detachEvent("PendingChange",h);};T.prototype.setPending=function(v){if(this.bAsync){this.getModel().setProperty("pending",v,this.getContext());}};T.prototype._filterOperation=function(o){if(!this.oOperationFilter){return true;}var f=this.oOperationFilter,v=o[f.path];if(f.path&&f.contains&&v){var e=f.exclude||false,F=(typeof f.contains==="string")?f.contains.split(","):f.contains,r=e;for(var j=0;j<F.length;j++){if(e&&v.indexOf(F[j])>-1){r=false;}else if(!e&&v.indexOf(F[j])>-1){r=true;}}}return r;};T.prototype._updateOperation=function(o){if(!o.textValue){o.textValue="";}if(!o.languageText&&o.textKey){o.languageText=this.getTranslatedText(o.textKey);}};T.prototype.updateOperations=function(){this.oModel.setProperty("operations",[],this.getContext());};T.prototype.getOperation=function(o){var O=this.oModel.getProperty("operations",this.getContext())||[];for(var i=0;i<O.length;i++){if(o===O[i].key){return O[i];}}return null;};T.prototype.getDefaultOperation=function(){var o=this.getOperations();if(!o||o.length===0){return null;}for(var i=0;i<o.length;i++){if(o[i].defaultOperation){return o[i];}}return o[0];};T.prototype.setControls=function(c){var o=this.oModel.getProperty("controls",this.getContext());if(o){for(var i=0;i<o.length;i++){o[i].destroy();}}this.oModel.setProperty("controls",c,this.getContext());if(c){for(var i=0;i<c.length;i++){c[i].setBindingContext(this.getConditionContext(),"$smartEntityFilter");}this._setAriaLabeledByToControls(c);}};T.prototype._setAriaLabeledByToControls=function(c){if(this._oOperationLabel&&c){for(var i=0;i<c.length;i++){if(c[i].addAriaLabelledBy){if(c[i].getAriaLabelledBy().indexOf(this._oOperationLabel.getId())===-1){c[i].addAriaLabelledBy(this._oOperationLabel);}}}}};T.prototype.setOperation=function(o){var O=this.getOperation(o);if(O){this.setCondition({operation:O.key,key:this.sFieldName,value1:O.defaultValues[0]||null,value2:O.defaultValues[1]||null});this.getModel().checkUpdate(true);}else{}};T.prototype.isValidCondition=function(){return false;};T.prototype.setCondition=function(c){this.oModel.setProperty("key",c.key,this.oConditionContext);this.oModel.setProperty("operation",c.operation,this.oConditionContext);this.oModel.setProperty("value1",c.value1,this.oConditionContext);this.oModel.setProperty("value2",c.value2,this.oConditionContext);this.oModel.setProperty("tokenText",this.getTokenText(c),this.oConditionContext);return this;};T.prototype.setAsync=function(a){this.bAsync=a;};T.prototype.getAsync=function(a){return this.bAsync;};T.prototype.initialize=function(j){this.updateOperations();};T.prototype.serialize=function(){};T.prototype.validate=function(f){this._bForceError=f!==false;var i=this.getModel().getProperty("inputstate",this.getContext())||"NONE";if(!this.isPending()&&this.oFieldMetadata&&this.oFieldMetadata.isMandatory&&(!this.isValidCondition()||i!=="NONE")&&this._bForceError){this.getModel().setProperty("inputstate","ERROR",this.getContext());return false;}this.getModel().setProperty("inputstate","NONE",this.getContext());return true;};T.prototype.getCondition=function(){var c=q.extend({},this.oModel.getProperty("",this.oConditionContext));return c;};T.prototype.providerDataUpdated=function(u,d){};T.prototype.getFilter=function(f){return null;};T.prototype.getFilterRanges=function(p){return null;};T.prototype.getTokenText=function(o){return"";};T.prototype.getName=function(){return this.getMetadata().getName();};T.prototype.getType=function(){return"Edm";};T.prototype._initializeFilterItemPopoverContent=function(l){var o=new sap.m.Label({text:T.getTranslatedText("CONDITION_DATERANGETYPE_POPOVER_LABEL")});l.addItem(o);this._oOperationLabel=o;var O=new sap.m.Select(T._createStableId(this,"select"),{width:"100%",ariaLabelledBy:o});if(O._oList&&O._oList.setShowSecondaryValues){O._oList.setShowSecondaryValues(true);}O.bindProperty("selectedKey",{path:"$smartEntityFilter>condition/operation"});O.bindAggregation("items",{path:"$smartEntityFilter>operations",sorter:new sap.ui.model.Sorter("order",false,false),filters:new sap.ui.model.Filter("order",function(v){return v!==undefined&&v>-1;}),template:new sap.ui.core.ListItem({text:{path:"$smartEntityFilter>languageText"},key:{path:"$smartEntityFilter>key"},additionalText:{path:"$smartEntityFilter>textValue"}})});O.setBindingContext(this.getContext(),"$smartEntityFilter");var L=this.getModel().bindList("controls",this.getContext());L.attachChange(function(){var n=L.getModel().getProperty("controls",L.getContext());if(n){for(var i=0;i<n.length;i++){l.addItem(n[i]);}}});l.addItem(O);o.setLabelFor(O);this._oOperationSelect=O;l.setModel(this.getModel(),"$smartEntityFilter");this.bIgnoreBindingChange=true;this.getModel().checkUpdate(true);this.bIgnoreBindingChange=false;this.oLayout=l;};T.prototype.destroy=function(){this.setControls([]);this.oLayout=null;E.prototype.destroy.apply(this,arguments);};return T;},true);