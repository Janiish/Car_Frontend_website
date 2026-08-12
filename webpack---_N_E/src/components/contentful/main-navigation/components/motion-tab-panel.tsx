import { TabPanel } from "@project/ui";
import type { TabPanelProps } from "@project/ui";
import type { HTMLMotionProps } from "framer-motion";
import { motion } from "framer-motion";

type MotionTabPanelProps = TabPanelProps & HTMLMotionProps<"div">;

const PrivateMotionTabPanel = motion(TabPanel);

const MotionTabPanel = ({ children, ...props }: MotionTabPanelProps) => (
    <PrivateMotionTabPanel
        pt={{
            base: 0,
            l: 10,
        }}
        display="flex"
        flexDirection="column"
        height={{
            base: "100%",
            l: "auto",
        }}
        willChange="height"
        {...props}
    >
        {children}
    </PrivateMotionTabPanel>
);

export { MotionTabPanel };
