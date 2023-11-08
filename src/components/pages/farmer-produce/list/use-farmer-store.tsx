import { axListFarmer } from "@services/farmer.service";
import { PAGINATION_LIMIT } from "@static/constants";
import { useImmer } from "use-immer";

const DEFAULT_STATE = { offset: 0, hasMore: false, isLoading: true, farmer: [] as any[] };

export function useFarmerStore() {
  const [state, setState] = useImmer(DEFAULT_STATE);

  const addFarmerProduce = (farmer) => {
    setState((_draft) => {
      _draft.farmer.push(farmer);
      _draft.offset = _draft.offset + 1;
    });
  };

  const setFarmerProduces = ({ success, data, reset, offset, hasMore }: any) => {
    if (!success) return;

    const dataN = data.map((arr) => {
      return {
        ...arr,
        lotStatus: arr?.lotStatus,
        lotId: arr?.lotId,
      };
    });

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

  const updateFarmerProduce = (lot) => {
    setState((_draft) => {
      const toUpdateIndex = _draft.farmer.findIndex((o) => o._id === lot._id);
      if (toUpdateIndex) {
        _draft.farmer[toUpdateIndex] = lot;
      }
    });
  };

  const listFarmerProduce = async ({ reset, ccCodes }: { reset?; ccCodes }) => {
    if (state.farmer.length % PAGINATION_LIMIT === 0 || reset) {
      setState((_draft) => {
        _draft.isLoading = true;
      });
      const offset = reset ? 0 : state.offset;
      const response = await axListFarmer(ccCodes, offset);
      setFarmerProduces(response);
    }
  };

  const clearFarmerProduce = () => {
    setState((_draft) => {
      _draft.farmer = DEFAULT_STATE.farmer;
      _draft.hasMore = DEFAULT_STATE.hasMore;
      _draft.offset = DEFAULT_STATE.offset;
    });
  };

  const setLoading = (isLoading) => {
    setState((_draft) => {
      _draft.isLoading = isLoading;
    });
  };

  return {
    state,
    addFarmerProduce,
    setFarmerProduces,
    updateFarmerProduce,
    listFarmerProduce,
    clearFarmerProduce,
    setLoading,
  };
}
