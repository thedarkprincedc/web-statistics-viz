sap.ui.define([

], function () {
    "use strict";
    // path: "/heatmapdaily"
    return {
        type: "heatmap",
        dataset: {
            dimensions: [{
                name: 'Day',
                value: "{Day}"
              },{
                name: 'Time',
                value: "{Time}"
              }],
              measures: [{
                  name: 'Hits',
                  value: '{Hits}'
                },
              ],
              data: {
                path: null // is the collection name
              }
        },
        feedItems: [{
                uid: "color",
                type: "Measure",
                values: ["Hits"]
            },
            {
                uid: "categoryAxis",
                type: "Dimension",
                values: ["Time"]
            },
            {
                uid: "categoryAxis2",
                type: "Dimension",
                values: ["Day"]
            }
        ],
        properties: {
            plotArea: {
                dataLabel: {
                    visible: false
                }
            },
            legend: {
                title: {
                    visible: false
                }
            },
            title: {
                visible: false,
                text: 'Profit and Cost and Revenue by Item Category'
            }
        },
        actionItems:[],
        aggregations:[]
    };
});