sap.ui.define(["jquery.sap.global","sap/ui/base/Object"],function(q,B){"use strict";function g(s,c,t,S){function a(d){return{selectedKey:d};}function b(G){if(G){return G.selectedKey;}}function I(e,d){var o=c.byId("template::SegmentedButton")||c.byId("template::VariantSelect");var p=o.getItems();for(var i=0;i<p.length;i++){var f=p[i];var k=f.getKey();if(i===0){S(k);}var h=t.oCommonUtils.getSelectionVariantFilters(s.oSmartTable,f);d(k,f,h);}}return{getContentForIappState:a,getSelectedKeyAndRestoreFromIappState:b,init:I};}return B.extend("sap.suite.ui.generic.template.ListReport.controller.MultipleViewsSingleTableModeHelper",{constructor:function(Q,s,c,t,S){q.extend(this,g(s,c,t,S));}});});
