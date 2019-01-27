// @TODO: YOUR CODE HERE!
// The code for the chart is wrapped inside a function that
// automatically resizes the chart
function makeResponsive() {

  // if the SVG area isn't empty when the browser loads,
  // remove it and replace it with a resized version of the chart
  var svgArea = d3.select("body").select("svg");

  // clear svg is not empty
  if (!svgArea.empty()) {
    svgArea.remove();
  }
  // SVG wrapper dimensions are determined by the current width and
  // height of the browser window.
  var svgWidth = window.innerWidth-window.innerWidth/4;
  var svgHeight = window.innerHeight-window.innerHeight/4;

  var margin = {
    top: 50,
    right: 50,
    bottom: 50,
    left: 50
  };

  var height = svgHeight - margin.top - margin.bottom;
  var width = svgWidth - margin.left - margin.right;

  // Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
  var svg = d3.select(".scatter")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

  var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  //Import data
  d3.csv("assets/data/data.csv")
    .then(function(data) {
      // Parse Data/Cast as numbers
      // ==============================
      data.forEach(function(response) {
        response.poverty = +response.poverty;
        response.healthcare = +response.healthcare;
        response.smokes = +response.smokes;
        response.ageMoe = +response.ageMoe;
        response.incomeMoe = +response.incomeMoe;
        response.obesity = +response.obesity;
        //console.log(response.poverty,response.healthcare);
      });
      //console.log(data);
      

      // Create scale functions
      // ==============================
      var xlinearscale= d3.scaleLinear()
                        .domain(d3.extent(data, d=>d.poverty))
                        .range([0,width]);
      var ylinearscale= d3.scaleLinear()
                        .domain(d3.extent(data, d=>d.healthcare))
                        .range([height, 0]);

      // Create axis functions
      // ==============================
      var bottomAxis= d3.axisBottom(xlinearscale);
      var leftAxis= d3.axisLeft(ylinearscale);

      // Append Axes to the chart
      // ==============================
      chartGroup.append("g").attr('transform',`translate(0,${height})`).call(bottomAxis);
      chartGroup.append("g").call(leftAxis);

      // Create Circles
      // ==============================
      var circlegroup= chartGroup.selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr('cx', d => xlinearscale(d.poverty))
      .attr('cy', d => ylinearscale(d.healthcare))
      .attr("r", "8")
      .attr('fill',"purple")
      .attr("opacity", '.7');
    
      //add text to circles
      chartGroup.append("text")
      .style("text-anchor", "middle")
      .style("font-size", "9px")
      .style("font-family","Times New Roman")
      .style("font-color","white")
      .selectAll("tspan")
      .data(data)
      .enter()
      .append("tspan")
          .attr("x", d=>xlinearscale(d.poverty))
          .attr("y", d=>ylinearscale(d.healthcare-0.2))
          .text(d=>d.abbr)
          .style("font-color","white");
   
  //  Add color coded titles to the x-axis
  chartGroup.append("text")
  // Position the text
  // Center the text:
  .attr("transform", `translate(${width / 2}, ${height + margin.top/1.5})`)
  .attr("text-anchor", "middle")
  .attr("font-size", "16px")
  .attr("fill", "black")
  .attr('font-weight','bold')
  .attr("font-family","Times New Roman")
  .text("In Poverty (%)");

  chartGroup.append("text")
  // Position the text
  // Center the text:
  .attr("transform", `translate(${-30}, ${height -height/2})rotate(270)`)
  .attr("text-anchor", "middle")
  .attr("font-size", "16px")
  .attr("font-family","Times New Roman")
  .attr("fill", "black")
  .attr('font-weight','bold')
  .text("Lack of Health Care (%)");

      });
    }

    // When the browser loads, makeResponsive() is called.
    makeResponsive();
    
    // When the browser window is resized, makeResponsive() is called.
    d3.select(window).on("resize", makeResponsive);