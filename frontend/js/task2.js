const viewport = Object.freeze({
  minX: -5200,
  minY: -400,
  maxX: 3100,
  maxY: 8100,
});

const projection = d3.geoIdentity().reflectY(true);

const buildMap = async (
  svgId,
  width,
  height,
  drawPaths = false,
  coordinates
) => {
  const parsePolygons = (location) => {
    const noPrefix = location.replace(/POLYGON \(\(/, "").replace(/\)\)/g, "");
    const rawPolygons = noPrefix.split("), (");
    const polygons = rawPolygons.map((rawPolygon) => {
      const points = rawPolygon
        .split(", ")
        .map((point) => point.split(" ").map(Number));
      return points;
    });
    return polygons;
  };

  const buildingData = await d3.csv(
    "../data/Datasets/Attributes/Buildings.csv"
  );

  const buildings = buildingData.map((building) => {
    const coordinates = parsePolygons(building.location);
    return {
      type: "Feature",
      properties: {
        id: building.buildingId,
        buildingType: building.buildingType,
      },
      geometry: {
        type: "Polygon",
        coordinates: coordinates,
      },
    };
  });

  const geojson = {
    type: "FeatureCollection",
    features: buildings,
  };

  const borderObj = (extent) => {
    return {
      type: "Feature",
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [extent.minX, extent.minY],
            [extent.maxX, extent.minY],
            [extent.maxX, extent.maxY],
            [extent.minX, extent.maxY],
            [extent.minX, extent.minY],
          ],
        ],
      },
    };
  };

  const project = (features, geoExtent, width, height) => {
    return projection.fitExtent(
      [
        [0, 0],
        [width, height],
      ],
      geoExtent ? geoExtent : features
    );
  };

  const geoShape = (geo, geoExtent = null, svgId, width, height) => {
    const features = geo.features ? geo.features : [geo];
    d3.select(`#${svgId}`)
      .selectAll("path")
      .data(features)
      .join("path")
      .attr("class", "geo-polygon")
      .attr("stroke", "black")
      .attr("stroke-width", 0.3)
      .attr("d", d3.geoPath(project(geo, geoExtent, width, height)));
  };

  geoShape(geojson, borderObj(viewport), svgId, width, height);

  const arrayDepth = (value) => {
    return Array.isArray(value) ? 1 + Math.max(0, ...value.map(arrayDepth)) : 0;
  };

  if (drawPaths) {
    const lines = (lineCoords) => {
      if (!lineCoords) {
        return;
      }
      lineCoords.forEach((coordinates) => {
        return line(coordinates);
      });
    };
    const line = (coordinates) => {
      const tCoords = coordinates.map(projection);
      const path = `M${tCoords.join("L")}`;
      d3.select(`#${svgId}`)
        .append("path")
        .attr("class", "traffic")
        .attr("stroke", "red")
        .attr("stroke-width", 0.8)
        .attr("fill", "none")
        .attr("d", path);
    };
    lines(coordinates);
  }
};

const getColor = (type) => {
  switch (type) {
    case "Commercial":
      return "#c5aaf4"; 
    case "Residental":
      return "#90EE90"; 
    case "School":
      return "#FF8C00"; 
    default:
      return "#D3D3D3"; 
  }
};

const processData = async (filePath) => {
  const response = await fetch(filePath);
  const data = await response.json();
  const resultObject = {};
  data.forEach((entry) => {
    const participantId = entry.participant_id;
    let path = entry.locations.map((loc) => loc.location);
    entry.locations.forEach((locationObj) => {
      const timestamp = new Date(locationObj.timestamp).toISOString();
      if (!resultObject[timestamp]) {
        resultObject[timestamp] = [];
      }

      resultObject[timestamp].push(path);
    });
  });
  return resultObject;
};

