import { Button, Flex } from "@chakra-ui/react";
import React from "react";
import { LuMinus, LuPlus } from "react-icons/lu";

export default function WeightInputStepper({
  value,
  onChange,
  min = 0,
  max = 9999,
  step = 1,
}: {
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
  step?: number;
}) {
  const handleDecrement = () => {
    const next = Math.max(min, value - step);
    onChange(next);
  };

  const handleIncrement = () => {
    const next = Math.min(max, value + step);
    onChange(next);
  };

  const handleManualChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = Number(e.target.value);
    if (!isNaN(next)) {
      onChange(Math.max(min, Math.min(max, next)));
    }
  };

  return (
    <Flex align="center">
      <Button size="xs" onClick={handleDecrement} disabled={value <= min}>
        <LuMinus />
      </Button>
      <input
        className="custom-weight-input"
        type="number"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleManualChange}
        onWheel={(e) => e.currentTarget.blur()}
        onKeyDown={(e) => {
          if (e.key === "ArrowUp" || e.key === "ArrowDown") e.preventDefault();
        }}
      />
      <Button size="xs" onClick={handleIncrement} disabled={value >= max}>
        <LuPlus />
      </Button>
    </Flex>
  );
}
