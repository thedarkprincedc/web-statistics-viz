/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2017 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Control","sap/ui/base/ManagedObject","sap/f/library","sap/f/DynamicPage","sap/f/DynamicPageTitle","sap/f/DynamicPageHeader","sap/m/OverflowToolbar","sap/m/ActionSheet","./SemanticTitle","./SemanticFooter","./SemanticShareMenu","./SemanticConfiguration"],function(C,M,l,D,a,b,O,A,S,c,d,e){"use strict";var f=l.DynamicPageTitleArea;var g=C.extend("sap.f.semantic.SemanticPage",{metadata:{library:"sap.f",properties:{headerExpanded:{type:"boolean",group:"Behavior",defaultValue:true},headerPinnable:{type:"boolean",group:"Behavior",defaultValue:true},preserveHeaderStateOnScroll:{type:"boolean",group:"Behavior",defaultValue:false},toggleHeaderOnTitleClick:{type:"boolean",group:"Behavior",defaultValue:true},showFooter:{type:"boolean",group:"Behavior",defaultValue:false},titlePrimaryArea:{type:"sap.f.DynamicPageTitleArea",group:"Appearance",defaultValue:f.Begin}},defaultAggregation:"content",aggregations:{titleHeading:{type:"sap.ui.core.Control",multiple:false,defaultValue:null},titleBreadcrumbs:{type:"sap.m.IBreadcrumbs",multiple:false,defaultValue:null},titleSnappedContent:{type:"sap.ui.core.Control",multiple:true},titleExpandedContent:{type:"sap.ui.core.Control",multiple:true},titleContent:{type:"sap.ui.core.Control",multiple:true},titleMainAction:{type:"sap.f.semantic.TitleMainAction",multiple:false},editAction:{type:"sap.f.semantic.EditAction",multiple:false},deleteAction:{type:"sap.f.semantic.DeleteAction",multiple:false},copyAction:{type:"sap.f.semantic.CopyAction",multiple:false},addAction:{type:"sap.f.semantic.AddAction",multiple:false},flagAction:{type:"sap.f.semantic.FlagAction",multiple:false},favoriteAction:{type:"sap.f.semantic.FavoriteAction",multiple:false},fullScreenAction:{type:"sap.f.semantic.FullScreenAction",multiple:false},exitFullScreenAction:{type:"sap.f.semantic.ExitFullScreenAction",multiple:false},closeAction:{type:"sap.f.semantic.CloseAction",multiple:false},titleCustomTextActions:{type:"sap.m.Button",multiple:true},titleCustomIconActions:{type:"sap.m.OverflowToolbarButton",multiple:true},headerContent:{type:"sap.ui.core.Control",multiple:true},content:{type:"sap.ui.core.Control",multiple:false},footerMainAction:{type:"sap.f.semantic.FooterMainAction",multiple:false},messagesIndicator:{type:"sap.f.semantic.MessagesIndicator",multiple:false},draftIndicator:{type:"sap.m.DraftIndicator",multiple:false},positiveAction:{type:"sap.f.semantic.PositiveAction",multiple:false},negativeAction:{type:"sap.f.semantic.NegativeAction",multiple:false},footerCustomActions:{type:"sap.m.Button",multiple:true},discussInJamAction:{type:"sap.f.semantic.DiscussInJamAction",multiple:false},saveAsTileAction:{type:"sap.m.Button",multiple:false},shareInJamAction:{type:"sap.f.semantic.ShareInJamAction",multiple:false},sendMessageAction:{type:"sap.f.semantic.SendMessageAction",multiple:false},sendEmailAction:{type:"sap.f.semantic.SendEmailAction",multiple:false},printAction:{type:"sap.f.semantic.PrintAction",multiple:false},customShareActions:{type:"sap.m.Button",multiple:true},_dynamicPage:{type:"sap.f.DynamicPage",multiple:false,visibility:"hidden"}}}});g._EVENTS={SHARE_MENU_CONTENT_CHANGED:"_shareMenuContentChanged"};g._SAVE_AS_TILE_ACTION="saveAsTileAction";g.prototype.init=function(){this._bSPBeingDestroyed=false;this._initDynamicPage();this._attachShareMenuButtonChange();this._fnActionSubstituteParentFunction=function(){return this;}.bind(this);};g.prototype.exit=function(){this._bSPBeingDestroyed=true;this._cleanMemory();};g.prototype.setHeaderExpanded=function(h){this._getPage().setHeaderExpanded(h);return this;};g.prototype.getHeaderExpanded=function(){return this._getPage().getHeaderExpanded();};g.prototype.setHeaderPinnable=function(h){var o=this._getPage(),i=o.getHeader();i.setPinnable(h);return this.setProperty("headerPinnable",i.getPinnable(),true);};g.prototype.setPreserveHeaderStateOnScroll=function(p){var o=this._getPage();o.setPreserveHeaderStateOnScroll(p);return this.setProperty("preserveHeaderStateOnScroll",o.getPreserveHeaderStateOnScroll(),true);};g.prototype.setToggleHeaderOnTitleClick=function(t){this._getPage().setToggleHeaderOnTitleClick(t);return this.setProperty("toggleHeaderOnTitleClick",t,true);};g.prototype.setShowFooter=function(s){this._getPage().setShowFooter(s);return this.setProperty("showFooter",s,true);};g.prototype.setTitlePrimaryArea=function(p){var o=this._getTitle();o.setPrimaryArea(p);return this.setProperty("titlePrimaryArea",o.getPrimaryArea(),true);};g.prototype.setAggregation=function(s,o,h){var i=this.mAggregations[s],t,p;if(i===o){return this;}o=this.validateAggregation(s,o,false);if(s===g._SAVE_AS_TILE_ACTION){t=g._SAVE_AS_TILE_ACTION;}else{t=this.getMetadata().getManagedAggregation(s).type;}if(e.isKnownSemanticType(t)){p=e.getPlacement(t);if(i){this._onRemoveAggregation(i,t);this._getSemanticContainer(p).removeContent(i,p);}if(o){o._getType=function(){return t;};this._getSemanticContainer(p).addContent(o,p);this._onAddAggregation(o,t);}return M.prototype.setAggregation.call(this,s,o,true);}return M.prototype.setAggregation.call(this,s,o,h);};g.prototype.destroyAggregation=function(s,h){var o=this.getMetadata().getAggregations()[s],i,p,t;if(s===g._SAVE_AS_TILE_ACTION){t=g._SAVE_AS_TILE_ACTION;}else{t=o&&o.type;}if(t&&e.isKnownSemanticType(t)){i=M.prototype.getAggregation.call(this,s);if(i){p=e.getPlacement(t);this._onRemoveAggregation(i,t);!this._bSPBeingDestroyed&&this._getSemanticContainer(p).removeContent(i,p);}}return M.prototype.destroyAggregation.call(this,s,h);};["getTitleHeading","setTitleHeading","destroyTitleHeading"].forEach(function(m){g.prototype[m]=function(o){var h=this._getTitle(),t=m.replace(/TitleHeading?/,"Heading"),r=h[t].apply(h,arguments);if(m==="getTitleHeading"){return r;}return this;};},this);["getTitleBreadcrumbs","setTitleBreadcrumbs","destroyTitleBreadcrumbs"].forEach(function(m){g.prototype[m]=function(o){var h=this._getTitle(),t=m.replace(/TitleBreadcrumbs?/,"Breadcrumbs"),r=h[t].apply(h,arguments);if(m==="getTitleBreadcrumbs"){return r;}return this;};},this);["addTitleExpandedContent","insertTitleExpandedContent","removeTitleExpandedContent","indexOfTitleExpandedContent","removeAllTitleExpandedContent","destroyTitleExpandedContent","getTitleExpandedContent"].forEach(function(m){g.prototype[m]=function(o){var h=this._getTitle(),t=m.replace(/TitleExpandedContent?/,"ExpandedContent");return h[t].apply(h,arguments);};});["addTitleSnappedContent","insertTitleSnappedContent","removeTitleSnappedContent","indexOfTitleSnappedContent","removeAllTitleSnappedContent","destroyTitleSnappedContent","getTitleSnappedContent"].forEach(function(m){g.prototype[m]=function(o){var h=this._getTitle(),t=m.replace(/TitleSnappedContent?/,"SnappedContent");return h[t].apply(h,arguments);};});["addTitleContent","insertTitleContent","removeTitleContent","indexOfTitleContent","removeAllTitleContent","destroyTitleContent","getTitleContent"].forEach(function(m){g.prototype[m]=function(o){var h=this._getTitle(),t=m.replace(/TitleContent?/,"Content");return h[t].apply(h,arguments);};});["addHeaderContent","insertHeaderContent","removeHeaderContent","indexOfHeaderContent","removeAllHeaderContent","destroyHeaderContent","getHeaderContent"].forEach(function(m){g.prototype[m]=function(o){var h=this._getHeader(),H=m.replace(/HeaderContent?/,"Content");return h[H].apply(h,arguments);};});["getContent","setContent","destroyContent"].forEach(function(m){g.prototype[m]=function(o){var h=this._getPage();return h[m].apply(h,arguments);};},this);["addTitleCustomTextAction","insertTitleCustomTextAction","indexOfTitleCustomTextAction","removeTitleCustomTextAction","removeAllTitleCustomTextActions","destroyTitleCustomTextActions","getTitleCustomTextActions"].forEach(function(m){g.prototype[m]=function(){var s=this._getSemanticTitle(),h=m.replace(/TitleCustomTextAction?/,"CustomTextAction");return s[h].apply(s,arguments);};},this);["addTitleCustomIconAction","insertTitleCustomIconAction","indexOfTitleCustomIconAction","removeTitleCustomIconAction","removeAllTitleCustomIconActions","destroyTitleCustomIconActions","getTitleCustomIconActions"].forEach(function(m){g.prototype[m]=function(){var s=this._getSemanticTitle(),h=m.replace(/TitleCustomIconAction?/,"CustomIconAction");return s[h].apply(s,arguments);};},this);["addFooterCustomAction","insertFooterCustomAction","indexOfFooterCustomAction","removeFooterCustomAction","removeAllFooterCustomActions","destroyFooterCustomActions","getFooterCustomActions"].forEach(function(m){g.prototype[m]=function(){var s=this._getSemanticFooter(),h=m.replace(/FooterCustomAction?/,"CustomAction");return s[h].apply(s,arguments);};},this);["addCustomShareAction","insertCustomShareAction","indexOfCustomShareAction","removeCustomShareAction","removeAllCustomShareActions","destroyCustomShareActions","getCustomShareActions"].forEach(function(m){g.prototype[m]=function(){var s=this._getShareMenu(),h=m.replace(/CustomShareAction?/,"CustomAction");return s[h].apply(s,arguments);};},this);g.prototype._onAddAggregation=function(o,t){if(t===g._SAVE_AS_TILE_ACTION){this._replaceParent(o);}};g.prototype._onRemoveAggregation=function(o,t){if(t===g._SAVE_AS_TILE_ACTION){this._restoreParent(o);}if(o._getType){delete o._getType;}};g.prototype._replaceParent=function(o){if(o._fnOriginalGetParent){return;}o._fnOriginalGetParent=o.getParent;o.getParent=this._fnActionSubstituteParentFunction;};g.prototype._restoreParent=function(o){if(o&&o._fnOriginalGetParent){o.getParent=o._fnOriginalGetParent;}};g.prototype._attachShareMenuButtonChange=function(){this.attachEvent(g._EVENTS.SHARE_MENU_CONTENT_CHANGED,this._onShareMenuContentChanged,this);};g.prototype._onShareMenuContentChanged=function(E){var s=E.getParameter("bEmpty"),o=this._getSemanticTitle(),h=this._getShareMenu(),i=h._getShareMenuButton();if(!i.getParent()){o.addContent(i,"shareIcon");return;}i.setVisible(!s);};g.prototype._getPage=function(){if(!this.getAggregation("_dynamicPage")){this._initDynamicPage();}return this.getAggregation("_dynamicPage");};g.prototype._initDynamicPage=function(){this.setAggregation("_dynamicPage",new D(this.getId()+"-page",{title:this._getTitle(),header:this._getHeader(),footer:this._getFooter()}),true);};g.prototype._getTitle=function(){if(!this._oDynamicPageTitle){this._oDynamicPageTitle=this._getSemanticTitle()._getContainer();}return this._oDynamicPageTitle;};g.prototype._getHeader=function(){if(!this._oDynamicPageHeader){this._oDynamicPageHeader=new b(this.getId()+"-pageHeader");}return this._oDynamicPageHeader;};g.prototype._getFooter=function(){if(!this._oDynamicPageFooter){this._oDynamicPageFooter=this._getSemanticFooter()._getContainer();}return this._oDynamicPageFooter;};g.prototype._getSemanticTitle=function(){if(!this._oSemanticTitle){this._oSemanticTitle=new S(new a(this.getId()+"-pageTitle"),this);}return this._oSemanticTitle;};g.prototype._getShareMenu=function(){if(!this._oShareMenu){this._oShareMenu=new d(this._getActionSheet(),this);}return this._oShareMenu;};g.prototype._getActionSheet=function(){if(!this._oActionSheet){this._oActionSheet=new A(this.getId()+"-shareMenu");}return this._oActionSheet;};g.prototype._getSemanticFooter=function(){if(!this._oSemanticFooter){this._oSemanticFooter=new c(this._getOverflowToolbar(),this);}return this._oSemanticFooter;};g.prototype._getOverflowToolbar=function(){if(!this._oOverflowToolbar){this._oOverflowToolbar=new O(this.getId()+"-pageFooter");}return this._oOverflowToolbar;};g.prototype._getSemanticContainer=function(p){var P=e._Placement;if(p===P.titleText||p===P.titleIcon){return this._getSemanticTitle();}else if(p===P.footerLeft||p===P.footerRight){return this._getSemanticFooter();}else if(p===P.shareMenu){return this._getShareMenu();}return null;};g.prototype._cleanMemory=function(){if(this._oShareMenu){this._oShareMenu.destroy();this._oShareMenu=null;}if(this._oActionSheet){this._oActionSheet.destroy();this._oActionSheet=null;}if(this._oSemanticTitle){this._oSemanticTitle.destroy();this._oSemanticTitle=null;}if(this._oDynamicPageTitle){this._oDynamicPageTitle.destroy();this._oDynamicPageTitle=null;}if(this._oDynamicPageHeader){this._oDynamicPageHeader.destroy();this._oDynamicPageHeader=null;}if(this._oSemanticFooter){this._oSemanticFooter.destroy();this._oSemanticFooter=null;}if(this._oDynamicPageFooter){this._oDynamicPageFooter.destroy();this._oDynamicPageFooter=null;}if(this._oOverflowToolbar){this._oOverflowToolbar.destroy();this._oOverflowToolbar=null;}};return g;});