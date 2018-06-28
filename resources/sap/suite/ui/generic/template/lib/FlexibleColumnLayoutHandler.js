sap.ui.define(["jquery.sap.global","sap/ui/base/Object","sap/f/FlexibleColumnLayoutSemanticHelper","sap/f/LayoutType"],function(q,B,F,L){"use strict";function o(O){sap.ui.require(["sap/suite/ui/generic/template/lib/routingHelper"],O);}var r=Promise.resolve();var d=2;var c=["begin","mid","end"];var m=["messagePageBeginColumn","messagePageMidColumn","messagePageEndColumn"];function t(v){return c[v]?v:d;}function a(v){return t(v)===v;}function g(v){return c[t(v)]+"ColumnPages";}function b(C){for(var i=0;i<c.length;i++){C(m[i],g(i));}}function e(v){return m[t(v)];}function f(v){return c[t(v)];}function h(R){return R.name.length>5&&R.name.lastIndexOf("query")===R.name.length-"query".length;}function j(T){var i;if(T instanceof sap.ui.table.Table){i=T.getRows();}else if(T instanceof sap.m.Table){i=T.getItems();}return i;}function k(T){var i=j(T);var R=i?i[0]:false;return R;}function l(n,N){var M=N.oTemplateContract.oAppComponent.getConfig();var p=M.settings&&M.settings.flexibleColumnLayout;var s=F.getInstanceFor(n,p);var D=s.getDefaultLayouts();var R;var u;var U;var C;var S;var v=-1;var T=N.oTemplateContract,w=N.oRouter;var x=p&&p.maxColumnCountInFCL||3;var y=p&&p.initialColumnsCount&&p.initialColumnsCount===2||false;var z=p&&p.displayNextObjectAfterDelete&&p.displayNextObjectAfterDelete===true;function A(i){if(i>=x||sap.ui.Device.system.phone){return 1;}else{var y1=p&&p.initialColumnsCount||1;var z1=Math.max(i+1,y1);if(sap.ui.Device.system.tablet&&z1>2){z1=2;}return z1;}}function E(i,y1,z1){i.showBeginColumn=i.viewLevel<3;i.showMidColumn=i.viewLevel===0&&y||i.viewLevel===1||i.viewLevel===2;i.showEndColumn=i.viewLevel>1;var A1=A(i.viewLevel);if(y&&i.viewLevel===0){if(A1===1){i.target=[i.name];i.showMidColumn=false;}else{i.target=[i.name,i.pages[0].entitySet];}}else if(y&&i.viewLevel===1){if(A1===1){i.target=[i.name];i.showBeginColumn=false;}else{i.target=z1;}}else{i.target=i.showMidColumn?z1.concat([y1]):y1;}return g(i.viewLevel);}function G(i){if(i==="OneColumn"&&y){return false;}return i===D.defaultLayoutType||i===D.defaultTwoColumnLayoutType||i===D.defaultThreeColumnLayoutType;}function H(i,y1,z1){var A1=T.mRouteToTemplateComponentPromise[z1];if(A1){return A1.then(function(B1){return N.activateOneComponent(y1,i,B1);});}return r;}function I(i){var y1=i.substring(i.length-5,i.length);if(y1==="query"){return i.substring(0,i.length-5);}return i;}function J(i){return Promise.all(i).then(N.afterActivation);}function K(i,y1){var z1=G(i);if(u&&h(u)){u.arguments.query=u.arguments["?query"];if(z1){delete u.arguments.query.FCLLayout;if(q.isEmptyObject(u.arguments.query)){delete u.arguments.query;u.name=I(u.name);}}else{u.arguments.query.FCLLayout=i;}}else if(!z1){u.name=u.name+"query";u.arguments.query={FCLLayout:i};}var A1=w.getURL(u.name,u.arguments);A1=A1.replace("/?","?");N.navigate(A1,y1);}function O(i,y1){return new Promise(function(z1){o(function(A1){z1(A1.determinePath(i,y1,T.routeViewLevel1.pattern));});});}function P(){var i=function(y1,z1){var A1={};if(!u){z1();return;}var B1=u.event.getParameter("config").viewLevel;if(B1<3){A1.begin={route:"root",path:"",isVisible:U.columnsVisibility.beginColumn};if(B1===0){y1(A1);return;}}var C1=I(u.name);if(B1>0){var D1=f(B1);A1[D1]={route:C1,path:u.path,isVisible:B1>2||(B1===1&&U.columnsVisibility.midColumn)||(B1===2&&U.columnsVisibility.endColumn)};}if(B1===2){O(u.routeConfig,u.event).then(function(E1){A1.mid={route:T.routeViewLevel1.name,path:E1,isVisible:U.columnsVisibility.midColumn};y1(A1);});}else{y1(A1);}};return new Promise(i);}function Q(i){var y1=P();y1.then(function(z1){var A1=[];var B1=[z1.begin,z1.mid,z1.end];var C1=N.performPseudoHashChange(B1);for(var D1 in i){if(i[D1]){var E1=z1[D1];if(E1){A1.push(H(C1,E1.path,E1.route));}}}J(A1);},q.noop);}function V(){return!(U.columnsVisibility.beginColumn?U.columnsVisibility.midColumn:U.columnsVisibility.midColumn&&U.columnsVisibility.endColumn);}function W(i){var y1=s.getCurrentUIState();var z1={};z1.end=U&&(U.columnsVisibility.endColumn!==y1.columnsVisibility.endColumn);z1.mid=U&&(U.columnsVisibility.midColumn!==y1.columnsVisibility.midColumn);z1.begin=U&&(U.columnsVisibility.beginColumn!==y1.columnsVisibility.beginColumn);U=y1;T.oTemplatePrivateGlobalModel.setProperty("/generic/FCL/midActionButtons",{fullScreen:U.actionButtonsInfo.midColumn.fullScreen!==null,exitFullScreen:U.actionButtonsInfo.midColumn.exitFullScreen!==null,closeColumn:U.actionButtonsInfo.midColumn.closeColumn!==null});T.oTemplatePrivateGlobalModel.setProperty("/generic/FCL/endActionButtons",{fullScreen:U.actionButtonsInfo.endColumn.fullScreen!==null,exitFullScreen:U.actionButtonsInfo.endColumn.exitFullScreen!==null,closeColumn:U.actionButtonsInfo.endColumn.closeColumn!==null});T.oTemplatePrivateGlobalModel.setProperty("/generic/FCL/isVisuallyFullScreen",V());var A1;if(U.columnsVisibility.endColumn){A1=T.oTemplatePrivateGlobalModel.getProperty("/generic/routeLevel");}else if(U.columnsVisibility.midColumn){A1=1;}else{A1=0;}T.oTemplatePrivateGlobalModel.setProperty("/generic/FCL/highestViewLevel",A1);var B1;if(U.columnsVisibility.midColumn){B1=1;}else{B1=T.oTemplatePrivateGlobalModel.getProperty("/generic/routeLevel");}T.oTemplatePrivateGlobalModel.setProperty("/generic/FCL/lowestDetailViewLevel",B1);if(u&&C!==U.layout){K(U.layout,true);}else if((z1.begin||z1.mid||z1.end)&&!i){Q(z1);}}function X(i,y1,z1,A1){return new Promise(function(B1){W(true);var C1=P();C1.then(function(D1){var E1=[];for(var F1 in D1){var G1=D1[F1];if(G1.isVisible){E1.push(H(A1,G1.path,G1.route));}}J(E1).then(B1);});});}function Y(i){i=q.extend({},i);u={name:i.getParameter("name"),arguments:i.getParameter("arguments"),event:i};var y1=i.getParameter("config").viewLevel;var z1=i.getParameter("arguments")["?query"];if(a(y1)){C=(z1&&z1.FCLLayout);if(!C){switch(y1){case 0:var A1=s.getNextUIState(0).columnsVisibility;if(A1.midColumn){C=D.defaultTwoColumnLayoutType;}else{C=D.defaultLayoutType;if(A(y1)>1){K(D.defaultLayoutType,true);}}break;case 1:C=D.defaultTwoColumnLayoutType;break;case 2:C=D.defaultThreeColumnLayoutType;}}}else{C=L.EndColumnFullScreen;}n.setLayout(C);}function Z(i,y1,z1,A1){v=-1;var B1=T.oTemplatePrivateGlobalModel.getProperty("/generic/routeLevel");R=B1===2?i:null;u.path=z1;u.routeConfig=y1;return X(i,y1,z1,A1);}function $(i){return G(i)?{}:{FCLLayout:[i]};}function _(i){return i===L.EndColumnFullScreen||i===L.MidColumnFullScreen;}function a1(i,y1){if(!a(i)){return N.getParStringPromise(y1,false);}var z1=S||s.getNextUIState(i).layout;q.extend(y1,$(z1));S=null;if(_(z1)){return N.getParStringPromise(y1,false);}var A1=(i===2)?N.addUrlParameterInfoForRoute(T.routeViewLevel1.name,y1):r;return new Promise(function(B1){A1.then(function(){N.getParStringPromise(y1,true).then(B1);});});}function b1(){S=U.actionButtonsInfo.midColumn.closeColumn;N.navigateToRoot(true);}function c1(){S=U.actionButtonsInfo.endColumn.closeColumn;var i=R.getParameter("config");O(i,R).then(function(y1){N.navigateToContext(y1,null,true,0);});}function d1(i,y1){var z1=N.oHashChanger.getHash()||"";z1=z1.split("?")[0];var A1=N.getParStringPromise(i,y1);N.navigateToParStringPromise(z1,A1,false);}function e1(i){if(i===0&&u1()){return L.OneColumn;}else if(i===1){return L.MidColumnFullScreen;}else if(i===2){return L.EndColumnFullScreen;}else{return"";}}function f1(){var y1=U.actionButtonsInfo.midColumn.fullScreen;var z1;if(y1===null){y1=U.actionButtonsInfo.endColumn.fullScreen;var A1=N.getActiveComponents();for(var i=0;i<A1.length;i++){var B1=T.componentRegistry[A1[i]];if(B1.viewLevel===2){z1=B1.route;break;}}}else{z1=T.routeViewLevel1.name;}var C1=$(y1);N.addUrlParameterInfoForRoute(z1,C1).then(function(){d1(C1,false);});}function g1(){var i=U.actionButtonsInfo.midColumn.exitFullScreen;var y1;var z1;if(i===null){i=U.actionButtonsInfo.endColumn.exitFullScreen;}var A1=$(i);if(i===U.actionButtonsInfo.endColumn.exitFullScreen){var B1=N.getActiveComponents();var C1=B1[0];var D1=T.componentRegistry[C1];if(D1){y1=N.addUrlParameterInfoForRoute(D1.route,A1);z1=O(u.routeConfig,u.event);}}(y1||r).then(function(){(z1||r).then(function(E1){var F1=N.addUrlParameterInfoForRoute(T.routeViewLevel1.name,A1,E1);F1.then(function(){d1(A1,true);});});});}function h1(i){return a(i)&&{onCloseColumnPressed:i===1?b1:c1,onFullscreenColumnPressed:f1,onExitFullscreenColumnPressed:g1};}function i1(i){return T.oApplicationProxy.getDraftSiblingPromise(i);}function j1(i){if(T.oTemplatePrivateGlobalModel.getProperty("/generic/FCL/highestViewLevel")===2){var y1=R.getParameter("config");var z1=T.mRouteToTemplateComponentPromise[I(y1.name)];var A1=new Promise(function(B1,C1){z1.then(function(D1){var E1=D1.getBindingContext();var F1=i1(E1,true);F1.then(function(G1){o(function(H1){var I1=y1.navigationProperty;var J1=i.getPath()+"/"+H1.determineNavigationPath(G1,I1).path;S=U.layout;N.navigateToContext(J1,null,true,2);B1();});},C1);},C1);});T.oBusyHelper.setBusy(A1);}else{N.navigateToContext(i,null,true,2);}}function k1(i){if(T.oTemplatePrivateGlobalModel.getProperty("/generic/FCL/highestViewLevel")!==2){return Promise.resolve(i);}var y1=new Promise(function(z1){var A1=R.getParameter("config");var B1=T.mRouteToTemplateComponentPromise[I(A1.name)];B1.then(function(C1){var D1=C1.getBindingContext();var E1=i1(D1,true);E1.then(function(F1){if(!F1){z1(i);return;}o(function(G1){var H1=A1.navigationProperty;var I1=i.getPath()+"/"+G1.determineNavigationPath(F1,H1).path;z1(I1);});});});});T.oBusyHelper.setBusy(y1);return y1;}T.oTemplatePrivateGlobalModel.setProperty("/generic/FCL",{});function l1(i){var y1=N.getTargetLevel(i);switch(y1){case 1:return!U.columnsVisibility.midColumn;case 2:return!U.columnsVisibility.endColumn;default:return true;}}function m1(i){C=s.getNextUIState(i).layout;n.setLayout(C);}function n1(){return!V();}function o1(y1){v=t(y1.viewLevel);m1(y1.viewLevel);var z1=N.oRouter.getTargets();var A1=e(y1.viewLevel);z1.display(A1);var B1;if(y1.viewLevel===v){B1=[];for(var i=0;i<y1.viewLevel;i++){B1.push(true);}}return B1;}function p1(i){if(i<v||v<0){return U.columnsVisibility[f(i)+"Column"];}return false;}function q1(i,y1){if(!a(y1)){return i;}var z1=s.getNextUIState(y1).layout;if(G(z1)){return i;}return i+"?FCLLayout="+z1;}function r1(){return x;}function s1(i,y1){if(!y){return;}var z1=false;var A1=s.getNextUIState(0).columnsVisibility;if(A1.midColumn){var B1=u.event.getParameter("config").viewLevel;if(B1===0){z1=true;if(h(u)){u.arguments.query=u.arguments["?query"];if(u.arguments.query.FCLLayout==="OneColumn"){z1=false;}}}}if(z1){if(i){y1(i);}else{N.navigateToRoot(true);}}else{return;}}function t1(){return z;}function u1(){return y;}function v1(i,y1,z1){var A1;A1=k(i);T.oApplicationProxy.setListReportTable(i);if(u1&&u1()){s1(A1,function(){setTimeout(function(){z1.oCommonEventHandlers.onListNavigate(A1,y1);},0);});}}function w1(){S=L.OneColumn;}function x1(i){return{oActionButtonHandlers:h1(i),navigateToDraft:j1,getMaxColumnCountInFCL:r1,handleListReceived:s1,handleDataReceived:v1,isListAndFirstEntryLoadedOnStartup:u1};}n.attachStateChange(W.bind(null,false));return{adaptRoutingInfo:E,createMessagePageTargets:b,displayMessagePage:o1,isLevelActive:p1,handleBeforeRouteMatched:Y,handleRouteMatched:Z,getAppStateParStringForNavigation:a1,getActionButtonHandlers:h1,getTargetAfterCancelPromise:k1,isNewHistoryEntryRequired:l1,adaptBreadCrumbUrl:q1,isAppTitlePrefered:n1,getFullscreenLayout:e1,getMaxColumnCountInFCL:r1,isNextObjectLoadedAfterDelete:t1,getFclProxyForView:x1,setStoredTargetLayoutToOneColumn:w1,isListAndFirstEntryLoadedOnStartup:u1};}return B.extend("sap.suite.ui.generic.template.lib.FlexibleColumnLayoutHandler",{constructor:function(i,n){q.extend(this,l(i,n));}});});
