jQuery.sap.declare("sap.apf.core.layeredRepositoryProxy");jQuery.sap.require('sap.apf.utils.utils');jQuery.sap.require('sap.apf.core.constants');jQuery.sap.require('sap.apf.utils.hashtable');jQuery.sap.require('sap.ui.fl.LrepConnector');jQuery.sap.require('sap.apf.utils.parseTextPropertyFile');(function(){'use strict';sap.apf.core.LayeredRepositoryProxy=function(s,a){var c=a.instances.coreApi;var b;var m=a.instances.messageHandler;var n='sap/apf/dt';var t='text.properties';var d=new sap.apf.utils.Hashtable(a.instances.messageHandler);var e=new sap.apf.utils.Hashtable(a.instances.messageHandler);var f;var g=false;this.getConnector=function(){return b;};this.readEntity=function(N,O,P,Q,R,S,T){var U=P[0].value;var V=v(R);var W=[];var X=false;var Y=1;var Z=0;var $;var _;var a1;var i;var b1;var c1;var d1;var e1;var f1=q(S);var g1;m.check(N==='configuration',"layered repository proxy - only read entity of configuration supported");if(T&&T.noMetadata){b.getStaticResource(V,U,'apfconfiguration').then(function(l1){a1={Application:R};e1=l1.response;if(typeof e1==='string'){a1.SerializedAnalyticalConfiguration=e1;}else{a1.SerializedAnalyticalConfiguration=JSON.stringify(e1);}a1.AnalyticalConfiguration=U;O(a1,u());},function(l1){O(undefined,u(),r({code:'5221',aParameters:[R,U]},l1&&l1.messages));});return;}if(Q===undefined||Q.indexOf("SerializedAnalyticalConfiguration")>=0){X=true;if(f1==='VENDOR'){var h1={contentType:'application/json'};var i1=[];i1.push({name:"layer",value:f1});i1.push({name:"dt",value:"true"});var j1="/sap/bc/lrep/content/"+V+"/"+U+'.apfconfiguration';j1+=b._buildParams(i1);g1=b.send(j1,'GET',undefined,h1);}else{g1=b.getStaticResource(V,U,'apfconfiguration');}W.push(g1);}else{Y=0;}$=o(R,U);if($===undefined){var k1=b.getFileAttributes(V,U,'apfconfiguration',f1);W.push(k1);}_=Promise.all(W);_.then(function(l1){$=o(R,U);if($===undefined){$=l1[Y].response;}p(R,U,$);a1=H(R,$);if(X){e1=l1[Z].response;if(typeof e1==='string'){a1.SerializedAnalyticalConfiguration=e1;}else{a1.SerializedAnalyticalConfiguration=JSON.stringify(e1);}}a1.AnalyticalConfiguration=U;if(Q&&Q.length!==0){b1=Q.length;c1={};for(i=0;i<b1;i++){d1=Q[i];c1[d1]=a1[d1];}a1=c1;}O(a1,u());},function(l1){O(undefined,u(),r({code:'5221',aParameters:[R,U]},l1&&l1.messages));});};this.doChangeOperationsInBatch=function(N,O,P){function Q(T,U){O(U);}var i,R;function S(){}y(P).then(function(){for(i=0;i<N.length;i++){R=N[i];R.application=P;if(R.method==='DELETE'&&R.entitySetName==='texts'){w(R,S);}else if(R.method==='POST'&&sap.apf.utils.isValidPseudoGuid(R.data.TextElement)){z(R.data,S);}else{z(R.data,S);}}A(P,Q,true);}).fail(function(T){O(T);});};this.readCollectionsInBatch=function(N,O){var P=N.length;var Q=[];var R=0;function S(U){function V(W,X,Y){if(Y){O(undefined,Y);}else{R++;Q[U]=W;if(R===P){O(Q);}}}return V;}for(var i=0;i<P;i++){var T=N[i];this.readCollection(T.entitySetName,S(i),T.inputParameters,T.selectList,T.filter);}};this.readCollection=function(i,N,O,P,Q,R){var T,S;var U;var V;if(R&&R.layer){V=R.layer;}else{V="CUSTOMER";}var W=function(X,Y){if(Y&&(Y==="error"||Y==="timeout"||Y==="abort"||Y==="parsererror")){N(undefined,u(),r({code:'5222',aParameters:[S]},[Y]));return;}var Z=new sap.apf.utils.Hashtable(m);var $=[];var _=(X&&X.response)||(X&&X.responseText)||"";var a1=sap.apf.utils.parseTextPropertyFile(_,{instances:{messageHandler:m}});var b1,c1;if(a1.Messages.length>0){b1=m.createMessageObject({code:'5416'});c1=b1;a1.Messages.forEach(function(d1){c1.setPrevious(d1);c1=d1;});}Z=new sap.apf.utils.Hashtable(m);a1.TextElements.forEach(function(d1){if(d1.TextElement){Z.setItem(d1.TextElement,d1);$.push(d1);}});d.setItem(S,Z);N($,u(),b1);};if(i==='application'){m.check(!O&&!P&&!Q,"unsupported parameters when calling readCollection for application");M(N,V);}else if(i==='texts'){T=Q.getFilterTermsForProperty('Application');S=T[0].getValue();U=x(S,R);U.then(function(X){W(X);},function(X){N(undefined,u(),r({code:'5222',aParameters:[S]},X&&X.messages));});}else if(i==='configuration'){T=Q.getFilterTermsForProperty('Application');S=T[0].getValue();B(S,N,P);}};this.remove=function(i,N,O,P,Q,R){if(!R){R="CUSTOMER";}if(i==='application'){K(N,O,R);}else if(i==='configuration'){G(N,O,Q,R);}else{m.check(false,'the remove operation on entity set '+i+' is currently not supported by the lrep proxy');}};this.create=function(i,N,O,P){if(i==='application'){I(N,O,P);}else if(i==='configuration'){F(N,O,P);}else if(i==='texts'){z(N,O);}else{m.check(false,'the create operation on entity set '+i+' is currently not supported by the lrep proxy');}};this.update=function(i,N,O,P){if(i==='configuration'){E(N,O);}else if(i==='application'){J(N,O);}else{m.check(false,'the update operation on entity set '+i+' is currently not supported by the lrep proxy');}};function h(i,N){var O={async:true,contentType:'application/json'};var P=[];P.push({name:"layer",value:i});P.push({name:"deep-read",value:true});P.push({name:"metadata",value:true});P.push({name:"type",value:N});var R="/sap/bc/lrep/content/"+n+"/";R+=b._buildParams(P);return b.send(R,'GET',undefined,O);}function j(i){var n=i.ns.split('/');return n[n.length-2];}function k(i,N){var O;i.metadata.forEach(function(P){if(P.name===N){O=P.value;}});return O;}this.readAllConfigurationsFromVendorLayer=function(){var i=jQuery.Deferred();var N=[];h('VENDOR','apf*').then(function(O){var P={};O.response.forEach(function(Q){if(Q.fileType&&Q.fileType==='apfapplication'){P[j(Q)]=k(Q,'apfdt-applname');}});O.response.forEach(function(Q){var R;var S;var T;if(Q.fileType&&Q.fileType==="apfconfiguration"){R=j(Q);S=Q.name;if(!(sap.apf.utils.isValidPseudoGuid(R)&&sap.apf.utils.isValidPseudoGuid(S))){return;}T=k(Q,'apfdt-configname');N.push({configurationText:T,applicationText:P[R],value:R+'.'+S});}});i.resolve(N);},function(O){i.reject(r({code:'5231'},O&&O.messages));});return i.promise();};l();function l(){if(a.constructors&&a.constructors.LrepConnector){b=a.constructors.LrepConnector.createConnector();}else{b=sap.ui.fl.LrepConnector.createConnector();}if(!b._sClient){b._sClient=c.getStartParameterFacade().getSapClient();}}function o(i,N){var O=e.getItem(i);if(O===undefined){return;}N=O.getItem(N);return N;}function p(i,N,O){var P=e.getItem(i);if(P===undefined){P=new sap.apf.utils.Hashtable(m);}P.setItem(N,O);e.setItem(i,P);}function q(i){var N=(i&&i.layer)||"CUSTOMER";if(N==="ALL"){return undefined;}return N;}function r(i,N){var O=m.createMessageObject(i);var P="";if(N){N.forEach(function(Q){P=P+Q+' ';});O.setPrevious(m.createMessageObject({code:5220,aParameters:[P]}));}return O;}function u(){return{};}function v(i){return n+'/'+i;}function w(i,N){var O=i.application;var P=i.inputParameters[0].value;var Q;y(O).done(function(){Q=d.getItem(O);Q.removeItem(P);N(i,u());}).fail(function(R){N(undefined,u(),R);});}function x(i,N){var O;var P=[];var R="/sap/bc/lrep/content/";var Q=q(N);R+=n+"/"+i+'/'+t;if(Q){P.push({name:"layer",value:Q});}O={contentType:'text/plain'};R+=b._buildParams(P);return b.send(R,'GET',undefined,O);}function y(i){var N=jQuery.Deferred();var O;var P=d.getItem(i);var Q=function(R){var S=(R&&R.response)||(R&&R.responseText)||"";var T=sap.apf.utils.parseTextPropertyFile(S,{instances:{messageHandler:m}});P=new sap.apf.utils.Hashtable(m);T.TextElements.forEach(function(U){if(U.TextElement){P.setItem(U.TextElement,U);}});d.setItem(i,P);N.resolve({});};if(P===undefined){O=x(i);O.then(function(R){Q(R);},function(R){N.reject(r({code:'5222',aParameters:[i]},R&&R.messages));});}else{N.resolve({});}return N.promise();}function z(i,N){var O=i.Application;if(i.TextElement===undefined||!sap.apf.utils.isValidGuid(i.TextElement)){i.TextElement=sap.apf.utils.createPseudoGuid();}y(O).done(function(){var P=d.getItem(O);P.setItem(i.TextElement,i);N(i,u());}).fail(function(P){N(undefined,u(),P);});}function A(i,N,O){var P=v(i);var Q;function R(){var T=sap.apf.utils.renderHeaderOfTextPropertyFile(i,m);T=T+sap.apf.utils.renderTextEntries(Q,m);var U=b.upsert(P,'text','properties',"CUSTOMER",T,'text/plain');U.then(function(V){N(u());},function(V){N(u(),r({code:'5230',aParameters:[i]},V&&V.messages));});}Q=d.getItem(i);if(!Q){N(u());return;}if(O){R();}else{var S=x(i);S.then(function(T){var U=(T&&T.response)||"";var V=sap.apf.utils.parseTextPropertyFile(U,{instances:{messageHandler:m}});V.TextElements.forEach(function(W){if(W.TextElement){Q.setItem(W.TextElement,W);}});R();},function(T){N(u(),r({code:'5222',aParameters:[i]},T&&T.messages));});}}function B(i,N,O){var P=[];var Q=v(i);var R=b._buildParams([{name:"layer",value:"CUSTOMER"},{name:"metadata",value:"true"},{name:"type",value:"apfconfiguration"}]);var S=b.send("/sap/bc/lrep/content/"+Q+R);S.then(function(T){var U=T.response;U.forEach(function(W){if(W.fileType==="apfconfiguration"){W.metadata.forEach(function(X){if(X.name==="apfdt-configname"){P.push({AnalyticalConfiguration:W.name,Application:i,AnalyticalConfigurationName:X.value});}});}});if(O&&O.indexOf("SerializedAnalyticalConfiguration")>=0){var V=[];P.forEach(function(W){var X=jQuery.Deferred();V.push(X);b.getStaticResource(Q,W.AnalyticalConfiguration,'apfconfiguration').then(function(Y){if(Y.response){W.SerializedAnalyticalConfiguration=JSON.stringify(Y.response);X.resolve();}else{X.reject();}},function(Y){X.reject(Y);});});jQuery.when.apply(jQuery,V).then(function(){N(P,u());},function(W){N([],u(),r({code:'5223',aParameters:[i]},W&&W.messages));});}else{N(P,u());}},function(T){N([],u(),r({code:'5223',aParameters:[i]},T&&T.messages));});}function C(){var i=jQuery.Deferred();var P=[];if(g){i.resolve(f);}else{P.push({name:"dt",value:false});var R="/sap/bc/lrep/content/sap/ui/fl/settings/main.flsettings";R+=b._buildParams(P);var N=b.send(R,'GET',undefined);N.then(function(O){var Q=O&&O.response||{};g=true;if(Q.isAtoEnabled===true){f="ATO_NOTIFICATION";}i.resolve(f);},function(O){i.reject(O);});}return i.promise();}function D(i,N,O,P){var Q=P||'CUSTOMER';var R=v(i);var S=b.getFileAttributes(R,N,'apfconfiguration',Q);S.then(function(T){var U=T.response;if(Q==='CUSTOMER'){p(i,N,U);A(i,O);}else{O(u());}},function(T){O(u(),r({code:'5232',aParameters:[i,N]},T&&T.messages));});}function E(i,N,O){if(!O){O="CUSTOMER";}var P=i.Application;var Q=i.AnalyticalConfiguration;var R=JSON.parse(i.SerializedAnalyticalConfiguration);var S=v(P);var T=C();T.then(function(f){var U=b.getStaticResource(S,"metadata","apfapplication");U.then(function(V){var W={Application:P,ApplicationName:V.response.ApplicationName,SemanticObject:V.response.SemanticObject,AnalyticalConfiguration:Q,AnalyticalConfigurationName:i.AnalyticalConfigurationName,CreationUTCDateTime:i.CreationUTCDateTime,LastChangeUTCDateTime:i.LastChangeUTCDateTime};R=jQuery.extend(true,R,{configHeader:W});R=JSON.stringify(R);var X=b.upsert(S,Q,'apfconfiguration',O,R,'application/json',f);return X;},function(V){N(u(),r({code:'5233',aParameters:[P,Q]},V&&V.messages));}).then(function(V){D(P,Q,N,O);},function(V){N(u(),r({code:'5233',aParameters:[P,Q]},V&&V.messages));});},function(U){N(u(),r({code:'5224'},U&&U.messages));});}function F(i,N,O){var P=q(O);var Q=i.Application;var R=i.AnalyticalConfiguration;if(R===undefined||!sap.apf.utils.isValidGuid(R)){R=sap.apf.utils.createPseudoGuid(32);}var S=JSON.parse(i.SerializedAnalyticalConfiguration);var T=v(Q);var U=b.getStaticResource(T,"metadata","apfapplication");U.then(function(W){var X={Application:Q,ApplicationName:W.response.ApplicationName,SemanticObject:W.response.SemanticObject,AnalyticalConfiguration:R,AnalyticalConfigurationName:S.analyticalConfigurationName,CreationUTCDateTime:i.CreationUTCDateTime,LastChangeUTCDateTime:i.LastChangeUTCDateTime};S=jQuery.extend(true,S,{configHeader:X});S=JSON.stringify(S);V(Q,R,i.AnalyticalConfigurationName,S,N);},function(W){N(undefined,u(),r({code:'5223',aParameters:[Q]},W&&W.messages));});function V(Q,R,W,S,N){var T=v(Q);var X=C();X.then(function(f){var Y=b.upsert(T,R,'apfconfiguration',P,S,'application/json',f);Y.then(function(Z){D(Q,R,function($,_){if(!_){N({AnalyticalConfiguration:R,AnalyticalConfigurationName:i.AnalyticalConfigurationName},u());}else{N(undefined,u(),_);}},P);},function(Z){N(undefined,u(),r({code:'5226',aParameters:[Q,R]},Z&&Z.messages));});},function(Y){N(undefined,u(),r({code:'5224'},Y&&Y.messages));});}}function G(i,N,O,P){var Q=i[0].value;m.check(Q!==undefined,"configuration may not be undefined");m.check(O!==undefined,"application of configuration not found");var R=v(O);C().then(function(f){var S=b.deleteFile(R,Q,'apfconfiguration',P,f);S.then(function(T){N(u());},function(T){N(u(),r({code:'5225',aParameters:[O,Q]},T&&T.messages));});},function(S){N(u(),r({code:'5224'},S&&S.messages));});}function H(N,O){var i=0;var P={Application:N};var Q,R;for(i=0;i<O.length;i++){Q=O[i].name;R=O[i].value;if(Q==="apfdt-applname"){Q="ApplicationName";}else if(Q==='createdAt'){Q="CreationUTCDateTime";}else if(Q==='createdBy'){Q="CreatedByUser";}else if(Q==='lastChangedAt'){Q="LastChangeUTCDateTime";}else if(Q==='lastChangedBy'){Q="LastChangedByUser";}else if(Q==="apfdt-configname"){Q='AnalyticalConfigurationName';}else if(Q==='size'||Q==='layer'){continue;}P[Q]=R;}return P;}function I(i,N,O){m.check(i.ApplicationName!==undefined&&i.ApplicationName!=="","Valid application name is required");var P=i.Application;if(P===undefined||!sap.apf.utils.isValidGuid(P)){P=sap.apf.utils.createPseudoGuid(32);}var Q=JSON.stringify({ApplicationName:i.ApplicationName,SemanticObject:i.SemanticObject,Application:P});var R=sap.apf.utils.renderHeaderOfTextPropertyFile(P,m);var S=q(O);function T(W){N(undefined,u(),r({code:'5227'},W&&W.messages));}var U=v(P);var V=b.upsert(U,'metadata','apfapplication',S,Q,'application/json');V.then(function(W){var X=b.upsert(U,'text','properties',S,R,'text/plain');X.then(function(Y){d.setItem(P,new sap.apf.utils.Hashtable(m));N({Application:P,ApplicationName:i.ApplicationName,SemanticObject:i.SemanticObject},u());},T);},T);}function J(i,N){m.check(i.ApplicationName!==undefined&&i.ApplicationName!=="","Valid application name is required");var O=i.Application;var P=JSON.stringify({ApplicationName:i.ApplicationName,SemanticObject:i.SemanticObject,Application:O});function Q(T){N(undefined,r({code:'5228',aParameters:[O]},T&&T.messages));}var R=v(O);var S=b.upsert(R,'metadata','apfapplication','CUSTOMER',P,'application/json');S.then(function(T){N({Application:O,ApplicationName:i.ApplicationName,SemanticObject:i.SemanticObject});},Q);}function K(i,N,O){var P=i[0].value;function Q(T){var U=L(T);N(u(),U);}var R=v(P);var S=b.listContent(R,O);S.then(function(T){var U=T.response;var V=[];U.forEach(function(X){if(X.fileType==="apfconfiguration"){C().then(function(f){V.push(b.deleteFile(R,X.name,X.fileType,X.layer,f));},function(Y){N(u(),r({code:'5224'},Y&&Y.messages));});}else{V.push(b.deleteFile(R,X.name,X.fileType,X.layer));}});var W=Promise.all(V);return W;},Q).then(function(T){N(u());},Q);}function L(i){var N;if(i&&i.messageObject&&i.messageObject.getCode){N=i.messageObject;}else if(i&&i.response&&i.response.statusCode&&i.response.statusCode>=400){N=m.createMessageObject({code:'11005',aParameters:[i.response.statusCode.toString(),i.response.statusText]});}else{N=m.createMessageObject({code:'5201',aParameters:(i&&i.messages)||[]});}return N;}function M(i,N){var O=[];h(N,"apfapplication").then(function(Q){var R=Q.response;R.forEach(function(R){var S;var T;if(R.fileType&&R.fileType==="apfapplication"){S=j(R);if(!sap.apf.utils.isValidPseudoGuid(S)){return;}T="";var U="";T=k(R,'apfdt-applname');O.push({Application:S,ApplicationName:T,SemanticObject:U});}});i(O,u());},P);function P(Q){i(undefined,u(),r({code:'5229'},Q&&Q.messages));}}};}());
