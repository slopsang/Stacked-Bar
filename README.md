# stackedBar.js API Reference

A JavaScript library to easily create stacked bar charts.

## Usage

Place the stackedBar.css and stackedBar.js in the same directory as your HTML document. Make sure to include the following links within your HTML document:

```html
<link rel="stylesheet" type="text/css" href="stackedBar.css">
<script src="//d3js.org/d3.v3.min.js"></script>
<script src="/stackedBar.js"></script>
```

You must also include the following HTML elements within your body:

```html
<div id='my-div'>
  <form>
    <label id="userRead"></label>
    <label><input type="radio" name="mode" value="grouped"> Grouped</label>
    <label><input id="userRead" type="radio" name="mode" value="stacked" checked> Stacked</label>
  </form>
</div>
```

To create the stacked bar chart, you can call it like this:

```javascript
var myBarChart = chart().col('purple').barWidth(1).binNames('combo').highlightOpacity(0.9).startPos('grouped');

//For default values use:
//var myBarChart = chart();

var chartWrapper = d3.select('#my-div')
                .datum([dataSet]) 
                .call(myBarChart); 
```

If you don't specify the parameters they will simply be set to their default values.

## Preparing the Dataset

It will likely be necessary to preprocess your dataset from whatever format it is in (JSON in the example below). Make sure that the dataset passed into the function is an array where the length of the array is equal to the number of samples (bins) that will be represented on the x-axis. Within each element of the array, the name field will be the label associated on the x-axis (can just be a number representing the index) and the arr field will be a new array where the length of this array is equal to the number of layers of each bar (this length should be consistent across all samples, and if the value is null it should be set to 0). 

```javascript
var dataSet = [];
d3.json("data.json", function(error, data) {
    data.data.forEach(function (layer) {
       dataSet.push({
          name: layer[9],
          arr: [layer[13], layer[14], layer[15]]
       })
    });
});
```

As you can see, we access the specific elements within our JSON file to populate an array that contains the data we will need for our stacked bar chart. Notice that we will use labels on the x-axis using text from the JSON file. A simple example of manual data input can be seen here:

```javascript
var dataSet = [];
    dataSet.push({
        name: "Three equal layers",
        arr: [30, 30, 30]
    })
    dataSet.push({
        name: "Three unequal layers",
        arr: [50, 10, 5]
    })
```

## API Functions

\# 1. col('string')

> This sets the color range of the bar chart. The possible values are: 'purple', 'blue', 'green', 'yellow', and 'black'. The default value is 'purple'.

\# 2. barWidth(number)

> This number (between 0 and 1.09) indicates the width of our bars. A value of 1.09 means that our bars will be the maximum width and will be touching. A value of 0.5 means our bars will have space between them slightly greater than the width of each bar. A value of 0 (not recommended) means the width of the bars will be 0 and not be able to be seen. The default value is 1.

\# 3. binNames('string')

> This sets what is displayed on the labels on the x axis to represent each bin. The possible values are 'default', 'numbers', 'combo', and 'blank'. Default (you do not need to type 'default', you can use any value that isn't one of the other three) means that only text from the name field of our dataset will be displayed. Numbers mean only the index of that bin will be displayed. Combo means that numbers and text will be displayed (The first label will be "1: Alabama" if the name field is "Alabama"). Blank means that there will be no labels for each bin.

\# 4. highlightOpacity(number)

> This sets the changed opacity of a bar when we hover over it. This can range from 0 to 1. The default a value is 0.5. A value of 1 means that the bars will not change on hovering, a value of 0 means that they will disappear completely while we put our mouse over them. The lower the number the more transparent the bar will become.

\# 5. startPos('string')

> This sets the default layout, whether the bars are stacked or grouped. The values can be 'grouped' (default) or 'stacked'.

\# 6. showData(boolean)

> This determines whether or not the numerical values are shown at the top when layers are hovered over. True (default) means that the Stacked Height and Layer Value will be shown, false means that no values will be shown.

