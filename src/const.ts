import { RawTimeZone, rawTimeZones } from "@vvo/tzdb";

export const TimeZonesByName: Record<string, RawTimeZone> = rawTimeZones.reduce((acc, timezone) => {
    acc[timezone.name] = timezone;
    return acc;
}, {} as Record<string, RawTimeZone>);

export const TimeZoneNames = rawTimeZones.map(zone => zone.name).sort();