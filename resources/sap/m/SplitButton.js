/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2017 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['./library','sap/ui/core/Control','./Button','sap/ui/core/EnabledPropagator','sap/ui/core/IconPool','sap/ui/core/library','sap/ui/Device','sap/ui/core/InvisibleText'],function(l,C,B,E,I,c,D,a){"use strict";var T=c.TextDirection;var b=l.ButtonType;var S=C.extend("sap.m.SplitButton",{metadata:{library:"sap.m",properties:{text:{type:"string",group:"Misc",defaultValue:null},type:{type:"sap.m.ButtonType",group:"Appearance",defaultValue:b.Default},width:{type:"sap.ui.core.CSSSize",group:"Misc",defaultValue:null},enabled:{type:"boolean",group:"Behavior",defaultValue:true},icon:{type:"sap.ui.core.URI",group:"Appearance",defaultValue:null},activeIcon:{type:"sap.ui.core.URI",group:"Misc",defaultValue:null},iconDensityAware:{type:"boolean",group:"Misc",defaultValue:true},textDirection:{type:"sap.ui.core.TextDirection",group:"Appearance",defaultValue:T.Inherit}},aggregations:{_textButton:{type:"sap.m.Button",multiple:false,visibility:"hidden"},_arrowButton:{type:"sap.m.Button",multiple:false,visibility:"hidden"}},associations:{ariaDescribedBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaDescribedBy"},ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"}},events:{press:{},arrowPress:{}}}});E.call(S.prototype);S.prototype.exit=function(){if(this._oInvisibleTooltipInfoLabel){this._oInvisibleTooltipInfoLabel.destroy();this._oInvisibleTooltipInfoLabel=null;}};S.prototype.onAfterRendering=function(){var $=this._getTextButton().$(),d=this._getArrowButton().$();$.attr("tabindex","-1");d.attr("tabindex","-1");$.removeAttr("title");d.removeAttr("title");$.removeAttr("aria-describedby");d.removeAttr("aria-describedby");};S.prototype._handleAction=function(i){if(i){this.fireArrowPress();}else{this.firePress();}};S.prototype.setArrowState=function(i){var A=this.getAggregation("_arrowButton");if(!A){return;}if(i){A.$().addClass('sapMSBActive');}else{A.$().removeClass('sapMSBActive');}};S.prototype._getTextButton=function(){var o=this.getAggregation("_textButton");if(!o){o=new B({width:'100%',icon:this.getIcon(),text:this.getText(),press:this._handleAction.bind(this,false)}).addStyleClass('sapMSBText');if(D.browser.msie){o.addStyleClass('sapMSBTextIE');}this.setAggregation("_textButton",o);}return o;};S.prototype._getArrowButton=function(){var o=this.getAggregation("_arrowButton");if(!o){o=new B({icon:"sap-icon://slim-arrow-down",press:this._handleAction.bind(this,true)}).addStyleClass("sapMSBArrow");this.setAggregation("_arrowButton",o);}return o;};S.prototype.setTooltip=function(t){var s;C.prototype.setTooltip.apply(this,arguments);s=this.getTooltip_AsString();this.getTooltipInfoLabel(s);return this;};S.prototype.setProperty=function(p,v,s){if(p==="type"&&(v===b.Up||v===b.Back||v===b.Unstyled)){return this;}var r=C.prototype.setProperty.apply(this,arguments);if(p==="activeIcon"||p==="iconDensityAware"||p==="textDirection"){B.prototype.setProperty.apply(this._getTextButton(),arguments);}else if(p==="text"||p==="type"||p==="icon"){var d="set"+_(p);B.prototype[d].call(this._getTextButton(),v);if(p==="type"){B.prototype[d].call(this._getArrowButton(),v);}}return r;};function _(t){return t.charAt(0).toUpperCase()+t.slice(1);}S.prototype.onsapenter=function(e){this._getTextButton().firePress();};S.prototype.onsapspace=function(e){this._getTextButton().firePress();};S.prototype.onsapup=function(e){this._getArrowButton().firePress();};S.prototype.onsapdown=function(e){this._getArrowButton().firePress();};S.prototype.onsapupmodifiers=function(e){this._getArrowButton().firePress();};S.prototype.onsapdownmodifiers=function(e){this._getArrowButton().firePress();};S.prototype.onsapshow=function(e){this._getArrowButton().firePress();e.preventDefault();};S.prototype.getSplitButtonAriaLabel=function(){var r,t;if(!S._oStaticSplitButtonAriaLabel){r=sap.ui.getCore().getLibraryResourceBundle("sap.m");t=r.getText("SPLIT_BUTTON_DESCRIPTION");S._oStaticSplitButtonAriaLabel=new a({text:t});S._oStaticSplitButtonAriaLabel.toStatic();}return S._oStaticSplitButtonAriaLabel;};S.prototype.getKeyboardDescriptionAriaLabel=function(){var r,t;if(!S._oStaticSplitButtonDescription){r=sap.ui.getCore().getLibraryResourceBundle("sap.m");t=r.getText("SPLIT_BUTTON_KEYBOARD_HINT");S._oStaticSplitButtonDescription=new a({text:t});S._oStaticSplitButtonDescription.toStatic();}return S._oStaticSplitButtonDescription;};S.prototype.getButtonTypeAriaLabel=function(){var t,s=this._getTextButton().getType();switch(s){case b.Accept:t=B._oStaticAcceptText;break;case b.Reject:t=B._oStaticRejectText;break;case b.Emphasized:t=B._oStaticEmphasizedText;break;}return t;};S.prototype.getTooltipInfoLabel=function(t){if(!this._oInvisibleTooltipInfoLabel){this._oInvisibleTooltipInfoLabel=new a();this._oInvisibleTooltipInfoLabel.toStatic();}this._oInvisibleTooltipInfoLabel.setText(t);return this._oInvisibleTooltipInfoLabel;};S.prototype.getTitleAttributeValue=function(){var t=this.getTooltip_AsString(),i=I.getIconInfo(this.getIcon()),r;if(t||(i&&i.text&&!this.getText())){r=t||i.text;}return r;};return S;});
