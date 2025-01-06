import { axGetOpenGraphMeta } from "@services/api.service";
import { getLinkCard, preProcessContent } from "@utils/pages";
import React, { useEffect } from "react";

import { Prose } from "@/components/ui/prose";

export function Content({ html }) {
  const getCards = async () => {
    document.querySelectorAll(".epc").forEach(async (el: any) => {
      const { success, data } = await axGetOpenGraphMeta(el.href);
      if (success) {
        el.outerHTML = getLinkCard(data, el.id);
      }
    });
  };

  useEffect(() => {
    getCards();
  }, [html]);

  return (
    <Prose>
      <div className="article" dangerouslySetInnerHTML={{ __html: preProcessContent(html) }} />
    </Prose>
  );
}
