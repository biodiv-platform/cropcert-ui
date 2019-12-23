import { axListBatch } from "@services/batch.service";
import { updateArrayByObjectKey } from "@utils/basic.util";
import { Action, action, createComponentStore, Thunk, thunk } from "easy-peasy";
import { Batch } from "types/traceability";

/*
 * Note:
 * `hasMore` is kept false so infinite scroller will not start loading when rendered
 * because first load will be from `useEffect` hook that supports auto reset
 */

export interface IBatchStore {
  offset: number;
  hasMore: boolean;

  batch: Batch[];
  addBatch: Action<IBatchStore, Batch>;
  setBatches: Action<IBatchStore, any>;
  updateBatch: Action<IBatchStore, Batch>;
  listBatch: Thunk<IBatchStore, { ccCodes: number[]; reset?: boolean }>;
}

const batchStore: IBatchStore = {
  offset: 0,
  hasMore: false,

  batch: [],
  addBatch: action((state, batch) => {
    state.batch = [batch, ...state.batch];
    state.offset = state.offset + 1;
  }),
  setBatches: action((state, { success, data, reset, offset, hasMore }) => {
    if (success) {
      state.batch = reset ? data : [...state.batch, ...data];
      state.offset = offset;
      state.hasMore = hasMore;
    }
  }),
  updateBatch: action((state, payload: Batch) => {
    state.batch = updateArrayByObjectKey(state.batch, payload);
  }),
  listBatch: thunk(async (actions, { reset, ccCodes }, helpers) => {
    const offset = reset ? 0 : helpers.getState().offset;
    const response = await axListBatch(ccCodes, offset);
    actions.setBatches(response);
  })
};

export const useBatchStore = createComponentStore(batchStore);

export default batchStore;
