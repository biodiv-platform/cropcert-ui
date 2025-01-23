import { useDisclosure } from "@chakra-ui/react";
import useDidUpdateEffect from "@hooks/use-did-update-effect";
import { ResourceData } from "@interfaces/custom";
import { axGetAllResources } from "@services/media-gallery.service";
import { isBrowser } from "@static/constants";
import { DEFAULT_RESOURCE_FILTER, RESOURCE_LIST_PAGINATION_LIMIT } from "@static/resource-list";
import NProgress from "nprogress";
import { stringify } from "query-string";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useImmer } from "use-immer";

import { useCheckboxGroup } from "@/hooks/use-checkbox-group";

interface ResourceFilterContextProps {
  filter?;
  resourceData: ResourceData;
  setResourceData?;
  totalCount?;
  resourceListAdd?;
  setFilter?;
  addFilter?;
  removeFilter?;
  children?;
  nextPage?;
  resetFilter?;
  getCheckboxProps?;
  selectAll?: boolean;
  setSelectAll?;
  bulkResourceIds?: any[];
  unselectedResourceIds?;
  handleBulkCheckbox: (arg: string) => void;
  open?;
  onOpen?;
  onClose?;
}
const ResourceFilterContext = createContext<ResourceFilterContextProps>(
  {} as ResourceFilterContextProps
);
export const ResourceFilterProvider = (props) => {
  const initialOffset = props.filter.offset;
  const [filter, setFilter] = useImmer({ f: props.filter });
  const [resourceData, setResourceData] = useImmer(props.resourceData);
  const [selectAll, setSelectAll] = useState(false);
  const { open, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (isBrowser) {
      window.history.pushState("", "", `?${stringify({ ...filter.f, offset: initialOffset })}`);
    }
  }, [filter]);

  const { getCheckboxProps, value: bulkResourceIds, setValue } = useCheckboxGroup();

  const allResourceIds = resourceData?.l?.map((item) => String(item.resource.id)) || [];

  const unselectedResourceIds = allResourceIds
    .filter((id) => !bulkResourceIds.includes(id))
    .join(",");

  const handleBulkCheckbox = (actionType: string) => {
    switch (actionType) {
      case "selectAll":
        setSelectAll(true);
        setValue(resourceData?.l?.map((i) => String(i.resource.id)));
        break;
      case "UnsSelectAll":
        setValue([]);
        setSelectAll(false);
        break;
      case "nextPageSelect":
        if (selectAll) {
          setValue(allResourceIds.filter((id) => unselectedResourceIds.includes(id)));
        }
    }
  };

  const fetchListData = async () => {
    try {
      NProgress.start();
      const { ...otherValues } = filter.f;
      const { data } = await axGetAllResources({ ...otherValues });

      setResourceData((_draft) => {
        if (filter.f.offset === 0) {
          _draft.l = [];
        }
        if (data?.resourceDataList?.length) {
          _draft.l.push(...data.resourceDataList);
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
  }, [filter]);

  useDidUpdateEffect(() => {
    if (selectAll) {
      handleBulkCheckbox("nextPageSelect");
    }
  }, [resourceData.l]);

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

  const nextPage = (max = RESOURCE_LIST_PAGINATION_LIMIT) => {
    handleBulkCheckbox("nextPageSelect");
    setFilter((_draft) => {
      _draft.f.offset = Number(_draft.f.offset) + max;
    });
  };

  const resetFilter = () => {
    setFilter((_draft) => {
      _draft.f = DEFAULT_RESOURCE_FILTER;
    });
  };

  const resourceListAdd = (items) => {
    setResourceData((_draft) => {
      _draft.l.push(...items);
    });
  };

  return (
    <ResourceFilterContext.Provider
      value={{
        filter: filter.f,
        resourceData,
        setResourceData,
        resourceListAdd,
        setFilter,
        addFilter,
        removeFilter,
        nextPage,
        resetFilter,
        getCheckboxProps,
        selectAll,
        setSelectAll,
        bulkResourceIds,
        unselectedResourceIds,
        handleBulkCheckbox,
        open,
        onOpen,
        onClose,
      }}
    >
      {props.children}
    </ResourceFilterContext.Provider>
  );
};

export default function useResourceFilter() {
  return useContext(ResourceFilterContext);
}
