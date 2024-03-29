import { axGetDocumentScientificNames } from "@services/document.service";
import { LIST_PAGINATION_LIMIT } from "@static/documnet-list";
import { useEffect } from "react";
import { useImmer } from "use-immer";

export default function useScientificNames(documentId) {
  const [names, setNames] = useImmer({
    list: [],
    offset: 0,
    isLoading: true,
  });

  const loadMore = async (getter, setter, reset) => {
    setter((_draft) => {
      _draft.isLoading = true;
    });
    const { success, data } = await axGetDocumentScientificNames(documentId, {
      offset: reset ? 0 : getter.offset,
    });
    setter((_draft) => {
      if (success) {
        if (reset) {
          _draft.list = data;
          _draft.offset = LIST_PAGINATION_LIMIT;
        } else {
          if (data) {
            _draft.list.push(...data);
            _draft.offset = _draft.offset + LIST_PAGINATION_LIMIT;
          }
        }
      }
      _draft.isLoading = false;
    });
  };

  const loadMoreNames = () => loadMore(names, setNames, false);

  const refreshNames = () => loadMore(names, setNames, true);

  useEffect(() => {
    refreshNames();
  }, []);

  return {
    namesData: { data: names, loadMore: loadMoreNames, refresh: refreshNames },
  };
}
