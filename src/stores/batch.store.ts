import {
  axLazyListBatch,
  axUpdateWetBatch,
  isRowDisabled,
} from "@services/batch.service";
import { updateArrayImmutable } from "@utils/basic.util";
import { decorate, observable } from "mobx";
import { createContext } from "react";

export class BatchStore {
  offset = 0;

  lazyListHasMore = true;
  batches: any[] = [];

  lazyList = async (reset, type, ccCodes, isReadyForLot = true) => {
    if (reset) {
      this.offset = 0;
      this.batches = [];
    }

    const r = await axLazyListBatch(type, {
      ccCodes: ccCodes.toString() || "-1",
      offset: this.offset,
      ...(type === "WET" ? { isReadyForLot } : {}),
    });

    this.lazyListHasMore = r.lazyListHasMore;
    this.offset = r.offset;
    this.batches = reset ? r.data : [...this.batches, ...r.data];
  };

  updateWetBatch = async (keyName, body) => {
    const r = await axUpdateWetBatch(keyName, body);
    const row = { ...r.body, disabled: isRowDisabled(r.body) };
    if (r.success) {
      this.batches = updateArrayImmutable(this.batches, "batchId", row);
    }
  };
}

decorate(BatchStore, {
  lazyListHasMore: observable,
  batches: observable,
});

export default createContext(new BatchStore());
