/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)

		(c) Copyright 2009-2015 SAP SE. All rights reserved
	
 */
sap.ui.define(['sap/ui/core/theming/Parameters',"sap/gantt/misc/Utility"],function(P,U){"use strict";var G={};G.render=function(r,g){jQuery.sap.measure.start("GanttChartContainerRenderer render","GanttPerf:GanttChartContainerRenderer render function");r.write("<div");r.writeControlData(g);r.addStyle("width",g.getWidth());r.addStyle("height",g.getHeight());r.writeStyles();r.addClass("sapGanttChartContainer");r.writeClasses();r.write(">");jQuery.sap.measure.start("GanttChartContainerRenderer renderPaintServer","GanttPerf:GanttChartContainerRenderer renderPaintServer part");this.renderSvgDefs(r,g);jQuery.sap.measure.end("GanttChartContainerRenderer renderPaintServer");jQuery.sap.measure.start("GanttChartContainerRenderer renderToolbar","GanttPerf:GanttChartContainerRenderer renderToolbar part");this.renderToolbar(r,g);jQuery.sap.measure.end("GanttChartContainerRenderer renderToolbar");jQuery.sap.measure.start("GanttChartContainerRenderer renderGanttCharts","GanttPerf:GanttChartContainerRenderer renderGanttCharts part");this.renderGanttCharts(r,g);jQuery.sap.measure.end("GanttChartContainerRenderer renderGanttCharts");r.write("</div>");jQuery.sap.measure.end("GanttChartContainerRenderer render");};G.renderSvgDefs=function(r,g){var s=g.getSvgDefs();if(s){r.write("<svg id='"+g.getId()+"-svg-psdef' tabindex='-1' focusable='false'");r.addClass("sapGanttInvisiblePaintServer");r.writeClasses();r.write(">");r.write(s.getDefString());r.write("</svg>");}};G.renderToolbar=function(r,g){r.renderControl(g._oToolbar);};G.renderGanttCharts=function(r,g){r.write("<div");r.addClass("sapGanttViewContainer");r.writeClasses();r.addStyle("width",g.getWidth());var s=g.getHeight();if(g._oToolbar.getAllToolbarItems().length>0){var c=U.findSapUiSizeClass();var t=(c==="sapUiSizeCompact"||c==="sapUiSizeCondensed")?"32px":"48px";s="calc("+s+" - "+t+")";}r.addStyle("height",s);r.writeStyles();r.write(">");r.renderControl(g._oSplitter);r.write("</div>");};return G;},true);
