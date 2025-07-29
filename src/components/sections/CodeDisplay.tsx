import React from "react";
import { Paper, Text, Title } from "@mantine/core";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

import { generateSceneCode } from "../../utils/codeGenerator";

interface CodeDisplayProps {
  selectedPreset: string;
  rotationSpeed: number;
}

const CodeDisplay: React.FC<CodeDisplayProps> = ({
  selectedPreset,
  rotationSpeed,
}) => {
  const code = generateSceneCode(selectedPreset, rotationSpeed);
  return (
    <Paper
      shadow="xs"
      p="md"
      withBorder
      style={{ flexGrow: 1, overflow: "auto" }}
    >
      <Title order={4} mb="sm">
        Generated Code
      </Title>
      <SyntaxHighlighter
        language="typescript"
        style={atomDark}
        customStyle={{ fontSize: "0.8em" }}
      >
        {code}
      </SyntaxHighlighter>
    </Paper>
  );
};

export default CodeDisplay;
