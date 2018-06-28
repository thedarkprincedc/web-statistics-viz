/*!
 * SAP APF Analysis Path Framework
 *
 * (c) Copyright 2012-2014 SAP SE. All rights reserved
 */
jQuery.sap.declare('sap.apf.utils.hashtable');(function(){'use strict';sap.apf.utils.Hashtable=function(m){var n=0;var i={};var o=[];this.type="hashTable";this.setItem=function(k,v){var p;m.check((k!==undefined&&k!==null),"sap.apf.utils.HashTable.setItem: key undefined");m.check((v!==undefined&&v!==null),"sap.apf.utils.HashTable.setItem: value undefined");if(this.hasItem(k)){p=i[k];}else{n++;o.push(k);}i[k]=v;return p;};this.getNumberOfItems=function(){return n;};this.getItem=function(k){m.check((k!==undefined&&k!==null),"sap.apf.utils.HashTable.getItem key undefined");return this.hasItem(k)?i[k]:undefined;};this.hasItem=function(k){m.check((k!==undefined&&k!==null),"sap.apf.utils.HashTable.hasItem key undefined");return i.hasOwnProperty(k);};this.removeItem=function(k){m.check((k!==undefined&&k!==null),"sap.apf.utils.HashTable.removeItem key undefined");var I;if(this.hasItem(k)){I=i[k];n--;o.splice(o.indexOf(k),1);delete i[k];return I;}return undefined;};this.getKeys=function(){var K=[];var k;for(k in i){if(this.hasItem(k)){K.push(k);}}return K;};this.each=function(f){var k;for(k in i){if(this.hasItem(k)){f(k,i[k]);}}};this.forEachOrdered=function(f){var t=this;o.forEach(function(k){if(!t.hasItem(k)){m.check(false,"sap.apf.utils.HashTable.forEachOrdered: key not contained");}else{f(k,i[k]);}});};this.getKeysOrdered=function(){var l=[];this.forEachOrdered(function(k){l.push(k);});return l;};this.moveUpOrDown=function(a,d){m.check((a!==undefined&&a!==null),"sap.apf.utils.HashTable.moveItemUpOrDown movedKey undefined");var b=o.indexOf(a);var c=b+d;if(b<0){return null;}if(d<0){o.splice(b,1);if(c<0){o.splice(0,0,a);return 0;}o.splice(b+d,0,a);return b+d;}else if(d===0){return b;}else if(d>0){o.splice(b,1);if(c>=o.length){o.splice(o.length,0,a);return o.length;}o.splice(c,0,a);return c;}};this.moveBefore=function(b,a){if(o.indexOf(b)<0||o.indexOf(a)<0){return null;}if(b===a){return o.indexOf(a);}o.splice(o.indexOf(a),1);o.splice(o.indexOf(b),0,a);return o.indexOf(a);};this.moveToEnd=function(a){if(o.indexOf(a)<0){return null;}o.splice(o.indexOf(a),1);o.push(a);return o.indexOf(a);};this.reset=function(){i={};o=[];n=0;};};}());
