jQuery.sap.registerPreloadedModules({"name":"Component-preload","version":"2.0","modules":{"sap/ushell/components/tiles/cdm/applauncherdynamic/Component.js":function(){
// Copyright (c) 2009-2017 SAP SE, All Rights Reserved
(function(){"use strict";jQuery.sap.declare("sap.ushell.components.tiles.cdm.applauncherdynamic.Component");sap.ui.define(["sap/ui/core/UIComponent"],function(U){return U.extend("sap.ushell.components.tiles.cdm.applauncherdynamic.Component",{metadata:{},createContent:function(){var c=this.getComponentData();var p=c.properties||{};var P=p.tilePersonalization||{};var i=p.indicatorDataSource;if(i&&i.path){P.serviceUrl=i.path;P.serviceRefreshInterval=i.refresh;}var s=c.startupParameters;if(s&&s["sap-system"]&&s["sap-system"][0]){P["sap-system"]=s["sap-system"][0];}if(P.serviceUrl&&P.serviceUrl.charAt(0)!=="/"&&p.dataSource&&p.dataSource.uri){var S=p.dataSource.uri;if(P["sap-system"]){if(S.charAt(S.length-1)==="/"){S=S.slice(0,S.length-1);}S+=";o="+P["sap-system"];}if(S.charAt(S.length-1)!=="/"){S+="/";}S+=P.serviceUrl;P.serviceUrl=S;}var t=sap.ui.view({type:sap.ui.core.mvc.ViewType.JS,viewName:"sap.ushell.components.tiles.cdm.applauncherdynamic.DynamicTile",viewData:{properties:p,configuration:P}});this._oController=t.getController();return t;},tileSetVisualProperties:function(n){if(this._oController){this._oController.updateVisualPropertiesHandler(n);}},tileRefresh:function(){if(this._oController){this._oController.refreshHandler();}},tileSetVisible:function(i){if(this._oController){this._oController.visibleHandler(i);}},exit:function(){this._oController=null;}});});}());},"sap/ushell/components/tiles/cdm/applauncherdynamic/DynamicTile.controller.js":function(){sap.ui.define(['sap/ui/core/IconPool','sap/ui/thirdparty/datajs','sap/ushell/components/tiles/utils'],function(I,d,u){"use strict";sap.ui.getCore().loadLibrary("sap.m");sap.ui.controller("sap.ushell.components.tiles.cdm.applauncherdynamic.DynamicTile",{timer:null,oDataRequest:null,_getConfiguration:function(){var v=this.getView().getViewData(),c={},U,h;c.configuration=v.configuration;c.properties=v.properties;c.properties.info=c.properties.info||"";c.properties.number_value='...';c.properties.number_value_state='Neutral';c.properties.number_state_arrow='None';c.properties.number_factor='';c.properties.number_unit='';var s=c.configuration["sap-system"];var t=c.properties.targetURL;if(t&&s){U=sap.ushell.Container.getService("URLParsing");if(U.isIntentUrl(t)){h=U.parseShellHash(t);if(!h.params){h[params]={};}h.params["sap-system"]=s;t="#"+U.constructShellHash(h);}else{t+=((t.indexOf("?")<0)?"?":"&")+"sap-system="+s;}c.properties.targetURL=t;}return c;},onInit:function(){var v=this.getView();var m=new sap.ui.model.json.JSONModel();m.setData(this._getConfiguration());v.setModel(m);this.initUpdateDynamicData();},refreshHandler:function(){this.loadData(0);},visibleHandler:function(i){if(i){if(!this.oDataRequest){this.refreshHandler(this);}}else{this.stopRequests();}},updateVisualPropertiesHandler:function(n){var p=this.getView().getModel().getProperty("/properties");var c=false;if(typeof n.title!=='undefined'){p.title=n.title;c=true;}if(typeof n.subtitle!=='undefined'){p.subtitle=n.subtitle;c=true;}if(typeof n.icon!=='undefined'){p.icon=n.icon;c=true;}if(typeof n.targetURL!=='undefined'){p.targetURL=n.targetURL;c=true;}if(typeof n.info!=='undefined'){p.info=n.info;c=true;}if(c){this.getView().getModel().setProperty("/properties",p);}},stopRequests:function(){if(this.timer){clearTimeout(this.timer);}if(this.oDataRequest){try{this.oDataRequest.abort();}catch(e){jQuery.sap.log.warning(e.name,e.message);}}},onPress:function(e){if(e.getSource().getScope&&e.getSource().getScope()===sap.m.GenericTileScope.Display){var t=this.getView().getModel().getProperty("/properties/targetURL");if(!t){return;}else if(t[0]==='#'){hasher.setHash(t);}else{window.open(t,'_blank');}}},initUpdateDynamicData:function(){var v=this.getView(),s=v.getModel().getProperty("/configuration/serviceUrl"),S=v.getModel().getProperty("/configuration/serviceRefreshInterval");if(!S){S=0;}else if(S<10){jQuery.sap.log.warning("Refresh Interval "+S+" seconds for service URL "+s+" is less than 10 seconds, which is not supported. Increased to 10 seconds automatically.",null,"sap.ushell.components.tiles.cdm.applauncherdynamic.DynamicTile.controller");S=10;}if(s){this.loadData(S);}},extractData:function(D){var n,k=["results","icon","title","number","numberUnit","info","infoState","infoStatus","targetParams","subtitle","stateArrow","numberState","numberDigits","numberFactor"];if(typeof D==="object"&&Object.keys(D).length===1){n=Object.keys(D)[0];if(jQuery.inArray(n,k)===-1){return D[n];}}return D;},successHandleFn:function(r){var c=this.getView().getModel().getProperty("/configuration");var D=r;this.oDataRequest=undefined;if(typeof r==="object"){var a=jQuery.sap.getUriParameters(c.serviceUrl).get("$inlinecount");if(a&&a==="allpages"){D={number:r.__count};}else{D=this.extractData(D);}}else if(typeof r==="string"){D={number:r};}this.updatePropertiesHandler(D);},errorHandlerFn:function(m){this.oDataRequest=undefined;var M=m&&m.message?m.message:m,r=u.getResourceBundleModel().getResourceBundle(),U=this.getView().getModel().getProperty("/configuration/serviceUrl");if(m.response){M+=" - "+m.response.statusCode+" "+m.response.statusText;}jQuery.sap.log.error("Failed to update data via service "+U+": "+M,null,"sap.ushell.components.tiles.cdm.applauncherdynamic.DynamicTile");this.updatePropertiesHandler({number:"???",info:r.getText("dynamic_data.error")});},loadData:function(s){var U=this.getView().getModel().getProperty("/configuration/serviceUrl");if(!U){return;}if(s>0){jQuery.sap.log.info("Wait "+s+" seconds before calling "+U+" again",null,"sap.ushell.components.tiles.cdm.applauncherdynamic.DynamicTile.controller");this.timer=setTimeout(this.loadData.bind(this,s,false),(s*1000));}if(!this.oDataRequest){var l=sap.ushell.Container.getUser().getLanguage();if((l)&&(U.indexOf("sap-language=")==-1)){U=U+(U.indexOf("?")>=0?"&":"?")+"sap-language="+l;}this.oDataRequest=OData.read({requestUri:U,headers:{"Cache-Control":"no-cache, no-store, must-revalidate","Pragma":"no-cache","Expires":"0"}},this.successHandleFn.bind(this),this.errorHandlerFn.bind(this));}},onExit:function(){this.stopRequests();},addParamsToUrl:function(U,t){var p="",b=U.indexOf("?")!==-1,i;if(t&&t.length>0){for(i=0;i<t.length;i=i+1){p+=t[i];if(i<t.length-1){p+="&";}}}if(p.length>0){if(!b){U+="?";}else{U+="&";}U+=p;}return U;},_normalizeNumber:function(n,m,a,N){var b;if(isNaN(n)){b=n;}else{var o=sap.ui.core.format.NumberFormat.getFloatInstance({maxFractionDigits:N});if(!a){if(n>=1000000000){a='B';n/=1000000000;}else if(n>=1000000){a='M';n/=1000000;}else if(n>=1000){a='K';n/=1000;}}b=o.format(n);}var c=b;var e=c[m-1];m-=(e==='.'||e===',')?1:0;c=c.substring(0,m);return{displayNumber:c,numberFactor:a};},updatePropertiesHandler:function(D){var e=u.getResourceBundleModel().getResourceBundle().getText("dynamic_data.error");var a=0,i,n,c,C,p=this.getView().getModel().getProperty("/properties"),U={title:D.title||p.title||"",subtitle:D.subtitle||p.subtitle||"",icon:D.icon||p.icon||"",targetURL:D.targetURL||p.targetURL||"",number_value:!isNaN(D.number)?D.number:"...",number_digits:D.numberDigits>=0?D.numberDigits:4,info:p.info==e?D.info||"":D.info||p.info||"",number_unit:D.numberUnit||p.number_unit||"",number_state_arrow:D.stateArrow||p.number_state_arrow||"None",number_value_state:D.numberState||p.number_value_state||"Neutral",number_factor:D.numberFactor||p.number_factor||""};var t=[];if(D.targetParams){t.push(D.targetParams);}if(D.results){for(i=0,n=D.results.length;i<n;i=i+1){c=D.results[i].number||0;if(typeof c==="string"){c=parseInt(c,10);}a=a+c;C=D.results[i].targetParams;if(C){t.push(C);}}U.number_value=a;}if(t.length>0){U.targetURL=this.addParamsToUrl(U.targetURL,t);}if(!isNaN(D.number)){if(typeof D.number==="string"){D.number=D.number.trim();}jQuery.sap.require("sap.ui.core.format.NumberFormat");var s=this._shouldProcessDigits(D.number,D.numberDigits),m=U.icon?4:5;if(D.number&&D.number.length>=m||s){var N=this._normalizeNumber(D.number,m,D.numberFactor,D.numberDigits);U.number_factor=N.numberFactor;U.number_value=N.displayNumber;}else{var o=sap.ui.core.format.NumberFormat.getFloatInstance({maxFractionDigits:m});U.number_value=o.format(D.number);}}if(U.number_value_state){switch(U.number_value_state){case"Positive":U.number_value_state="Good";break;case"Negative":U.number_value_state="Error";break;}}this.getView().getModel().setProperty("/properties",U);},_shouldProcessDigits:function(D,i){var n;D=typeof(D)!=='string'?D.toString():D;if(D.indexOf('.')!==-1){n=D.split(".")[1].length;if(n>i){return true;}}return false;}});},true);},"sap/ushell/components/tiles/cdm/applauncherdynamic/DynamicTile.view.js":function(){sap.ui.define(function(){"use strict";sap.ui.jsview("sap.ushell.components.tiles.cdm.applauncherdynamic.DynamicTile",{getControllerName:function(){return"sap.ushell.components.tiles.cdm.applauncherdynamic.DynamicTile";},createContent:function(c){this.setHeight('100%');this.setWidth('100%');jQuery.sap.require('sap.m.GenericTile');var c=this.getController();return new sap.m.GenericTile({size:'Auto',header:'{/properties/title}',subheader:'{/properties/subtitle}',tileContent:[new sap.m.TileContent({size:'Auto',footer:'{/properties/info}',footerColor:'{/data/display_info_state}',unit:'{/properties/number_unit}',content:[new sap.m.NumericContent({truncateValueTo:5,scale:'{/properties/number_factor}',value:'{/properties/number_value}',indicator:'{/properties/number_state_arrow}',valueColor:'{/properties/number_value_state}',icon:'{/properties/icon}',width:'100%'})]})],press:[c.onPress,c]});}});},true);},"sap/ushell/components/tiles/cdm/applauncherdynamic/i18n/i18n.properties":'\n#XTIT: Title of Dynamic App Launcher\ntitle=Dynamic App Launcher\n',"sap/ushell/components/tiles/cdm/applauncherdynamic/manifest.json":'{\n    "_version": "1.1.0",\n    "sap.flp": {\n        "type": "tile",\n        "tileSize": "1x1"\n    },\n    "sap.app": {\n        "id": "sap.ushell.components.tiles.cdm.applauncherdynamic",\n        "_version": "1.0.0",\n        "type": "component",\n        "applicationVersion": {\n            "version": "1.0.0"\n        },\n        "title": "{{title}}",\n        "description": "",\n        "tags": {\n            "keywords": []\n        },\n        "ach": "CA-FE-FLP-EU"\n    },\n    "sap.ui": {\n        "_version": "1.1.0",\n        "icons": {\n            "icon": ""\n        },\n        "deviceTypes": {\n            "desktop": true,\n            "tablet": true,\n            "phone": true\n        },\n        "supportedThemes": [\n            "sap_hcb",\n            "sap_belize",\n            "sap_belize_plus"\n        ]\n    },\n    "sap.ui5": {\n        "_version": "1.1.0",\n        "componentName": "sap.ushell.components.tiles.cdm.applauncherdynamic",\n        "dependencies": {\n            "minUI5Version": "1.42",\n            "libs": {\n                "sap.m": {}\n            }\n        },\n        "models": {\n            "i18n": {\n                "type": "sap.ui.model.resource.ResourceModel",\n                "uri": "i18n/i18n.properties"\n            }\n        },\n        "rootView": "sap.ushell.components.tiles.cdm.applauncherdynamic",\n        "handleValidation": false\n    }\n}'}});
