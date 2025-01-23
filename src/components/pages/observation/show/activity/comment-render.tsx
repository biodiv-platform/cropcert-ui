import { getInjectableHTML } from "@utils/text";
import React, { useEffect, useState } from "react";

const userMatch = /@\[([^\]]+?)\]\((\d+)\)/gm;

import { Prose } from "@/components/ui/prose";

const CommentRender = ({ html }) => {
  const [nHtml, setNHtml] = useState(html);

  useEffect(() => {
    let preNHtml = html;
    let m;
    while ((m = userMatch.exec(html)) !== null) {
      preNHtml = preNHtml.replace(
        m[0],
        `<a class="mention-link" href="${`/user/show/${m[2]}`}">${m[1]}</a>`
      );
    }
    setNHtml(preNHtml);
  }, []);

  return (
    <Prose>
      <div dangerouslySetInnerHTML={{ __html: getInjectableHTML(nHtml) }} />
    </Prose>
  );
};

export default CommentRender;
