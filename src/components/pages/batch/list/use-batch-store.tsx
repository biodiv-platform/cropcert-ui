import { axListBatch } from "@services/batch.service";
import { useImmer } from "use-immer";

const DEFAULT_STATE = { offset: 0, hasMore: false, isLoading: true, batch: [] as any[] };

export function useBatchStore() {
  const [state, setState] = useImmer(DEFAULT_STATE);

  const addBatch = (batch) => {
    setState((_draft) => {
      _draft.batch.push(batch);
      _draft.offset = _draft.offset + 1;
    });
  };

  const setBatches = ({ success, data, reset, offset, hasMore }: any) => {
    if (!success || !Array.isArray(data)) return;

    const dataN = data.map((arr) => {
      return {
        ...arr,
        lotStatus: arr?.lotStatus,
        lotId: arr?.lotId,
      };
    });

    setState((_draft) => {
      if (reset) {
        _draft.batch = dataN;
      } else {
        _draft.batch.push(...dataN);
      }

      _draft.offset = offset;
      _draft.hasMore = hasMore;
      _draft.isLoading = false;
    });
  };

  const updateBatch = (lot) => {
    setState((_draft) => {
      const toUpdateIndex = _draft.batch.findIndex((o) => o._id === lot._id);
      if (toUpdateIndex) {
        _draft.batch[toUpdateIndex] = lot;
      }
    });
  };

  const listBatch = async ({ reset, coCodes }: { reset?; coCodes }) => {
    setState((_draft) => {
      _draft.isLoading = true;
    });
    const offset = reset ? 0 : state.offset;
    const response = await axListBatch(coCodes, offset);
    setBatches(response);
  };

  const clearBatch = () => {
    setState((_draft) => {
      _draft.batch = DEFAULT_STATE.batch;
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

  return { state, addBatch, setBatches, updateBatch, listBatch, clearBatch, setLoading };
}
