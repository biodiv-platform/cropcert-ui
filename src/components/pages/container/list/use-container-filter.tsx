import useDidUpdateEffect from "@hooks/use-did-update-effect";
import { axListAggregationContainer, axListContainer } from "@services/container.service";
import { isBrowser } from "@static/constants";
import {
  DEFAULT_MEDIA_GALLERY_FILTER,
  MEDIA_GALLERY_LIST_PAGINATION_LIMIT,
} from "@static/media-gallery-list";
import NProgress from "nprogress";
import { stringify } from "query-string";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useImmer } from "use-immer";

export interface CONTAINER_LIST_DATA {
  length: number;
  offset: number;
  hasMore: boolean;
  isLoading: boolean;
  container: any[];
  aggregationData?: any[];
}

interface ContainerFilterContextProps {
  filter: any;
  containerListData: CONTAINER_LIST_DATA;
  setFilter: (filter: any) => void;
  addFilter: (key: string, value: any) => void;
  removeFilter: (key: string) => void;
  nextPage: (max?: number) => void;
  resetFilter: () => void;
  selectAll: boolean;
  setSelectAll: (selectAll: boolean) => void;
  coCodes: any[];
  setCOCodes: (codes: any[]) => void;
  loading: boolean;
  clearContainer: () => void;
  aggregations?: any;
  updateContainer;
  filterCount: number;
  setFilterCount;
}

const ContainerFilterContext = createContext<ContainerFilterContextProps>(
  {} as ContainerFilterContextProps
);

export const ContainerFilterProvider = (props) => {
  const [filter, setFilter] = useImmer({ f: props.filter });
  const [containerListData, setContainerListData] = useImmer<CONTAINER_LIST_DATA>(
    props.containerListData
  );
  const [aggregations, setContainerListAggregationData] = useState({});
  const [selectAll, setSelectAll] = useState(false);
  const [coCodes, setCOCodes] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const [filterCount, setFilterCount] = useState(0);

  const updateContainer = () => {
    fetchListData();
  };

  const fetchListData = async () => {
    if (coCodes.length === 0) return;
    setLoading(true);
    NProgress.start();
    try {
      const containerData = await axListContainer(coCodes, { ...filter.f });
      const dataMapAggregation = await axListAggregationContainer(coCodes, { ...filter.f });
      setContainerListData(containerData.data);
      setContainerListAggregationData(dataMapAggregation.data);

      NProgress.done();
    } catch (e) {
      console.error(e);
    } finally {
      NProgress.done();
      setLoading(false);
    }
  };

  useDidUpdateEffect(() => {
    fetchListData();
  }, [coCodes, filter.f]);

  useEffect(() => {
    if (isBrowser && filterCount > 0) {
      window.history.pushState("", "", `?${stringify({ ...filter.f })}`);
    }
  }, [filter, filterCount]);

  const addFilter = (key: string, value: any) => {
    setFilter((draft) => {
      draft.f[key] = value;
    });
  };

  const removeFilter = (key: string) => {
    setFilter((draft) => {
      delete draft.f[key];
    });
  };

  const nextPage = (max = MEDIA_GALLERY_LIST_PAGINATION_LIMIT) => {
    setFilter((draft) => {
      draft.f.offset = Number(draft.f.offset) + max;
    });
  };

  const resetFilter = () => {
    setFilter({ f: DEFAULT_MEDIA_GALLERY_FILTER });
  };

  const clearContainer = () => {
    setContainerListData({
      length: 0,
      offset: 0,
      hasMore: false,
      isLoading: false,
      container: [],
    });
  };

  return (
    <ContainerFilterContext.Provider
      value={{
        filter: filter.f,
        setFilter,
        addFilter,
        removeFilter,
        nextPage,
        resetFilter,
        selectAll,
        setSelectAll,
        containerListData,
        coCodes,
        setCOCodes,
        loading,
        clearContainer,
        aggregations,
        updateContainer,
        filterCount,
        setFilterCount,
      }}
    >
      {props.children}
    </ContainerFilterContext.Provider>
  );
};

export default function useContainerFilter() {
  return useContext(ContainerFilterContext);
}
