import { buildMap, projection, getColor } from "./common-map.js";

const checkboxStates = {"Commercial":true,"Residential":true,"School":true,"Other":true};

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
  
  legendItems
    .append("foreignObject")
    .attr("width", 18)
    .attr("height", 18)
    .attr("x", legendWidth - 170)
    .attr("y", 0)
    .html(`<input type="checkbox" checked="true" style="width: 14px; height: 14px;">`)
    .on("change", function (event, d) {
      const isChecked = this.querySelector("input").checked;
      console.log("Check",isChecked);
      if(isChecked == true)
        checkboxStates[d.label] = true;
      else
        checkboxStates[d.label] = false;
      handleCheckboxChange(checkboxStates,d.label,this.checked);
    });

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

function handleCheckboxChange(states, label, isChecked) {
  console.log("checkBox States", checkboxStates);
  d3.select(`#${svgId}`)
    .selectAll("path")
    .attr("fill", (d) => ((checkboxStates[d.properties.buildingType == "Residental" ? "Residential" : d.properties.buildingType]==true) ? getColor(d.properties.buildingType) : "white"));

}

await buildMap(svgId, width, height);

d3.select(`#${svgId}`)
    .selectAll("path")
    .attr("fill", (d) => getColor(d.properties.buildingType));

  createLegend();
};
