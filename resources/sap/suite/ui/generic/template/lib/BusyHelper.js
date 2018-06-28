sap.ui.define(["jquery.sap.global","sap/ui/base/Object","sap/suite/ui/generic/template/lib/MessageUtils","sap/suite/ui/generic/template/lib/testableHelper"],function(q,B,M,t){"use strict";function g(T){var b={};var i=false;var a=false;var c=0;var d=T.oNavigationHost.getBusyIndicatorDelay();var u=Promise.resolve();var U=q.noop;var o={};function e(){return c!==0||!q.isEmptyObject(b);}var A;function f(I){var l=e();if(l||I){a=false;T.oNavigationHost.setBusy(l);q.sap.log.info("Physical busy state has been changed to "+l);if(l!==i){i=l;if(!i){T.oNavigationHost.setBusyIndicatorDelay(d);M.handleTransientMessages(T.oApplicationProxy.getDialogFragment,o.actionLabel);o={};U();}}}else{var n=T.oNavigationObserver.getProcessFinished(true);n.then(A,A);}}A=f.bind(null,true);function E(I){if(I){T.oNavigationHost.setBusyIndicatorDelay(0);f();}else if(!a){a=true;setTimeout(f,0);}}function h(){c--;if(!c){E(false);}}function m(){if(i){return;}i=true;u=new Promise(function(r){U=r;});M.removeTransientMessages();}function s(r,I,l,S){if(I){q.extend(o,S);m();b[r]=true;}else{delete b[r];}E(l);}function j(l,I,S){q.extend(o,S);c++;m();l.then(h,h);E(I);}function k(){return d;}return{setBusyReason:s,setBusy:j,isBusy:e,getUnbusy:function(){return u;},getBusyDelay:k};}return B.extend("sap.suite.ui.generic.template.lib.BusyHelper",{constructor:function(T){q.extend(this,(t.testableStatic(g,"BusyHelper"))(T));}});});
