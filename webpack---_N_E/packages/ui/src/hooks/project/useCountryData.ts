import type { TCountryCode } from "countries-list";
import { countries } from "countries-list";
import { useMemo } from "react";

type UseCountryDataOptions = {
    countryCode: string;
};

const useCountryData = (options: UseCountryDataOptions) => {
    return useMemo(() => {
        return countries[options.countryCode as TCountryCode] ?? null;
    }, [options.countryCode]);
};

export type { UseCountryDataOptions };
export { useCountryData };
