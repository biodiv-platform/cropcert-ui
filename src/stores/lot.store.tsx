import { axListLot } from "@services/lot.service";
import { updateArrayByObjectKey } from "@utils/basic.util";
import { Action, action, createComponentStore, Thunk, thunk } from "easy-peasy";
import { Lot } from "types/traceability";

export interface ILotStore {
  offset: number;
  hasMore: boolean;

  lot: Lot[];
  setLot: Action<ILotStore, any>;
  updateLot: Action<ILotStore, Lot>;
  listLot: Thunk<ILotStore, { ccCodes: number[]; reset?: boolean }>;
}

const lotStore: ILotStore = {
  offset: 0,
  hasMore: true,

  lot: [],
  setLot: action((state, { success, data, reset, offset, hasMore }) => {
    if (success) {
      state.lot = reset ? data : [...state.lot, ...data];
      state.offset = offset;
      state.hasMore = hasMore;
    }
  }),
  updateLot: action((state, payload: Lot) => {
    state.lot = updateArrayByObjectKey(state.lot, payload);
  }),
  listLot: thunk(async (actions, { reset, ccCodes }, helpers) => {
    const offset = reset ? 0 : helpers.getState().offset;
    const response = await axListLot(ccCodes, offset);
    actions.setLot(response);
  })
};

export const useLotStore = createComponentStore(lotStore);

export default lotStore;
