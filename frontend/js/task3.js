import { buildMap, projection, getColor } from "./common-map.js";

const getLabelColor = {
  AtHome: "#035c5c",
  Transport: "#54032b",
  AtRecreation: "#823d01",
  AtRestaurant: "#026b3c",
  AtWork: "#780801",
};

export default async (svgId) => {
  const svgElement = document.getElementById(svgId);
  const width = svgElement.clientWidth;
  const height = svgElement.clientHeight;

  const svg = d3
    .select(`#${svgId}`)
    .attr("width", width)
    .attr("height", height);

  const responsePerson1 = await fetch("../data/person1.json");
  const responsePerson2 = await fetch("../data/person2.json");

  const person1LocationData = await responsePerson1.json();
  const person2LocationData = await responsePerson2.json();
  
  const plotPeopleLocations = (locations1, locations2, timerInterval) => {
    const coordinate1 = locations1.currentLocation
      .replace("POINT (", "")
      .replace(")", "")
      .split(" ")
      .map(Number);
    const coordinate2 = locations2.currentLocation
      .replace("POINT (", "")
      .replace(")", "")
      .split(" ")
      .map(Number);
    const personGroups1 = svg
      .selectAll("g.person-group-1")
      .data([coordinate1])
      .join("g")
      .attr("class", "person-group-1");

    personGroups1
      .selectAll("image.person-icon")
      .data((d) => [d.currentLocation])
      .join("image")
      .attr("class", "person-icon")
      .attr("xlink:href", "./user1.svg")
      .attr("y", -8)
      .attr("width", 40)
      .attr("height", 35);

    personGroups1
      .selectAll("text.person-label")
      .data((d) => [d.currentLocation])
      .join("text")
      .attr("class", "person-label")
      .attr("x", 0)
      .attr("y", -15)
      .attr("text-anchor", "middle")
      .attr("font-size", "16px")
      .attr("font-weight", "bold")
      .style("fill", (d) => getLabelColor[locations1.currentMode])
      .text((d) => locations1.currentMode);

    personGroups1
      .transition()
      .duration(timerInterval)
      .attr("transform", `translate(${projection(coordinate1)})`);

    const personGroups2 = svg
      .selectAll("g.person-group-2")
      .data([coordinate2])
      .join("g")
      .attr("class", "person-group-2");

    personGroups2
      .selectAll("image.person-icon")
      .data((d) => [d.currentLocation])
      .join("image")
      .attr("class", "person-icon")
      .attr("xlink:href", "./user2.svg")
      .attr("x", -8)
      .attr("y", -8)
      .attr("width", 40)
      .attr("height", 35);

    personGroups2
      .selectAll("text.person-label")
      .data((d) => [d.currentLocation])
      .join("text")
      .attr("class", "person-label")
      .attr("x", 0)
      .attr("y", -15)
      .attr("text-anchor", "middle")
      .attr("font-size", "16px")
      .attr("font-weight", "bold")
      .style("fill", (d) => getLabelColor[locations2.currentMode])
      .text((d) => locations2.currentMode);

    personGroups2
      .transition()
      .duration(timerInterval)
      .attr("transform", `translate(${projection(coordinate2)})`);
  };

  await buildMap(svgId, width, height);

  let currentLocationIndex1 = 0;
  let currentLocationIndex2 = 0;

  let currentTime = new Date("2022-03-01T00:00:00Z");
  const interval = 5 * 60 * 1000;
  const timerInterval = 100;

  plotPeopleLocations(
    person1LocationData[currentLocationIndex1],
    person2LocationData[currentLocationIndex2],
    timerInterval
  );

  const background = svg
    .append("rect")
    .attr("x", width - 330) 
    .attr("y", 0)
    .attr("width", 240) 
    .attr("height", 70) 
    .style("fill", "#ffffff") 
    .style("rx", 20) 
    .style("ry", 20)
    .style("filter", "url(#shadow)"); 

  svg
    .append("text")
    .attr("id", "timer-task3")
    .attr("x", width - 300)
    .attr("y", 50)
    .style("font-size", "40px")
    .style("font-weight", "700") 
    .style("fill", "#333"); 

  setInterval(() => {
    currentTime.setTime(currentTime.getTime() + interval);

    if (currentTime <= new Date("2022-03-01T23:55:00Z")) 
    {
      d3.select(`#${svgId}`)
        .select("#timer-task3")
        .text(
          currentTime.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "numeric",
            // second: "numeric",
            hour12: true,
            timeZone: "UTC",
          })
        );
    } 
    else 
    {
      currentTime = new Date("2022-03-01T00:00:00Z");
      d3.select(`#${svgId}`)
        .select("#timer-task3")
        .text(
          currentTime.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "numeric",
            // second: "numeric",
            hour12: true,
            timeZone: "UTC",
          })
        );
        currentLocationIndex1 = 0;
        currentLocationIndex2 = 0;
    }

    currentLocationIndex1++;
    currentLocationIndex2++;

    if (
      currentLocationIndex1 < person1LocationData.length &&
      currentLocationIndex2 < person2LocationData.length
    ) {
      plotPeopleLocations(
        person1LocationData[currentLocationIndex1],
        person2LocationData[currentLocationIndex2],
        timerInterval
      );
    }
  }, timerInterval);

  d3.select(`#${svgId}`)
    .selectAll(".geo-polygon")
    .attr("fill", (d) => getColor(d.properties.buildingType));
};
