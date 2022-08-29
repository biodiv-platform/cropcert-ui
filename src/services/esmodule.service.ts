import { ENDPOINT } from "@static/constants";
import { DOUCMENT_FILTER_KEY } from "@static/document";
import { plainHttp } from "@utils/http";

export const axSearchFilterByName = async (text, field, index = "eo", defaultOption = false) => {
  try {
    const { data } = await plainHttp.get(
      `${ENDPOINT.ESMODULE}/v1/services/filterautocomplete/${index}/er`,
      {
        params: { text, field },
      }
    );

    if (defaultOption) {
      data.unshift(text);
    }

    const formatResponse = () => {
      return data?.reduce((acc, i) => {
        const matchVal = i
          ?.split(",")
          ?.filter((item) => item.toLowerCase().includes(text.toLowerCase()))?.[0]
          .trim()
          .toLowerCase();
        if (matchVal && !acc.includes(matchVal)) acc.push(matchVal);
        return acc;
      }, []);
    };

    return ["ed", "esp"].includes(index) &&
      (field === DOUCMENT_FILTER_KEY.author.searchKey ||
        field === DOUCMENT_FILTER_KEY.tags.searchKey)
      ? formatResponse()?.map((i) => ({ value: i.trim(), label: i, text }))
      : data?.map((i) => ({ value: i, label: i, text }));
  } catch (e) {
    console.error(e);
    return [];
  }
};
