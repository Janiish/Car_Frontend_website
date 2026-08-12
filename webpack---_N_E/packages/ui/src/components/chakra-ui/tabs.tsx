import {
    Tabs as ChakraTabs,
    TabList as ChakraTabList,
    Tab as ChakraTab,
    TabPanels as ChakraTabPanels,
    TabPanel as ChakraTabPanel,
} from "@chakra-ui/react";
import type {
    TabsProps as ChakraTabsProps,
    TabListProps as ChakraTabListProps,
    TabProps as ChakraTabProps,
    TabPanelsProps as ChakraTabPanelsProps,
    TabPanelProps as ChakraTabPanelProps,
} from "@chakra-ui/react";

type TabsProps = ChakraTabsProps;
type TabListProps = ChakraTabListProps;
type TabProps = ChakraTabProps;
type TabPanelsProps = ChakraTabPanelsProps;
type TabPanelProps = ChakraTabPanelProps;

const Tabs = ChakraTabs;
const TabList = ChakraTabList;
const Tab = ChakraTab;
const TabPanels = ChakraTabPanels;
const TabPanel = ChakraTabPanel;

export { Tabs, TabList, Tab, TabPanels, TabPanel };
export type { TabsProps, TabListProps, TabProps, TabPanelsProps, TabPanelProps };
