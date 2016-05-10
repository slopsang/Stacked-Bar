function chart() {

  var wid = 960, //Initialize default values
      hei = 500,
      col = ["#aad", "#556"],
      binNames = [],
      barWidth = 1,
      highlightOpacity = 0.5,
      startPos = "grouped",
      showData = true;

  for (i = 0; i < dataSet.length; i++) //Store the names of each axis
  { 
    binNames[i] = dataSet[i].name;
  }

  function my() {

    var formatData = [] //Holds the formatted data from the dataSet of user

    for (i = 0; i < 1; i++) //Used a single looped for loop so that array couldn't be accessed outside
    {
      var array = [];
      for (j = 0; j < dataSet.length; j++)
      {
        array.push({
            x: j,
            y: dataSet[j].arr[i],
            y1: dataSet[j].arr[i], 
            y0: 0                   //Bars should always begin at 0
        })
      }
      formatData.push({
          array
       })
    }
    for (i = 1; i < dataSet[0].arr.length; i++) //For all stacked bars (that don't begin on x-axis)
    {
      var array = [];
      for (j = 0; j < dataSet.length; j++)
      {
        array.push({
            x: j,
            y: dataSet[j].arr[i],
            y1: dataSet[j].arr[i] + formatData[i - 1].array[j].y1, //y1 - y0 =y
            y0: formatData[i - 1].array[j].y1  //Where this bar begins based on bars below it
        })
      }
      formatData.push({
          array
       })
    }

    for (i = 0; i < formatData.length; i++) //Turn it into array of arrays instead of array of objects
    { 
      formatData[i] = formatData[i].array;
    }

    dataSet = formatData; //Set the dataset to the dataSet passed in from the user

    var n = dataSet.length, // Number of layers
      m = dataSet[0].length, // Number of samples per layer
      stack = d3.layout.stack(),
      layers = dataSet,
      yGroupMax = d3.max(layers, function(layer) { return d3.max(layer, function(d) { return d.y; }); }),
      yStackMax = d3.max(layers, function(layer) { return d3.max(layer, function(d) { return d.y0 + d.y; }); });

    var margin = {top: 40, right: 10, bottom: 20, left: 10},
        width = wid - margin.left - margin.right,
        height = hei - margin.top - margin.bottom;

    var x = d3.scale.ordinal()
        .domain(d3.range(m))
        .rangeRoundBands([0, width], .08);

    var y = d3.scale.linear()
        .domain([0, yStackMax])
        .range([height, 0]);

    color = d3.scale.linear()
        .domain([0, n - 1])
        .range(col);

    var xAxis = d3.svg.axis()
        .scale(x)
        .tickSize(0)
        .tickPadding(6)
        .tickFormat(function (d) {return binNames[d]})
        .orient("bottom");

    var svg = d3.select('#my-div').append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var layer = svg.selectAll(".layer")
        .data(layers)
        .enter().append("g")
        .attr("class", "layer")
        .style("fill", function(d, i) { return color(i); });

    var rect = layer.selectAll("rect")
        .data(function(d) { return d; })
        .enter().append("rect")
        .attr("x", function(d) { return x(d.x) + x.rangeBand() * ((barWidth - 1) / 2); })
        .attr("y", height)
        .attr("width", x.rangeBand() * barWidth)
        .attr("height", 0)
        .on('mouseover', function(d){
          d3.select(this).style({opacity: highlightOpacity});
          if (showData)
          {
            document.getElementById("userRead").innerHTML = "<b>Stacked Height:</b> " + d.y1 + ", <b>Layer Value:</b> " + d.y + " ";
          }
        })
        .on('mouseout', function(d){
          d3.select(this).style({opacity:'1.0',});
          document.getElementById("userRead").innerHTML = "";
        });

    rect.transition()
        .delay(function(d, i) { return i * 10; })
        .attr("y", function(d) { return y(d.y0 + d.y); })
        .attr("height", function(d) { return y(d.y0) - y(d.y0 + d.y); });

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

  

    d3.selectAll("input").on("change", change);

    var timeout = setTimeout(function() {
      d3.select("input[value=\"" + startPos + "\"]").property("checked", true).each(change);
    }, 500);

    function change() {
      clearTimeout(timeout);
      if (this.value === "grouped") transitionGrouped();
      else transitionStacked();
    }

    function transitionGrouped() {
      y.domain([0, yGroupMax]);

      rect.transition()
          .duration(500)
          .delay(function(d, i) { return i * 10; })
          .attr("x", function(d, i, j) { return x(d.x) + x.rangeBand() / n * j; })
          .attr("width", x.rangeBand() / n)
        .transition()
          .attr("y", function(d) { return y(d.y); })
          .attr("height", function(d) { return height - y(d.y); });
    }

    function transitionStacked() {
      y.domain([0, yStackMax]);

      rect.transition()
          .duration(500)
          .delay(function(d, i) { return i * 10; })
          .attr("y", function(d) { return y(d.y0 + d.y); })
          .attr("height", function(d) { return y(d.y0) - y(d.y0 + d.y); })
        .transition()
          .attr("x", function(d) { return x(d.x) + x.rangeBand() * ((barWidth - 1) / 2); })
          .attr("width", x.rangeBand() * barWidth);
    }

  }

  my.col = function(value) { //Used to set color value
    if (!arguments.length) return col;
    else if (value == 'purple') 
    {
      col = ["#aad", "#556"];
    }
    else if (value == 'blue') 
    {
      col = ["#2020ff", "#000020"];
    }
    else if (value == 'green') 
    {
      col = ["#009f00", "#004000"];
    }
    else if (value == 'yellow') 
    {
      col = ["#ff0", "#404000"];
    }
    else if (value == 'black') 
    {
      col = ["#000", "#606060"];
    }
    return my;
  };

  my.barWidth = function(value) { //Used to set width of bars
    if (!arguments.length) return barWidth;
    barWidth = value;
    return my;
  };

  my.binNames = function(value) { //Used to set tick labels on the x-axis
    if (!arguments.length) return binNames;
    if (value == 'numbers') {
      for (i = 0; i < binNames.length; i++)
      { 
        binNames[i] = i;
      }
    } 
    else if (value == 'combo') {
      for (i = 0; i < binNames.length; i++)
      { 
        binNames[i] = i + ": " + binNames[i];
      }
    }
    else if (value == 'blank') {
      for (i = 0; i < binNames.length; i++)
      { 
        binNames[i] = "";
      }
    } 
    else {
      for (i = 0; i < binNames.length; i++)
      { 
        binNames[i] = binNames[i];
      }
    }
    return my;
  };

  my.highlightOpacity = function(value) { //Used to set changed opacity on hover
    if (!arguments.length) return highlightOpacity;
    highlightOpacity = value;
    return my;
  };

  my.startPos = function(value) { //Used to set which format is displayed on initialization
    if (!arguments.length) return startPos;
    if (value == 'stacked')
    {
      startPos = "stacked";
    }
    else
    {
      startPos = "grouped";
    }
    return my;
  };

  my.showData = function(value) { //Used to determine if data values shown at top
    if (!arguments.length) return showData;
    showData = value;
    return my;
  };

  return my;

};