import { axListLot } from "@services/lot.service";
import { PAGINATION_LIMIT } from "@static/constants";
import { useImmer } from "use-immer";

const DEFAULT_STATE = { offset: 0, hasMore: true, isLoading: true, lot: [] as any[] };

export function useLotStore() {
  const [state, setState] = useImmer(DEFAULT_STATE);

  const setLot = ({ success, data, reset, offset, hasMore }: any) => {
    if (!success) return;

    setState((_draft) => {
      if (reset) {
        _draft.lot = data;
      } else {
        _draft.lot.push(...data);
      }

      _draft.offset = offset;
      _draft.hasMore = hasMore;
      _draft.isLoading = false;
    });
  };

  const updateLot = (lot) => {
    setState((_draft) => {
      const toUpdateIndex = _draft.lot.findIndex((o) => o._id === lot._id);
      if (toUpdateIndex) {
        _draft.lot[toUpdateIndex] = lot;
      }
    });
  };

  const listLot = async ({ reset, ccCodes }: { reset?; ccCodes }) => {
    setState((_draft) => {
      _draft.isLoading = true;
    });
    const offset = reset ? 0 : state.offset;
    const response = await axListLot(ccCodes, offset);
    setLot(response);
  };

  const clearLot = () => {
    setState((_draft) => {
      _draft.lot = DEFAULT_STATE.lot;
      _draft.hasMore = DEFAULT_STATE.hasMore;
      _draft.offset = DEFAULT_STATE.offset;
    });
  };

  const setLoading = (isLoading) => {
    setState((_draft) => {
      _draft.isLoading = isLoading;
    });
  };

  return { state, setLot, updateLot, listLot, clearLot, setLoading };
}
