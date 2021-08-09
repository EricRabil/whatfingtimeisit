import React, { createContext } from "react";
import luxon, { DateTime } from "luxon";
import { PeopleContext, Person } from "./people-context";
import { TimeZonesByName } from "../const";
import { TimeContext } from "./time";
import { useContext } from "react";
import { useMemo } from "react";
import { localizeTime, TimeLocalization } from "../hooks/useLocalizedTime";
import { mapObject } from "../util";

export interface LocalizedPerson extends Person, TimeLocalization {
}

export const LocalizedTimeContext = createContext<Record<string, LocalizedPerson>>({});

export function LocalizedPeopleContextProvider({ children }: { children: React.ReactNode }) {
    const { people } = useContext(PeopleContext);
    const now = useContext(TimeContext);

    const localizedPeople: Record<string, LocalizedPerson> = useMemo(() => mapObject(people, (id, person) => {
        return Object.assign({}, person, localizeTime(person.timezone));
    }), [people, now]);

    return (
        <LocalizedTimeContext.Provider value={localizedPeople}>
            {children}
        </LocalizedTimeContext.Provider>
    )
}