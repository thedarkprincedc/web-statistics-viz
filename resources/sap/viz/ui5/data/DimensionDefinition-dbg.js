/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)

(c) Copyright 2009-2017 SAP SE. All rights reserved
 */

// Provides control sap.viz.ui5.data.DimensionDefinition.
sap.ui.define(['sap/ui/core/Element','sap/viz/library'],
	function(Element, library) {
	"use strict";

	/**
	 * Constructor for a new ui5/data/DimensionDefinition.
	 *
	 * @param {string} [sId] id for the new control, generated automatically if no id is given 
	 * @param {object} [mSettings] initial settings for the new control
	 *
	 * @class
	 * Definition of a single dimension in a dataset
	 * @extends sap.ui.core.Element
	 *
	 * @constructor
	 * @public
	 * @since 1.7.2
	 * @name sap.viz.ui5.data.DimensionDefinition
	 * @ui5-metamodel This control/element also will be described in the UI5 (legacy) designtime metamodel
	 */
	var DimensionDefinition = Element.extend("sap.viz.ui5.data.DimensionDefinition", /** @lends sap.viz.ui5.data.DimensionDefinition.prototype */ { metadata : {

		library : "sap.viz",
		properties : {

			/**
			 * Number of axis this dimension belongs to. Currently must be 1 or 2.
			 * Skip this property when use VizFrame.
			 */
			axis : {type : "int", group : "Misc", defaultValue : null},

			/**
			 * Value for the dimension. Usually bound to some model field.
			 */
			value : {type : "any", group : "Data", defaultValue : null},

			/**
			 * Name of the dimension as displayed in the chart
			 */
			name : {type : "string", group : "Misc", defaultValue : null},

			/**
			 * Id of the dimension as displayed in the chart
			 */
			identity : {type : "string", group : "Misc", defaultValue : null},

			/**
			 * Display value for the dimension. Usually bound to some model field. It doesn't work with 'waterfallType'
			 */
			displayValue : {type : "any", group : "Data", defaultValue : null},

			/**
			 * Data type of the dimension as displayed in the chart. Enumeration: string, number, date. Currently only in time series chart, it is required to set data type to 'date' if this column is going to be fed on 'timeAxis'.
			 */
			dataType : {type : "string", group : "Misc", defaultValue : null}
		}
	}});

	DimensionDefinition.prototype._getAdapter = function() {
		var that = this,
		  oBindingInfo = this.getBindingInfo("value"),
		  oValue, sPath, oType, fnFormatter;
	
		// if there is no binding info, then the value is constant
		if ( !oBindingInfo ) {
			oValue = this.getValue();
			return function() { 
				return oValue; 
			};
		}
	
		// otherwise ensure a simple property binding for now
		if ( oBindingInfo.parts.length > 1 ) {
			throw new Error("DimensionDefinition doesn't support calculated bindings yet");
		}
	
		sPath = oBindingInfo.parts[0].path;
		oType = oBindingInfo.parts[0].type;
		fnFormatter = oBindingInfo.formatter;
	
		// for simple binding just resolve the value
		if ( !(oType || fnFormatter) ) {
			return function(oContext) {
				return oContext.getProperty(sPath);
			};
		}

		// else apply type and/or formatter
		return function(oContext) {
			var oValue = oContext.getProperty(sPath);
			if (oType) {
				oValue = oType.formatValue(oValue, "string"); //TODO discuss internal type
			}
			if (fnFormatter) {
				oValue = fnFormatter.call(that, oValue, oContext);
			}
			return oValue;
		};

	};

	DimensionDefinition.prototype._getDisplayValueAdapter = function() {
		var that = this,
		  oBindingInfo = this.getBindingInfo("displayValue"),
		  oValue, sPath, oType, fnFormatter, parts;
	
		// if there is no binding info, then the value is constant
		if ( !oBindingInfo ) {
			oValue = this.getValue();
			return function() { 
				return {"enableDisplayValue": false, "value": oValue}; 
			};
		}
	
		sPath = oBindingInfo.parts[0].path;
		oType = oBindingInfo.parts[0].type;
		parts = oBindingInfo.parts;
		fnFormatter = oBindingInfo.formatter;
	
		// for simple binding just resolve the value
		if ( parts.length == 1 && !(oType || fnFormatter) ) {
			return function(oContext) {
				return {"enableDisplayValue": true, "value": oContext.getProperty(sPath)};
			};
		}

		// else apply type and/or formatter
		return function(oContext) {
			if (parts.length > 0) {
				var args = [];
				for (var i = 0; i < parts.length; i++) {
					args.push(oContext.getProperty(parts[i].path));
				}
				if (fnFormatter) {
					oValue = fnFormatter.apply(that, args);
				}
			}
			return {"enableDisplayValue": true, "value": oValue};
		};

	};

	DimensionDefinition.prototype._setInResult = function(bInResult) {
		this._bInResult = !!bInResult;
	};

	DimensionDefinition.prototype._getInResult = function() {
		return this._bInResult;
	};

	DimensionDefinition.prototype._setTimeUnit = function (_sTimeUnit) {
		this._sTimeUnit = _sTimeUnit;
	};

	DimensionDefinition.prototype._getTimeUnit = function() {
		return this._sTimeUnit;
	};

	return DimensionDefinition;

});
