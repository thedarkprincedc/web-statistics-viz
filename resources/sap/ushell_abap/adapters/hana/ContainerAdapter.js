// Copyright (c) 2009-2017 SAP SE, All Rights Reserved
(function(){"use strict";jQuery.sap.declare("sap.ushell_abap.adapters.hana.ContainerAdapter");jQuery.sap.require("sap.ui2.srvc.utils");jQuery.sap.require("sap.ushell.System");jQuery.sap.require("sap.ushell.User");sap.ushell_abap.adapters.hana.ContainerAdapter=function(s){var u;this.getSystem=function(){return s;};this.getUser=function(){return u;};this.logout=function(){var d=new jQuery.Deferred();jQuery.ajax({type:"HEAD",url:s.adjustUrl("/sap/hana/xs/formLogin/token.xsjs"),headers:{"X-CSRF-Token":"Fetch"},success:function(D,S,x){jQuery.ajax({type:"POST",url:s.adjustUrl("/sap/hana/xs/formLogin/logout.xscfunc"),headers:{"X-CSRF-Token":x.getResponseHeader("X-CSRF-Token")},success:function(){jQuery.sap.log.info("HANA system logged out: "+s.getAlias(),null,"sap.ushell_abap.adapters.hana.ContainerAdapter");d.resolve();},error:function(){jQuery.sap.log.error("Logging out HANA system failed: "+s.getAlias(),null,"sap.ushell_abap.adapters.hana.ContainerAdapter");d.resolve();}});},error:function(){jQuery.sap.log.error("Fetching X-CSRF-Token failed: "+s.getAlias(),null,"sap.ushell_abap.adapters.hana.ContainerAdapter");d.resolve();}});return d.promise();};};}());