/*!
 * SAP APF Analysis Path Framework
 *
 * (c) Copyright 2012-2014 SAP SE. All rights reserved
 */
jQuery.sap.require('sap.apf.modeler.ui.utils.helper');jQuery.sap.require("sap.apf.modeler.ui.utils.nullObjectChecker");jQuery.sap.require("sap.apf.modeler.ui.utils.optionsValueModelBuilder");(function(){"use strict";var c,a;var n=new sap.apf.modeler.ui.utils.NullObjectChecker();var o=new sap.apf.modeler.ui.utils.OptionsValueModelBuilder();function _(C){var t=c.getText;C.byId("idAppPage").setTitle(t("configModelerTitle"));C.byId("idAppTitle").setText(t("applicationOverview"));C.byId("idAppNumberTitle").setText(t("applications"));C.byId("idDescriptionLabel").setText(t("description"));C.byId("idSemanticObjectLabel").setText(t("semanticObject"));C.byId("idEditButton").setText(t("edit"));C.byId("idSaveButton").setText(t("save"));C.byId("idCancelButton").setText(t("cancel"));C.byId("idTextCleanupButton").setText(t("textCleanUp"));C.byId("idImportButton").setText(t("import"));C.byId("idNewButton").setTooltip(t("newApplication"));C.byId("idDeleteIcon").setTooltip(t("deleteButton"));C.byId("idAriaPropertyForDelete").setText(t("ariaTextForDeleteIcon"));}function b(){var t=c.getText;sap.ui.core.Fragment.byId("idDeleteConfirmationFragment","idDeleteConfirmation").setTitle(t("confirmation"));sap.ui.core.Fragment.byId("idDeleteConfirmationFragment","idDeleteButton").setText(t("deleteButton"));sap.ui.core.Fragment.byId("idDeleteConfirmationFragment","idCancelButtonDialog").setText(t("cancel"));}function d(){var t=c.getText;sap.ui.core.Fragment.byId("idUnsavedDataConfirmationFragment","idMessageDialog").setTitle(t("confirmation"));sap.ui.core.Fragment.byId("idUnsavedDataConfirmationFragment","idYesButton").setText(t("yes"));sap.ui.core.Fragment.byId("idUnsavedDataConfirmationFragment","idNoButton").setText(t("no"));sap.ui.core.Fragment.byId("idUnsavedDataConfirmationFragment","idCancelButton").setText(t("cancel"));}function e(C){var i=a.getList();C.byId("idAppCount").setText("("+i.length+")");var A=[];i.forEach(function(j){var r={};r.id=j.Application;r.description=j.ApplicationName;r.semanticObject=j.SemanticObject;A.push(r);});var M=o.prepareModel(A,A.length);C.byId("idApplicationTable").setModel(M);}function f(M){var i=c.createMessageObject({code:M});c.putMessage(i);}function g(C){C.byId("idAppDescription").attachBrowserEvent("click",C.handleNavigationToConfigurationList.bind(C));C.byId("idSemanticObject").attachBrowserEvent("click",C.handleNavigationToConfigurationList.bind(C));C.byId("idApplicationTable").attachEvent("addNewAppEvent",C.handleAdditionOfNewApp.bind(C));C.byId("idApplicationTable").attachEvent("updateAppListEvent",C.handleAppListUpdateAfterImport.bind(C));}function h(C,v){var V,i;V={oParentControl:C.byId("idApplicationTable"),oCoreApi:c};i=new sap.ui.view({viewName:"sap.apf.modeler.ui.view."+v,type:sap.ui.core.mvc.ViewType.XML,viewData:V});C.getView().addDependent(i);}function k(C,D,i,j){C.getView().addDependent(D);var M=new sap.m.Label({text:c.getText(i)}).addStyleClass("dialogText");D.removeAllContent();D.addContent(M);if(j){D.removeAllCustomData();D.addCustomData(j);}D.open();}function l(C){var s=C.byId("idAppListScrollContainer");var A=C.byId("idApplicationTable");var v=C.getView();A.addEventDelegate({onAfterRendering:function(){var i=jQuery(window).height();var j=jQuery(v.byId("idAppTitle").getDomRef()).height();var r=jQuery(v.byId("idApplicationToolbar").getDomRef()).height();var t=jQuery(v.byId("idAppPage").getDomRef()).find("header").height();var u=jQuery(v.byId("idAppPage").getDomRef()).find("footer").height();var w;if(j>0){j=j+80;w=j+r+t+u+25;}else{w=232;}s.setHeight(i-w+"px");s.setWidth("100%");sap.apf.modeler.ui.utils.helper.onResize(function(){if(jQuery(v.getDomRef()).css("display")==="block"){i=jQuery(v.byId("idAppPage").getDomRef()).height();s.setHeight(i-w+"px");s.setWidth("100%");}});sap.ui.core.UIComponent.getRouterFor(C).attachRoutePatternMatched(function(E){if(E.getParameter("name")==="applicationList"){i=jQuery(v.getDomRef()).height();s.setHeight(i-w+"px");s.setWidth("100%");}});}});}function m(C,E){var i=new sap.m.StandardListItem({title:c.getText("importDeliveredContent"),type:sap.m.ListType.Active,press:function(){h(C,"importDeliveredContent");}});var j=new sap.m.StandardListItem({title:c.getText("importFiles"),type:sap.m.ListType.Active,press:function(){h(C,"importFiles");}});var P=new sap.m.Popover({placement:sap.m.PlacementType.Top,showHeader:false});var A=new sap.m.List({items:[i,j]});P.addContent(A);P.openBy(E.getSource());}function p(M,i){var j=c.createMessageObject({code:M});if(i){j.setPrevious(i);}c.putMessage(j);}function q(C){C.byId("idNewButton").setEnabled(true);C.byId("idEditButton").setVisible(true);C.byId("idSaveButton").setVisible(false);C.byId("idSaveButton").setEnabled(false);C.byId("idTextCleanupButton").setEnabled(false);C.byId("idCancelButton").setVisible(false);C.byId("idTextCleanupButton").setVisible(false);C.byId("idApplicationTable").setMode("None");C.byId("idImportButton").setVisible(true);var i=C.byId("idApplicationTable").getItems();i.forEach(function(j){j.setType("Navigation");j.getCells()[0].setEditable(false);j.getCells()[1].setEditable(false);j.getCells()[2].setVisible(false);});e(C);}sap.ui.controller("sap.apf.modeler.ui.controller.applicationList",{onInit:function(){var C=this;var i=C.getOwnerComponent();if(n.checkIsNotUndefined(i)){c=i.oCoreApi;_(C);c.getApplicationHandler(function(j,r){a=j;if(a&&!n.checkIsNotUndefined(r)){e(C);}else{p("11508",r);}});}g(C);l(C);},handleAddNewAppPress:function(){var C=this;if(n.checkIsNotNullOrUndefinedOrBlank(a)){h(C,"newApplication");}else{p("11509");}},handleListItemSelect:function(){var C=this;C.byId("idTextCleanupButton").setEnabled(true);},handleListItemPress:function(i){var C=this,j;j=i.getParameter("listItem").getBindingContext().getPath().split("/")[2];sap.ui.core.UIComponent.getRouterFor(C).navTo("configurationList",{appId:C.byId("idApplicationTable").getModel().getData().Objects[j].id});},handleOnLiveChange:function(){var C=this;C.byId("idSaveButton").setEnabled(true);},handleEditPress:function(){var C=this;if(n.checkIsNotNullOrUndefinedOrBlank(a)){C.byId("idNewButton").setEnabled(false);C.byId("idEditButton").setVisible(false);C.byId("idSaveButton").setVisible(true);C.byId("idCancelButton").setVisible(true);C.byId("idTextCleanupButton").setVisible(true);C.byId("idImportButton").setVisible(false);C.byId("idApplicationTable").setMode("SingleSelectMaster");var i=C.byId("idApplicationTable").getItems();if(i.length){i.forEach(function(j){j.getCells()[0].setEditable(true);j.getCells()[1].setEditable(true);j.getCells()[2].setVisible(true);j.setType("Inactive");});}}else{p("11509");}},handleDeletePress:function(i){var C=this,D;var P=i.getSource().getBindingContext().getPath().split("/")[2];var j=new sap.ui.core.CustomData({value:{removeId:C.byId("idApplicationTable").getModel().getData().Objects[P].id,sPath:P}});D=sap.ui.xmlfragment("idDeleteConfirmationFragment","sap.apf.modeler.ui.fragment.deleteConfirmationDialog",C);b();k(C,D,"deleteApp",j);},handleConfirmDeletion:function(){var C=this;var r=sap.ui.core.Fragment.byId("idDeleteConfirmationFragment","idDeleteConfirmation").getCustomData()[0].getValue().removeId;if(n.checkIsNotUndefined(r)){a.removeApplication(r,function(R,M,i){if(!n.checkIsNotUndefined(i)&&(typeof R==="string")){e(C);f("11510");C.byId("idEditButton").firePress();}else{p("11501",i);}C.closeDialog();});}},closeDialog:function(){sap.ui.core.Fragment.byId("idDeleteConfirmationFragment","idDeleteConfirmation").destroy();},handleCancelPress:function(){var C=this,u=[],i,t,j,U;i=a.getList();t=C.byId("idApplicationTable").getModel().getData().Objects;for(j=0;j<i.length;j++){if(t[j].description!==i[j].ApplicationName||t[j].semanticObject!==i[j].SemanticObject){u.push(t[j]);}}if(u.length){U=sap.ui.xmlfragment("idUnsavedDataConfirmationFragment","sap.apf.modeler.ui.fragment.unsavedDataConfirmationDialog",C);d();k(C,U,"unsavedConfiguration");}else{q(C);}},handleNavigationWithSave:function(){var C=this;C.handleSavePress();sap.ui.core.Fragment.byId("idUnsavedDataConfirmationFragment","idMessageDialog").destroy();},handleNavigationWithoutSave:function(){var C=this;sap.ui.core.Fragment.byId("idUnsavedDataConfirmationFragment","idMessageDialog").destroy();q(C);},handlePreventNavigation:function(){sap.ui.core.Fragment.byId("idUnsavedDataConfirmationFragment","idMessageDialog").destroy();},handleImportPress:function(E){var C=this;var i=c.getStartParameterFacade().isLrepActive();if(i){m(C,E);}else{h(C,"importFiles");}},handleSavePress:function(){var C=this,u=[],i,t,j;i=a.getList();t=C.byId("idApplicationTable").getModel().getData().Objects;for(j=0;j<i.length;j++){if(t[j].description!==i[j].ApplicationName||t[j].semanticObject!==i[j].SemanticObject){u.push(t[j]);}}u.forEach(function(r){var s={ApplicationName:r.description,SemanticObject:r.semanticObject};a.setAndSave(s,function(R,M,v){if(!n.checkIsNotUndefined(v)&&(typeof R==="string")){q(C);}else{p("11500",v);}},r.id);});},handleTextpoolCleanUpPress:function(){var C=this,t,i,j;i=C.byId("idApplicationTable").getSelectedContextPaths()[0].split("/")[2];j=C.byId("idApplicationTable").getModel().getData().Objects[i].id;c.getConfigurationHandler(j,function(r){t=r.getTextPool();c.getUnusedTextKeys(j,function(u,s){if(!n.checkIsNotUndefined(s)){t.removeTexts(u,j,function(s){if(!n.checkIsNotUndefined(s)){f("11511");}else{p("11507",s);}});}else{p("11506",s);}});});},handleNavigationToConfigurationList:function(E){var C=this;if(C.byId("idEditButton").getVisible()){var P={listItem:sap.ui.getCore().byId(E.currentTarget.id).getParent(),srcControl:C.byId("idApplicationTable")};C.byId("idApplicationTable").fireItemPress(P);}},handleAdditionOfNewApp:function(E){var C=this,j,A,i,r=0,I;j=E.getParameter("appId");e(C);A=C.byId('idApplicationTable').getModel().getData().Objects;f("11512");C.byId('idApplicationTable').rerender();for(i=0;i<A.length;i++){if(A[i].id===j){r=i;break;}}I=C.byId('idApplicationTable').getItems();if(I.length){var s=I[r].getDomRef();if(s){s.scrollIntoView();}}},handleAppListUpdateAfterImport:function(){var C=this;e(C);},handleNavBack:function(){window.history.go(-1);}});}());
