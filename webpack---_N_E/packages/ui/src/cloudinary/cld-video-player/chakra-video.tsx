import { chakra, shouldForwardProp } from "@chakra-ui/react";

const ChakraVideo = chakra("video", {
    shouldForwardProp: (prop) => shouldForwardProp(prop),
});

export { ChakraVideo };
