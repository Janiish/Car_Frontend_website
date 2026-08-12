import {
    Navigation as CarouselNavigation,
    A11y as CarouselA11y,
    Keyboard as CarouselKeyboard,
    FreeMode as CarouselFreeMode,
} from "swiper/modules";

import type {
    SwiperProps as CarouselProps,
    SwiperSlideProps as CarouselSlideProps,
    SwiperClass as CarouselClass,
} from "swiper/react";
import { Swiper, SwiperSlide } from "swiper/react";

import { chakra } from "@chakra-ui/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/a11y";

const Carousel = chakra<typeof Swiper, CarouselProps>(Swiper);
const CarouselSlide = chakra<typeof SwiperSlide, CarouselSlideProps>(SwiperSlide);

// https://github.com/nolimits4web/swiper/issues/4413
CarouselSlide.displayName = "SwiperSlide";

export {
    Carousel,
    CarouselSlide,
    CarouselNavigation,
    CarouselA11y,
    CarouselKeyboard,
    CarouselFreeMode,
};
export type { CarouselProps, CarouselSlideProps, CarouselClass };
