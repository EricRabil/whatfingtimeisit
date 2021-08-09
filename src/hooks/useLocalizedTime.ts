import { TimeContext } from "@/contexts/time";
import { TimeZoneNames, TimeZonesByName } from "../const";
import { useContext, useMemo } from "react";
import { DateTime } from "luxon";
import { RawTimeZone } from "@vvo/tzdb";

export enum BeeperTimezone {
    NAWest = "NA-West",
    NACentral = "NA-Central",
    NAMountain = "NA-Mountain",
    NAEast = "NA-East",
    Europe = "Europe",
    India = "India",
    MidWest = "Mid-West",
    SouthAmerica = "S America",
    Asia = "Asia",
    SEAsia = "SE Asia",
}

export const BEEPER_TIMEZONE_BINDINGS: Record<BeeperTimezone, string> = {
    [BeeperTimezone.NAWest]: "America/Los_Angeles",
    [BeeperTimezone.NACentral]: "America/Mexico_City",
    [BeeperTimezone.NAMountain]: "America/Denver",
    [BeeperTimezone.NAEast]: "America/New_York",
    [BeeperTimezone.Europe]: "Europe/Zurich",
    [BeeperTimezone.India]: "Asia/Kolkata",
    [BeeperTimezone.MidWest]: "America/New_York",
    [BeeperTimezone.SouthAmerica]: "America/Santiago",
    [BeeperTimezone.Asia]: "Asia/Tokyo",
    [BeeperTimezone.SEAsia]: "Asia/Ho_Chi_Minh"
}

export interface TimeLocalization {
    localizedAdjustedTime: string;
    timezoneObject: RawTimeZone;
    adjustedTime: DateTime;
}

export function localizeTime(timezone: string, format = DateTime.TIME_SIMPLE): TimeLocalization {
    const time = DateTime.fromObject({}).setZone(timezone);

    return {
        localizedAdjustedTime: time.toLocaleString(format),
        timezoneObject: TimeZonesByName[timezone],
        adjustedTime: time
    };
}

export function useAllLocalizedTimes(format = DateTime.TIME_SIMPLE): TimeLocalization[] {
    const now = useContext(TimeContext);

    return useMemo(() => TimeZoneNames.map(name => localizeTime(name, format)), [now]);
}

export default function useLocalizedTime(timezone: string, format = DateTime.TIME_SIMPLE): TimeLocalization {
    const now = useContext(TimeContext);

    return useMemo(() => localizeTime(timezone, format), [now, timezone, format]);
}