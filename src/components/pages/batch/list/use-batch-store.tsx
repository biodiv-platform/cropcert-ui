import { axListBatch } from "@services/batch.service";
import { PAGINATION_LIMIT } from "@static/constants";
import { useImmer } from "use-immer";

const DEFAULT_STATE = { offset: 0, hasMore: false, batch: [] as any[] };

export function useBatchStore() {
  const [state, setState] = useImmer(DEFAULT_STATE);

  const addBatch = (batch) => {
    setState((_draft) => {
      _draft.batch.push(batch);
      _draft.offset = _draft.offset + 1;
    });
  };

  const setBatches = ({ success, data, reset, offset, hasMore }: any) => {
    if (!success) return;

    const dataN = data.map((arr) => {
      console.log("arr from batch: ", arr);

      return {
        ...arr,
        lotStatus: arr?.lotStatus,
        lotId: arr?.lotId,
      };
    });

    setState((_draft) => {
      console.log("old draft from batch: ", _draft);
      console.log("reset: ", reset);
      if (reset) {
        _draft.batch = dataN;
      } else {
        _draft.batch.push(...dataN);
      }

      _draft.offset = offset;
      _draft.hasMore = hasMore;
    });
  };

  const updateBatch = (lot) => {
    console.log("lot from batch update: ", lot);
    setState((_draft) => {
      console.log("old draft from batch update: ", _draft.batch);
      const toUpdateIndex = _draft.batch.findIndex((o) => o._id === lot._id);
      if (toUpdateIndex) {
        _draft.batch[toUpdateIndex] = lot;
      }
    });
  };

  const listBatch = async ({ reset, ccCodes }: { reset?; ccCodes }) => {
    if (state.batch.length % PAGINATION_LIMIT === 0 || reset) {
      const offset = reset ? 0 : state.offset;
      const response = await axListBatch(ccCodes, offset);
      setBatches(response);
    }
  };

  const clearBatch = () => {
    setState((_draft) => {
      _draft.batch = DEFAULT_STATE.batch;
      _draft.hasMore = DEFAULT_STATE.hasMore;
      _draft.offset = DEFAULT_STATE.offset;
    });
  };

  return { state, addBatch, setBatches, updateBatch, listBatch, clearBatch };
}
