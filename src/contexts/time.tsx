import React, { createContext } from "react";
import { useEffect } from "react";
import { useState } from "react";

export const TimeContext = createContext(0);

function nextSecond(): number {
    const then = new Date();
    then.setMilliseconds(0);
    then.setSeconds(then.getSeconds() + 1);

    return +then;
}

function timeToNextSecond(): number {
    return nextSecond() - Date.now();
}

function fireNextSecond(cb: () => void): NodeJS.Timeout {
    return setTimeout(cb, timeToNextSecond());
}

function fireEverySecond(cb: () => void): () => void {
    let dead = false;
    let timeout: NodeJS.Timeout;

    function fire() {
        if (dead) return;
        cb();
        schedule();
    }

    function kill() {
        if (dead) return;
        dead = true;
        clearTimeout(timeout);
    }

    function schedule() {
        if (dead) return;
        timeout = fireNextSecond(fire);
    }

    schedule();

    return kill;
}

export function CurrentTimeOneSecondTTLProvider({ children }: { children: React.ReactNode }) {
    const [ time, setTime ] = useState(() => Date.now());

    useEffect(() => fireEverySecond(() => setTime(Date.now())), [setTime]);

    return (
        <TimeContext.Provider value={time}>
            {children}
        </TimeContext.Provider>
    )
}