sap.ui.define(["sap/ui/fl/changeHandler/BaseRename","sap/ovp/changeHandler/HideCardContainer","sap/ovp/changeHandler/UnhideCardContainer","sap/ovp/changeHandler/UnhideControl"],function(B,H,U,a){"use strict";return{"moveControls":{"changeHandler":"default","layers":{"CUSTOMER_BASE":true,"CUSTOMER":true,"USER":true}},"unhideControl":a,"unhideCardContainer":U,"hideCardContainer":H,"cardSettings":{changeHandler:{applyChange:function(c,p,P){var m=P.appComponent.getRootControl(),M=m.getController(),C=c.getContent(),o=m.byId(C.cardId),b=o.getComponentInstance();b.destroy();M.recreateRTAClonedCard(C);return true;},completeChangeContent:function(c,s,p){return;}},layers:{"CUSTOMER_BASE":true,"CUSTOMER":true,"USER":true}},"manageCardsForEasyScanLayout":{changeHandler:{applyChange:function(c,p,P){var m=P.appComponent.getRootControl().getController();m.storeIncomingDeltaChanges(c.getContent());return true;},completeChangeContent:function(c,s,p){c.setContent(s.content);return;}},layers:{"USER":true}},"viewSwitch":{changeHandler:{applyChange:function(c,p,P){var m=P.appComponent.getRootControl().getController();m.appendIncomingDeltaChange(c);return true;},completeChangeContent:function(c,s,p){return;}},layers:{"USER":true}},"visibility":{changeHandler:{applyChange:function(c,p,P){var m=P.appComponent.getRootControl().getController();m.appendIncomingDeltaChange(c);return true;},completeChangeContent:function(c,s,p){return;}},layers:{"USER":true}},"position":{changeHandler:{applyChange:function(c,p,P){var m=P.appComponent.getRootControl().getController();m.appendIncomingDeltaChange(c);return true;},completeChangeContent:function(c,s,p){return;}},layers:{"USER":true}}};},true);
