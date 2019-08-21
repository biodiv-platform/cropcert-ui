import { axLazyListBatch } from "@services/batch.service";
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
}

decorate(BatchStore, {
  lazyListHasMore: observable,
  batches: observable,
});

export default createContext(new BatchStore());