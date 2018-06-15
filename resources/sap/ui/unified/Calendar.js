/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2017 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/core/Control','sap/ui/core/LocaleData','sap/ui/unified/calendar/CalendarUtils','./calendar/Header','./calendar/Month','./calendar/MonthPicker','./calendar/YearPicker','./calendar/CalendarDate','./library','sap/ui/Device','sap/ui/core/format/DateFormat','sap/ui/core/ResizeHandler','sap/ui/core/Locale'],function(q,C,L,a,H,M,b,Y,c,l,D,d,R,e){"use strict";var f=C.extend("sap.ui.unified.Calendar",{metadata:{library:"sap.ui.unified",properties:{intervalSelection:{type:"boolean",group:"Behavior",defaultValue:false},singleSelection:{type:"boolean",group:"Behavior",defaultValue:true},months:{type:"int",group:"Appearance",defaultValue:1},firstDayOfWeek:{type:"int",group:"Appearance",defaultValue:-1},nonWorkingDays:{type:"int[]",group:"Appearance",defaultValue:null},primaryCalendarType:{type:"sap.ui.core.CalendarType",group:"Appearance",defaultValue:null},secondaryCalendarType:{type:"sap.ui.core.CalendarType",group:"Appearance",defaultValue:null},width:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null},minDate:{type:"object",group:"Misc",defaultValue:null},maxDate:{type:"object",group:"Misc",defaultValue:null},showWeekNumbers:{type:"boolean",group:"Appearance",defaultValue:true}},aggregations:{selectedDates:{type:"sap.ui.unified.DateRange",multiple:true,singularName:"selectedDate"},specialDates:{type:"sap.ui.unified.DateTypeRange",multiple:true,singularName:"specialDate"},disabledDates:{type:"sap.ui.unified.DateRange",multiple:true,singularName:"disabledDate"},header:{type:"sap.ui.unified.calendar.Header",multiple:false,visibility:"hidden"},month:{type:"sap.ui.unified.calendar.Month",multiple:true,visibility:"hidden"},monthPicker:{type:"sap.ui.unified.calendar.MonthPicker",multiple:false,visibility:"hidden"},yearPicker:{type:"sap.ui.unified.calendar.YearPicker",multiple:false,visibility:"hidden"}},associations:{ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"},legend:{type:"sap.ui.unified.CalendarLegend",multiple:false}},events:{select:{},cancel:{},startDateChange:{}}}});f.prototype.init=function(){this._iBreakPointTablet=D.media._predefinedRangeSets[D.media.RANGESETS.SAP_STANDARD_EXTENDED].points[0];this._iBreakPointDesktop=D.media._predefinedRangeSets[D.media.RANGESETS.SAP_STANDARD_EXTENDED].points[1];this._iBreakPointLargeDesktop=D.media._predefinedRangeSets[D.media.RANGESETS.SAP_STANDARD_EXTENDED].points[2];var s=sap.ui.getCore().getConfiguration().getCalendarType();this.setProperty("primaryCalendarType",s);this.setProperty("secondaryCalendarType",s);this._iMode=0;this._oYearFormat=d.getDateInstance({format:"y",calendarType:s});this.data("sap-ui-fastnavgroup","true",true);this._oMinDate=a._minDate(this.getPrimaryCalendarType());this._oMaxDate=a._maxDate(this.getPrimaryCalendarType());this._initializeHeader();var i=this._createMonth(this.getId()+"--Month0");i.attachEvent("focus",this._handleFocus,this);i.attachEvent("select",m,this);i.attachEvent("_renderMonth",k,this);i.attachEvent("_bindMousemove",n,this);i.attachEvent("_unbindMousemove",o,this);i._bNoThemeChange=true;this.addAggregation("month",i);this._initilizeMonthPicker();this._initilizeYearPicker();this._resizeProxy=q.proxy(p,this);this._oSelectedMonth;};f.prototype.exit=function(){if(this._sInvalidateMonth){q.sap.clearDelayedCall(this._sInvalidateMonth);}if(this._sResizeListener){R.deregister(this._sResizeListener);this._sResizeListener=undefined;}this._oSelectedMonth=null;};f.prototype._initializeHeader=function(){var i=new H(this.getId()+"--Head");i.attachEvent("pressPrevious",this._handlePrevious,this);i.attachEvent("pressNext",this._handleNext,this);i.attachEvent("pressButton1",this._handleButton1,this);i.attachEvent("pressButton2",this._handleButton2,this);this.setAggregation("header",i);};f.prototype._initilizeMonthPicker=function(){var i=new b(this.getId()+"--MP");i.attachEvent("select",this._selectMonth,this);i._bNoThemeChange=true;this.setAggregation("monthPicker",i);};f.prototype._initilizeYearPicker=function(){var y=new Y(this.getId()+"--YP");y.attachEvent("select",this._selectYear,this);this.setAggregation("yearPicker",y);};f.prototype._createMonth=function(i){var s=new M(i,{width:"100%"});s.attachEvent("datehovered",this._handleDateHovered,this);return s;};f.prototype._handleDateHovered=function(E){var s=this.getAggregation("month"),t=E.getParameter("date1"),u=E.getParameter("date2"),i;for(i=0;i<s.length;i++){s[i]._markDatesBetweenStartAndHoveredDate(t,u);}};f.prototype.onBeforeRendering=function(){var s=this.getAggregation("month");var t;var u=s[0].getDate();var F=this._getFocusedDate();if(s.length>1&&u){t=c.fromLocalJSDate(u,this.getPrimaryCalendarType());}else if(s.length>1){t=r.call(this,this._getFocusedDate());}else{t=F;}for(var i=0;i<s.length;i++){u=new c(t);if(i>0){u.setDate(1);u.setMonth(u.getMonth()+i);}var v=u;if(F.getYear()===u.getYear()&&F.getMonth()===u.getMonth()){v=F;}s[i].displayDate(v.toLocalJSDate());s[i].setShowWeekNumbers(this.getShowWeekNumbers());}this._updateHeader(t);this._iSize=0;};f.prototype.onAfterRendering=function(E){if(!this._getSucessorsPickerPopup()){g.call(this);}if(j.call(this)>1||this._bInitMonth){E.size={width:this.getDomRef().offsetWidth};p.call(this,E,true);if(!this._sResizeListener){this._sResizeListener=R.register(this,this._resizeProxy);}this._bInitMonth=undefined;}};f.prototype.invalidate=function(O){if(!this._bDateRangeChanged&&(!O||!(O instanceof sap.ui.unified.DateRange))){C.prototype.invalidate.apply(this,arguments);}else if(this.getDomRef()&&this._iMode==0&&!this._sInvalidateMonth){this._sInvalidateMonth=q.sap.delayedCall(0,this,this._invalidateMonth,[O]);}};f.prototype.removeSelectedDate=function(s){this._bDateRangeChanged=true;return this.removeAggregation("selectedDates",s);};f.prototype.removeAllSelectedDates=function(){this._bDateRangeChanged=true;var i=this.removeAllAggregation("selectedDates");return i;};f.prototype.destroySelectedDates=function(){this._bDateRangeChanged=true;var i=this.destroyAggregation("selectedDates");return i;};f.prototype.removeAllSpecialDates=function(){this._bDateRangeChanged=true;var i=this.removeAllAggregation("specialDates");return i;};f.prototype.destroySpecialDates=function(){this._bDateRangeChanged=true;var i=this.destroyAggregation("specialDates");return i;};f.prototype.getSpecialDates=function(){var P=this.getParent();if(P&&P.getSpecialDates){return P.getSpecialDates();}else{return this.getAggregation("specialDates",[]);}};f.prototype.removeAllDisabledDates=function(){this._bDateRangeChanged=true;var i=this.removeAllAggregation("disabledDates");return i;};f.prototype.destroyDisabledDates=function(){this._bDateRangeChanged=true;var i=this.destroyAggregation("disabledDates");return i;};f.prototype.setLocale=function(s){if(this._sLocale!=s){this._sLocale=s;this._oLocaleData=undefined;this.invalidate();}return this;};f.prototype.getLocale=function(){if(!this._sLocale){this._sLocale=sap.ui.getCore().getConfiguration().getFormatSettings().getFormatLocale().toString();}return this._sLocale;};f.prototype._getFocusedDate=function(){if(!this._oFocusedDate){_.call(this);}return this._oFocusedDate;};f.prototype._setFocusedDate=function(i){a._checkCalendarDate(i);this._oFocusedDate=new c(i,this.getPrimaryCalendarType());};f.prototype.focusDate=function(i){h.call(this,i,false);return this;};f.prototype.displayDate=function(i){h.call(this,i,true);return this;};f.prototype.getStartDate=function(){var s;if(this.getDomRef()){var i=this.getAggregation("month");s=c.fromLocalJSDate(i[0].getDate(),this.getPrimaryCalendarType());}else{s=new c(this._getFocusedDate());}s.setDate(1);return s.toLocalJSDate();};f.prototype.setPopupMode=function(P){this._bPoupupMode=P;return this;};f.prototype.setMonths=function(s){this._bDateRangeChanged=undefined;this.setProperty("months",s,false);s=j.call(this);var t=this.getAggregation("month");var i=0;var u;if(t.length<s){for(i=t.length;i<s;i++){u=this._createMonth(this.getId()+"--Month"+i);u.attachEvent("focus",this._handleFocus,this);u.attachEvent("select",m,this);u.attachEvent("_renderMonth",k,this);u.attachEvent("_bindMousemove",n,this);u.attachEvent("_unbindMousemove",o,this);u._bNoThemeChange=true;this.addAggregation("month",u);}}else if(t.length>s){for(i=t.length;i>s;i--){u=this.removeAggregation("month",i-1);u.destroy();}if(s==1){this._bInitMonth=true;}}if(s>1&&t[0].getDate()){t[0].setProperty("date",null,true);}return this;};f.prototype.setPrimaryCalendarType=function(s){var t=this.getAggregation("month");var u=false;if(t.length>1){u=true;}this.setProperty("primaryCalendarType",s,!u);this._oYearFormat=d.getDateInstance({format:"y",calendarType:s});if(this._oFocusedDate){this._oFocusedDate=new c(this._oFocusedDate,s);}this._oMinDate=new c(this._oMinDate,s);this._oMaxDate=new c(this._oMaxDate,s);for(var i=0;i<t.length;i++){var v=t[i];v.setPrimaryCalendarType(s);}if(!this._getSucessorsPickerPopup()){var w=this.getAggregation("monthPicker");w.setPrimaryCalendarType(s);var y=this.getAggregation("yearPicker");y.setPrimaryCalendarType(s);}if(this.getDomRef()){this._updateHeader(this._oFocusedDate);if(!this._getSucessorsPickerPopup()){if(this.iMode!=1&&w.getDomRef()){w.$().remove();}if(this.iMode!=2&&y.getDomRef()){y.$().remove();}}}return this;};f.prototype.setSecondaryCalendarType=function(s){this._bSecondaryCalendarTypeSet=true;this.setProperty("secondaryCalendarType",s,true);this._oYearFormatSecondary=d.getDateInstance({format:"y",calendarType:s});var t=this.getAggregation("month");for(var i=0;i<t.length;i++){var u=t[i];u.setSecondaryCalendarType(s);}if(this.getDomRef()){this._updateHeader(this._getFocusedDate());this.$().toggleClass("sapUiCalSecType",!!this._getSecondaryCalendarType());}return this;};f.prototype._getSecondaryCalendarType=function(){var s;if(this._bSecondaryCalendarTypeSet){s=this.getSecondaryCalendarType();var P=this.getPrimaryCalendarType();if(s==P){s=undefined;}}return s;};f.prototype.setMinDate=function(i){if(q.sap.equal(i,this.getMinDate())){return this;}if(!i){this._oMinDate=a._minDate(this.getPrimaryCalendarType());}else{a._checkJSDateObject(i);this._oMinDate=c.fromLocalJSDate(i,this.getPrimaryCalendarType());var y=this._oMinDate.getYear();a._checkYearInValidRange(y);if(this._oMaxDate.isBefore(this._oMinDate)){q.sap.log.warning("minDate > maxDate -> maxDate set to end of the month",this);this._oMaxDate=c.fromLocalJSDate(i,this.getPrimaryCalendarType());this._oMaxDate.setDate(a._daysInMonth(this._oMaxDate));this.setProperty("maxDate",this._oMaxDate.toLocalJSDate(),true);}this._setMinMaxDateExtend(c.fromLocalJSDate(i,this.getPrimaryCalendarType()));}this.setProperty("minDate",i,false);if(!this._getSucessorsPickerPopup()){var s=this.getAggregation("yearPicker");s._oMinDate.setYear(this._oMinDate.getYear());}return this;};f.prototype.setMaxDate=function(i){if(q.sap.equal(i,this.getMaxDate())){return this;}if(!i){this._oMaxDate=a._maxDate(this.getPrimaryCalendarType());}else{a._checkJSDateObject(i);this._oMaxDate=c.fromLocalJSDate(i,this.getPrimaryCalendarType());var y=this._oMaxDate.getYear();a._checkYearInValidRange(y);if(this._oMinDate.isAfter(this._oMaxDate)){q.sap.log.warning("maxDate < minDate -> minDate set to begin of the month",this);this._oMinDate=c.fromLocalJSDate(i,this.getPrimaryCalendarType());this._oMinDate.setDate(1);this.setProperty("minDate",this._oMinDate.toLocalJSDate(),true);}this._setMinMaxDateExtend(c.fromLocalJSDate(i,this.getPrimaryCalendarType()));}this.setProperty("maxDate",i,false);if(!this._getSucessorsPickerPopup()){var s=this.getAggregation("yearPicker");s._oMaxDate.setYear(this._oMaxDate.getYear());}return this;};f.prototype._setMinMaxDateExtend=function(i){if(this._oFocusedDate){if(a._isOutside(this._oFocusedDate,this._oMinDate,this._oMaxDate)){q.sap.log.warning("focused date is not between [minDate - maxDate] -> refocus to the new max/min date: "+i.toString(),this);this.focusDate(i.toLocalJSDate());}}};f.prototype._getLocaleData=function(){if(!this._oLocaleData){var s=this.getLocale();var i=new e(s);this._oLocaleData=L.getInstance(i);}return this._oLocaleData;};f.prototype._getShowMonthHeader=function(){var i=j.call(this);if(i>2){return true;}else{return false;}};f.prototype.setWidth=function(w){this.setProperty("width",w,true);if(this.getDomRef()){w=this.getWidth();this.$().css("width",w);if(w){this.$().addClass("sapUiCalWidth");}else{this.$().removeClass("sapUiCalWidth");}}return this;};f.prototype.onclick=function(E){if(E.isMarked("delayedMouseEvent")){return;}if(E.target.id==this.getId()+"-cancel"){this.onsapescape(E);}};f.prototype.onmousedown=function(E){E.preventDefault();E.setMark("cancelAutoClose");};f.prototype.onsapescape=function(E){if(this._iMode==0){this.fireCancel();}this._closedPickers();};f.prototype.onsapshow=function(E){if(this._bPoupupMode){this._closedPickers();this.fireCancel();E.preventDefault();}};f.prototype.onsaphide=f.prototype.onsapshow;f.prototype.onsaptabnext=function(E){var s=this.getAggregation("header");if(q.sap.containsOrEquals(this.getDomRef("content"),E.target)){if(this._shouldFocusB2OnTabNext(E)){q.sap.focus(s.getDomRef("B2"));}else{q.sap.focus(s.getDomRef("B1"));}if(!this._bPoupupMode){var t=this.getAggregation("month");for(var i=0;i<t.length;i++){var u=t[i];q(u._oItemNavigation.getItemDomRefs()[u._oItemNavigation.getFocusedIndex()]).attr("tabindex","-1");}if(!this._getSucessorsPickerPopup()){var v=this.getAggregation("monthPicker");var y=this.getAggregation("yearPicker");if(v.getDomRef()){q(v._oItemNavigation.getItemDomRefs()[v._oItemNavigation.getFocusedIndex()]).attr("tabindex","-1");}if(y.getDomRef()){q(y._oItemNavigation.getItemDomRefs()[y._oItemNavigation.getFocusedIndex()]).attr("tabindex","-1");}}}E.preventDefault();}else if(this._shouldFocusB2OnTabNext(E)){q.sap.focus(s.getDomRef("B2"));E.preventDefault();}};f.prototype._shouldFocusB2OnTabNext=function(E){var i=this.getAggregation("header");return(E.target.id==i.getId()+"-B1");};f.prototype._shouldFocusB2OnTabPrevious=function(E){return this._bPoupupMode;};f.prototype.onsaptabprevious=function(E){var s=this.getAggregation("header");if(q.sap.containsOrEquals(this.getDomRef("content"),E.target)){if(this._shouldFocusB2OnTabPrevious()){q.sap.focus(s.getDomRef("B2"));E.preventDefault();}}else if(E.target.id==s.getId()+"-B1"){var t=this.getAggregation("month");var F;switch(this._iMode){case 0:F=this._getFocusedDate();for(var i=0;i<t.length;i++){var u=t[i];var v=c.fromLocalJSDate(u.getDate(),this.getPrimaryCalendarType());if(F.isSame(v)){u._oItemNavigation.focusItem(u._oItemNavigation.getFocusedIndex());}else{q(u._oItemNavigation.getItemDomRefs()[u._oItemNavigation.getFocusedIndex()]).attr("tabindex","0");}}break;case 1:if(!this._getSucessorsPickerPopup()){var w=this.getAggregation("monthPicker");w._oItemNavigation.focusItem(w._oItemNavigation.getFocusedIndex());}break;case 2:if(!this._getSucessorsPickerPopup()){var y=this.getAggregation("yearPicker");y._oItemNavigation.focusItem(y._oItemNavigation.getFocusedIndex());}break;}E.preventDefault();}else if(E.target.id==s.getId()+"-B2"){q.sap.focus(s.getDomRef("B1"));E.preventDefault();}};f.prototype.onfocusin=function(E){if(E.target.id==this.getId()+"-end"){var s=this.getAggregation("month");this._focusOnShiftTab();if(!this._bPoupupMode){for(var i=0;i<s.length;i++){var t=s[i];q(t._oItemNavigation.getItemDomRefs()[t._oItemNavigation.getFocusedIndex()]).attr("tabindex","-1");}if(!this._getSucessorsPickerPopup()){var u=this.getAggregation("monthPicker");var y=this.getAggregation("yearPicker");if(u.getDomRef()){q(u._oItemNavigation.getItemDomRefs()[u._oItemNavigation.getFocusedIndex()]).attr("tabindex","-1");}if(y.getDomRef()){q(y._oItemNavigation.getItemDomRefs()[y._oItemNavigation.getFocusedIndex()]).attr("tabindex","-1");}}}}this.$("end").attr("tabindex","-1");};f.prototype._focusOnShiftTab=function(){var i=this.getAggregation("header");q.sap.focus(i.getDomRef("B2"));};f.prototype.onsapfocusleave=function(E){var s,t,u,y;if(!E.relatedControlId||!q.sap.containsOrEquals(this.getDomRef(),sap.ui.getCore().byId(E.relatedControlId).getFocusDomRef())){this.$("end").attr("tabindex","0");if(!this._bPoupupMode){s=this.getAggregation("month");switch(this._iMode){case 0:for(var i=0;i<s.length;i++){t=s[i];q(t._oItemNavigation.getItemDomRefs()[t._oItemNavigation.getFocusedIndex()]).attr("tabindex","0");}break;case 1:if(!this._getSucessorsPickerPopup()){u=this.getAggregation("monthPicker");q(u._oItemNavigation.getItemDomRefs()[u._oItemNavigation.getFocusedIndex()]).attr("tabindex","0");}break;case 2:if(!this._getSucessorsPickerPopup()){y=this.getAggregation("yearPicker");q(y._oItemNavigation.getItemDomRefs()[y._oItemNavigation.getFocusedIndex()]).attr("tabindex","0");}break;}}}};f.prototype.getFocusDomRef=function(){var i=this._oSelectedMonth?this._oSelectedMonth:this.getAggregation("month")[0];return i._oItemNavigation.getItemDomRefs()[i._oItemNavigation.getFocusedIndex()];};f.prototype.onThemeChanged=function(){var s;if(!this.getDomRef()){return;}this._bNamesLengthChecked=undefined;if(!this._getSucessorsPickerPopup()){s=this.getAggregation("monthPicker");this._showMonthPicker(true);s._bNoThemeChange=false;s.onThemeChanged(arguments);s._bNoThemeChange=true;this._bLongMonth=s._bLongMonth;this._hideMonthPicker(true);}var t=this.getAggregation("month");for(var i=0;i<t.length;i++){var u=t[i];u._bNoThemeChange=false;u.onThemeChanged(arguments);u._bNoThemeChange=true;}var v;if(t.length>1){v=c.fromLocalJSDate(t[0].getDate(),this.getPrimaryCalendarType());}else{v=this._getFocusedDate();}this._setHeaderText(v);if(!this._getSucessorsPickerPopup()){g.call(this);}};f.prototype._updateHeader=function(i){this._setHeaderText(i);this._togglePrevNext(i,true);};f.prototype._togglePrevNext=function(i,s){var y=this._oMaxDate.getYear();var t=this._oMinDate.getYear();var u=this._oMaxDate.getMonth();var v=this._oMinDate.getMonth();var w=this.getAggregation("header");var x=j.call(this);var z=new c(i,this.getPrimaryCalendarType());if(this._iMode==0&&x>1){z=r.call(this,i);z.setMonth(z.getMonth()+x-1);z.setDate(a._daysInMonth(z));}else{z.setDate(a._daysInMonth(z));}var A=z.getYear();var B=z.getMonth();if(A>y||(A==y&&(!s||B>=u))||(this._iMode==1&&this._getSucessorsPickerPopup())){w.setEnabledNext(false);}else{w.setEnabledNext(true);}if(this._iMode==0&&x>1){z.setMonth(z.getMonth()-x+1);z.setDate(1);}else{z.setDate(1);}A=z.getYear();B=z.getMonth();if(A<t||(A==t&&(!s||B<=v))||(this._iMode==1&&this._getSucessorsPickerPopup())){w.setEnabledPrevious(false);}else{w.setEnabledPrevious(true);}};f.prototype._togglePrevNexYearPicker=function(){var y=this.getAggregation("yearPicker");var i=y.getYears();var s=c.fromLocalJSDate(y.getFirstRenderedDate());s.setYear(s.getYear()+Math.floor(i/2));var t=this.getAggregation("header");var u=new c(this._oMaxDate,this.getPrimaryCalendarType());u.setYear(u.getYear()-Math.ceil(i/2));u.setMonth(11);u.setDate(31);var v=new c(this._oMinDate,this.getPrimaryCalendarType());v.setYear(v.getYear()+Math.floor(i/2)+1);v.setMonth(0);v.setDate(1);t.setEnabledNext(s.isSameOrBefore(u));t.setEnabledPrevious(s.isSameOrAfter(v));};f.prototype._handlePrevious=function(E){var F=this._getFocusedDate();var i=this.getAggregation("header");var y=this.getAggregation("yearPicker");var s=j.call(this);var t;var u;var S=false;switch(this._iMode){case 0:if(s>1){t=c.fromLocalJSDate(this.getAggregation("month")[0].getDate(),this.getPrimaryCalendarType());t.setDate(1);this._setFocusedDate(t);F=this._getFocusedDate();}else{F.setDate(1);}F.setDate(F.getDate()-1);this._renderMonth(S,true);break;case 1:F.setYear(F.getYear()-1);i.setTextButton2(this._oYearFormat.format(F.toUTCJSDate(),true));var v=this._getSecondaryCalendarType();if(v){u=new c(F,v);u.setMonth(0);u.setDate(1);i.setAdditionalTextButton2(this._oYearFormatSecondary.format(u.toUTCJSDate(),true));}else{i.setAdditionalTextButton2();}this._togglePrevNext(F);this._setDisabledMonths(F.getYear());break;case 2:y.previousPage();this._togglePrevNexYearPicker();break;}};f.prototype._handleNext=function(E){var F=this._getFocusedDate();var i=this.getAggregation("header");var y=this.getAggregation("yearPicker");var s=j.call(this);var t;var u;switch(this._iMode){case 0:if(s>1){t=c.fromLocalJSDate(this.getAggregation("month")[0].getDate(),this.getPrimaryCalendarType());this._setFocusedDate(t);F=this._getFocusedDate();}F.setDate(1);F.setMonth(F.getMonth()+s);this._renderMonth();break;case 1:F.setYear(F.getYear()+1);i.setTextButton2(this._oYearFormat.format(F.toUTCJSDate(),true));var S=this._getSecondaryCalendarType();if(S){u=new c(F,S);u.setMonth(0);u.setDate(1);i.setAdditionalTextButton2(this._oYearFormatSecondary.format(u.toUTCJSDate(),true));}else{i.setAdditionalTextButton2();}this._togglePrevNext(F);this._setDisabledMonths(F.getYear());break;case 2:y.nextPage();this._togglePrevNexYearPicker();break;}};f.prototype._getDisplayedMonths=function(s){var t=[];var u=s.getMonth();var v=j.call(this);if(v>1){for(var i=0;i<v;i++){t.push((u+i)%12);}}else{t.push(u);}return t;};f.prototype._getDisplayedSecondaryMonths=function(P,s){var i=this.getAggregation("month");var F=c.fromLocalJSDate(i[0].getDate(),P);F.setDate(1);F=new c(F,s);var S=F.getMonth();var t=c.fromLocalJSDate(i[i.length-1].getDate(),P);t.setDate(a._daysInMonth(t));t=new c(t,s);var E=t.getMonth();return{start:S,end:E};};f.prototype._closedPickers=function(){switch(this._iMode){case 0:break;case 1:this._hideMonthPicker();break;case 2:this._hideYearPicker();break;}};f.prototype._setDisabledMonths=function(y,i){var s=0;var t=11;if(y==this._oMinDate.getYear()){s=this._oMinDate.getMonth();}if(y==this._oMaxDate.getYear()){t=this._oMaxDate.getMonth();}if(!i){i=this.getAggregation("monthPicker");}i.setMinMax(s,t);};f.prototype._handleFocus=function(E){var i=c.fromLocalJSDate(E.getParameter("date"),this.getPrimaryCalendarType());var O=E.getParameter("otherMonth");var s=E.getParameter("restoreOldDate");if(s){if(!q.sap.equal(this._getFocusedDate(),i)){this._renderMonth(false,false,true);}}else{this._focusDate(i,O);}};f.prototype._getVisibleDays=function(){var i=this.getAggregation("month")[0];return i._getVisibleDays(i._getDate(),false);};f.prototype._renderMonth=function(s,I,N){var t=this._getFocusedDate();var u=this.getAggregation("month");var F=false;var v;var w;var x;var i=0;for(i=0;i<u.length;i++){v=u[i];if(v.checkDateFocusable(t.toLocalJSDate())){F=true;}if(F||u.length==1){if(!s){v.setDate(t.toLocalJSDate());}else{v.displayDate(t.toLocalJSDate());}break;}}if(!F){x=new c(t,this.getPrimaryCalendarType());if(u.length>1){x=r.call(this,x);for(i=0;i<u.length;i++){v=u[i];w=new c(x,this.getPrimaryCalendarType());w.setMonth(x.getMonth()+i);if(!s&&a._isSameMonthAndYear(w,t)){v.setDate(t.toLocalJSDate());}else{v.displayDate(w.toLocalJSDate());}}}this._updateHeader(x);if(!N){this.fireStartDateChange();}}};function _(){var s=this.getSelectedDates();var i=this.getPrimaryCalendarType();if(s&&s[0]&&s[0].getStartDate()){this._oFocusedDate=c.fromLocalJSDate(s[0].getStartDate(),i);}else{this._oFocusedDate=c.fromLocalJSDate(new Date(),i);}if(this._oFocusedDate.isBefore(this._oMinDate)){this._oFocusedDate=new c(this._oMinDate,i);}else if(this._oFocusedDate.isAfter(this._oMaxDate)){this._oFocusedDate=new c(this._oMaxDate,i);}}f.prototype._showMonthPicker=function(s){if(this._iMode==2){this._hideYearPicker(true);}var t=this._getFocusedDate();var u=this.getAggregation("monthPicker");if(u.getDomRef()){u.$().css("display","");}else{var v=sap.ui.getCore().createRenderManager();var $=this.$("content");v.renderControl(u);v.flush($[0],false,true);v.destroy();}this._showOverlay();if(!s){u.setMonth(t.getMonth());this._setDisabledMonths(t.getYear(),u);if(this._iMode==0){var w=this.getAggregation("month");for(var i=0;i<w.length;i++){var x=w[i];q(x._oItemNavigation.getItemDomRefs()[x._oItemNavigation.getFocusedIndex()]).attr("tabindex","-1");}}}this._iMode=1;this._togglePrevNext(t,false);};f.prototype._hideMonthPicker=function(s){this._iMode=0;var t=this.getAggregation("monthPicker");t.$().css("display","none");this._hideOverlay();if(!s){this._renderMonth();if(j.call(this)>1){var u=this.getAggregation("month");for(var i=0;i<u.length;i++){var v=u[i];q(v._oItemNavigation.getItemDomRefs()[v._oItemNavigation.getFocusedIndex()]).attr("tabindex","0");}}}this._togglePrevNext(this._getFocusedDate(),true);};f.prototype._showYearPicker=function(){if(this._iMode==1){this._hideMonthPicker(true);}var s=this._getFocusedDate();var y=this.getAggregation("yearPicker");if(y.getDomRef()){y.$().css("display","");}else{var t=sap.ui.getCore().createRenderManager();var $=this.$("content");t.renderControl(y);t.flush($[0],false,true);t.destroy();}this._showOverlay();y.setDate(s.toLocalJSDate());var u;if(j.call(this)==1){u=this.getAggregation("month")[0];var v=u.$("days").find(".sapUiCalItem");if(v.length==28){y.$().addClass("sapUiCalYearNoTop");}else{y.$().removeClass("sapUiCalYearNoTop");}}if(this._iMode==0){var w=this.getAggregation("month");for(var i=0;i<w.length;i++){u=w[i];q(u._oItemNavigation.getItemDomRefs()[u._oItemNavigation.getFocusedIndex()]).attr("tabindex","-1");}}this._togglePrevNexYearPicker();this._iMode=2;};f.prototype._hideYearPicker=function(s){this._iMode=0;var y=this.getAggregation("yearPicker");y.$().css("display","none");this._hideOverlay();if(!s){this._renderMonth();if(j.call(this)>1){var t=this.getAggregation("month");for(var i=0;i<t.length;i++){var u=t[i];q(u._oItemNavigation.getItemDomRefs()[u._oItemNavigation.getFocusedIndex()]).attr("tabindex","0");}}}this._togglePrevNext(this._getFocusedDate(),true);};function g(){if(!this._bNamesLengthChecked){this._showMonthPicker(true);this._hideMonthPicker(true);var i=this.getAggregation("monthPicker");this._bLongMonth=i._bLongMonth;this._bNamesLengthChecked=true;if(!this._bLongMonth){var s=this.getAggregation("month");var t;if(s.length>1){t=c.fromLocalJSDate(s[0].getDate(),this.getPrimaryCalendarType());}else{t=this._getFocusedDate();}this._setHeaderText(t);}}else if(j.call(this)>1){this._focusDate(this._getFocusedDate(),true,true);}}f.prototype._focusDate=function(i,O,N){var F;var s=false;var t=false;if(i.isBefore(this._oMinDate)){F=this._oMinDate;s=true;}else if(i.isAfter(this._oMaxDate)){F=this._oMaxDate;s=true;}else{F=i;}if(this._focusDateExtend){t=this._focusDateExtend(i,O,N);}var I=F.isBefore(this._getFocusedDate());this._setFocusedDate(F);if(s||O){this._renderMonth(false,I,N);}if(t){this.fireStartDateChange();}};f.prototype._invalidateMonth=function(O){this._sInvalidateMonth=undefined;var s=this.getAggregation("month");if(s){for(var i=0;i<s.length;i++){var t=s[i];t._bDateRangeChanged=true;t._bInvalidateSync=true;t._bNoFocus=true;t.invalidate(O);t._bInvalidateSync=undefined;}}this._bDateRangeChanged=undefined;};f.prototype._setHeaderText=function(i){var s=this.getAggregation("header");var t=this._getLocaleData();var u=[];var v=[];var w=[];var A;var S=false;var T;var y;var P;var x=this.getPrimaryCalendarType();var z=this._getSecondaryCalendarType();if(this._bLongMonth||!this._bNamesLengthChecked){u=t.getMonthsStandAlone("wide",x);}else{S=true;u=t.getMonthsStandAlone("abbreviated",x);v=t.getMonthsStandAlone("wide",x);}if(z){w=t.getMonthsStandAlone("abbreviated",z);var B=this._getDisplayedSecondaryMonths(x,z);if(B.start==B.end){T=w[B.start];}else{P=t.getIntervalPattern();T=P.replace(/\{0\}/,w[B.start]).replace(/\{1\}/,w[B.end]);}}s.setAdditionalTextButton1(T);var E=this._getDisplayedMonths(i);if(E.length>1&&!this._bShowOneMonth){if(!P){P=t.getIntervalPattern();}T=P.replace(/\{0\}/,u[E[0]]).replace(/\{1\}/,u[E[E.length-1]]);if(S){A=P.replace(/\{0\}/,v[E[0]]).replace(/\{1\}/,v[E[E.length-1]]);}}else{T=u[E[0]];if(S){A=v[E[0]];}}s.setTextButton1(T);if(S){s.setAriaLabelButton1(A);}var F=new c(i,x);F.setDate(1);y=this._oYearFormat.format(F.toUTCJSDate(),true);s.setTextButton2(y);if(z){F=new c(F,z);s.setAdditionalTextButton2(this._oYearFormatSecondary.format(F.toUTCJSDate(),true));}else{s.setAdditionalTextButton2();}return{sMonth:T,sYear:y,sAriaLabel:A,bShort:S};};function h(i,s){if(!i){return;}var t=c.fromLocalJSDate(i,this.getPrimaryCalendarType());if(this._oFocusedDate&&this._oFocusedDate.isSame(t)){return;}var y=t.getYear();a._checkYearInValidRange(y);if(a._isOutside(t,this._oMinDate,this._oMaxDate)){throw new Error("Date must not be in valid range (minDate and maxDate); "+this);}this._setFocusedDate(t);if(this.getDomRef()&&this._iMode==0){this._renderMonth(s,false,true);}}function j(){if(D.system.phone){return 1;}else{return this.getMonths();}}f.prototype._handleButton1=function(E){if(this._iMode!=1){this._showMonthPicker();}else{this._hideMonthPicker();}};f.prototype._handleButton2=function(E){if(this._iMode!=2){this._showYearPicker();}else{this._hideYearPicker();}};function k(E){this.fireEvent("_renderMonth",{days:E.getParameter("days")});}function m(E){if(j.call(this)>1){var s=this.getAggregation("month");for(var i=0;i<s.length;i++){var t=s[i];if(t.getId()!=E.oSource.getId()){t._updateSelection();}}}this._oSelectedMonth=E.oSource;this.fireSelect();}function n(E){if(j.call(this)>1){var s=this.getAggregation("month");for(var i=0;i<s.length;i++){var t=s[i];if(t.getId()!=E.oSource.getId()){t._bindMousemove();}}}}function o(E){if(j.call(this)>1){var s=this.getAggregation("month");for(var i=0;i<s.length;i++){var t=s[i];if(t.getId()!=E.oSource.getId()){t._unbindMousemove();}}}}f.prototype._selectMonth=function(){var F=new c(this._getFocusedDate(),this.getPrimaryCalendarType()),i=this.getAggregation("monthPicker"),s=i.getMonth();F.setMonth(s);if(s!=F.getMonth()){F.setDate(0);}this._focusDate(F,true);this._hideMonthPicker();};f.prototype._getSucessorsPickerPopup=function(){return this.getPickerPopup&&this.getPickerPopup();};f.prototype._selectYear=function(){var F=new c(this._getFocusedDate(),this.getPrimaryCalendarType());var y=this.getAggregation("yearPicker");var i=c.fromLocalJSDate(y.getDate(),this.getPrimaryCalendarType());i.setMonth(F.getMonth());i.setDate(F.getDate());F=i;this._focusDate(F,true);this._hideYearPicker();};f.prototype._showOverlay=function(){this.$("contentOver").css("display","");};f.prototype._hideOverlay=function(){this.$("contentOver").css("display","none");};function p(E){var w=E.size.width;if(w<=0){return;}var O=this._iSize;if(w<this._iBreakPointTablet){this._iSize=0;}else if(w<this._iBreakPointDesktop){this._iSize=1;}else if(w<this._iBreakPointLargeDesktop){this._iSize=2;}else{this._iSize=3;}var s=j.call(this);var t;if(O!=this._iSize||this._bInitMonth){switch(this._iSize){case 1:t=2;break;case 2:t=3;break;case 3:t=4;break;default:t=1;break;}if(s<t){t=s;}if(t>2&&s>t){var u=t;var U=0.0;var v=t;while(u>=2){var x=s%u;if(x==0){v=u;break;}else{var N=x/u;if(N>U){U=N;v=u;}}u--;}t=v;}var W;var y=this.getAggregation("month");if(t>1){W=100/t+"%";this.$("content").removeClass("sapUiCalContentSingle");}else{W="100%";this.$("content").addClass("sapUiCalContentSingle");}for(var i=0;i<y.length;i++){var z=y[i];z.setWidth(W);}}}function r(i){var F=new c(i,this.getPrimaryCalendarType());F.setDate(1);var s=j.call(this);if(s<=12){var t=i.getMonth();t=t-t%s;if(12%s>0&&t+s>11){t=12-s;}F.setMonth(t);}return F;}return f;});