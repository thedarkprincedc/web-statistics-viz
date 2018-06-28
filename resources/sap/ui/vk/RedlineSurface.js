/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)

        (c) Copyright 2009-2015 SAP SE. All rights reserved
    
 */
sap.ui.define(["jquery.sap.global","./library","sap/ui/core/Control","./Loco","./RedlineGesturesHandler"],function(q,l,C,L){"use strict";var R=C.extend("sap.ui.vk.RedlineSurface",{metadata:{library:"sap.ui.vk",aggregations:{redlineElements:{type:"sap.ui.vk.RedlineElement"}},properties:{virtualLeft:{type:"float"},virtualTop:{type:"float"},virtualSideLength:{type:"float"},panningRatio:{type:"float",defaultValue:1}},events:{pan:{parameters:{deltaX:"float",deltaY:"float"}},zoom:{parameters:{originX:"float",originY:"float",zoomFactor:"float"}}}}});R.prototype.init=function(){};R.prototype.onAfterRendering=function(){};R.prototype.exportJSON=function(){return this.getRedlineElements().map(function(e){return e.exportJSON();});};R.prototype.importJSON=function(j){if(!q.isArray(j)){j=[j];}j.forEach(function(a){var E;switch(a.type){case sap.ui.vk.Redline.ElementType.Rectangle:E=sap.ui.vk.RedlineElementRectangle;break;case sap.ui.vk.Redline.ElementType.Ellipse:E=sap.ui.vk.RedlineElementEllipse;break;case sap.ui.vk.Redline.ElementType.Freehand:E=sap.ui.vk.RedlineElementFreehand;break;default:q.sap.log.warning("Unsupported JSON element type "+a.type);}this.addRedlineElement(new E().importJSON(a));}.bind(this));return this;};R.prototype._toVirtualSpace=function(x,y){if(arguments.length===1){return x/this.getVirtualSideLength();}else{return{x:(x-this.getVirtualLeft())/this.getVirtualSideLength(),y:(y-this.getVirtualTop())/this.getVirtualSideLength()};}};R.prototype._toPixelSpace=function(x,y){if(arguments.length===1){return x*this.getVirtualSideLength();}else{return{x:x*this.getVirtualSideLength()+this.getVirtualLeft(),y:y*this.getVirtualSideLength()+this.getVirtualTop()};}};R.prototype.setPanningRatio=function(p){this.setProperty("panningRatio",p,true);};R.prototype.updatePanningRatio=function(){var v=this.getVirtualLeft(),a=this.getVirtualTop(),r=this.getDomRef(),b=r.getBoundingClientRect(),h=b.height,w=b.width,p;if(v===0&&(h<w&&a<0||(h>w&&a>0))){p=h/w;}else{p=1;}this.setPanningRatio(p);return this;};return R;});
