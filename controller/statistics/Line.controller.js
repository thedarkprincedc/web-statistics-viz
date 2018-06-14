sap.ui.define([
    'jquery.sap.global',
    'sap/ui/core/mvc/Controller',
    'sap/ui/model/json/JSONModel',
    'sap/viz/ui5/data/FlattenedDataset',
    'sap/viz/ui5/format/ChartFormatter',
    'sap/viz/ui5/api/env/Format'
], function(jQuery, Controller, JSONModel, FlattenedDataset, ChartFormatter, Format) {
    "use strict";
    return Controller.extend("com.dla.webstat.controller.statistics.Line", {
        onInit : function (evt) {
            Format.numericFormatter(ChartFormatter.getInstance());
            var formatPattern = ChartFormatter.DefaultPattern;

            var oVizFrame = this.oVizFrame = this.getView().byId("idVizFrame");
            oVizFrame.setVizProperties({
                plotArea: {
                    dataLabel: {
                        formatString:formatPattern.SHORTFLOAT_MFD2,
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
                    visible: false,
                    text: 'Revenue by City and Store Name'
                }
            });
            var dataModel = new JSONModel({
                "milk": [{
                      "Week": "Week 1 - 4",
                      "Revenue": 431000.22,
                      "Cost": 230000.00,
                      "Cost1": 24800.63,
                      "Cost2": 205199.37,
                      "Target": 500000.00,
                      "Budget": 210000.00
                  },
                  {
                      "Week": "Week 5 - 8",
                      "Revenue": 494000.30,
                      "Cost": 238000.00,
                      "Cost1": 99200.39,
                      "Cost2": 138799.61,
                      "Target": 500000.00,
                      "Budget": 224000.00
                  },
                  {
                      "Week": "Week 9 - 12",
                      "Revenue": 491000.17,
                      "Cost": 221000.00,
                      "Cost1": 70200.54,
                      "Cost2": 150799.46,
                      "Target": 500000.00,
                      "Budget": 238000.00
                  },
                  {
                      "Week": "Week 13 - 16",
                      "Revenue": 536000.34,
                      "Cost": 280000.00,
                      "Cost1": 158800.73,
                      "Cost2": 121199.27,
                      "Target": 500000.00,
                      "Budget": 252000.00
                  },
                  {
                      "Week": "Week 17 - 20",
                      "Revenue": 675000.00,
                      "Cost": 230000.00,
                      "Cost1": 140000.91,
                      "Cost2": 89999.09,
                      "Target": 600000.00,
                      "Budget": 266000.00
                  },
                  {
                      "Week": "Week 21 - 24",
                      "Revenue": 680000.00,
                      "Cost": 250000.00,
                      "Cost1": 172800.15,
                      "Cost2": 77199.85,
                      "Target": 600000.00,
                      "Budget": 280000.00
                  },
                  {
                      "Week": "Week 25 - 28",
                      "Revenue": 659000.14,
                      "Cost": 325000.00,
                      "Cost1": 237200.74,
                      "Cost2": 87799.26,
                      "Target": 600000.00,
                      "Budget": 294000.00
                  },
                  {
                      "Week": "Week 29 - 32",
                      "Revenue": 610000.00,
                      "Cost": 350000.00,
                      "Cost1": 243200.18,
                      "Cost2": 106799.82,
                      "Target": 600000.00,
                      "Budget": 308000.00
                  },
                  {
                      "Week": "Week 33 - 37",
                      "Revenue": 751000.83,
                      "Cost": 390000.00,
                      "Cost1": 280800.24,
                      "Cost2": 109199.76,
                      "Target": 600000.00,
                      "Budget": 322000.00
                  },
                  {
                      "Week": "Week 38 - 42",
                      "Revenue": 800000.63,
                      "Cost": 450000.00,
                      "Cost1": 320000.08,
                      "Cost2": 129999.92,
                      "Target": 700000.00,
                      "Budget": 336000.00
                  },
                  {
                      "Week": "Week 43 - 47",
                      "Revenue": 881000.19,
                      "Cost": 480000.00,
                      "Cost1": 360800.09,
                      "Cost2": 119199.91,
                      "Target": 700000.00,
                      "Budget": 350000.00
                  },
                  {
                      "Week": "Week 47 - 52",
                      "Revenue": 904000.04,
                      "Cost": 560000.00,
                      "Cost1": 403200.08,
                      "Cost2": 156799.92,
                      "Target": 700000.00,
                      "Budget": 364000.00
                  }]
              }
              );
            oVizFrame.setModel(dataModel);
        }
    });
});