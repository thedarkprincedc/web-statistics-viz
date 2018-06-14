sap.ui.define(["jquery.sap.global","sap/ui/base/Object"],function(q,B){"use strict";function g(s){var p;var P;function f(){if(s.processName){q.sap.log.info("Process "+s.processName+" started");}p=p||new Promise(function(r){P=r;});}function a(){if(s.processName){q.sap.log.info("Process "+s.processName+" stopped");}if(p){P();p=null;P=null;}}if(s.eventHandlers){s.eventHandlers.attachProcessStart(f);s.eventHandlers.attachProcessStop(a);}function h(){var o=null;for(var i=0;i<s.processObservers.length&&!o;i++){var d=s.processObservers[i];o=d.getProcessFinished();}if(o){f();o.then(h);}else{a();}}function b(A){if(!p&&s.processObservers){h();}return p||(A&&Promise.resolve());}function c(o){s.processObservers.push(o);}return{startProcess:f,stopProcess:a,getProcessFinished:b,addObserver:c};}return B.extend("sap.suite.ui.generic.template.lib.ProcessObserver",{constructor:function(s){q.extend(this,g(s||{}));}});});
