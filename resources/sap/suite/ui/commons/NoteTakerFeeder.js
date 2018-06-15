/*!
 * 
		SAP UI development toolkit for HTML5 (SAPUI5)
		(c) Copyright 2009-2015 SAP SE. All rights reserved
	
 */
sap.ui.define(['jquery.sap.global','sap/ui/commons/library','sap/ui/core/Control','sap/ui/commons/Button','sap/ui/commons/Label','sap/ui/commons/ListBox','sap/ui/commons/TextField','sap/ui/commons/TextArea','sap/ui/commons/FileUploader','sap/suite/ui/commons/NoteTakerCard','sap/ui/commons/Link','sap/ui/core/ListItem'],function(q,C,b,B,L,c,T,d,F,N,f,g){"use strict";var h=b.extend("sap.suite.ui.commons.NoteTakerFeeder",{metadata:{deprecated:true,library:"sap.suite.ui.commons",properties:{body:{type:"string",group:"Data",defaultValue:null},title:{type:"string",group:"Data",defaultValue:null},tags:{type:"object",group:"Misc",defaultValue:[]},thumbUp:{type:"boolean",group:"Misc",defaultValue:null},thumbDown:{type:"boolean",group:"Misc",defaultValue:null},attachmentUploadUrl:{type:"string",group:"Misc",defaultValue:null},attachmentName:{type:"string",group:"Misc",defaultValue:'attachment'}},aggregations:{bodyArea:{type:"sap.ui.core.Control",multiple:false,visibility:"hidden"},titleInput:{type:"sap.ui.core.Control",multiple:false,visibility:"hidden"},fileUploader:{type:"sap.ui.core.Control",multiple:false,visibility:"hidden"},tagInput:{type:"sap.ui.core.Control",multiple:false,visibility:"hidden"}},events:{addNote:{parameters:{title:{type:"string"},body:{type:"string"},timestamp:{type:"object"},thumbUp:{type:"boolean"},thumbDown:{type:"boolean"},attachmentFilename:{type:"string"}}},attachmentSelect:{parameters:{filename:{type:"string"}}},attachmentUploadComplete:{parameters:{response:{type:"string"}}},attachmentDelete:{parameters:{filename:{type:"string"}}},attachmentClick:{parameters:{filename:{type:"string"}}}}}});h.prototype.init=function(){this._rb=sap.ui.getCore().getLibraryResourceBundle("sap.suite.ui.commons");this._selectedTags=[];this._bTagPopupOpen=false;var t=this;this._oAddButton=new B({id:this.getId()+"-add-button",text:this._rb.getText("NOTETAKERFEEDER_BUTTON_ADD_TEXT"),tooltip:this._rb.getText("NOTETAKERFEEDER_BUTTON_ADD_TOOLTIP"),press:function(){t._handleAdd();}});this._oAddButton.addStyleClass("sapSuiteUiCommonsNoteTakerFeederHeaderAddButton");this._oTagList=new c({id:this.getId()+"-tagListBox",visibleItems:10,width:"100%",height:"194px",select:function(e){t._handleListSelect(e);}});this._oTagInput=new T({id:this.getId()+"-inputTag",liveChange:function(e){t._handleTagInputLive(e);}});this.setAggregation("tagInput",this._oTagInput);this._oTagInput.onsapdown=function(e){e.preventDefault();e.stopPropagation();q("#"+t.getId()+"-tagListBox li:eq(0)").focus();};this._oCancelTagButton=new B({id:this.getId()+"-cancel-tags-button",text:this._rb.getText("NOTETAKERFEEDER_BUTTON_CANCEL_TAGS"),tooltip:this._rb.getText("NOTETAKERFEEDER_BUTTON_CANCEL_TAGS_TOOLTIP"),press:function(){t._toggleTagPopup();}});this._oCancelTagButton.addStyleClass("sapSuiteUiCommonsNoteTakerFeederCancelTagButton");this._oCancelTagButton.onfocusout=function(e){t._oTagInput.focus();};this._oAddTagButton=new B({id:this.getId()+"-add-tags-button",text:this._rb.getText("NOTETAKERFEEDER_BUTTON_ADD_TAGS"),tooltip:this._rb.getText("NOTETAKERFEEDER_BUTTON_ADD_TAGS_TOOLTIP"),press:function(){t._handleAddTag(t._oTagInput.getValue());t._oTagButton.rerender();t._toggleTagPopup();}});this._oTagButton=new B({id:this.getId()+"-tag-button",tooltip:this._rb.getText("NOTETAKERFEEDER_BUTTON_TAG_TOOLTIP"),press:function(){t._toggleTagPopup();}});this._oTagButton.addStyleClass("sapSuiteUiCommonsNoteTakerFeederTagButton");this._oTitle=new T({id:this.getId()+"-title-field",placeholder:this._rb.getText("NOTETAKERFEEDER_PLACEHOLDER_HEADER")+"...",maxLength:50});this.setAggregation("titleInput",this._oTitle);this._oBody=new d({id:this.getId()+"-body-field",placeholder:this._rb.getText("NOTETAKERFEEDER_PLACEHOLDER_BODY")+"...",required:true,liveChange:function(e){t._setAddButtonEnabled(e.mParameters["liveValue"],null);}});this.setAggregation("bodyArea",this._oBody);this._oThumbUpButton=new B({id:this.getId()+"-thumb-up-button",press:function(e){t._handleThumbUpButtonPress();},tooltip:this._rb.getText("NOTETAKERFEEDER_BUTTON_THUMB_UP_TOOLTIP")});this._oThumbUpButton.addStyleClass("sapSuiteUiCommonsNoteTakerFeederThumbUpButton");this._oThumbDownButton=new B({id:this.getId()+"-thumb-down-button",press:function(e){t._handleThumbDownButtonPress();},tooltip:this._rb.getText("NOTETAKERFEEDER_BUTTON_THUMB_DOWN_TOOLTIP")});this._oThumbDownButton.addStyleClass("sapSuiteUiCommonsNoteTakerFeederThumbDownButton");this._oFileUploader=new F({id:this.getId()+"-attach",uploadOnChange:false,name:this.getAttachmentName(),change:function(e){t._disableAddAttachBtn();var n=e.getParameter("newValue");t._oAttachmentLink.setText(n);t._oAttachmentLink.rerender();t._handleAddAttachUI();var a={};a.filename=n;t.fireAttachmentSelect(a);t._oTitle.focus();},uploadComplete:function(e){t._handleUploadComplete(e);}});this._oFileUploader.onfocusin=function(e){t._oTitle.focus();};this._oFileUploader.oBrowse.setText("");this.setAggregation("fileUploader",this._oFileUploader);this._oAddAttachButton=new B({id:this.getId()+"-attach-button",press:function(e){q.sap.domById(t._oFileUploader.getId()+"-fu").click();},tooltip:t._rb.getText("NOTETAKER_BUTTON_ATTACH_TOOLTIP")});this._oAddAttachButton.addStyleClass("sapSuiteUiCommonsNtAttachIcon");this._oAttachmentLoadingLabel=new L({id:this.getId()+"-loading-label",text:this._rb.getText("NOTETAKERFEEDER_LABEL_ATTACHMENT_LOADING")+"..."});this._oDeleteAttachButton=new B({id:this.getId()+"-delete-attach-button",lite:true,press:function(e){t._handleDeleteAttachUI();var a={filename:t._oFileUploader.getName()};t.fireAttachmentDelete(a);},tooltip:this._rb.getText("NOTETAKERFEEDER_BUTTON_DELETE_ATTACHMENT")});this._oAttachmentLink=new f({id:this.getId()+"-attachmentLink",tooltip:this._rb.getText("NOTETAKERFEEDER_LINK_ATTACHMENT_TOOLTIP"),press:function(e){var a={filename:t._oFileUploader.getName()};t.fireAttachmentClick(a);},width:"200px"});this._oRequiredLbl=new L({required:true}).addStyleClass("sapSuiteRequiredLbl");};h.prototype.exit=function(){this._oAddButton.destroy();this._oTitle.destroy();this._oBody.destroy();this._oTagButton.destroy();this._oTagList.destroy();this._oTagInput.destroy();this._oCancelTagButton.destroy();this._oAddTagButton.destroy();this._oThumbUpButton.destroy();this._oThumbDownButton.destroy();this._oFileUploader.destroy();this._oAddAttachButton.destroy();this._oAttachmentLoadingLabel.destroy();this._oDeleteAttachButton.destroy();this._oAttachmentLink.destroy();this._oRequiredLbl.destroy();};h.prototype._handleAdd=function(){if(this.getBody()){var e={};e.title=this.getTitle();e.body=this.getBody();e.timestamp=this._getTimestamp();e.tags=this._selectedTags;e.thumbUp=this.getThumbUp();e.thumbDown=this.getThumbDown();e.attachmentFilename=this._oFileUploader.getValue();this.setTitle("");this.setBody("");this.setThumbDown(false);this.setThumbUp(false);this._oFileUploader.setValue("");this._enableAddAttachBtn();this.fireAddNote(e);q(this._oFileUploader.oFileUpload).show();this._handleClearTag();}else{this._setAddButtonEnabled(this.getBody());}};h.prototype._getTimestamp=function(){return new Date();};h.prototype.setTitle=function(t){this._oTitle.setValue(t);return this;};h.prototype.getTitle=function(){return q.sap.byId(this.getId()+"-title-field").hasClass('sapSuiteUiCommonsPlaceholder')?"":this._oTitle.getValue();};h.prototype.setBody=function(s){this._oBody.setValue(s);return this;};h.prototype.getBody=function(){return this._isBodyPlaceholderActive()?"":this._oBody.getValue();};h.prototype._applyPlaceholder=function(){q('[data-placeholder]').focus(function(){var i=q(this);if(i.hasClass('sapSuiteUiCommonsPlaceholder')){i.val('');i.removeClass('sapSuiteUiCommonsPlaceholder');}}).blur(function(){var i=q(this);if(q.sap.equal(i.val(),'')||q.sap.equal(i.val(),i.attr('data-placeholder'))){i.addClass('sapSuiteUiCommonsPlaceholder');i.val(i.attr('data-placeholder'));}}).blur();};h.prototype._isBodyPlaceholderActive=function(){return q.sap.byId(this.getId()+"-body-field").hasClass('sapSuiteUiCommonsPlaceholder');};h.prototype._setAddButtonEnabled=function(s,n){var e=s!==null&&!this._isBodyPlaceholderActive()&&!/^\s*$/.test(s);if(e!==this._oAddButton.getEnabled()){this._oAddButton.setEnabled(e);if(!n){this._oAddButton.rerender();}}};h.prototype._adjustUploaderForIe=function(){this._oFileUploader.superOnkeydown=this._oFileUploader.onkeydown;this._oFileUploader.onkeydown=function(e){var k=e.keyCode,a=q.sap.KeyCodes;if(k!==a.SPACE&&k!==a.ENTER){this.superOnkeydown(e);}};q(this._oFileUploader.oFilePath.getDomRef()).hide();q(this._oFileUploader.oBrowse.getDomRef()).hide();q(this._oAddAttachButton.getDomRef()).attr("tabindex","-1");var t=this;q(this._oFileUploader.oFileUpload).attr("tabindex","0").attr("title",this._rb.getText("NOTETAKER_BUTTON_ATTACH_TOOLTIP")).focus(function(){this.hasFocus=true;q(t._oAddAttachButton.getDomRef()).addClass("sapUiBtnStdFocus");}).focusout(function(){this.hasFocus=false;q(t._oAddAttachButton.getDomRef()).removeClass("sapUiBtnStdFocus");}).hover(function(){q(t._oAddAttachButton.getDomRef()).addClass("sapUiBtnStdFocus");},function(){if(!this.hasFocus){q(t._oAddAttachButton.getDomRef()).removeClass("sapUiBtnStdFocus");}q(t._oAddAttachButton.getDomRef()).removeClass("sapSuiteUiCommonsNoteTakerFeederButtonSelected");}).mousedown(function(){q(t._oAddAttachButton.getDomRef()).addClass("sapSuiteUiCommonsNoteTakerFeederButtonSelected").addClass("sapUiBtnAct");}).mouseup(function(){q(t._oAddAttachButton.getDomRef()).removeClass("sapSuiteUiCommonsNoteTakerFeederButtonSelected");});q(this._oFileUploader.oFileUpload).keydown(function(e){var a=q.sap.KeyCodes;if(e.keyCode===a.TAB){if(e.shiftKey){t._oThumbDownButton.focus();}else{t._oTitle.focus();}e.preventDefault();e.stopPropagation();}});};h.prototype._setAriaInfo=function(){q.sap.byId(this._oThumbUpButton.getId()).attr("aria-pressed",this.getThumbUp());q.sap.byId(this._oThumbDownButton.getId()).attr("aria-pressed",this.getThumbDown());q.sap.byId(this._oTitle.getId()).attr("aria-label",this._rb.getText("NOTETAKERFEEDER_PLACEHOLDER_HEADER"));q.sap.byId(this._oBody.getId()).attr("aria-label",this._rb.getText("NOTETAKERFEEDER_PLACEHOLDER_BODY"));q(this._oFileUploader.oFileUpload).attr("aria-label",this._rb.getText("NOTETAKER_BUTTON_ATTACH_TOOLTIP"));};h.prototype.onAfterRendering=function(){this._applyPlaceholder();this._adjustPopupState();if(this._oFileUploader.getValue()){q.sap.byId(this.getId()+"-attachment-panel").show();q.sap.byId(this.getId()+"-attachment-loading").hide();q.sap.byId(this.getId()+"-attachment-delete").show();}q.sap.byId(this._oFileUploader.getId()).addClass("sapSuiteUiCommonsNtfUploader");this._setAriaInfo();if(q.browser.msie){this._adjustUploaderForIe();}};h.prototype.onBeforeRendering=function(){this._setAddButtonEnabled(this.getBody(),true);this._setThumbButtonsView();};h.prototype.getFormattedTags=function(){return N.prototype._getFormattedTags();};h.prototype._adjustPopupState=function(){if(this._bTagPopupOpen){q.sap.byId(this.getId()+"-selectTag-panel").show();}};h.prototype._handleAddTag=function(t){this._selectedTags=[];var n=t.split(new RegExp("\\s+"));var o={};for(var i=0;i<n.length;i++){if(n[i].length!==0){o[n[i]]=0;}}for(var a in o){this._selectedTags.push(a);}if(this._oTagButton){this._adjustTagButton();}};h.prototype._adjustTagButton=function(){if(this._selectedTags.length){this._oTagButton.setTooltip(this._rb.getText("NOTETAKERFEEDER_BUTTON_ADD_TAGS_SELECTED_TOOLTIP")+": "+this._selectedTags.join(" "));this._oTagButton.addStyleClass("sapSuiteUiCommonsNoteTakerFeederButtonSelected");}else{this._oTagButton.setTooltip(this._rb.getText("NOTETAKERFEEDER_BUTTON_TAG_TOOLTIP"));this._oTagButton.removeStyleClass("sapSuiteUiCommonsNoteTakerFeederButtonSelected");}};h.prototype._handleClearTag=function(){if(this._oTagInput){this._oTagInput.setValue("");}if(this._oTagList){this._oTagList.clearSelection();}this._selectedTags=[];if(this._oTagButton){this._adjustTagButton();}};h.prototype.setTags=function(t){this.setProperty("tags",t,true);return this;};h.prototype._toggleTagPopup=function(){if(this._bTagPopupOpen){q.sap.byId(this.getId()+"-selectTag-panel").slideToggle();this._focusDefaultControl();this._bTagPopupOpen=false;}else{this._addTagsToListBox(this.getTags());q.sap.byId(this.getId()+"-selectTag-panel").slideToggle();q.sap.byId(this.getId()+"-inputTag").val(this._selectedTags.length===0?"":this._selectedTags.join(" ")+" ");this._oTagInput.focus();this._bTagPopupOpen=true;}};h.prototype._focusDefaultControl=function(){this._oTagButton.focus();};h.prototype._handleTagInputLive=function(e){var l=e.getParameter("liveValue");var n=l.split(" ");var s=n[n.length-1];this._filterListBox(s);};h.prototype._filterListBox=function(i){if(i.length===0){this._addTagsToListBox(this.getTags());return;}var e=q.grep(this.getTags(),function(a){return a.indexOf(i)>=0;});this._addTagsToListBox(e);};h.prototype._addTagsToListBox=function(t){var l=q.map(t,function(v,i){return new g({text:v});});this._oTagList.setItems(l,true);this._oTagList.rerender();};h.prototype._handleListSelect=function(e){var s=e.getParameter("selectedItem").getText();var t=this._oTagInput.getValue();var n=t.split(" ");n.pop();if(n.length===0){this._oTagInput.setValue(s+" ");}else{this._oTagInput.setValue(n.join(" ")+" "+s+" ");}this._oTagList.setSelectedIndex(-1);this._oTagInput.focus();};h.prototype._setThumbButtonsView=function(){if(this.getThumbUp()){this._oThumbUpButton.addStyleClass("sapSuiteUiCommonsNoteTakerFeederButtonSelected");}else{this._oThumbUpButton.removeStyleClass("sapSuiteUiCommonsNoteTakerFeederButtonSelected");}if(this.getThumbDown()){this._oThumbDownButton.addStyleClass("sapSuiteUiCommonsNoteTakerFeederButtonSelected");}else{this._oThumbDownButton.removeStyleClass("sapSuiteUiCommonsNoteTakerFeederButtonSelected");}};h.prototype._handleThumbUpButtonPress=function(){this.setThumbUp(!this.getThumbUp());if(this.getThumbUp()){this.setThumbDown(false);}};h.prototype._handleThumbDownButtonPress=function(){this.setThumbDown(!this.getThumbDown());if(this.getThumbDown()){this.setThumbUp(false);}};h.prototype._disableAddAttachBtn=function(){this._oAddAttachButton.setEnabled(false);this._oAddAttachButton.removeStyleClass("sapSuiteUiCommonsNtAttachIcon");this._oAddAttachButton.addStyleClass("sapSuiteUiCommonsNtDsblAttachIcon");this._oAddAttachButton.setTooltip("");this._oAddAttachButton.rerender();};h.prototype._enableAddAttachBtn=function(){this._oAddAttachButton.setEnabled(true);this._oAddAttachButton.removeStyleClass("sapSuiteUiCommonsNtDsblAttachIcon");this._oAddAttachButton.addStyleClass("sapSuiteUiCommonsNtAttachIcon");this._oAddAttachButton.setTooltip(this._rb.getText("NOTETAKER_BUTTON_ATTACH_TOOLTIP"));this._oAddAttachButton.rerender();if(q.browser.msie){q.sap.byId(this._oAddAttachButton.getId()).attr("tabindex","-1");}};h.prototype._handleAddAttachUI=function(){q(this._oFileUploader.oFileUpload).hide();q.sap.byId(this.getId()+"-attachment-loading").show("fast");q.sap.byId(this.getId()+"-body").animate({height:"332px"},300);q.sap.byId(this.getId()+"-attachment-panel").slideDown({duration:300,queue:false});};h.prototype._handleDeleteAttachUI=function(){q(this._oFileUploader.oFileUpload).show();q.sap.byId(this.getId()+"-body").animate({height:"352px"},300);q.sap.byId(this.getId()+"-attachment-delete").hide("fast");q.sap.byId(this.getId()+"-attachment-panel").hide({duration:300,queue:false});this._enableAddAttachBtn();this._oFileUploader.setValue("");this._oFileUploader.addStyleClass("sapSuiteUiCommonsNtfUploader");this._oAttachmentLink.setText("");this._oAddAttachButton.focus();};h.prototype.handleUploadResponse=function(r){};h.prototype._handleUploadComplete=function(e){q.sap.byId(this.getId()+"-attachment-loading").hide("fast");q.sap.byId(this.getId()+"-attachment-delete").show("fast");var a={response:e.getParameter("response")};this.fireAttachmentUploadComplete(a);};h.prototype.setAttachmentUploadUrl=function(u){this._oFileUploader.setUploadUrl(u);return this;};h.prototype.getAttachmentUploadUrl=function(){return this._oFileUploader.getUploadUrl();};return h;});