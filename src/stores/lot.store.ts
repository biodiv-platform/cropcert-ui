import {
  axLazyListLot,
  axUpdateLot,
  postProcessRow,
} from "@services/lot.service";
import { axGetCuppingReportsByLotId } from "@services/report.service";
import { updateArrayImmutable } from "@utils/basic.util";
import { decorate, observable } from "mobx";
import { createContext } from "react";

export class LotStore {
  offset = 0;

  lazyListHasMore = true;
  lots: any[] = [];

  lazyList = async (reset, at, coCodes, fetchReport = true) => {
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
      if (fetchReport) {
        const { data: cuppingReports } = await axGetCuppingReportsByLotId(
          lot.id
        );
        rDataProcessed.push({ ...lot, cuppingReports });
      } else {
        rDataProcessed.push(lot);
      }
    }

    this.lazyListHasMore = r.lazyListHasMore;
    this.offset = r.offset;
    this.lots = reset ? rDataProcessed : [...this.lots, ...rDataProcessed];
  };

  updateLot = async (keyName, body, at) => {
    const r = await axUpdateLot(keyName, body, at);
    const row = postProcessRow(r.body, at);
    if (r.success) {
      this.lots = updateArrayImmutable(this.lots, "id", row);
    }
    return r.success;
  };
}

decorate(LotStore, {
  lazyListHasMore: observable,
  lots: observable,
});

export default createContext(new LotStore());
