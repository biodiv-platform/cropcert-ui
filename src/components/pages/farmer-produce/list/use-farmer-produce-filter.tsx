import useDidUpdateEffect from "@hooks/use-did-update-effect";
import { axListAggregationFarmerProduce, axListFarmerProduce } from "@services/farmer.service";
import { isBrowser } from "@static/constants";
import {
  DEFAULT_MEDIA_GALLERY_FILTER,
  MEDIA_GALLERY_LIST_PAGINATION_LIMIT,
} from "@static/media-gallery-list";
import NProgress from "nprogress";
import { stringify } from "query-string";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useImmer } from "use-immer";

export interface FARMER_PRODUCE_LIST_DATA {
  length: number;
  offset: number;
  hasMore: boolean;
  isLoading: boolean;
  farmerProduce: any[];
  aggregationData?: any[];
}

interface FarmerProduceFilterContextProps {
  filter: any;
  farmerProduceListData: FARMER_PRODUCE_LIST_DATA;
  setFilter: (filter: any) => void;
  addFilter: (key: string, value: any) => void;
  removeFilter: (key: string) => void;
  nextPage: (max?: number) => void;
  resetFilter: () => void;
  selectAll: boolean;
  setSelectAll: (selectAll: boolean) => void;
  ccCodes: any[];
  setCCCodes: (codes: any[]) => void;
  loading: boolean;
  clearFarmerProduce: () => void;
  aggregations?: any;
  updateFarmerProduce;
  filterCount: number;
  setFilterCount;
}

const FarmerProduceFilterContext = createContext<FarmerProduceFilterContextProps>(
  {} as FarmerProduceFilterContextProps
);

export const FarmerProduceFilterProvider = (props) => {
  const [filter, setFilter] = useImmer({ f: props.filter });
  const [farmerProduceListData, setFarmerProduceListData] = useImmer<FARMER_PRODUCE_LIST_DATA>(
    props.farmerProduceListData
  );
  const [aggregations, setFarmerProduceListAggregationData] = useState({});
  const [selectAll, setSelectAll] = useState(false);
  const [ccCodes, setCCCodes] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [filterCount, setFilterCount] = useState(0);

  const updateFarmerProduce = () => {
    fetchListData();
  };

  const fetchListData = async () => {
    if (ccCodes.length === 0) return;
    setLoading(true);
    NProgress.start();
    try {
      const farmerProduceData = await axListFarmerProduce(ccCodes, { ...filter.f });
      const dataMapAggregation = await axListAggregationFarmerProduce(ccCodes, { ...filter.f });
      setFarmerProduceListData(farmerProduceData.data);
      setFarmerProduceListAggregationData(dataMapAggregation.data);

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
  }, [ccCodes, filter.f]);

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

  const clearFarmerProduce = () => {
    setFarmerProduceListData({
      length: 0,
      offset: 0,
      hasMore: false,
      isLoading: false,
      farmerProduce: [],
    });
  };

  return (
    <FarmerProduceFilterContext.Provider
      value={{
        filter: filter.f,
        setFilter,
        addFilter,
        removeFilter,
        nextPage,
        resetFilter,
        selectAll,
        setSelectAll,
        farmerProduceListData,
        ccCodes,
        setCCCodes,
        loading,
        clearFarmerProduce,
        aggregations,
        updateFarmerProduce,
        filterCount,
        setFilterCount,
      }}
    >
      {props.children}
    </FarmerProduceFilterContext.Provider>
  );
};

export default function useFarmerProduceFilter() {
  return useContext(FarmerProduceFilterContext);
}
