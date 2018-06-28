/*!
* SAP APF Analysis Path Framework
* 
 * (c) Copyright 2012-2014 SAP SE. All rights reserved
*/
(function(){'use strict';sap.ui.controller("sap.apf.ui.reuse.controller.smartFilterBar",{onInit:function(){var c=this;var s=c.getView().getViewData().oSmartFilterBarConfiguration.service;var a=c.getView().getViewData().oCoreApi.getAnnotationsForService(s);var p={loadMetadataAsync:true,annotationURI:a,json:true};var b=c.getView().getViewData().oCoreApi.getStartParameterFacade().getSapSystem();if(b){s=sap.ui.model.odata.ODataUtils.setOrigin(s,{force:true,alias:b});}var m=new sap.ui.model.odata.ODataModel(s,p);m.getMetaModel().loaded().then(function(){c.getView().getViewData().oCoreApi.getMetadata(s).done(function(d){if(d.getAllEntitySetsExceptParameterEntitySets().indexOf(c.getView().getViewData().oSmartFilterBarConfiguration.entitySet)<0){c.getView().getViewData().oCoreApi.putMessage(c.getView().getViewData().oCoreApi.createMessageObject({code:"5053",aParameters:[c.getView().getViewData().oSmartFilterBarConfiguration.entitySet,s]}));}m.setCountSupported(false);c.byId("idAPFSmartFilterBar").setModel(m);});});m.attachMetadataFailed(function(){c.getView().getViewData().oCoreApi.putMessage(c.getView().getViewData().oCoreApi.createMessageObject({code:"5052",aParameters:[s]}));});},afterInitialization:function(){this.validateFilters();this.registerSFBInstanceWithCore();},registerSFBInstanceWithCore:function(){var c=this;c.getView().getViewData().oCoreApi.registerSmartFilterBarInstance(c.byId("idAPFSmartFilterBar"));},handlePressOfGoButton:function(){var c=this;if(c.getView().getViewData().oCoreApi.getActiveStep()){c.getView().getViewData().oUiApi.selectionChanged(true);}},validateFilters:function(){var s=this.byId("idAPFSmartFilterBar");var v=s.validateMandatoryFields();this.getView().getViewData().oUiApi.getAddAnalysisStepButton().setEnabled(v);this.getView().getViewData().oUiApi.getAddAnalysisStepButton().rerender();}});}());
