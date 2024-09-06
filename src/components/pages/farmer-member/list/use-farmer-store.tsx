import useDidUpdateEffect from "@hooks/use-did-update-effect";
import { axListFarmerMember } from "@services/farmer.service";
import { PAGINATION_LIMIT } from "@static/constants";
import { useImmer } from "use-immer";

const DEFAULT_STATE = {
  offset: 0,
  hasMore: false,
  isLoading: true,
  farmer: [] as any[],
};
const DEFAULT_FILTER = { offset: 0, max: PAGINATION_LIMIT };

export function useFarmerStore() {
  const [state, setState] = useImmer(DEFAULT_STATE);
  const [filter, setFilter] = useImmer<{ f: any }>({ f: DEFAULT_FILTER });
  const [ccCodes, setCCCodes] = useImmer([] as any);

  const addFarmerMember = (farmer) => {
    setState((_draft) => {
      _draft.farmer.push(farmer);
      _draft.offset = _draft.offset + 1;
    });
  };

  const setFarmerMembers = ({ success, data, reset, offset, hasMore }: any) => {
    if (!success) return;

    const dataN = data.map((arr) => ({
      ...arr,
      lotStatus: arr?.lotStatus,
      lotId: arr?.lotId,
    }));

    setState((_draft) => {
      if (reset) {
        _draft.farmer = dataN;
      } else {
        _draft.farmer.push(...dataN);
      }

      _draft.offset = offset;
      _draft.hasMore = hasMore;
      _draft.isLoading = false;
    });
  };

  const updateFarmerMember = (lot) => {
    setState((_draft) => {
      const toUpdateIndex = _draft.farmer.findIndex((o) => o._id === lot._id);
      if (toUpdateIndex) {
        _draft.farmer[toUpdateIndex] = lot;
      }
    });
  };

  const fetchListData = async () => {
    try {
      // Reset list data if offset is 0
      if (filter.f.offset === 0) {
        setState((_draft) => {
          _draft.farmer = [];
          _draft.hasMore = true;
          _draft.offset = 0;
        });
      }

      const { ...otherValues } = filter.f;
      const response = await axListFarmerMember(ccCodes, { ...otherValues });

      setFarmerMembers({
        success: response.success,
        data: response.data,
        reset: filter.f.offset === 0,
        offset: filter.f.offset,
        hasMore: response.data.length === PAGINATION_LIMIT,
      });
    } catch (error) {
      console.error(error);
      setState((_draft) => {
        _draft.isLoading = false;
      });
    }
  };

  const listFarmerMember = async () => {
    if (state.farmer.length % PAGINATION_LIMIT === 0) {
      setState((_draft) => {
        _draft.isLoading = true;
      });

      await fetchListData();
    }
  };

  const clearFarmerMember = () => {
    setState((_draft) => {
      _draft.farmer = DEFAULT_STATE.farmer;
      _draft.hasMore = DEFAULT_STATE.hasMore;
      _draft.offset = DEFAULT_STATE.offset;
      _draft.isLoading = DEFAULT_STATE.isLoading;
    });
  };

  const setLoading = (isLoading) => {
    setState((_draft) => {
      _draft.isLoading = isLoading;
    });
  };

  const addFilter = (key, value) => {
    if (value?.length === 0) {
      removeFilter(key);
      return;
    }

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

  const resetFilter = () => {
    setFilter(() => ({ f: DEFAULT_FILTER }));
  };

  useDidUpdateEffect(() => {
    fetchListData();
  }, [filter]);

  return {
    state,
    filter: filter.f,
    setFilter,
    addFilter,
    removeFilter,
    resetFilter,
    addFarmerMember,
    setFarmerMembers,
    updateFarmerMember,
    listFarmerMember,
    clearFarmerMember,
    setLoading,

    ccCodes,
    setCCCodes,
  };
}
