sap.ui.define([
    'jquery.sap.global',
    'sap/ui/core/mvc/Controller',
    'sap/ui/model/json/JSONModel',
    'sap/viz/ui5/format/ChartFormatter',
    'sap/viz/ui5/api/env/Format',
], function(jQuery, Controller, JSONModel, ChartFormatter, Format) {
    "use strict";
    return Controller.extend("com.dla.webstat.controller.statistics.Bar",{
        onInit : function(){
            Format.numericFormatter(ChartFormatter.getInstance());
            var formatPattern = ChartFormatter.DefaultPattern;
            var oVizFrame = this.oVizFrame = this.getView().byId("idVizFrame");
            oVizFrame.setVizProperties({
                plotArea: {
                    dataLabel: {
                        formatString: formatPattern.SHORTFLOAT_MFD2,
                        visible: true
                    }
                },
                valueAxis: {
                    label: {
                        formatString: formatPattern.SHORTFLOAT
                    },
                    title: {
                        visible: false
                    }
                },
                categoryAxis: {
                    title: {
                        visible: false
                    }
                },
                title: {
                    visible: true,
                    text: 'Revenue by City and Store Name'
                }
            });
            var dataModel = new JSONModel({
                "milk": [{
                      "Store Name": "24-Seven",
                      "Revenue": 428214.13,
                      "Cost": 94383.52,
                      "Consumption": 76855.15368
                  },
                  {
                      "Store Name": "A&A",
                      "Revenue": 1722148.36,
                      "Cost": 274735.17,
                      "Consumption": 310292.22
                  },
                  {
                      "Store Name": "Alexei's Specialities",
                      "Revenue": 1331176.706884,
                      "Cost": 233160.58,
                      "Consumption": 143432.18
                  },
                  {
                      "Store Name": "BC Market",
                      "Revenue": 1878466.82,
                      "Cost": 235072.19,
                      "Consumption": 487910.26
                  },
                  {
                      "Store Name": "Choices Franchise 1",
                      "Revenue": 3326251.94,
                      "Cost": 582543.16,
                      "Consumption": 267185.27
                  },
                  {
                      "Store Name": "Choices Franchise 3",
                      "Revenue": 2090030.97,
                      "Cost": 397952.77,
                      "Consumption": 304964.8856125
                  },
                  {
                      "Store Name": "Choices Franchise 6",
                      "Revenue": 1932991.59,
                      "Cost": 343427.25,
                      "Consumption": 291191.83
                  },
                  {
                      "Store Name": "Dairy World",
                      "Revenue": 752565.16,
                      "Cost": 115844.26,
                      "Consumption": 98268.9597904
                  },
                  {
                      "Store Name": "Delikatessen",
                      "Revenue": 1394072.66,
                      "Cost": 263180.86,
                      "Consumption": 176502.5521223
                  },
                  {
                      "Store Name": "Donald's Market",
                      "Revenue": 3308333.872944,
                      "Cost": 611658.59,
                      "Consumption": 538515.47632832
                  }]
              }
              );
            oVizFrame.setModel(dataModel);

        }
    });   
});