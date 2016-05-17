/* main javascript */

var dataSet = [];
    dataSet.push({
        name: "Three equal layers",
        arr: [30, 30, 30]
    })
    dataSet.push({
        name: "Three unequal layers",
        arr: [50, 10, 5]
    })


//var myBarChart = chart().col('purple').barWidth(1).binNames('combo').highlightOpacity(0.9).startPos('grouped');

//For default values use:
var myBarChart = chart();


var chartWrapper = d3.select('#my-div')
                .datum([dataSet]) 
                .call(myBarChart);
