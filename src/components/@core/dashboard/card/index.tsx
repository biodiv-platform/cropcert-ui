import "./card.scss";

import { Link } from "gatsby";
import React from "react";

interface IProps {
  title: string;
  description: string;
  to: string;
  external: boolean;
}

function Card({ title, description, to, external = false }: IProps) {
  const getContent = () => (
    <>
      <h2>{title}</h2>
      <p className="mt-2">{description} &rarr;</p>
    </>
  );

  return (
    <div className="bx--col-lg-3 bx--col-sm-12 mb-4">
      {external ? (
        <a className="bx--tile eco--card" href={to}>
          {getContent()}
        </a>
      ) : (
        <Link className="bx--tile eco--card" to={to}>
          {getContent()}
        </Link>
      )}
    </div>
  );
}

export default Card;
