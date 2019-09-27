import { axLazyListLot, axUpdateLot } from "@services/lot.service";
import { axGetCuppingReportsByLotId } from "@services/report.service";
import { updateArrayImmutable } from "@utils/basic.util";
import { decorate, observable } from "mobx";
import { createContext } from "react";

export class LotStore {
  offset = 0;

  lazyListHasMore = true;
  lots: any[] = [];

  lazyList = async (reset, at, coCodes) => {
    if (reset) {
      this.offset = 0;
      this.lots = [];
    }

    const r = await axLazyListLot(
      at,
      {
        offset: this.offset,
      },
      coCodes.toString()
    );

    const rDataProcessed: object[] = [];

    for (const lot of r.data) {
      const { data: cuppingReports } = await axGetCuppingReportsByLotId(lot.id);
      rDataProcessed.push({ ...lot, cuppingReports });
    }

    this.lazyListHasMore = r.lazyListHasMore;
    this.offset = r.offset;
    this.lots = reset ? rDataProcessed : [...this.lots, ...rDataProcessed];
  };

  updateLot = async (keyName, body, at) => {
    const r = await axUpdateLot(keyName, body, at);
    if (r.success) {
      this.lots = updateArrayImmutable(this.lots, "id", r.body);
    }
    return r.success;
  };
}

decorate(LotStore, {
  lazyListHasMore: observable,
  lots: observable,
});

export default createContext(new LotStore());
