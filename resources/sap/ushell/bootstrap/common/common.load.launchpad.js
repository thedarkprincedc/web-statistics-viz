sap.ui.define(["./common.boot.path"],function(b){"use strict";return l;function l(){var C=window.sap.ushell.Container.createRenderer();c();window.jQuery.sap.setIcons({"phone":b+"/sap/ushell/themes/base/img/launchicons/57_iPhone_Desktop_Launch.png","phone@2":b+"/sap/ushell/themes/base/img/launchicons/114_iPhone-Retina_Web_Clip.png","tablet":b+"/sap/ushell/themes/base/img/launchicons/72_iPad_Desktop_Launch.png","tablet@2":b+"/sap/ushell/themes/base/img/launchicons/144_iPad_Retina_Web_Clip.png","favicon":b+"/sap/ushell/themes/base/img/launchpad_favicon.ico","precomposed":true});window.jQuery.sap.require("sap.ushell.iconfonts");window.jQuery.sap.require("sap.ushell.services.AppConfiguration");window.sap.ushell.iconfonts.registerFiori2IconFont();window.jQuery("#canvas").empty();C.placeAt("canvas");}function c(){var s=window.jQuery.sap.getUriParameters().get("sap-ushell-cdm-site-url");var a=window.jQuery.sap.getObject("sap-ushell-config.services.CommonDataModel.adapter.config",0);if(s){a.cdmSiteUrl=s;}}});
