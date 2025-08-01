import useDidUpdateEffect from "@hooks/use-did-update-effect";
import { axListAggregationFarmerMember, axListFarmerMember } from "@services/farmer.service";
import { isBrowser } from "@static/constants";
import { DEFAULT_MEDIA_GALLERY_FILTER } from "@static/media-gallery-list";
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
  setFilterCount: (count: number) => void;
  page: number;
  perPage: number;
  totalRows: number;
  handlePageChange: (page: number) => void;
  handlePerRowsChange: (perPage: number, page: number) => void;
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
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(20);
  const [totalRows, setTotalRows] = useState(0);

  const fetchListData = async () => {
    if (ccCodes.length === 0) return;
    setLoading(true);
    NProgress.start();
    try {
      const farmerData = await axListFarmerMember(ccCodes, {
        ...filter.f,
        page,
        limit: perPage,
      });
      const dataMapAggregation = await axListAggregationFarmerMember(ccCodes, { ...filter.f });

      if (
        farmerData.success &&
        typeof farmerData.data !== "undefined" &&
        "data" in farmerData.data
      ) {
        setFarmerListData(farmerData.data.data);
        setTotalRows(farmerData.data.totalCount);
      } else {
        setFarmerListData({
          length: 0,
          offset: 0,
          hasMore: false,
          isLoading: false,
          farmer: [],
        });
        setTotalRows(0);
      }
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
  }, [ccCodes, filter.f, page, perPage]);

  useEffect(() => {
    if (isBrowser && filterCount > 0) {
      window.history.pushState("", "", `?${stringify({ ...filter.f })}`);
    }
  }, [filter, filterCount]);

  const handlePageChange = (pageNumber: number) => {
    setPage(pageNumber);
  };

  const handlePerRowsChange = (newPerPage: number, pageNumber: number) => {
    setPerPage(newPerPage);
    setPage(pageNumber);
  };
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
        page,
        perPage,
        totalRows,
        handlePageChange,
        handlePerRowsChange,
      }}
    >
      {props.children}
    </FarmerFilterContext.Provider>
  );
};

export default function useFarmerFilter() {
  return useContext(FarmerFilterContext);
}
