sap.ui.require(['sap/ushell/components/tiles/generic'],function(g){"use strict";var C=g.extend("sap.ushell.components.tiles.indicatorcomparison.ComparisonTile",{onInit:function(){this.KPI_VALUE_REQUIRED=false;},_processDataForComparisonChart:function(d,m,u){var f=[],L={},i,t,l;var a;var T=[];var b=this;var e=null;for(i=0;i<d.results.length;i++){var h=d.results[i];}T=sap.ushell.components.tiles.indicatorTileUtils.util.getAllMeasuresWithLabelText(this.oTileApi.url.addSystemToServiceUrl(this.oConfig.EVALUATION.ODATA_URL),this.oConfig.EVALUATION.ODATA_ENTITYSET);for(i=0,l=T.length;i<l;i++){t=T[i];L[t.key]=t.value;}var j=b.oConfig.TILE_PROPERTIES.COLUMN_NAMES||b.oConfig.EVALUATION.COLUMN_NAMES;for(i=0;i<j.length;i++){var k={};var n=j[i];k.value=Number(h[n.COLUMN_NAME]);var o=Number(h[n.COLUMN_NAME]);var p=false;var s=0;var q=b._getEvaluationThresholdMeasures();var I=jQuery.inArray(n.COLUMN_NAME,q);if(I>-1){p=true;s=b.oConfig.EVALUATION.SCALING;}if(b.oConfig.EVALUATION.SCALING==-2&&p){o*=100;}var c=b.isCurrencyMeasure(n.COLUMN_NAME);if(u&&u[i]&&h[u[i].name]){e=h[u[i].name];}a=sap.ushell.components.tiles.indicatorTileUtils.util.getLocaleFormattedValue(o,s,b.oConfig.EVALUATION.SCALING,b.oConfig.EVALUATION.DECIMAL_PRECISION,c,e);if(b.oConfig.EVALUATION.SCALING==-2&&p){a+=" %";}k.displayValue=a.toString();if(u){if(u[i]&&h[u[i].name]){k.displayValue+=" "+h[u[i].name];}}k.color=n.semanticColor;k.title=L[n.COLUMN_NAME]||n.COLUMN_NAME;k.measure=n.COLUMN_NAME;k.isCurM=c;f.push(k);}return f;},fetchChartData:function(r,a,s,E){function c(w,x){var y=false;if(w&&w.results&&w.results.length){for(var i=0,l=x.length;i<l&&!y;i++){y=w.results[0][x[i].COLUMN_NAME]!==null;}}return y;}var t=this;try{var b=this.oConfig.EVALUATION.ODATA_ENTITYSET;var m=this.oConfig.EVALUATION.COLUMN_NAME;var d=m;if(this.oConfig.TILE_PROPERTIES.COLUMN_NAMES){for(var j=0;j<this.oConfig.TILE_PROPERTIES.COLUMN_NAMES.length;j++){if(this.oConfig.TILE_PROPERTIES.COLUMN_NAMES[j].COLUMN_NAME!=this.oConfig.EVALUATION.COLUMN_NAME){d=d+","+this.oConfig.TILE_PROPERTIES.COLUMN_NAMES[j].COLUMN_NAME;}}}else{for(var j=0;j<this.oConfig.EVALUATION.COLUMN_NAMES.length;j++){if(this.oConfig.EVALUATION.COLUMN_NAMES[j].COLUMN_NAME!=this.oConfig.EVALUATION.COLUMN_NAME){d=d+","+this.oConfig.EVALUATION.COLUMN_NAMES[j].COLUMN_NAME;}}}var f=sap.ushell.components.tiles.indicatorTileUtils.util.getBoolValue(r);var h=sap.ushell.components.tiles.indicatorTileUtils.cache.getKpivalueById(t.oConfig.TILE_PROPERTIES.id);if(sap.ushell.components.tiles.indicatorTileUtils.util.isDualTile(t.oConfig)){if(h){var k=h.Data&&JSON.parse(h.Data);}}var n=t.oTileApi.configuration.getParameterValueAsString("timeStamp");var o=sap.ushell.components.tiles.indicatorTileUtils.util.isCacheValid(t.oConfig.TILE_PROPERTIES.id,n,t.chipCacheTime,t.chipCacheTimeUnit,t.tilePressed);if((k&&!k.rightData)||!h||(!o&&t.oTileApi.visible.isVisible())||f||(a&&t.oTileApi.visible.isVisible())||t.getView().getViewData().refresh){if(t.kpiValueFetchDeferred){t.kpiValueFetchDeferred=false;var v=sap.ushell.components.tiles.indicatorTileUtils.util.prepareFilterStructure(this.oConfig.EVALUATION_FILTERS,this.oConfig.ADDITIONAL_FILTERS);var p=sap.ushell.components.tiles.indicatorTileUtils.util.prepareQueryServiceUri(t.oRunTimeODataModel,b,d,null,v,3);this.comparisionChartODataRef=p.model.read(p.uri,null,null,true,function(i){t.kpiValueFetchDeferred=true;var w={};if(p.unit){w.unit=p.unit;}if(c(i,t.oConfig.TILE_PROPERTIES.COLUMN_NAMES||t.oConfig.EVALUATION.COLUMN_NAMES)){t.oConfig.TILE_PROPERTIES.FINALVALUE=i;t.oConfig.TILE_PROPERTIES.FINALVALUE=t._processDataForComparisonChart(t.oConfig.TILE_PROPERTIES.FINALVALUE,d.split(",")[0],p.unit);w.data=t.oConfig.TILE_PROPERTIES.FINALVALUE;var l={};t.cacheTime=sap.ushell.components.tiles.indicatorTileUtils.util.getUTCDate();l.ChipId=t.oConfig.TILE_PROPERTIES.id;l.Data=JSON.stringify(w);l.CacheMaxAge=Number(t.chipCacheTime);l.CacheMaxAgeUnit=t.chipCacheTimeUnit;l.CacheType=1;var x=t.getLocalCache(l);t.updateDatajobScheduled=false;var y=t.oConfig.TILE_PROPERTIES.id+"data";var z=sap.ushell.components.tiles.indicatorTileUtils.util.getScheduledJob(y);if(z){clearTimeout(z);z=undefined;}if(!sap.ushell.components.tiles.indicatorTileUtils.util.isDualTile(t.oConfig)){sap.ushell.components.tiles.indicatorTileUtils.cache.setKpivalueById(t.oConfig.TILE_PROPERTIES.id,x);var U=false;if(h){U=true;}if(t.chipCacheTime){sap.ushell.components.tiles.indicatorTileUtils.util.writeFrontendCacheByChipAndUserId(t.oTileApi,t.oConfig.TILE_PROPERTIES.id,l,U,function(i){if(i){t.cacheTime=i&&i.CachedTime;sap.ushell.components.tiles.indicatorTileUtils.cache.setKpivalueById(t.oConfig.TILE_PROPERTIES.id,i);t.setTimeStamp();}if(t.chipCacheTime&&!sap.ushell.components.tiles.indicatorTileUtils.util.isDualTile(t.oConfig)){jQuery.proxy(t.setTimeStamp(t.cacheTime),t);}});}}else{var A=sap.ushell.components.tiles.indicatorTileUtils.cache.getKpivalueById(t.oConfig.TILE_PROPERTIES.id);if(A){if(!A.CachedTime){A.CachedTime=sap.ushell.components.tiles.indicatorTileUtils.util.getUTCDate();}var B=A.Data;if(B){B=JSON.parse(B);B.rightData=w;}A.Data=JSON.stringify(B);sap.ushell.components.tiles.indicatorTileUtils.cache.setKpivalueById(t.oConfig.TILE_PROPERTIES.id,A);}else{var B={};B.rightData=w;x.Data=JSON.stringify(B);sap.ushell.components.tiles.indicatorTileUtils.cache.setKpivalueById(t.oConfig.TILE_PROPERTIES.id,x);}t.cacheWriteData=w;}s.call(t,t.oConfig.TILE_PROPERTIES.FINALVALUE);}else if(i.results.length==0){t.oConfig.TILE_PROPERTIES.FINALVALUE=i;if(sap.ushell.components.tiles.indicatorTileUtils.cache.getKpivalueById(t.oConfig.TILE_PROPERTIES.id)){w=sap.ushell.components.tiles.indicatorTileUtils.cache.getKpivalueById(t.oConfig.TILE_PROPERTIES.id);w.data=i;}else{w.data=i;}sap.ushell.components.tiles.indicatorTileUtils.cache.setKpivalueById(t.oConfig.TILE_PROPERTIES.id,w);s.call(t,t.oConfig.TILE_PROPERTIES.FINALVALUE);t.setNoData();}else{sap.ushell.components.tiles.indicatorTileUtils.cache.setKpivalueById(t.oConfig.TILE_PROPERTIES.id,{empty:"empty"});t.setNoData();}},function(i){t.kpiValueFetchDeferred=true;if(i&&i.response){jQuery.sap.log.error(i.message+" : "+i.request.requestUri);E.call(t,i);}});}}else{if(h&&h.Data){var q;var u=t.oConfig&&t.oConfig.TILE_PROPERTIES&&t.oConfig.TILE_PROPERTIES.tileType;if(u.indexOf("DT-")==-1){q=h.Data&&JSON.parse(h.Data);}else{q=h.Data&&JSON.parse(h.Data);q=q.rightData;}t.cacheTime=h.CachedTime;if(t.chipCacheTime&&!sap.ushell.components.tiles.indicatorTileUtils.util.isDualTile(t.oConfig)){jQuery.proxy(t.setTimeStamp(t.cacheTime),t);}if(q.data&&q.data.length){t.oConfig.TILE_PROPERTIES.FINALVALUE=q.data;s.call(t,t.oConfig.TILE_PROPERTIES.FINALVALUE);}else{t.oConfig.TILE_PROPERTIES.FINALVALUE=q.data;s.call(t,t.oConfig.TILE_PROPERTIES.FINALVALUE);t.setNoData();}}else{t.setNoData();}}}catch(e){t.kpiValueFetchDeferred=true;E.call(t,e);}},doProcess:function(r,i){var t=this;this.setTextInTile();this.fetchChartData(r,i,function(k){this.CALCULATED_KPI_VALUE=k;this._updateTileModel({data:this.CALCULATED_KPI_VALUE});if(t.oConfig.TILE_PROPERTIES.frameType==sap.m.FrameType.TwoByOne){t.oKpiTileView.oGenericTile.setFrameType(sap.m.FrameType.TwoByOne);t.getView().getViewData().parentController._updateTileModel(this.getTile().getModel().getData());var c={};c.data=this.CALCULATED_KPI_VALUE;t.getView().getViewData().deferredObj.resolve();}else{t.oKpiTileView.oGenericTile.setFrameType(sap.m.FrameType.OneByOne);t.oKpiTileView.oGenericTile.removeAllTileContent();t.oKpiTileView.oGenericTile.addTileContent(t.oKpiTileView.oNVConfS);this.oKpiTileView.oGenericTile.setState(sap.m.LoadState.Loaded);}this.setToolTip(null,this.CALCULATED_KPI_VALUE,"COMP");if(this.chipCacheTime&&!sap.ushell.components.tiles.indicatorTileUtils.util.isDualTile(this.oConfig)){sap.ushell.components.tiles.indicatorTileUtils.util.scheduleFetchDataJob.call(this,this.oTileApi.visible.isVisible());}},this.logError);},doDummyProcess:function(){var t=this;this.setTextInTile();t._updateTileModel({value:8888,size:sap.m.Size.Auto,frameType:sap.m.FrameType.OneByOne,state:sap.m.LoadState.Loading,valueColor:sap.m.ValueColor.Error,indicator:sap.m.DeviationIndicator.None,title:"Liquidity Structure",footer:"Current Quarter",description:"Apr 1st 2013 (B$)",data:[{title:"Measure 1",value:1.2,color:"Good"},{title:"Measure 2",value:0.78,color:"Good"},{title:"Measure 3",value:1.4,color:"Error"}]});this.oKpiTileView.oGenericTile.setState(sap.m.LoadState.Loaded);}});return C;});
