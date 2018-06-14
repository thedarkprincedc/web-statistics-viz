/*!
 * Copyright (c) 2009-2017 SAP SE, All Rights Reserved
 */
sap.ui.define(['sap/ushell/library','sap/ushell/resources','sap/ushell/ui/launchpad/AccessibilityCustomData','sap/ushell/ui/launchpad/ActionItem','sap/ushell/services/AppConfiguration','sap/ushell/services/Container'],function(l,r,A,a,b,C){"use strict";var E=a.extend("sap.ushell.ui.footerbar.EndUserFeedback",{metadata:{library:"sap.ushell",properties:{showAnonymous:{type:"boolean",group:"Misc",defaultValue:true},anonymousByDefault:{type:"boolean",group:"Misc",defaultValue:true},showLegalAgreement:{type:"boolean",group:"Misc",defaultValue:true},showCustomUIContent:{type:"boolean",group:"Misc",defaultValue:true},feedbackDialogTitle:{type:"string",group:"Misc",defaultValue:null},textAreaPlaceholder:{type:"string",group:"Misc",defaultValue:null}},aggregations:{customUIContent:{type:"sap.ui.core.Control",multiple:true,singularName:"customUIContent"}}}});E.prototype.init=function(){if(a.prototype.init){a.prototype.init.apply(this,arguments);}var u=sap.ushell.Container.getUser(),f=sap.ushell.utils.getFormFactor();this.oUserDetails={userId:u.getId(),eMail:u.getEmail()};this.translationBundle=r.i18n;this.oEndUserFeedbackService=sap.ushell.Container.getService("EndUserFeedback");this.appConfiguration=b;this.oEndUserFeedbackModel=new sap.ui.model.json.JSONModel();this.oEndUserFeedbackModel.setData({feedbackViewTitle:this.translationBundle.getText("userFeedback_title"),legalAgreementViewTitle:this.translationBundle.getText("userFeedbackLegal_title"),textAreaPlaceholderText:this.translationBundle.getText("feedbackPlaceHolderHeader"),presentationStates:{showAnonymous:this.getShowAnonymous(),showLegalAgreement:this.getShowLegalAgreement(),showCustomUIContent:this.getShowCustomUIContent()},clientContext:{userDetails:jQuery.extend(true,{},this.oUserDetails),navigationData:{formFactor:f,applicationInformation:{},navigationHash:null}},isAnonymous:this.getAnonymousByDefault(),applicationIconPath:'',leftButton:{feedbackView:this.translationBundle.getText("sendBtn"),legalAgreementView:this.translationBundle.getText("approveBtn")},rightButton:{feedbackView:this.translationBundle.getText("cancelBtn"),legalAgreementView:this.translationBundle.getText("declineBtn")},states:{isLegalAgreementChecked:false,isRatingSelected:false,isInFeedbackView:true},technicalLink:{state:0,title:[this.translationBundle.getText("technicalDataLink"),this.translationBundle.getText("technicalDataLinkHide")]},textArea:{inputText:''},contextText:'',ratingButtons:[{text:r.i18n.getText("ratingExcellentText"),color:'sapUshellRatingLabelFeedbackPositiveText',iconSymbol:'sap-icon://BusinessSuiteInAppSymbols/icon-face-very-happy',id:'rateBtn1',index:1},{text:r.i18n.getText("ratingGoodText"),color:'sapUshellRatingLabelFeedbackPositiveText',iconSymbol:'sap-icon://BusinessSuiteInAppSymbols/icon-face-happy',id:'rateBtn2',index:2},{text:r.i18n.getText("ratingAverageText"),color:'sapUshellRatingLabelFeedbackNeutralText',iconSymbol:'sap-icon://BusinessSuiteInAppSymbols/icon-face-neutral',id:'rateBtn3',index:3},{text:r.i18n.getText("ratingPoorText"),color:'sapUshellRatingLabelFeedbackCriticalText',iconSymbol:'sap-icon://BusinessSuiteInAppSymbols/icon-face-bad',id:'rateBtn4',index:4},{text:r.i18n.getText("ratingVeyPoorText"),color:'sapUshellRatingLabelFeedbackNegativeText',iconSymbol:'sap-icon://BusinessSuiteInAppSymbols/icon-face-very-bad',id:'rateBtn5',index:5}],selectedRating:{text:'',color:'',index:0}});this.setIcon('sap-icon://marketing-campaign');this.setText(r.i18n.getText("endUserFeedbackBtn"));this.attachPress(this.ShowEndUserFeedbackDialog);this.setEnabled();};E.prototype.ShowEndUserFeedbackDialog=function(){sap.ui.require(['sap/ui/layout/form/SimpleForm','sap/ui/layout/form/SimpleFormLayout','sap/ui/layout/HorizontalLayout','sap/ui/layout/VerticalLayout','sap/m/TextArea','sap/m/Link','sap/m/Label','sap/m/Text','sap/m/Dialog','sap/m/Button','sap/m/Image','sap/m/Bar','sap/m/SegmentedButton','sap/m/CheckBox'],function(S,c,H,V,T,L,d,e,D,B,I,f,g,h){var i,j,s,k,u,m,n,o;i=function(){var F=[],q=this.oEndUserFeedbackModel.getProperty('/clientContext/navigationData/formFactor'),U=this.oEndUserFeedbackModel.getProperty('/clientContext/userDetails/userId'),t=this.oEndUserFeedbackModel.getProperty('/clientContext/userDetails/eMail'),v=this.oEndUserFeedbackModel.getProperty('/clientContext/navigationData/applicationInformation/url'),w=this.oEndUserFeedbackModel.getProperty('/clientContext/navigationData/applicationInformation/applicationType'),x=this.oEndUserFeedbackModel.getProperty('/clientContext/navigationData/applicationInformation/additionalInformation'),N=this.oEndUserFeedbackModel.getProperty('/clientContext/navigationData/navigationHash'),y=this.getModel().getProperty("/currentState/stateName"),z=(y==="home"||y==="catalog")?false:true;F.push(new e({text:this.translationBundle.getText("loginDetails")}).addStyleClass('sapUshellContactSupportHeaderInfoText'));F.push(U?new d({text:this.translationBundle.getText("userFld")}):null);F.push(U?new e('technicalInfoUserIdTxt',{text:'{/clientContext/userDetails/userId}'}):null);F.push(t?new d({text:this.translationBundle.getText("eMailFld")}):null);F.push(t?new e({text:'{/clientContext/userDetails/eMail}'}):null);F.push(q?new d({text:this.translationBundle.getText('formFactorFld')}):null);F.push(q?new e({text:'{/clientContext/navigationData/formFactor}'}):null);F.push(new e({text:''}));F.push(new e({text:this.translationBundle.getText(this.currentApp?'applicationInformationFld':'feedbackHeaderText')}).addStyleClass('sapUshellEndUserFeedbackHeaderInfoText').addStyleClass("sapUshellEndUserFeedbackInfoTextSpacing"));F.push(v&&z?new d({text:this.translationBundle.getText("urlFld")}):null);F.push(v&&z?new e({text:'{/clientContext/navigationData/applicationInformation/url}'}):null);F.push(w?new d({text:this.translationBundle.getText("applicationTypeFld")}):null);F.push(w?new e({text:'{/clientContext/navigationData/applicationInformation/applicationType}'}):null);F.push(x?new d({text:this.translationBundle.getText("additionalInfoFld")}):null);F.push(x?new e({text:'{/clientContext/navigationData/applicationInformation/additionalInformation}'}):null);F.push(N&&z?new d({text:this.translationBundle.getText("hashFld")}):null);F.push(N&&z?new e({text:'{/clientContext/navigationData/navigationHash}'}):null);return F.filter(Boolean);}.bind(this);j=function(){this.oTechnicalInfoBox=new S('feedbackTechnicalInfoBox',{layout:c.ResponsiveLayout,content:i()});if(sap.ui.Device.os.ios&&sap.ui.Device.system.phone){this.oTechnicalInfoBox.addStyleClass("sapUshellContactSupportFixWidth");}var q=this.oTechnicalInfoBox.onAfterRendering;this.oTechnicalInfoBox.onAfterRendering=function(){q.apply(this,arguments);var t=jQuery(this.getDomRef());t.attr("tabIndex",0);jQuery.sap.delayedCall(700,t,function(){this.focus();});};return new H('technicalInfoBoxLayout',{visible:{path:'/technicalLink/state',formatter:function(t){return t===1;}},content:[this.oTechnicalInfoBox]});}.bind(this);u=function(){this.oTechnicalInfoBox.destroyContent();this.oTechnicalInfoBox.removeAllContent();var t=i(),q;for(q in t){this.oTechnicalInfoBox.addContent(t[q]);}this.oRatingButtons.setSelectedButton('noDefalut');}.bind(this);m=jQuery.sap.getModulePath("sap.ushell");n=m+'/themes/base/img/launchpadDefaultIcon.jpg';o=this.oEndUserFeedbackModel.getProperty('/clientContext/navigationData/formFactor')==='desktop';this.updateModelContext();if(this.oDialog){u();this.oDialog.open();return;}this.oLegalAgreementInfoLayout=null;this.oBackButton=new B('endUserFeedbackBackBtn',{visible:{path:"/states/isInFeedbackView",formatter:function(q){return!q;}},icon:sap.ui.core.IconPool.getIconURI("nav-back"),press:function(){this.oEndUserFeedbackModel.setProperty('/states/isInFeedbackView',true);}.bind(this),tooltip:r.i18n.getText("feedbackGoBackBtn_tooltip")});this.oPopoverTitle=new e("PopoverTitle",{text:{parts:[{path:'/states/isInFeedbackView'},{path:'/feedbackViewTitle'}],formatter:function(q){return this.oEndUserFeedbackModel.getProperty(q?"/feedbackViewTitle":"/legalAgreementViewTitle");}.bind(this)}});this.oHeadBar=new f({contentLeft:[this.oBackButton],contentMiddle:[this.oPopoverTitle]});this.oLogoImg=new I('sapFeedbackLogo',{src:n,width:'4.5rem',height:'4.5rem',visible:{path:'/applicationIconPath',formatter:function(q){return!q;}}});this.oAppIcon=new sap.ui.core.Icon('sapFeedbackAppIcon',{src:'{/applicationIconPath}',width:'4.5rem',height:'4.5rem',visible:{path:'/applicationIconPath',formatter:function(q){return!!q;}}}).addStyleClass("sapUshellFeedbackAppIcon");this.oContextName=new e('contextName',{text:'{/contextText}'});this.oContextLayout=new H('contextLayout',{content:[this.oLogoImg,this.oAppIcon,this.oContextName]});this.oRatingLabel=new d('ratingLabel',{required:true,text:r.i18n.getText("ratingLabelText")});this.oRatingSelectionText=new e('ratingSelectionText',{text:{path:'/selectedRating',formatter:function(q){if(this.lastSelectedColor){this.removeStyleClass(this.lastSelectedColor);}if(q.color){this.addStyleClass(q.color);}this.lastSelectedColor=q.color;return q.text;}}});this.oRatingButtonTemplate=new B({icon:'{iconSymbol}',height:'100%',width:'20%',tooltip:'{text}'});this.oRatingButtonTemplate.addCustomData(new A({key:"aria-label",value:'{text}',writeToDom:true}));this.oRatingButtons=new g('ratingButtons',{selectedButton:'noDefalut',buttons:{path:"/ratingButtons",template:this.oRatingButtonTemplate},select:function(q){var t=q.mParameters.id,P=sap.ui.getCore().byId(t).getBindingContext().getPath(),v=this.oEndUserFeedbackModel.getProperty(P);this.oEndUserFeedbackModel.setProperty('/selectedRating',{text:v.text,color:v.color,index:v.index});this.oEndUserFeedbackModel.setProperty('/states/isRatingSelected',true);}.bind(this)});this.oRatingButtons.addAriaLabelledBy("ratingLabel");this.oRatingButtons.addCustomData(new A({key:"aria-required",value:'true',writeToDom:true}));if(o){this.oRatingIndicationLayout=new H('ratingIndicationLayout',{content:[this.oRatingLabel,this.oRatingSelectionText]});}else{this.oRatingIndicationLayout=new V('ratingIndicationLayoutMob',{content:[this.oRatingLabel,this.oRatingSelectionText]});}this.oRatingLayout=new V('ratingLayout',{width:"100%",content:[this.oRatingIndicationLayout,this.oRatingButtons]});this.oAnonymousCheckbox=new h('anonymousCheckbox',{name:'anonymousCheckbox',visible:'{/presentationStates/showAnonymous}',text:r.i18n.getText("feedbackSendAnonymousText"),selected:!this.oEndUserFeedbackModel.getProperty("/isAnonymous"),select:function(q){var t=q.getParameter("selected");this._handleAnonymousSelection(!t);}.bind(this)});var p=(!this.oEndUserFeedbackModel.getProperty("/presentationStates/showAnonymous")||this.oEndUserFeedbackModel.getProperty("/isAnonymous"));this._handleAnonymousSelection(p);this.oLegalAgrementCheckbox=new h('legalAgreement',{name:'legalAgreement',visible:'{/presentationStates/showLegalAgreement}',selected:'{/states/isLegalAgreementChecked}',text:this.translationBundle.getText("agreementAcceptanceText")});this.oLegalAgreeementLink=new L('legalAgreementLink',{text:this.translationBundle.getText("legalAgreementLinkText"),visible:'{/presentationStates/showLegalAgreement}',press:function(){var P=this.oEndUserFeedbackService.getLegalText();P.done(s.bind(this));}.bind(this)});this.aCustomUIContent=jQuery.extend([],this.getCustomUIContent());this.oCustomUILayout=new V('customUILayout',{visible:{path:'/presentationStates/showCustomUIContent',formatter:function(q){return(q&&this.aCustomUIContent.length)?true:false;}.bind(this)},content:this.getCustomUIContent(),width:"100%"});this.oLegalLayout=new V('legalLayout',{content:[this.oAnonymousCheckbox,this.oLegalAgrementCheckbox,this.oLegalAgreeementLink]});this.oTechnicalDataLink=new L('technicalDataLink',{text:{path:'/technicalLink/state',formatter:function(q){return this.getModel().getProperty('/technicalLink/title/'+q);}},press:function(){var _=this.oEndUserFeedbackModel.getProperty("/technicalLink/state");this.oEndUserFeedbackModel.setProperty('/technicalLink/state',Math.abs(_-1));this.oDialog.rerender();}.bind(this)});this.oTechnicalDataLayout=new H('technicalDataLayout',{content:[this.oTechnicalDataLink]});this.leftButton=new B("EndUserFeedbackLeftBtn",{text:{path:"/states/isInFeedbackView",formatter:function(q){return this.getModel().getProperty('/leftButton/'+(q?'feedbackView':'legalAgreementView'));}},enabled:{parts:[{path:'/states/isInFeedbackView'},{path:'/states/isLegalAgreementChecked'},{path:'/states/isRatingSelected'},{path:'/presentationStates/showLegalAgreement'}],formatter:function(q,t,v,w){return!q||(v&&(t||!w));}},press:function(){var q=this.oEndUserFeedbackModel.getProperty("/states/isInFeedbackView");if(q){var F={feedbackText:this.oEndUserFeedbackModel.getProperty('/textArea/inputText'),ratings:[{questionId:"Q10",value:this.oEndUserFeedbackModel.getProperty('/selectedRating/index')}],clientContext:this.oEndUserFeedbackModel.getProperty('/clientContext'),isAnonymous:this.oEndUserFeedbackModel.getProperty('/isAnonymous')},t=this.oEndUserFeedbackService.sendFeedback(F);t.done(function(){sap.ushell.Container.getService("Message").info(this.translationBundle.getText('feedbackSendToastTxt'));}.bind(this));t.fail(function(){sap.ushell.Container.getService("Message").error(this.translationBundle.getText('feedbackFailedToastTxt'));}.bind(this));this.oDialog.close();}else{this.oEndUserFeedbackModel.setProperty('/states/isInFeedbackView',true);this.oEndUserFeedbackModel.setProperty('/states/isLegalAgreementChecked',true);}}.bind(this)});this.rightButton=new B("EndUserFeedbackRightBtn",{text:{path:"/states/isInFeedbackView",formatter:function(q){return this.getModel().getProperty('/rightButton/'+(q?'feedbackView':'legalAgreementView'));}},press:function(){var q=this.oEndUserFeedbackModel.getProperty("/states/isInFeedbackView");if(q){this.oDialog.close();}else{this.oEndUserFeedbackModel.setProperty('/states/isInFeedbackView',true);this.oEndUserFeedbackModel.setProperty('/states/isLegalAgreementChecked',false);}}.bind(this)});this.oTextArea=new T("feedbackTextArea",{rows:6,value:'{/textArea/inputText}',placeholder:'{/textAreaPlaceholderText}'});this.oDialog=new D({id:"UserFeedbackDialog",contentWidth:"25rem",leftButton:this.leftButton,rightButton:this.rightButton,stretch:sap.ui.Device.system.phone,initialFocus:"textArea",afterOpen:function(){jQuery("#textArea").on("focusout",function(){window.scrollTo(0,0);});}}).addStyleClass("sapUshellEndUserFeedbackDialog");this.oDialog.setModel(this.oEndUserFeedbackModel);this.oDialog.setCustomHeader(this.oHeadBar);this.oDialog.addCustomData(new A({key:"aria-label",value:this.translationBundle.getText("endUserFeedbackAreaLabel"),writeToDom:true}));this.oTechnicalInfoBoxLayout=j();this.oFeedbackLayout=new V('feedbackLayout',{visible:'{/states/isInFeedbackView}',content:[this.oContextLayout,this.oRatingLayout,this.oTextArea,this.oTechnicalDataLayout,this.oTechnicalInfoBoxLayout,this.oLegalLayout,this.oCustomUILayout]}).addStyleClass("sapUshellFeedbackLayout");this.oMainLayout=new V("mainLayout",{editable:false,content:[this.oFeedbackLayout]});this.oDialog.addContent(this.oMainLayout);this.oDialog.open();s=function(q){this.oEndUserFeedbackModel.setProperty('/states/isInFeedbackView',false);if(!this.oLegalAgreementInfoLayout){k(q);}};k=function(q){this.oLegalText=new T('legalText',{cols:50,rows:22});this.oLegalText.setValue([q]);this.oLegalText.setEditable(false);var t=this.oLegalText.onAfterRendering;this.oLegalText.onAfterRendering=function(){if(t){t.apply(this,arguments);}var v=jQuery(this.getDomRef());v.find("textarea").attr("tabindex","0");};this.oLegalAgreementInfoLayout=new V('legalAgreementInfoLayout',{visible:{path:"/states/isInFeedbackView",formatter:function(v){return!v;}},content:[this.oLegalText]});this.oMainLayout.addContent(this.oLegalAgreementInfoLayout);}.bind(this);}.bind(this));};E.prototype._handleAnonymousSelection=function(i){var c=this.translationBundle.getText('feedbackAnonymousTechFld');this.oEndUserFeedbackModel.setProperty('/isAnonymous',i);this.oEndUserFeedbackModel.setProperty('/clientContext/userDetails/eMail',i?c:this.oUserDetails.eMail);this.oEndUserFeedbackModel.setProperty('/clientContext/userDetails/userId',i?c:this.oUserDetails.userId);};E.prototype.addCustomUIContent=function(c){var i=c&&c.getMetadata&&c.getMetadata().getStereotype&&c.getMetadata().getStereotype()==='control';if(i){if(this.getShowCustomUIContent()){this.oEndUserFeedbackModel.setProperty('/presentationStates/showCustomUIContent',true);}this.addAggregation('customUIContent',c);}};E.prototype.setShowAnonymous=function(v){if(typeof v==='boolean'){this.oEndUserFeedbackModel.setProperty('/presentationStates/showAnonymous',v);this.setProperty('showAnonymous',v,true);}};E.prototype.setAnonymousByDefault=function(v){if(typeof v==='boolean'){this.oEndUserFeedbackModel.setProperty('/isAnonymous',v);this.setProperty('anonymousByDefault',v,true);}};E.prototype.setShowLegalAgreement=function(v){if(typeof v==='boolean'){this.oEndUserFeedbackModel.setProperty('/presentationStates/showLegalAgreement',v);this.setProperty('showLegalAgreement',v,true);}};E.prototype.setShowCustomUIContent=function(v){if(typeof v==='boolean'){this.oEndUserFeedbackModel.setProperty('/presentationStates/showCustomUIContent',v);this.setProperty('showCustomUIContent',v,true);}};E.prototype.setFeedbackDialogTitle=function(v){if(typeof v==='string'){this.oEndUserFeedbackModel.setProperty('/feedbackViewTitle',v);this.setProperty('feedbackDialogTitle',v,true);}};E.prototype.setTextAreaPlaceholder=function(v){if(typeof v==='string'){this.oEndUserFeedbackModel.setProperty('/textAreaPlaceholderText',v);this.setProperty('textAreaPlaceholder',v,true);}};E.prototype.updateModelContext=function(){var u=sap.ushell.Container.getService("URLParsing"),h,p,i,c,s,U;h=u.getShellHash(window.location);p=u.parseShellHash(h);i=(p!==undefined)?p.semanticObject+"-"+p.action:"";c=this.getModel().getProperty("/currentState/stateName");if(c==="home"||c==="catalog"){s=this.translationBundle.getText(c+'_title');}this.currentApp=this.appConfiguration.getCurrentAppliction();this.bHasAppName=(this.currentApp&&this.appConfiguration.getMetadata(this.currentApp)&&this.appConfiguration.getMetadata(this.currentApp).title);this.sAppIconPath=(this.currentApp&&this.appConfiguration.getMetadata(this.currentApp)&&this.appConfiguration.getMetadata(this.currentApp).icon);this.oEndUserFeedbackModel.setProperty('/contextText',this.bHasAppName?this.appConfiguration.getMetadata(this.currentApp).title:this.translationBundle.getText('feedbackHeaderText'));U=null;if(this.currentApp&&this.currentApp.url){U=this.currentApp.url.split('?')[0];}else if(c){U=this.translationBundle.getText("flp_page_name");}this.oEndUserFeedbackModel.setProperty('/clientContext/navigationData/applicationInformation',{url:U,additionalInformation:(this.currentApp&&this.currentApp.additionalInformation)?this.currentApp.additionalInformation:null,applicationType:(this.currentApp&&this.currentApp.applicationType)?this.currentApp.applicationType:null});this.oEndUserFeedbackModel.setProperty('/clientContext/navigationData/navigationHash',s?s:i);this.oEndUserFeedbackModel.setProperty('/selectedRating',{text:'',color:'',index:0});this.oEndUserFeedbackModel.setProperty('/states/isRatingSelected',false);this.oEndUserFeedbackModel.setProperty('/states/isLegalAgreementChecked',false);this.oEndUserFeedbackModel.setProperty('/technicalLink/state',0);this.oEndUserFeedbackModel.setProperty('/textArea/inputText','');this.oEndUserFeedbackModel.setProperty('/applicationIconPath',this.sAppIconPath);this._handleAnonymousSelection(this.oEndUserFeedbackModel.getProperty('/isAnonymous'));};E.prototype.setEnabled=function(e){if(!sap.ushell.Container){if(this.getEnabled()){jQuery.sap.log.warning("Disabling 'End User Feedback' button: unified shell container not initialized",null,"sap.ushell.ui.footerbar.EndUserFeedback");}e=false;}a.prototype.setEnabled.call(this,e);};return E;});
