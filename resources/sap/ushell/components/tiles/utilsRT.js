// Copyright (c) 2009-2017 SAP SE, All Rights Reserved
this.sap=this.sap||{};(function(){"use strict";jQuery.sap.declare("sap.ushell.components.tiles.utilsRT");jQuery.sap.require("sap.ushell.components.tiles.utils");sap=sap||{};sap.ushell=sap.ushell||{};sap.ushell.components=sap.ushell.components||{};sap.ushell.components.tiles=sap.ushell.components.tiles||{};sap.ushell.components.tiles.utilsRT=sap.ushell.components.tiles.utilsRT||{};if(sap.ushell.components.tiles.utilsRT.getConfiguration){return;}sap.ushell.components.tiles.utilsRT.getConfiguration=function(t,a,E){var r;var c=t.configuration.getParameterValueAsString('tileConfiguration');try{var C=JSON.parse(c||"{}");}catch(e){jQuery.sap.log.error("Error while trying to parse tile configuration",e,"sap.ushell.components.tiles.utilsRT");return{};}var u=sap.ushell.components.tiles.utils;C.editable=true;if(t.configurationUi&&t.configurationUi.isReadOnly){if(t.configurationUi.isReadOnly()){C.editable=false;}}var T=u.getTranslatedTitle(t);var s=u.getTranslatedSubtitle(t,C);var i=u.getTranslatedProperty(t,C,'display_info_text');var k=u.getTranslatedProperty(t,C,'display_search_keywords');if(a){r=u.getResourceBundleModel().getResourceBundle();if(E&&t.bag){var o=t.bag.getOriginalLanguage();var l=sap.ui.getCore().getConfiguration().getLocale().getSAPLogonLanguage();var b=sap.ui.getCore().getConfiguration().getLanguage();C.isLocaleSuitable=o===""||o.toLowerCase()===l.toLowerCase()||o.toLowerCase()===b.toLowerCase();C.orgLocale=o;C.userLocale=l;}}C.display_icon_url=C.display_icon_url||"";if(i!==undefined){C.display_info_text=i;}else if(C.display_info_text===undefined){if(a&&!E){C.display_info_text="["+r.getText("configuration.display_info_text")+"]";}else{C.display_info_text="";}}C.navigation_semantic_object=C.navigation_semantic_object||"";C.navigation_semantic_action=C.navigation_semantic_action||"";C.navigation_semantic_parameters=C.navigation_semantic_parameters||"";C.display_number_unit=C.display_number_unit||"";C.display_number_factor=C.display_number_factor||"";C.service_refresh_interval=C.service_refresh_interval?parseInt(C.service_refresh_interval,10):0;C.service_url=C.service_url||"";C.navigation_target_url=C.navigation_target_url||"";if(a&&u.isInitial(T)){C.display_title_text=E?"":"["+r.getText("configuration.display_title_text")+"]";C.display_subtitle_text=E?"":"["+r.getText("configuration.display_subtitle_text")+"]";}else{C.display_title_text=T||C.display_title_text||"";if(s!==undefined){C.display_subtitle_text=s;}else if(C.display_subtitle_text===undefined){C.display_subtitle_text="";}}C.navigation_use_semantic_object=(C.navigation_use_semantic_object===false?false:true);C.display_search_keywords=k||C.display_search_keywords||"";if(a){C.display_number_value=C.display_number_value||1234;}C.form_factors=C.form_factors?C.form_factors:u.getDefaultFormFactors();C.desktopChecked=C.form_factors.manual.desktop;C.tabletChecked=C.form_factors.manual.tablet;C.phoneChecked=C.form_factors.manual.phone;C.manualFormFactor=!(C.form_factors.appDefault)&&C.editable;C.appFormFactor=C.form_factors.appDefault;C.formFactorConfigDefault=C.form_factors.defaultParam?true:false;if(C.signature){C.rows=u.getSignatureTableData(C.signature,E&&C.editable);}else{C.rows=(C.mapping_signature&&C.mapping_signature!=="*=*")?u.getMappingSignatureTableData(C.mapping_signature,E&&C.editable):[u.getEmptyRowObj(C.editable)];}if(C.signature){C.isUnknownAllowed=(C.signature.additional_parameters==="allowed"||C.signature.additionalParameters==="allowed");}else{C.isUnknownAllowed=(C.mapping_signature!==undefined)?u.getAllowUnknownParametersValue(C.mapping_signature):true;}if(a){C.tile_actions_rows=u.getTileNavigationActionsRows(t,C.editable);}else{if(!C.actions){C.actions=u.getTileNavigationActions(t);}}return C;};sap.ushell.components.tiles.utilsRT.getDataToDisplay=function(c,d){var a=0,i,n,C,s,D={display_icon_url:d.icon||c.display_icon_url||"",display_title_text:d.title||c.display_title_text||"",display_number_value:!isNaN(d.number)?d.number:"...",display_number_unit:d.numberUnit||c.display_number_unit||"",display_info_text:d.info||c.display_info_text||"",display_info_state:d.infoState||"Neutral",display_subtitle_text:d.subtitle||c.display_subtitle_text||"",display_state_arrow:d.stateArrow||"None",display_number_state:d.numberState||"Neutral",display_number_digits:d.numberDigits>=0?d.numberDigits:4,display_number_factor:d.numberFactor||"",display_search_keyword:d.keywords||c.display_search_keyword||"",targetParams:[]};if(d.infoStatus){D.display_info_state=d.infoStatus;}if(d.targetParams){D.targetParams.push(d.targetParams);}if(d.results){for(i=0,n=d.results.length;i<n;i=i+1){C=d.results[i].number||0;if(typeof C==="string"){C=parseFloat(C,10);}a=a+C;s=d.results[i].targetParams;if(s){D.targetParams.push(s);}}D.display_number_value=a;}if(!isNaN(d.number)){if(typeof d.number==="string"){d.number=d.number.trim();}if(d.number===""){D.display_number_value="...";}else{jQuery.sap.require("sap.ui.core.format.NumberFormat");var S=this._shouldProcessDigits(d.number,d.numberDigits),m=D.display_icon_url?4:5;if(d.number&&d.number.length>=m||S){var N=this._normalizeNumber(d.number,m,d.numberFactor,d.numberDigits);D.display_number_factor=N.numberFactor;D.display_number_value=N.displayNumber;}else{var o=sap.ui.core.format.NumberFormat.getFloatInstance({maxFractionDigits:m});D.display_number_value=o.format(d.number);}}}if(D&&D.display_number_state){switch(D.display_number_state){case"Positive":D.display_number_state="Good";break;case"Negative":D.display_number_state="Error";break;}}return D;};sap.ushell.components.tiles.utilsRT.getTileSettingsAction=function(m,s,t){var r=sap.ushell.components.tiles.utils.getResourceBundleModel().getResourceBundle();return{text:(!t||t=="tile")?r.getText('tileSettingsBtn'):r.getText('linkSettingsBtn'),press:function(){var a={showGroupSelection:false,title:m.getProperty('/config/display_title_text'),subtitle:m.getProperty('/config/display_subtitle_text')};if(!t||t=='tile'){a.info=m.getProperty('/config/display_info_text');a.icon=m.getProperty('/config/display_icon_url');a.keywords=m.getProperty('/config/display_search_keywords');}else if(t=='link'){a.showInfo=false;a.showIcon=false;a.showPreview=false;}var b=sap.ui.view({type:sap.ui.core.mvc.ViewType.JS,viewName:"sap.ushell.ui.footerbar.SaveAsTile",viewData:{appData:a}});var S=new sap.ui.layout.form.SimpleForm({id:'tileSettings',layout:sap.ui.layout.form.SimpleFormLayout.GridLayout,content:[b]}).addStyleClass("sapUshellAddBookmarkForm");var o=new sap.m.Button('bookmarkOkBtn',{text:r.getText('okBtn'),press:function(){s(b);d.close();},enabled:true}),c=new sap.m.Button('bookmarkCancelBtn',{text:r.getText('cancelBtn'),press:function(){d.close();}});var e=function(f){o.setEnabled(f.trim()?true:false);};b.getTitleInput().attachLiveChange(function(){e(this.getValue());});var d=new sap.m.Dialog({id:'settingsDialog',title:(!t||t=="tile")?r.getText('tileSettingsDialogTitle'):r.getText('linkSettingsDialogTitle'),contentWidth:'400px',content:S,beginButton:o,endButton:c,horizontalScrolling:false,afterClose:function(){d.destroy();}});d.open();}};};sap.ushell.components.tiles.utilsRT.getSemanticNavigationUrl=function(c){var u="#"+jQuery.trim(c.navigation_semantic_object);u+="-"+jQuery.trim(c.navigation_semantic_action);if(c.navigation_semantic_parameters&&jQuery.trim(c.navigation_semantic_parameters).length>0){u+="?"+jQuery.trim(c.navigation_semantic_parameters);}return u;};sap.ushell.components.tiles.utilsRT.addParamsToUrl=function(u,d){var p="",U=u.indexOf("?")!==-1,t=d.targetParams,i;if(t&&t.length>0){for(i=0;i<t.length;i=i+1){p+=t[i];if(i<t.length-1){p+="&";}}}if(p.length>0){if(!U){u+="?";}else{u+="&";}u+=p;}return u;};sap.ushell.components.tiles.utilsRT._normalizeNumber=function(n,m,a,N){jQuery.sap.require("sap.ui.core.format.NumberFormat");var b;if(isNaN(n)){b=n;}else{var o=sap.ui.core.format.NumberFormat.getFloatInstance({maxFractionDigits:N});if(!a){if(n>=1000000000){a='B';n/=1000000000;}else if(n>=1000000){a='M';n/=1000000;}else if(n>=1000){a='K';n/=1000;}}b=o.format(n);}var d=b;var c=d[m-1];m-=(c==='.'||c===',')?1:0;d=d.substring(0,m);return{displayNumber:d,numberFactor:a};};sap.ushell.components.tiles.utilsRT._shouldProcessDigits=function(d,D){var n;d=typeof(d)!=='string'?d.toString():d;if(d.indexOf('.')!==-1){n=d.split(".")[1].length;if(n>D){return true;}}return false;};}());