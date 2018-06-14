sap.ui.define(["jquery.sap.global","sap/ui/base/Object","sap/suite/ui/generic/template/ListReport/controller/MultipleViewsSingleTableModeHelper","sap/suite/ui/generic/template/ListReport/controller/MultipleViewsMultipleTablesModeHelper","sap/suite/ui/generic/template/lib/BusyHelper"],function(q,B,M,a,b){"use strict";var P="/listReport/multipleViews";var c=P+"/selectedKey";var d=P+"/mode";var e=P+"/items";function g(s,C,t){var I;var m;var S;var T=t.oComponentUtils.getTemplatePrivateModel();var o={};var f;var D=t.oServices.oApplication.getBusyHelper().getBusyDelay();function r(){if(I&&I.fnRegisterToChartEvents){return I.fnRegisterToChartEvents.apply(null,arguments);}}function h(){if(I&&I.onDetailsActionPress){return I.onDetailsActionPress.apply(null,arguments);}}function j(){if(!I){return;}var i=v();return i.templateSortOrder;}function k(i){var F;if(!i){return"";}if(i.state==="error"){return t.oCommonUtils.getText("SEG_BUTTON_ERROR",i.text);}if(i.state===""||i.state==="busy"){var z=sap.ui.core.format.NumberFormat.getIntegerInstance({style:"short"});F=z.format(i.count);}return t.oCommonUtils.getText("SEG_BUTTON_TEXT",[i.text,i.state==="busyLong"?"...":F]);}function l(){if(I){var i=T.getProperty(c);var z=I.getContentForIappState(i);return{mode:m,state:z};}}function R(G){if(I){var i=I.getSelectedKeyAndRestoreFromIappState(G);T.setProperty(c,i);}}function n(){return T.getProperty(c);}function p(E){if(!I){return;}var i=function(K,z,A){var F=t.oCommonUtils.getElementCustomData(z);var G=f[K]||Object.create(null);G.selectionVariantFilters=A;G.templateSortOrder=F.TemplateSortOrder;G.implementingControl=z;f[K]=G;if(S){var H=e+"/"+K;var J=function(N,O,Q){if(G.numberOfUpdates!==O){return;}var L=q.extend({},T.getProperty(H));if(!L.state&&N=="busy"){setTimeout(function(){if(T.getProperty(H).state==="busy"){L=q.extend({},T.getProperty(H));L.state="busyLong";T.setProperty(H,L);}},D);}L.state=N;if(!N){L.count=Q;}T.setProperty(H,L);};G.numberOfUpdates=0;G.updateStartFunction=J.bind(null,"busy");G.updateSuccessFunction=J.bind(null,"");G.errorFunction=J.bind(null,"error");var L={text:F.text,count:0,state:""};T.setProperty(H,L);}};I.init(E,i);}function u(){return m;}function v(){return f[T.getProperty(c)];}function w(E){if(!I){return;}var z=E.getParameter("bindingParams");o.filters=z.filters.slice(0);o.parameters=z.parameters;var A=v();var F=A.selectionVariantFilters;for(var i in F){z.filters.push(F[i]);}}function U(){var i=s.oSmartTable.getModel();var z=s.oSmartTable.getEntitySet();var A=s.oSmartFilterbar.getBasicSearchValue();var E={};if(A){E={search:A};}for(var K in f){var F=f[K];F.numberOfUpdates++;F.updateStartFunction(F.numberOfUpdates);var G=o.filters.concat(F.selectionVariantFilters);i.read("/"+z+"/$count",{urlParameters:E,filters:G,groupId:"updateMultipleViewsItemsCounts",success:F.updateSuccessFunction.bind(null,F.numberOfUpdates),error:F.errorFunction.bind(null,F.numberOfUpdates)});}}function x(){if(S){U();}}function y(){return I;}(function(){var i,z,Q,A;i=C.getOwnerComponent().getAppComponent().getConfig();z=i&&i.pages[0]&&i.pages[0].component&&i.pages[0].component.settings;if(!z){return;}Q=z.quickVariantSelectionX;A=z.quickVariantSelection;if(Q&&A){throw new Error("Defining both QuickVariantSelection and QuickVariantSelectionX in the manifest is not allowed.");}var E=Q||A;if(!E){return;}S=E.showCounts;f=Object.create(null);T.setProperty(P,Object.create(null));var F=true;var G=function(J){if(F){F=false;T.setProperty(c,J);}};if(A){I=new M(A,s,C,t,G,f);m="single";q.sap.log.info("This list supports multiple views with single table");}else{I=new a(Q,s,C,t,G,f);m="multi";q.sap.log.info("This list supports multiple views with multiple tables/charts");}T.setProperty(d,m);T.setProperty(e,Object.create(null));var H=T.bindProperty(c);H.attachChange(function(J){if(I.onSelectedKeyChanged){var N=J.getSource().getValue();I.onSelectedKeyChanged(N);}var K=s.oIappStateHandler.areDataShownInTable();var L=true;if(typeof I.isTableDirty==='function'){L=I.isTableDirty(s.oSmartTable);}if(K&&L){if(t.oCommonUtils.isSmartChart(s.oSmartTable)){s.oSmartTable.rebindChart();if(typeof I.setTableDirty==='function'){I.setTableDirty(s.oSmartTable,false);}}else if(t.oCommonUtils.isSmartTable(s.oSmartTable)){s.oSmartTable.rebindTable();t.oCommonUtils.refreshSmartTable(s.oSmartTable);}}else{t.oCommonUtils.setEnabledToolbarButtons(s.oSmartTable);}s.oIappStateHandler.changeIappState(true,K);});})();return{fnRegisterToChartEvents:r,onDetailsActionPress:h,determineSortOrder:j,onDataRequested:x,formatItemTextForMultipleView:k,getContentForIappState:l,restoreFromIappState:R,getVariantSelectionKey:n,init:p,getMode:u,onRebindContentControl:w,getImplementingHelper:y};}return B.extend("sap.suite.ui.generic.template.ListReport.controller.MultipleViewsHandler",{constructor:function(s,C,t){q.extend(this,g(s,C,t));}});});
