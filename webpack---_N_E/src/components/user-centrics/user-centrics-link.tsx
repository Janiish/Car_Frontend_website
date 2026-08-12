import { LinkPureExternal, type LinkPureExternalProps } from "@project/ui";
import { getUsercentrics } from "./utils";

type UserCentricsLinkProps = LinkPureExternalProps;

const UserCentricsLink = ({ href, ...props }: UserCentricsLinkProps) => {
    const handleClick = () => {
        const usercentrics = getUsercentrics();
        if (!usercentrics) {
            return;
        }

        if (href === "#uc-layer2") {
            usercentrics.toggleCenteredModalIsVisible(true);
        } else if (href === "#uc-layer4") {
            usercentrics.toggleConsentInfoModalIsVisible(true);
        }
    };

    return <LinkPureExternal {...props} onClick={handleClick} style={{ cursor: "pointer" }} />;
};

UserCentricsLink.displayName = "UserCentricsLink";

export { UserCentricsLink };
