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

export const bindPropertiesToGeoJSON = (geojson, properties) => {
  // Ensure the input is a FeatureCollection
  if (geojson.type !== "FeatureCollection") {
    throw new Error("Input GeoJSON must be a FeatureCollection");
  }

  // Map over the features and add properties to each, including the index
  const updatedFeatures = geojson.features.map((feature, index) => ({
    ...feature,
    properties: {
      ...feature.properties, // Preserve any existing properties
      ...properties, // Add new properties
      featureIndex: index, // Add the index of the feature
    },
  }));

  // Return a new GeoJSON object with updated features
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
