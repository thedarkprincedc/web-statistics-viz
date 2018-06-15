/*!
 * Copyright (c) 2009-2017 SAP SE, All Rights Reserved
 */
sap.ui.define(['sap/m/Bar','sap/ushell/library','sap/ushell/override'],function(B,l,o){"use strict";var A=B.extend("sap.ushell.ui.launchpad.AnchorNavigationBar",{metadata:{library:"sap.ushell",properties:{accessibilityLabel:{type:"string",defaultValue:null},selectedItemIndex:{type:"int",group:"Misc",defaultValue:0},overflowEnabled:{type:"boolean",group:"Misc",defaultValue:true}},aggregations:{groups:{type:"sap.ushell.ui.launchpad.AnchorItem",multiple:true,singularName:"group"}},events:{afterRendering:{},itemPress:{}}}});var u=o.updateAggregatesFactory("groups");A.prototype.updateGroups=function(){u.apply(this,arguments);if(this.getDomRef()&&this.getGroups().length){this.reArrangeNavigationBarElements();}};A.prototype.init=function(){sap.ui.Device.resize.attachHandler(this.reArrangeNavigationBarElements,this);this.bGroupWasPressed=false;this.bIsRtl=sap.ui.getCore().getConfiguration().getRTL();};A.prototype.handleExit=function(){if(this.oPopover){this.oPopover.destroy();}if(this.oOverflowButton){this.oOverflowButton.destroy();}};A.prototype.updateVisibility=function(){var g=this.getGroups(),v=0;for(var i=0;i<g.length;i++){if(g[i].getProperty("visible")){v++;}}if(v>1){this.$().removeClass("sapUshellAnchorNavigationBarInvisible");this.$().parent().next().removeClass("sapUshellSectionNoTop");}else{this.$().addClass("sapUshellAnchorNavigationBarInvisible");this.$().parent().next().addClass("sapUshellSectionNoTop");}};A.prototype.onAfterRendering=function(){this.reArrangeNavigationBarElements();var s=this.getSelectedItemIndex()||0;setTimeout(function(){this.adjustItemSelection(s);}.bind(this),100);var g=this.getGroups(),t=this;jQuery.each(g,function(i,G){this.attachPress(function(e){t.fireItemPress({group:e.getSource(),manualPress:true});t.bGroupWasPressed=true;});});if(this.bIsRtl){jQuery(".sapUshellAnchorNavigationBarItemsScroll").addClass("sapUshellRtl");}jQuery(".sapUshellAnchorNavigationBarItemsScroll").scroll(this.setNavigationBarItemsVisibility.bind(this));this.updateVisibility();jQuery(".sapUshellAnchorItem:visible:first").attr("accesskey","h");};A.prototype.openOverflowPopup=function(){var a=jQuery('.sapUshellAnchorItemOverFlow').hasClass("sapUshellAnchorItemOverFlowOpen");if(this.oOverflowButton&&!a){this.oOverflowButton.firePress();}};A.prototype.closeOverflowPopup=function(){if(this.oPopover){this.oPopover.close();}};A.prototype.reArrangeNavigationBarElements=function(){this.anchorItems=this.getVisibleGroups();var s=this.getSelectedItemIndex()||0;if(this.anchorItems.length){this.adjustItemSelection(s);}if(sap.ui.Device.system.phone&&this.anchorItems.length){this.anchorItems.forEach(function(i,a){i.setIsGroupVisible(false);});this.anchorItems[this.getSelectedItemIndex()].setIsGroupVisible(true);}else{setTimeout(function(){this.setNavigationBarItemsVisibility();}.bind(this),200);}this._adjustAnchorBarAriaProperties(this.anchorItems);};A.prototype._scrollToGroupByGroupIndex=function(g,s){var a=sap.ui.Device.system.tablet?jQuery(".sapUshellAnchorNavigationBarItemsScroll"):jQuery(".sapUshellAnchorNavigationBarItems"),b=a.offset()?a.offset().left:0,j=this.anchorItems[g].getDomRef(),m=this.getModel(),M=m.getProperty('/animationMode')==='minimal',c=s?s:200,i=M?0:c,d,e;if(j){d=j.offsetLeft;e=this.bIsRtl?this._normalizeScrollBarWidth()+d+64:d-b-48;a.animate({scrollLeft:e},i,this.setNavigationBarItemsVisibility.bind(this));}};A.prototype._normalizeScrollBarWidth=function(){var L=this.anchorItems[this.anchorItems.length-1].getDomRef().offsetLeft,f=this.anchorItems[0].getDomRef().offsetLeft,t=Math.abs(L)-Math.abs(f);return t;};A.prototype.setNavigationBarItemsVisibility=function(){if(!sap.ui.Device.system.phone){if(this.anchorItems.length&&(!this.isMostRightAnchorItemVisible()||!this.isMostLeftAnchorItemVisible())||sap.ui.Device.system.phone){this.oOverflowButton.removeStyleClass("sapUshellShellHidden");jQuery('.sapUshellAnchorItemOverFlow').removeClass("sapUshellShellHidden");}else if(this.oOverflowButton){this.oOverflowButton.addStyleClass("sapUshellShellHidden");jQuery('.sapUshellAnchorItemOverFlow').addClass("sapUshellShellHidden");}if(this.bIsRtl){if(this.anchorItems.length&&!this.isMostLeftAnchorItemVisible()){this.oOverflowRightButton.removeStyleClass("sapUshellShellHidden");jQuery(".sapUshellAnchorNavigationBarItems").addClass("sapUshellOverflowLeft");}else if(this.oOverflowRightButton){this.oOverflowRightButton.addStyleClass("sapUshellShellHidden");jQuery(".sapUshellAnchorNavigationBarItems").removeClass("sapUshellOverflowLeft");}if(this.anchorItems.length&&!this.isMostRightAnchorItemVisible()){this.oOverflowLeftButton.removeStyleClass("sapUshellShellHidden");jQuery(".sapUshellAnchorNavigationBarItems").addClass("sapUshellOverflowRight");}else if(this.oOverflowLeftButton){this.oOverflowLeftButton.addStyleClass("sapUshellShellHidden");jQuery(".sapUshellAnchorNavigationBarItems").removeClass("sapUshellOverflowRight");}}else{if(this.anchorItems.length&&!this.isMostLeftAnchorItemVisible()){this.oOverflowLeftButton.removeStyleClass("sapUshellShellHidden");jQuery(".sapUshellAnchorNavigationBarItems").addClass("sapUshellOverflowLeft");}else if(this.oOverflowLeftButton){this.oOverflowLeftButton.addStyleClass("sapUshellShellHidden");jQuery(".sapUshellAnchorNavigationBarItems").removeClass("sapUshellOverflowLeft");}if(this.anchorItems.length&&!this.isMostRightAnchorItemVisible()){this.oOverflowRightButton.removeStyleClass("sapUshellShellHidden");jQuery(".sapUshellAnchorNavigationBarItems").addClass("sapUshellOverflowRight");}else if(this.oOverflowRightButton){this.oOverflowRightButton.addStyleClass("sapUshellShellHidden");jQuery(".sapUshellAnchorNavigationBarItems").removeClass("sapUshellOverflowRight");}}jQuery(".sapUshellAnchorItem.firstItem").removeClass("firstItem");var j=jQuery(".sapUshellAnchorItem:visible").first();j.addClass("firstItem");}else{if(this.anchorItems.length){this.oOverflowButton.removeStyleClass("sapUshellShellHidden");var s=this.getSelectedItemIndex()||0;if(this.oPopover){this.oPopover.setTitle(this.anchorItems[s].getTitle());}}}};A.prototype.adjustItemSelection=function(s){setTimeout(function(){if(this.anchorItems&&this.anchorItems.length){this.anchorItems.forEach(function(i){i.setSelected(false);});this.anchorItems[s].setSelected(true);this._scrollToGroupByGroupIndex(s);}}.bind(this),200);};A.prototype.isMostRightAnchorItemVisible=function(){var j=jQuery('.sapUshellAnchorNavigationBar'),n=!jQuery.isEmptyObject(j)?j.width():0,a=!jQuery.isEmptyObject(j)&&j.offset()?j.offset().left:0,b=this.bIsRtl?this.anchorItems[0].getDomRef():this.anchorItems[this.anchorItems.length-1].getDomRef(),c=!jQuery.isEmptyObject(b)?jQuery(b).width():0,d;if(c<0){c=80;}d=b&&jQuery(b).offset()?jQuery(b).offset().left:0;if(d+c<=a+n){return true;}return false;};A.prototype.isMostLeftAnchorItemVisible=function(){var j=jQuery('.sapUshellAnchorNavigationBar'),n=!jQuery.isEmptyObject(j)&&j.offset()?j.offset().left:0,f=this.bIsRtl?this.anchorItems[this.anchorItems.length-1].getDomRef():this.anchorItems[0].getDomRef(),a=!jQuery.isEmptyObject(f)&&jQuery(f).offset()?jQuery(f).offset().left:0;if(a>=n){return true;}return false;};A.prototype.setSelectedItemIndex=function(s){if(s!==undefined){this.setProperty("selectedItemIndex",s,true);}};A.prototype.setOverflowEnabled=function(e){this.setProperty("overflowEnabled",e,true);if(this.oOverflowButton){this.oOverflowButton.setEnabled(e);}};A.prototype._getOverflowLeftArrowButton=function(){this.oOverflowLeftButton=new sap.m.Button({icon:'sap-icon://slim-arrow-left',tooltip:sap.ushell.resources.i18n.getText("scroll_beginning"),press:function(e){this._scrollToGroupByGroupIndex(0);}.bind(this)}).addStyleClass("sapUshellShellHidden");return this.oOverflowLeftButton;};A.prototype._getOverflowRightArrowButton=function(){this.oOverflowRightButton=new sap.m.Button({icon:'sap-icon://slim-arrow-right',tooltip:sap.ushell.resources.i18n.getText("scroll_end"),press:function(e){this._scrollToGroupByGroupIndex(this.anchorItems.length-1);}.bind(this)}).addStyleClass("sapUshellShellHidden");return this.oOverflowRightButton;};A.prototype._getOverflowButton=function(){if(this.oOverflowButton){return this.oOverflowButton;}this.oOverflowButton=new sap.m.Button("sapUshellAnchorBarOverflowButton",{icon:'sap-icon://slim-arrow-down',tooltip:sap.ushell.resources.i18n.getText("more_groups"),enabled:this.getOverflowEnabled(),press:function(e){if(!this.oPopover){this._initPopover();}var O=false;var c=false;if(!sap.ui.Device.browser.internet_explorer){if(this.oPopover.isOpen()){c=true;}else{O=true;}}else{if(!this.bOverFlowBtnClick){O=true;}else{this.bOverFlowBtnClick=false;}}if(c){this.oPopover.close();}else if(O){var L=this.oPopover.getContent()[0];this.anchorItems=this.getVisibleGroups();L.setModel(this.getModel());var a=this.getModel().getProperty("/tileActionModeActive");var v=new sap.ui.model.Filter('','EQ','a');v.fnTest=function(i){if(!i.visibilityModes[a?1:0]){return false;}return i.isGroupVisible||a;}.bind(this);L.bindItems({path:"/groups",template:new sap.ushell.ui.launchpad.GroupListItem({title:"{title}",groupId:"{groupId}",index:"{index}"}),filters:[v]});var s=jQuery(".sapUshellAnchorItemSelected").attr("id");var S=sap.ui.getCore().byId(s);jQuery.each(L.getItems(),function(i,b){if(S.mProperties.groupId===b.mProperties.groupId){b.addStyleClass("sapUshellAnchorPopoverItemSelected");}else{b.addStyleClass("sapUshellAnchorPopoverItemNonSelected");}});jQuery('.sapUshellAnchorItemOverFlow').toggleClass("sapUshellAnchorItemOverFlowPressed",true);this.oPopover.openBy(this.oOverflowButton);}}.bind(this)}).addStyleClass("sapUshellShellHidden").addStyleClass('sapContrastPlus');return this.oOverflowButton;};A.prototype._initPopover=function(){var t=this;var L=new sap.m.List({mode:sap.m.ListMode.SingleSelectMaster,rememberSelections:false,selectionChange:function(e){t.fireItemPress({group:e.getParameter('listItem')});t.oPopover.close();}});this.bOverFlowBtnClick=false;this.oPopover=new sap.m.Popover("sapUshellAnchorBarOverflowPopover",{showArrow:false,showHeader:false,placement:"Left",content:[L],horizontalScrolling:false,beforeOpen:function(){jQuery('.sapUshellAnchorItemOverFlow').addClass("sapUshellAnchorItemOverFlowOpen");var j=jQuery(".sapUshellAnchorItemOverFlow"),i=sap.ui.getCore().getConfiguration().getRTL(),a=i?-1*j.outerWidth():j.outerWidth();this.setOffsetX(a);},beforeClose:function(){if(document.activeElement.id===this.oOverflowButton.getId()){this.bOverFlowBtnClick=true;}}.bind(this),afterClose:function(){jQuery('.sapUshellAnchorItemOverFlow').removeClass("sapUshellAnchorItemOverFlowOpen");jQuery('.sapUshellAnchorItemOverFlow').toggleClass("sapUshellAnchorItemOverFlowPressed",false);}}).addStyleClass("sapUshellAnchorItemsPopover").addStyleClass('sapContrastPlus');};A.prototype.getVisibleGroups=function(){return this.getGroups().filter(function(g){return g.getVisible();});};A.prototype._adjustAnchorBarAriaProperties=function(g){var i;for(i=0;i<g.length;i++){var j=jQuery(g[i].getDomRef());j.attr("aria-posinset",i+1);j.attr("aria-setsize",g.length);}};A.prototype.exit=function(){if(this.oOverflowLeftButton){this.oOverflowLeftButton.destroy();}if(this.oOverflowRightButton){this.oOverflowRightButton.destroy();}if(this.oOverflowButton){this.oOverflowButton.destroy();}if(this.oPopover){this.oPopover.destroy();}};return A;});