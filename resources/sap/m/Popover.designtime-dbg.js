/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2017 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

// Provides the Design Time Metadata for the sap.m.Popover control
sap.ui.define([],
	function () {
		"use strict";

		return {
			aggregations: {
				content: {
					domRef: ":sap-domref > .sapMPopoverCont > .sapMPopoverScroll",
					actions: {
						move: "moveControls"
					}
				},
				customHeader: {
					domRef: ":sap-domref > .sapMPopoverHeader"
				},
				subHeader: {
					domRef: ":sap-domref > .sapMPopoverSubHeader"
				},
				footer: {
					domRef: ":sap-domref > .sapMPopoverFooter"
				},
				beginButton: {
					domRef: ":sap-domref > header.sapMPopoverHeader .sapMBarLeft"
				},
				endButton: {
					domRef: ":sap-domref > header.sapMPopoverHeader .sapMBarRight"
				}
			}
		};

	}, /* bExport= */ false);
