/*!
 * Copyright (c) 2009-2017 SAP SE, All Rights Reserved
 */
sap.ui.define(['jquery.sap.global'],function(q){"use strict";var S={};S.render=function(r,s){var i=s.getId(),c,a=(window.innerWidth>0)?window.innerWidth:screen.width,b=(window.innerHeight>0)?window.innerHeight:screen.height;r.write("<div");r.writeControlData(s);r.addClass("sapUshellShell");if(s.getShowAnimation()){r.addClass("sapUshellShellAnim");}if(!s.getHeaderVisible()){r.addClass("sapUshellShellNoHead");}r.addClass("sapUshellShellHead"+(s._showHeader?"Visible":"Hidden"));r.writeClasses();r.write(">");if(!s.getShowBrandLine()){r.write("<div id='",i,"-strgbg' class='sapUshellShellBG sapContrastPlus"+(s._useStrongBG?" sapUiStrongBackgroundColor":"")+"'></div>");r.write("<div class='sapUiShellBackgroundImage sapUiGlobalBackgroundImageForce sapUshellShellBG sapContrastPlus'></div>");}if(s.getEnableCanvasShapes()){r.write("<canvas id='",i,"-shapes' height='",b,"'width='",a,"' style='position: absolute;'>");r.write("</canvas>");}if(s.getShowBrandLine()){r.write("<hr id='",i,"-brand' class='sapUshellShellBrand'/>");}r.write("<header id='",i,"-hdr'  class='sapContrastPlus sapUshellShellHead'><div>");r.write("<div id='",i,"-hdrcntnt' class='sapUshellShellCntnt'>");if(s.getHeader()){r.renderControl(s.getHeader());}r.write("</div>","</div>","</header>");if(s.getToolArea()){r.write("<aside>");r.renderControl(s.getToolArea());r.write("</aside>");}if(s.getRightFloatingContainer()){r.write("<aside>");r.renderControl(s.getRightFloatingContainer());r.write("</aside>");}c="sapUshellShellCntnt sapUshellShellCanvas";if(s.getBackgroundColorForce()){c+=" sapUiShellBackground sapUiGlobalBackgroundColorForce";}r.write("<div id='",i,"-cntnt' class='"+c+"'>");if(s.getShowBrandLine()){r.write("<div id='",i,"-strgbg' class='sapUshellShellBG sapContrastPlus"+(s._useStrongBG?" sapUiStrongBackgroundColor":"")+"'></div>");r.write("<div class='sapUiShellBackgroundImage sapUiGlobalBackgroundImageForce sapUshellShellBG sapContrastPlus'></div>");}r.renderControl(s.getCanvasSplitContainer());r.write("</div>");r.write("<span id='",i,"-main-focusDummyOut' tabindex='-1'></span>");r.renderControl(s.getFloatingActionsContainer());r.write("</div>");};return S;},true);