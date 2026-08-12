import { PDivider } from "@porsche-design-system/components-react/ssr";
import type { PDividerProps } from "@porsche-design-system/components-react/ssr";
import { chakra } from "@chakra-ui/react";
import type { BoxProps } from "@chakra-ui/react";

type DividerProps = PDividerProps & BoxProps;

const Divider = chakra<typeof PDivider, DividerProps>(PDivider);

export { Divider };
export type { DividerProps };
