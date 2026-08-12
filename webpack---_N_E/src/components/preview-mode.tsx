import { useEffect, useState } from "react";
import { Box, Button, Flex, Link } from "@project/ui";
import { useRouter } from "next/router";

const PreviewMode = () => {
    const [isOpened, setIsOpened] = useState(false);
    const [origin, setOrigin] = useState<string | null>(null);

    const handleToggleOpen = () => setIsOpened((prev) => !prev);

    const { locale, asPath } = useRouter();

    useEffect(() => {
        setOrigin(window.location.origin);
    }, []);

    if (!origin) {
        return null;
    }

    return (
        <Box
            className="preview-mode"
            position="fixed"
            zIndex="overlay"
            top="calc(50% - 18px)"
            left={0}
            transform={isOpened ? "translateX(16px)" : "translateX(calc(-100% + 44px))"}
            transitionDuration="short"
            transitionProperty="common"
            transitionTimingFunction="base"
        >
            <Flex alignItems="center" gap={4}>
                <Box>
                    <Link
                        // onClick={handleExitPreviewMode}
                        href={`/api/contentful/preview/disable?origin=${origin}&locale=${locale}&asPath=${asPath}`}
                        compact={true}
                        variant="ghost"
                        theme="dark"
                        style={{
                            backgroundColor: "#f7cb47",
                            overflow: "hidden",
                            borderRadius: "4px",
                        }}
                    >
                        Click to exit Preview Mode
                    </Link>
                </Box>
                <Box>
                    <Button
                        hideLabel={true}
                        compact={true}
                        variant="ghost"
                        icon="wrench"
                        theme="dark"
                        style={{
                            backgroundColor: "#f7cb47",
                            overflow: "hidden",
                            borderRadius: "4px",
                        }}
                        onClick={handleToggleOpen}
                    ></Button>
                </Box>
            </Flex>
        </Box>
    );
};

export { PreviewMode };
