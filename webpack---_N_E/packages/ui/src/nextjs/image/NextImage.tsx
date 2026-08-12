"use client";

import type { ChakraComponent, HTMLChakraProps } from "@chakra-ui/react";
import { chakra } from "@chakra-ui/react";
import type { ImageProps as BaseNextImageProps } from "next/image";
import BaseNextImage from "next/image";

const imageProps = [
    "src",
    "alt",
    "sizes",
    "width",
    "height",
    "fill",
    "loader",
    "quality",
    "priority",
    "loading",
    "placeholder",
    "blurDataURL",
    "unoptimized",
    "onLoad",
    "crossOrigin",
    "decoding",
    "referrerPolicy",
    "useMap",
];

const NextImage: ChakraComponent<"img", BaseNextImageProps> = chakra(BaseNextImage, {
    shouldForwardProp: (prop) => imageProps.includes(prop),
});

export { NextImage };
export type NextImageProps = BaseNextImageProps &
    Omit<HTMLChakraProps<"img">, keyof BaseNextImageProps>;
