import React from "react";

export default function Arrow({ direction = "d", ...props }) {
  const svgprops = {
    xmlns: "http://www.w3.org/2000/svg",
    width: "18px",
    height: "18px",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    style: { verticalAlign: "middle" }
  };
  switch (direction) {
    case "r":
      return (
        <svg {...svgprops}>
          <polyline points="9 18 15 12 9 6" />
        </svg>
      );

    case "h":
      return (
        <svg {...svgprops}>
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      );

    default:
      return (
        <svg {...svgprops}>
          <polyline points="6 9 12 15 18 9" />
        </svg>
      );
  }
}
