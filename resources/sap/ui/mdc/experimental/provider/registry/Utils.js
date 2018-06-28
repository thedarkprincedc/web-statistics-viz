/*
 * ! SAP UI development toolkit for HTML5 (SAPUI5)

(c) Copyright 2009-2017 SAP SE. All rights reserved
 */
sap.ui.define(["sap/ui/core/Control","sap/m/library","sap/ui/mdc/experimental/provider/model/ModelAdapter"],function(C,l,M){"use strict";var I=l.InputType;return{convertToInputType:function(a){switch(a.semantics){case M.Semantics.password:return I.Password;case M.Semantics.eMail:return I.Email;case M.Semantics.phoneNumber:return I.Tel;case M.Semantics.url:return I.Url;default:var u=a.ui5Type;switch(u){case"sap.ui.model.odata.type.Int16":case"sap.ui.model.odata.type.Int32":case"sap.ui.model.odata.type.Int64":case"sap.ui.model.odata.type.Decimal":case"sap.ui.model.odata.type.Double":return I.Number;case"sap.ui.model.odata.type.TimeOfDay":return I.Time;case"sap.ui.model.odata.type.DateTime":case"sap.ui.model.odata.type.DateTimeBase":return I.DateTime;case"sap.ui.model.odata.type.DateTimeOffset":case"sap.ui.model.odata.type.Date":return I.Date;default:return I.Text;}}},getNameSpaceInfo:function(c){var n={};n.className=c;var m=c.split(".");n.localName=m.pop();n.nameSpace=m.join(".");return n;},className:function(x){var a=x.localName||x.baseName||x.nodeName;if(!a){return undefined;}return x.namespaceURI+"."+a;}};});