import React, { FormEvent } from "react";
import { rawTimeZones } from "@vvo/tzdb";
import { useCallback } from "react";
import { useState } from "react";
import { useContext } from "react";
import { PeopleContext } from "@/contexts/people-context";
import useLocalizedTime from "@/hooks/useLocalizedTime";
import { DateTime } from "luxon";
import { TimeZoneNames, TimeZonesByName } from "@/const";



export default function NewPerson() {
    const [ name, setName ] = useState("");
    const [ timezone, setTimezone ] = useState(TimeZoneNames[0]);
    const { addPerson } = useContext(PeopleContext);

    const canSubmit = name.length > 0;

    const localizedSelectedTime = useLocalizedTime(timezone);

    const onSubmit = useCallback((e: FormEvent) => {
        e.preventDefault();
        addPerson({ name, timezone })
    }, [name, timezone, addPerson]);

    return (
        <div className="new-person-view">
            <form onSubmit={onSubmit}>
                <label>
                    Name
                    <input required value={name} onChange={event => setName(event.target.value)} type="text" />
                </label>

                <label>
                    Timezone
                    <select value={timezone} onChange={event => setTimezone(event.target.value)}>
                        {TimeZoneNames.map(timeZone => (
                            <option value={timeZone} key={timeZone}>
                                {timeZone} – {TimeZonesByName[timeZone].abbreviation}
                            </option>
                        ))}
                    </select>
                </label>

                <label>
                    {localizedSelectedTime.localizedAdjustedTime} {localizedSelectedTime.timezoneObject.abbreviation}
                </label>

                <button disabled={!canSubmit} type="submit">Save</button>
            </form>
        </div>
    )
}