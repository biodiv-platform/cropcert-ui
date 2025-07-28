import useDidUpdateEffect from "@hooks/use-did-update-effect";
import { axListAggregationBatch, axListBatch } from "@services/batch.service";
import { isBrowser } from "@static/constants";
import { DEFAULT_MEDIA_GALLERY_FILTER } from "@static/media-gallery-list";
import NProgress from "nprogress";
import { stringify } from "query-string";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useImmer } from "use-immer";

export interface Batch_LIST_DATA {
  length: number;
  offset: number;
  hasMore: boolean;
  isLoading: boolean;
  batch: any[];
  aggregationData?: any[];
}

interface BatchFilterContextProps {
  filter: any;
  batchListData: Batch_LIST_DATA;
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
  clearBatch: () => void;
  aggregations?: any;
  updateBatch: () => void;
  addBatch: (batch: any) => void;
  filterCount: number;
  setFilterCount: (count: number) => void;
  page: number;
  perPage: number;
  totalRows: number;
  handlePageChange: (page: number) => void;
  handlePerRowsChange: (newPerPage, page) => void;
}

const BatchFilterContext = createContext<BatchFilterContextProps>({} as BatchFilterContextProps);

export const BatchFilterProvider = (props) => {
  const [filter, setFilter] = useImmer({ f: props.filter });
  const [batchListData, setBatchListData] = useImmer<Batch_LIST_DATA>(props.batchListData);
  const [aggregations, setBatchListAggregationData] = useState({});
  const [selectAll, setSelectAll] = useState(false);
  const [coCodes, setCOCodes] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const [filterCount, setFilterCount] = useState(0);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(20);
  const [totalRows, setTotalRows] = useState(0);

  const updateBatch = () => {
    fetchListData();
  };

  const addBatch = (batch) => {
    setBatchListData((draft) => {
      draft.batch.push(batch);
      draft.offset = draft.offset + 1;
    });
  };

  const fetchListData = async () => {
    if (coCodes.length === 0) return;
    setLoading(true);
    NProgress.start();
    try {
      const batchData = await axListBatch(coCodes, {
        ...filter.f,
        page,
        limit: perPage,
      });
      const dataMapAggregation = await axListAggregationBatch(coCodes, { ...filter.f });
      if (batchData.success && typeof batchData.data !== "undefined" && "data" in batchData.data) {
        setBatchListData(batchData.data.data);
        setTotalRows(batchData.data.totalCount);
      } else {
        setBatchListData({
          length: 0,
          offset: 0,
          hasMore: false,
          isLoading: false,
          batch: [],
        });
        setTotalRows(0);
      }
      setBatchListAggregationData(dataMapAggregation.data);

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

  const nextPage = () => {
    setPage((prev) => prev + 1);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handlePerRowsChange = async (newPerPage, newPage) => {
    setPage(newPage);
    setPerPage(newPerPage);
  };

  const resetFilter = () => {
    setFilter({ f: DEFAULT_MEDIA_GALLERY_FILTER });
  };

  const clearBatch = () => {
    setBatchListData({
      length: 0,
      offset: 0,
      hasMore: false,
      isLoading: false,
      batch: [],
    });
  };

  return (
    <BatchFilterContext.Provider
      value={{
        filter: filter.f,
        setFilter,
        addFilter,
        removeFilter,
        nextPage,
        resetFilter,
        selectAll,
        setSelectAll,
        batchListData,
        coCodes,
        setCOCodes,
        loading,
        clearBatch,
        aggregations,
        updateBatch,
        addBatch,
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
    </BatchFilterContext.Provider>
  );
};

export default function useBatchFilter() {
  return useContext(BatchFilterContext);
}
