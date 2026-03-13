import React, { useState } from "react";
import { Button } from "react-bootstrap";

export function d6(): number {
    return 1 + Math.floor(Math.random() * 6);
}

export function TwoDice(): React.JSX.Element {
    const [left, setLeft] = useState<number>(1);
    const [right, setRight] = useState<number>(2);

    return (
        <div>
            <Button
                onClick={() => {
                    setLeft(d6());
                }}
            >
                Roll Left
            </Button>
            <span data-testid="left-die">{left}</span>
            <span data-testid="right-die">{right}</span>
            <Button
                onClick={() => {
                    setRight(d6());
                }}
            >
                Roll Right
            </Button>
            {left === right && left === 1 && <span> Lose</span>}
            {left === right && left !== 1 && <span> Win</span>}
        </div>
    );
}
