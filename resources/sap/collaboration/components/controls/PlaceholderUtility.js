/**
 * ! SAP UI development toolkit for HTML5 (SAPUI5)
 * 
 * (c) Copyright 2009-2017 SAP SE. All rights reserved
 */
sap.ui.define(['sap/ui/base/Object'],function(B){"use strict";var c="sap.collaboration.components.controls.PlaceholderUtility";var a=/@@.\{\d+\}/;var b=/@@[o]\{\d+\}/;var p=B.extend(c,{});p.getAtMentionsValues=function(t,T){var P=new RegExp(a);var s=this.splitByPlaceholders(T);var d=t;var e=[];var f=0;for(var i=0;i<s.length;i++){var g=s[i];if(P.test(g)==true){var n=s[i+1];var h="";if(n==""){var j=s[i+2];if(j==undefined){h=d;d=d.slice(d.indexOf(n));}else if(P.test(j)==true){h=this._findFirstPlaceholderValueInText(d);d=d.slice(h.length);}}else if(n==" "){h=this._findFirstPlaceholderValueInText(d);d=d.slice(h.length);}else{h=d.slice(0,d.indexOf(n));d=d.slice(d.indexOf(n));}if(!P.test(h)){e.push({placeholder:"@@m{"+f+"}",value:h});f++;}}else{d=d.slice(g.length);}}return e;};p.getContentItemName=function(A,s){var d=A;var e=s.split(b);for(var i=0;i<e.length;i++){d=d.replace(e[i],"");}var C=d.trim();return C;};p.splitByPlaceholders=function(t){var s=[];if(t){var d=/@@.\{\d+\}/g;var S=t.split(d);var P=t.match(d);var e=P==null?0:P.length;for(var i=0;i<S.length+e;i++){if(i%2==0){s.push(S[i/2]);}else{s.push(P[Math.floor(i/2)]);}}}return s;};p._findFirstPlaceholderValueInText=function(t){var P;if(t.search(a)==0){P=t.match(a)[0];}else{P=t[0]+t[1];for(var i=2;i<t.length;i++){if(t[i]==="\u200E"||t[i]==="\u200F"||t[i]==='@'){break;}P+=t[i];}}P=P.trim();return P;};Object.freeze(p);return p;},true);
