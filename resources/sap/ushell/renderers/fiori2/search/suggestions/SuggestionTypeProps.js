sap.ui.define(['sap/ushell/renderers/fiori2/search/SearchConfiguration'],function(S){"use strict";var c=S.getInstance();c.getSina();jQuery.sap.declare('sap.ushell.renderers.fiori2.search.suggestions.SuggestionTypeProps');var s=window.sinabase;s.SuggestionType.APPS='apps';var m=sap.ushell.renderers.fiori2.search.suggestions.SuggestionTypeProps={};m[s.SuggestionType.DATASOURCE]={position:10,limit:2};m[s.SuggestionType.APPS]={position:20,limitDsAll:3,limitDsApps:jQuery.device.is.phone?7:7};m[s.SuggestionType.HISTORY]={position:30,limit:3};m[s.SuggestionType.OBJECTDATA]={position:40,limit:jQuery.device.is.phone?7:7,limitDataSource:2};return m;});
