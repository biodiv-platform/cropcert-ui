export const timeUntilNext = (minutes) => {
  const now = new Date();
  const currentMinutes = now.getUTCMinutes();
  const seconds = now.getUTCSeconds();

  // Calculate how many seconds until the next specified minutes
  const untilNext = (minutes - (currentMinutes % minutes)) * 60 - seconds;

  return untilNext;
};

export const getLocalTime = (date) => {
  return new Date(date).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
};

// Helper function to filter out unwanted properties
const filterProperties = (properties) => {
  const { _id, featureIndex, cc, ...filteredProps } = properties;
  return filteredProps;
};

// When using bindPropertiesToGeoJSON, you can modify it like this:
export const bindPropertiesToGeoJSON = (geojson, properties) => {
  if (geojson.type !== "FeatureCollection") {
    throw new Error("Input GeoJSON must be a FeatureCollection");
  }

  const updatedFeatures = geojson.features.map((feature, index) => {
    const allProperties = {
      ...feature.properties,
      ...properties,
      featureIndex: index,
    };

    // Filter properties for popup display
    const displayProperties = filterProperties(allProperties);

    return {
      ...feature,
      properties: displayProperties,
    };
  });

  return {
    ...geojson,
    features: updatedFeatures,
  };
};

export const convertPointToFeatureCollection = (pointGeoJson, properties) => {
  return {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: pointGeoJson.coordinates,
        },
        properties: {
          ...properties,
        },
      },
    ],
  };
};
