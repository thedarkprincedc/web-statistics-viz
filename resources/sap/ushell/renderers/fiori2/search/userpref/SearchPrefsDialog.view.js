sap.ui.define(["sap/m/MessageBox"],function(){"use strict";return sap.ui.jsview("sap.ushell.renderers.fiori2.search.userpref.SearchPrefsDialog",{createContent:function(c){var t=this;var u=new sap.m.Label({text:sap.ushell.resources.i18n.getText("sp.userProfilingField")+':'});var s=new sap.m.Switch({state:{path:"/sessionUserActive",mode:sap.ui.model.BindingMode.TwoWay},enabled:{parts:[{path:'/searchPrefsActive'},{path:'/personalizationPolicy'}],formatter:function(b,p){var m=t.getModel();if(b&&p!==m.personalizationPolicyEnforced&&p!==m.personalizationPolicyDisabled){return true;}else{return false;}},mode:sap.ui.model.BindingMode.OneWay},ariaLabelledBy:u});this.resetButton=new sap.m.Button({text:sap.ushell.resources.i18n.getText("sp.clearCollectedData"),press:this.resetHistory.bind(this),visible:{parts:[{path:'/searchPrefsActive'},{path:'/personalizationPolicy'}],formatter:function(b,p){var m=t.getModel();if(!b){return false;}if(p===m.personalizationPolicyOptIn||p===m.personalizationPolicyOptOut){return true;}return false;},mode:sap.ui.model.BindingMode.OneWay}});var l=new sap.ui.layout.VerticalLayout({content:[new sap.m.Text({text:'{/explanationText}',visible:{parts:[{path:'/searchPrefsActive'},{path:'/personalizationPolicy'}],formatter:function(b,p){var m=t.getModel();if(!b){return false;}if(p===m.personalizationPolicyEnforced||p===m.personalizationPolicyDisabled){return true;}return false;}}}),new sap.m.Text({text:sap.ushell.resources.i18n.getText('sp.disclaimer')})]});var a=[u,s,l,this.resetButton];return a;},resetHistory:function(){var t=this;this.getModel().resetProfile().then(function(){t.resetButton.setEnabled(false);},function(r){var e=sap.ushell.resources.i18n.getText('sp.resetFailed');if(r.statusText&&r.statusText.length>0&&r.statusText!=='OK'){e+='\n'+r.statusText+'\n'+t.formatErrorResponse(r.responseText);}sap.m.MessageBox.show(e,{title:sap.ushell.resources.i18n.getText("sp.resetFailedTitle"),icon:sap.m.MessageBox.Icon.ERROR,actions:[sap.m.MessageBox.Action.OK]});});},formatErrorResponse:function(r){var p;try{p=JSON.parse(r);}catch(e){return r;}if(!p.ErrorDetails){return r;}var a=[];for(var i=0;i<p.ErrorDetails.length;++i){var b=p.ErrorDetails[i];a.push(b.Message+' ('+b.Code+')');}return a.join('\n');},switchChangeHandler:function(e){var s=e.getSource();if(s.getState()){return;}var i=sap.ushell.resources.i18n;var d=i.getText("sp.disable");sap.m.MessageBox.confirm(i.getText('sp.disablingUserProfilingMsg'),{title:sap.ushell.resources.i18n.getText("sp.disableUserProfiling"),icon:sap.m.MessageBox.Icon.QUESTION,actions:[d,sap.m.MessageBox.Action.CANCEL],onClose:function(a){if(a==sap.m.MessageBox.Action.CANCEL){s.setState(true);}}});},openMessageBox:function(){var t=this;var i=sap.ushell.resources.i18n;var c=i.getText("sp.clear");sap.m.MessageBox.confirm(i.getText('sp.profileWillBeReset'),{title:sap.ushell.resources.i18n.getText("sp.clearCollectedData"),icon:sap.m.MessageBox.Icon.QUESTION,actions:[c,sap.m.MessageBox.Action.CANCEL],onClose:function(a){if(a==c){t.getModel().resetProfile();}}});}});});
