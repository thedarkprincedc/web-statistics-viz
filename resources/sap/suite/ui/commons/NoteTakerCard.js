/*!
 * 
		SAP UI development toolkit for HTML5 (SAPUI5)
		(c) Copyright 2009-2015 SAP SE. All rights reserved
	
 */
sap.ui.define(['jquery.sap.global','sap/ui/commons/library','sap/ui/ux3/library','sap/ui/commons/Link','sap/ui/commons/MessageBox','sap/ui/core/Control','sap/ui/core/format/DateFormat','sap/ui/ux3/OverlayContainer','sap/ui/commons/Button','sap/ui/core/ListItem','sap/ui/commons/layout/VerticalLayout','sap/ui/commons/layout/HorizontalLayout','sap/ui/layout/HorizontalLayout','sap/ui/core/HTML','sap/ui/commons/TextField','sap/ui/commons/InPlaceEdit','sap/ui/commons/Label','sap/ui/commons/ListBox','sap/ui/commons/TextArea'],function(q,C,U,L,M,b,D,O,B,c,V,d,f,H,T,I,g,h,j){"use strict";var N=b.extend("sap.suite.ui.commons.NoteTakerCard",{metadata:{deprecated:true,library:"sap.suite.ui.commons",properties:{header:{type:"string",group:"Misc",defaultValue:null},body:{type:"string",group:"Misc",defaultValue:null},timestamp:{type:"object",group:"Misc",defaultValue:new Date()},tags:{type:"object",group:"Misc",defaultValue:[]},viewAllTrigger:{type:"int",group:"Misc",defaultValue:1800},uid:{type:"string",group:"Misc",defaultValue:null},isFiltered:{type:"boolean",group:"Misc",defaultValue:false},thumbUp:{type:"boolean",group:"Misc",defaultValue:null},thumbDown:{type:"boolean",group:"Misc",defaultValue:null},allTags:{type:"object",group:"Misc",defaultValue:[]},attachmentFilename:{type:"string",group:"Misc",defaultValue:null},attachmentUrl:{type:"string",group:"Misc",defaultValue:null}},events:{editNote:{parameters:{title:{type:"string"},body:{type:"string"},timestamp:{type:"string"},uid:{type:"string"},thumbUp:{type:"boolean"},thumbDown:{type:"boolean"},tags:{type:"object"}}},deleteNote:{parameters:{cardId:{type:"string"},title:{type:"string"},body:{type:"string"},timestamp:{type:"string"},uid:{type:"string"},thumbUp:{type:"boolean"},thumbDown:{type:"boolean"}}},attachmentClick:{parameters:{uid:{type:"string"},url:{type:"string"},filename:{type:"string"}}}}}});N.prototype.init=function(){this._rb=sap.ui.getCore().getLibraryResourceBundle("sap.suite.ui.commons");var t=this;this._oEditButton=new B({id:this.getId()+"-edit-button",press:function(e){t._handleEdit();},tooltip:this._rb.getText("NOTETAKERCARD_BUTTON_OPEN_EDIT_TOOLTIP")});this._oEditButton.addStyleClass("sapSuiteUiCommonsNoteTakerCardEditButton");this._oDeleteButton=new B({id:this.getId()+"-delete-button",tooltip:this._rb.getText("NOTETAKERCARD_BUTTON_DELETE_TOOLTIP"),press:function(){t._handleDelete();}});this._oDeleteButton.addStyleClass("sapSuiteUiCommonsNoteTakerCardDeleteButton");this._oViewAllLink=new L({id:this.getId()+"-viewAll-link",text:this._rb.getText("NOTETAKERCARD_LINK_VIEW_ALL_TEXT"),tooltip:this._rb.getText("NOTETAKERCARD_LINK_VIEW_ALL_TOOLTIP"),press:function(){t._openOverlay();}});this._oOverlayCard=new O(this.getId()+"-overlay",{openButtonVisible:false,close:function(e){t._handleOverlayCloseEvent(e.getSource());e.preventDefault();}});this._oOverlayCard.addDelegate({onAfterRendering:function(){var o=q.sap.byId(t.getId()+"-overlayTimestamp");if(o){o.html(t.getFormattedTimestamp());}}});this._oOverlayCard._superOnsapselect=this._oOverlayCard.onsapselect;this._oOverlayCard.onsapselect=function(e){var a=e.srcControl.getId();if(a.indexOf("-overlayBody")<0&&a.indexOf("-inputTag")<0&&a.indexOf("-overlayCardTitle")<0){e.stopPropagation();e.preventDefault();}setTimeout(function(){t._oOverlayCard._superOnsapselect(e);},10);};this._oOverlayCard.addStyleClass("sapSuiteCommonsNoteTakerCardOverlayWindow");this._oOverlayCard._tagControls={};};N.prototype.exit=function(){this._oDeleteButton.destroy();this._oDeleteButton=null;this._oEditButton.destroy();this._oEditButton=null;this._oViewAllLink.destroy();this._oViewAllLink=null;this._oOverlayCard.destroy();this._oOverlayCard=null;};N.prototype.getFormattedTimestamp=function(){var l=sap.ui.getCore().getConfiguration().getLocale();var o=D.getDateTimeInstance({style:"medium"},l);return o.format(this.getTimestamp());};N.prototype._handleOverlayCloseEvent=function(o){if(o.bEditMode){var t=this;M.show(this._rb.getText("NOTETAKERCARD_CONFIRMATION_CANCEL_EDIT_MESSAGE"),M.Icon.QUESTION,this._rb.getText("NOTETAKERCARD_CONFIRMATION_CANCEL_EDIT_TITLE"),[M.Action.YES,M.Action.NO],function(r){if(r===M.Action.YES){t._closeOverlay();t._oEditButton.focus();}else{q.sap.focus(q.sap.domById(t.getId()+"-overlayBody"));}},M.Action.NO);}else{this._closeOverlay();}};N.prototype._closeOverlay=function(){this._oOverlayCard.close();this._destroyTagControls();this._oOverlayCard.bEditMode=false;this._oOverlayCard.destroyContent();};N.prototype._openOverlay=function(e){var i;if(!this._oOverlayCard.isOpen()){this._oOverlayCard.bThumbUp=this.getThumbUp();this._oOverlayCard.bThumbDown=this.getThumbDown();this._prepareOverlayLayouts();this._prepareOverlayToolbar(e);this._prepareOverlayHeaderBtns(e);this._prepareOverlayBody();this._prepareOverlayButtons(e);if(e){i=this.getId()+"-overlayBody";}else{i=this.getId()+"-overlay-close";}this._oOverlayCard.open(i);q.sap.byId(this.getId()+"-overlay-thumb-down-button").attr("aria-pressed",this.getThumbDown());q.sap.byId(this.getId()+"-overlay-thumb-up-button").attr("aria-pressed",this.getThumbUp());}};N.prototype._getFormattedBody=function(){var a=[];var t=this.getBody();var p;do{p=t.search(/[\s<>]/);var s="",w="";if(p<0){w=t;}else{w=t.slice(0,p);s=t.slice(p,p+1);t=t.slice(p+1);}switch(true){case(this._isFullUrl(w)):this.wrapFullUrl(a,w,s);break;case(this._isShortUrl(w)):this._wrapShortUrl(a,w,s);break;case(this._isEmail(w)):this._wrapEmail(a,w,s);break;default:a.push(q.sap.encodeHTML(w+s));}}while(p>=0);return a.join("");};N.prototype._isFullUrl=function(w){return/^(https?|ftp):\/\//i.test(w)&&q.sap.validateUrl(w);};N.prototype._isShortUrl=function(w){return/^(www\.)/i.test(w)&&q.sap.validateUrl("http://"+w);};N.prototype._isEmail=function(w){return/^[\w\.=-]+@[\w\.-]+\.[\w]{2,5}$/.test(w);};N.prototype.wrapFullUrl=function(a,w,s){a.push('<a class="sapUiLnk" ');a.push('href = '+'"'+q.sap.encodeHTML(w)+'"');a.push(' target = "_blank"');a.push('>');a.push(q.sap.encodeHTML(w));a.push('</a>'+s);};N.prototype._wrapShortUrl=function(a,w,s){a.push('<a class="sapUiLnk" ');a.push('href = '+'"'+q.sap.encodeHTML("http://"+w)+'"');a.push(' target = "_blank"');a.push('>');a.push(q.sap.encodeHTML(w));a.push('</a>'+s);};N.prototype._wrapEmail=function(a,w,s){a.push('<a class="sapUiLnk" ');a.push('href = "mailto:'+q.sap.encodeHTML(w)+'"');a.push('>');a.push(q.sap.encodeHTML(w));a.push('</a>'+s);};N.prototype._wrapBodyToDiv=function(t){return"<div class='sapSuiteUiCommonsNoteTakerCardBody'>"+t+"</div>";};N.prototype._wrapTagPanelToDiv=function(t,e){if(e){return"<div class='suiteUiNtcOverlayTagPanelEditMode'>"+t+"</div>";}else{return"<div class='suiteUiNtcOverlayTagPanelViewMode'>"+t+"</div>";}};N.prototype._handleEdit=function(){this._openOverlay(true);};N.prototype._getFormattedTags=function(){var a=[];var t;if(this._oOverlayCard.isOpen()){t=this._oOverlayCard._selectedTags;}else{t=this.getTags();}a.push("<div id='"+this.getId()+"-tag-list' class='sapSuiteUiCommonsNoteTakerCardTagList'>");if(t.length===0){a.push(this._rb.getText("NOTETAKERCARD_LABEL_TAGS_EMPTY"));}else{a.push(this._rb.getText("NOTETAKERCARD_LABEL_TAGS_FULL")+": ");var s=q.sap.encodeHTML(t.sort().join(" "));a.push("<span title='"+s+"'>");a.push(s);a.push("</span>");}a.push("</div>");return a.join("");};N.prototype._handleDelete=function(a){var t=this;M.show(this._rb.getText("NOTETAKERCARD_CONFIRMATION_DELETE_MESSAGE"),M.Icon.QUESTION,this._rb.getText("NOTETAKERCARD_CONFIRMATION_DELETE_TITLE"),[M.Action.YES,M.Action.NO],function(r){if(r===M.Action.YES){if(a){t._closeOverlay();}t._handleDeleteClick();}},M.Action.NO);};N.prototype._handleDeleteClick=function(){var e={};e.uid=this.getUid();e.cardId=this.getId();e.title=this.getHeader();e.timestamp=this.getTimestamp();e.body=this.getBody();e.thumbUp=this.getThumbUp();e.thumbDown=this.getThumbDown();this.fireDeleteNote(e);};N.prototype.setUid=function(u){this.setProperty("uid",u,true);return this;};N.prototype._wrapThumbToDiv=function(i){var s=null;var t=null;if(this.getThumbUp()&&!this.getThumbDown()){s="sapSuiteUiCommonsNoteTakerCardThumbUp";t=this._rb.getText("NOTETAKERCARD_ICON_THUMB_UP_TOOLTIP");this._oOverlayCard.removeStyleClass("suiteUiNtcNegativeCard");this._oOverlayCard.addStyleClass("suiteUiNtcPositiveCard");}else if(!this.getThumbUp()&&this.getThumbDown()){s="sapSuiteUiCommonsNoteTakerCardThumbDown";t=this._rb.getText("NOTETAKERCARD_ICON_THUMB_DOWN_TOOLTIP");this._oOverlayCard.removeStyleClass("suiteUiNtcPositiveCard");this._oOverlayCard.addStyleClass("suiteUiNtcNegativeCard");}else{this._oOverlayCard.removeStyleClass("suiteUiNtcPositiveCard");this._oOverlayCard.removeStyleClass("suiteUiNtcNegativeCard");}var a=[];a.push("<div");if(i){a.push(" id='");a.push(i);a.push("'");}if(s){a.push(" class='");a.push(s);a.push("'");a.push(" title='");a.push(t);a.push("'");}a.push("></div>");return a.join("");};N.prototype._handleAddTag=function(t){this._oOverlayCard._selectedTags=[];var n=t.split(new RegExp("\\s+"));var o={};for(var i=0;i<n.length;i++){if(n[i].length!==0){o[n[i]]=0;}}for(var a in o){this._oOverlayCard._selectedTags.push(a);}var e=sap.ui.getCore().byId(this.getId()+'-overlayTagPanel');e.setContent(this._wrapTagPanelToDiv(this._getFormattedTags(),true));this._adjustTagButton();};N.prototype._adjustTagButton=function(){var t=this._oOverlayCard._tagControls.tagButton;if(this._oOverlayCard._selectedTags.length){t.addStyleClass("sapSuiteUiCommonsNoteTakerFeederButtonSelected");}else{t.removeStyleClass("sapSuiteUiCommonsNoteTakerFeederButtonSelected");}};N.prototype._toggleTagPopup=function(){var s=this._oOverlayCard._selectedTags;if(this._bTagPopupOpen){q.sap.byId(this.getId()+"-selectTag-panel").slideToggle();this._focusDefaultControl();this._bTagPopupOpen=false;}else{this._addTagsToListBox(this.getAllTags());q.sap.byId(this.getId()+"-selectTag-panel").slideToggle();q.sap.byId(this.getId()+"-inputTag").val(s.length===0?"":s.join(" ")+" ");this._oOverlayCard._tagControls.tagInput.focus();this._bTagPopupOpen=true;}};N.prototype._focusDefaultControl=function(){this._oOverlayCard._tagControls.tagButton.focus();};N.prototype._handleTagInputLive=function(e){var l=e.getParameter("liveValue");var n=l.split(" ");var s=n[n.length-1];this._filterListBox(s);};N.prototype._filterListBox=function(i){if(i.length===0){this._addTagsToListBox(this.getAllTags());return;}var F=q.grep(this.getAllTags(),function(a){if(a.indexOf(i)>=0){return true;}});this._addTagsToListBox(F);};N.prototype._addTagsToListBox=function(t){var l=q.map(t,function(v,i){return new c({text:v});});this._oOverlayCard._tagControls.tagList.setItems(l,true);this._oOverlayCard._tagControls.tagList.rerender();};N.prototype._handleListSelect=function(e){var s=e.getParameter("selectedItem").getText();var t=this._oOverlayCard._tagControls.tagInput;var a=t.getValue();var n=a.split(" ");n.pop();if(n.length===0){t.setValue(s+" ");}else{t.setValue(n.join(" ")+" "+s+" ");}this._oOverlayCard._tagControls.tagList.setSelectedIndex(-1);t.focus();};N.prototype._destroyTagControls=function(){var t=this._oOverlayCard._tagControls;for(var a in t){t[a].destroy();}this._oOverlayCard._tagControls={};};N.prototype._createTagSelectorControl=function(){var t=this._oOverlayCard._tagControls;var o=new V({id:this.getId()+"-selectTag-panel"});o.addStyleClass("sapSuiteUiCommonsNoteTakerFeederSelectTagPanel");o.addStyleClass("sapUiShd");t.tagSelectorLayout=o;o.addContent(new H(this.getId()+"-selectTag-arrow",{content:"<div class='sapSuiteUiCommonsNoteTakerFeederSelectTagArrow' ></div>"}));o.addContent(new H(this.getId()+"-selectTag-header",{content:["<div class='sapSuiteUiCommonsNoteTakerFeederSelectTagHeader' >",this._rb.getText("NOTETAKERFEEDER_TOOLPOPUP_TITLE"),"</div>"].join("")}));o.addContent(t.tagInput);o.addContent(t.tagList);var a=new d();a.addStyleClass("sapSuiteUiCommonsNoteTakerFeederSelectTagButtons");a.addContent(t.tagApplyBtn);a.addContent(t.tagCancelBtn);o.addContent(a);return o;};N.prototype._prepareAttachmentPanel=function(i){var s=i?"-overlay":"";var a=i?"Overlay":"";var e=[this.getId(),s,"-attachmentPanel"].join("");var o=sap.ui.getCore().byId(e);if(o){o.destroy();}var A=new d(e);A.addStyleClass(["suiteUiNtc",a,"AttachmentPanel"].join(""));A.addContent(new H({content:"<div class='suiteUiNtcAttachmentIcon'></div>"}));var k=new L({id:[this.getId(),s,"-attachmentLink"].join(""),text:this.getAttachmentFilename(),tooltip:this._rb.getText("NOTETAKERCARD_LINK_ATTACHMENT_TOOLTIP"),press:this._handleAttachmentDownload,href:this.getAttachmentUrl()});k._ntc=this;A.addContent(k);return A;};N.prototype._prepareOverlayLayouts=function(){var t=new V();var o=new V();o.addStyleClass("sapSuiteUiCommonsNtcOverlayTitle");var a=new d();a.addStyleClass("sapSuiteUiCommonsNtcHeaderButtons");var e=new d(this.getId()+'-overlayHeader',{content:[o,a]});e.addStyleClass("sapSuiteUiCommonsNtcOverlayHeader");t.addContent(e);var i=new d(this.getId()+'-overlayToolbar');i.addStyleClass("suiteUiNtcToolbar");var k=new d();k.addStyleClass("suiteUiNtcOverlayToolbarLeftPanel");var l=new d();l.addStyleClass("suiteUiNtcOverlayToolbarRightPanel");i.addContent(k);i.addContent(l);t.addContent(i);this._oOverlayCard.addContent(t);var m=new f();m.addStyleClass("sapSuiteUiCommonsNoteTakerCardContent");var n=new d(this.getId()+"-buttons");n.addStyleClass("sapSuiteUiCommonsNoteTakerCardOverlayButtonPanel");this._oOverlayCard.layouts={topSection:t,headerLeft:o,headerRight:a,toolbar:i,toolbarLeft:k,toolbarRight:l,body:m,buttons:n};};N.prototype._prepareOverlayHeaderBtns=function(e){var t=this;var E=new B(this.getId()+"-editButton",{tooltip:this._rb.getText("NOTETAKERCARD_BUTTON_EDIT_TOOLTIP"),press:function(){t._fnEdit();}});t._oOverlayCard.layouts.headerRight.addContent(E,0);if(e){E.setEnabled(false);E.addStyleClass("sapSuiteUiCommonsNoteTakerCardEditButtonDsbl");}else{E.setEnabled(true);E.addStyleClass("sapSuiteUiCommonsNoteTakerCardEditButton");}var o=new B(this.getId()+"-deleteButton",{tooltip:this._rb.getText("NOTETAKERCARD_BUTTON_DELETE_TOOLTIP"),press:function(){t._handleDelete(true);}});o.addStyleClass("sapSuiteUiCommonsNoteTakerCardDeleteButton");t._oOverlayCard.layouts.headerRight.addContent(o,1);var a=new g(this.getId()+"-overlayTimestamp",{text:t.getFormattedTimestamp()});a.addStyleClass("sapSuiteUiCommonsNoteTakerCardTimestamp");t._oOverlayCard.layouts.headerLeft.addContent(a,1);};N.prototype._prepareOverlayToolbar=function(e){this._oOverlayCard._selectedTags=this.getTags();if(this.getAttachmentFilename()!==""){var a=this._prepareAttachmentPanel(true);this._oOverlayCard.layouts.topSection.addContent(a);this._oOverlayCard.layouts.body.addStyleClass("suiteUiNtcOverlayWithAttachment");}else{this._oOverlayCard.layouts.body.addStyleClass("suiteUiNtcOverlayWithoutAttachment");}};N.prototype._prepareOverlayBody=function(){this._oOverlayCard.addContent(this._oOverlayCard.layouts.body);};N.prototype._prepareOverlayButtons=function(e){var t=this;var o=new B(this.getId()+"-closeButton",{text:this._rb.getText("NOTETAKERCARD_BUTTON_CLOSE_OVERLAY"),tooltip:this._rb.getText("NOTETAKERCARD_BUTTON_CLOSE_OVERLAY_TOOLTIP"),press:function(){t._handleOverlayCloseEvent(t._oOverlayCard);}});o.addStyleClass("sapSuiteUiCommonsNoteTakerCardOverlayButtonClose");var s=new B(this.getId()+"-saveButton",{text:this._rb.getText("NOTETAKERCARD_BUTTON_SAVE_TEXT"),tooltip:this._rb.getText("NOTETAKERCARD_BUTTON_SAVE_TOOLTIP"),press:function(){t._fnSave();}});s.addStyleClass("sapSuiteUiCommonsNoteTakerCardOverlayButtonSave");t._oOverlayCard.layouts.buttons.addContent(o,0);t._oOverlayCard.layouts.buttons.addContent(s,1);if(e){s.setEnabled(true);this._fnCreateInEditMode();}else{s.setEnabled(false);this._fnCreateInViewMode();}this._oOverlayCard.addContent(this._oOverlayCard.layouts.buttons);};N.prototype._fnCreateInViewMode=function(){var t=this;t._oOverlayCard.bEditMode=false;var o=new g(t.getId()+"-overlayCardHeader",{text:t.getHeader()});o.addStyleClass("sapSuiteUiCommonsNoteTakerCardTitle");t._oOverlayCard.layouts.headerLeft.insertContent(o,0);var a=new H(t.getId()+'-overlayTagPanel');a.setContent(t._wrapTagPanelToDiv(t._getFormattedTags(),t._oOverlayCard.bEditMode));t._oOverlayCard.layouts.toolbarLeft.addContent(a);var e=new H({id:t.getId()+"-overlay-thumb",content:t._wrapThumbToDiv()});t._oOverlayCard.layouts.toolbarRight.addContent(e);var i=new H(t.getId()+"-overlayBody");i.setContent(t._wrapBodyToDiv(t._getFormattedBody()));i.addStyleClass("sapSuiteUiCommonsNoteTakerCardBody");t._oOverlayCard.layouts.body.addContent(i);var s=t._oOverlayCard.layouts.buttons.getContent()[1];s.setEnabled(false);var E=t._oOverlayCard.layouts.headerRight.getContent()[0];E.setEnabled(true);E.removeStyleClass("sapSuiteUiCommonsNoteTakerCardEditButtonDsbl");E.addStyleClass("sapSuiteUiCommonsNoteTakerCardEditButton");};N.prototype._fnCreateInEditMode=function(){var t=this;t._oOverlayCard.bEditMode=true;var o=new T(t.getId()+"-overlayCardTitle",{maxLength:50});o.setValue(t.getHeader());o.addStyleClass("sapSuiteUiCommonsNoteTakerCardTitle");var a=new I(t.getId()+"-overlayCardTitleEdit",{content:o,tooltip:t._rb.getText("NOTETAKERCARD_EDITFIELD_TITLE_TOOLTIP"),design:C.TextViewDesign.H2,undoEnabled:false});a.addStyleClass("sapSuiteUiCommonsNtcdTitleEdit");t._oOverlayCard.layouts.headerLeft.insertContent(a,0);var i=new H(t.getId()+'-overlayTagPanel');i.setContent(t._wrapTagPanelToDiv(t._getFormattedTags(),t._oOverlayCard.bEditMode));t._oOverlayCard.layouts.toolbarLeft.addContent(i);var k=new B({id:t.getId()+"-tag-button",tooltip:t._rb.getText("NOTETAKERCARD_BUTTON_TAG_TOOLTIP"),press:function(){t._toggleTagPopup();}});k.addStyleClass("sapSuiteUiCommonsNoteTakerFeederTagButton");var l=new h({id:t.getId()+"-tagListBox",visibleItems:10,width:"100%",height:"194px",select:function(e){t._handleListSelect(e);}});var m=new T({id:t.getId()+"-inputTag",liveChange:function(e){t._handleTagInputLive(e);}});m.onsapdown=function(e){e.preventDefault();e.stopPropagation();q("#"+t.getId()+"-tagListBox li:eq(0)").focus();};var n=new B({id:t.getId()+"-cancel-tags-button",text:t._rb.getText("NOTETAKERFEEDER_BUTTON_CANCEL_TAGS"),tooltip:t._rb.getText("NOTETAKERFEEDER_BUTTON_CANCEL_TAGS_TOOLTIP"),press:function(){t._toggleTagPopup();}});n.addStyleClass("sapSuiteUiCommonsNoteTakerFeederCancelTagButton");var A=new B({id:t.getId()+"-add-tags-button",text:t._rb.getText("NOTETAKERFEEDER_BUTTON_ADD_TAGS"),tooltip:t._rb.getText("NOTETAKERFEEDER_BUTTON_ADD_TAGS_TOOLTIP"),press:function(){t._handleAddTag(m.getValue());k.rerender();t._toggleTagPopup();}});t._oOverlayCard._tagControls={tagButton:k,tagList:l,tagInput:m,tagCancelBtn:n,tagApplyBtn:A};t._oOverlayCard.addContent(t._createTagSelectorControl());var p=new B({id:t.getId()+"-overlay-thumb-up-button",press:function(e){t._oOverlayCard.bThumbUp=!t._oOverlayCard.bThumbUp;if(t._oOverlayCard.bThumbUp){t._oOverlayCard.bThumbDown=false;}s();},tooltip:t._rb.getText("NOTETAKERFEEDER_BUTTON_THUMB_UP_TOOLTIP")});p.addStyleClass("sapSuiteUiCommonsNoteTakerThumbUpBtn");var r=new B({id:t.getId()+"-overlay-thumb-down-button",press:function(e){t._oOverlayCard.bThumbDown=!t._oOverlayCard.bThumbDown;if(t._oOverlayCard.bThumbDown){t._oOverlayCard.bThumbUp=false;}s();},tooltip:t._rb.getText("NOTETAKERFEEDER_BUTTON_THUMB_DOWN_TOOLTIP")});r.addStyleClass("sapSuiteUiCommonsNoteTakerThumbDownBtn");function s(){if(t._oOverlayCard.bThumbUp){p.addStyleClass("sapSuiteUiCommonsNoteTakerCardSelectedBtn");t._oOverlayCard.addStyleClass("suiteUiNtcPositiveCard");}else{p.removeStyleClass("sapSuiteUiCommonsNoteTakerCardSelectedBtn");t._oOverlayCard.removeStyleClass("suiteUiNtcPositiveCard");}if(t._oOverlayCard.bThumbDown){r.addStyleClass("sapSuiteUiCommonsNoteTakerCardSelectedBtn");t._oOverlayCard.addStyleClass("suiteUiNtcNegativeCard");}else{r.removeStyleClass("sapSuiteUiCommonsNoteTakerCardSelectedBtn");t._oOverlayCard.removeStyleClass("suiteUiNtcNegativeCard");}q.sap.byId(p.getId()).attr("aria-pressed",t._oOverlayCard.bThumbUp);q.sap.byId(r.getId()).attr("aria-pressed",t._oOverlayCard.bThumbDown);}s();t._oOverlayCard.layouts.toolbarLeft.insertContent(k,0);t._oOverlayCard.layouts.toolbarRight.addContent(p);t._oOverlayCard.layouts.toolbarRight.addContent(r);var S=t._oOverlayCard.layouts.buttons.getContent()[1];S.setEnabled(true);var u=new j(t.getId()+"-overlayBody",{required:true,liveChange:function(e){var v=e.getParameter("liveValue");var w=(v!==null)&&!/^\s*$/.test(v);if(w!==S.getEnabled()){S.setEnabled(w);}}});u.setValue(t.getBody());u.addStyleClass("sapSuiteUiCommonsNoteTakerCardBody");t._oOverlayCard.layouts.body.addContent(u);t._oOverlayCard.layouts.body.addContent(new g({required:true}).addStyleClass("sapSuiteRequiredLbl"));var E=t._oOverlayCard.layouts.headerRight.getContent()[0];E.setEnabled(false);E.removeStyleClass("sapSuiteUiCommonsNoteTakerCardEditButton");E.addStyleClass("sapSuiteUiCommonsNoteTakerCardEditButtonDsbl");};N.prototype._fnSave=function(){var t=this;var o=t._oOverlayCard.layouts.headerLeft.getContent()[0];var a=o.getContent();var e=t._oOverlayCard.layouts.body.getContent()[0];if(e.getValue()){if(!this.getBinding("body")){t.setHeader(a.getValue());t.setBody(e.getValue());t.setTimestamp(new Date());t.setThumbUp(t._oOverlayCard.bThumbUp);t.setThumbDown(t._oOverlayCard.bThumbDown);t.setTags(t._oOverlayCard._selectedTags);}var i={};i.uid=t.getUid();i.title=a.getValue();i.body=e.getValue();i.timestamp=new Date();i.thumbUp=t._oOverlayCard.bThumbUp;i.thumbDown=t._oOverlayCard.bThumbDown;i.tags=t._oOverlayCard._selectedTags;t.fireEditNote(i);t._oOverlayCard.layouts.headerLeft.removeContent(o);o.destroy();a.destroy();t._oOverlayCard.layouts.body.removeAllContent();e.destroy();t._destroyTagControls();t._oOverlayCard.layouts.toolbarLeft.destroyContent();t._oOverlayCard.layouts.toolbarRight.destroyContent();t._fnCreateInViewMode();q.sap.byId(t.getId()+"-overlayTimestamp").html(t.getFormattedTimestamp());q.sap.byId(t.getId()+"-overlay-close").focus();}};N.prototype._fnEdit=function(){var t=this;var o=t._oOverlayCard.layouts.headerLeft.getContent()[0];var a=t._oOverlayCard.layouts.body.getContent()[0];t._oOverlayCard.layouts.topSection.removeContent(o);o.destroy();t._oOverlayCard.layouts.body.removeContent(a);a.destroy();t._oOverlayCard.layouts.toolbarLeft.destroyContent();t._oOverlayCard.layouts.toolbarRight.destroyContent();t._fnCreateInEditMode();t._oOverlayCard.layouts.topSection.rerender();t._oOverlayCard.layouts.body.rerender();q.sap.focus(q.sap.domById(t.getId()+"-overlayBody"));};N.prototype._handleAttachmentDownload=function(){var e={};e.uid=this._ntc.getUid();e.url=this._ntc.getAttachmentUrl();e.filename=this._ntc.getAttachmentFilename();this._ntc.fireAttachmentClick(e);};return N;});
