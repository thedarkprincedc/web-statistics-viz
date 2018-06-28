/*!
* SAP UI development toolkit for HTML5 (SAPUI5)

		(c) Copyright 2009-2017 SAP SE. All rights reserved
	
*/
sap.ui.define([ "jquery.sap.global" ], function(jQuery) {
	"use strict";

	/**
	 * @class SmartAreaMicroChart renderer.
	 * @static
	 * @version 1.52.7
	 * @since 1.38.0
	 */
	var SmartAreaMicroChartRenderer = {};

	/**
	 * Renders the HTML for the given control, using the provided {@link sap.ui.core.RenderManager}.
	 *
	 * @param {sap.ui.core.RenderManager} oRm the RenderManager that can be used for writing to the render output buffer
	 * @param {sap.ui.core.Control} oControl an object representation of the control that should be rendered
	 */
	SmartAreaMicroChartRenderer.render = function(oRm, oControl) {
		if (oControl._bIsInitialized) {
			oRm.write("<div");
			oRm.writeControlData(oControl);
			oRm.writeClasses();
			oRm.write(">");
			oRm.renderControl(oControl.getAggregation("_chart"));
			oRm.write("</div>");
		}
	};

	return SmartAreaMicroChartRenderer;

}, /* bExport= */ true);