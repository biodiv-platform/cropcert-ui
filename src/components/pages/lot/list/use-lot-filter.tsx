import useDidUpdateEffect from "@hooks/use-did-update-effect";
import { axListAggregationLot, axListLot } from "@services/lot.service";
import { isBrowser } from "@static/constants";
import {
  DEFAULT_MEDIA_GALLERY_FILTER,
  MEDIA_GALLERY_LIST_PAGINATION_LIMIT,
} from "@static/media-gallery-list";
import NProgress from "nprogress";
import { stringify } from "query-string";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useImmer } from "use-immer";

export interface Lot_LIST_DATA {
  length: number;
  offset: number;
  hasMore: boolean;
  isLoading: boolean;
  lot: any[];
  aggregationData?: any[];
}

interface LotFilterContextProps {
  filter: any;
  lotListData: Lot_LIST_DATA;
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
  clearLot: () => void;
  aggregations?: any;
  updateLot;
  filterCount: number;
  setFilterCount;
}

const LotFilterContext = createContext<LotFilterContextProps>({} as LotFilterContextProps);

export const LotFilterProvider = (props) => {
  const [filter, setFilter] = useImmer({ f: props.filter });
  const [lotListData, setLotListData] = useImmer<Lot_LIST_DATA>(props.lotListData);
  const [aggregations, setLotListAggregationData] = useState({});
  const [selectAll, setSelectAll] = useState(false);
  const [coCodes, setCOCodes] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const [filterCount, setFilterCount] = useState(0);

  const updateLot = () => {
    fetchListData();
  };

  const fetchListData = async () => {
    if (coCodes.length === 0) return;
    setLoading(true);
    NProgress.start();
    try {
      const lotData = await axListLot(coCodes, { ...filter.f });
      const dataMapAggregation = await axListAggregationLot(coCodes, { ...filter.f });
      setLotListData(lotData.data);
      setLotListAggregationData(dataMapAggregation.data);

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

  const clearLot = () => {
    setLotListData({
      length: 0,
      offset: 0,
      hasMore: false,
      isLoading: false,
      lot: [],
    });
  };

  return (
    <LotFilterContext.Provider
      value={{
        filter: filter.f,
        setFilter,
        addFilter,
        removeFilter,
        nextPage,
        resetFilter,
        selectAll,
        setSelectAll,
        lotListData,
        coCodes,
        setCOCodes,
        loading,
        clearLot,
        aggregations,
        updateLot,
        filterCount,
        setFilterCount,
      }}
    >
      {props.children}
    </LotFilterContext.Provider>
  );
};

export default function useLotFilter() {
  return useContext(LotFilterContext);
}
