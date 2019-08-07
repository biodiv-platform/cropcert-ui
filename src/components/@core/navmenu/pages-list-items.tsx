import { hasAccess } from "@utils/auth.util";
import { ROLES } from "@utils/constants";
import { Link } from "gatsby";
import React from "react";

import Arrow from "./arrow";

export default function ListItems({ children, level = 0 }) {
  const getUrl = item => {
    return !item.hasOwnProperty("url") ? `/page/show?id=${item.id}` : item.url;
  };

  const listItem = item =>
    item.hasOwnProperty("children") ? (
      <li key={item.id}>
        <Link to={getUrl(item)}>
          {item.title}
          <span className="drop-icon">
            <Arrow direction={level === 0 ? "b" : "r"} />
          </span>
        </Link>
        <label title="Toggle Drop-down" className="drop-icon" htmlFor={item.id}>
          <Arrow />
        </label>
        <input type="checkbox" id={item.id} />
        {ListItems({ ...item, level: level + 1 })}
      </li>
    ) : (
      <li key={item.id}>
        <Link to={getUrl(item)}>{item.title}</Link>
      </li>
    );

  return (
    <ul className={level === 0 ? "main-menu" : "sub-menu"}>
      {children.map(
        li => hasAccess(li.access || [ROLES.UNAUTHORIZED]) && listItem(li)
      )}
    </ul>
  );
}
