/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)

        (c) Copyright 2009-2015 SAP SE. All rights reserved
    
 */
sap.ui.define(["jquery.sap.global","./library","./Gizmo","sap/ui/unified/Menu","sap/ui/unified/MenuItem"],function(q,l,G,M,a){"use strict";sap.ui.require("sap.m.Menu");var S=G.extend("sap.ui.vk.tools.SceneOrientationToolGizmo",{metadata:{library:"sap.ui.vk.tools"}});function c(d,b){var e=64,f=0.5,g=15,h=3,i=30;d.multiplyScalar(1/80);var j=new THREE.Vector3(d.y,d.z,d.x),k=new THREE.Vector3(d.z,d.x,d.y);var n=new THREE.MeshBasicMaterial({color:b}),o=new THREE.MeshBasicMaterial({color:0xFFFFFF});var p=new THREE.CylinderBufferGeometry(f,f,e-g,4);var m=new THREE.Matrix4().makeBasis(j,d,k).setPosition(d.clone().multiplyScalar((e-g)*0.5));p.applyMatrix(m);var r=new THREE.Mesh(p,n);var s=new THREE.CylinderBufferGeometry(0,h,g,12,1);m.setPosition(d.clone().multiplyScalar(e-g*0.5));s.applyMatrix(m);r.add(new THREE.Mesh(s,n));var t=new THREE.CylinderBufferGeometry(f,f,i,4);m.makeBasis(d,k,j).setPosition(k.clone().multiplyScalar(0.5).add(d).multiplyScalar(i));t.applyMatrix(m);r.add(new THREE.Mesh(t,o));t=new THREE.CylinderBufferGeometry(f,f,i,4);m.setPosition(k.clone().multiplyScalar(0.5).add(d).add(j).multiplyScalar(i));t.applyMatrix(m);r.add(new THREE.Mesh(t,o));t=new THREE.CylinderBufferGeometry(f,f,i,4);m.makeBasis(k,j,d).setPosition(j.clone().multiplyScalar(0.5).add(d).multiplyScalar(i));t.applyMatrix(m);r.add(new THREE.Mesh(t,o));return r;}S.prototype.init=function(){if(G.prototype.init){G.prototype.init.apply(this);}this._viewport=null;this._renderer=new THREE.WebGLRenderer({antialias:true,alpha:true});this._renderer.setPixelRatio(window.devicePixelRatio);this._renderer.setSize(1,1);this._camera=new THREE.OrthographicCamera(-1,1,1,-1,0.1,100);this._scene=new THREE.Scene();this._scene.add(c(new THREE.Vector3(1,0,0),0xFF0000));this._scene.add(c(new THREE.Vector3(0,1,0),0x00FF00));this._scene.add(c(new THREE.Vector3(0,0,1),0x0000FF));this._scene.traverse(function(e){e.matrixAutoUpdate=false;});this._axisTitles=this._createAxisTitles(32,16);this._scene.add(this._axisTitles);var t=1000;var b=this;var m=new M();this._button=new sap.m.Button({icon:"sap-icon://arrow-down",tooltip:sap.ui.vk.getResourceBundle().getText("PREDEFINED_VIEW_MENUBUTTONTOOLTIP"),press:function(e){var f=sap.ui.core.Popup.Dock;m.open(false,this.getFocusDomRef(),f.RightTop,f.RightBottom,this.getDomRef());}}).addStyleClass("sapUiVizKitSceneOrientationGizmoButton");function o(e){this._activeButton();e.stopPropagation();}function d(e){this._inactiveButton();e.stopPropagation();this.firePress({});}if((sap.ui.Device.browser.edge||sap.ui.Device.browser.msie)&&sap.ui.Device.support.pointer){this._button.attachBrowserEvent("pointerdown",o);this._button.attachBrowserEvent("pointerup",d);}else if(sap.ui.Device.support.touch){this._button.attachBrowserEvent("touchstart",o);this._button.attachBrowserEvent("touchend",d);}else{this._button.attachBrowserEvent("mousedown",o);this._button.attachBrowserEvent("mouseup",d);}this._button.attachBrowserEvent("mouseout",function(){this._inactiveButton();});m.addItem(new a({text:sap.ui.vk.getResourceBundle().getText("PREDEFINED_VIEW_HOME")}).attachSelect(function(){b.setView(sap.ui.vk.tools.PredefinedView.Home,t);}));m.addItem(new a({text:sap.ui.vk.getResourceBundle().getText("PREDEFINED_VIEW_FRONT"),startsSection:true}).attachSelect(function(){b.setView(sap.ui.vk.tools.PredefinedView.Front,t);}));m.addItem(new a({text:sap.ui.vk.getResourceBundle().getText("PREDEFINED_VIEW_BACK")}).attachSelect(function(){b.setView(sap.ui.vk.tools.PredefinedView.Back,t);}));m.addItem(new a({text:sap.ui.vk.getResourceBundle().getText("PREDEFINED_VIEW_LEFT")}).attachSelect(function(){b.setView(sap.ui.vk.tools.PredefinedView.Left,t);}));m.addItem(new a({text:sap.ui.vk.getResourceBundle().getText("PREDEFINED_VIEW_RIGHT")}).attachSelect(function(){b.setView(sap.ui.vk.tools.PredefinedView.Right,t);}));m.addItem(new a({text:sap.ui.vk.getResourceBundle().getText("PREDEFINED_VIEW_TOP")}).attachSelect(function(){b.setView(sap.ui.vk.tools.PredefinedView.Top,t);}));m.addItem(new a({text:sap.ui.vk.getResourceBundle().getText("PREDEFINED_VIEW_BOTTOM")}).attachSelect(function(){b.setView(sap.ui.vk.tools.PredefinedView.Bottom,t);}));};S.prototype.setView=function(v,m){var b;switch(v){case sap.ui.vk.tools.PredefinedView.Home:b=null;break;case sap.ui.vk.tools.PredefinedView.Front:b=new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0,1,0),0);break;case sap.ui.vk.tools.PredefinedView.Back:b=new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0,1,0),Math.PI);break;case sap.ui.vk.tools.PredefinedView.Left:b=new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0,1,0),-Math.PI/2);break;case sap.ui.vk.tools.PredefinedView.Right:b=new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0,1,0),Math.PI/2);break;case sap.ui.vk.tools.PredefinedView.Top:b=new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1,0,0),-Math.PI/2);break;case sap.ui.vk.tools.PredefinedView.Bottom:b=new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1,0,0),Math.PI/2);break;default:return this;}this._viewport._viewportGestureHandler.setView(b,m||0);return this;};S.prototype.render=function(v){this._viewport=v;this._camera.quaternion.copy(v.getCamera().getCameraRef().quaternion);this._camera.position.set(0,0,1).applyQuaternion(this._camera.quaternion);var w=this._renderer.getSize().width;this._updateAxisTitles(this._axisTitles,this._scene,this._camera,w*0.45,2/w);this._renderer.render(this._scene,this._camera);};S.prototype.onBeforeRendering=function(){};S.prototype.onAfterRendering=function(){var d=this.getDomRef();this._renderer.setSize(d.clientWidth,d.clientHeight);d.appendChild(this._renderer.domElement);};return S;},true);
