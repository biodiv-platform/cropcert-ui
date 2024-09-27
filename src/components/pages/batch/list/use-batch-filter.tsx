import useDidUpdateEffect from "@hooks/use-did-update-effect";
import { axListAggregationBatch, axListBatch } from "@services/batch.service";
import { isBrowser } from "@static/constants";
import {
  DEFAULT_MEDIA_GALLERY_FILTER,
  MEDIA_GALLERY_LIST_PAGINATION_LIMIT,
} from "@static/media-gallery-list";
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
  batchListAggregationData?: any;
  updateBatch;
  addBatch;
}

const BatchFilterContext = createContext<BatchFilterContextProps>({} as BatchFilterContextProps);

export const BatchFilterProvider = (props) => {
  const [filter, setFilter] = useImmer({ f: props.filter });
  const [batchListData, setBatchListData] = useImmer<Batch_LIST_DATA>(props.batchListData);
  const [batchListAggregationData, setBatchListAggregationData] = useState({});
  const [selectAll, setSelectAll] = useState(false);
  const [coCodes, setCOCodes] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const updateBatch = (lot) => {
    setBatchListData((draft) => {
      const toUpdateIndex = draft.batch.findIndex((o) => o._id === lot._id);
      if (toUpdateIndex !== -1) {
        draft.batch[toUpdateIndex] = lot;
      }
    });
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
      const batchData = await axListBatch(coCodes, { ...filter.f });
      const dataMapAggregation = await axListAggregationBatch(coCodes, { ...filter.f });
      setBatchListData(batchData.data);
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
  }, [coCodes, filter.f]);

  useEffect(() => {
    if (isBrowser) {
      window.history.pushState("", "", `?${stringify({ ...filter.f })}`);
    }
  }, [filter]);

  const addFilter = (key: string, value: any) => {
    setFilter((draft) => {
      draft.f.offset = 0;
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
        batchListAggregationData,
        updateBatch,
        addBatch,
      }}
    >
      {props.children}
    </BatchFilterContext.Provider>
  );
};

export default function useBatchFilter() {
  return useContext(BatchFilterContext);
}
