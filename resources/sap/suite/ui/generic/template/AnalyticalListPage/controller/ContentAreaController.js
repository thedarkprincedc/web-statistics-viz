sap.ui.define(["sap/m/OverflowToolbar","sap/m/ToolbarSpacer","sap/m/FlexItemData","sap/m/ToolbarDesign","sap/ui/core/mvc/Controller","sap/suite/ui/generic/template/AnalyticalListPage/controller/SmartChartController","sap/suite/ui/generic/template/AnalyticalListPage/controller/DetailController"],function(O,T,F,a,C,S,D){"use strict";var c=C.extend("sap.suite.ui.generic.template.AnalyticalListPage.controller.ContentAreaController",{setState:function(s){if(s.oSmartChart){s.chartController=new S();s.chartController.setState(s);}if(s.oSmartTable){s.detailController=new D();s.detailController.setState(s);}this.oState=s;s.bCustomViewExist=(s.oController.byId("template::contentViewExtensionToolbar")!==undefined);s.toolbarController.setState(s);},enableToolbar:function(){if(this.oState.oSmartChart){this.oState.oSmartChart.getToolbar().setEnabled(true);}if(this.oState.oSmartTable){this.oState.oSmartTable.getCustomToolbar().setEnabled(true);}},createAndSetCustomModel:function(s){var o=new sap.ui.model.json.JSONModel();o.setData({required:{master:true},icon:{master:"sap-icon://vertical-bar-chart-2",hybrid:"sap-icon://chart-table-view",customview:"sap-icon://grid"},tooltip:{master:"{i18n>CONTAINER_VIEW_CHART}",hybrid:"{i18n>CONTAINER_VIEW_CHARTTABLE}",customview:"Custom View"}});s.oController.onAfterCustomModelCreation(o);s.oController.oView.setModel(o,"alpCustomModel");}});return c;});
