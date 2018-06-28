sap.ui.define(['sap/ushell/renderers/fiori2/search/SearchConfiguration'],function(S){"use strict";var m=sap.ushell.renderers.fiori2.search.SearchLogger={};m.NavigationEvent=function(){this.init.apply(this,arguments);};m.NavigationEvent.prototype={init:function(p){var c=S.getInstance();this.sina=c.getSina();},_createUserHistoryEntry:function(t){function g(p){var l=p;for(var i=0,n=l.length;i<n;i++){var q=l[i];if(q.indexOf("sap-system")!==-1){var r=q.split("=");return{"System":r[1].slice(4,7),"Client":r[1].slice(8,-1)};}}}function a(H){return H.split("-")[0];}function b(H){return H.split("-")[1].split("&")[0];}function c(p){var l=p;var n=[];for(var i=0,q=l.length;i<q;i++){var r=l[i];if(r.indexOf("sap-system")!==-1){continue;}var v=r.split("=")[0];var w=r.split("=")[1];n.push({"Name":v,Value:w});}return n;}var u={"NavigationEventList":[{"SourceApplication":{"SemanticObjectType":"","Intent":"","ParameterList":[]}},{"TargetApplication":{"SemanticObjectType":"","Intent":"","ParameterList":[]}}]};var h=window.hasher.getHashAsArray();var s=a(h[0]);u.NavigationEventList[0].SourceApplication.SemanticObjectType=s;var d=b(h[0]);u.NavigationEventList[0].SourceApplication.Intent=d;var e=c(h[1].split("&"));u.NavigationEventList[0].SourceApplication.ParameterList=e;h=t.split("?");var f=a(h[0]).split("#")[1];u.NavigationEventList[1].TargetApplication.SemanticObjectType=f;var j=b(h[0]);u.NavigationEventList[1].TargetApplication.Intent=j;var k=c(h[1].split("&"));u.NavigationEventList[1].TargetApplication.ParameterList=k;var o=g(h[1].split("&"));u.NavigationEventList[1].TargetApplication=jQuery.extend(u.NavigationEventList[1].TargetApplication,o);return u;},addUserHistoryEntry:function(t){if(!t){return;}if(t.indexOf("#")===-1){return;}var s=this.sina.getSystem().getServices();if(s.PersonalizedSearch&&s.PersonalizedSearch.capabilities&&s.PersonalizedSearch.capabilities.SetUserStatus){var u=this._createUserHistoryEntry(t);this.sina.addUserHistoryEntry(u).done(function(d){}).fail(function(e){});}}};return m;});
