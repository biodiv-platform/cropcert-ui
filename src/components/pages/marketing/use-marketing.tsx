import { axListMarketingLot } from "@services/lot.service";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useImmer } from "use-immer";

interface MarketingContextProps {
  list;
  loadMore;
  coCodes;
  setCoCodes;
}

interface MarketingProviderProps {
  children;
}

const MarketingContext = createContext<MarketingContextProps>({} as MarketingContextProps);

export const MarketingProvider = ({ children }: MarketingProviderProps) => {
  const [list, setList] = useImmer<any>({ l: [], offset: 0, hasMore: false });
  const [coCodes, setCoCodes] = useState<any>([]);

  const loadMore = async (reset?) => {
    const marketingData = await axListMarketingLot(coCodes, reset ? 0 : list.offset);

    if (marketingData.success) {
      setList((_draft) => {
        if (reset) {
          _draft.l = [];
        }
        _draft.l.push(...marketingData.data);
        _draft.offset = marketingData.offset;
        _draft.hasMore = marketingData.hasMore;
      });
    }
  };

  useEffect(() => {
    if (coCodes?.length > 0) {
      loadMore(true);
    }
  }, [coCodes]);

  return (
    <MarketingContext.Provider
      value={{
        list,
        loadMore,
        coCodes,
        setCoCodes,
      }}
    >
      {children}
    </MarketingContext.Provider>
  );
};

export default function useMarketing() {
  return useContext(MarketingContext);
}
