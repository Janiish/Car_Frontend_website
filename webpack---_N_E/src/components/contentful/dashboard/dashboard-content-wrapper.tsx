import { type ReactNode } from "react";
import { Box } from "@project/ui";
import { DashboardGrid } from "./dashboard-grid";
import { DashboardLayoutProvider } from "./dashboard-layout-context";

type DashboardContentWrapperProps = {
    children: ReactNode;
};

const DashboardContentWrapper = ({ children }: DashboardContentWrapperProps) => {
    return (
        <DashboardLayoutProvider>
            <Box position="relative">
                {children}

                <DashboardGrid />
            </Box>
        </DashboardLayoutProvider>
    );
};

export { DashboardContentWrapper };
