import { buildMap, projection, getColor } from "./common-map.js";

export default async (svgId) => {
  const svgElement = document.getElementById(svgId);
  const width = svgElement.clientWidth;
  const height = svgElement.clientHeight;

  const svg = d3
    .select(`#${svgId}`)
    .attr("width", width)
    .attr("height", height);

const createLegend = () => {
  const legendData = [
    { label: "Commercial", color: getColor("Commercial") },
    { label: "Residential", color: getColor("Residental") },
    { label: "School", color: getColor("School") },
    
  ];

  const legendPadding = 10;
  const legendItemHeight = 20;
  const legendWidth = 150;

  const legend = svg
    .append("g")
    .attr("transform", `translate(${width - legendWidth}, ${legendPadding})`);

  const defs = svg.append("defs");
  const shadowFilter = defs.append("filter")
      .attr("id", "drop-shadow")
      .attr("height", "130%");

  shadowFilter.append("feGaussianBlur")
      .attr("in", "SourceAlpha")
      .attr("stdDeviation", 3)
      .attr("result", "blur");
  
  shadowFilter.append("feOffset")
      .attr("in", "blur")
      .attr("dx", 3)
      .attr("dy", 3)
      .attr("result", "offsetBlur");

  const feMerge = shadowFilter.append("feMerge");
  feMerge.append("feMergeNode")
      .attr("in", "offsetBlur");
  feMerge.append("feMergeNode")
      .attr("in", "SourceGraphic");

  const legendItems = legend
    .selectAll("g.legend-item")
    .data(legendData)
    .enter()
    .append("g")
    .attr("class", "legend-item")
    .attr("transform", (d, i) => `translate(0, ${i * legendItemHeight})`);

  legendItems
    .append("rect")
    .attr("width", 10)
    .attr("height", 10)
    .attr("x", 0)
    .attr("y", 4)
    .style("fill", (d) => d.color);

  legendItems
    .append("text")
    .attr("x", 15)
    .attr("y", 15)
    .text((d) => d.label);

  legend.insert("rect", ":first-child")
    .attr("x", -35)
    .attr("y", legendItemHeight-30)
    .attr("width", legendWidth+30)
    .attr("height", legendData.length * legendItemHeight + legendPadding * 2)
    .style("fill", "#fff")
    .attr("rx", 20)
    .attr("ry", 20)
    .style("filter", "url(#drop-shadow)");
};


  await buildMap(svgId, width, height);

  d3.select(`#${svgId}`)
    .selectAll("path")
    .attr("fill", (d) => getColor(d.properties.buildingType));

  createLegend();

  const response = await fetch("../data/Datasets/Attributes/Apartments.csv");
  const apartmentsData = await response.text();
  const apartments = d3.csvParse(apartmentsData);

  const positiveRentalCosts = apartments.map((apartment) => Math.max(0, apartment["rentalCost"]));
  const lighterRed = d3.hsl("#ff0000").brighter(0.1).toString();
  const darkerRed = d3.hsl("#ff9999").brighter(5).toString();
  const colorScale = d3.scaleLinear()
  .domain([d3.min(positiveRentalCosts), d3.max(positiveRentalCosts)])
  .range([lighterRed,darkerRed]); 

const sizeScale = d3.scaleSequentialSqrt()
  .domain([d3.min(positiveRentalCosts), d3.max(positiveRentalCosts)])
  .range([0.2, 10]);

  const coordinates = apartments.map((apartment) => {
    let point = apartment.location
      .replace("POINT (", "")
      .replace(")", "")
      .split(" ")
      .map(Number);
      return {
        coordinates: point,
        colorParameter: apartment["rentalCost"],
        sizeParameter: apartment["rentalCost"]
      };
  });

const personGroup = svg
  .selectAll("g.person-group")
  .data(coordinates)
  .join("g")
  .attr("class", "person-group")
  .attr("transform", (d) => `translate(${projection(d.coordinates)})`);


personGroup
  .data(coordinates)
  .append("circle")
  .attr("r", (d) => sizeScale(d.sizeParameter))
  .attr("fill", (d) => colorScale(d.colorParameter))
  .style("stroke", "black") 
  .style("stroke-width", 0.5);


  d3.select(`#${svgId}`)
    .selectAll("path")
    .attr("fill", (d) => getColor(d.properties.buildingType))
    .attr("stroke", "white");

const createRentalCostLegend = () => {
  const legendWidth = 200; 
  const legendHeight = 40; 
  const legendPadding = 15; 
  const legendXOffset = 20; 
  const legendYOffset = 500; 

  
  const legend = svg
    .append("g")
    .attr("transform", `translate(${width - legendWidth - legendXOffset}, ${legendPadding + 60 + legendYOffset})`);

  
  const gradient = legend
    .append("linearGradient")
    .attr("id", "rentalCostLegendGradient")
    .attr("x1", "0%")
    .attr("y1", "0%")
    .attr("x2", "100%")
    .attr("y2", "0%");

  
  gradient
    .selectAll("stop")
    .data(colorScale.range())
    .enter()
    .append("stop")
    .attr("offset", (d, i) => i / (colorScale.range().length - 1))
    .attr("stop-color", (d) => d);

  
  legend
    .append("rect")
    .attr("width", legendWidth)
    .attr("height", legendHeight)
    .style("fill", "url(#rentalCostLegendGradient)")
    .style("stroke", "#000")
    .attr("rx", 5)
    .attr("ry", 5)
    .style("filter", "url(#drop-shadow)");

  
  const minValueLabel = d3.min(positiveRentalCosts);
  const maxValueLabel = d3.max(positiveRentalCosts);

  legend
    .append("text")
    .attr("x", 0)
    .attr("y", legendHeight + legendPadding * 2)
    .text(minValueLabel);

  legend
    .append("text")
    .attr("x", legendWidth)
    .attr("y", legendHeight + legendPadding * 2)
    .attr("text-anchor", "end")
    .text(maxValueLabel);
};


createRentalCostLegend();
};
