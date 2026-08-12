import { Box } from "@project/ui";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useState, type ReactNode } from "react";

type AnimatingWrapperProps = {
    delay?: number;
    children: ReactNode;
};

export const AnimatingWrapper = ({ delay = 0, children }: AnimatingWrapperProps) => {
    const [hasAnimated, setHasAnimated] = useState(false);
    const textControls = useAnimation();

    useEffect(() => {
        if (!hasAnimated) {
            textControls.start("visible");
            setHasAnimated(true);
        }
    }, [textControls, hasAnimated]);
    return (
        <Box
            as={motion.div}
            animate={textControls}
            initial="hidden"
            variants={{
                visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.6, ease: [0, 0.34, 0.58, 1], delay: delay },
                },
                hidden: { opacity: 0, y: 20 },
            }}
        >
            {children}
        </Box>
    );
};
