import useDidUpdateEffect from "@hooks/use-did-update-effect";
import { axListAggregationLot, axListLot } from "@services/lot.service";
import { isBrowser } from "@static/constants";
import { DEFAULT_MEDIA_GALLERY_FILTER } from "@static/media-gallery-list";
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
  nextPage: () => void;
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
  page: number;
  perPage: number;
  totalRows: number;
  handlePageChange: (page: number) => void;
  handlePerRowsChange: (newPerPage, page) => void;
}

const LotFilterContext = createContext<LotFilterContextProps>({} as LotFilterContextProps);

export const LotFilterProvider = (props) => {
  const [filter, setFilter] = useImmer({ f: props.filter });
  const [lotListData, setLotListData] = useImmer<Lot_LIST_DATA>(props.lotListData);
  const [aggregations, setLotListAggregationData] = useState({});
  const [selectAll, setSelectAll] = useState(false);
  const [coCodes, setCOCodes] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(20);
  const [totalRows, setTotalRows] = useState(0);

  const [filterCount, setFilterCount] = useState(0);

  const updateLot = () => {
    fetchListData();
  };

  const fetchListData = async () => {
    if (coCodes.length === 0) return;
    setLoading(true);
    NProgress.start();
    try {
      const lotData = await axListLot(coCodes, { ...filter.f, page, limit: perPage });
      const dataMapAggregation = await axListAggregationLot(coCodes, { ...filter.f });
      if (lotData.success && typeof lotData.data !== "undefined" && "data" in lotData.data) {
        setLotListData(lotData.data.data);
        setTotalRows(lotData.data.totalCount);
      } else {
        setLotListData({
          length: 0,
          offset: 0,
          hasMore: false,
          isLoading: false,
          lot: [],
        });
        setTotalRows(0);
      }
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
  }, [coCodes, filter.f, page, perPage]);

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

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handlePerRowsChange = async (newPerPage, newPage) => {
    setPage(newPage);
    setPerPage(newPerPage);
  };

  const nextPage = () => {
    setPage((prev) => prev + 1);
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
        page,
        perPage,
        totalRows,
        handlePageChange,
        handlePerRowsChange,
      }}
    >
      {props.children}
    </LotFilterContext.Provider>
  );
};

export default function useLotFilter() {
  return useContext(LotFilterContext);
}
