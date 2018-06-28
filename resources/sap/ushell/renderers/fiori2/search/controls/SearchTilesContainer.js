sap.ui.define(['sap/ushell/renderers/fiori2/search/controls/SearchTilesContainerKeyHandler','sap/ushell/renderers/fiori2/search/controls/SearchTileHighlighter','sap/ushell/renderers/fiori2/search/controls/SearchResultList','sap/m/Button'],function(K,T,S){"use strict";sap.ui.core.Control.extend('sap.ushell.renderers.fiori2.search.controls.SearchTilesContainer',{metadata:{properties:{'totalLength':{type:'int',defaultValue:0},'maxRows':{type:'int',defaultValue:1},'highlightTerms':{type:'string',defaultValue:''},'enableKeyHandler':{type:'boolean',defaultValue:true},'resultList':{type:'sap.ushell.renderers.fiori2.search.controls.SearchResultList'},'addAccInformation':{type:'boolean',defaultValue:false}},aggregations:{'tiles':{type:'sap.ui.core.Control',multiple:true}},events:{showMore:{}}},constructor:function(){sap.ui.core.Control.prototype.constructor.apply(this,arguments);if(this.getEnableKeyHandler()){this.addEventDelegate(new K(this));}this.tileHighlighter=new T();this._previousTabHandler={onsaptabprevious:function(e){var t;if(jQuery(this.control.getDomRef()).prop("tagName").toLowerCase()==="button"){t=this.control.getDomRef();}else{var b=jQuery(this.control.getDomRef()).find("[role='option']");if(b.length>0){t=b[0];}}if(e.isMarked()||!t||e.target!==t){return;}this.resultList.forwardTab(false);e.setMarked();}};},setHighlightTerms:function(t){this.setProperty('highlightTerms',t,true);},delayedRerender:function(){var t=this;setTimeout(function(){t.rerender();},0);},renderer:function(r,c){var t=c.getTiles();if(!t||t.length===0){return;}r.write('<div');r.writeControlData(c);r.addClass('sapUshellSearchTileContainer');r.writeClasses();r.write('>');c.renderTiles(r,c);r.write('</div>');},logUsageAnalytics:function(t){var i,m,c;if(t.attachPress){t.attachPress(function(){m=sap.ushell.renderers.fiori2.search.getModelSingleton();m.eventLogger.logEvent({type:m.eventLogger.TILE_NAVIGATE,tileTitle:t.eventLoggingData.title,targetUrl:t.eventLoggingData.targetUrl});});return;}if(t&&t.getContent){c=t.getContent();if(c.length!==1){return;}i=c[0];if(!i.attachPress){return;}i.attachPress(function(){m=sap.ushell.renderers.fiori2.search.getModelSingleton();m.eventLogger.logEvent({type:m.eventLogger.TILE_NAVIGATE,tileTitle:t.eventLoggingData.title,targetUrl:t.eventLoggingData.targetUrl});});}},renderTiles:function(r,c){var t=c.getTiles();for(var i=0;i<t.length;i++){var a=t[i];c.logUsageAnalytics(a);c.registerAfterRenderingForTile(a);r.write('<div');r.addClass('sapUshellSearchTileWrapper');r.writeClasses();r.write('>');r.renderControl(a);r.write('</div>');a.addEventDelegate(this._previousTabHandler,{resultList:c.getResultList(),control:a});}c.renderPlusTile(r,c);c.tileHighlighter.setHighlightTerms(c.getHighlightTerms());},renderPlusTile:function(r,c){r.write('<div');r.addClass('sapUshellSearchTileWrapper');r.addClass('sapUshellSearchShowMoreTile');r.writeClasses();r.writeAttribute('style','display:none');r.write('>');var b=new sap.m.Button({text:sap.ushell.resources.i18n.getText('showMoreApps'),tooltip:sap.ushell.resources.i18n.getText('showMoreApps'),press:function(){c.fireShowMore();}});b.addEventDelegate(this._previousTabHandler,{resultList:c.getResultList(),control:b});b.addStyleClass('sapUshellSearchShowMoreTileButton');b.addStyleClass('sapMGT');b.addStyleClass('OneByOne');r.renderControl(b);r.write('</div>');},onAfterRendering:function(e){this.limitTileSize();while(this.getNumberRows()>this.getMaxRows()){this.removeLastTile();}var c=this.getDomRef();var n=c.children.length-1;if(this.getTotalLength()>n){this.makePlusTileVisible();this.cutAtRow();}else{c.removeChild(c.children.item(c.children.length-1));}this.addAccessibilityInformation();},addAccessibilityInformation:function(){if(!this.getAddAccInformation()){return;}var c=this.getDomRef();var a=c.children;for(var i=0;i<a.length;++i){var b=a[i];var f=b.querySelector('[tabindex]');if(!f){f=b.querySelector('button');}if(!f){continue;}var d=f.getAttribute('aria-label');if((typeof d)==='string'){f.setAttribute('aria-label',sap.ushell.resources.i18n.getText('tile')+' '+d);}f.setAttribute('role','option');f.setAttribute('aria-posinset',i+1);f.setAttribute('aria-setsize',a.length);}},limitTileSize:function(){var c=this.getDomRef();for(var i=0;i<c.children.length;++i){var t=c.children.item(i);if(!this.hasTileStyleClass(t)){t.classList.add('sapMGT');t.classList.add('OneByOne');}}},hasTileStyleClass:function(d){if(d.classList.contains('sapMGT')&&d.classList.contains('OneByOne')){return true;}if(d.children.length===1){return this.hasTileStyleClass(d.children.item(0));}return false;},getNumberDisplayedTiles:function(){var c=this.getDomRef();return c.children.length;},registerAfterRenderingForTile:function(t){var a=this;if(t.searchTilesContainerAfterRenderingRegistered){return;}t.addEventDelegate({onAfterRendering:function(){a.tileHighlighter.highlight(t);}});t.searchTilesContainerAfterRenderingRegistered=true;},makePlusTileVisible:function(){var c=this.getDomRef();var p=c.children.item(c.children.length-1);p.style.display='inline-block';},removeLastTile:function(){var c=this.getDomRef();var l=c.children.item(c.children.length-2);l.parentNode.removeChild(l);},cutAtRow:function(){var c=this.getDomRef();while(!this.isLastRowCompletelyFilled()||this.getNumberRows()>this.getMaxRows()){if(c.children.length<=2){break;}this.removeLastTile();}},isLastRowCompletelyFilled:function(){var c=this.getDomRef();var t=this.getTilesPerRow();var a=-1;for(var i=0;i<t;++i){var b=c.children.item(c.children.length-1-i);if(b.style.display==='none'){t++;continue;}if(a<0){a=b.offsetLeft;continue;}if(b.offsetLeft>a){return false;}}return true;},getNumberRows:function(){var c=this.getDomRef();var t=-1;var a=0;for(var i=0;i<c.children.length-1;++i){var b=c.children.item(i);if(b.style.display==='none'){continue;}if(t<0||b.offsetLeft<=t){a++;}t=b.offsetLeft;}return a;},getTilesPerRow:function(){var c=this.getDomRef();var t=-1;var a=0;for(var i=0;i<c.children.length;++i){var b=c.children.item(i);if(b.style.display==='none'){continue;}if(b.offsetLeft<=t){return a;}a++;t=b.offsetLeft;}return a;}});});
