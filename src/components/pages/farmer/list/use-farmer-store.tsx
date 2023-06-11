import { axListFarmer } from "@services/farmer.service";
import { PAGINATION_LIMIT } from "@static/constants";
import { useImmer } from "use-immer";

const DEFAULT_STATE = { offset: 0, hasMore: false, farmer: [] as any[] };

export function useFarmerStore() {
  const [state, setState] = useImmer(DEFAULT_STATE);

  const addFarmer = (farmer) => {
    setState((_draft) => {
      _draft.farmer.push(farmer);
      _draft.offset = _draft.offset + 1;
    });
  };

  const setFarmers = ({ success, data, reset, offset, hasMore }: any) => {
    if (!success) return;

    const dataN = data.map((arr) => {
      console.log("arr from farmer: ", arr);

      return {
        ...arr,
        lotStatus: arr?.lotStatus,
        lotId: arr?.lotId,
      };
    });

    setState((_draft) => {
      console.log("old draft from farmer: ", _draft);
      console.log("reset: ", reset);
      if (reset) {
        _draft.farmer = dataN;
      } else {
        _draft.farmer.push(...dataN);
      }

      _draft.offset = offset;
      _draft.hasMore = hasMore;
    });
  };

  const updateFarmer = (lot) => {
    console.log("lot from farmer update: ", lot);
    setState((_draft) => {
      console.log("old draft from farmer update: ", _draft.farmer);
      const toUpdateIndex = _draft.farmer.findIndex((o) => o._id === lot._id);
      if (toUpdateIndex) {
        _draft.farmer[toUpdateIndex] = lot;
      }
    });
  };

  const listFarmer = async ({ reset, ccCodes }: { reset?; ccCodes }) => {
    if (state.farmer.length % PAGINATION_LIMIT === 0 || reset) {
      const offset = reset ? 0 : state.offset;
      const response = await axListFarmer(ccCodes, offset);
      setFarmers(response);
    }
  };

  const clearFarmer = () => {
    setState((_draft) => {
      _draft.farmer = DEFAULT_STATE.farmer;
      _draft.hasMore = DEFAULT_STATE.hasMore;
      _draft.offset = DEFAULT_STATE.offset;
    });
  };

  return { state, addFarmer, setFarmers, updateFarmer, listFarmer, clearFarmer };
}
