// Copyright (c) 2009-2017 SAP SE, All Rights Reserved
sap.ui.define([],function(){"use strict";function U(){var r=/^(([A-Za-z0-9_\/]+)-([A-Za-z0-9_\/\-]+)(~([A-Z0-9a-z=+\/]+))?)?([?]([^&]|(&[^\/]))*&?)?$/;this.getShellHash=function(s){var a=/[^#]*#(([^&]|&[^\/])*)(&\/.*)?/,m=a.exec(s);if(m){return m[1];}return undefined;};this.getHash=function(u){var a=/#(.*)/,m=a.exec(u);if(m){return m[1];}return undefined;};this.isIntentUrl=function(u){var a=/^#/,t,l,T,L,h,p;if(typeof u!=="string"){return false;}if(!a.test(u)){t=(new URI(u)).normalize();T=t.protocol()+"://"+t.host()+t.pathname();l=(new URI(window.location.href)).normalize();L=l.protocol()+"://"+l.host()+l.pathname();if(T!==L){return false;}}h=this.getHash(u);if(!h){return false;}p=this.parseShellHash(h);if(p&&p.semanticObject&&p.action){return true;}return false;};this.parseParameters=function(p){if(!p){return{};}return jQuery.sap.getUriParameters(p).mParams||{};};this.paramsToString=function(p){return this.privparamsToString(p,"&","=");};this.privparamsToString=function(p,d,A){var f,a,k,i,l,s="";f="";a=null;l=[];for(a in p){if(p.hasOwnProperty(a)){l.push(a);}}l.sort();for(k=0;k<l.length;k=k+1){a=l[k];if(jQuery.isArray(p[a])){for(i=0;i<p[a].length;i=i+1){s+=f+encodeURIComponent(a)+A+encodeURIComponent(p[a][i]);f=d;}}else{s+=f+encodeURIComponent(a)+A+encodeURIComponent(p[a]);f=d;}}return s;};this.parseShellHash=function(h){var a=r,s,S,A,c,p,m,d;if(!h){return undefined;}s=this.splitHash(h);m=a.exec(s.shellPart);if(m){S=m[2];A=m[3];c=m[5];p=m[6];d=this.parseParameters(p);return{semanticObject:S,action:A,contextRaw:c,params:d,appSpecificRoute:s.appSpecificRoute};}if(s.appSpecificRoute){return{semanticObject:undefined,action:undefined,contextRaw:undefined,params:{},appSpecificRoute:s.appSpecificRoute};}return undefined;};this.privstripLeadingHash=function(h){if(h[0]==='#'){return h.substring(1);}return h;};this.splitHash=function(h){var a=/^(?:#|)([\S\s]*?)(&\/[\S\s]*)?$/,m,s,A;if(h===undefined||h===null||h===""){return{};}m=a.exec(h);s=m[1];if(s!==""&&!r.test(s)){return{};}A=m[2];if(s||A){return{shellPart:s,appSpecificRoute:A};}return{};};function b(u,a){if(a){return u+a;}return u;}this.constructShellHash=function(s){var c,p,d,i=null,k,l=[],f="?",a=null;if(!s){return"";}if(!s.target){s.target={};s.target.semanticObject=s.semanticObject;s.target.action=s.action;s.target.contextRaw=s.contextRaw;}if(s.target.shellHash||s.target.shellHash===""){d=this.privstripLeadingHash(s.target.shellHash);return b(d,s.appSpecificRoute);}if(s.target.semanticObject&&s.target.action){c=s.target.semanticObject+"-"+s.target.action.replace(/[?].*/,"");}else{return b("",s.appSpecificRoute);}if(s.target.contextRaw){c+="~"+s.target.contextRaw;}f="?";a=null;l=[];for(a in s.params){if(s.params.hasOwnProperty(a)){l.push(a);}}p=(s.params&&JSON.parse(JSON.stringify(s.params)))||{};if(s.appStateKey){l.push("sap-xapp-state");p["sap-xapp-state"]=s.appStateKey;}l.sort();for(k=0;k<l.length;k=k+1){a=l[k];if(jQuery.isArray(p[a])){if(p[a].length>1){jQuery.sap.log.error("Array startup parameters violate the designed intent of the Unified Shell Intent, use only single-valued parameters!");}for(i=0;i<p[a].length;i=i+1){c+=f+encodeURIComponent(a)+"="+encodeURIComponent(p[a][i]);f="&";}}else{c+=f+encodeURIComponent(a)+"="+encodeURIComponent(p[a]);f="&";}}return b(c,s.appSpecificRoute);};this.addSystemToServiceUrl=function(s,c){var R,C,S=c;if(!s||s.indexOf('/')!==0||s.indexOf('//')===0){throw new sap.ushell.utils.Error("Invalid URL: "+s,"sap.ushell.services.URLParsing");}if(c instanceof sap.ui.core.Component){C=(typeof c.getComponentData==="function")&&c.getComponentData();S=C&&C.startupParameters&&C.startupParameters["sap-system"]&&C.startupParameters["sap-system"][0];}R=sap.ushell.Container.getService("NavTargetResolution").getCurrentResolution();if(!S&&!c&&R&&R.url){S=jQuery.sap.getUriParameters(R.url).get("sap-system");}if(/^[^?]*(;mo([\/;?]|$))/.test(s)){s=s;}else if(/^[^?]*(;o=([\/;?]|$))/.test(s)){s=s.replace(/;o=([\/;?]|$)/,(S?";o="+S:"")+"$1");}else if(!/^[^?]*;o=/.test(s)&&S){s=s.replace(/(\/[^?]*?)(\/$|$|(\/?\?.*))/,"$1;o="+S+"$2");}sap.ushell.Container.addRemoteSystemForServiceUrl(s);return s;};};U.hasNoAdapter=true;return U;},true);
