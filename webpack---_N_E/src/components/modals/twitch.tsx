import type { ModalProps } from "@project/ui";
import {
    AspectRatio,
    HStack,
    Modal,
    RedDot,
    Box,
    ModalBody,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    ButtonPure,
} from "@project/ui";
import { useTwitchEmbedUrl } from "@/hooks/useTwitchEmbedUrl";
import type { IframeHTMLAttributes } from "react";
import { forwardRef, useEffect, useRef, useState } from "react";
import { useUsercentrics } from "@/components/user-centrics/usercentrics-provider";
import { porscheUsercentricsKnownProcessorNames } from "@/components/user-centrics/known-processor-names";

type TwitchModalProps = Omit<ModalProps, "children"> & {
    embedId: string;
    title?: string | null;
    onOpen: () => void;
    twitchEmbedType: "channel" | "video" | "collection";
};

const pipStyles = `
@media (display-mode: picture-in-picture) {
  body {
    background: black;
    margin: 0;
    padding: 0;
  }
  iframe {
  	border: 0;
  	aspect-ratio: 16 / 9;
  	width: 100vw;
  }
}
`;

const togglePictureInPicture = async (
    videoPlayer: HTMLIFrameElement,
    videoPlayerContainer: HTMLElement,
    onClose: () => void
) => {
    // @ts-expect-error TS doesn't know about the Picture-in-Picture API yet
    // Returns null if no pip window is currently open
    if (!window.documentPictureInPicture.window) {
        // Open a Picture-in-Picture window.
        // @ts-expect-error TS doesn't know about the Picture-in-Picture API yet
        const pipWindow = await window.documentPictureInPicture.requestWindow({
            width: 640,
            height: 360,
        });

        // Add pagehide listener to handle the case of the pip window being closed using the browser X button
        pipWindow.addEventListener("pagehide", () => {
            videoPlayerContainer.append(videoPlayer);
            onClose();
        });

        // Add a stylesheet to the Picture-in-Picture window.
        const stylesheet = document.createElement("style");
        stylesheet.textContent = pipStyles;
        pipWindow.document.head.appendChild(stylesheet);

        // Move the player to the Picture-in-Picture window.
        pipWindow.document.body.append(videoPlayer);
    } else {
        videoPlayerContainer.append(videoPlayer);
        // @ts-expect-error TS doesn't know about the Picture-in-Picture API yet
        window.documentPictureInPicture.window.close();
        onClose();
    }
};

const TwitchIframe = forwardRef<
    HTMLIFrameElement,
    Omit<IframeHTMLAttributes<HTMLIFrameElement>, "src"> & { twitchSrc: string }
>(({ twitchSrc }, ref) => {
    const [iframeSrc, setIframeSrc] = useState<string | null>(null);

    const containerRef = useRef<HTMLDivElement>(null);

    const { isLoaded, consentGiven, checkConsent } = useUsercentrics();

    useEffect(() => {
        if (!isLoaded) {
            return;
        }

        const consentGivenForTwitch = consentGiven.get(
            porscheUsercentricsKnownProcessorNames.twitchContent
        );

        if (consentGivenForTwitch?.consentStatus === true) {
            setIframeSrc(twitchSrc);
        } else {
            if (!containerRef.current) {
                return;
            }

            setIframeSrc(null);

            checkConsent({
                mapContainer: [containerRef],
                processor: porscheUsercentricsKnownProcessorNames.twitchContent,
                successCallback: () => {
                    setIframeSrc(twitchSrc);
                },
            });
        }
    }, [isLoaded, consentGiven, checkConsent, twitchSrc]);

    return (
        <div ref={containerRef} id="twitchIframeContainer">
            {iframeSrc && (
                <Box
                    as="iframe"
                    w="full"
                    h="full"
                    ref={ref}
                    title="Twitch Embed"
                    src={iframeSrc}
                    allowFullScreen
                />
            )}
        </div>
    );
});
TwitchIframe.displayName = "TwitchIframe";

const TwitchModal = (props: TwitchModalProps) => {
    const { isOpen, onClose, onOpen, embedId, title, twitchEmbedType = "channel" } = props;

    const [showPiPButton, setShowPiPButton] = useState(false);

    const iframeRef = useRef<HTMLIFrameElement>(null);
    const iframeContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setShowPiPButton("documentPictureInPicture" in window);
    }, []);

    const embedUrl = useTwitchEmbedUrl(embedId, twitchEmbedType);

    const handlePictureInPictureOpen = async () => {
        if (!iframeRef.current || !iframeContainerRef.current) {
            return;
        }

        await togglePictureInPicture(
            iframeRef.current,
            iframeContainerRef.current,
            handlePictureInPictureClose
        );

        onClose();
    };

    const handlePictureInPictureClose = () => {
        onOpen();
    };

    const handleOnClose = () => {
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={handleOnClose}>
            <ModalOverlay />
            <ModalContent>
                {title && (
                    <ModalHeader>
                        <HStack justify="space-between">
                            <Box>
                                <RedDot mr={4} /> {title}
                            </Box>
                            <HStack>
                                {showPiPButton && (
                                    <ButtonPure
                                        icon="image"
                                        onClick={handlePictureInPictureOpen}
                                        theme="dark"
                                        hideLabel={true}
                                        border="none"
                                        aria={{ "aria-label": "Toggle Picture in Picture" }}
                                        title="Toggle Picture in Picture"
                                    />
                                )}
                                <ButtonPure
                                    theme="dark"
                                    icon="close"
                                    hideLabel={true}
                                    aria={{ "aria-label": "Close" }}
                                    title="close"
                                    onClick={onClose}
                                />
                            </HStack>
                        </HStack>
                    </ModalHeader>
                )}
                <ModalBody>
                    <AspectRatio ratio="16:9" ref={iframeContainerRef}>
                        {embedUrl && (
                            <TwitchIframe
                                ref={iframeRef}
                                title="Twitch Embed"
                                twitchSrc={embedUrl}
                                allowFullScreen
                            />
                        )}
                    </AspectRatio>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export { TwitchModal };
