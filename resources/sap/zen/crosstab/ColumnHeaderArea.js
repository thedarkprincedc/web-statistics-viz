jQuery.sap.declare("sap.zen.crosstab.ColumnHeaderArea");jQuery.sap.require("sap.zen.crosstab.BaseArea");jQuery.sap.require("sap.zen.crosstab.rendering.RenderingConstants");
sap.zen.crosstab.ColumnHeaderArea=function(c){"use strict";sap.zen.crosstab.BaseArea.call(this,c);this.sAreaType=sap.zen.crosstab.rendering.RenderingConstants.TYPE_COLUMN_HEADER_AREA;this.iRenderStartCol=0;this.iRenderColCnt=0;this.bLastPageLoaded=false;};
sap.zen.crosstab.ColumnHeaderArea.prototype=jQuery.sap.newObject(sap.zen.crosstab.BaseArea.prototype);
sap.zen.crosstab.ColumnHeaderArea.prototype.renderArea=function(r){this.renderContainerStructure(r,"sapzencrosstab-ColumnHeaderArea",false,this.oCrosstab.isHCutOff());};
sap.zen.crosstab.ColumnHeaderArea.prototype.getSelectedCellsBySelectionCoordinates=function(r,c){var C=this.oDataModel.getCellWithSpan(r,c);var R={};if(C){R[C.getId()]=C;var s=C.getColSpan();var S=C.getRow()+1;var a=this.getRowCnt()-S;var b=0;var d=null;for(var i=0;i<s;i++){b=C.getCol()+i;d=this.oDataModel.getCellsByCol(b,S,a);for(var j=0;j<d.length;j++){R[d[j].getId()]=d[j];}}return R;}};
sap.zen.crosstab.ColumnHeaderArea.prototype.getSelectedCellsByDataSelection=function(d){var r={};var s=0;var e=this.getRowCnt();var c=d.getCol();for(var R=s;R<e;R++){var C=this.oDataModel.getCellWithSpan(R,c);r[C.getId()]=C;}return r;};
