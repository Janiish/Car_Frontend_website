import {
    List as ChakraList,
    UnorderedList as ChakraUnorderedList,
    OrderedList as ChakraOrderedList,
    ListItem as ChakraListItem,
    ListIcon as ChakraListIcon,
} from "@chakra-ui/react";
import type {
    ListProps as ChakraListProps,
    ListItemProps as ChakraListItemProps,
} from "@chakra-ui/react";

type ListProps = ChakraListProps;
type ListItemProps = ChakraListItemProps;

const List = ChakraList;
const UnorderedList = ChakraUnorderedList;
const OrderedList = ChakraOrderedList;
const ListItem = ChakraListItem;
const ListIcon = ChakraListIcon;

export { List, UnorderedList, OrderedList, ListItem, ListIcon };
export type { ListProps, ListItemProps };
