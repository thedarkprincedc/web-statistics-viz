/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2017 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/base/EventProvider','./Plugin','sap/ui/Device','jquery.sap.dom','jquery.sap.encoder','jquery.sap.script'],function(q,E,P,D){"use strict";var S=E.extend("sap.ui.core.support.Support",{constructor:function(T){if(!_){throw Error();}E.apply(this);var d=this;this._sType=T;this._sLocalOrigin=window.location.protocol+"//"+window.location.host;var h=q.proxy(this._receiveEvent,this);if(window.addEventListener){window.addEventListener("message",h,false);}else{window.attachEvent("onmessage",h);}switch(T){case t.APPLICATION:this._isOpen=false;this.attachEvent(m.TEAR_DOWN,function(e){d._isOpen=false;if(D.browser.msie){q.sap.byId(I+"-frame").remove();}else{c(d._oRemoteWindow);}d._oRemoteWindow=null;S.exitPlugins(d,false);});this.attachEvent(m.LIBS,function(e){var l=S.getDiagnosticLibraries(),L=[];for(var i=0;i<l.length;i++){L.push(l[i].name);}d.sendEvent(m.LIBS,L);});this.attachEvent(m.SETUP,function(e){d._isOpen=true;S.initPlugins(d,false);});break;case t.IFRAME:this._oRemoteWindow=window.parent;this._sRemoteOrigin=q.sap.getUriParameters().get("sap-ui-xx-support-origin");this.openSupportTool();q(window).bind("unload",function(e){c(d._oOpenedWindow);});break;case t.TOOL:this._oRemoteWindow=window.opener;this._sRemoteOrigin=q.sap.getUriParameters().get("sap-ui-xx-support-origin");q(window).bind("unload",function(e){d.sendEvent(m.TEAR_DOWN);S.exitPlugins(d,true);});this.attachEvent(m.LIBS,function(e){var l=e.mParameters;if(!Array.isArray(l)){l=Object.keys(l).map(function(s){return l[s];});}sap.ui.getCore().loadLibraries(l,true).then(function(){q(function(){S.initPlugins(d,true).then(function(){d.sendEvent(m.SETUP);});});});});this.sendEvent(m.LIBS);break;}}});var t={APPLICATION:"APPLICATION",IFRAME:"IFRAME",TOOL:"TOOL"};var m={LIBS:"sapUiSupportLibs",SETUP:"sapUiSupportSetup",TEAR_DOWN:"sapUiSupportTeardown"};S.StubType=t;S.EventType=m;var p=[];S.getStub=function(T){if(a){return a;}if(T!=t.APPLICATION&&T!=t.IFRAME&&T!=t.TOOL){T=t.APPLICATION;}_=true;a=new S(T);_=false;return a;};S.getToolPlugins=function(){var r=[];for(var i=0;i<p.length;i++){if(p[i]instanceof P&&p[i].isToolPlugin()){r.push(p[i]);}}return r;};S.getAppPlugins=function(){var r=[];for(var i=0;i<p.length;i++){if(p[i]instanceof P&&p[i].isAppPlugin()){r.push(p[i]);}}return r;};S.prototype.getType=function(){return this._sType;};S.prototype.isToolStub=function(){return this._sType===S.StubType.TOOL;};S.prototype.isAppStub=function(){return this._sType===S.StubType.APPLICATION;};S.prototype._receiveEvent=function(e){var d=e.data;if(typeof d==="string"&&d.indexOf("SAPUI5SupportTool*")===0){d=d.substr(18);}else{return;}if(e.source!=this._oRemoteWindow){return;}this._oRemoteOrigin=e.origin;if(this._sType===t.IFRAME){var f=this;setTimeout(function(){f._oOpenedWindow.sap.ui.core.support.Support.getStub(t.TOOL)._receiveEvent({source:window,data:e.data,origin:f._sLocalOrigin});},0);}else{var o=JSON.parse(d);var s=o.eventId;var h=o.params;this.fireEvent(s,h);}};S.prototype.sendEvent=function(e,d){if(!this._oRemoteWindow){return;}d=d?d:{};if(D.browser.msie&&this._sType===t.TOOL){this._oRemoteWindow.sap.ui.core.support.Support.getStub(t.IFRAME).sendEvent(e,d);}else{var f=d;if(D.browser.msie){f={};q.extend(true,f,d);}var o={"eventId":e,"params":f};var s="SAPUI5SupportTool*"+JSON.stringify(o);this._oRemoteWindow.postMessage(s,this._sRemoteOrigin);}};S.prototype.openSupportTool=function(){var T=q.sap.getModulePath("sap.ui.core.support","/support.html");var s="?sap-ui-xx-noless=true&sap-ui-xx-support-origin="+q.sap.encodeURL(this._sLocalOrigin);var B;if(this._sType===t.APPLICATION){var o=q.sap.domById("sap-ui-bootstrap");if(o){var r=q.sap.getModulePath('./');var d=o.getAttribute('src');if(typeof d==='string'&&d.indexOf(r)===0){B=d.substr(r.length);}}}else if(this._sType===t.IFRAME){B=q.sap.getUriParameters().get("sap-ui-xx-support-bootstrap");}if(B&&B!=='sap-ui-core.js'&&B.indexOf('/')===-1){s+="&sap-ui-xx-support-bootstrap="+q.sap.encodeURL(B);}function e(u){return(u.indexOf(".")==0||u.indexOf("/")==0||u.indexOf("://")<0);}if(this._sType===t.APPLICATION){if(!this._isOpen){if(D.browser.msie){var i=q.sap.getModulePath("sap.ui.core.support","/msiebridge.html");g().html("").append("<iframe id=\""+I+"-frame\" src=\""+i+s+"\" onload=\"sap.ui.core.support.Support._onSupportIFrameLoaded();\"></iframe>");this._sRemoteOrigin=e(i)?this._sLocalOrigin:i;}else{this._oRemoteWindow=b(T+s);this._sRemoteOrigin=e(T)?this._sLocalOrigin:T;}}else{this._oRemoteWindow.focus();}}else if(this._sType===t.IFRAME){this._oOpenedWindow=b(T+s);}};S._onSupportIFrameLoaded=function(){a._oRemoteWindow=q.sap.byId(I+"-frame")[0].contentWindow;};S.prototype.toString=function(){return"sap.ui.core.support.Support";};var _=false;var a;var I="sap-ui-support";function g(){var $=q.sap.byId(I);if($.length===0){$=q("<DIV/>",{id:I}).addClass("sapUiHidden").appendTo(document.body);}return $;}function b(u){return window.open(u,"sapUiSupportTool","width=800,height=700,status=no,toolbar=no,menubar=no,resizable=yes,location=no,directories=no,scrollbars=yes");}function c(W){if(!W){return;}try{W.close();}catch(e){}}S.getDiagnosticLibraries=function(){var l=sap.ui.getCore().getLoadedLibraries(),L=[];for(var n in l){var o=l[n];if(o.extensions&&o.extensions["sap.ui.support"]&&o.extensions["sap.ui.support"].diagnosticPlugins){L.push(o);}}return L;};S.initPlugins=function(s,T){return new Promise(function(r,d){p=[];var l=S.getDiagnosticLibraries();for(var i=0;i<l.length;i++){var L=l[i],e=L.extensions["sap.ui.support"].diagnosticPlugins;if(Array.isArray(e)){for(var j=0;j<e.length;j++){if(p.indexOf(e[j])===-1){p.push(e[j]);}}}}var f=[],h=[],i;for(i=0;i<p.length;i++){if(typeof p[i]==="string"){f.push(p[i]);h.push(i);}}sap.ui.require(f,function(){var i,j,F;for(j=0;j<arguments.length;j++){F=arguments[j];i=h[j];if(s.isToolStub()&&F.prototype.isToolPlugin()){p[i]=new F(s);w(p[i]);}else if(s.isAppStub()&&F.prototype.isAppPlugin()){p[i]=new F(s);}}for(i=0;i<p.length;i++){if(p[i]instanceof P){if(s.isToolStub()&&p[i].isToolPlugin()){p[i].init(s);}else if(s.isAppStub()&&p[i].isAppPlugin()){p[i].init(s);}}}r();});});};S.exitPlugins=function(s,T){for(var i=0;i<p.length;i++){if(p[i]instanceof P){if(p[i].isToolPlugin()&&s.isToolStub()&&T){p[i].exit(s,true);}else if(p[i].isAppPlugin()&&s.isAppStub()&&!T){p[i].exit(s,false);}}}};function w(o){o.$().replaceWith("<div  id='"+o.getId()+"-Panel' class='sapUiSupportPnl'>"+"<div id='"+o.getId()+"-PanelHeader' class='sapUiSupportPnlHdr'>"+"<div id='"+o.getId()+"-PanelHandle' class='sapUiSupportPnlHdrHdl sapUiSupportPnlHdrHdlClosed'>"+"</div>"+"<div class='sapUiSupportPanelTitle'>"+o.getTitle()+"</div>"+"</div>"+"<div id='"+o.getId()+"-PanelContent' class='sapUiSupportPnlCntnt sapUiSupportHidden'>"+"<div id='"+o.getId()+"' class='sapUiSupportPlugin'></div>"+"</div>"+"</div>");o.$("PanelHeader").click(function(){var h=o.$("PanelHandle");if(h.hasClass("sapUiSupportPnlHdrHdlClosed")){h.removeClass("sapUiSupportPnlHdrHdlClosed");o.$("PanelContent").removeClass("sapUiSupportHidden");}else{h.addClass("sapUiSupportPnlHdrHdlClosed");o.$("PanelContent").addClass("sapUiSupportHidden");}});}S.initializeSupportMode=function(s,A){if(s.indexOf("true")>-1||s.indexOf("viewinfo")>-1){S._initializeSupportInfo(A);}};S._initializeSupportInfo=function(A){var s=[],d=[],f=[],h="support:data",j="support",k="http://schemas.sap.com/sapui5/extension/sap.ui.core.support.Support.info/1",l={};var H=(function(){var i="sap-ui-support.probe",n;try{localStorage.setItem(i,i);n=localStorage.getItem(i);localStorage.removeItem(i);return n===i;}catch(e){return false;}}());function r(){if(H){localStorage.setItem("sap-ui-support.aSupportInfosBreakpoints/"+document.location.href,JSON.stringify(d));}}function u(){if(H){localStorage.setItem("sap-ui-support.aSupportXMLModifications/"+document.location.href,JSON.stringify(f));}}if(H){var v=localStorage.getItem("sap-ui-support.aSupportInfosBreakpoints/"+document.location.href);if(v){d=JSON.parse(v);}var v=localStorage.getItem("sap-ui-support.aSupportXMLModifications/"+document.location.href);if(v){f=JSON.parse(v);}}S.info=function(i){i._idx=s.length;if(i._idx>0&&!i.context){i.context=s[s.length-1].context;}if(!i.context){q.sap.log.debug("Support Info does not have a context and is ignored");return i;}if(i.context&&i.context.ownerDocument&&i.context.nodeType===1){var v=i._idx+"";if(!i.context.hasAttributeNS(k,"data")){i.context.setAttribute("xmlns:"+j,k);}else{v=i.context.getAttributeNS(k,"data")+","+v;}i.context.setAttributeNS(k,h,v);}s.push(i);if(d.indexOf(i._idx)>-1){q.sap.log.info(i);q.sap.log.info("To remove this breakpoint execute:","\nsap.ui.core.support.Support.info.removeBreakpointAt("+i._idx+")");debugger;}return i._idx;};S.info.getAll=function(C){if(C===undefined){return s;}else{return s.filter(function(o){return(o.env&&o.env.caller===C);});}};S.info.getInfos=function(e){if(e&&typeof e==="string"){e=e.split(",");}else{e=[];}var R=[];for(var i=0;i<e.length;i++){if(s[e[i]]){R.push(s[e[i]]);}}return R;};S.info.byIndex=function(i){return s[i];};S.info.getAllBreakpoints=function(){return d;};S.info.hasBreakpointAt=function(i){return d.indexOf(i)>-1;};S.info.addBreakpointAt=function(i){if(d.indexOf(i)>-1){return;}d.push(i);r();};S.info.removeBreakpointAt=function(i){var e=d.indexOf(i);if(e>-1){d.splice(e,1);r();}};S.info.removeAllBreakpoints=function(){d=[];r();};S.info.addSupportInfo=function(i,e){if(i&&e){if(l[i]){l[i]+=","+e;}else{l[i]=e;}}};S.info.byId=function(i){return l[i]||null;};S.info.getIds=function(e){var i=[];for(var n in l){var o=l[n];if(o&&o.indexOf(e)>-1){i.push(n);}}return i;};S.info.getElements=function(e){var C=[];for(var n in l){var o=l[n];if(o&&o.indexOf(e)===0){var i=sap.ui.getCore().byId(n);if(i){C.push(sap.ui.getCore().byId(n));}}}return C;};S.info.getAllXMLModifications=function(){return f;};S.info.hasXMLModifications=function(){return f.length>0;};S.info.addXMLModification=function(i,e,C){f.push({id:i,idx:e,change:C});u();};S.info.removeXMLModification=function(i){var e=f.indexOf(i);if(e>-1){f.splice(e,1);u();}};S.info.removeAllXMLModification=function(){f=[];u();};S.info.modifyXML=function(e,X){if(!S.info.hasXMLModifications()){return;}var n=X;if(!n||!n.nodeType||!(n.nodeType==1||n.nodeType==9)){return;}if(n.nodeType===9){n=n.firstChild;}var N=n.querySelectorAll("*");var o=[n];for(var i=0;i<N.length;i++){o.push(N[i]);}for(var i=0;i<f.length;i++){var y=f[i],C=y.change;if(y.id===e){var z=o[y.idx];if(z.nodeType===1&&C.setAttribute){var O=z.getAttribute(C.setAttribute[0]);z.setAttribute(C.setAttribute[0],C.setAttribute[1]);if(!z._modified){z._modified=[];}z._modified.push(C.setAttribute[0]);if(!z._oldValues){z._oldValues=[];}z._oldValues.push(O);}}}};S.info._breakAtProperty=function(K){return function(e){if(e.getParameter("name")===K){debugger;}};};S.info._breakAtMethod=function(e){return function(){debugger;return e.apply(this,arguments);};};var M=["sap/ui/base/ManagedObject","sap/ui/core/mvc/View","sap/ui/core/XMLTemplateProcessor","sap/ui/thirdparty/datajs"];function x(e,V,X,i){e._supportInfo=S.info;V._supportInfo=S.info;X._supportInfo=S.info;if(window.datajs){window.datajs._sap={_supportInfo:S.info};}q.sap.log.info("sap.ui.core.support.Support.info initialized.");}if(A){sap.ui.require(M,x);}else{x.apply(null,M.map(sap.ui.requireSync));}};return S;});
