// Initial Params
var xscale = "poverty";
var yscale = "healthcare";
//creat scales
function scale(xscale,yscale,data){
    // if the SVG area isn't empty when the browser loads,remove it and replace it with a resized version of the chart
    var svgArea = d3.select("body").select("svg");

    // clear svg is not empty
    if (!svgArea.empty()) {
      svgArea.remove();
    }
    var margin = {
      top: 50,
      right: 50,
      bottom: 100,
      left: 100
    };

    // SVG wrapper dimensions are determined by the current width andheight of the browser window.
    var svgWidth = window.innerWidth-window.innerWidth/4;
    var svgHeight = window.innerHeight-window.innerHeight/4;

    var height = svgHeight - margin.top - margin.bottom;
    var width = svgWidth - margin.left - margin.right;

    // Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
    var svg = d3.select(".scatter")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

    var circles = svg.append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    var xlinearscale= d3.scaleLinear()
                    .domain(d3.extent(data, d=>d[xscale]))
                    .range([0,width]);
    var ylinearscale= d3.scaleLinear()
                    .domain(d3.extent(data, d=>d[yscale]))
                    .range([height, 0]);

    // Create axis functions
    var bottomAxis= d3.axisBottom(xlinearscale);
    var leftAxis= d3.axisLeft(ylinearscale);

    // Append Axes to the chart
    circles.append("g").attr('transform',`translate(0,${height})`).call(bottomAxis);
    circles.append("g").call(leftAxis);

    // Create Circles
    circles.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr('cx', d => xlinearscale(d[xscale]))
    .attr('cy', d => ylinearscale(d[yscale]))
    .attr("r", "8")
    .attr('fill',"purple")
    .attr("opacity", '.7');

    // Create group for  2 x- axis labels
    var xlabelsGroup = circles.append("g")
    .attr("transform", `translate(${width / 2}, ${height + margin.top/1.5})`);

    // Create group for  2 y- axis labels
    var ylabelsGroup = circles.append("g")
    .attr("transform", `translate(${-30}, ${height -height/2})rotate(270)`);


    var poverty = xlabelsGroup.append("text")
    .attr("x", 0)
    .attr("y", 10)
    .attr("value", "poverty") // value to grab for event listener
    .classed("active", true)
    .text("In Poverty (%)");

    var age = xlabelsGroup.append("text")
    .attr("x", 0)
    .attr("y", 30)
    .attr("value", "age") // value to grab for event listener
    .classed("inactive", true)
    .text("Age (Median)");

    var income = xlabelsGroup.append("text")
    .attr("x", 0)
    .attr("y", 50)
    .attr("value", "income") // value to grab for event listener
    .classed("inactive", true)
    .text("Householde Income (Median)");

    var healthcare = ylabelsGroup.append("text")
    .attr("x", 0)
    .attr("y", -10)
    .attr("value", "healthcare") // value to grab for event listener
    .classed("inactive", true)
    .text("Lacks Healthcare (%)");

    var smokes = ylabelsGroup.append("text")
    .attr("x", 0)
    .attr("y", -30)
    .attr("value", "smokes") // value to grab for event listener
    .classed("inactive", true)
    .text("Smokes (%)");

    var obesity = ylabelsGroup.append("text")
    .attr("x", 0)
    .attr("y", -50)
    .attr("value", "obesity") // value to grab for event listener
    .classed("inactive", true)
    .text("Obese (%)");

    //add text to circles
    circles.append("text")
    .style("text-anchor", "middle")
    .style("font-size", "9px")
    .style("font-family","Times New Roman")
    .style("font-color","white")
    .selectAll("tspan")
    .data(data)
    .enter()
    .append("tspan")
        .attr("x", d=>xlinearscale(d[xscale]))
        .attr("y", d=>ylinearscale(d[yscale]-0.2))
        .text(d=>d.abbr)
        .style("font-color","white");

    updateToolTip(xscale,yscale, circles);
    // x axis labels event listener
    xlabelsGroup.selectAll("text")
    .on("click", function() {
      // get value of selection
      var value = d3.select(this).attr("value");
      if (value !== xscale) {
        var svgArea = d3.select("body").select("svg");
        // clear svg is not empty
          svgArea.remove();
        // replaces chosenXAxis with value
        xscale = value;
        scale(xscale,yscale,data);
        updateToolTip(xscale,yscale, circles);
  }
  
  });

      // y axis labels event listener
      ylabelsGroup.selectAll("text")
      .on("click", function() {
        // get value of selection
        var value = d3.select(this).attr("value");
        if (value !== xscale) {
          var svgArea = d3.select("body").select("svg");
          // clear svg is not empty
            svgArea.remove();
          // replaces chosenXAxis with value
          yscale = value;
          scale(xscale,yscale,data);
          updateToolTip(xscale,yscale, circles);
       }

        // changes classes to change bold text
        var expr = 'poverty';
        switch (expr) {
          case 'age':
          age
          .classed("active", true)
          .classed("inactive", false);
          poverty
          .classed("active", false)
          .classed("inactive", true);
          income
          .classed("active", false)
          .classed("inactive", true);
          healthcare
          .classed("active", false)
          .classed("inactive", true);
          smokes
          .classed("active", false)
          .classed("inactive", true);
          obesity
          .classed("active", false)
          .classed("inactive", true);
            break;
            case 'poverty':
            poverty
            .classed("active", true)
            .classed("inactive", false);
            age
            .classed("active", false)
            .classed("inactive", true);
            income
            .classed("active", false)
            .classed("inactive", true);
            healthcare
            .classed("active", false)
            .classed("inactive", true);
            smokes
            .classed("active", false)
            .classed("inactive", true);
            obesity
            .classed("active", false)
            .classed("inactive", true);
              break;
              case 'income':
              age
              .classed("active", true)
              .classed("inactive", false);
              poverty
              .classed("active", false)
              .classed("inactive", true);
              age
              .classed("active", false)
              .classed("inactive", true);
              healthcare
              .classed("active", false)
              .classed("inactive", true);
              smokes
              .classed("active", false)
              .classed("inactive", true);
              obesity
              .classed("active", false)
              .classed("inactive", true);
                break;
                case 'healthcare':
                age
                .classed("active", true)
                .classed("inactive", false);
                poverty
                .classed("active", false)
                .classed("inactive", true);
                income
                .classed("active", false)
                .classed("inactive", true);
                age
                .classed("active", false)
                .classed("inactive", true);
                smokes
                .classed("active", false)
                .classed("inactive", true);
                obesity
                .classed("active", false)
                .classed("inactive", true);
                  break;
                  case 'smokes':
                  age
                  .classed("active", true)
                  .classed("inactive", false);
                  poverty
                  .classed("active", false)
                  .classed("inactive", true);
                  income
                  .classed("active", false)
                  .classed("inactive", true);
                  healthcare
                  .classed("active", false)
                  .classed("inactive", true);
                  age
                  .classed("active", false)
                  .classed("inactive", true);
                  obesity
                  .classed("active", false)
                  .classed("inactive", true);
                    break;
          default:
          obesity
          .classed("active", true)
          .classed("inactive", false);
          poverty
          .classed("active", false)
          .classed("inactive", true);
          income
          .classed("active", false)
          .classed("inactive", true);
          healthcare
          .classed("active", false)
          .classed("inactive", true);
          age
          .classed("active", false)
          .classed("inactive", true);
          age
          .classed("active", false)
          .classed("inactive", true);
        }
    });
}

