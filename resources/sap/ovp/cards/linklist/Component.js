(function(){"use strict";jQuery.sap.declare("sap.ovp.cards.linklist.Component");jQuery.sap.require("sap.ovp.cards.generic.Component");jQuery.sap.require("sap.ovp.cards.linklist.AnnotationHelper");sap.ovp.cards.generic.Component.extend("sap.ovp.cards.linklist.Component",{metadata:{properties:{"contentFragment":{"type":"string","defaultValue":"sap.ovp.cards.linklist.LinkList"},"communicationPath":{"type":"string","defaultValue":"com.sap.vocabularies.Communication.v1.Contact"},"headerAnnotationPath":{"type":"string","defaultValue":"com.sap.vocabularies.UI.v1.HeaderInfo"},"identificationAnnotationPath":{"type":"string","defaultValue":"com.sap.vocabularies.UI.v1.Identification"}},version:"1.52.6",library:"sap.ovp",includes:[],dependencies:{libs:[],components:[]},config:{},customizing:{"sap.ui.controllerExtensions":{"sap.ovp.cards.generic.Card":{controllerName:"sap.ovp.cards.linklist.LinkList"}}}},getCustomPreprocessor:function(){}});})();