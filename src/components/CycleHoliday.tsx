import React, { useState } from "react";
import { Button } from "react-bootstrap";

type Holiday = "🎃" | "🎄" | "🎆" | "💝" | "🥚";

// Alphabetical order: Easter, Fireworks (4th of July), Halloween, Valentine's, Christmas
const nextAlpha: Record<Holiday, Holiday> = {
    "🥚": "🎆",
    "🎆": "🎃",
    "🎃": "💝",
    "💝": "🎄",
    "🎄": "🥚",
};

// Year order: Valentine's (Feb), Easter (Apr), Fireworks (Jul), Halloween (Oct), Christmas (Dec)
const nextYear: Record<Holiday, Holiday> = {
    "💝": "🥚",
    "🥚": "🎆",
    "🎆": "🎃",
    "🎃": "🎄",
    "🎄": "💝",
};

export function CycleHoliday(): React.JSX.Element {
    const [holiday, setHoliday] = useState<Holiday>("🎃");

    return (
        <div>
            <span>Holiday: {holiday}</span>
            <br />
            <Button
                onClick={() => {
                    setHoliday(nextAlpha[holiday]);
                }}
            >
                Advance by Alphabet
            </Button>
            <Button
                onClick={() => {
                    setHoliday(nextYear[holiday]);
                }}
            >
                Advance by Year
            </Button>
        </div>
    );
}
