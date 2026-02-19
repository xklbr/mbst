"use client";

import { CSSProperties } from "react";
import Image from "next/image";

import { ICON_PATHS, type IconName } from "./icon-paths";

const DEFAULT_SIZE = 24;

type IconProps = {
  name: IconName;
  alt: string;
  size?: number;
  width?: number;
  height?: number;
  className?: string;
  style?: CSSProperties;
};

export function Icon({
  name,
  alt,
  size = DEFAULT_SIZE,
  width,
  height,
  className,
  style,
}: IconProps) {
  const src = ICON_PATHS[name];
  return (
    <Image
      src={src}
      alt={alt}
      width={width ?? size}
      height={height ?? size}
      className={className}
      style={style}
      aria-hidden={alt === ""}
    />
  );
}
