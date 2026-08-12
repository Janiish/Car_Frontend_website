const MODULE_KEY_LEFT_BOTTOM_CARD = "m-left-bottom-card";
const MODULE_KEY_LEFT_TOP_LEFT_CARD = "m-left-top-left-card";
const MODULE_KEY_LEFT_TOP_RIGHT_CARD = "m-left-top-right-card";
const MODULE_KEY_CENTER_CARD = "m-center-card";
const MODULE_KEY_RIGHT_TOP_LEFT_CARD = "m-right-top-left-card";
const MODULE_KEY_RIGHT_TOP_RIGHT_CARD = "m-right-top-right-card";
const MODULE_KEY_RIGHT_BOTTOM_CARD = "m-right-bottom-card";

// Entry delay values (in seconds)
// Each module starts 0.05s later than the previous one
const entryDelayValues = {
    [MODULE_KEY_LEFT_BOTTOM_CARD]: 0, // Starts first
    [MODULE_KEY_LEFT_TOP_LEFT_CARD]: 0.05,
    [MODULE_KEY_LEFT_TOP_RIGHT_CARD]: 0.1,
    [MODULE_KEY_CENTER_CARD]: 0.15,
    [MODULE_KEY_RIGHT_TOP_LEFT_CARD]: 0.2,
    [MODULE_KEY_RIGHT_TOP_RIGHT_CARD]: 0.25,
    [MODULE_KEY_RIGHT_BOTTOM_CARD]: 0.3, // Starts last
} as const;

// Entry duration values (in seconds)
// All animations end at exactly 1.33s, so durations decrease as delays increase
const entryDurationValues = {
    [MODULE_KEY_LEFT_BOTTOM_CARD]: 1.33,
    [MODULE_KEY_LEFT_TOP_LEFT_CARD]: 1.28, // 0.05 delay + 1.28 duration = 1.33s end time
    [MODULE_KEY_LEFT_TOP_RIGHT_CARD]: 1.23, // 0.10 delay + 1.23 duration = 1.33s end time
    [MODULE_KEY_CENTER_CARD]: 1.18, // 0.15 delay + 1.18 duration = 1.33s end time
    [MODULE_KEY_RIGHT_TOP_LEFT_CARD]: 1.13, // 0.20 delay + 1.13 duration = 1.33s end time
    [MODULE_KEY_RIGHT_TOP_RIGHT_CARD]: 1.08, // 0.25 delay + 1.08 duration = 1.33s end time
    [MODULE_KEY_RIGHT_BOTTOM_CARD]: 1.03, // 0.30 delay + 1.03 duration = 1.33s end time
} as const;

// Exit delay values (in seconds)
// All modules close at the same time (no stagger)
const exitDelayValues = {
    [MODULE_KEY_LEFT_TOP_LEFT_CARD]: 0,
    [MODULE_KEY_LEFT_TOP_RIGHT_CARD]: 0,
    [MODULE_KEY_LEFT_BOTTOM_CARD]: 0,
    [MODULE_KEY_CENTER_CARD]: 0,
    [MODULE_KEY_RIGHT_TOP_LEFT_CARD]: 0,
    [MODULE_KEY_RIGHT_TOP_RIGHT_CARD]: 0,
    [MODULE_KEY_RIGHT_BOTTOM_CARD]: 0,
} as const;

// Exit duration values (in seconds)
// All modules take 1.33 seconds to close
const exitDurationValues = {
    [MODULE_KEY_LEFT_TOP_LEFT_CARD]: 1.33,
    [MODULE_KEY_LEFT_TOP_RIGHT_CARD]: 1.33,
    [MODULE_KEY_LEFT_BOTTOM_CARD]: 1.33,
    [MODULE_KEY_CENTER_CARD]: 1.33,
    [MODULE_KEY_RIGHT_TOP_LEFT_CARD]: 1.33,
    [MODULE_KEY_RIGHT_TOP_RIGHT_CARD]: 1.33,
    [MODULE_KEY_RIGHT_BOTTOM_CARD]: 1.33,
} as const;

// Calculate when the last layout animation finishes
// rightBottom: delay (0.30s) + duration (1.03s) = 1.33s
// We want the close button to start animating when layout animations are done
const closeButtonEntryDelay =
    entryDelayValues[MODULE_KEY_RIGHT_BOTTOM_CARD] +
    entryDurationValues[MODULE_KEY_RIGHT_BOTTOM_CARD] -
    0.5;

const easingCurve = [0.8, 0, 0.2, 1];

export {
    entryDelayValues,
    entryDurationValues,
    exitDelayValues,
    exitDurationValues,
    easingCurve,
    closeButtonEntryDelay,
};
