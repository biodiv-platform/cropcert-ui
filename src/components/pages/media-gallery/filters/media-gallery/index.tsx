import { Spinner } from "@chakra-ui/react";
import { axGetAllMediaGallery } from "@services/media-gallery.service"; // Make sure to import the appropriate function here
import { axGetUsersByID } from "@services/user.service";
import React, { useEffect, useState } from "react";

import useMediaGalleryFilter from "../../common/use-media-gallery-filter";
import SelectInputField from "./selectInput";

export default function MediaGalleryFilterInput({ filterKey }) {
  const { filter, addFilter, removeFilter } = useMediaGalleryFilter();
  const [mediaGalleryList, setMediaGalleryList] = useState<any[]>([]);

  useEffect(() => {
    axGetAllMediaGallery().then((data) => {
      setMediaGalleryList(data);
    });
  }, []);

  const mapProjectList = (mediaGalleryList) =>
    mediaGalleryList?.map((item) => ({
      label: item.name,
      value: item.id,
    }));

  const [selectedValues, setSelectedValues] = useState([]);

  useEffect(() => {
    axGetUsersByID(filter?.[filterKey]).then((defaultValue) => {
      setSelectedValues(defaultValue.filter(({ value }) => filter?.[filterKey]?.includes(value)));
    });
  }, []);

  const handleOnChange = (selectedOptions) => {
    setSelectedValues(selectedOptions);
    const selectedValuesAsString = selectedOptions.map(({ value }) => value).toString();

    if (selectedOptions?.length > 0) {
      addFilter(filterKey, selectedValuesAsString);
    } else {
      removeFilter(filterKey);
    }
  };

  return (
    <>
      {mediaGalleryList.length > 0 ? (
        <SelectInputField
          name="mediaGalleryId"
          options={mapProjectList(mediaGalleryList)}
          label=""
          shouldPortal={true}
          value={selectedValues}
          onChange={handleOnChange}
        />
      ) : (
        <Spinner />
      )}
    </>
  );
}
