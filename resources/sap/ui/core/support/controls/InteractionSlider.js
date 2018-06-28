/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2017 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/base/ManagedObject','jquery.sap.keycodes'],function(q,M){'use strict';var I=M.extend("sap.ui.core.support.controls.InteractionSlider",{constructor:function(){this.SIDE_LIST_WIDTH=0;this.LEFT_HANDLE_ID='left';this.RIGHT_HANDLE_ID='right';this.HANDLE_BORDER_SIZE=0;this.HANDLES_WIDTH=3;this.selectedInterval={start:0,end:0,duration:0};this.nodes={slider:null,handle:null,leftResizeHandle:null,rightResizeHandle:null};this.sizes={width:0,handleWidth:0,handleMinWidth:10};this.drag={handleClickOffsetX:0,handleOffsetLeft:0,isResize:false,whichResizeHandle:''};this.fRefs={mousedown:undefined,mousemove:undefined,mouseup:undefined,dragstart:undefined};}});I.prototype.render=function(r){r.write("<div id='interactionSlider'>"+"<div id='interactionSlideHandle'>"+"<span id='interactionLeftHandle'></span>"+"<span id='interactionRightHandle'></span>"+"</div>"+"</div>");r.write("<div id='interactionSliderBottom'>"+"<div id='interactionSlideHandleBottom'>"+"<span id='interactionLeftHandleBottom'></span>"+"<span id='interactionRightHandleBottom'></span>"+"</div>"+"</div>");};I.prototype.initialize=function(){this._registerEventListeners();this._initSlider();};I.prototype.setDuration=function(m){if(!m||!m.length){return;}this.selectedInterval.duration=m[m.length-1].end-m[0].start;};I.prototype._registerEventListeners=function(){var t=this;window.addEventListener('resize',function(){t._calculateSliderSize();},false);window.addEventListener('keydown',this._onArrowMove.bind(this));window.addEventListener('keyup',this._onArrowUp.bind(this));q("#interactionSlideHandle").on('dblclick',this._initSlider.bind(this));q("#interactionSlider").on('wheel',this._onMouseWheel.bind(this));q("#interactionSlideHandleBottom").on('dblclick',this._initSlider.bind(this));q("#interactionSliderBottom").on('wheel',this._onMouseWheel.bind(this));};I.prototype._initSlider=function(){this.nodes.slider=this.nodes.slider||document.querySelector('#interactionSlider');this.nodes.sliderBottom=this.nodes.sliderBottom||document.querySelector('#interactionSliderBottom');this.nodes.handle=this.nodes.handle||document.querySelector('#interactionSlideHandle');this.nodes.handleBottom=this.nodes.handleBottom||document.querySelector('#interactionSlideHandleBottom');this.nodes.leftResizeHandle=this.nodes.leftResizeHandle||document.querySelector('#interactionLeftHandle');this.nodes.leftResizeHandleBottom=this.nodes.leftResizeHandleBottom||document.querySelector('#interactionLeftHandleBottom');this.nodes.rightResizeHandle=this.nodes.rightResizeHandle||document.querySelector('#interactionRightHandle');this.nodes.rightResizeHandleBottom=this.nodes.rightResizeHandleBottom||document.querySelector('#interactionRightHandleBottom');this.nodes.handle.style.left=0;this.nodes.handleBottom.style.left=this.nodes.handle.style.left;this.nodes.handle.style.width='100%';this.nodes.handleBottom.style.width=this.nodes.handle.style.width;this._calculateSliderSize();if(!this.fRefs.mousedown){this.fRefs.mousedown=this._onMouseDown.bind(this);this.nodes.slider.addEventListener('mousedown',this.fRefs.mousedown);this.nodes.sliderBottom.addEventListener('mousedown',this.fRefs.mousedown);}else{this._fireSelectEvent();}};I.prototype._calculateSliderSize=function(){var o=this.sizes.width;this.sizes.handleWidth=parseInt(this._getSlideHandleWidth(),10);this.sizes.width=this.nodes.slider.offsetWidth;if(this.sizes.width!==this.sizes.handleWidth){this._resizeSliderHandle(o);}this._updateUI();};I.prototype._resizeSliderHandle=function(o){var s=this.sizes.width-o;var u=this.sizes.width-this.drag.handleOffsetLeft;var n=this.sizes.handleWidth+s;this.sizes.handleWidth=Math.max(this.sizes.handleMinWidth,Math.min(n,u));this.nodes.handle.style.width=this.sizes.handleWidth+'px';this.nodes.handleBottom.style.width=this.nodes.handle.style.width;if(this.sizes.width<(this.drag.handleOffsetLeft+this.sizes.handleWidth)){this.drag.handleOffsetLeft=this.sizes.width-this.sizes.handleWidth;this.nodes.handle.style.left=this.drag.handleOffsetLeft+'px';this.nodes.handleBottom.style.left=this.nodes.handle.style.left;}};I.prototype._updateUI=function(){this.sizes.handleWidth=parseInt(this._getSlideHandleWidth(),10);this.drag.handleOffsetLeft=this.nodes.handle.offsetLeft;};I.prototype._getSlideHandleWidth=function(){var h;if(document.getElementById("interactionSlideHandle").currentStyle){h=document.getElementById("interactionSlideHandle").currentStyle.width;}else{h=window.getComputedStyle(this.nodes.handle).width;}return h;};I.prototype._onArrowMove=function(e){var o=0;var S=5;if(e.keyCode!=q.sap.KeyCodes.ARROW_LEFT&&e.keyCode!=q.sap.KeyCodes.ARROW_RIGHT){return;}else if(e.keyCode==q.sap.KeyCodes.ARROW_LEFT){o=-S;}else if(e.keyCode==q.sap.KeyCodes.ARROW_RIGHT){o=S;}var m=Math.min((this.drag.handleOffsetLeft+o),this.sizes.width-this.sizes.handleWidth);this.drag.handleOffsetLeft=Math.max(m,0);this.nodes.handle.style.left=this.drag.handleOffsetLeft+'px';this.nodes.handleBottom.style.left=this.nodes.handle.style.left;};I.prototype._onArrowUp=function(e){if(e.keyCode!=q.sap.KeyCodes.ARROW_LEFT&&e.keyCode!=q.sap.KeyCodes.ARROW_RIGHT){return;}this._fireSelectEvent();};I.prototype._onMouseDown=function(e){var t=e.target.id;var m=this.SIDE_LIST_WIDTH+(this.sizes.handleWidth/2);var l=Math.max(e.clientX-m,0);var r=this.sizes.width-this.sizes.handleWidth;var c=Math.min(l,r);if(t===this.nodes.slider.id||t===this.nodes.sliderBottom.id){this.nodes.handle.style.left=c+'px';this.nodes.handleBottom.style.left=this.nodes.handle.style.left;this.drag.handleOffsetLeft=this.nodes.handle.offsetLeft;this.drag.isResize=false;}else if(t===this.nodes.handle.id||t===this.nodes.handleBottom.id){this.drag.handleClickOffsetX=e.offsetX;this.drag.isResize=false;this._registerOnMouseMoveListener();}else if(t===this.nodes.leftResizeHandle.id||t===this.nodes.leftResizeHandleBottom.id){this.drag.whichResizeHandle=this.LEFT_HANDLE_ID;this.drag.isResize=true;this._registerOnMouseMoveListener();}else if(t===this.nodes.rightResizeHandle.id||t===this.nodes.rightResizeHandleBottom.id){this.drag.whichResizeHandle=this.RIGHT_HANDLE_ID;this.drag.isResize=true;this._registerOnMouseMoveListener();}else{return;}this._registerOnMouseUpListener();this._registerOnDragStartListener();};I.prototype._registerOnMouseMoveListener=function(){this.fRefs.mousemove=this._onMouseMove.bind(this);window.addEventListener('mousemove',this.fRefs.mousemove);};I.prototype._registerOnMouseUpListener=function(){this.fRefs.mouseup=this._onMouseUp.bind(this);window.addEventListener('mouseup',this.fRefs.mouseup);};I.prototype._registerOnDragStartListener=function(){this.fRefs.dragstart=this._onDragStart.bind(this);window.addEventListener('dragstart',this.fRefs.dragstart);};I.prototype._onMouseMove=function(e){e.stopImmediatePropagation();var c;var d=e.clientX-this.SIDE_LIST_WIDTH;if(this.drag.isResize){this._handleResize(e);return;}var r=this.sizes.width-this.sizes.handleWidth+this.drag.handleClickOffsetX;c=Math.max(Math.min(d,r),this.drag.handleClickOffsetX);this.nodes.handle.style.left=c-this.drag.handleClickOffsetX+'px';this.nodes.handleBottom.style.left=this.nodes.handle.style.left;};I.prototype._onMouseWheel=function(e){e.preventDefault();this._handleMouseWheelResize(e);};I.prototype._handleResize=function(e){e.stopImmediatePropagation();var m;var a;var n;var r;var b;var l;var c=e.clientX-this.SIDE_LIST_WIDTH;var D=3;if(this.drag.whichResizeHandle===this.RIGHT_HANDLE_ID){r=c-this.drag.handleOffsetLeft+D;m=Math.max(r,this.sizes.handleMinWidth);a=this.sizes.width-this.drag.handleOffsetLeft;n=Math.min(m,a);this.nodes.handle.style.width=n+'px';this.nodes.handleBottom.style.width=this.nodes.handle.style.width;}if(this.drag.whichResizeHandle===this.LEFT_HANDLE_ID){m=this.drag.handleOffsetLeft+this.sizes.handleWidth-this.sizes.handleMinWidth;c=Math.max(Math.min(c,m),0);a=this.drag.handleOffsetLeft+this.sizes.handleWidth;b=Math.min(c,this.sizes.width);l=Math.max(Math.max(b,-2*this.sizes.handleMinWidth),D);n=a-l+D;if(n<=D+this.sizes.handleMinWidth){n-=D;l+=D;}this.nodes.handle.style.left=(l-D)+'px';this.nodes.handleBottom.style.left=this.nodes.handle.style.left;this.nodes.handle.style.width=n+'px';this.nodes.handleBottom.style.width=this.nodes.handle.style.width;}};I.prototype._handleMouseWheelResize=function(e){var s=40;if(e.originalEvent.deltaY&&e.originalEvent.deltaY>=0){this._calculateHandlerSizePositionOnMouseWheelDown(s);}else{this._calculateHandlerSizePositionOnMouseWheelUp(s);}this._updateUI();this._fireSelectEvent();};I.prototype._calculateHandlerSizePositionOnMouseWheelDown=function(s){var n;var a;var r=this.sizes.width-this.drag.handleOffsetLeft;var w=Math.min((r-this.sizes.handleWidth),s);var b=(this.drag.handleOffsetLeft+this.sizes.handleWidth===this.sizes.width);if((w<s)&&!b){a=this.sizes.handleWidth+w;n=this.nodes.handle.offsetLeft;}else if(b){var l=Math.min(this.sizes.width-this.sizes.handleWidth,s);a=this.sizes.handleWidth+l;n=Math.max(0,this.nodes.handle.offsetLeft-l);}else{a=this.sizes.handleWidth+s;n=Math.max(0,this.nodes.handle.offsetLeft-(s/2));}this.nodes.handle.style.left=n+'px';this.nodes.handleBottom.style.left=this.nodes.handle.style.left;this.nodes.handle.style.width=a+'px';this.nodes.handleBottom.style.width=this.nodes.handle.style.width;};I.prototype._calculateHandlerSizePositionOnMouseWheelUp=function(s){if(this.sizes.handleWidth-s>this.sizes.handleMinWidth){this.nodes.handle.style.left=(this.nodes.handle.offsetLeft+(s/2))+'px';this.nodes.handleBottom.style.left=(this.nodes.handleBottom.offsetLeft+(s/2))+'px';this.nodes.handle.style.width=(this.sizes.handleWidth-s)+'px';this.nodes.handleBottom.style.width=this.nodes.handle.style.width;}};I.prototype._onMouseUp=function(e){e.stopImmediatePropagation();window.removeEventListener('mousemove',this.fRefs.mousemove);window.removeEventListener('mouseup',this.fRefs.mouseup);window.removeEventListener('dragstart',this.fRefs.dragstart);this._updateUI();this._fireSelectEvent();};I.prototype._onDragStart=function(e){e.preventDefault();};I.prototype._fireSelectEvent=function(){var o=this.selectedInterval.start;var a=this.selectedInterval.end;this._calculateStartEndPeriod();if(o===this.selectedInterval.start&&a==this.selectedInterval.end){return;}q("#interactionSlider").trigger("InteractionSliderChange",[this.selectedInterval.start,this.selectedInterval.end]);};I.prototype._calculateStartEndPeriod=function(){var s=this.nodes.slider.offsetWidth;var l=this.nodes.leftResizeHandle.getBoundingClientRect().left-this.nodes.slider.getBoundingClientRect().left-this.HANDLE_BORDER_SIZE;var r=this.nodes.rightResizeHandle.getBoundingClientRect().left-this.nodes.slider.getBoundingClientRect().left+this.HANDLE_BORDER_SIZE+this.HANDLES_WIDTH;var a=l/s;var b=r/s,t=this,c=function(h,d){var g=function(h){return""+Math.round(h*t.selectedInterval.duration/10)/100+"s";};var T=g(h);q("#"+d).attr('title',T);q("#"+d+"Bottom").attr('title',T);};if(a!=this.selectedInterval.start){c(a,'interactionLeftHandle');}if(b!=this.selectedInterval.end){c(b,'interactionRightHandle');}this.selectedInterval.start=a;this.selectedInterval.end=b;};return I;});
