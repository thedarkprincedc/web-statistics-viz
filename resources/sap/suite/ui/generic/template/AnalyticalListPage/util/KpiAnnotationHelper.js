sap.ui.define(["sap/ui/base/Object","sap/ui/model/Context","sap/ui/model/odata/AnnotationHelper"],function(B,C,O){"use strict";var A=B.extend("sap.suite.ui.generic.template.AnalyticalListPage.util.KpiAnnotationHelper");sap.suite.ui.generic.template.AnalyticalListPage.util.KpiAnnotationHelper.criticalityConstants={StateValues:{None:"None",Negative:"Error",Critical:"Warning",Positive:"Success"},ColorValues:{None:"Neutral",Negative:"Error",Critical:"Critical",Positive:"Good"}};A.selectionPresentationVariantResolveWithQualifier=function(c){var k=c.getObject();var m=c.getModel();var M=m.getProperty("/metaModel");var e=M.getODataEntitySet(k.entitySet);var E=M.getODataEntityType(e.entityType);var a=E.$path+"/com.sap.vocabularies.UI.v1.SelectionPresentationVariant#"+k.qualifier;return M.createBindingContext(a);};A.resolveParameterizedEntitySet=function(d,e,s){jQuery.sap.require("sap.ui.model.analytics.odata4analytics");var p="";var o=new sap.ui.model.analytics.odata4analytics.Model(sap.ui.model.analytics.odata4analytics.Model.ReferenceByModel(d));var q=o.findQueryResultByName(e.name);var a=new sap.ui.model.analytics.odata4analytics.QueryResultRequest(q);var b=q.getParameterization();if(b){var c;a.setParameterizationRequest(new sap.ui.model.analytics.odata4analytics.ParameterizationRequest(b));jQuery.each(s.Parameters,function(){if(this.RecordType==="com.sap.vocabularies.UI.v1.IntervalParameter"){c=this.PropertyValueFrom.PropertyPath.split("/");a.getParameterizationRequest().setParameterValue(c[c.length-1],this.PropertyValueFrom.String,this.PropertyValueTo.String);}else{c=this.PropertyName.PropertyPath.split("/");a.getParameterizationRequest().setParameterValue(c[c.length-1],this.PropertyValue.String);}});}try{p=a.getURIToQueryResultEntitySet();}catch(f){q=a.getQueryResult();p="/"+q.getEntitySet().getQName();jQuery.sap.log.error("getEntitySetPathWithParameters","binding path with parameters failed - "+f||f.message);}return p;};return A;},true);
