import { Heading, Tab } from "@project/ui";
import type { TabProps } from "@project/ui";
import type { HTMLMotionProps } from "framer-motion";
import { motion } from "framer-motion";

type MotionTabProps = TabProps & HTMLMotionProps<"div"> & { highlight: boolean };

const PrivateMotionTab = motion(Tab);

const MotionTab = ({ children, highlight, tabIndex: _tabIndex, ...props }: MotionTabProps) => (
    <PrivateMotionTab className="focus-visible" {...props}>
        <Heading
            as="span"
            size="navigationHeading"
            opacity={{
                l: highlight ? 1 : 0.5,
            }}
            transition="var(--transition-property-common), var(--transition-duration-short) var(--transition-easing-base)"
            _hover={{
                opacity: 1,
            }}
        >
            {children}
        </Heading>
    </PrivateMotionTab>
);

export { MotionTab };
