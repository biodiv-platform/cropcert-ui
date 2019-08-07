import { axLazyListLot } from "@services/lot.service";
import { decorate, observable } from "mobx";
import { createContext } from "react";

export class LotStore {
  offset = 0;

  lazyListHasMore = true;
  lots: any[] = [];

  lazyList = async (reset, at) => {
    if (reset) {
      this.offset = 0;
      this.lots = [];
    }

    const r = await axLazyListLot(at, {
      offset: this.offset,
    });

    this.lazyListHasMore = r.lazyListHasMore;
    this.offset = r.offset;
    this.lots = reset ? r.data : [...this.lots, ...r.data];
  };
}

decorate(LotStore, {
  lazyListHasMore: observable,
  lots: observable,
});

export default createContext(new LotStore());
