import { Flex, Text } from "@project/ui";
import { useLiveTickerQuery } from "@/components/contentful/live-ticker/__generated/live-ticker.contentful.generated";
import { useAppStore } from "@/store/app-store";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Marquee from "react-fast-marquee";
// eslint-disable-next-line no-restricted-imports
import { chakra } from "@chakra-ui/react";

type LiveTickerJSONItem = {
    id: string;
    value: string;
    time: string;
};

export type LiveTickerProps = {
    mainNavigationId: string;
};

const ChakraMarquee = chakra(Marquee);

// Helper function to filter out items not in the new data
const filterExistingItems = (prevItems: LiveTickerJSONItem[], newItems: LiveTickerJSONItem[]) => {
    const currentIds = new Set(newItems.map((item) => item.id));
    return prevItems.filter((item) => currentIds.has(item.id));
};

// Helper function to merge new items with existing ones
const mergeTickerItems = (filteredItems: LiveTickerJSONItem[], newItems: LiveTickerJSONItem[]) => {
    const result = [...filteredItems];

    newItems.forEach((newItem) => {
        const existingIndex = result.findIndex((item) => item.id === newItem.id);

        if (existingIndex === -1) {
            result.push(newItem);
        } else {
            result[existingIndex] = newItem;
        }
    });

    return result;
};

// Helper function to update ticker items state
const updateTickerItems = (prevItems: LiveTickerJSONItem[], newItems: LiveTickerJSONItem[]) => {
    const filteredItems = filterExistingItems(prevItems, newItems);
    return mergeTickerItems(filteredItems, newItems);
};

export const LiveTicker = (props: LiveTickerProps) => {
    const { mainNavigationId } = props;

    const { locale, isPreview } = useRouter();

    const { data } = useLiveTickerQuery(
        {
            id: mainNavigationId,
            locale: locale!,
            preview: Boolean(isPreview),
        },
        {
            refetchOnWindowFocus: true,
            // Refetch interval is set to 30 seconds in production and 5 seconds in development
            refetchInterval: process.env.NODE_ENV === "production" ? 30000 : 5000,
            // Rerender any children when the query results change
            notifyOnChangeProps: "all",
            // Disable structural sharing, so we can compare the data object with the previous one inside a useEffect
            // https://tkdodo.eu/blog/react-query-render-optimizations#structural-sharing
            structuralSharing: false,
        }
    );
    const { dispatch } = useAppStore();

    const [liveTickerItems, setLiveTickerItems] = useState<LiveTickerJSONItem[]>([]);

    useEffect(() => {
        const hasLiveTickerData =
            !!data &&
            Array.isArray(data?.mainNavigation?.liveTicker) &&
            data?.mainNavigation.liveTicker.length > 0;

        dispatch({
            type: "SET_LIVE_TICKER",
            payload: hasLiveTickerData,
        });

        if (data?.mainNavigation?.liveTicker) {
            setLiveTickerItems((prevItems) =>
                updateTickerItems(prevItems, data.mainNavigation!.liveTicker)
            );
        }
    }, [data, dispatch]);

    if (!data?.mainNavigation?.liveTicker || data.mainNavigation.liveTicker.length < 1) {
        return null;
    }

    return (
        <Flex
            className="live-ticker"
            alignItems="center"
            width="full"
            bg="porscheBlack"
            color="allWhite"
            h="liveTickerHeight"
            overflow="hidden"
            position="relative"
        >
            <ChakraMarquee autoFill pauseOnHover>
                {liveTickerItems.map((item: LiveTickerJSONItem) => (
                    <Text key={item.id} size="x-small" mx=".5ch">
                        {item.value}
                    </Text>
                ))}
            </ChakraMarquee>
        </Flex>
    );
};
