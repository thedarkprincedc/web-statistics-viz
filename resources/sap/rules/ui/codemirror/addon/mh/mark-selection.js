// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: http://codemirror.net/LICENSE
(function(m){if(typeof exports=="object"&&typeof module=="object")m(require("../../lib/codemirror"));else if(typeof define=="function"&&define.amd)define(["../../lib/codemirror"],m);else m(CodeMirror);})(function(C){"use strict";C.defineOption("styleSelectedText",false,function(f,v,g){var p=g&&g!=C.Init;if(v&&!p){f.state.markedSelection=[];f.state.markedSelectionStyle=typeof v=="string"?v:"CodeMirror-selectedtext";r(f);f.on("cursorActivity",o);f.on("change",a);}else if(!v&&p){f.off("cursorActivity",o);f.off("change",a);e(f);f.state.markedSelection=f.state.markedSelectionStyle=null;}});function o(f){f.operation(function(){u(f);});}function a(f){if(f.state.markedSelection.length)f.operation(function(){e(f);});}var b=8;var P=C.Pos;var c=C.cmpPos;function d(f,g,t,h){if(c(g,t)==0)return;var i=f.state.markedSelection;var j=f.state.markedSelectionStyle;for(var l=g.line;;){var s=l==g.line?g:P(l,0);var k=l+b,m=k>=t.line;var n=m?t:P(k,0);var p=f.markText(s,n,{className:j});if(h==null)i.push(p);else i.splice(h++,0,p);if(m)break;l=k;}}function e(f){var g=f.state.markedSelection;for(var i=0;i<g.length;++i)g[i].clear();g.length=0;}function r(f){e(f);var g=f.listSelections();for(var i=0;i<g.length;i++)d(f,g[i].from(),g[i].to());}function u(f){if(!f.somethingSelected())return e(f);if(f.listSelections().length>1)return r(f);var g=f.getCursor("start"),t=f.getCursor("end");var h=f.state.markedSelection;if(!h.length)return d(f,g,t);var i=h[0].find(),j=h[h.length-1].find();if(!i||!j||t.line-g.line<b||c(g,j.to)>=0||c(t,i.from)<=0)return r(f);while(c(g,i.from)>0){h.shift().clear();i=h[0].find();}if(c(g,i.from)<0){if(i.to.line-g.line<b){h.shift().clear();d(f,g,i.to,0);}else{d(f,g,i.from,0);}}while(c(t,j.to)<0){h.pop().clear();j=h[h.length-1].find();}if(c(t,j.to)>0){if(t.line-j.from.line<b){h.pop().clear();d(f,j.from,t);}else{d(f,j.to,t);}}}});