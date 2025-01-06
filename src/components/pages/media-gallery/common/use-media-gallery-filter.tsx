import { useCheckboxGroup, useDisclosure } from "@chakra-ui/react";
import useDidUpdateEffect from "@hooks/use-did-update-effect";
import { MediaGalleryData } from "@interfaces/custom";
import { axGetMediaGallery, axGetMediaGalleryList } from "@services/media-gallery.service";
import { isBrowser } from "@static/constants";
import {
  DEFAULT_MEDIA_GALLERY_FILTER,
  MEDIA_GALLERY_LIST_PAGINATION_LIMIT,
} from "@static/media-gallery-list";
import NProgress from "nprogress";
import { stringify } from "query-string";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useImmer } from "use-immer";

interface MediaGalleryFilterContextProps {
  filter?;
  mediaGalleryData: MediaGalleryData;
  mediaGalleryListData: MediaGalleryData;
  setMediaGalleryListData?;
  setMediaGalleryData?;
  totalCount?;
  mediaGalleryListAdd?;
  setFilter?;
  addFilter?;
  removeFilter?;
  children?;
  nextPage?;
  resetFilter?;
  getCheckboxProps?;
  selectAll?: boolean;
  setSelectAll?;
  bulkMediaGalleryIds?: any[];
  handleBulkCheckbox: (arg: string) => void;
  isOpen?;
  onOpen?;
  onClose?;
}
const MediaGalleryFilterContext = createContext<MediaGalleryFilterContextProps>(
  {} as MediaGalleryFilterContextProps
);
export const MediaGalleryFilterProvider = (props) => {
  const initialOffset = props.filter.offset;
  const [filter, setFilter] = useImmer({ f: props.filter });
  const [mediaGalleryData, setMediaGalleryData] = useImmer(props.mediaGalleryData);
  const [mediaGalleryListData, setMediaGalleryListData] = useImmer(props.mediaGalleryData); // Initialize with initial data if needed
  const [selectAll, setSelectAll] = useState(false);
  const { open, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (isBrowser) {
      window.history.pushState("", "", `?${stringify({ ...filter.f, offset: initialOffset })}`);
    }
  }, [filter]);

  const { value: bulkMediaGalleryIds, setValue } = useCheckboxGroup();

  const handleBulkCheckbox = (actionType: string) => {
    switch (actionType) {
      case "selectAll":
        setSelectAll(true);
        setValue(mediaGalleryData?.l?.map((i) => String(i.resource.id)));
        break;
      case "UnsSelectAll":
        setValue([]);
        setSelectAll(false);
        break;
    }
  };

  const fetchListData = async () => {
    try {
      NProgress.start();
      const { ...otherValues } = filter.f;
      const { data } = await axGetMediaGallery({ ...otherValues });

      setMediaGalleryData((_draft) => {
        if (filter.f.offset === 0) {
          _draft.l = [];
        }
        if (data?.mediaGalleryResource?.length) {
          _draft.l.push(...data.mediaGalleryResource);
          _draft.hasMore =
            data.totalCount > Number(filter.f.offset) && data.totalCount !== _draft.l.length;
        }
        _draft.name = data.mediaGallery.name;
        _draft.descripition = data.mediaGallery.descripition;
        _draft.n = data.totalCount;
      });

      NProgress.done();
    } catch (e) {
      console.error(e);
      NProgress.done();
    }
  };

  const fetchMediaGalleryListData = async () => {
    try {
      NProgress.start();
      const { ...otherValues } = filter.f;
      const { data } = await axGetMediaGalleryList({ ...otherValues });

      setMediaGalleryListData((_draft) => {
        if (filter.f.offset === 0) {
          _draft.l = [];
        }
        if (data?.mediaGalleryResource?.length) {
          _draft.l.push(...data.mediaGalleryResource);
          _draft.hasMore =
            data.totalCount > Number(filter.f.offset) && data.totalCount !== _draft.l.length;
        }
        _draft.n = data.totalCount;
      });

      NProgress.done();
    } catch (e) {
      console.error(e);
      NProgress.done();
    }
  };

  useDidUpdateEffect(() => {
    fetchListData();
    fetchMediaGalleryListData();
  }, [filter]);

  useDidUpdateEffect(() => {
    if (selectAll) {
      handleBulkCheckbox("selectAll");
    }
  }, [mediaGalleryData.l]);

  const addFilter = (key, value) => {
    setFilter((_draft) => {
      _draft.f.offset = 0;
      _draft.f[key] = value;
    });
  };

  const removeFilter = (key) => {
    setFilter((_draft) => {
      delete _draft.f[key];
    });
  };

  const nextPage = (max = MEDIA_GALLERY_LIST_PAGINATION_LIMIT) => {
    if (selectAll) {
      handleBulkCheckbox("selectAll");
    }
    setFilter((_draft) => {
      _draft.f.offset = Number(_draft.f.offset) + max;
    });
  };

  const resetFilter = () => {
    setFilter((_draft) => {
      _draft.f = DEFAULT_MEDIA_GALLERY_FILTER;
    });
  };

  const mediaGalleryListAdd = (items) => {
    setMediaGalleryData((_draft) => {
      _draft.l.push(...items);
    });
  };

  return (
    <MediaGalleryFilterContext.Provider
      value={{
        filter: filter.f,
        mediaGalleryData,
        mediaGalleryListData,
        setMediaGalleryListData,
        setMediaGalleryData,
        mediaGalleryListAdd,
        setFilter,
        addFilter,
        removeFilter,
        nextPage,
        resetFilter,
        // getCheckboxProps,
        selectAll,
        setSelectAll,
        bulkMediaGalleryIds,
        handleBulkCheckbox,
        isOpen: open,
        onOpen,
        onClose,
      }}
    >
      {props.children}
    </MediaGalleryFilterContext.Provider>
  );
};

export default function useMediaGalleryFilter() {
  return useContext(MediaGalleryFilterContext);
}
