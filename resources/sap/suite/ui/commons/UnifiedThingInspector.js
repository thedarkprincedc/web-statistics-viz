/*!
 * 
		SAP UI development toolkit for HTML5 (SAPUI5)
		(c) Copyright 2009-2015 SAP SE. All rights reserved
	
 */
sap.ui.define(['jquery.sap.global','./library','sap/m/library','sap/ui/core/Control','sap/m/NavContainer','sap/ui/core/IconPool','sap/ui/layout/Grid','sap/ui/layout/GridData','sap/m/ActionSheet','sap/suite/ui/commons/LinkActionSheet','sap/m/ScrollContainer','sap/m/Page','sap/m/Bar','sap/m/Button','sap/ui/Device','sap/ui/core/ResizeHandler','sap/ui/base/ManagedObject','sap/m/ObjectHeader','sap/m/ObjectAttribute','sap/m/Image','sap/ui/core/Icon'],function(q,l,M,C,N,I,G,a,A,L,S,P,B,b,D,R,c,O,d,e,f){"use strict";var U=C.extend("sap.suite.ui.commons.UnifiedThingInspector",{metadata:{deprecated:true,library:"sap.suite.ui.commons",properties:{height:{type:"sap.ui.core.CSSSize",group:"Misc",defaultValue:'100%'},title:{type:"string",group:"Misc",defaultValue:null},name:{type:"string",group:"Misc",defaultValue:null},description:{type:"string",group:"Misc",defaultValue:null},icon:{type:"sap.ui.core.URI",group:"Misc",defaultValue:null},transactionsVisible:{type:"boolean",group:"Misc",defaultValue:false},actionsVisible:{type:"boolean",group:"Misc",defaultValue:false},destroyPageOnBack:{type:"boolean",group:"Misc",defaultValue:true},configurationVisible:{type:"boolean",group:"Misc",defaultValue:true}},aggregations:{facets:{type:"sap.suite.ui.commons.FacetOverview",multiple:true,singularName:"facet"},facetContent:{type:"sap.ui.core.Control",multiple:true,singularName:"facetContent"},navContainer:{type:"sap.m.NavContainer",multiple:false,visibility:"hidden"},kpis:{type:"sap.suite.ui.commons.KpiTile",multiple:true,singularName:"kpi"},transactions:{type:"sap.ui.core.Control",multiple:true,singularName:"transaction",deprecated:true},actions:{type:"sap.m.Button",multiple:true,singularName:"action",deprecated:true},pages:{type:"sap.ui.core.Control",multiple:true,singularName:"page"},objectHeader:{type:"sap.m.ObjectHeader",multiple:false,visibility:"hidden"}},events:{backAction:{},transactionsButtonPress:{allowPreventDefault:true,parameters:{caller:{type:"object"}}},actionsButtonPress:{allowPreventDefault:true,parameters:{caller:{type:"object"}}},configurationButtonPress:{parameters:{caller:{type:"object"}}},navigate:{allowPreventDefault:true,parameters:{from:{type:"sap.ui.core.Control"},fromId:{type:"string"},to:{type:"sap.ui.core.Control"},toId:{type:"string"},firstTime:{type:"boolean"},isTo:{type:"boolean"},isBack:{type:"boolean"},isBackToTop:{type:"boolean"},isBackToPage:{type:"boolean"},direction:{type:"string"}}},afterNavigate:{parameters:{from:{type:"sap.ui.core.Control"},fromId:{type:"string"},to:{type:"sap.ui.core.Control"},toId:{type:"string"},firstTime:{type:"boolean"},isTo:{type:"boolean"},isBack:{type:"boolean"},isBackToTop:{type:"boolean"},isBackToPage:{type:"boolean"},direction:{type:"string"}}}}}});U.prototype.init=function(){this._altKey=false;var t=this;this._rb=sap.ui.getCore().getLibraryResourceBundle("sap.suite.ui.commons");this._bDetailPageIsTransitioning=false;this._oNavContainer=new N(this.getId()+"-nav-container",{navigate:function(E){t._bDetailPageIsTransitioning=true;t.fireNavigate(E);},afterNavigate:function(E){t._bDetailPageIsTransitioning=false;if(t.getDestroyPageOnBack()){var p=E.getParameter("from");var i=t._oNavContainer.indexOfPage(p);if(i>1&&E.getParameter("isBack")){p.destroy(true);}}t.fireAfterNavigate(E);}});this.setAggregation("navContainer",this._oNavContainer);this._oActionSheet=new A(this.getId()+"-action-sheet",{showCancelButton:true,placement:M.PlacementType.Top});this._oTransactionSheet=new L(this.getId()+"-transaction-sheet",{showCancelButton:true,placement:M.PlacementType.Top,itemPress:function(E){var i=E.getParameter("item");if(i.getMetadata().getName()==="sap.m.Link"&&i._bEnterWasPressed){t._bDontOpenTransactions=true;}}});this._oKpiScrollCont=new S(this.getId()+"-kpi-scroll-container",{width:"100%",horizontal:this.isPhone()});this._oKpiScrollCont.addStyleClass("sapSuiteUtiKpiBox");this._oFacetsGrid=new G(this.getId()+"-facets-grid",{defaultSpan:"L6 M12 S12",hSpacing:1,vSpacing:1,width:"auto"});this._oFacetsGrid.addStyleClass("sapSuiteUtiFacetGrid");this._oFacetsGrid.addDelegate({onAfterRendering:function(E){var o=E.srcControl.$();o.attr("role","group");var g=o.find("[role='note']");var i=1;g.each(function(){q(this).attr("aria-setsize",g.length).attr("aria-posinset",i++);});}});this._oHeader=this._createHeaderObject(this.getId()+"-header");this._oHeader.getObjectHeader()._titleText.setMaxLines(2);this._oHeaderGrid=new G(this.getId()+"-header-grid",{hSpacing:0,vSpacing:0,content:[this._oHeader,this._oKpiScrollCont]});this._oMasterPage=new P(this.getId()+"-master-page",{content:[this._oHeaderGrid,this._oFacetsGrid],showNavButton:true,footer:new B(this.getId()+"-master-footer",{contentRight:[new b(this.getId()+"-master-action-button",{icon:"sap-icon://action",tooltip:t._rb.getText("UNIFIEDTHINGINSPECTOR_FOOTER_BUTTON_ACTIONS"),press:function(){var o={};o.caller=this;if(t.fireActionsButtonPress(o)){if(t._oActionSheet.getButtons().length){t._oActionSheet.openBy(this);}else{q.sap.log.info("The are no actions for displaying");}}}})]}),navButtonPress:function(){t.fireBackAction();}});this._oMasterPage.getFooter().insertContentRight(new b(this.getId()+"-master-transaction-button",{text:t._rb.getText("UNIFIEDTHINGINSPECTOR_FOOTER_BUTTON_OPENWITH")+"...",tooltip:t._rb.getText("UNIFIEDTHINGINSPECTOR_FOOTER_BUTTON_TRANSACTIONS_TOOLTIP"),press:function(){if(!t._bDontOpenTransactions){var o={};o.caller=this;if(t.fireTransactionsButtonPress(o)){if(t._oTransactionSheet.getItems().length){t._oTransactionSheet.openBy(this);}else{q.sap.log.info("The are no transactions for displaying");}}}else{t._bDontOpenTransactions=false;}}}),0);this._oDetailPage=new P(this.getId()+"-detail-page",{showNavButton:true,footer:new B(this.getId()+"-detail-footer",{contentRight:[new b(this.getId()+"-detail-action-button",{icon:"sap-icon://action",tooltip:t._rb.getText("UNIFIEDTHINGINSPECTOR_FOOTER_BUTTON_ACTIONS"),press:function(){var o={};o.caller=this;if(t.fireActionsButtonPress(o)){if(t._oActionSheet.getButtons().length){t._oActionSheet.openBy(this);}else{q.sap.log.info("The are no actions for displaying");}}}})]}),navButtonPress:function(){t._navigateToMaster();}});this._oDetailPage.getFooter().insertContentRight(new b(this.getId()+"-detail-transaction-button",{text:t._rb.getText("UNIFIEDTHINGINSPECTOR_FOOTER_BUTTON_OPENWITH")+"...",tooltip:t._rb.getText("UNIFIEDTHINGINSPECTOR_FOOTER_BUTTON_TRANSACTIONS_TOOLTIP"),press:function(){var o={};o.caller=this;if(t.fireTransactionsButtonPress(o)){if(t._oTransactionSheet.getItems().length){t._oTransactionSheet.openBy(this);}else{q.sap.log.info("The are no transactions for displaying");}}}}),0);this._oNavContainer.addPage(this._oMasterPage);this._oNavContainer.addPage(this._oDetailPage);if(!q.device.is.desktop){D.orientation.attachHandler(function(E){t._updateHeaderLayoutData(E);t._adjustFacetLayout();});}this.setModel=function(m,n){U.prototype.setModel.apply(this,arguments);this._oActionSheet.setModel(m,n);this._oTransactionSheet.setModel(m,n);return this;};this._bindedAdjustFacetLayout=this._adjustFacetLayout.bind(this);this._oDelegate={onclick:function(E){t.$().find(".sapSuiteFov").removeAttr("tabindex");var F=q(E.currentTarget);F.attr("tabindex",0);q.sap.focus(F);},onAfterRendering:function(E){t._adjustFacetLayout();if(t._sCurrentFoId==E.srcControl.getId()){E.srcControl.$().attr("tabindex",0);}},onkeydown:function(E){var F=E.srcControl.$();var m=function(n){if(n.length){n.attr("tabindex",0);q.sap.focus(n.get(0));F.removeAttr("tabindex");t._sCurrentFoId=n.attr("id");}};var g=function(o){var n=t.$().find((o.row!=undefined?"[data-row="+o.row+"]":"")+(o.col!=undefined?"[data-col="+o.col+"]":"")+(o.f!=undefined?"[data-f="+o.f+"]":""));m(n);};var r=F.attr("data-row");var s=F.attr("data-col");var h=F.attr("data-f");var i=sap.ui.getCore().getConfiguration().getRTL();var j=i?q.sap.KeyCodes.ARROW_RIGHT:q.sap.KeyCodes.ARROW_LEFT;var k=i?q.sap.KeyCodes.ARROW_LEFT:q.sap.KeyCodes.ARROW_RIGHT;switch(E.which){case q.sap.KeyCodes.ARROW_UP:g({row:parseInt(r)-1,col:s});E.preventDefault();break;case q.sap.KeyCodes.ARROW_DOWN:g({row:parseInt(r)+1,col:s});E.preventDefault();break;case j:if(k==t._prevKey&&!F.is(t._prevFo)){m(t._prevFo);}else{g({col:parseInt(s)-1,f:h});}E.preventDefault();break;case k:if(j==t._prevKey&&!F.is(t._prevFo)){m(t._prevFo);}else{g({col:parseInt(s)+1,f:h});}E.preventDefault();break;case q.sap.KeyCodes.HOME:m(t.$().find("[data-home]"));E.preventDefault();break;case q.sap.KeyCodes.END:m(t.$().find("[data-end]"));E.preventDefault();break;default:break;}t._prevKey=E.which;t._prevFo=F;}};};U.prototype.exit=function(){var t=this;this._oActionSheet.destroy();this._oTransactionSheet.destroy();D.orientation.detachHandler(function(){t._updateHeaderLayoutData();});R.deregister(this._sTitleResizeHandlerId);};U.prototype._updateHeaderLayoutData=function(E){var s="";var o=q.sap.byId(this.getId()+"-kpi-scroll-container-scroll");var g=this.getScrollClass();if(q.device.is.tablet&&!E.landscape){s="100%";o.addClass(g);}else{o.removeClass(g);}o.css("width",s);};U.prototype._adjustFacetLayout=function(){var F=this.getFacets().length;if(F>0){this.getFacets()[0].$().attr("data-home",true);this.getFacets()[F-1].$().attr("data-end",true);}if(this.$().outerWidth(true)>=1024||this._oFacetsGrid.$().hasClass("sapUiRespGridMedia-Std-Desktop")){this._adjustTwoColumnFacetLayout();}else{this._adjustOneColumnFacetLayout();}};U.prototype._adjustOneColumnFacetLayout=function(){var F=this.getFacets().length;for(var i=0;i<F;i++){this.getFacets()[i].$().attr("data-row",i).attr("data-col",0).parent().css("margin-top","").removeClass("sapSuiteUtiFacetLeft");}};U.prototype._adjustTwoColumnFacetLayout=function(){this._adjustOneColumnFacetLayout();var F=this.getFacets();var g=0;var h=0,r=0,j=-1;var k=F.length;for(var i=0;i<k;i++){var H=parseFloat(F[i].$().css("height"));if(g>0){g-=H+parseFloat(F[i].$().parent().css("margin-bottom"));F[i].$().attr("data-row",r).attr("data-col",1).attr("data-f",j);r+=1;}else{if(g<0){F[i].$().parent().css("margin-top",g+"px");}else{F[i].$().parent().addClass("sapSuiteUtiFacetLeft");}g+=H+parseFloat(F[i].$().parent().css("margin-bottom"));j+=1;F[i].$().attr("data-row",h).attr("data-col",0).attr("data-f",j);h+=1;}}};U.prototype.onAfterRendering=function(){if(this._sTitleResizeHandlerId){R.deregister(this._sTitleResizeHandlerId);}var h=q.sap.domById(this.getId()+"-header");if(h){this._sTitleResizeHandlerId=R.register(h,q.proxy(this._handleResize,this));this._handleResize();}if(q.device.is.tablet&&q.device.is.portrait){q.sap.byId(this.getId()+"-kpi-scroll-container-scroll").css("width","100%").addClass(this.getScrollClass());}var F=this.getFacets().length;for(var i=0;i<F;i++){this.getFacets()[i].addDelegate(this._oDelegate);}var g=q.sap.byId(this._sCurrentFoId);if(g.length===0){g=this.$().find("[data-home]");this._sCurrentFoId=g.attr("id");}g.attr("tabindex",0);};U.prototype._handleResize=function(){this._adjustFacetLayout();};U.prototype._getFontSize=function(i,w){var n=w/(i*0.5);if(n>28){return 28;}else if(n<20){return 20;}else{return n;}};U.prototype.onBeforeRendering=function(){var t=this;if(this.getConfigurationVisible()){if(this._oMasterPage.getFooter().getContentLeft().length==0){this._oMasterPage.getFooter().addContentLeft(new b(this.getId()+"-master-settings-button",{icon:"sap-icon://action-settings",tooltip:t._rb.getText("UNIFIEDTHINGINSPECTOR_FOOTER_BUTTON_SETTINGS_TOOLTIP"),press:function(){var o={};o.caller=this;t.fireConfigurationButtonPress(o);}}),true);}if(this._oDetailPage.getFooter().getContentLeft().length==0){this._oDetailPage.getFooter().addContentLeft(new b(this.getId()+"-detail-settings-button",{icon:"sap-icon://action-settings",tooltip:t._rb.getText("UNIFIEDTHINGINSPECTOR_FOOTER_BUTTON_SETTINGS_TOOLTIP"),press:function(){var o={};o.caller=this;t.fireConfigurationButtonPress(o);}}),true);}}else{this._oMasterPage.getFooter().removeAllContentLeft(true);this._oDetailPage.getFooter().removeAllContentLeft(true);}sap.ui.getCore().byId(this.getId()+"-master-action-button").setVisible(this.getActionsVisible());sap.ui.getCore().byId(this.getId()+"-detail-action-button").setVisible(this.getActionsVisible());sap.ui.getCore().byId(this.getId()+"-master-transaction-button").setVisible(this.getTransactionsVisible());sap.ui.getCore().byId(this.getId()+"-detail-transaction-button").setVisible(this.getTransactionsVisible());this._oKpiScrollCont.setVisible(!!this.getKpis().length);if(this.getKpis().length<3){this._oKpiScrollCont.addStyleClass("sapSuiteUtiKpiLT3");}this._fitKpiTiles();};U.prototype._fitKpiTiles=function(){var h;var k;var K=this.getKpis().length;switch(K){case 0:h="L12 M12 S12";k="L12 M12 S12";break;case 1:h="L9 M12 S12";k="L3 M12 S12";break;case 2:h="L7 M12 S12";k="L5 M12 S12";break;default:h="L6 M12 S12";k="L6 M12 S12";}this._oHeader.setLayoutData(new a({span:h}));this._oKpiScrollCont.setLayoutData(new a({span:k}));};U.prototype.isPhone=function(){return q.device.is.phone||q.device.is.iphone;};U.prototype.setTitle=function(t){this.setProperty("title",t,true);this._oMasterPage.setTitle(t);this._oDetailPage.setTitle(t);return this;};U.prototype.setName=function(n){this._oHeader.setName(n);return this;};U.prototype.setDescription=function(s){this._oHeader.setDescription(s);return this;};U.prototype.getName=function(){return this._oHeader.getName();};U.prototype.getDescription=function(){return this._oHeader.getDescription();};U.prototype.setIcon=function(i){this._oHeader.setIcon(i);this.setProperty("icon",i,true);return this;};U.prototype.getScrollClass=function(){var k=this.getKpis().length;var s="";if(k==1){s="sapSuiteUtiScOne";}else if(k==2){s="sapSuiteUtiScTwo";}else if(k>2){s="sapSuiteUtiScThree";}return s;};U.prototype._navigateToMaster=function(){this._oNavContainer.back();};U.prototype.navigateToDetailWithContent=function(F){if(!this._bDetailPageIsTransitioning){this.removeAllFacetContent();if(q.isArray(F)){for(var i=0;i<F.length;i++){this.addFacetContent(F[i]);}}else{this.addFacetContent(F);}this._oNavContainer.to(this._oDetailPage.getId());this._oDetailPage.scrollTo(0);}return this;};U.prototype.navigateToDetail=function(){this._oNavContainer.to(this._oDetailPage.getId());return this;};U.prototype.navigateToPage=function(p,g){var t=this;p.attachNavButtonPress(function(E){t._oNavContainer.back();});if(g==undefined||g){var F=this._oMasterPage.getFooter().clone();p.setFooter(F);}this._oNavContainer.addPage(p);this._oNavContainer.to(p.getId());return this;};U.prototype.navigateToPageById=function(i){this._oNavContainer.to(i);return this;};U.prototype.removeFacet=function(F,s){F.removeDelegate(this._oDelegate);return this.removeAggregation("facets",F,s);};U.prototype.removeAllFacets=function(s){for(var i=0;i<this.getFacets().length;i++){this.getFacets()[i].removeDelegate(this._oDelegate);}return this.removeAllAggregation("facets",s);};U.prototype.getActions=function(){return this._oActionSheet.getButtons();};U.prototype.insertAction=function(o,i){this._oActionSheet.insertButton(o,i);return this;};U.prototype.addAction=function(o){this._oActionSheet.addButton(o);return this;};U.prototype.removeAction=function(v){return this._oActionSheet.removeButton(v);};U.prototype.removeAllActions=function(){return this._oActionSheet.removeAllButtons();};U.prototype.indexOfAction=function(o){return this._oActionSheet.indexOfButton(o);};U.prototype.destroyActions=function(){this._oActionSheet.destroyButtons();return this;};U.prototype.getTransactions=function(){return this._oTransactionSheet.getItems();};U.prototype.addTransaction=function(t){this._oTransactionSheet.addItem(t);return this;};U.prototype.insertTransaction=function(t,i){this._oTransactionSheet.insertItem(t,i);return this;};U.prototype.removeTransaction=function(t){return this._oTransactionSheet.removeItem(t);};U.prototype.removeAllTransactions=function(){return this._oTransactionSheet.removeAllItems();};U.prototype.indexOfTransaction=function(t){return this._oTransactionSheet.indexOfItem(t);};U.prototype.destroyTransactions=function(){this._oTransactionSheet.destroyItems();return this;};U.prototype._callMethodInManagedObject=function(F,s){var g=Array.prototype.slice.call(arguments);if(s==="facets"){g[1]="content";return this._oFacetsGrid[F].apply(this._oFacetsGrid,g.slice(1));}else if(s==="kpis"){g[1]="content";return this._oKpiScrollCont[F].apply(this._oKpiScrollCont,g.slice(1));}else if(s==="facetContent"){g[1]="content";return this._oDetailPage[F].apply(this._oDetailPage,g.slice(1));}else{return c.prototype[F].apply(this,g.slice(1));}};U.prototype.validateAggregation=function(s,o,m){return this._callMethodInManagedObject("validateAggregation",s,o,m);};U.prototype.setAggregation=function(s,o,g){this._callMethodInManagedObject("setAggregation",s,o,g);return this;};U.prototype.getAggregation=function(s,o){return this._callMethodInManagedObject("getAggregation",s,o);};U.prototype.indexOfAggregation=function(s,o){return this._callMethodInManagedObject("indexOfAggregation",s,o);};U.prototype.insertAggregation=function(s,o,i,g){this._callMethodInManagedObject("insertAggregation",s,o,i,g);return this;};U.prototype.addAggregation=function(s,o,g){this._callMethodInManagedObject("addAggregation",s,o,g);return this;};U.prototype.removeAggregation=function(s,o,g){return this._callMethodInManagedObject("removeAggregation",s,o,g);};U.prototype.removeAllAggregation=function(s,g){return this._callMethodInManagedObject("removeAllAggregation",s,g);};U.prototype.destroyAggregation=function(s,g){this._callMethodInManagedObject("destroyAggregation",s,g);return this;};U.prototype.getPages=function(){return this._oNavContainer.getPages().slice(2);};U.prototype.insertPage=function(p,i,s){this._oNavContainer.insertPage(p,i+2,s);return this;};U.prototype.addPage=function(p,s){this._oNavContainer.addPage(p,s);return this;};U.prototype.removePage=function(p,s){return this._oNavContainer.removePage(p,s);};U.prototype.removeAllPages=function(s){var p=this.getPages();for(var i=p.length-1;i>=0;i--){this._oNavContainer.removePage(p[i],s);}return p;};U.prototype.indexOfPage=function(p){var i=this._oNavContainer.indexOfPage(p);return i>1?i-2:-1;};U.prototype.destroyPages=function(s){var p=this.getPages();for(var i=p.length-1;i>=0;i--){p[i].destroy(s);}return this;};U.prototype._createHeaderObject=function(i){C.extend("sap.suite.ui.commons.UnifiedThingInspector.Header",{metadata:{properties:{name:"string",description:"string",icon:"sap.ui.core.URI"},aggregations:{"objectHeader":{type:"sap.m.ObjectHeader",multiple:false}}},init:function(){this._oObjectHeader=new O(this.getId()+"-object-header",{condensed:true,backgroundDesign:M.BackgroundDesign.Transparent});this.setAggregation("objectHeader",this._oObjectHeader);},setDescription:function(s){this._oObjectHeader.removeAllAttributes();this._oObjectHeader.addAttribute(new d({text:s}));},setName:function(n){this._oObjectHeader.setTitle(n);},getDescription:function(){if(this._oObjectHeader.getAttributes().length==1){return this._oObjectHeader.getAttributes()[0].getText();}else{return"";}},getName:function(){return this._oObjectHeader.getTitle();},setIcon:function(s){var v=!q.sap.equal(this.getIcon(),s);if(v){if(this._oIcon){this._oIcon.destroy();this._oIcon=undefined;}if(s){this._oIcon=I.createControlByURI({id:this.getId()+"-icon-image",src:s},e);this._oIcon.addStyleClass("sapSuiteUtiHeaderIconImage");if(this._oIcon instanceof f){this._oIcon.setSize("64px");}}}return this.setProperty("icon",s);},exit:function(){if(this._oIcon){this._oIcon.destroy();}},renderer:function(r,o){r.write("<div");r.writeControlData(o);r.addClass("sapSuiteUtiHeader");r.writeClasses();r.write(">");if(o._oIcon){r.write("<div");r.writeAttribute("id",o.getId()+"-icon");r.addClass("sapSuiteUtiHeaderIcon");r.writeClasses();r.write(">");r.renderControl(o._oIcon);r.write("</div>");}r.write("<div");r.writeAttribute("id",o.getId()+"-content");if(o._oIcon){r.addClass("sapSuiteUtiHeaderContentWithIcon");}else{r.addClass("sapSuiteUtiHeaderContent");}r.writeClasses();r.write(">");r.renderControl(o.getObjectHeader());r.write("</div>");r.write("</div>");}});return new U.Header(i);};U.prototype._isMasterPage=function(){return this._oNavContainer.getCurrentPage().getId().indexOf("-master-page")!=-1;};U.prototype.onkeydown=function(E){switch(E.keyCode){case q.sap.KeyCodes.S:if((this._altKey||E.altKey)&&this.getConfigurationVisible()){this.$().find("button[id*='-settings-button']:visible").focus();E.stopPropagation();}break;case q.sap.KeyCodes.O:if((this._altKey||E.altKey)&&this.getTransactionsVisible()){this.$().find("button[id*='-transaction-button']:visible").focus();E.stopPropagation();}break;case q.sap.KeyCodes.K:if((this._altKey||E.altKey)&&this.getActionsVisible()){this.$().find("button[id*='-action-button']:visible").focus();E.stopPropagation();}break;case q.sap.KeyCodes.ALT:this._altKey=true;break;default:break;}};U.prototype.onkeyup=function(E){if(q.sap.KeyCodes.ALT==E.keyCode){this._altKey=false;}};return U;});
