import React, { createContext, useContext, useMemo } from "react";
import { localizeTime, TimeLocalization } from "../hooks/useLocalizedTime";
import { mapObject } from "../util";
import { PeopleContext, Person } from "./people-context";
import { TimeContext } from "./time";

export interface LocalizedPerson extends Person, TimeLocalization {
}

export const LocalizedTimeContext = createContext<Record<string, LocalizedPerson>>({});

export function LocalizedPeopleContextProvider({ children }: { children: React.ReactNode }) {
    const { people } = useContext(PeopleContext);
    const now = useContext(TimeContext);

    const localizedPeople: Record<string, LocalizedPerson> = useMemo(() => mapObject(people, (id, person) => {
        return Object.assign({}, person, localizeTime(person.timezone));
    }), [people, now,]);

    return (
        <LocalizedTimeContext.Provider value={localizedPeople}>
            {children}
        </LocalizedTimeContext.Provider>
    )
}