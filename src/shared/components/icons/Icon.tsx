"use client";

import Image from "next/image";

import { ICON_PATHS, type IconName } from "./icon-paths";

const DEFAULT_SIZE = 24;

type IconProps = {
  name: IconName;
  alt: string;
  size?: number;
  className?: string;
};

export function Icon({ name, alt, size = DEFAULT_SIZE, className }: IconProps) {
  const src = ICON_PATHS[name];
  return (
    <Image
      src={src}
      alt={alt}
      width={size}
      height={size}
      className={className}
      aria-hidden={alt === ""}
    />
  );
}