// function used for updating circles group with new tooltip
function updateToolTip(chosenXAxis,chosenYAxis, circlesGroup) {
      var toolTip = d3.tip()
        .attr("class", "d3-tip")
        .offset([80, -60])
        .html(function(d) {
          console.log(d);
          console.log(d[chosenXAxis],d[chosenYAxis]);
          return (`${d[state]}<br>${chosenXAxis}:${d[chosenXAxis]}<br>${chosenYAxis}:${d[chosenYAxis]}`);
        });
      
      console.log(chosenXAxis,chosenYAxis);
      circlesGroup.call(toolTip);

      circlesGroup.on("mouseover", function(data) {
        toolTip.show(data);
      })
        // onmouseout event
        .on("mouseout", function(data, index) {
          toolTip.hide(data);
        });
      
      return circlesGroup;
}

// The code for the chart is wrapped inside a function thatautomatically resizes the chart
function makeResponsive() {
  //Import data
  d3.csv("assets/data/data.csv")
    .then(function(data) {
      // Parse Data/Cast as numbers
      // ==============================
      data.forEach(function(response) {
        response.poverty = +response.poverty;
        response.healthcare = +response.healthcare;
        response.smokes = +response.smokes;
        response.ageMoe = +response.age;
        response.incomeMoe = +response.income;
        response.obesity = +response.obesity;
      });
      
      scale(xscale,yscale,data);    
  });
}

    // When the browser loads, makeResponsive() is called.
    makeResponsive();
    
    // When the browser window is resized, makeResponsive() is called.
    d3.select(window).on("resize", makeResponsive);