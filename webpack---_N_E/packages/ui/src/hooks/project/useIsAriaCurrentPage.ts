import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export const useIsAriaCurrentPage = (href?: string | null) => {
    const [isAriaCurrent, setIsAriaCurrent] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (typeof window === "undefined") return;

        const [pathname] = router.asPath.split("?");

        setIsAriaCurrent(pathname === href);
    }, [href, router.asPath]);

    return isAriaCurrent;
};
