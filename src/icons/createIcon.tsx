import React from "react";

interface CreateIconProps {
  displayName: string;
  d?: string; // Path 'd' attribute for simple paths
  path?: React.ReactNode; // React node for custom paths
  viewBox?: string; // Optional viewBox, defaults to "0 0 24 24"
}

export function createIcon({ displayName, d, path, viewBox = "0 0 24 24" }: CreateIconProps) {
  if (!d && !path) {
    throw new Error("Either 'd' or 'path' must be provided to create an icon.");
  }

  // Create the icon component as a memoized React component
  const IconComponent = React.memo((props: React.SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={viewBox}
      fill="currentColor"
      aria-label={displayName}
      {...props} // This will allow you to pass additional props like size, color, etc.
    >
      {d ? <path d={d} /> : path}
    </svg>
  ));

  IconComponent.displayName = displayName;

  return IconComponent;
}
