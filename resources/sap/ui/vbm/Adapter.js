/*
 * ! SAP UI development toolkit for HTML5 (SAPUI5) (c) Copyright 2009-2012 SAP AG. All rights reserved
 */
sap.ui.define(['sap/ui/core/Element','./library'],function(E,l){"use strict";var c=jQuery.sap.log;var A=E.extend("sap.ui.vbm.Adapter",{metadata:{library:"sap.ui.vbm",publicMethods:["load"],associations:{map:{type:"sap.ui.vbm.GeoMap"}},events:{submit:{parameters:{data:{type:"string"}}}}}});A.prototype.init=function(){this._eventHandlers=[];this._mapConfiguration={};this._clusterVOs=[];this._dataTypes={};this._data={};this._groupedActions={};this._clickHandler=this._genericClickHandler;this._handler=this._genericGeomapHandler;this._idKeyMap={};this._propsAnomalies=new Map();this._propsAnomalies.set("pos","position");this._propsAnomalies.set("posarray","position");this._propsAnomalies.set("dragdata","dragData");this._routeProperties=["color","colorBorder","directionIndicator","dotcolor","dotwidth","dragdata","end","hotDeltaColor","labelBgColor","labelPos","labelText","lineDash","linewidth","posarray","selectColor","start","tooltip"];this._spotProperties=["alignment","contentOffset","dragdata","fxdir","fxsize","hotDeltaColor","icon","image","labelBgColor","labelPos","labelText","pos","selectColor","tooltip","semanticType"];};A.prototype.exit=function(){this._detachHandlers();};A.prototype.setMap=function(m){var o=this._map()||null;var n=sap.ui.getCore().byId(m instanceof sap.ui.vbm.GeoMap?m.getId():m);if((o!=n)&&(o!=null)){this._detachHandlers();this.init();}this.setAssociation("map",m,true);if(n!=null){var M=new sap.ui.model.json.JSONModel();n.setModel(M);}};A.prototype._map=function(){return sap.ui.getCore().byId(this.getMap());};A.prototype._attachHandler=function(e,h,a){if((e in this.mEventRegistry)&&(this.mEventRegistry[e].length>0)){return this;}else{if(!a._eventHandlers.some(function(b){return b===h;})){a._eventHandlers.push(h);}this.attachEvent(e,h,a);return this;}};A.prototype._detachHandlers=function(){var t=this;var d=function(s){if(this.hasListeners(s)){var b=this.mEventRegistry[s];for(var i=0,L=b.length;i<L;i++){var f=t._eventHandlers.indexOf(b[i].fFunction);if(f!==-1){this.detachEvent(s,b[i].fFunction,b[i].oListener);}}}};var g=this._map();if(g!=null){var m=g.mEventRegistry;for(var e in m){if(m.hasOwnProperty(e)){d.call(g,e);}}var a=function(v){var V=v.mEventRegistry;for(var b in V){if(V.hasOwnProperty(b)){d.call(v,b);}}};g.getVos().forEach(a);}return this;};A.prototype.load=function(d){var o=null;if(typeof d==='string'){try{o=JSON.parse(d);}catch(e){c.debug("sap.ui.vbm.Adapter: attempt to load invalid JSON string.");return this;}}else if(typeof d==='object'){o=d;}if(!o){c.debug("sap.ui.vbm.Adapter: nothing to load.");return this;}if(!o.SAPVB){c.debug("sap.ui.vbm.Adapter:invalid object supplied for load.");return this;}if(o.SAPVB.Config){this._processConfiguration(o.SAPVB.Config);}if(o.SAPVB.Resources){this._processResources(o.SAPVB.Resources);}if(o.SAPVB.DataTypes){this._processDataTypes(o.SAPVB.DataTypes);}if(o.SAPVB.Clustering){this._processClusters(o.SAPVB.Clustering);}return(o.SAPVB.MapProviders?this._processMapProviders(o.SAPVB.MapProviders):Promise.resolve()).then(function(){if(o.SAPVB.MapLayerStacks){this._processMapLayerStacks(o.SAPVB.MapLayerStacks);}if(o.SAPVB.Scenes){this._processScenes(o.SAPVB.Scenes);}if(o.SAPVB.Data){this._processData(o.SAPVB.Data);}if(o.SAPVB.Actions){this._processActions(o.SAPVB.Actions);}if(o.SAPVB.Automation&&o.SAPVB.Automation.Call){this._processAutomation(o.SAPVB.Automation,o.SAPVB.Menus);}if(o.SAPVB.Windows){this._processDetailWindows(o);}}.bind(this));};A.prototype._processConfiguration=function(a){return this;};A.prototype._processResources=function(r){if(r.Set){var g=this._map();g.destroyResources();[].concat(r.Set.Resource).forEach(function(a){g.addResource(new sap.ui.vbm.Resource({"name":a.name,"value":a.value}));},this);}return this;};A.prototype._processDataTypes=function(d){if(d.Set){if(d.Set.name&&d.Set.type&&(d.Set.type==="N")){[].concat(d.Set.N).foreach(function(a){this._dataTypes.forEach(function(_){if(_.name==a.name){_=a;}});});}else{this._dataTypes=[].concat(d.Set.N);}}return this;};A.prototype._processData=function(b){var f=function(a,n){var e=sap.ui.vbm.findInArray(this._dataTypes,function(_){return _.name==n;});if((e==null)||!(e.A)){return undefined;}else{var o=sap.ui.vbm.findInArray(e.A,function(_){return _.alias==a;});if(o!=null){return o.name;}else{return undefined;}}};var g=function(n){if(n.name&&n.E){this._data[n.name]=[].concat(n.E).map(function(e){var d={};for(var a in e){if((a!=="xmlns:VB")&&(a!=="n.name")&&e.hasOwnProperty(a)){if(a==="VB:c"){d["changeable"]=e[a];}else if(a==="VB:s"){d["select"]=e[a];}else{var s=f.call(this,a,n.name);if((s!=null)&&(s!=="")){d[s]=e[a];}else{d[a]=e[a];}}}}return d;},this);}};var u=function(e){var d={};for(var a in e){if((a!=="xmlns:VB")&&(a!=="n.name")&&e.hasOwnProperty(a)){if(a==="VB:c"){d["changeable"]=e[a];}else if(a==="VB:s"){d["select"]=e[a];}else{var s=f.call(this,a,e["n.name"]);if((s!=null)&&(s!=="")){d[s]=e[a];}else{d[a]=e[a];}}}}if(!this._data[e["n.name"]]){this._data[e["n.name"]]=[];}if(this._data[e["n.name"]].some(function(_){return _.Key==e.K;})){var i=sap.ui.vbm.findIndexInArray(this._data[e["n.name"]],function(_){return _.Key===e.K;});if(i!==-1){this._data[e["n.name"]][i]=d;}}else{this._data[e["n.name"]].push(d);}};if(b.Remove){[].concat(b.Remove).filter(function(r){return(r.N&&r.N.E);}).forEach(function(r){[].concat(r.N.E).forEach(function(e){var i=sap.ui.vbm.findIndexInArray(this._data[r.name],function(_){return _.Key===e.K;});if(i!==-1){this._data[r.name].splice(i,1);}},this);},this);}if(b.Set&&(typeof b.Set==='object')&&!(jQuery.isEmptyObject(b.Set))){if(!Array.isArray(b.Set)&&!(b.Set.name)&&!(b.Set.type)){this._data={};if(b.Set.N!==null){[].concat(b.Set.N).forEach(g,this);}}else{[].concat(b.Set).filter(function(s){return(s.name)&&(s.type);}).map(function(s){return[].concat(s.N);}).reduce(function(a,B){return a.concat(B);}).map(function(n){var e=[].concat(n.E);return e.map(function(_){_["n.name"]=n.name;return _;});}).reduce(function(a,B){return a.concat(B);}).forEach(u,this);}}this._map().getModel().setData(this._data,false);return this;};A.prototype._processMapProviders=function(p){if(p.Set&&p.Set.MapProvider){var m=[].concat(p.Set.MapProvider).map(function(a){return{name:a.name,tileX:a.tileX,tileY:a.tileY,minLOD:a.minLOD,maxLOD:a.maxLOD,copyright:a.copyright,Source:a.Source?[].concat(a.Source).map(function(s){return{id:s.id,url:s.url};}):a.Source};});var d=function(s){return s&&s.url&&s.url.indexOf("google")!==-1;};var G=m.map(function(P){return[].concat(P.Source);}).reduce(function(a,b){return a.concat(b);}).filter(d);if(G.length>0){var e=[];var o=G.reduce(function(g,a){var b=a.url.split("key=")[1];g[b]=g[b]||[];if(sap.ui.vbm.findIndexInArray(e,function(k){return k===b;})===-1){e.push(b);}g[b].push(a);return g;},{});var f=function(a){return new Promise(function(r,b){var x=new XMLHttpRequest();x.open("POST",'https://www.googleapis.com/tile/v1/createSession?key='+a,true);x.setRequestHeader("Content-Type","application/json");x.onreadystatechange=function(){if(x.readyState==4){if(x.status==200){r(JSON.parse(x.responseText));}else{b(new Error(x.statusText));}}};var g={"mapType":"terrain","language":"en-NZ","region":"nz","layerTypes":["layerRoadmap"],"overlay":false,"scale":"scaleFactor1x"};x.send(JSON.stringify(g));}).then(function(r){if(r&&r.session){o[a].forEach(function(s){s.url=s.url+"&session="+r.session;});}},function(s){c.debug(s);});};return Promise.all(e.map(f)).then(function(){this._mapConfiguration.MapProvider=m;this._updateMapconfiguration();}.bind(this));}else{this._mapConfiguration.MapProvider=m;this._updateMapconfiguration();return Promise.resolve();}}return this;};A.prototype._processMapLayerStacks=function(s){if(s.Set&&s.Set.MapLayerStack){this._mapConfiguration.MapLayerStacks=[].concat(s.Set.MapLayerStack).map(function(a){return{name:a.name,MapLayer:a.MapLayer?[].concat(a.MapLayer).map(function(b){return{name:b.name,refMapProvider:b.refMapProvider,opacity:b.opacity,colBkgnd:b.colBkgnd};}):a.MapLayer};});this._updateMapconfiguration();}return this;};A.prototype._updateMapconfiguration=function(){if(this._mapConfiguration.MapProvider&&this._mapConfiguration.MapLayerStacks){this._map().setMapConfiguration(this._mapConfiguration);}return this;};A.prototype._processScenes=function(s){if(s.Set&&s.Set.SceneGeo){var m=this._map();if(s.Set.SceneGeo.refMapLayerStack){m.setRefMapLayerStack(s.Set.SceneGeo.refMapLayerStack);}var v=s.Set.SceneGeo.VO;m.destroyVos();if(!v){return this;}v.forEach(function(d){if(this._clusterVOs.indexOf(d.id)!==-1){return;}var a,b,e=[],f={};function p(k,n){for(var o in d){var q=o.indexOf('.bind');var r=q!==-1?o.substring(0,q):o;if(k.indexOf(r)!==-1){r=n.get(r)||r;var t=d[o];if(q!==-1){t=d[o].substring(d[o].indexOf('.')+1);e.push(t);}f[r]=q!==-1?"{"+t+"}":t;}}}function g(){if(d.DragSource&&b.getMetadata().hasAggregation("dragSource")){[].concat(d.DragSource.DragItem).forEach(function(k){b.addDragSource(new sap.ui.vbm.DragSource({type:k.type}));});}if(d.DropTarget&&b.getMetadata().hasAggregation("dropTarget")){[].concat(d.DropTarget.DropItem).forEach(function(k){b.addDropTarget(new sap.ui.vbm.DropTarget({type:k.type}));});}}switch(d.type){case"{00100000-2012-0004-B001-64592B8DB964}":p(this._spotProperties,this._propsAnomalies);a=new sap.ui.vbm.Spot(f);b=new sap.ui.vbm.Spots(d.id);g();break;case"{00100000-2012-0004-B001-C46BD7336A1A}":p(this._routeProperties,this._propsAnomalies);a=new sap.ui.vbm.Route(f);b=new sap.ui.vbm.Routes(d.id);g();break;case"{00100000-2012-0004-B001-F311DE491C77}":case"{00100000-2013-0004-B001-7EB3CCC039C4}":case"{00100000-2013-0004-B001-686F01B57873}":case"{00100000-2012-0004-B001-BFED458C3076}":case"{00100000-2012-0004-B001-383477EA1DEB}":case"ExtLink":case"ExtArea":default:c.debug("unsupported VO type: "+d.type);return;}var i=sap.ui.vbm.findIndexInArray(this._dataTypes,function(_){return _.name===d.datasource;});if(i!==-1){var h=this._dataTypes[i];a.bindProperty("key",{path:h.key});e.push(h.key);var j=[];h.A.forEach(function(k){if(e.indexOf(k.name)===-1){j.push(k.name);var n=new sap.ui.core.CustomData({key:k.name,value:"{"+k.name+"}"});a.addCustomData(n);}});if(j.length){b.setCustomProperties(j);}b.bindAggregation("items",{path:"/"+d.datasource+"",template:a});}else{b.addItem(a);}m.addVo(b);}.bind(this));}return this;};A.prototype._processActions=function(b){var d=function(o){return function(g){switch(g.refEvent){case"Click":if(!this._eventHandlers.some(function(a){return a===this._handler;},this)){this._eventHandlers.push(this._handler);}o.attachClick(this._handler,this);break;case"ContextMenu":if(!this._eventHandlers.some(function(a){return a===this._handler;},this)){this._eventHandlers.push(this._handler);}o.attachContextMenu(this._handler,this);break;case"DoubleClick":if(!this._eventHandlers.some(function(a){return a===this._clickHandler;},this)){this._eventHandlers.push(this._clickHandler);}o.attachClick(this._clickHandler,this);break;case"Drop":if(!this._eventHandlers.some(function(a){return a===this._handler;},this)){this._eventHandlers.push(this._handler);}o.attachDrop(this._handler,this);break;case"Select":if(!this._eventHandlers.some(function(a){return a===this._handler;},this)){this._eventHandlers.push(this._handler);}o.attachSelect(this._handler,this);break;default:break;}};};if((b.Set!=null)&&(b.Set.Action!=null)){var e=this._map().getVos();var f=e.map(function(v){return v.getTemplateObject().type;});this._groupedActions=[].concat(b.Set.Action).reduce(function(g,a){var n=a.refVO;if(!a.refVO){n="General";}g[n]=g[n]||[];g[n].push(a);return g;},{});var k=function(t){return t.refEvent==="KeyPress";};var h=function(a){return a.refEvent==="Click";};var i=function(a){return a.refEvent==="DoubleClick";};var j=function(a){return a.refEvent!=="Click";};var m;for(var n in this._groupedActions){switch(n){case"Spot":m="{00100000-2012-0004-B001-64592B8DB964}";break;case"Link":m="{00100000-2012-0004-B001-C46BD7336A1A}";break;case"Map":case"General":m="Map";break;default:m="";break;}var o=m==="Map"?this._map():e[f.indexOf(m)];if(o){var p=this._groupedActions[n];if(p.some(i)){if(p.some(h)){p.filter(j).forEach(d(o),this);}else{p.forEach(d(o),this);}}else{p.forEach(d(o),this);}}if(n==="General"){var q=sap.ui.vbm.findInArray(this._groupedActions[n],k);if(q!=null){this._setupKeyboardEvents(q);}}}}return this;};A.prototype._setupKeyboardEvents=function(a){var t=this;var g=this._map();g.setAllowKeyEventRepeat(false);g.setKeyEventDelay(250);var h=function(e){var p=e.mParameters;if(p.key=="Shift"||p.code==16||p.key=="Control"||p.code==17||p.key=="Alt"||p.code==18||p.key=="Meta"||p.code==91){return t;}var d={"version":"2.0","xmlns:VB":"VB","Action":{"name":a.name,"Params":{"Param":[{"name":"code","#":p.code},{"name":"shift","#":p.shift},{"name":"ctrl","#":p.ctrl},{"name":"alt","#":p.alt},{"name":"meta","#":p.meta}]}}};t.fireSubmit({data:JSON.stringify(d)});};if(!this._eventHandlers.some(function(e){return e===h;},this)){this._eventHandlers.push(h);}this._map().attachKeyDown(h);return this;};A.prototype._processAutomation=function(a,m){var b={};if(a.Call.handler==="CONTEXTMENUHANDLER"){var t=this;var V=this._map().getVos().map(function(v){return v.getItems();}).reduce(function(v,d){return v.concat(d);});var i=sap.ui.vbm.findIndexInArray(V,function(v){return v.getKey()===a.Call.instance.split('.')[1];});if(i!==-1){var o=V[i];if(o){a.Call.instance=o.getUniqueId();if(m.Set.Menu){[].concat(m.Set.Menu).forEach(function(M){t._attachHandler.call(o,M.action,function(e){var d=e.mParameters.data;d.Action.instance=d.Action.object+'.'+e.oSource.getKey();this.fireSubmit({data:JSON.stringify(d)});},t);});}}}}b["Automation"]=a;b["Menus"]=m;var L={};L["SAPVB"]=b;this._map().load(L);return this;};A.prototype._processClusters=function(a){this._clusterVOs=[];if(a.Set){var m=this._map();m.destroyClusters();[].concat(a.Set.Cluster).forEach(function(i){this._clusterVOs.push(i.VO);var b=null;switch(i.type){case"distance":b=new sap.ui.vbm.ClusterDistance(i.id);if(i.distance){b.setDistance(parseFloat(i.distance));}break;case"grid":b=new sap.ui.vbm.ClusterGrid(i.id);if(i.limit){b.setLimit(parseInt(i.limit,10));}if(i.limitOnSum){b.setLimitTotal(parseInt(i.limitOnSum,10));}if(i.order){b.setOrderIndex(parseInt(i.order,10));}if(i.areabordersize){b.setCellSpacing(-parseInt(i.areabordersize,10));}if(i.distanceX&&i.distanceY){b.setGridSize(i.distanceX+";"+i.distanceY);}if(i.offsetX&&i.offsetY){b.setOffset(i.offsetX+";"+i.offsetY);}break;case"tree":b=new sap.ui.vbm.ClusterTree(i.id,{});break;default:c.debug("sap.ui.vbm.Adapter: unsupported clustering type \""+i.type+"\"");break;}if(b){if(i.rule){b.setRule(i.rule);}b.setTextSettings({textcolor:i.textcolor,textfont:i.textfont,textfontsize:i.textfontsize,textoffset:i.textoffset,textoffsetY:i.textoffsetY});b.setVizTemplate(new sap.ui.vbm.Cluster());m.addCluster(b);}},this);}return this;};A.prototype._processDetailWindows=function(o){var g=this._map();var t=this;if(o.SAPVB.Windows.Set.name){var f=function(p,n){return function(d){return d[p]===n;};};var w=[].concat(o.SAPVB.Windows.Set).map(function(a){var m=g.getModel().getData();var W=a;for(var s in a.Window){if(a.Window.hasOwnProperty(s)){if(jQuery.sap.endsWith(s,".bind")){if(jQuery.sap.startsWith(s,"pos")){var p=a.Window[s].split(".");if(p[0]in m){var i=sap.ui.vbm.findIndexInArray(m[p[0]],f("Key",p[1]));if(i!==-1){var d=m[p[0]][i];if(p[2]in d){delete W.Window[s];W.Window[s.split(".")[0]]=d[p[2]];}}}}}}}return W;},this);o.SAPVB.Windows.Set=w;if(o.SAPVB.Scenes&&o.SAPVB.Scenes.Set&&o.SAPVB.Scenes.Set.name&&o.SAPVB.Scenes.Set.Scene&&o.SAPVB.Scenes.Set.Scene.VO){var V=[].concat(o.SAPVB.Scenes.Set.Scene.VO).map(function(v){var b=v;var d=function(b,e,p){return function(s){if(s.name&&s.type){var D=s[s.type];if(D.name===s.name){var a=sap.ui.vbm.findInArray([].concat(this._dataTypes),f("name",D.name));var h=sap.ui.vbm.findInArray([].concat(sap.ui.vbm.findInArray([].concat(a.N),f("name",p[2])).A),f("name",p[4])).alias;var i=[].concat(D.E)[p[1]];var S=[].concat(sap.ui.vbm.findInArray([].concat(i.N),f("name",p[2])).E)[p[3]];b[e.split(".")[0]]=S[h];delete b[e];}}};};for(var e in v){if(v.hasOwnProperty(e)){if(jQuery.sap.endsWith(e,".bind")){var p=v[e].split(".");if(o.SAPVB.Data&&o.SAPVB.Data.Set){[].concat(o.SAPVB.Data.Set).forEach(d(b,e,p),this);}}}}if(o.SAPVB.Actions&&o.SAPVB.Actions.Set){[].concat(o.SAPVB.Actions.Set).filter(function(a){return a.Action.refVO===b.id;}).forEach(function(a){t._attachHandler.call(g,a.Action.name,t._handler,t);});}return b;},this);o.SAPVB.Scenes.Set.Scene.VO=V;}g.load(o);}return this;};A.prototype._genericGeomapHandler=function(d){var p=d.getParameters();var o=p.data?p.data:p;if(o.Action&&o.Action.object){if(o.Action.object==="Route"){o.Action.object="Link";}var f=sap.ui.vbm.findInArray(this._groupedActions[o.Action.object],function(a){return a.refEvent.toLowerCase()===o.Action.name.toLowerCase();});if(f){o.Action.id=f.id;o.Action.name=f.name;if(o.Action.instance){o.Action.instance=o.Action.instance.split(".")[0]+"."+p.instance.getKey();}var g=function(){this._map().getVos().map(function(a){return a.getItems();}).reduce(function(a,b){return a.concat(b);}).forEach(function(i){this._idKeyMap[i.getUniqueId()]=i.getKey();},this);}.bind(this);var h=[];if(o.Action.Params){o.Action.Params.Param.forEach(function(i){if(i.name==="strSource"){h.push(i);}});if(h.length){if(jQuery.isEmptyObject(this._idKeyMap)){g();}else if(h.some(function(i){return!this._idKeyMap.hasOwnProperty(i["#"].split(".")[1]);},this)){g();}h.forEach(function(i){var a=i["#"].split(".");i["#"]=a[0]+"."+this._idKeyMap[a[1]];},this);}}if((o.Data)&&(o.Data.Merge)&&(o.Data.Merge.N)){var j=o.Data.Merge.N.map(function(n){return n.E;}).reduce(function(a,b){return a.concat(b);}).map(function(e){return e.K;});if(jQuery.isEmptyObject(this._idKeyMap)){g();}if(j.some(function(u){return!this._idKeyMap.hasOwnProperty(u);},this)){g();}var k=function(e){e.K=this._idKeyMap[e.K];};[].concat(o.Data.Merge.N).map(function(n){return n.E;}).reduce(function(a,b){return a.concat(b);}).forEach(k,this);}this.fireSubmit({data:JSON.stringify(o)});}}this.timeout=undefined;};A.prototype._genericClickHandler=function(e){if(this.timeout){e.getParameters().data.Action.name="doubleclick";clearTimeout(this.timeout);this._genericGeomapHandler.call(this,e);}else{this.oEvent=jQuery.extend(true,{},e);this.timeout=setTimeout(this._genericGeomapHandler.bind(this,this.oEvent),500);}};return A;});
