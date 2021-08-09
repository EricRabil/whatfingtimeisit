import React, { useState } from "react";
import { SWATCH_COLORS } from "@/contexts/color-coding-context";

export interface ColorSwatchProps {
    onColorChanged(color: string): void;
}

export default function ColorSwatch({ onColorChanged }: ColorSwatchProps) {
    const [isDown, setIsDown] = useState(false);

    return (
        <div className="color-swatch" onMouseLeave={() => setIsDown(false)} onPointerDown={e => e.stopPropagation()}>
            {SWATCH_COLORS.map(color => (
                <div key={color} className={"swatch-item color-" + color} onMouseDown={() => {
                    setIsDown(true);
                    onColorChanged(color);
                }} onMouseUp={() => setIsDown(false)} onMouseOver={() => {
                    if (isDown) onColorChanged(color);
                }} />
            ))}
        </div>
    )
}