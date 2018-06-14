/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2017 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','../base/EventProvider','./Popup','./Core','./BusyIndicatorUtils','sap/ui/core/library'],function(q,E,P,C,B,l){"use strict";var a=l.BusyIndicatorSize;var b=q.extend(new E(),{oPopup:null,oDomRef:null,bOpenRequested:false,iDEFAULT_DELAY_MS:1000,sDOM_ID:"sapUiBusyIndicator"});b.M_EVENTS={Open:"Open",Close:"Close"};b._bShowIsDelayed=undefined;b._init=function(){var r=document.createElement("div");r.id=this.sDOM_ID;var o=document.createElement("div");this._oResBundle=sap.ui.getCore().getLibraryResourceBundle("sap.ui.core");var t=this._oResBundle.getText("BUSY_TEXT");delete this._oResBundle;o.className="sapUiBusy";o.setAttribute("tabindex","0");o.setAttribute("role","progressbar");o.setAttribute("alt","");o.setAttribute("title",t);r.appendChild(o);var c=B.getElement(a.Large);c.setAttribute("title",t);r.appendChild(c);var i=sap.ui.getCore().getStaticAreaRef();i.appendChild(r);this.oDomRef=r;this.oPopup=new P(r);this.oPopup.setModal(true,"sapUiBlyBusy");this.oPopup.setShadow(false);this.oPopup.attachOpened(function(e){this._onOpen(e);},this);};b._onOpen=function(e){var d=q.sap.domById(b.sDOM_ID);d.style.height="100%";d.style.width="100%";var A=d.querySelector(".sapUiLocalBusyIndicator");A.className+=" sapUiLocalBusyIndicatorFade";q.sap.focus(d);q("body").attr("aria-busy",true);this.fireOpen({$Busy:this.oPopup._$()});};b.show=function(d){q.sap.log.debug("sap.ui.core.BusyIndicator.show (delay: "+d+") at "+new Date().getTime());if(!document.body||!sap.ui.getCore().isInitialized()){if(b._bShowIsDelayed===undefined){sap.ui.getCore().attachInit(function(){if(b._bShowIsDelayed){b.show(d);}});}b._bShowIsDelayed=true;return;}if((d===undefined)||((d!=0)&&(parseInt(d,10)==0))||(parseInt(d,10)<0)){d=this.iDEFAULT_DELAY_MS;}if(q.sap.fesr.getActive()){this._fDelayedStartTime=q.sap.now()+d;}if(!this.oDomRef){this._init();}this.bOpenRequested=true;if(d===0){this._showNowIfRequested();}else{q.sap.delayedCall(d,this,"_showNowIfRequested");}};b._showNowIfRequested=function(){q.sap.log.debug("sap.ui.core.BusyIndicator._showNowIfRequested (bOpenRequested: "+this.bOpenRequested+") at "+new Date().getTime());if(!this.bOpenRequested){return;}var o=(window.scrollX===undefined?window.pageXOffset:window.scrollX);var O=(window.scrollY===undefined?window.pageYOffset:window.scrollY);var s=o+" "+O;this.bOpenRequested=false;this.oPopup.open(0,P.Dock.LeftTop,P.Dock.LeftTop,document,s);};b.hide=function(){q.sap.log.debug("sap.ui.core.BusyIndicator.hide at "+new Date().getTime());if(this._fDelayedStartTime){var f=q.sap.now()-this._fDelayedStartTime;q.sap.fesr.addBusyDuration((f>0)?f:0);delete this._fDelayedStartTime;}var c=b;if(b._bShowIsDelayed===true){b._bShowIsDelayed=false;}c.bOpenRequested=false;if(c.oDomRef){q("body").removeAttr("aria-busy");var A=c.oDomRef.querySelector(".sapUiLocalBusyIndicator");q(A).removeClass("sapUiLocalBusyIndicatorFade");this.fireClose({$Busy:this.oPopup._$()});c.oPopup.close(0);}};b.attachOpen=function(f,L){this.attachEvent(b.M_EVENTS.Open,f,L);return this;};b.detachOpen=function(f,L){this.detachEvent(b.M_EVENTS.Open,f,L);return this;};b.attachClose=function(f,L){this.attachEvent(b.M_EVENTS.Close,f,L);return this;};b.detachClose=function(f,L){this.detachEvent(b.M_EVENTS.Close,f,L);return this;};b.fireOpen=function(p){this.fireEvent(b.M_EVENTS.Open,p);};b.fireClose=function(p){this.fireEvent(b.M_EVENTS.Close,p);};return b;},true);
