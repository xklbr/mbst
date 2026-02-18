"use client";

import Image from "next/image";

const LOGO_SRC = "/mbst-logo.svg";
const DEFAULT_WIDTH = 77;
const DEFAULT_HEIGHT = 29;

type LogoProps = {
  width?: number;
  height?: number;
  alt?: string;
  className?: string;
};

export function Logo({
  width = DEFAULT_WIDTH,
  height = DEFAULT_HEIGHT,
  alt = "MBST",
  className,
}: LogoProps) {
  return (
    <Image
      src={LOGO_SRC}
      alt={alt}
      width={width}
      height={height}
      className={className}
    />
  );
}
