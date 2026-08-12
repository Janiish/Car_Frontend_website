import { PIcon } from "@porsche-design-system/components-react/ssr";
import type { PIconProps, IconName } from "@porsche-design-system/components-react/ssr";
import { chakra } from "@chakra-ui/react";
import type { BoxProps } from "@chakra-ui/react";

type IconProps = PIconProps & BoxProps;

const Icon = chakra<typeof PIcon, IconProps>(PIcon);

export { Icon, IconName };
export type { IconProps };
