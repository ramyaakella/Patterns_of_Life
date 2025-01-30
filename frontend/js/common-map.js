const viewport = Object.freeze({
  minX: -5200,
  minY: -400,
  maxX: 3100,
  maxY: 8100,
});

export const projection = d3.geoIdentity().reflectY(true);

export const buildMap = async (
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

export const getColor = (type) => {
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
