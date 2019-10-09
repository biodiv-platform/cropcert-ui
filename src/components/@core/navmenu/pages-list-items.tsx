import { hasAccess } from "@utils/auth.util";
import { ROLES } from "@utils/constants";
import React from "react";

import Arrow from "./arrow";
import CustomLink from "./custom-link";

export default function ListItems({ children, level = 0 }) {
  const listItem = item =>
    item.hasOwnProperty("children") ? (
      <li key={item.id}>
        <CustomLink item={item}>
          {item.title}
          <span className="drop-icon">
            <Arrow direction={level === 0 ? "b" : "r"} />
          </span>
        </CustomLink>
        <label title="Toggle Drop-down" className="drop-icon" htmlFor={item.id}>
          <Arrow />
        </label>
        <input type="checkbox" id={item.id} />
        {ListItems({ ...item, level: level + 1 })}
      </li>
    ) : (
      <li key={item.id}>
        <CustomLink item={item}>{item.title}</CustomLink>
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
