/*!
 * SAP APF Analysis Path Framework
 * 
 * (c) Copyright 2012-2014 SAP AG. All rights reserved
 */
jQuery.sap.declare("sap.apf.ui.instance");jQuery.sap.require('sap.apf.ui.utils.print');jQuery.sap.require('sap.apf.ui.utils.constants');jQuery.sap.require('sap.apf.ui.representations.lineChart');jQuery.sap.require('sap.apf.ui.representations.columnChart');jQuery.sap.require('sap.apf.ui.representations.scatterPlotChart');jQuery.sap.require('sap.apf.ui.representations.stackedColumnChart');jQuery.sap.require('sap.apf.ui.representations.table');jQuery.sap.require('sap.apf.ui.representations.pieChart');jQuery.sap.require('sap.apf.ui.representations.percentageStackedColumnChart');jQuery.sap.require('sap.apf.ui.representations.bubbleChart');jQuery.sap.require('sap.apf.ui.representations.barChart');jQuery.sap.require('sap.apf.ui.representations.stackedBarChart');jQuery.sap.require('sap.apf.ui.representations.percentageStackedBarChart');jQuery.sap.require('sap.apf.ui.representations.heatmapChart');jQuery.sap.require('sap.apf.ui.representations.lineChartWithTwoVerticalAxes');jQuery.sap.require('sap.apf.ui.representations.lineChartWithTimeAxis');(function(){'use strict';function s(c,f,S){var l=c.getLayoutView();var a=l.byId("subHeader");a.addContent(f);f.addEventDelegate({onAfterRendering:function(){a.setBusy(false);if(f instanceof sap.ui.comp.smartfilterbar.SmartFilterBar){a.setHeight("");a.addStyleClass(S);if(!f.getFilterBarExpanded()||f.getFilters().length===0){f.addStyleClass("smartFilterBar");}else{f.removeStyleClass("smartFilterBar");}}}});}function r(c){c.getLayoutView().byId("subHeader").setBusy(false);}sap.apf.ui.Instance=function(i){i.uiApi=this;var c=i.oCoreApi;var S=i.oStartFilterHandler;var a;var b;var m;var f,o;var d=c.getUriGenerator().getApfLocation();this.oEventCallbacks={};var e;var g;jQuery.sap.includeStyleSheet(d+"resources/css/apfUi.css","apfCss");jQuery.sap.includeStyleSheet(d+"resources/css/apfPrint.css","printCss");jQuery("#printCss").attr("media","print");this.getAddAnalysisStepButton=function(){return this.getAnalysisPath().getCarousel().addButton;};this.getAnalysisPath=function(){if(b===undefined){b=sap.ui.view({viewName:"sap.apf.ui.reuse.view.analysisPath",type:sap.ui.core.mvc.ViewType.JS,viewData:i});}return b;};this.getNotificationBar=function(){if(m===undefined){m=sap.ui.view({viewName:"sap.apf.ui.reuse.view.messageHandler",type:sap.ui.core.mvc.ViewType.JS,viewData:i});}return m;};this.getStepContainer=function(){if(a===undefined){a=sap.ui.view({viewName:"sap.apf.ui.reuse.view.stepContainer",type:sap.ui.core.mvc.ViewType.JS,viewData:i});}return a;};this.selectionChanged=function(R){var n;function u(){if(n===-1&&g){g.getController().enableDisableOpenIn();}}n=c.getSteps().indexOf(c.getActiveStep());if(R){this.getAnalysisPath().getController().refresh(0);}else{this.getAnalysisPath().getController().refresh(n+1);}c.updatePath(this.getAnalysisPath().getController().callBackForUpdatePath.bind(this.getAnalysisPath().getController()));u();};var I=false;this.createApplicationLayout=function(j){if(!I){j.addPage(this.getLayoutView());I=true;e=j;}return e;};this.getLayoutView=function(){if(g===undefined){g=sap.ui.view({viewName:"sap.apf.ui.reuse.view.layout",type:sap.ui.core.mvc.ViewType.XML,viewData:i});}return g;};this.addDetailFooterContent=function(C){this.getLayoutView().getController().addDetailFooterContentLeft(C);};this.addMasterFooterContentRight=function(C){this.getLayoutView().getController().addMasterFooterContentRight(C);};this.setEventCallback=function(E,C){this.oEventCallbacks[E]=C;};this.getEventCallback=function(E){return this.oEventCallbacks[E];};this.getCustomFormatExit=function(){return i.exits;};this.setCustomFormatExit=function(C){var j=this.getCustomFormatExit();j.customFormat=C;};this.drawSmartFilterBar=function(j){var k=this;function l(n){c.getSmartFilterbarDefaultFilterValues().done(function(C){o=sap.ui.view({viewName:"sap.apf.ui.reuse.view.smartFilterBar",type:sap.ui.core.mvc.ViewType.JS,viewData:{oCoreApi:c,oUiApi:k,oSmartFilterBarConfiguration:n,controlConfiguration:C,parent:k.getLayoutView()}});s(k,o.byId("idAPFSmartFilterBar"),"smartFilterBarContainer");});}if(j){if(j.entitySet){l(j);}else{c.getMetadata(j.service).done(function(n){j.entitySet=n.getEntitySetByEntityType(j.entityType);delete j.entityType;l(j);});}}else{r(k);}};this.drawFacetFilter=function(C){if(C.length>0){f=sap.ui.view({viewName:"sap.apf.ui.reuse.view.facetFilter",type:sap.ui.core.mvc.ViewType.JS,viewData:{oCoreApi:c,oUiApi:this,aConfiguredFilters:C,oStartFilterHandler:S}});s(this,f.byId("idAPFFacetFilter"));}else{r(this);}};this.contextChanged=function(R){var C=this.getEventCallback(sap.apf.core.constants.eventTypes.contextChanged);if(typeof C==="function"){C();}};this.getFacetFilterForPrint=function(){if(f){return f.byId("idAPFFacetFilter");}};this.getSmartFilterForPrint=function(){if(o){return o.byId("idAPFSmartFilterBar");}};this.handleStartup=function(j){var t=this;var p=jQuery.Deferred();c.getSmartFilterBarConfigurationAsPromise().done(function(k){if(k){t.drawSmartFilterBar(k);}j.done(function(l){var n=S.getStartFilters();n.done(function(C){t.contextChanged();if(!k){t.drawFacetFilter(C);}if(l.navigationMode==="backward"){t.getAnalysisPath().getController().bIsBackNavigation=true;c.updatePath(t.getAnalysisPath().getController().callBackForUpdatePath.bind(t.getAnalysisPath().getController()));t.getAnalysisPath().getController().setPathTitle();}if(l.navigationMode==="forward"){if(c.getStartParameterFacade().getSteps()){var q=c.getStartParameterFacade().getSteps()[0].stepId;var u=c.getStartParameterFacade().getSteps()[0].representationId;var w=t.getAnalysisPath().getController().callBackForUpdatePathAndSetLastStepAsActive.bind(t.getAnalysisPath().getController());c.createFirstStep(q,u,w);}}var M=t.getNotificationBar();t.getLayoutView().byId("applicationPage").addContent(M);var x=M.getController().showMessage;c.setCallbackForMessageHandling(x.bind(M.getController()));p.resolve();});});});return p.promise();};this.destroy=function(){f=undefined;o=undefined;if(b){this.getAnalysisPath().getToolbar().getController().oPrintHelper=undefined;this.getAnalysisPath().getCarousel().dndBox=undefined;var t=this.getAnalysisPath().getToolbar().getController();h(t.saveDialog);h(t.newOpenDilog);h(t.newDialog);h(t.delConfirmDialog);h(t.confirmDialog);h(t.confrimLogoffDialog);h(t.errorMsgDialog);h(t.noPathAddedDialog);if(t.deleteAnalysisPath!==undefined){h(t.deleteAnalysisPath.getController().oDialog);}if(t.pathGallery!==undefined){h(t.pathGallery.getController().oDialog);}var j=this.getAnalysisPath().getCarousel().getStepGallery().getController();h(j.oHierchicalSelectDialog);}if(a){var k=this.getStepContainer().getController();h(k.selectionDisplayDialog);v(this);}};function h(j){if(j!==undefined){if(j instanceof sap.m.ViewSettingsDialog){j.destroy();}else if(j.isOpen()){j.close();}}}function v(j){var k=false;var l=false;var n;if(j.getStepContainer().getViewData().oCoreApi.getActiveStep()!==undefined){k=true;}if(k){n=j.getStepContainer().getViewData().oCoreApi.getActiveStep().getSelectedRepresentation();if(n!==undefined){l=true;}}if(l){if(n.type!==sap.apf.ui.utils.CONSTANTS.representationTypes.TABLE_REPRESENTATION){if(n.toggleInstance!==undefined){h(n.toggleInstance.viewSettingsDialog);}}else{h(n.viewSettingsDialog);}}}};}());