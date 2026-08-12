import {
    motionDurationLong,
    motionDurationModerate,
    motionDurationShort,
    motionEasingBase,
    motionEasingIn,
    motionEasingOut,
} from "@porsche-design-system/components-react/styles";

const transitionProperty = {
    common: "background-color, border-color, color, fill, stroke, opacity, box-shadow, transform",
};

const transitionTimingFunction = {
    base: motionEasingBase,
    in: motionEasingIn,
    out: motionEasingOut,
};

const transitionDuration = {
    short: motionDurationShort,
    moderate: motionDurationModerate,
    long: motionDurationLong,
};

const transition = {
    property: transitionProperty,
    easing: transitionTimingFunction,
    duration: transitionDuration,
};

export default transition;
