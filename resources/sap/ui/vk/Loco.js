/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)

        (c) Copyright 2009-2015 SAP SE. All rights reserved
    
 */
sap.ui.define(["jquery.sap.global","sap/ui/base/EventProvider","./InputDevicePointer","./InputDeviceMouse","./InputDeviceTouch","./InputDeviceKeyboard"],function(q,E,I,a,b,c){"use strict";var L=E.extend("sap.ui.vk.Loco",{metadata:{publicMethods:["addHandler","removeHandler","beginGesture","move","endGesture","contextMenu"]},constructor:function(){if(L._instance){return L._instance;}E.apply(this);this._handlers=[];this._handlerMap=[];this._gesture=[];this._touchOrigin={x:0,y:0,z:0};this._touchMoved=false;this._touchButton=0;this._touchStart=0;this._touchEnd=0;this._clickTimer=0;this._isDoubleClick=false;L._instance=this;}});L.prototype.destroy=function(){this._gesture=[];this._handlers=[];};L.prototype.addHandler=function(h){if(this._handlers.indexOf(h)>=0){return;}this._handlers.push(h);var v=h.getViewport();var d=this._handlerMap[v];if(d==null){this._handlerMap[v]=[];d=this._handlerMap[v];d.push(h);}else if(d.indexOf(h)==-1){d.push(h);}var p=new I(this);if(p.isSupported()){p.enable(v);v._pointer=p;}else{var m=new a(this);if(m.isSupported()){m.enable(v);v._mouse=m;}var t=new b(this);if(t.isSupported()){t.enable(v);v._touch=t;}}v._keyboard=new c(this);v._keyboard.enable(v);};L.prototype.removeHandler=function(d){var v=d.getViewport();var h=this._handlers;var e=this._handlerMap[v];var f;if(e!=null){f=e.indexOf(d);if(f>=0){e.splice(f,1);}}f=h.indexOf(d);if(f>=0){h.splice(f,1);if(v._pointer){v._pointer.disable();v._pointer=null;}if(v._touch){v._touch.disable();v._touch=null;}if(v._mouse){v._mouse.disable();v._mouse=null;}if(v._keyboard){v._keyboard.disable();v._keyboard=null;}}};L.prototype._processClick=function(d,v){this._clickTimer=0;var e={x:0,y:0,z:0,d:0,n:0,buttons:0,scrolls:[],points:[],handled:false};e.x=this._touchOrigin.x;e.y=this._touchOrigin.y;e.z=this._touchOrigin.z;e.buttons=this._touchButton;var h=this._handlerMap[v];if(h!=null){for(var i=h.length-1;i>=0;i--){if(d){var n=h[i].getViewport().getId();var p=/-nativeViewport$/.test(n)?n.replace(/-nativeViewport$/,""):null;var f=sap.ui.getCore().byId(p);if(!f||!f.getOverlay()||!(typeof f.getOverlay().mIACreateCB==="function")){h[i].doubleClick(e,v);}}else{h[i].click(e,v);}}}};L.prototype._processInput=function(e){var d=e.points;switch(e.n){case 0:e.x=0;e.y=0;e.z=0;e.d=0;break;case 2:var f=d[0].x-d[1].x,g=d[0].y-d[1].y,h=d[0].z-d[1].z;e.x=(d[0].x+d[1].x)/2;e.y=(d[0].y+d[1].y)/2;e.z=(d[0].z+d[1].z)/2;e.d=Math.sqrt(f*f+g*g+h*h);break;default:e.x=d[0].x;e.y=d[0].y;e.z=d[0].z;e.d=0;break;}return e;};L.prototype.beginGesture=function(e,v){if(this._gesture[v]){return;}if(this._clickTimer>0){clearTimeout(this._clickTimer);this._clickTimer=0;this._isDoubleClick=true;if(e.n==1&&e.buttons<=1&&this._touchButton<=1){this._processClick(true,v);}}this._processInput(e);var h=this._handlerMap[v];if(h!=null){for(var i=h.length-1;i>=0;i--){h[i].beginGesture(e);if(e.handled){break;}}}var n=new Date();this._touchStart=n.getTime();this._touchMoved=false;this._gesture[v]=true;this._touchOrigin.x=e.x;this._touchOrigin.y=e.y;this._touchOrigin.z=e.z;this._touchButton=e.buttons;if(this._touchEnd!=0&&this._touchStart-this._touchEnd<50){this._touchMoved=true;}};L.prototype.move=function(e,v){this._processInput(e);var h=this._handlerMap[v];var i;if(this._gesture[v]){if(h!=null){for(i=h.length-1;i>=0;i--){h[i].move(e);if(e.handled){break;}}}var d=this._touchOrigin.x-e.x;var f=this._touchOrigin.y-e.y;var g=this._touchOrigin.z-e.z;if((d*d+f*f+g*g)>8){this._touchMoved=true;}}else if(h!=null){for(i=h.length-1;i>=0;i--){if(h[i].hover!=undefined){h[i].hover(e);if(e.handled){break;}}}}};L.prototype.endGesture=function(e,v){if(!this._gesture[v]){return;}this._processInput(e);var h=this._handlerMap[v];if(h!=null){for(var i=h.length-1;i>=0;i--){h[i].endGesture(e);if(e.handled){break;}}}var n=new Date();this._touchEnd=n.getTime();if(!this._touchMoved&&!this._isDoubleClick&&(this._touchEnd-this._touchStart)<2000){this._clickTimer=setTimeout(function(l){l._processClick(false,v);},200,this);}this._isDoubleClick=false;this._gesture[v]=false;};L.prototype.contextMenu=function(e,v){this._processInput(e);var h=this._handlerMap[v];if(h!=null){for(var i=h.length-1;i>=0;i--){h[i].contextMenu(e);if(e.handled){break;}}}};L.prototype.keyEventHandler=function(e,v){var h=this._handlerMap[v];if(h!==null&&h!==undefined){for(var i=h.length-1;i>=0;i--){if(h[i].keyEventHandler){h[i].keyEventHandler(e);}}}};return L;},true);
