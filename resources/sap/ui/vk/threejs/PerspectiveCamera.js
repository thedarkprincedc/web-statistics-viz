/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)

        (c) Copyright 2009-2015 SAP SE. All rights reserved
    
 */
sap.ui.define(["jquery.sap.global","../PerspectiveCamera","./thirdparty/three"],function(q,P,t){"use strict";var T=P.extend("sap.ui.vk.threejs.PerspectiveCamera",{metadata:{publicMethods:["update"],properties:{}}});var b=P.getMetadata().getParent().getClass().prototype;T.prototype.init=function(){if(b.init){b.init.call(this);}var n=1;var f=10000;this._nativeCamera=new THREE.PerspectiveCamera(30,1,n,f);this._nativeCamera.position.set(0,0,100);this.setUsingDefaultClipPlanes(true);};T.prototype.update=function(w,h){this._nativeCamera.aspect=w/h;this._nativeCamera.updateProjectionMatrix();};T.prototype.exit=function(){if(b.exit){b.exit.call(this);}this._nativeCamera=null;};T.prototype.getFov=function(){return this._nativeCamera.fov;};T.prototype.setFov=function(v){this._nativeCamera.fov=v;return this;};T.prototype.getCameraRef=function(){return this._nativeCamera;};T.prototype.setCameraRef=function(c){this._nativeCamera=c;return this;};T.prototype.getNearClipPlane=function(){return this._nativeCamera.near;};T.prototype.setNearClipPlane=function(v){this._nativeCamera.near=v;this.setUsingDefaultClipPlanes(false);return this;};T.prototype.getFarClipPlane=function(){return this._nativeCamera.far;};T.prototype.setFarClipPlane=function(v){this._nativeCamera.far=v;this.setUsingDefaultClipPlanes(false);return this;};T.prototype.getPosition=function(){return this._nativeCamera.position.toArray();};T.prototype.setPosition=function(v){this._nativeCamera.position.fromArray(v);return this;};T.prototype.getUpDirection=function(){return this._nativeCamera.up.toArray();};T.prototype.setUpDirection=function(v){this._nativeCamera.up.fromArray(v);return this;};T.prototype.getTargetDirection=function(){return this._nativeCamera.getWorldDirection().toArray();};T.prototype.setTargetDirection=function(v){var a=new THREE.Vector3().fromArray(v);a.add(this._nativeCamera.position);this._nativeCamera.lookAt(a);return this;};T.prototype.setUsingDefaultClipPlanes=function(v){this._nativeCamera.userData.usingDefaultClipPlanes=v;return this;};T.prototype.getUsingDefaultClipPlanes=function(){return this._nativeCamera.userData.usingDefaultClipPlanes;};T.prototype.adjustClipPlanes=function(a){var c=this._nativeCamera;c.updateMatrixWorld();c.matrixWorldInverse.getInverse(c.matrixWorld);a=a.clone().applyMatrix4(c.matrixWorldInverse);c.near=-a.max.z;c.far=-a.min.z;var e=Math.max((c.far-c.near)*0.0025,0.001);c.far=Math.max(c.far,0.1);e=Math.max(e,c.far*0.0025);c.near-=e;c.far+=e;c.near=Math.max(c.near,c.far*0.0025);c.updateProjectionMatrix();return this;};return P;});
