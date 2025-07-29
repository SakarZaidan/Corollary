import React from "react";
import { Select, Slider, Stack, Text } from "@mantine/core";

interface ControlPanelProps {
  selectedPreset: string;
  onPresetChange: (value: string) => void;
  rotationSpeed: number;
  onRotationSpeedChange: (value: number) => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  selectedPreset,
  onPresetChange,
  rotationSpeed,
  onRotationSpeedChange,
}) => {
  return (
    <Stack
      spacing="md"
      p="md"
      style={{ width: 300, borderRight: "1px solid #eee" }}
    >
      <Select
        label="Select 3D Preset"
        placeholder="Pick one"
        data={["cube", "sphere"]}
        value={selectedPreset}
        onChange={(value) => onPresetChange(value || "cube")}
        clearable
      />

      <Text size="sm">Rotation Speed: {rotationSpeed.toFixed(1)}</Text>
      <Slider
        min={0.1}
        max={5}
        step={0.1}
        value={rotationSpeed}
        onChange={onRotationSpeedChange}
        label={(value) => value.toFixed(1)}
      />
    </Stack>
  );
};

export default ControlPanel;
