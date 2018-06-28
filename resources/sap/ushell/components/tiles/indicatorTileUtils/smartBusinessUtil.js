sap.ui.require(['sap/ui/core/mvc/Controller','sap/ui/model/analytics/odata4analytics','./indicatorTileUtils/smartBusinessUtil','./sbtilecontent'],function(C,o,s,a){"use strict";var g=C.extend("sap.ushell.components.tiles.generic",{getTile:function(){return this.oKpiTileView.oGenericTile;},_updateTileModel:function(n){var m=this.getTile().getModel().getData();jQuery.extend(m,n);this.getTile().getModel().setData(m);},logError:function(e){this._updateTileModel({value:"",scale:"",unit:""});jQuery.sap.log.error(e);if(this.getView().getViewData().deferredObj){this.getView().getViewData().deferredObj.reject();}else{this.oKpiTileView.oGenericTile.setState(sap.m.LoadState.Failed);}},getKeyForCallCheck:function(){if(this.oKpiTileView.getViewName()=="sap.ushell.components.tiles.indicatornumeric.NumericTile"){return this.oConfig.TILE_PROPERTIES.id+"left";}else{return this.oConfig.TILE_PROPERTIES.id+"right";}},getRelativeTime:function(){var c=sap.ushell.components.tiles.indicatorTileUtils.util.getUTCDate();if(jQuery.type(this.cacheTime)=="date"){var t=this.cacheTime;}else{var t=new Date(parseInt(this.cacheTime.substr(6),10));}var r=sap.ushell.components.tiles.indicatorTileUtils.util.getTimeDifference(c-t);var b;switch(r.unit){case"minutes":var d=sap.ushell.components.tiles.indicatorTileUtils.util.getMillisecond(r.time,"minutes");c=c-d;b=new Date(c);break;case"hours":var d=sap.ushell.components.tiles.indicatorTileUtils.util.getMillisecond(r.time,"hours");c=c-d;b=new Date(c);break;case"days":var d=sap.ushell.components.tiles.indicatorTileUtils.util.getMillisecond(r.time,"days");c=c-d;b=new Date(c);break;}return b;},setTimeStamp:function(d){this.updateTimeStampjobScheduled=false;var f=sap.ui.core.format.DateFormat.getDateTimeInstance({relative:true,relativeSource:"auto",style:"short"});var t=f.format(this.getRelativeTime());this.oKpiTileView.oNVConfS.setRefreshOption(true);this.oKpiTileView.oNVConfS.setTimestamp(t);this.updateTimeStampjobScheduled=false;var k=this.oConfig.TILE_PROPERTIES.id+"time";var r=sap.ushell.components.tiles.indicatorTileUtils.util.getScheduledJob(k);if(r){clearTimeout(r);r=undefined;}sap.ushell.components.tiles.indicatorTileUtils.util.scheduleTimeStampJob.call(this,this.oTileApi.visible.isVisible());},isACurrencyMeasure:function(m){var u=this.DEFINITION_DATA.EVALUATION.ODATA_URL;var e=this.DEFINITION_DATA.EVALUATION.ODATA_ENTITYSET;return sap.ushell.components.tiles.indicatorTileUtils.util.getFormattingMetadata(this.oTileApi.url.addSystemToServiceUrl(u),e,m)._hasCurrency;},isCurrencyMeasure:function(m){var t=this;var c=sap.ushell.components.tiles.indicatorTileUtils.cache.getKpivalueById(t.oConfig.TILE_PROPERTIES.id);if(c&&c.Data){var k=c.Data&&JSON.parse(c.Data);if(sap.ushell.components.tiles.indicatorTileUtils.util.isDualTile(t.oConfig)){if(t.oKpiTileView.getViewName()=="sap.ushell.components.tiles.indicatornumeric.NumericTile"){k=k.leftData;}else{k=k.rightData;}}if(t.oKpiTileView.getViewName()=="sap.ushell.components.tiles.indicatorcomparison.ComparisonTile"||t.oConfig.TILE_PROPERTIES.tileType==="CM"){if(k&&k.data&&k.data.length){for(var i=0;i<k.data.length;i++){if(k.data[i]&&k.data[i].measure==m){if(jQuery.type(k.data[i].isCurM)=="boolean"){return k.data[i].isCurM;}else{return t.isACurrencyMeasure(m);}break;}else{return t.isACurrencyMeasure(m);}}}else{return t.isACurrencyMeasure(m);}}if(k&&jQuery.type(k.isCurM)=="boolean"){return k.isCurM;}else{return t.isACurrencyMeasure(m);}}else{return t.isACurrencyMeasure(m);}},formSelectStatement:function(b){var t=Object.keys(b);var f="";for(var i=0;i<t.length;i++){if((b[t[i]]!==undefined)&&(b.fullyFormedMeasure)){f=f+","+b[t[i]];}}return f;},setThresholdValues:function(){var t=this;try{var T={};T.fullyFormedMeasure=this.DEFINITION_DATA.EVALUATION.COLUMN_NAME;if(this.DEFINITION_DATA.EVALUATION.VALUES_SOURCE=="MEASURE"){var c=sap.ushell.components.tiles.indicatorTileUtils.cache.getKpivalueById(t.oConfig.TILE_PROPERTIES.id);switch(this.DEFINITION_DATA.EVALUATION.GOAL_TYPE){case"MI":T.sWarningHigh=sap.ushell.components.tiles.indicatorTileUtils.util.getEvalValueMeasureName(t.oConfig,"WH","MEASURE");T.sCriticalHigh=sap.ushell.components.tiles.indicatorTileUtils.util.getEvalValueMeasureName(t.oConfig,"CH","MEASURE");T.sTarget=sap.ushell.components.tiles.indicatorTileUtils.util.getEvalValueMeasureName(t.oConfig,"TA","MEASURE");T.sTrend=sap.ushell.components.tiles.indicatorTileUtils.util.getEvalValueMeasureName(t.oConfig,"TC","MEASURE");T.fullyFormedMeasure+=t.formSelectStatement(T);if(c&&c.Data&&c.Data.length){c.Data=JSON.parse(c.Data);T.trendValue=Number(c.Data.trend);T.targetValue=Number(c.Data.target);T.criticalHighValue=Number(c.Data.ch);T.warningHighValue=Number(c.Data.wh);c.Data=JSON.stringify(c.Data);}break;case"MA":T.sWarningLow=sap.ushell.components.tiles.indicatorTileUtils.util.getEvalValueMeasureName(t.oConfig,"WL","MEASURE");T.sCriticalLow=sap.ushell.components.tiles.indicatorTileUtils.util.getEvalValueMeasureName(t.oConfig,"CL","MEASURE");T.sTarget=sap.ushell.components.tiles.indicatorTileUtils.util.getEvalValueMeasureName(t.oConfig,"TA","MEASURE");T.sTrend=sap.ushell.components.tiles.indicatorTileUtils.util.getEvalValueMeasureName(t.oConfig,"TC","MEASURE");T.fullyFormedMeasure+=t.formSelectStatement(T);if(c&&c.Data&&c.Data.length){c.Data=JSON.parse(c.Data);T.criticalLowValue=Number(c.Data.cl);T.warningLowValue=Number(c.Data.wl);T.trendValue=Number(c.Data.trend);T.targetValue=Number(c.Data.target);c.Data=JSON.stringify(c.Data);}break;case"RA":T.sWarningHigh=sap.ushell.components.tiles.indicatorTileUtils.util.getEvalValueMeasureName(t.oConfig,"WH","MEASURE");T.sCriticalHigh=sap.ushell.components.tiles.indicatorTileUtils.util.getEvalValueMeasureName(t.oConfig,"CH","MEASURE");T.sTarget=sap.ushell.components.tiles.indicatorTileUtils.util.getEvalValueMeasureName(t.oConfig,"TA","MEASURE");T.sTrend=sap.ushell.components.tiles.indicatorTileUtils.util.getEvalValueMeasureName(t.oConfig,"TC","MEASURE");T.sWarningLow=sap.ushell.components.tiles.indicatorTileUtils.util.getEvalValueMeasureName(t.oConfig,"WL","MEASURE");T.sCriticalLow=sap.ushell.components.tiles.indicatorTileUtils.util.getEvalValueMeasureName(t.oConfig,"CL","MEASURE");T.fullyFormedMeasure+=t.formSelectStatement(T);if(c&&c.Data&&c.Data.length){c.Data=JSON.parse(c.Data);T.criticalLowValue=Number(c.Data.cl);T.warningLowValue=Number(c.Data.wl);T.trendValue=Number(c.Data.trend);T.targetValue=Number(c.Data.target);T.criticalHighValue=Number(c.Data.ch);T.warningHighValue=Number(c.Data.wh);c.Data=JSON.stringify(c.Data);}break;}}else if(this.DEFINITION_DATA.EVALUATION.VALUES_SOURCE=="RELATIVE"){T.sTarget=sap.ushell.components.tiles.indicatorTileUtils.util.getEvalValueMeasureName(t.oConfig,"TA","MEASURE");T.sTrend=sap.ushell.components.tiles.indicatorTileUtils.util.getEvalValueMeasureName(t.oConfig,"TC","MEASURE");T.fullyFormedMeasure+=t.formSelectStatement(T);T.criticalHighValue=sap.ushell.components.tiles.indicatorTileUtils.util.getEvalValueMeasureName(t.oConfig,"CH","FIXED");T.criticalLowValue=sap.ushell.components.tiles.indicatorTileUtils.util.getEvalValueMeasureName(t.oConfig,"CL","FIXED");T.warningHighValue=sap.ushell.components.tiles.indicatorTileUtils.util.getEvalValueMeasureName(t.oConfig,"WH","FIXED");T.warningLowValue=sap.ushell.components.tiles.indicatorTileUtils.util.getEvalValueMeasureName(t.oConfig,"WL","FIXED");}else{T.criticalHighValue=sap.ushell.components.tiles.indicatorTileUtils.util.getEvalValueMeasureName(t.oConfig,"CH","FIXED");T.criticalLowValue=sap.ushell.components.tiles.indicatorTileUtils.util.getEvalValueMeasureName(t.oConfig,"CL","FIXED");T.warningHighValue=sap.ushell.components.tiles.indicatorTileUtils.util.getEvalValueMeasureName(t.oConfig,"WH","FIXED");T.warningLowValue=sap.ushell.components.tiles.indicatorTileUtils.util.getEvalValueMeasureName(t.oConfig,"WL","FIXED");T.targetValue=sap.ushell.components.tiles.indicatorTileUtils.util.getEvalValueMeasureName(t.oConfig,"TA","FIXED");T.trendValue=sap.ushell.components.tiles.indicatorTileUtils.util.getEvalValueMeasureName(t.oConfig,"TC","FIXED");}return T;}catch(e){t.logError(e);}},setNoData:function(){var v=this.getView().getViewData();if(v.parentController){v.parentController.setNoData();if(v.deferredObj){v.deferredObj.resolve();}}else{try{this._updateTileModel({value:"",scale:"",unit:"",footerNum:this.oResourceBundle.getText("sb.noDataAvailable"),footerComp:this.oResourceBundle.getText("sb.noDataAvailable")});this.oKpiTileView.oGenericTile.setState(sap.m.LoadState.Loaded);}catch(e){}}},getLocalCache:function(c){var l={};l.ChipId=c.ChipId;l.Data=c.Data;l.CacheMaxAge=c.CacheMaxAgeUnit;l.CacheMaxAgeUnit=c.CacheMaxAgeUnit;l.CacheType=c.CacheType;l.CachedTime=sap.ushell.components.tiles.indicatorTileUtils.util.getUTCDate();return l;},fetchKpiValue:function(c,E,r,A){var t=this;var k=0;try{var b=this.DEFINITION_DATA.EVALUATION.ODATA_ENTITYSET;var T=this.setThresholdValues();var m=T.fullyFormedMeasure;var d=sap.ushell.components.tiles.indicatorTileUtils.cache.getKpivalueById(t.oConfig.TILE_PROPERTIES.id);var f=t.oTileApi.configuration.getParameterValueAsString("timeStamp");var i=sap.ushell.components.tiles.indicatorTileUtils.util.isCacheValid(t.oConfig.TILE_PROPERTIES.id,f,t.chipCacheTime,t.chipCacheTimeUnit,t.tilePressed);var h=sap.ushell.components.tiles.indicatorTileUtils.util.getBoolValue(r);var j=this.getKeyForCallCheck();var l=true;if(sap.ushell.components.tiles.indicatorTileUtils.util.isDualTile(t.oConfig)){var l=sap.ushell.components.tiles.indicatorTileUtils.util.isCallInProgress(j);if(l==undefined){l=true;}}if(l){if((!d||(!i&&t.oTileApi.visible.isVisible())||h||(A&&t.oTileApi.visible.isVisible())||t.getView().getViewData().refresh)){sap.ushell.components.tiles.indicatorTileUtils.util.setUnsetCallInProgress(j,false);if(t.kpiValueFetchDeferred){t.kpiValueFetchDeferred=false;var v=sap.ushell.components.tiles.indicatorTileUtils.util.prepareFilterStructure(this.DEFINITION_DATA.EVALUATION_FILTERS,this.DEFINITION_DATA.ADDITIONAL_FILTERS);var q=sap.ushell.components.tiles.indicatorTileUtils.util.prepareQueryServiceUri(t.oRunTimeODataModel,b,m,null,v);if(q){this.QUERY_SERVICE_MODEL=q.model;this.queryUriForKpiValue=q.uri;this.queryServiceUriODataReadRef=this.QUERY_SERVICE_MODEL.read(q.uri,null,null,true,function(p){t.backEndCallMade=true;t.kpiValueFetchDeferred=true;sap.ushell.components.tiles.indicatorTileUtils.util.setUnsetCallInProgress(j,true);if(p&&p.results&&p.results.length&&p.results[0][t.DEFINITION_DATA.EVALUATION.COLUMN_NAME]!=null){k=p.results[0][t.DEFINITION_DATA.EVALUATION.COLUMN_NAME];var w={};if(q.unit[0]){t._updateTileModel({unit:p.results[0][q.unit[0].name]});w.uom=p.results[0][q.unit[0].name];}if(t.oConfig.TILE_PROPERTIES.frameType=="TwoByOne"){w.numericValue=k;}else{w.value=k;}if(t.DEFINITION_DATA.EVALUATION.VALUES_SOURCE=="MEASURE"){T.criticalHighValue=p.results[0][T.sCriticalHigh];T.criticalLowValue=p.results[0][T.sCriticalLow];T.warningHighValue=p.results[0][T.sWarningHigh];T.warningLowValue=p.results[0][T.sWarningLow];T.targetValue=p.results[0][T.sTarget];T.trendValue=p.results[0][T.sTrend];}else if(t.DEFINITION_DATA.EVALUATION.VALUES_SOURCE=="RELATIVE"){T.targetValue=Number(p.results[0][T.sTarget]);T.criticalHighValue=T.targetValue*T.criticalHighValue/100;T.criticalLowValue=T.targetValue*T.criticalLowValue/100;T.warningHighValue=T.targetValue*T.warningHighValue/100;T.warningLowValue=T.targetValue*T.warningLowValue/100;T.trendValue=Number(p.results[0][T.sTrend]);}w.cl=T.criticalLowValue;w.ch=T.criticalHighValue;w.wl=T.warningLowValue;w.wh=T.warningHighValue;w.trend=T.trendValue;w.target=T.targetValue;w.isCurM=t.isCurrencyMeasure(t.oConfig.EVALUATION.COLUMN_NAME);var u={};u.ChipId=t.oConfig.TILE_PROPERTIES.id;u.Data=JSON.stringify(w);u.CacheMaxAge=Number(t.chipCacheTime);u.CacheMaxAgeUnit=t.chipCacheTimeUnit;u.CacheType=1;var x=t.getLocalCache(u);if(!sap.ushell.components.tiles.indicatorTileUtils.util.isDualTile(t.oConfig)){sap.ushell.components.tiles.indicatorTileUtils.cache.setKpivalueById(t.oConfig.TILE_PROPERTIES.id,x);var U=false;if(d){U=true;}if(t.chipCacheTime){sap.ushell.components.tiles.indicatorTileUtils.util.writeFrontendCacheByChipAndUserId(t.oTileApi,t.oConfig.TILE_PROPERTIES.id,u,U,function(p){if(p){t.cacheTime=p&&p.CachedTime;sap.ushell.components.tiles.indicatorTileUtils.cache.setKpivalueById(t.oConfig.TILE_PROPERTIES.id,p);t.setTimeStamp(t.cacheTime);}if(t.chipCacheTime&&!sap.ushell.components.tiles.indicatorTileUtils.util.isDualTile(t.oConfig)){jQuery.proxy(t.setTimeStamp(t.cacheTime),t);}});}}else{var y=sap.ushell.components.tiles.indicatorTileUtils.cache.getKpivalueById(t.oConfig.TILE_PROPERTIES.id);if(y){if(!y.CachedTime){y.CachedTime=sap.ushell.components.tiles.indicatorTileUtils.util.getUTCDate();}var z=y.Data;if(z){z=JSON.parse(z);if(t.oKpiTileView.getViewName()=="sap.ushell.components.tiles.indicatornumeric.NumericTile"){z.leftData=w;}else{z.rightData=w;}}y.Data=JSON.stringify(z);sap.ushell.components.tiles.indicatorTileUtils.cache.setKpivalueById(t.oConfig.TILE_PROPERTIES.id,y);}else{var z={};if(t.oKpiTileView.getViewName()=="sap.ushell.components.tiles.indicatornumeric.NumericTile"){z.leftData=w;}else{z.rightData=w;}x.Data=JSON.stringify(z);sap.ushell.components.tiles.indicatorTileUtils.cache.setKpivalueById(t.oConfig.TILE_PROPERTIES.id,x);}t.cacheWriteData=w;}t.cacheTime=sap.ushell.components.tiles.indicatorTileUtils.util.getUTCDate();t.updateDatajobScheduled=false;var B=t.oConfig.TILE_PROPERTIES.id+"data";var D=sap.ushell.components.tiles.indicatorTileUtils.util.getScheduledJob(B);if(D){clearTimeout(D);D=undefined;}c.call(t,k,T);}else{sap.ushell.components.tiles.indicatorTileUtils.cache.setKpivalueById(t.oConfig.TILE_PROPERTIES.id,{empty:"empty"});t.setNoData();}},function(p){t.kpiValueFetchDeferred=true;sap.ushell.components.tiles.indicatorTileUtils.util.setUnsetCallInProgress(j,true);if(p&&p.response){jQuery.sap.log.error(p.message+" : "+p.request.requestUri);E.call(t,p);}});}else{t.kpiValueFetchDeferred=true;sap.ushell.components.tiles.indicatorTileUtils.util.setUnsetCallInProgress(j,true);t.logError("Error Preparing Query Service URI");}}}else{if(t.DEFINITION_DATA.TILE_PROPERTIES.frameType==sap.m.FrameType.OneByOne){if(d&&d.Data){var n=d.Data&&JSON.parse(d.Data);k=n.value;if(n.uom){t._updateTileModel({unit:n.uom});}if(t.DEFINITION_DATA.EVALUATION.VALUES_SOURCE=="MEASURE"){T.criticalHighValue=n.ch;T.criticalLowValue=n.cl;T.warningHighValue=n.wh;T.warningLowValue=n.wl;T.targetValue=n.target;T.trendValue=n.trend;}else if(t.DEFINITION_DATA.EVALUATION.VALUES_SOURCE=="RELATIVE"){T.targetValue=Number(n.target);T.criticalHighValue=T.targetValue*T.ch/100;T.criticalLowValue=T.targetValue*T.cl/100;T.warningHighValue=T.targetValue*T.wh/100;T.warningLowValue=T.targetValue*T.wl/100;T.trendValue=Number(n.trend);}t.cacheTime=d.CachedTime;if(t.chipCacheTime&&!sap.ushell.components.tiles.indicatorTileUtils.util.isDualTile(t.oConfig)){jQuery.proxy(t.setTimeStamp(d.CachedTime),t);}c.call(t,k,T);}else{t.setNoData();}}else{if(d&&d.Data){var n=d.Data&&JSON.parse(d.Data);if(t.oKpiTileView.getViewName()=="sap.ushell.components.tiles.indicatornumeric.NumericTile"){n=n.leftData;}else{n=n.rightData;}k=n.numericValue;if(n.unit){t._updateTileModel({unit:n.unit});}if(t.DEFINITION_DATA.EVALUATION.VALUES_SOURCE=="MEASURE"){T.criticalHighValue=n.ch;T.criticalLowValue=n.cl;T.warningHighValue=n.wh;T.warningLowValue=n.wl;T.targetValue=n.target;T.trendValue=n.trend;}else if(t.DEFINITION_DATA.EVALUATION.VALUES_SOURCE=="RELATIVE"){T.targetValue=Number(n.target);T.criticalHighValue=T.targetValue*T.criticalHighValue/100;T.criticalLowValue=T.targetValue*T.criticalLowValue/100;T.warningHighValue=T.targetValue*T.warningHighValue/100;T.warningLowValue=T.targetValue*T.warningLowValue/100;T.trendValue=Number(n.trend);}t.cacheTime=d.CachedTime;if(t.chipCacheTime&&!sap.ushell.components.tiles.indicatorTileUtils.util.isDualTile(t.oConfig)){jQuery.proxy(t.setTimeStamp(d.CachedTime),t);}c.call(t,k,T);}else{t.setNoData();}}}}}catch(e){t.logError(e);}},getRunTimeODataModel:function(u,S){if(window["sap-ushell-config"].cacheBusting){u=sap.ushell.components.tiles.indicatorTileUtils.util.cacheBustingMechanism(u);}if(!this.oRunTimeODataModel){this.oRunTimeODataModel=sap.ushell.components.tiles.indicatorTileUtils.util.getODataModelByServiceUri(u);}if(this.oRunTimeODataModel.getServiceMetadata()){S();}else{this.oRunTimeODataModel.attachMetadataLoaded(S);}},parse_sapclient:function(){var i,S,r,f,b;S="P_SAPClient";r="$$$";f=this.oConfig.EVALUATION_FILTERS;if(f.constructor!==Array){return;}if(f.length<1){return;}for(i in f){b=f[i];if(b["NAME"]===S&&b["VALUE_1"]===r){break;}b=null;}if(b){jQuery.when(sap.ushell.components.tiles.indicatorTileUtils.util.getHanaClient()).done(function(c){b["VALUE_1"]=c;});}},fetchEvaluation:function(c,b,r,i){var t=this;var p=this.oConfig.TILE_PROPERTIES.sb_metadata||"HANA";t.DEFINITION_DATA=c;t._updateTileModel(this.DEFINITION_DATA);var d=sap.ushell.components.tiles.indicatorTileUtils.util.getBoolValue(r);if((t.oTileApi.visible.isVisible()&&!t.firstTimeVisible)||d||i){jQuery.when(sap.ushell.components.tiles.indicatorTileUtils.util.getFrontendCache(c,t.oTileApi)).done(function(f){t.firstTimeVisible=true;f=sap.ushell.components.tiles.indicatorTileUtils.cache.getKpivalueById(t.oConfig.TILE_PROPERTIES.id);if(f||Number(t.oTileApi.configuration.getParameterValueAsString("isSufficient"))){b.call();}else{try{if(!sap.ushell.components.tiles.indicatorTileUtils.util.isDualTile(t.oConfig)||!t.dataCallInProgress){t.dataCallInProgress=true;var h=sap.ushell.components.tiles.indicatorTileUtils.cache.getEvaluationById(t.oConfig.TILE_PROPERTIES.id);if(h){t.oConfig.EVALUATION_FILTERS=h.EVALUATION_FILTERS;b.call();}else if(t.evaluationFetchDeferred){t.evaluationFetchDeferred=false;sap.ushell.components.tiles.indicatorTileUtils.util.getFilterFromRunTimeService(t.oConfig,t.oTileApi,function(j){t.evaluationFetchDeferred=true;t.oConfig.EVALUATION_FILTERS=j;if(p.toUpperCase()==="HANA"){t.parse_sapclient();}sap.ushell.components.tiles.indicatorTileUtils.cache.setEvaluationById(t.oConfig.TILE_PROPERTIES.id,t.oConfig);b.call();});}}}catch(e){t.evaluationFetchDeferred=true;t.logError("no evaluation data");}}}).fail(function(){t.firstTimeVisible=true;if(Number(t.oTileApi.configuration.getParameterValueAsString("isSufficient"))){b.call();}else{try{var f=sap.ushell.components.tiles.indicatorTileUtils.cache.getEvaluationById(t.oConfig.TILE_PROPERTIES.id);if(f){t.oConfig.EVALUATION_FILTERS=f.EVALUATION_FILTERS;b.call();}else{sap.ushell.components.tiles.indicatorTileUtils.util.getFilterFromRunTimeService(t.oConfig,t.oTileApi,function(h){t.oConfig.EVALUATION_FILTERS=h;if(p.toUpperCase()==="HANA"){t.parse_sapclient();}sap.ushell.components.tiles.indicatorTileUtils.cache.setEvaluationById(t.oConfig.TILE_PROPERTIES.id,t.oConfig);b.call();});}}catch(e){t.logError("no evaluation data");}}});}},refreshHandler:function(r,A){var t=this;var i=sap.ushell.components.tiles.indicatorTileUtils.util.getBoolValue(r);var b=sap.ushell.components.tiles.indicatorTileUtils.util.getBoolValue(A);if(!t.firstTimeVisible||i||b){t.fetchEvaluation(t.oConfig,function(){if(t.oConfig.TILE_PROPERTIES.tileType=="NT"||t.oConfig.TILE_PROPERTIES.tileType=="AT"||t.oKpiTileView.getViewName()=="sap.ushell.components.tiles.indicatornumeric.NumericTile"||t.oKpiTileView.getViewName()=="sap.ushell.components.tiles.indicatordeviation.DeviationTile"){var u=t.oTileApi.url.addSystemToServiceUrl(t.oConfig.EVALUATION.ODATA_URL);t.getRunTimeODataModel(u,function(){if(t.KPI_VALUE_REQUIRED){t.fetchKpiValue(function(k,T){this.KPIVALUE=k;t.doProcess(k,T);},t.logError,r,b);}else{t.doProcess();}});}else{var u=t.oTileApi.url.addSystemToServiceUrl(t.oConfig.EVALUATION.ODATA_URL);t.getRunTimeODataModel(u,function(){if(t.KPI_VALUE_REQUIRED){t.doProcess(t.KPIVALUE,t.setThresholdValues());}else{t.doProcess(i,b);}});}},r,b);}},visibleHandler:function(i){if(!i){this.firstTimeVisible=false;sap.ushell.components.tiles.indicatorTileUtils.util.abortPendingODataCalls(this.queryServiceUriODataReadRef);sap.ushell.components.tiles.indicatorTileUtils.util.abortPendingODataCalls(this.trendChartODataReadRef);sap.ushell.components.tiles.indicatorTileUtils.util.abortPendingODataCalls(this.comparisionChartODataRef);}if(i){this.refreshHandler(this);}},getChipConfiguration:function(c){var t=this;try{sap.ushell.components.tiles.indicatorTileUtils.util.getParsedChip(t.oTileApi.configuration.getParameterValueAsString("tileConfiguration"),t.oTileApi.preview.isEnabled(),function(b){t.oConfig=b;var d=sap.ushell.components.tiles.indicatorTileUtils.util.getChipTitle(t.oConfig);var f=sap.ushell.components.tiles.indicatorTileUtils.util.getChipSubTitle(t.oConfig);if(t.oTileApi.search){t.oTileApi.search.setKeywords([d,f]);}if(t.oTileApi.preview){t.oTileApi.preview.setTargetUrl(sap.ushell.components.tiles.indicatorTileUtils.util.getNavigationTarget(t.oConfig,t.system));}c.call();});}catch(e){t.logError(e.message);}},onAfterTileRendering:function(){var t=this;this.firstTimeVisible=false;this.oKpiTileView=this.getView();this.updateDatajobScheduled=false;this.updateTimeStampjobScheduled=false;this.oViewData=this.oKpiTileView.getViewData();this.tilePressed=false;this.kpiValueFetchDeferred=true;this.evaluationFetchDeferred=true;this.backEndCallMade=false;if(!sap.ushell.components.tiles.utils){jQuery.sap.require("sap.ushell.components.tiles.utils");}this.oResourceBundle=sap.ushell.components.tiles.utils.getResourceBundleModel().getResourceBundle();this.oTileApi=this.oViewData.chip;this.system=this.oTileApi.url.getApplicationSystem();this.oKpiTileView.oGenericTile.setState(sap.m.LoadState.Loading);this.getChipConfiguration(function(){t.chipCacheTime=sap.ushell.components.tiles.indicatorTileUtils.util.getCachingTime(t.oConfig);t.chipCacheTimeUnit=sap.ushell.components.tiles.indicatorTileUtils.util.getCachingTimeUnit(t.oConfig);if(t.oTileApi.preview.isEnabled()){t.doDummyProcess();t.oKpiTileView.oGenericTile.attachPress(function(){sap.m.MessageToast.show(t.oResourceBundle.getText("sb.NavigationHelp"));});}else if(t.oConfig.BLANKTILE||t.oConfig.TILE_PROPERTIES.blankTile){t.doDummyProcess();var n=sap.ushell.components.tiles.indicatorTileUtils.util.getNavigationTarget(t.oConfig,t.system);t.oKpiTileView.oGenericTile.$().wrap("<a href ='"+n+"'/>");t.oKpiTileView.oGenericTile.attachPress(function(){t.tilePressed=true;sap.ushell.components.tiles.indicatorTileUtils.util.abortPendingODataCalls(t.queryServiceUriODataReadRef);sap.ushell.components.tiles.indicatorTileUtils.cache.setKpivalueById(t.oConfig.TILE_PROPERTIES.id,null);window.location.hash=n;});}else{if(t.oTileApi.visible&&!sap.ushell.components.tiles.indicatorTileUtils.util.isDualTile(t.oConfig)){t.oTileApi.visible.attachVisible(t.visibleHandler.bind(t));}var n=sap.ushell.components.tiles.indicatorTileUtils.util.getNavigationTarget(t.oConfig,t.system);t.oKpiTileView.oGenericTile.$().wrap("<a href ='"+n+"' style='display: block;'/>");t.oKpiTileView.oGenericTile.attachPress(function(){t.tilePressed=true;sap.ushell.components.tiles.indicatorTileUtils.util.abortPendingODataCalls(t.queryServiceUriODataReadRef);sap.ushell.components.tiles.indicatorTileUtils.cache.setKpivalueById(t.oConfig.TILE_PROPERTIES.id,null);window.location.hash=n;});if(!sap.ushell.components.tiles.indicatorTileUtils.util.isDualTile(t.oConfig)){t.oKpiTileView.oNVConfS.attachRefresh(function(){t.oKpiTileView.oGenericTile.setState(sap.m.LoadState.Loading);jQuery.proxy(t.refreshHandler(true),t);});}t.fetchEvaluation(t.oConfig,function(){t.DEFINITION_DATA=t.oConfig;var u=t.oTileApi.url.addSystemToServiceUrl(t.oConfig.EVALUATION.ODATA_URL);var c=t.oTileApi.configuration.getParameterValueAsString("timeStamp");var i=sap.ushell.components.tiles.indicatorTileUtils.util.isCacheValid(t.oConfig.TILE_PROPERTIES.id,c,t.chipCacheTime,t.chipCacheTimeUnit,t.tilePressed);if(!i||t.getView().getViewData().refresh){t.getRunTimeODataModel(u,function(){if(t.KPI_VALUE_REQUIRED){t.fetchKpiValue(function(k,T){this.KPIVALUE=k;t.doProcess(k,T);},t.logError);}else{t.doProcess();}});}else{if(t.KPI_VALUE_REQUIRED){t.fetchKpiValue(function(k,T){this.KPIVALUE=k;t.doProcess(k,T);},t.logError);}else{t.doProcess();}}});}});},onAfterRendering:function(){this.onAfterTileRendering();},_setLocalModelToTile:function(){if(!this.getTile().getModel()){this.getTile().setModel(new sap.ui.model.json.JSONModel({}));}},autoFormatter:function(n,i){i=i||false;if(!n){return"";}return sap.ushell.components.tiles.indicatorTileUtils.util.getLocaleFormattedValue(Number(n),this.oConfig.EVALUATION.SCALING,this.oConfig.EVALUATION.DECIMAL_PRECISION,i);},setToolTip:function(b,c,t){var d=this;var e;var T=this.setThresholdValues();var m=this.oConfig.EVALUATION.COLUMN_NAME;var i=this.isCurrencyMeasure(m);if(t=="CONT"||t=="COMP"){if(this.oKpiTileView.getContent()[0].getTileContent().length){e=d.oKpiTileView.getContent()[0].getTileContent()[0].getContent();var f,h,j,v,k,l,n,p,q;if(c&&c[0]){f=c[0].title;v=this.autoFormatter(c[0].value,i);n=sap.ushell.components.tiles.indicatorTileUtils.util.getSemanticColorName(c[0].color);}if(c&&c[1]){h=c[1].title;k=this.autoFormatter(c[1].value,i);p=sap.ushell.components.tiles.indicatorTileUtils.util.getSemanticColorName(c[1].color);}if(c&&c[2]){j=c[2].title;l=this.autoFormatter(c[2].value,i);q=sap.ushell.components.tiles.indicatorTileUtils.util.getSemanticColorName(c[2].color);}var r={};r["0"]=this.oConfig.EVALUATION.COLUMN_NAME+",asc";r["1"]=this.oConfig.EVALUATION.COLUMN_NAME+",desc";r["2"]=this.oConfig.TILE_PROPERTIES.dimension+",asc";r["3"]=this.oConfig.TILE_PROPERTIES.dimension+",desc";var u=r[this.oConfig.TILE_PROPERTIES.sortOrder||"0"].split(",");var w={measure:this.oConfig.EVALUATION.COLUMN_NAME,contributionTile:u,m1:f,v1:v,c1:n,m2:h,v2:k,c2:p,m3:j,v3:l,c3:q};sap.ushell.components.tiles.indicatorTileUtils.util.setTooltipInTile(e,t,w);}}else{var x="";if(b=="Error"){x="sb.error";}if(b=="Neutral"){x="sb.neutral";}if(b=="Critical"){x="sb.critical";}if(b=="Good"){x="sb.good";}var w={status:x,actual:this.autoFormatter(c,i),target:this.autoFormatter(T.targetValue,i),cH:this.autoFormatter(T.criticalHighValue,i),wH:this.autoFormatter(T.warningHighValue,i),wL:this.autoFormatter(T.warningLowValue,i),cL:this.autoFormatter(T.criticalLowValue,i)};var e=d.oKpiTileView.getContent()[0].getTileContent()[0]&&d.oKpiTileView.getContent()[0].getTileContent()[0].getContent();sap.ushell.components.tiles.indicatorTileUtils.util.setTooltipInTile(e,t,w);}},getTrendColor:function(t){var b=this,w,c,d,f;try{var i=this.DEFINITION_DATA.EVALUATION.GOAL_TYPE;this.DEFINITION_DATA.EVALUATION_VALUES;var r=sap.m.ValueColor.Neutral;if(i==="MI"){if(t.criticalHighValue&&t.warningHighValue){f=Number(t.criticalHighValue);d=Number(t.warningHighValue);if(this.CALCULATED_KPI_VALUE<d){r=sap.m.ValueColor.Good;}else if(this.CALCULATED_KPI_VALUE<=f){r=sap.m.ValueColor.Critical;}else{r=sap.m.ValueColor.Error;}}}else if(i==="MA"){if(t.criticalLowValue&&t.warningLowValue){c=Number(t.criticalLowValue);w=Number(t.warningLowValue);if(this.CALCULATED_KPI_VALUE<c){r=sap.m.ValueColor.Error;}else if(this.CALCULATED_KPI_VALUE<=w){r=sap.m.ValueColor.Critical;}else{r=sap.m.ValueColor.Good;}}}else{if(t.warningLowValue&&t.warningHighValue&&t.criticalLowValue&&t.criticalHighValue){f=Number(t.criticalHighValue);d=Number(t.warningHighValue);w=Number(t.warningLowValue);c=Number(t.criticalLowValue);if(this.CALCULATED_KPI_VALUE<c||this.CALCULATED_KPI_VALUE>f){r=sap.m.ValueColor.Error;}else if((this.CALCULATED_KPI_VALUE>=c&&this.CALCULATED_KPI_VALUE<=w)||(this.CALCULATED_KPI_VALUE>=d&&this.CALCULATED_KPI_VALUE<=f)){r=sap.m.ValueColor.Critical;}else{r=sap.m.ValueColor.Good;}}}return r;}catch(e){b.logError(e);}},getTrendIndicator:function(t){var b=this;t=Number(t);try{var c=sap.m.DeviationIndicator.None;if(t>this.CALCULATED_KPI_VALUE){c=sap.m.DeviationIndicator.Down;}else if(t<this.CALCULATED_KPI_VALUE){c=sap.m.DeviationIndicator.Up;}return c;}catch(e){b.logError(e);}},setTextInTile:function(){var t=this;var b=sap.ushell.components.tiles.indicatorTileUtils.util.getTileTitleSubtitle(this.oTileApi);this._updateTileModel({header:b.title||sap.ushell.components.tiles.indicatorTileUtils.util.getChipTitle(t.oConfig),subheader:b.subTitle||sap.ushell.components.tiles.indicatorTileUtils.util.getChipSubTitle(t.oConfig)});},_getEvaluationThresholdMeasures:function(){var t=[];t.push(this.oConfig.EVALUATION.COLUMN_NAME);if(this.oConfig.EVALUATION.VALUES_SOURCE==="MEASURE"){var b=this.oConfig.EVALUATION_VALUES;if(b&&b.length){for(var i=0;i<b.length;i++){if((b[i]).COLUMN_NAME&&!((b[i]).FIXED)){t.push((b[i]).COLUMN_NAME);}}}}return t;},onExit:function(){sap.ushell.components.tiles.indicatorTileUtils.util.abortPendingODataCalls(this.queryServiceUriODataReadRef);sap.ushell.components.tiles.indicatorTileUtils.util.abortPendingODataCalls(this.trendChartODataReadRef);sap.ushell.components.tiles.indicatorTileUtils.util.abortPendingODataCalls(this.comparisionChartODataRef);}});return g;});