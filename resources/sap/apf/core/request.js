/*!
 * SAP APF Analysis Path Framework
 * 
 * (c) Copyright 2012-2014 SAP AG. All rights reserved
 */
jQuery.sap.declare('sap.apf.core.request');jQuery.sap.require('sap.apf.utils.utils');jQuery.sap.require('sap.apf.core.utils.filter');jQuery.sap.require('sap.apf.core.utils.filterTerm');jQuery.sap.require("sap.apf.core.utils.filterSimplify");(function(){'use strict';sap.apf.core.Request=function(I,c){var m=I.instances.messageHandler;var C=I.instances.coreApi;var s=c.service;var a=c.selectProperties;var u=C.getUriGenerator();var M;if(s===undefined){M=m.createMessageObject({code:'5015',aParameters:[c.id]});m.putMessage(M);}var b=C.getMetadata(s);this.type=c.type;this.sendGetInBatch=function(f,d,r,S){b.done(function(o){C.getXsrfToken(s).done(function(x){var U=o.getUriComponents(c.entityType);var e,g;if(U){e=U.entitySet;g=U.navigationProperty;}m.check(e!==undefined,'Invalid request configuration: An entityset does not exist under the service '+c.entityType);m.check(g!==undefined,'Invalid request configuration: A usable navigation does not exist for the service '+c.entityType);var F;var h;y(f);if(f&&f.getProperties){F=f.restrictToProperties(o.getFilterableProperties(e));if(C.getStartParameterFacade().isFilterReductionActive()){h=new sap.apf.core.utils.FilterReduction();F=h.filterReduction(m,F);}}w(r);var p=r&&r.paging;var j=r&&r.orderby;var k=u.buildUri(m,e,a,F,f,j,p,undefined,v,g,o);var l=[{requestUri:k,method:'GET',headers:{'Accept-Language':sap.ui.getCore().getConfiguration().getLanguage(),'x-csrf-token':x}}];t();var n=u.getAbsolutePath(s);n=n+'$batch';var R={method:'POST',headers:{'x-csrf-token':x},requestUri:n,serviceMetadata:o.getODataModel().getServiceMetadata(),data:{__batchRequests:l}};var q=function(i,z){var A={};C.getEntityTypeMetadata(c.service,c.entityType).done(function(B){var D;try{var G='';if(i&&i.__batchResponses&&i.__batchResponses[0].data){A.data=i.__batchResponses[0].data.results;A.metadata=B;if(i.__batchResponses[0].data.__count){A.count=parseInt(i.__batchResponses[0].data.__count,10);}if(i.__batchResponses[1]&&i.__batchResponses[1].data){A.selectionValidation=i.__batchResponses[1].data.results;}d(A,true);}else if(i&&i.__batchResponses[0]&&i.__batchResponses[0].response&&i.__batchResponses[0].message){G=z.requestUri;var H=i.__batchResponses[0].message;var J=i.__batchResponses[0].response.body;D=sap.apf.utils.extractOdataErrorResponse(J);var K=i.__batchResponses[0].response.statusCode;A=m.createMessageObject({code:'5001',aParameters:[K,H,D,G]});m.putMessage(A);}else{G=z.requestUri||k;A=m.createMessageObject({code:'5001',aParameters:['unknown','unknown error','unknown error',G]});m.putMessage(A);}}catch(L){if(!m.isOwnException(L)){D=L&&L.message||"";m.putMessage(m.createMessageObject({code:"5042",aParameters:[D]}));}}});};var E=function(i){var z='unknown error';var A;var B='unknown error';var D=k;if(i.message!==undefined){z=i.message;}var H='unknown';if(i.response&&i.response.statusCode){H=i.response.statusCode;B=i.response.statusText||'';D=i.response.requestUri||k;}if(i.messageObject&&i.messageObject.type==='messageObject'){m.putMessage(i.messageObject);d(i.messageObject);}else{A=m.createMessageObject({code:'5001',aParameters:[H,z,B,D]});m.putMessage(A);d(A);}};C.odataRequest(R,q,E,OData.batchHandler);function t(){if(S&&S.requiredFilterProperties&&S.selectionFilter){var i=F.copy();i.addAnd(S.selectionFilter);if(C.getStartParameterFacade().isFilterReductionActive()){i=h.filterReduction(m,i);}var z=u.buildUri(m,e,S.requiredFilterProperties,i,f,undefined,undefined,undefined,v,g,o);l.push({requestUri:z,method:'GET',headers:{'Accept-Language':sap.ui.getCore().getConfiguration().getLanguage(),'x-csrf-token':x}});}}function v(P,i){var z="'";var A=o.getPropertyMetadata(e,P);if(A&&A.dataType){return sap.apf.utils.formatValue(i,A.dataType.type);}if(typeof i==='number'){return i;}return z+sap.apf.utils.escapeOdata(i)+z;}function w(r){var P,i;if(!r){return;}P=Object.getOwnPropertyNames(r);for(i=0;i<P.length;i++){if(P[i]!=='orderby'&&P[i]!=='paging'){m.putMessage(m.createMessageObject({code:'5032',aParameters:[e,P[i]]}));}}}function y(f){var i=o.getFilterableProperties(e);var z='';var A=o.getEntityTypeAnnotations(e);var B;if(A.requiresFilter!==undefined&&A.requiresFilter==='true'){if(A.requiredProperties!==undefined){z=A.requiredProperties;}}if(z===''){return;}if(jQuery.inArray(z,i)===-1){B=m.createMessageObject({code:'5006',aParameters:[e,z]});m.putMessage(B);}var P=f.getProperties();if(jQuery.inArray(z,P)===-1){B=m.createMessageObject({code:'5005',aParameters:[e,z]});m.putMessage(B);}}});});};};}());
