sap.ui.define(["sap/suite/ui/generic/template/js/AnnotationHelper"],function(A){"use strict";function u(m){var c=0;for(var i in m){if(m.hasOwnProperty(i)){++c;if(c>3){return false;}}}return true;}function g(i,q,I){if(q.showCounts){return"{path: '_templPriv>/listReport/multipleViews/items/"+I.key+"', formatter: '._templateFormatters.formatItemTextForMultipleView'}";}return sap.suite.ui.generic.template.js.AnnotationHelper.getIconTabFilterText(i.getInterface(0),I);}function a(t){return"{= ${_templPriv>/listReport/multipleViews/mode} !== 'multi' || ${_templPriv>/listReport/multipleViews/selectedKey} === '"+t.key+"' }";}g.requiresIContext=true;sap.suite.ui.generic.template.js.AnnotationHelperMultipleViews={useSegmentedButton:u,getTextForItem:g,getVisibleForTableTabs:a};return sap.suite.ui.generic.template.js.AnnotationHelperMultipleViews;});
