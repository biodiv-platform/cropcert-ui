import "./card.scss";

import { Link } from "gatsby";
import React from "react";

interface IProps {
  title: string;
  description: string;
  to: string;
}

function Card(props: IProps) {
  return (
    <div className="bx--col-lg-3 bx--col-sm-12 mb-4">
      <Link className="bx--tile eco--card" to={props.to}>
        <h2>{props.title}</h2>
        <p className="mt-2">{props.description} &rarr;</p>
      </Link>
    </div>
  );
}

export default Card;
