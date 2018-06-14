jQuery.sap.declare("sap.zen.crosstab.HeaderResizer");
sap.zen.crosstab.HeaderResizer=function(c){"use strict";var t=this;var r=c.getRenderEngine();var j=null;var J=null;var R=0;var l=0;var o=0;var b=false;this.initialize=function(){J=c.getRenderSizeDiv();this.attachEvents();};this.attachEvents=function(){var a=$(document.getElementById(c.getId()+"_headerResizeHandle"));a.unbind("hover");a.hover(function(){a.addClass("sapzencrosstab-headerResizeHandleActive");},function(){if(!b){a.removeClass("sapzencrosstab-headerResizeHandleActive");}});a.unbind("mousedown",this.onMouseDown);a.bind("mousedown",this.onMouseDown);a.unbind("mousemove",this.onMouseMove);a.bind("mousemove",this.onMouseMove);a.unbind("mouseup",this.onMouseUp);a.bind("mouseup",this.onMouseUp);};this.onMouseUp=function(e){var m=r.getLeftAreaContainerWidth();var L;var w="";if(c.getPropertyBag().isRtl()){L=parseInt(j.css("right"),10);}else{L=parseInt(j.css("left"),10);}w=L+"";r.sendHeaderLimit(w,false);b=false;j.removeClass("sapzencrosstab-headerResizeHandleActive");j=null;$(document).unbind("mouseup",t.handleMouseUpHeaderResizeHandle);sap.zen.crosstab.utils.Utils.cancelEvent(e);};this.onMouseDown=function(e){j=$(e.currentTarget);R=J.outerWidth();l=r.getLeftAreaContainerWidth();o=e.clientX;$(document).on("mouseup",t.handleMouseUpHeaderResizeHandle);sap.zen.crosstab.utils.Utils.cancelEvent(e);};this.onMouseMove=function(e){var O;var d;var n;var m;var M=c.getPropertyBag().getMaxHeaderWidth();if(j){b=true;if(c.getPropertyBag().isRtl()){O=parseInt(j.css("right"),10);d=o-e.clientX;}else{O=parseInt(j.css("left"),10);d=e.clientX-o;}o=e.clientX;m=Math.min(l,R);if(M>0){m=Math.min(m,M);}n=Math.max(1,Math.min(O+d,m));if(c.getPropertyBag().isRtl()){j.css("right",n+"px");}else{j.css("left",n+"px");}sap.zen.crosstab.utils.Utils.cancelEvent(e);}};this.isResizeAction=function(){return b;};};
