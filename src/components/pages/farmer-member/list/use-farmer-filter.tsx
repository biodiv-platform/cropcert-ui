import useDidUpdateEffect from "@hooks/use-did-update-effect";
import { axListAggregationFarmerMember, axListFarmerMember } from "@services/farmer.service";
import { isBrowser } from "@static/constants";
import {
  DEFAULT_MEDIA_GALLERY_FILTER,
  MEDIA_GALLERY_LIST_PAGINATION_LIMIT,
} from "@static/media-gallery-list";
import NProgress from "nprogress";
import { stringify } from "query-string";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useImmer } from "use-immer";

export interface FARMER_LIST_DATA {
  length: number;
  offset: number;
  hasMore: boolean;
  isLoading: boolean;
  farmer: any[];
  aggregations?: any[];
}

interface FarmerFilterContextProps {
  filter: any;
  farmerListData: FARMER_LIST_DATA;
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
  clearFarmerMember: () => void;
  aggregations?: any;
  filterCount: number;
  setFilterCount;
}

const FarmerFilterContext = createContext<FarmerFilterContextProps>({} as FarmerFilterContextProps);

export const FarmerFilterProvider = (props) => {
  const [filter, setFilter] = useImmer({ f: props.filter });
  const [farmerListData, setFarmerListData] = useImmer<FARMER_LIST_DATA>(props.farmerListData);
  const [aggregations, setFarmerListAggregationData] = useState({});
  const [selectAll, setSelectAll] = useState(false);
  const [ccCodes, setCCCodes] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [filterCount, setFilterCount] = useState(0);

  const fetchListData = async () => {
    if (ccCodes.length === 0) return;
    setLoading(true);
    NProgress.start();
    try {
      const farmerData = await axListFarmerMember(ccCodes, { ...filter.f });
      const dataMapAggregation = await axListAggregationFarmerMember(ccCodes, { ...filter.f });
      setFarmerListData(farmerData.data);
      setFarmerListAggregationData(dataMapAggregation.data);

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

  const clearFarmerMember = () => {
    setFarmerListData({
      length: 0,
      offset: 0,
      hasMore: false,
      isLoading: false,
      farmer: [],
    });
  };

  return (
    <FarmerFilterContext.Provider
      value={{
        filter: filter.f,
        setFilter,
        addFilter,
        removeFilter,
        nextPage,
        resetFilter,
        selectAll,
        setSelectAll,
        farmerListData,
        ccCodes,
        setCCCodes,
        loading,
        clearFarmerMember,
        aggregations,
        filterCount,
        setFilterCount,
      }}
    >
      {props.children}
    </FarmerFilterContext.Provider>
  );
};

export default function useFarmerFilter() {
  return useContext(FarmerFilterContext);
}
