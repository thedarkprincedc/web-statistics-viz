// Copyright (c) 2009-2014 SAP SE, All Rights Reserved
sap.ui.define(["sap/suite/ui/generic/template/AnalyticalListPage/util/KpiUtil","sap/suite/ui/generic/template/AnalyticalListPage/util/V4Terms","sap/suite/ui/generic/template/AnalyticalListPage/util/KpiAnnotationHelper"],function(K,V,a){"use strict";jQuery.sap.declare("sap.suite.ui.generic.template.AnalyticalListPage.util.KpiAnnotationFormatter");sap.suite.ui.generic.template.AnalyticalListPage.util.KpiAnnotationFormatter={};sap.suite.ui.generic.template.AnalyticalListPage.util.KpiAnnotationFormatter.formatFunctions={count:0};sap.suite.ui.generic.template.AnalyticalListPage.util.KpiAnnotationFormatter.NumberFormatFunctions={};sap.suite.ui.generic.template.AnalyticalListPage.util.KpiAnnotationFormatter.criticalityConstants={StateValues:{None:"None",Negative:"Error",Critical:"Warning",Positive:"Success"},ColorValues:{None:"Neutral",Negative:"Error",Critical:"Critical",Positive:"Good"}};function c(l,C){var S;if(C){S=C.None;if(l&&l.EnumMember){var v=l.EnumMember;if(e(v,"Negative")){S=C.Negative;}else if(e(v,"Critical")){S=C.Critical;}else if(e(v,"Positive")){S=C.Positive;}}}return S;}function e(S,l){return S&&S.indexOf(l,S.length-l.length)!==-1;}function b(v,I,l,m,t,n,C){var o={};o.EnumMember="None";if(v!==undefined){v=Number(v);if(e(I,"Minimize")||e(I,"Minimizing")){o.EnumMember="None";if(n||m){if(v<=n){o.EnumMember="Positive";}else if(v>m){o.EnumMember="Negative";}else{o.EnumMember="Critical";}}}else if(e(I,"Maximize")||e(I,"Maximizing")){o.EnumMember="None";if(t||l){if(v>=t){o.EnumMember="Positive";}else if(v<l){o.EnumMember="Negative";}else{o.EnumMember="Critical";}}}else if(e(I,"Target")){o.EnumMember="None";if(t&&n){if(v>=t&&v<=n){o.EnumMember="Positive";}else if(v<l||v>m){o.EnumMember="Negative";}else{o.EnumMember="Critical";}}}}return c(o,C);}function d(l,r,u,m){if(!l||!r){return;}l=Number(l);if(!u&&(l-r>=0)){return"Up";}if(!m&&(l-r<=0)){return"Down";}if(r&&u&&(l-r>=u)){return"Up";}if(r&&m&&(l-r<=m)){return"Down";}}function f(v,n,S,u){var l=true;var m=K.formatNumberForPresentation(v,l,n,S);return m+" "+(u?u:"");}function g(l,n,t,S,u){var m=true;if(!l){return;}l=Number(l);var D=l-t;var o=K.formatNumberForPresentation(D,m,n,S);return o+" "+(u?u:"");}function h(v,r,l){if(!r){return;}r=Number(r);if(l){return r+"%";}return r;}function i(v,t,n,S,u){var l=true;if(!t){return;}else{t=Number(t);var m=K.formatNumberForPresentation(t,l,n,S);return m+" "+(u?u:"");}}sap.suite.ui.generic.template.AnalyticalListPage.util.KpiAnnotationFormatter.resolvePathForKpiTargetValue=function(C,D){if(!D||!D.Value||!D.TargetValue){return"";}var S=C.getSetting("settings").getData();var v=K.getPathOrPrimitiveValue(D.Value);var t=K.getPathOrPrimitiveValue(D.TargetValue);var m=C.getSetting("dataModel");var M=m.getMetaModel();var E=M.getODataEntitySet(S.entitySet);var o=M.getODataEntityType(E.entityType);var l=M.getODataProperty(o,D.Value.Path);var u=K.getUnitofMeasure(S.model,l);var I=K.isBindingValue(t);var n=K.isBindingValue(v);var p=0;var q;if(D.ValueFormat){p=K.getPathOrPrimitiveValue(D.ValueFormat.NumberOfFractionalDigits);q=K.getPathOrPrimitiveValue(D.ValueFormat.ScaleFactor);}var r=u.match(/{@i18n>.+}/gi);var w=K.isBindingValue(u)&&!r;var x=false;var P="parts: ["+(n?v:"{path: 'DUMMY'}");P+=I?","+t:"";P+=w&&!r?","+u:"";P+="]";if(u==="%"){x=true;}if(p===""||p===undefined){p=0;if(x){p=1;}}q=q==""?undefined:q;var y=function(){var z=1;if(x){return i(n?arguments[0]:v,I?arguments[z++]:t,p,q,w?arguments[z++]:u);}else{return i(n?arguments[0]:v,I?arguments[z++]:t,p,q);}};var F=s(y,"formatReferenceValueCalculation");return"{"+P+", formatter: '"+F+"'}";};sap.suite.ui.generic.template.AnalyticalListPage.util.KpiAnnotationFormatter.resolvePathForKpiReferenceValue=function(C,D){var v=K.getPathOrPrimitiveValue(D.Value);var r=K.getPathOrPrimitiveValue(D.TrendCalculation.ReferenceValue);var l=K.isRelative(D);var I=K.isBindingValue(r);var p="parts: ["+v;p+=I?","+r:"";p+="]";var m=function(){var n=1;return h(arguments[0],I?arguments[n++]:r,l);};var F=s(m,"formatReferenceValueCalculation");return"{"+p+", formatter: '"+F+"'}";};sap.suite.ui.generic.template.AnalyticalListPage.util.KpiAnnotationFormatter.resolvePathForKpiValue=function(C,D){if(!D||!D.Value){return"";}var S=C.getSetting("settings").getData();var m=C.getSetting("dataModel");var M=m.getMetaModel();var E=M.getODataEntitySet(S.entitySet);var o=M.getODataEntityType(E.entityType);var l=M.getODataProperty(o,D.Value.Path);var u=K.getUnitofMeasure(S.model,l);var S=C.getSetting("settings").getData();var v=K.getPathOrPrimitiveValue(D.Value);var n=u.match(/{@i18n>.+}/gi);var I=K.isBindingValue(u)&&!n;var p=K.isBindingValue(v);var P="parts: ["+(p?v:"{path: 'DUMMY'}");P+=I&&!n?","+u:"";P+="]";var q=false;if(u==="%"){q=true;}var r=0;var t;if(D.ValueFormat){r=K.getPathOrPrimitiveValue(D.ValueFormat.NumberOfFractionalDigits);t=K.getPathOrPrimitiveValue(D.ValueFormat.ScaleFactor);}if(r===""||r===undefined){r=0;if(q){r=1;}}t=t==""?undefined:t;var w=function(){var x=1;if(q){return f(p?arguments[0]:v,r,t,I?arguments[x++]:u);}else{return f(p?arguments[0]:v,r,t);}};var F=s(w,"formatFieldWithScaleCalculation");return"{"+P+", formatter: '"+F+"'}";};sap.suite.ui.generic.template.AnalyticalListPage.util.KpiAnnotationFormatter.resolveKpiHeaderState=function(C,D){return j(C,D,sap.suite.ui.generic.template.AnalyticalListPage.util.KpiAnnotationFormatter.criticalityConstants.ColorValues);};sap.suite.ui.generic.template.AnalyticalListPage.util.KpiAnnotationFormatter.resolvePathForDeviation=function(C,D){if(!D||!D.Value||!D.TargetValue){return"";}var S=C.getSetting("settings").getData();var v=K.getPathOrPrimitiveValue(D.Value);var t=K.getPathOrPrimitiveValue(D.TargetValue);var m=C.getSetting("dataModel");var M=m.getMetaModel();var E=M.getODataEntitySet(S.entitySet);var o=M.getODataEntityType(E.entityType);var l=M.getODataProperty(o,D.Value.Path);var u=K.getUnitofMeasure(S.model,l);var I=K.isBindingValue(t);var n=u.match(/{@i18n>.+}/gi);var p=K.isBindingValue(u)&&!n;var q=K.isBindingValue(v);var r=false;var w=0;var x;if(D.ValueFormat){w=K.getPathOrPrimitiveValue(D.ValueFormat.NumberOfFractionalDigits);x=K.getPathOrPrimitiveValue(D.ValueFormat.ScaleFactor);}var P="parts: ["+(q?v:"{path: 'DUMMY'}");P+=I?","+t:"";P+=p&&!n?","+u:"";P+="]";if(u==="%"){r=true;}if(w===""||w===undefined){w=0;if(r){w=1;}}x=x==""?undefined:x;var y=function(){var z=1;if(r){return g(q?arguments[0]:v,w,I?arguments[z++]:t,x,p?arguments[z++]:u);}else{return g(q?arguments[0]:v,w,I?arguments[z++]:t,x);}};var F=s(y,"formatDeviationCalculation");return"{"+P+", formatter: '"+F+"'}";};sap.suite.ui.generic.template.AnalyticalListPage.util.KpiAnnotationFormatter.resolvePathForTrendIcon=function(C,D){if(!D||!D.Value||!D.Value.Path||!D.TrendCalculation){return"";}if(D.Trend){var t=K.getPathOrPrimitiveValue(D.Trend);return t;}var v=K.getPathOrPrimitiveValue(D.Value);var r=K.getPathOrPrimitiveValue(D.TrendCalculation.ReferenceValue);var l=K.getPathOrPrimitiveValue(D.TrendCalculation.DownDifference);var u=K.getPathOrPrimitiveValue(D.TrendCalculation.UpDifference);var I=K.isBindingValue(r);var m=K.isBindingValue(l);var n=K.isBindingValue(u);var p="parts: ["+v;p+=I?","+r:"";p+=m?","+l:"";p+=n?","+u:"";p+="]";var o=function(){var q=1;return d(arguments[0],I?arguments[q++]:r,m?arguments[q++]:l,n?arguments[q++]:u);};var F=s(o,"formatTrendDirection");return"{"+p+", formatter: '"+F+"'}";};sap.suite.ui.generic.template.AnalyticalListPage.util.KpiAnnotationFormatter.formatDPTitle=function(C,D){var S=C.getSetting("settings").getData();var m=C.getSetting("dataModel");var M=m.getMetaModel();var E=M.getODataEntitySet(S.entitySet);var o=M.getODataEntityType(E.entityType);var l=M.getODataProperty(o,D.Value.Path);var t=K.getPathOrPrimitiveValue(D.Title);var r="",u="";if(l["Org.OData.Measures.V1.Unit"]){var U=l["Org.OData.Measures.V1.Unit"];u=K.getPathOrPrimitiveValue(U);}else if(l["Org.OData.Measures.V1.ISOCurrency"]){var n=l["Org.OData.Measures.V1.ISOCurrency"];u=K.getPathOrPrimitiveValue(n);}var I=K.isBindingValue(u)&&!u.match(/{@i18n>.+}/gi),p=K.isBindingValue(t);var q=function(v,w){w=w||t;v=v||u;var x=(u==="%");if(v===undefined){return w;}else{if(!x){if(v.match(/{@i18n>.+}/gi)){return this.getModel('i18n').getResourceBundle().getText("KPI_CARD_TITLE_UNIT",[w,this.getModel('i18n').getResourceBundle().getText(v.substring(7,u.length-1))]);}else{return this.getModel('i18n').getResourceBundle().getText("KPI_CARD_TITLE_UNIT",[w,v]);}}else{return w;}}};var F=s(q,"formatTitleForDP");var P="["+(I?u:"{path:'DUMMY'}")+", "+(p?t:"{path: 'DUMMY'}")+"]";r="{parts: "+P+", formatter: '"+F+"'}";return r;};function j(C,D,o){var S=o.None;if(D.Criticality){var l=D.Criticality?D.Criticality.EnumMember.split("/")[1]:undefined;var I=K.isBindingValue(l);if(I){S=l;}else{S=c(D.Criticality,o);}}else if(D.CriticalityCalculation&&D.Value&&D.Value){S=k(C,D,o);}return S;}function k(C,D,o){var v=K.getPathOrPrimitiveValue(D.Value);var I=K.isBindingValue(v);var l=D.CriticalityCalculation.ImprovementDirection.EnumMember;var m=D.CriticalityCalculation.DeviationRangeLowValue?K.getPathOrPrimitiveValue(D.CriticalityCalculation.DeviationRangeLowValue):undefined;var n=D.CriticalityCalculation.DeviationRangeHighValue?K.getPathOrPrimitiveValue(D.CriticalityCalculation.DeviationRangeHighValue):undefined;var t=D.CriticalityCalculation.ToleranceRangeLowValue?K.getPathOrPrimitiveValue(D.CriticalityCalculation.ToleranceRangeLowValue):undefined;var p=D.CriticalityCalculation.ToleranceRangeHighValue?K.getPathOrPrimitiveValue(D.CriticalityCalculation.ToleranceRangeHighValue):undefined;var q=K.isBindingValue(m);var r=K.isBindingValue(n);var u=K.isBindingValue(t);var w=K.isBindingValue(p);var P="parts: ["+(I?v:"{path:'DUMMY'}");P+=q?","+m:"";P+=r?","+n:"";P+=u?","+t:"";P+=w?","+p:"";P+="]";var x=function(){var y=1;return b(I?arguments[0]:v,l,q?arguments[y++]:m,r?arguments[y++]:n,u?arguments[y++]:t,w?arguments[y++]:p,o);};var F=s(x,"formatCriticalityCalculation");return"{"+P+", formatter: '"+F+"'}";}function s(l,n){if(!sap.suite.ui.generic.template.AnalyticalListPage.util.KpiAnnotationFormatter.formatFunctions[n]){sap.suite.ui.generic.template.AnalyticalListPage.util.KpiAnnotationFormatter.formatFunctions[n]=0;}sap.suite.ui.generic.template.AnalyticalListPage.util.KpiAnnotationFormatter.formatFunctions[n]++;var F=n+sap.suite.ui.generic.template.AnalyticalListPage.util.KpiAnnotationFormatter.formatFunctions[n];sap.suite.ui.generic.template.AnalyticalListPage.util.KpiAnnotationFormatter.formatFunctions[F]=l;return"sap.suite.ui.generic.template.AnalyticalListPage.util.KpiAnnotationFormatter.formatFunctions."+F;}sap.suite.ui.generic.template.AnalyticalListPage.util.KpiAnnotationFormatter.getAggregateNumber=function(C,E,D,S,o){var l=S&&S.SelectOptions;var p;var m=",filters:";var n=[];if(l){l.forEach(function(z){p=z.PropertyName.PropertyPath;z[p].forEach(function(R){if(R.Sign.EnumMember===V.SelectionRangeSignType+"/I"||R.Sign.EnumMember===V.SelectionRangeSignType+"/E"){if(R.Low){n.push(K.getFilter(R,z));}}});});}var q=D&&D.Value&&D.Value.Path;var t=D&&D.TargetValue&&D.TargetValue.Path;var r="";m+=JSON.stringify(n);var P=a.resolveParameterizedEntitySet(C.getSetting("dataModel"),E,S);r+="{path: '"+P+"',length:1";var u=o.metaModel.getODataEntityType(E.entityType,false);var v=o.metaModel.getODataProperty(u,q);var w=v&&v[V.Unit]&&v[V.Unit].Path;var x=v&&v[V.ISOCurrency]&&v[V.ISOCurrency].Path;var y=[];y.push(q);if(w){y.push(w);}if(t){y.push(t);}if(x){y.push(x);}if(D.TrendCalculation&&D.TrendCalculation.ReferenceValue&&D.TrendCalculation.ReferenceValue.Path){y.push(D.TrendCalculation.ReferenceValue.Path);}return r+", parameters:{select:'"+y.join(",")+"'}"+m+"}";};sap.suite.ui.generic.template.AnalyticalListPage.util.KpiAnnotationFormatter.getAggregateNumber.requiresIContext=true;sap.suite.ui.generic.template.AnalyticalListPage.util.KpiAnnotationFormatter.resolveKpiHeaderState.requiresIContext=true;sap.suite.ui.generic.template.AnalyticalListPage.util.KpiAnnotationFormatter.resolvePathForTrendIcon.requiresIContext=true;sap.suite.ui.generic.template.AnalyticalListPage.util.KpiAnnotationFormatter.resolvePathForKpiValue.requiresIContext=true;sap.suite.ui.generic.template.AnalyticalListPage.util.KpiAnnotationFormatter.resolvePathForDeviation.requiresIContext=true;sap.suite.ui.generic.template.AnalyticalListPage.util.KpiAnnotationFormatter.resolvePathForKpiTargetValue.requiresIContext=true;sap.suite.ui.generic.template.AnalyticalListPage.util.KpiAnnotationFormatter.formatDPTitle.requiresIContext=true;return sap.suite.ui.generic.template.AnalyticalListPage.util.KpiAnnotationFormatter;},true);