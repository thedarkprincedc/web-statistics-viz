sap.ui.define([],function(){"use strict";var t=0;var p;var s={};var c=0;var S={};var C=[];function a(d){return function(I){if(t>=0){return null;}var l=d.log||[];for(var i=0;i<l.length;i++){var L=l[i];if(L.me===I){return L.args;}}};}function r(d){delete d.replace;delete d.observer;if(d.log){if(d.isStatic){var n=[];for(var i=0;i<d.log.length;i++){var l=d.log[i];if(l.testMode===0){n.push(l);}}if(n.length>0){d.log=n;}else{delete d.log;}}else{delete d.log;}}}function b(){C.forEach(r);}function o(f,d){var e;for(var i=0;i<C.length;i++){e=C[i];if(e.fnConstructor===f){e.isStatic=e.isStatic||d;return e;}}e={fnConstructor:f,isStatic:d};e.observable=function(){var g=e.replace?e.observer:f;var R=Object.create(g.prototype);R=g.apply(R,arguments)||R;if(t<0||(t===0&&e.isStatic)){var l={me:R,args:arguments,testMode:t};e.log=e.log||[];e.log.push(l);if(e.observer&&!e.replace){e.observer(R,arguments);}}return R;};C.push(e);return e;}return{startTest:function(){if(t!==0){return null;}t=-1;p={};return p;},endTest:function(){if(t<0){t=0;p=null;b();}},startApp:function(){if(t<0){return{};}t++;c++;var R={id:c};s[c]=R;return R;},endApp:function(A){if(t>0){var i=A.id;if(A===s[i]){t--;delete s[i];}}},testable:function(f,n){if(t===-1){p[n]=f;return function(){return p[n].apply(null,arguments);};}return f;},testableStatic:function(f,n){if(t>0||(t===0&&S[n])){return f;}S[n]=S[n]||f;return function(){return S[n].apply(null,arguments);};},getStaticStub:function(){return t===-1&&S;},observableConstructor:function(f,d){if(t>0){return f;}return o(f,d).observable;},observeConstructor:function(f,O,R){if(t>=0){return null;}var d=o(f);if(O&&d.observer){throw new Error("Constructor is already observed");}d.observer=O;d.replace=O&&R;return a(d);}};});
