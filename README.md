# StackedBar.js API Reference

A JavaScript library to easily create stacked bar charts.

## Usage

Make sure to include the following links within your HTML document:

```html
<link rel="stylesheet" type="text/css" href="stackedBar.css">
<script src="//d3js.org/d3.v3.min.js"></script>
<script src="/stackedBar.js"></script>
```

To create the stacked bar chart, you can call it like this:

```javascript
var myBarChart = chart().param1(value1).param2(value2);

var chartWrapper = d3.select('#my-div')
                .datum([dataSet]) 
                .call(myBarChart); 
```
## Preparing the Dataset

It will likely be necessary to preprocess your dataset from whatever format it is in (JSON in the example below). Make sure that the dataset passed into the function is an array where the length of the array is equal to the number of samples (bins) that will be represented on the x-axis. Within each element of the array, the key field will be the label associated on the x-axis (can just be a number representing the index) and the value field will be a new array where the length of this array is equal to the number of layers of each bar (this length should be consistent across all samples, and if the value is null it should be set to 0). 

```javascript
var dataSet;
d3.json("data.json", function(error, data) {
    var dataSet = [];
    var count = 0;
    data.data.forEach(function (layer) {
       dataSet.push({
          key: layer[9],
          value: [layer[13], layer[14], layer[15]],
          index: count
       })
       count++; 
    });
});
```

As you can see, we access the specific elements within our JSON file to populate an array that contains the data we will need for our stacked bar chart. Notice that we will use labels on the x-axis using text from the JSON file, but if we simply wanted the x-axis to display ordered numbers as labels then we would set the index as the key.


## API Functions

\# param1(number)

> This number (between 0 and 1) indicates the width of our bars. A value of 1 means that our bars will be the maximum width and will be touching. A value of 0.5 means our bars will have space between them equal to the width of our bar. A value of 0 (not recommended) means the width of the bars will be 0 and not be able to be seen.
