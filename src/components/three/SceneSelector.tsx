import React from "react";
import { Select } from "@mantine/core";

interface SceneSelectorProps {
  selectedScene: string;
  onChange: (value: string) => void;
}

const SceneSelector: React.FC<SceneSelectorProps> = ({
  selectedScene,
  onChange,
}) => {
  const scenes = [
    { value: "cube", label: "Rotating Cube" },
    { value: "sphere", label: "Basic Sphere" },
  ];

  return (
    <Select
      label="Select Visualization Scene"
      value={selectedScene}
      onChange={(value) => value && onChange(value)}
      data={scenes}
    />
  );
};

export default SceneSelector;
