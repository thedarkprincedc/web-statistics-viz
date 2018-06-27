sap.ui.define([
    "sap/m/StandardListItem",
    "sap/m/Text",
    "sap/m/Input",
    "sap/viz/ui5/controls/VizFrame",
    "sap/ui/model/odata/v2/ODataModel",
    "com/dla/webstat/constants",
    "sap/viz/ui5/data/FlattenedDataset",
    "sap/viz/ui5/controls/common/feeds/FeedItem",
], function (Control, Text, Input, VizFrame, ODataModel, APP_CONSTANTS, FlattenedDataset, FeedItem) {
    "use strict";

    var customControl = Control.extend("com.dla.webstat.control.LineChartListControl", {
        metadata : {
            aggregations : {},
            properties : {
                settings: {
                    type: 'object'
                }
            },
            events : {}
        },
        init: function () {},
        onAfterRendering: function () {
            this.addStyleClass("customTileControl");
            var vizframe = new VizFrame( {
                'vizType': 'bar',
                'uiConfig': {
                    'applicationSet': 'fiori',
                    'showErrorMessage': true
                }
            }).placeAt(this.sId + "-content");
            var settings = {
                type: "line",
                dataset: {
                    dimensions: [{
                        name: 'Time',
                        value: "{Time}"
                    }],
                    measures: [{
                        name: 'Hits',
                        value: '{Hits}'
                    }, {
                        name: 'LastWeeksHits',
                        value: '{LastWeeksHits}'
                    }],
                    data: {
                        path: "/linechart" //is the collection name
                    }
                },
                feedItems: [{
                        uid: "valueAxis",
                        type: "Measure",
                        values: ["Hits"]
                    },
                    {
                        uid: "categoryAxis",
                        type: "Dimension",
                        values: ["Time"]
                    }
                ],
                properties: {
                    plotArea: {
                        dataLabel: {

                            visible: true
                        }
                    },
                    valueAxis: {
                        label: {},
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
                }
            };
      
          //var settings = this.mProperties.settings;
            var dataModel = new ODataModel(APP_CONSTANTS.WEB_STATISTICS_ODATA_SERVICE_URL);
           
            var oDataset = new FlattenedDataset(settings.dataset);
            vizframe.setDataset(oDataset);
            vizframe.setModel(dataModel);
            settings.feedItems.forEach(function(value){
                var item = new FeedItem(value);
                vizframe.addFeed(item);
            });
            vizframe.setVizType(settings.type);
            vizframe.setVizProperties(settings.properties);
        },
        renderer: function (oRm, oControl) {
            sap.m.StandardListItemRenderer.render(oRm, oControl);
        }
    });
    return customControl;
});