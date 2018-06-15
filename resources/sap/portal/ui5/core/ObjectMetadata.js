"use strict";jQuery.sap.require('sap.ui.base.ManagedObjectMetadata');jQuery.sap.require('sap.portal.ui5.core.PropertyObserver');jQuery.sap.declare('sap.portal.ui5.core.ObjectMetadata');
sap.portal.ui5.core.ObjectMetadata=function ObjectMetadata(c,C){sap.ui.base.ManagedObjectMetadata.apply(this,arguments);};
sap.portal.ui5.core.ObjectMetadata.prototype=jQuery.sap.newObject(sap.ui.base.ManagedObjectMetadata.prototype);
sap.portal.ui5.core.ObjectMetadata.prototype.extend=function extend(c){this._processPropertyObservers(c);this.extendWithMixins(c);return sap.ui.base.ManagedObjectMetadata.prototype.extend.call(this,c);};
sap.portal.ui5.core.ObjectMetadata.prototype.extendWithMixins=function extendWithMixins(c){var b=this.getClass().prototype,p=this.getParentClassPrototype(c);if(!p||!b){throw new Error();}var P,i,l,m={};for(P in c){if(c.hasOwnProperty(P)){m[P]=[c[P]];}}var n=c.metadata.mixins,M=(this.getParent()instanceof sap.portal.ui5.core.ObjectMetadata)?this.getParent().getMixins():[];if(n){var s,o,a;for(i=n.length-1;i>-1;i--){s=n[i];if(M.indexOf(s)!==-1){continue;}jQuery.sap.require(s);o=jQuery.sap.getObject(s);if(typeof(o)==='function'){o=o.prototype;}for(a in o){if(o.hasOwnProperty(a)){if(m[a]){m[a].splice(m[a].length-1,0,o[a]);}else{m[a]=[o[a]];}}}}}var d,e;for(P in m){if(m.hasOwnProperty(P)){e=m[P];if(typeof(p[P])!=='undefined'){e.unshift(p[P]);}switch(typeof(e[e.length-1])){case'function':if(P!=='constructor'){d=e[0];for(i=1,l=e.length;i<l;i++){if(typeof(d)==='function'&&typeof(e[i])==='function'){d=this.factorySuperMethodWrapper(d,e[i]);}else{d=e[i];}}e=d;}break;default:e=e[e.length-1];break;}if(c[P]!==e){c[P]=e;}}}};
sap.portal.ui5.core.ObjectMetadata.prototype.factorySuperMethodWrapper=function factorySuperMethodWrapper(s,o){var O=function overloadedMethod(){var f=this._super;this._super=function shiftSuper(){this._super=f;if(typeof(this._super)==='undefined'){delete this._super;}return s.apply(this,arguments);};var r=o.apply(this,arguments);this._super=f;if(typeof(this._super)==='undefined'){delete this._super;}return r;};return O;};
sap.portal.ui5.core.ObjectMetadata.prototype._processPropertyObservers=function processPropertyObservers(c){this._mPropertyObservers={};this._mMixins=c.metadata.mixins||[];var b=this.getClass().prototype,p=this.getParentClassPrototype(c);if(!p||!b){throw new Error();}var P,o;for(P in c){if(c[P]instanceof sap.portal.ui5.core.PropertyObserver){o=c[P];this._mPropertyObservers[P]=o;b[P]=c[P]=o.getCallback();o.setCallback(P);}}};
sap.portal.ui5.core.ObjectMetadata.prototype.getPropertyObserver=function getPropertyObserver(k){return this._mPropertyObservers[k];};
sap.portal.ui5.core.ObjectMetadata.prototype.getPropertyObservers=function getPropertyObservers(){if(this.getParent()instanceof sap.portal.ui5.core.ObjectMetadata){return jQuery.extend({},this.getParent().getPropertyObservers(),this._mPropertyObservers);}else{return this._mPropertyObservers;}};
sap.portal.ui5.core.ObjectMetadata.prototype.getParentClassPrototype=function getParentPrototype(c){var p=c.metadata.baseType+'.prototype';return jQuery.sap.getObject(p);};
sap.portal.ui5.core.ObjectMetadata.prototype.getMixins=function getMixins(){if(this.getParent()instanceof sap.portal.ui5.core.ObjectMetadata){return this._mMixins.concat(this.getParent().getMixins());}else{return jQuery.unique(this._mMixins);}};