// Copyright (c) 2009-2017 SAP SE, All Rights Reserved
sap.ui.define(["sap/ushell/services/_ClientSideTargetResolution/Utils"],function(u){"use strict";var _={};function b(g){var L,o,s=g();if(!s.hasOwnProperty("logId")){throw new Error("'logId' argument was not provided in #begin method of StagedLogger.");}L=s.logId;if(_[L]){throw new Error("'cannot call #begin twice with same log id: '"+L+"'");}else{_[L]={};}o=_[L];o.title=s.title||null;o.moduleName=s.moduleName||null;var r=function(c,n){if(n===1){return c}else{return r(c,n-1)+c;}};o.stages=s.stages.map(function(S){return[S,r('-',S.length)];});return L;}function l(g){var L,c,s,d,p,S,n,A;A=g();if(!A.hasOwnProperty("logId")){throw new Error("'logId' argument was not provided in #log method of StagedLogger.");}L=A.logId;S=A.stage;p=A.prefix;d=A.lines;s=A.line;n=A.number;if(!d&&s&&p){s=p+" "+s;}c=_[L].stages[S-1];if(s){c.push(s);}if(d){if(p){p=(s?" ":"")+p;}var f=d.map(function(s,i){return(n?(i+1):"")+(p?p+" ":"")+s;});c.push.apply(c,f);}}function e(g){var A,L,s;A=g();if(!A.hasOwnProperty("logId")){throw new Error("'logId' argument was not provided in #log method of StagedLogger.");}s=A.logId;L=_[s];if(typeof L!=="object"){throw new Error("Logger .end was called on an already ended logger");}var c=L.stages.map(function(S){return S.join("\n");}).join("\n\n");jQuery.sap.log.debug("[REPORT #"+s+"] "+L.title,"\n"+c+"\n",L.moduleName);delete _[s];}function a(){return _;}return{begin:function(){if(!u.isDebugEnabled()){return;}b.apply(null,arguments);},log:function(){if(!u.isDebugEnabled()){return;}l.apply(null,arguments);},end:function(){if(!u.isDebugEnabled()){return;}e.apply(null,arguments);},_getLogs:a};});
