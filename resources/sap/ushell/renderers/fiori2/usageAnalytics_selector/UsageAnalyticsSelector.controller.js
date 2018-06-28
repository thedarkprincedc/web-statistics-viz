// Copyright (c) 2009-2017 SAP SE, All Rights Reserved
sap.ui.define(function(){"use strict";sap.ui.controller("sap.ushell.renderers.fiori2.usageAnalytics_selector.UsageAnalyticsSelector",{onInit:function(){this.oUser=sap.ushell.Container.getUser();this.switchStateValue=this.oUser.getTrackUsageAnalytics();this.getView().oSwitchButton.setState(this.switchStateValue);},getContent:function(){var t=this,d=jQuery.Deferred();d.resolve(t.getView());return d.promise();},getValue:function(){var d=jQuery.Deferred(),i=sap.ushell.resources.i18n;d.resolve(this.switchStateValue?i.getText("trackingEnabled"):i.getText("trackingDisabled"));return d.promise();},onSave:function(){var c=this.getView().oSwitchButton.getState();this.switchStateValue=c;return sap.ushell.Container.getService("UsageAnalytics").setTrackUsageAnalytics(c);},onCancel:function(){this.getView().oSwitchButton.setState(this.switchStateValue);}});},true);
