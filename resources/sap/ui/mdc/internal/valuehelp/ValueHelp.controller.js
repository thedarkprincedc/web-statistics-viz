/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)

(c) Copyright 2009-2017 SAP SE. All rights reserved
 */
sap.ui.define(["sap/ui/core/mvc/Controller","sap/ui/mdc/base/ConditionModel","sap/ui/mdc/base/ODataSuggestProvider","sap/ui/mdc/base/OperatorSuggestProvider","sap/m/SearchField","sap/ui/model/json/JSONModel"],function(C,a,O,b,S,J){"use strict";return C.extend("sap.ui.mdc.internal.valuehelp.ValueHelp",{handleSearch:function(e){var v=this.getView().byId("valueListTable");var s=e.getParameter("query")||e.getParameter("newValue");v.getBinding("items").changeParameters({$search:s||undefined});},onInit:function(){var f=new J({visible:"HideMode",listView:false,tableView:true,sSelectedRowCount:0,sSearchFieldValue:""});this.oValueListTable=this.getView().byId("valueListTable");var l=this.oValueListTable.getBinding("items");this.oValueListTableConditionModel=a.getFor(l);var t=this.oValueListTableConditionModel.bindProperty("/",this.oValueListTableConditionModel.getContext("/"));t.attachChange(this.handleTableChange.bind(this));l.attachChange(this.updateTableSelections.bind(this));this.getView().setModel(this.oValueListTableConditionModel,"vltcm");this.getView().setModel(f,"FilterLayoutFlag");if(!this.oConditionModel){this.oConditionModel=this.oView.getModel("cm");var c=this.oConditionModel.bindProperty("/",this.oConditionModel.getContext("/"));c.attachChange(function(e){this.updateTableSelections();}.bind(this));}var s=this.getView().byId("template::ValueHelpTableSearchField");s.attachBrowserEvent("focusout",function(e){s.fireSearch({query:s.getValue(),id:s.getId()});});},onBeforeRendering:function(){},onAfterRendering:function(){},handleFilter:function(){var s=this.getView().byId("SplitCont");if(s.getMode()==="HideMode"){s.setMode("ShowHideMode");this.getView().getModel("FilterLayoutFlag").setProperty("/visible","ShowHideMode");}else{s.setMode("HideMode");this.getView().getModel("FilterLayoutFlag").setProperty("/visible","HideMode");}},handleTableChange:function(){this.oValueListTableConditionModel.applyFilters();},handleConditionButtonVisibility:function(){var g=this.getView().byId("template::DefineConditions");var c=this.getView().getModel("cm");var l=c.getConditions().length;var o=[];for(var i=0;i<l;i++){if(c.getConditions()[i].operator!=="EEQ"){o.push(c.getConditions()[i]);}}if(o.length===0){c.addCondition(c.createCondition(this.getView().getController().fieldPath,"EQ",[]));}else{var d=g.getContent();d[d.length-1].getContent()[4].getContent()[1].setVisible(true);}},onResetValueHelp:function(c,m){var v=this.getView();v.setModel(m,"cm");},handleToggleButton:function(e){var i=e.getSource().getId();if(i.indexOf("template::ListView")!==-1){this.getView().getModel("FilterLayoutFlag").setProperty("/listView",true);this.getView().getModel("FilterLayoutFlag").setProperty("/tableView",false);}else if(i.indexOf("template::TableView")!==-1){this.getView().getModel("FilterLayoutFlag").setProperty("/tableView",true);this.getView().getModel("FilterLayoutFlag").setProperty("/listView",false);}},showSelected:function(e){var t;t=this.getView().byId("valueListTable");if(!this.oTableBindingInfo){this.oTableBindingInfo=t.getBindingInfo("items");}if(e.getParameter("pressed")===true){var f=jQuery.sap.extend({},t.getBindingInfo("items"),{filters:this.getFiltersFromConditions()});t.bindItems(f);}else{t.bindItems(this.oTableBindingInfo);}t.getBinding("items").attachChange(this.updateTableSelections.bind(this));},getFiltersFromConditions:function(){var c,d,f,e,v,s,m,k,K,I;c=this.getView().getModel("cm");d=c.getConditions();f=[];I=[];e=d.filter(function(o){return o.operator==="EEQ";});v=this.getView().getModel("valueList");s=v.getProperty("/CollectionPath");m=v.getProperty('/$model').getMetaModel();k=m.getObject('/'+s+'/').$Key;K=k[0];var g=[];var h=[];var V=[];for(var i=0;i<e.length;i++){g[i]=e[i].values[2];}for(var j=0;j<g.length;j++){V[j]=g[j].split(/\((.*?)\)/)[1];}V.forEach(function(n,o){h=V[o].split(',');f=[];if(h.length===1){f.push(new sap.ui.model.Filter({path:K,operator:sap.ui.model.FilterOperator.EQ,value1:e[o].values[0]}));I.push(new sap.ui.model.Filter({filters:f,and:false}));}else{for(var l=0;l<h.length;l++){f.push(new sap.ui.model.Filter({path:h[l].substr(0,h[l].indexOf('=')),operator:sap.ui.model.FilterOperator.EQ,value1:h[l].indexOf("'")===-1?h[l].slice(h[l].indexOf("=")+1,h[l].length):h[l].slice(h[l].indexOf("'")+1,-1)}));}I.push(new sap.ui.model.Filter({filters:f,and:true}));}});return new sap.ui.model.Filter({filters:I,and:false});},onChange:function(){var c=this.oView.getModel("cm");c._checkIsEmpty();c._updateValues();c.refresh();c.checkUpdate(true,true);},removeCondition:function(e){var s=e.oSource;var c=s.getBindingContext("cm").getObject();var o=this.oView.getModel("cm");o.removeCondition(c);},addCondition:function(e){var s=e.oSource;var c=s.getBindingContext("cm").getObject();var o=this.oView.getModel("cm");var i=o.indexOf(c);this.addDummyCondition(i+1);},handleSelectionChange:function(e){var v=this.getView();var c=v.getModel("cm");var V=v.getModel("valueList").getObject("/");var I,k,d,B;for(var i=0;i<e.getParameter("listItems").length;i++){B=e.getParameter("listItems")[i].getBindingContext();I=B.getObject();k=I[V.__sapfe.keyPath];d=I[V.__sapfe.descriptionPath];var o=c.createCondition(this.sFieldPath,"EEQ",[k,d,B.getCanonicalPath()]);var f=c.indexOf(o,this.sFieldPath);if(f===-1){c.addCondition(o);}else{c.removeCondition(this.sFieldPath,f);}}},handleTokenUpdate:function(e){if(e.getParameter("type")==="removed"){var r=e.getParameter("removedTokens");var t=r[0];var c=t.getBindingContext("cm").getObject();var o=this.oView.getModel("cm");var i=o.indexOf(c);o.removeCondition(this.sFieldPath,i);}},updateTableSelections:function(e){var t,I;t=this.getView().byId("valueListTable");t.removeSelections(true);I=t.getItems();var c,d,f;c=this.getView().getModel("cm");d=c.getConditions();f=d.filter(function(o){return o.operator==="EEQ";});var i,j,o,g;for(i=0;i<f.length;i++){o=f[i];for(j=0;j<I.length;j++){g=I[j];if(g.getBindingContext().getCanonicalPath()===o.values[2]){t.setSelectedItem(g,true);break;}}}},addDummyCondition:function(i){var c=this.oView.getModel("cm");var o=c.createCondition(this.sFieldPath,"EQ",[]);if(i!==undefined){c.insertCondition(i,o,true);}else{c.addCondition(o,true);}},valueCtrlFactory:function(i,c){var o=c.oModel;var p=c.sPath;var d=parseInt(p.split("/")[p.split("/").length-1],10);var e=parseInt(p.split("/")[2],10);p=p.slice(0,p.lastIndexOf("/")-1);p=p.slice(0,p.lastIndexOf("/")-1);var f=o.getProperty(p)[e];var g=o.getFilterOperatorConfig().getOperator(f.operator);var F=o.getFilterField();var D=F._getDataType();var v=a.createControl(D,g,"cm>",d);v.setLayoutData(new sap.m.FlexItemData({shrinkFactor:0,growFactor:0.5}));if(d){v.addStyleClass("sapUiSmallMarginBegin");}v.attachChange(this.onChange.bind(this));return v;}});});
