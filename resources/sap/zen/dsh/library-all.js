jQuery.sap.declare('sap.zen.dsh.library-all');if(!jQuery.sap.isDeclared('sap.zen.dsh.DshRenderer')){jQuery.sap.declare("sap.zen.dsh.DshRenderer");sap.zen.dsh.DshRenderer={};sap.zen.dsh.DshRenderer.render=function(r,c){r.write("<div");r.writeControlData(c);r.addStyle("width",c.getWidth());r.addStyle("height",c.getHeight());r.addClass("sapZenDshDsh");r.writeStyles();r.writeClasses();r.write(">");r.write("<div id=\""+c.getId()+"sapbi_snippet_ROOT\" ");r.write("style=\"");r.write("width:100%;");r.write("height:100%;");r.write("\">");r.write("</div>");r.write("</div>");};};if(!jQuery.sap.isDeclared('sap.zen.dsh.fioriwrapper.Component')){jQuery.sap.require('sap.ui.core.UIComponent');jQuery.sap.declare("sap.zen.dsh.fioriwrapper.Component");sap.ui.core.UIComponent.extend("sap.zen.dsh.fioriwrapper.Component",{metadata:{"manifest":"json"}});sap.zen.dsh.fioriwrapper.Component.prototype.createContent=function(){jQuery.sap.require("sap.zen.dsh.Dsh");jQuery.sap.require("sap.ui.generic.app.navigation.service.NavigationHandler");sap.zen.dsh.scriptLoaded=true;var a="";var c=this.getMetadata().getConfig();var m={};var r;var n={};var t;function b(M,v,V){if(Array.isArray(M)){for(var f in M){v[M[f]]=V;}}else{v[M]=V;}}if(c){if(c.semanticObjectMappings){m=c.semanticObjectMappings;r={};for(var k in m){if(m.hasOwnProperty(k)){b(m[k],r,k);}}}if(c.appName){a=c.appName;}if(c.systemAlias){t=c.systemAlias;}}if(this.getComponentData().startupParameters){if(this.getComponentData().startupParameters.appName)a=this.getComponentData().startupParameters.appName;if(this.getComponentData().startupParameters["sap-system"]){t=this.getComponentData().startupParameters["sap-system"];}}var d=new sap.zen.dsh.Dsh({id:"dsh"+a,height:"100%",width:"100%",deployment:"bw",dshAppName:a,repoPath:c.repoPath||"",semanticMappings:m,appComponent:this,systemAlias:t,deferCreation:true});if(this.getComponentData().startupParameters){for(var p in this.getComponentData().startupParameters){if(this.getComponentData().startupParameters.hasOwnProperty(p)&&p!=="newBW"){var e=this.getComponentData().startupParameters[p][0];d.addParameter(p,e);if(m&&m.hasOwnProperty(p)){b(m[p],n,e);}else{n[p]=e;}}}}var N=new sap.ui.generic.app.navigation.service.NavigationHandler(this);var P=N.parseNavigation();P.always(function(s){d.initializeAppStateData.call(d,s,n);if(c.navigationSourceObjects){d.addParameter("NAV_SOURCES",JSON.stringify(c.navigationSourceObjects));}if(r){d.addParameter("NAV_SEMANTIC_MAPPINGS",JSON.stringify(r));}d.createPage();});return d;}};if(!jQuery.sap.isDeclared('sap.zen.dsh.library')){
/*!
 * (c) Copyright 2010-2018 SAP SE or an SAP affiliate company.
 */
jQuery.sap.declare("sap.zen.dsh.library");jQuery.sap.require('sap.ui.core.Core');jQuery.sap.require('sap.ui.core.library');jQuery.sap.require('sap.ui.table.library');jQuery.sap.require('sap.ui.layout.library');jQuery.sap.require('sap.m.library');jQuery.sap.require('sap.zen.commons.library');jQuery.sap.require('sap.zen.crosstab.library');sap.ui.getCore().initLibrary({name:"sap.zen.dsh",dependencies:["sap.ui.core","sap.ui.table","sap.ui.layout","sap.m","sap.zen.commons","sap.zen.crosstab"],types:[],interfaces:[],controls:["sap.zen.dsh.AnalyticGrid","sap.zen.dsh.Dsh"],elements:[],noLibraryCSS:true,version:"1.52.6"});};if(!jQuery.sap.isDeclared('sap.zen.dsh.AnalyticGrid')){jQuery.sap.declare("sap.zen.dsh.AnalyticGrid");jQuery.sap.require('sap.ui.core.Control');sap.ui.core.Control.extend("sap.zen.dsh.AnalyticGrid",{metadata:{library:"sap.zen.dsh",properties:{"width":{type:"sap.ui.core.CSSSize",group:"Appearance",defaultValue:null},"height":{type:"sap.ui.core.CSSSize",group:"Appearance",defaultValue:null},"selection":{type:"object",group:"Data",defaultValue:null},"queryName":{type:"string",group:"Data",defaultValue:null},"systemAlias":{type:"string",group:"Data",defaultValue:null},"state":{type:"string",group:"Data",defaultValue:null}},events:{"stateChange":{},"selectionChange":{}}}});sap.zen.dsh.AnalyticGrid.M_EVENTS={'stateChange':'stateChange','selectionChange':'selectionChange'};jQuery.sap.require('sap.ui.thirdparty.URI');window.DSH_deployment=true;var sapbi_ajaxHandler=sapbi_ajaxHandler||{};window.sapbi_page=window.sapbi_page||{};sapbi_page.getParameter=sapbi_page.getParameter||function(){return"";};var sapbi_MIMES_PIXEL=sapbi_MIMES_PIXEL||"";if(!window.sap){window.sap={};}if(!sap.zen){sap.zen={};}sap.zen.doReplaceDots=true;sap.zen.dsh.AnalyticGrid.prototype.init=function(){this.parameters={};this.dshBaseUrl=URI(sap.ui.resource("sap.zen.dsh","rt/")).absoluteTo(window.location.pathname).toString();sapbi_page.staticMimeUrlPrefix=this.dshBaseUrl;this.repositoryUrl=URI(sap.ui.resource("sap.zen.dsh","applications/")).absoluteTo(window.location.pathname).toString();};sap.zen.dsh.AnalyticGrid.prototype._initializeInternal=function(){if(this.initialized){this.page.forceFullNonDeltaRender();return;}this.initialized=true;this._addParameter("XQUERY",this.getQueryName());jQuery.sap.require("sap.zen.dsh.rt.all");if(jQuery.sap.debug()==="true"){jQuery.sap.require("sap.zen.dsh.rt.zen_rt_firefly.js.jszip");jQuery.sap.require("sap.zen.dsh.rt.zen_rt_firefly.js.xlsx");}if(this.getState()){this._initializeInnerAppState(this.getState());}else{this._initializeSelectionVariant(this.getSelection());}var t=this;setTimeout(function(){t._createPage();},0);};sap.zen.dsh.AnalyticGrid.prototype._createPage=function(){sap.zen.dsh.scriptLoaded=true;var t=this;var c=sap.ui.getCore().getConfiguration();var l=c.getLocale().getSAPLogonLanguage();if(!l){l=window.navigator.userLanguage||window.navigator.language;}var a="";if(document.cookie){var m=/(?:sap-usercontext=)*sap-client=(\d{3})/.exec(document.cookie);if(m&&m[1]){a=m[1];}}var u=sap.firefly.XHashMapOfStringByString.create();for(var k in this.parameters){u.put(k,this.parameters[k]);}var d=new sap.zen.DesignStudio();d.setHost(document.location.hostname);d.setPort(document.location.port);d.setProtocol(document.location.protocol.split(":")[0]);d.setClient(a);d.setLanguage(l);if(this.repositoryUrl){d.setRepositoryUrl(this.repositoryUrl);}d.setApplicationPath(this.repositoryUrl+"0ANALYTIC_GRID");d.setApplicationName("0ANALYTIC_GRID");d.setUrlParameter(u);d.setSdkLoaderPath("");d.setHanaMode(true);d.setDshControlId(t.getId());d.setStaticMimesRootPath(this.dshBaseUrl);d.setSystemAlias(this.getSystemAlias());d.setNewBW(true);this.page=d.createPage();window[t.getId()+"Buddha"]=this.page;sapbi_page=sapbi_page||{};sapbi_page.staticMimeUrlPrefix=this.dshBaseUrl;sapbi_page.getParameter=function(){return"";};sapbi_MIMES_PIXEL="";};sap.zen.dsh.AnalyticGrid.prototype.onAfterRendering=function(){this._initializeInternal();};sap.zen.dsh.AnalyticGrid.prototype._logoff=function(){if(!this.loggedOff){this.loggedOff=true;this._executeScript("APPLICATION.logoff();");}};sap.zen.dsh.AnalyticGrid.prototype.exit=function(){this._logoff();var r=sap.ui.getCore().byId(this.sId+"ROOT_absolutelayout");if(r){r.destroy();}};sap.zen.dsh.AnalyticGrid.prototype._addParameter=function(n,v){this.parameters[n]=v;};sap.zen.dsh.AnalyticGrid.prototype._executeScript=function(s){this.page.getWindow().increaseLock();this.page&&this.page.exec&&this.page.exec(s);};sap.zen.dsh.AnalyticGrid.prototype.setSelection=function(s){this.setProperty("selection",s,true);if(this.initialized){var n=this._buildNavParamObject(s);this.page.navigationParamObject=JSON.stringify(n);this._executeScript("GLOBAL_SCRIPT_ACTIONS.ApplyNavigationParameters();");}return this;};sap.zen.dsh.AnalyticGrid.prototype.fireSelectionChange=function(p){this.setProperty("selection",p.selection,true);return this.fireEvent("selectionChange",p);};sap.zen.dsh.AnalyticGrid.prototype._buildNavParamObject=function(s){function a(O,v,V){if(!v.hasOwnProperty(O)){v[O]=V;}}var n={};if(s){var p=s.Parameters;var S=s.SelectOptions;if(p){for(var b=0;b<p.length;b++){var P=p[b];n[P.PropertyName]=P.PropertyValue;}}if(S){for(var i=0;i<S.length;++i){var o=S[i];var r=o.Ranges;var f=[];for(var j=0;j<r.length;++j){var c;var R=r[j];if(["EQ","BT","GE","LE","GT","LT"].indexOf(R.Option)==-1){continue;}if(R.Sign==="I"&&R.Option==="EQ"){c=R.Low;}else{c={exclude:R.Sign==="E"||undefined,operation:R.Option,from:R.Low,to:R.High};}f.push(c);}if(f.length>0){a(o.PropertyName,n,f);}}}}return n;};sap.zen.dsh.AnalyticGrid.prototype._initializeSelectionVariant=function(s){var n=this._buildNavParamObject(s);if(!jQuery.isEmptyObject(n)){this._addParameter("NAV_PARAMS",JSON.stringify(n));}};sap.zen.dsh.AnalyticGrid.prototype._initializeInnerAppState=function(s){if(s){this._addParameter("NAV_INITIAL_STATE",s);}};sap.zen.dsh.AnalyticGrid.prototype.setState=function(s){this.setProperty("state",s,true);if(this.initialized){this.page.getWindow().getContext("BookmarkInternal").applyApplicationState(s,true);this.page.forceFullNonDeltaRender();}return this;};sap.zen.dsh.AnalyticGrid.prototype.fireStateChange=function(p){this.setProperty("state",p.state,true);return this.fireEvent("stateChange",p);}};if(!jQuery.sap.isDeclared('sap.zen.dsh.AnalyticGridRenderer')){jQuery.sap.declare("sap.zen.dsh.AnalyticGridRenderer");sap.zen.dsh.AnalyticGridRenderer=sap.zen.dsh.DshRenderer;};if(!jQuery.sap.isDeclared('sap.zen.dsh.Dsh')){jQuery.sap.declare("sap.zen.dsh.Dsh");jQuery.sap.require('sap.ui.core.Control');sap.ui.core.Control.extend("sap.zen.dsh.Dsh",{metadata:{publicMethods:["addParameter","executeScript","getDataSource","getComponent","getPage","createPage","initializeAppStateData","initializeAppState"],library:"sap.zen.dsh",properties:{"dshAppName":{type:"string",group:"Misc",defaultValue:'0ANALYSIS'},"repoPath":{type:"string",group:"Misc",defaultValue:null},"width":{type:"sap.ui.core.CSSSize",group:"Misc",defaultValue:null},"height":{type:"sap.ui.core.CSSSize",group:"Misc",defaultValue:null},"deployment":{type:"string",group:"Misc",defaultValue:'bw'},"protocol":{type:"string",group:"Misc",defaultValue:null},"client":{type:"string",group:"Misc",defaultValue:null},"language":{type:"string",group:"Misc",defaultValue:null},"semanticMappings":{type:"object",group:"Misc",defaultValue:null},"appComponent":{type:"object",group:"Misc",defaultValue:null},"deferCreation":{type:"boolean",group:"Misc",defaultValue:false},"systemAlias":{type:"string",group:"Misc",defaultValue:null}}}});sap.ui.getCore().loadLibrary("sap.viz");jQuery.sap.require('sap.ui.thirdparty.URI');window.DSH_deployment=true;var sapbi_ajaxHandler=sapbi_ajaxHandler||{};window.sapbi_page=window.sapbi_page||{};sapbi_page.getParameter=sapbi_page.getParameter||function(){return"";};var sapbi_MIMES_PIXEL=sapbi_MIMES_PIXEL||"";sapbi_page.staticMimeUrlPrefix=sap.ui.resource("sap.zen.dsh","rt/");if(!window.sap){window.sap={};}if(!sap.zen){sap.zen={};}sap.zen.doReplaceDots=true;sap.zen.dsh.Dsh.prototype.init=function(){this.initial=true;this.parameters={};this.dshBaseUrl=URI(sap.ui.resource("sap.zen.dsh","rt/")).absoluteTo(window.location.pathname).toString();this.dshBaseAppUrlBW="/sap/bw/Mime";};sap.zen.dsh.Dsh.prototype.doInit=function(){if(this.getDshAppName()==="0ANALYSIS"||this.getDshAppName()==="0ANALYTIC_GRID"){this.setRepoPath(URI(sap.ui.resource("sap.zen.dsh","applications/")).absoluteTo(window.location.pathname).toString());}if(this.getRepoPath()!==""){this.repositoryUrl=this.getRepoPath();}if(!this.initial){return;}this.initial=false;jQuery.sap.require("sap.zen.dsh.rt.all");if(jQuery.sap.debug()==="true"){jQuery.sap.require("sap.zen.dsh.rt.zen_rt_firefly.js.jszip");jQuery.sap.require("sap.zen.dsh.rt.zen_rt_firefly.js.xlsx");}var t=this;if(!this.getDeferCreation()){setTimeout(function(){t.doIt();},0);}};sap.zen.dsh.Dsh.prototype.createPage=function(){this.doIt();};sap.zen.dsh.Dsh.prototype.doIt=function(){this.doInit();sap.zen.dsh.scriptLoaded=true;var t=this;{var l=t.getLanguage();if(!l){var c=sap.ui.getCore().getConfiguration();l=c.getLocale().getSAPLogonLanguage();if(!l){l=window.navigator.userLanguage||window.navigator.language;}}var a=t.getClient();if(!a&&document.cookie){var m=/(?:sap-usercontext=)*sap-client=(\d{3})/.exec(document.cookie);if(m&&m[1]){a=m[1];}}var d=t.getDeployment();if(!d||d.length===0){d="bw";}var b=t.getDshAppName();var e=this.getStartupParameters();if(e){for(var f in e){if(this.isDshParameter(f)){if(!this.doesParameterExist(f)){this.addParameter(f,e[f][0]);}}}}var u=sap.firefly.XHashMapOfStringByString.create();for(var k in this.parameters){u.put(k,this.parameters[k]);}var g=new sap.zen.DesignStudio();g.setHost(document.location.hostname);g.setPort(document.location.port);g.setProtocol(document.location.protocol.split(":")[0]);g.setClient(a);g.setLanguage(l);if(this.repositoryUrl){g.setRepositoryUrl(this.repositoryUrl);}g.setApplicationPath(this.dshBaseAppUrlBW);g.setApplicationName(b);g.setUrlParameter(u);g.setSdkLoaderPath("");g.setHanaMode(true);g.setDshControlId(t.getId());g.setStaticMimesRootPath(this.dshBaseUrl);g.setSystemAlias(this.getSystemAlias());if(d==="bw2"||d==="bw"){g.setNewBW(true);}g.setRightToLeft(sap.ui.getCore().getConfiguration().getRTL());this._page=g.createPage();window[this._page.getPageIdForScripting()]=this._page;sapbi_page=sapbi_page||{};sapbi_page.staticMimeUrlPrefix=this.dshBaseUrl;sapbi_page.getParameter=function(){return"";};sapbi_MIMES_PIXEL="";if(this.getAppComponent()){sapbi_page.appComponent=this.getAppComponent();}var h=this._page.getApplicationPropertiesComponent().getCustomCSSName();if(h){var i=document.createElement('link');i.setAttribute("type","text/css");i.setAttribute("rel","stylesheet");i.setAttribute("href",URI(this._page.getRelativePathToApp()+h).normalize().toString());document.getElementsByTagName("head")[0].appendChild(i);}}};sap.zen.dsh.Dsh.prototype.onAfterRendering=function(){this.doInit();};sap.zen.dsh.Dsh.prototype.logoff=function(){if(this._page&&!this.loggedOff){this.loggedOff=true;window.buddhaHasSendLock++;this._page.exec("APPLICATION.logoff();");}};sap.zen.dsh.Dsh.prototype.exit=function(){this.logoff();var r=sap.ui.getCore().byId(this.sId+"ROOT_absolutelayout");if(r){r.destroy();}};sap.zen.dsh.Dsh.prototype.addParameter=function(n,v){this.parameters[n]=v;};sap.zen.dsh.Dsh.prototype.doesParameterExist=function(n){if(this.parameters[n]){return true;}return false;};sap.zen.dsh.Dsh.prototype.getStartupParameters=function(){if(this.getAppComponent()){if(this.getAppComponent().getComponentData()){return this.getAppComponent().getComponentData().startupParameters;}}return null;};sap.zen.dsh.Dsh.prototype.isDshParameter=function(n){if(n==="XQUERY"||n==="XVISIBLEPROMPTS"||n==="XDATALIMIT_ROWS"||n==="XDATALIMIT_COLS"){return true;}return false;};sap.zen.dsh.Dsh.prototype.executeScript=function(s){this.page.exec(s);};sap.zen.dsh.Dsh.prototype.getDataSource=function(n){return this.page.getDataSource(n);};sap.zen.dsh.Dsh.prototype.getComponent=function(n){return this.page.getComponent(n);};sap.zen.dsh.Dsh.prototype.getPage=function(){return this.page;};sap.zen.dsh.Dsh.prototype.getMapping=function(n){if(this.getSemanticMappings()&&this.getSemanticMappings()[n]){return this.getSemanticMappings()[n];}return n;};sap.zen.dsh.Dsh.prototype.initializeAppStateData=function(s,n){function a(m,v,V){if(Array.isArray(m)){for(var e in m){if(!v.hasOwnProperty(m[e])){v[m[e]]=V;}}}else{if(!v.hasOwnProperty(m)){v[m]=V;}}}n=n||{};if(s&&s.customData&&s.customData.bookmarkedAppState){this.addParameter("NAV_INITIAL_STATE",s.customData.bookmarkedAppState);}if(s&&s.selectionVariant){var S=s.selectionVariant;if(typeof S!=="object"&&typeof s.oSelectionVariant==="object"&&s.oSelectionVariant.toJSONObject){S=s.oSelectionVariant.toJSONObject();}var p=S.Parameters;var b=S.SelectOptions;if(p){for(var c=0;c<p.length;c++){var P=p[c];if(this.isDshParameter(P.PropertyName)){continue;}n[P.PropertyName]=P.PropertyValue;}}if(b){for(var i=0;i<b.length;++i){var o=b[i];if(this.isDshParameter(o.PropertyName)){continue;}var r=o.Ranges;var f=[];for(var j=0;j<r.length;++j){var d;var R=r[j];if(["EQ","BT","GE","LE","GT","LT"].indexOf(R.Option)==-1){continue;}if(R.Sign==="I"&&R.Option==="EQ"){d=R.Low;}else{d={exclude:R.Sign==="E"||undefined,operation:R.Option,from:R.Low,to:R.High};}f.push(d);}if(f.length>0){a(this.getMapping(o.PropertyName),n,f);}}}}if(!jQuery.isEmptyObject(n)){this.addParameter("NAV_PARAMS",JSON.stringify(n));}};sap.zen.dsh.Dsh.prototype.initializeAppState=function(s,n){if(s){var S={};if(s.getData&&typeof s.getData==="function"){S=s.getData();}this.initializeAppStateData(S,n);}};};