const commonSVGfunc = (svg, width) => {
  const background = svg
    .append("rect")
    .attr("x", width - 230) 
    .attr("y", 0)
    .attr("width", 240) 
    .attr("height", 70) 
    .style("fill", "#ffffff") 
    .style("rx", 20) 
    .style("ry", 20)
    .style("filter", "url(#shadow)"); 

  svg
    .append("text")
    .attr("id", "timer-task2")
    .attr("x", width-200)
    .attr("y", 50)
    .style("font-size", "40px")
    .style("font-weight", "700") 
    .style("fill", "#333"); 

  svg
    .append("defs")
    .append("filter")
    .attr("id", "shadow")
    .append("feDropShadow")
    .attr("dx", 0)
    .attr("dy", 4)
    .attr("stdDeviation", 2)
    .attr("flood-color", "rgba(0,0,0,0.4)");
};

export default async (svgId) => {
  document.getElementById(svgId).remove();
  const cardBody = d3.select("#card-2");

  const height = 700;
  const width = 600;

  const svg1 = cardBody
    .append("svg")
    .attr("id", `${svgId}-1`)
    .attr("width", width)
    .attr("height", height)
    .style("margin-left", "80px")
    .style("margin-right", "50px");

  svg1.append("text")
    .attr("x", width / 2) 
    .attr("y", height - 30) 
    .attr("text-anchor", "middle") 
    .style("font-size", "20px")
    .style("font-weight", "bold") 
    .text("Weekday");
 

  const svg2 = cardBody
    .append("svg")
    .attr("id", `${svgId}-2`)
    .attr("width", width+100)
    .attr("height", height);


  svg2.append("text")
    .attr("x", width / 2) 
    .attr("y", height - 30) 
    .attr("text-anchor", "middle") 
    .style("font-size", "20px") 
    .style("font-weight", "bold")
    .text("Weekend");

  const resultObject = await processData("../data/travel_logs_data.json");
  const resultObject2 = await processData("../data/travel_logs_data2.json");

  const updateGraph = async (svg_id, currentTime, obj) => {
    d3.select(`#${svg_id}`).selectAll().remove();
    const coordinates = obj[currentTime.toISOString()];

    await buildMap(svg_id, width, height, true, coordinates);

    d3.select(`#${svg_id}`)
      .selectAll(".geo-polygon")
      .attr("fill", (d) => getColor(d.properties.buildingType));
  };

  let currentDate = new Date("2023-02-18T00:00:00Z");
  const interval = 5 * 60 * 1000;
  const timerInterval = 500;

  commonSVGfunc(svg2, width);
  setInterval(() => {
    currentDate.setTime(currentDate.getTime() + interval);

    if (currentDate <= new Date("2023-02-18T23:55:00Z")) {
      d3.select("#timer-task2").text(
        currentDate.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "numeric",
          
          hour12: true,
          timeZone: "UTC",
        })
      );
    } else {
      currentDate = new Date("2023-02-18T00:00:00Z");
      d3.select("#timer-task2").text(
        currentDate.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "numeric",
          
          hour12: true,
          timeZone: "UTC",
        })
      );
    }
    updateGraph(`${svgId}-1`, currentDate, resultObject);
  }, timerInterval);

  updateGraph(`${svgId}-1`, currentDate, resultObject);

  let currentDate2 = new Date("2022-03-01T00:00:00Z");

  setInterval(() => {
    currentDate2.setTime(currentDate2.getTime() + interval);

    if (currentDate2 <= new Date("2022-03-01T23:55:00Z")) {
      d3.select("#timer-task2").text(
        currentDate2.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
          timeZone: "UTC",
        })
      );
    } else {
      currentDate2 = new Date("2022-03-01T00:00:00Z");
      d3.select("#timer-task2").text(
        currentDate2.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
          timeZone: "UTC",
        })
      );
    }
    updateGraph(`${svgId}-2`, currentDate2, resultObject2);
  }, timerInterval);

  updateGraph(`${svgId}-2`, currentDate2, resultObject2);
};
