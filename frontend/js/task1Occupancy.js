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
    { label: "Residential", color: getColor("Residential") },
    { label: "School", color: getColor("School") },
    { label: "Other", color: getColor("Other") },
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
    .style("fill", (d) => d.color);

  legendItems
    .append("text")
    .attr("x", 15)
    .attr("y", 10)
    .text((d) => d.label);

  legend.insert("rect", ":first-child")
    .attr("width", legendWidth)
    .attr("height", legendData.length * legendItemHeight + legendPadding * 2)
    .style("fill", "#fff")
    .style("stroke", "#000")
    .attr("rx", 5)
    .attr("ry", 5)
    .style("filter", "url(#drop-shadow)");
};


  await buildMap(svgId, width, height);

  d3.select(`#${svgId}`)
    .selectAll("path")
    .attr("fill", (d) => getColor(d.properties.buildingType));


  const response = await fetch("../data/Datasets/Attributes/Apartments.csv");
  const apartmentsData = await response.text();
  const apartments = d3.csvParse(apartmentsData);

  apartments.forEach((apartment) => {
    console.log(apartment);
  });

  const occupancyValues = apartments.map((apartment) => apartment['maxOccupancy']);
  console.log("Occupancy",occupancyValues);
    
  const colorScaleOccupancy = d3.scaleSequential(d3.interpolateBlues) 
      .domain([d3.min(occupancyValues), d3.max(occupancyValues)]);  

  d3.select(`#${svgId}`)
  .selectAll("path")
  .data(apartments)
  .attr("fill", "white");

  d3.select(`#${svgId}`)
    .selectAll("path")
    .data(apartments)
    .attr("fill", (d) => colorScaleOccupancy(parseFloat(d.maxOccupancy)));

  

    const createOccupancyLegend = () => {
      const legendWidth = 200; 
      const legendHeight = 40; 
      const legendPadding = 15; 
      const legendXOffset = 20; 
    
      
      const legend = svg
        .append("g")
        .attr("transform", `translate(${width - legendWidth - legendXOffset}, ${legendPadding})`);
    
      
      const gradient = legend
        .append("linearGradient")
        .attr("id", "occupancyLegendGradient")
        .attr("x1", "0%")
        .attr("y1", "0%")
        .attr("x2", "100%")
        .attr("y2", "0%");
    
      
      gradient
        .selectAll("stop")
        .data(colorScaleOccupancy.range())
        .enter()
        .append("stop")
        .attr("offset", (d, i) => i / (colorScaleOccupancy.range().length - 1))
        .attr("stop-color", (d) => d);
    
      
      legend
        .append("rect")
        .attr("width", legendWidth)
        .attr("height", legendHeight)
        .style("fill", "url(#occupancyLegendGradient)")
        .style("stroke", "#000")
        .attr("rx", 5)
        .attr("ry", 5)
        .style("filter", "url(#drop-shadow)");
    
      
      const labels = [1, 2, 3, 4];
    
      labels.forEach((label, index) => {
        const dashHeight = 10; 
        const dashWidth = 1; 
    
        legend
          .append("line")
          .attr("x1", (index / (labels.length - 1)) * legendWidth)
          .attr("y1", legendHeight)
          .attr("x2", (index / (labels.length - 1)) * legendWidth)
          .attr("y2", legendHeight + dashHeight)
          .style("stroke", "#000");
    
        legend
          .append("text")
          .attr("x", (index / (labels.length - 1)) * legendWidth)
          .attr("y", legendHeight + dashHeight + legendPadding)
          .attr("text-anchor", "middle")
          .text(label);
      });
    };
    
    
    

    createOccupancyLegend();
    
  

};
