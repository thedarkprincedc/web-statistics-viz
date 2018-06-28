/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2017 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','./Control','sap/ui/model/control/ControlModel','sap/ui/base/EventProvider'],function(q,C,a,E){"use strict";var b={};b.mixInto=function(f,F,m){if(arguments.length==2&&typeof F==="object"){m=F;F="ComponentFactory";}function _(){var M=f.getMetadata();do{M=M.getParent();if(M&&M.getComponentFactoryClass){return M.getComponentFactoryClass();}}while(M);return c;}f[F]=(_()).subclass(m);f.getMetadata().getComponentFactoryClass=q.sap.getter(f[F]);if(!f.prototype._initCompositeSupport){f.prototype._initCompositeSupport=function(s){var o=new(this.getMetadata().getComponentFactoryClass())(this);if(s.componentFactory){o.customize(s.componentFactory);delete s.componentFactory;}this.getComponentFactory=q.sap.getter(o);};}if(!f.prototype._exitCompositeSupport){f.prototype._exitCompositeSupport=function(){this.getComponentFactory().destroy();delete this.getComponentFactory;};}};var c=E.extend("sap.ui.core.ComponentFactory",{constructor:function(o){E.apply(this);this.oComposite=o;return this;}});c.prototype.attachChange=function(f,o){this.getModel();this.attachEvent("change",f,o);return this;};c.prototype.detachChange=function(f,o){this.getModel();this.detachEvent("change",f,o);return this;};c.prototype.getModel=function(){if(!this.oModel){var t=this;this.oModel=new a(this.oComposite);this.oModel._onchange=function(e){t.fireEvent("change",e.getParameters&&e.getParameters());};}return this.oModel;};c.prototype.addFacadeComponent=function(e){this.getModel().add(e);};c.prototype.removeFacadeComponent=function(e){this.getModel().remove(e);};(function(){function _(o,m,D){q.each(m,function(n,f){if(n.indexOf("default")!=0){o[n]=f;}if(D&&n.indexOf("create")==0){o["defaultC"+n.substring(1)]=o[n];}});}function d(B){return function(m){var f=function(){B.apply(this,arguments);};f.prototype=Object.create(B.prototype);_(f.prototype,m,true);f.customize=function(m){_(f.prototype,m);return this;};f.subclass=d(f);return f;};}c.subclass=d(c);c.prototype.customize=function(m){_(this,m);if(this.oComposite&&this.oComposite._onComponentFactoryChanged){this.oComposite._onComponentFactoryChanged();}return this;};}());return b;},true);
