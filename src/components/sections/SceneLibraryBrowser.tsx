/**
 * @file Scene Library Browser Component
 * Displays the mathematical visualization scenes from our scene library with descriptions and code examples
 */

import React, { useState } from "react";
import {
  Card,
  Text,
  Badge,
  Group,
  Stack,
  Tabs,
  Code,
  Button,
  Select,
} from "@mantine/core";
import {
  sceneLibrary,
  getAllCategories,
  getScenesByCategory,
  SceneDefinition,
} from "../../data/sceneLibrary";

interface SceneLibraryBrowserProps {
  onSceneSelect?: (scene: SceneDefinition) => void;
}

export const SceneLibraryBrowser: React.FC<SceneLibraryBrowserProps> = ({
  onSceneSelect,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedScene, setSelectedScene] = useState<SceneDefinition | null>(
    null
  );

  const categories = getAllCategories();
  const filteredScenes =
    selectedCategory === "all"
      ? sceneLibrary
      : getScenesByCategory(selectedCategory);

  const handleSceneClick = (scene: SceneDefinition) => {
    setSelectedScene(scene);
    onSceneSelect?.(scene);
  };

  const getTypeColor = (type: SceneDefinition["type"]) => {
    switch (type) {
      case "Narrated Animation":
        return "blue";
      case "Exploratory Environment":
        return "green";
      case "Utility Plotter":
        return "orange";
      default:
        return "gray";
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
      <Stack spacing="lg">
        <div>
          <Text size="xl" weight={700} mb="md">
            Mathematical Visualization Library
          </Text>
          <Text color="dimmed" mb="lg">
            Explore our collection of interactive mathematical visualizations
            designed to build intuition from GUI to code.
          </Text>

          <Select
            label="Filter by Category"
            placeholder="Select a category"
            value={selectedCategory}
            onChange={(value) => setSelectedCategory(value || "all")}
            data={[
              { value: "all", label: "All Categories" },
              ...categories.map((cat) => ({ value: cat, label: cat })),
            ]}
            mb="lg"
          />
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: selectedScene ? "1fr 1fr" : "1fr",
            gap: "20px",
          }}
        >
          {/* Scene List */}
          <Stack spacing="md">
            {filteredScenes.map((scene) => (
              <Card
                key={scene.id}
                shadow="sm"
                padding="lg"
                radius="md"
                withBorder
                style={{
                  cursor: "pointer",
                  border:
                    selectedScene?.id === scene.id
                      ? "2px solid #228be6"
                      : undefined,
                  backgroundColor:
                    selectedScene?.id === scene.id ? "#f8f9fa" : undefined,
                }}
                onClick={() => handleSceneClick(scene)}
              >
                <Group position="apart" mb="xs">
                  <Text weight={500} size="lg">
                    {scene.title}
                  </Text>
                  <Badge color={getTypeColor(scene.type)} variant="light">
                    {scene.type}
                  </Badge>
                </Group>

                <Badge color="gray" variant="outline" mb="sm">
                  {scene.category}
                </Badge>

                <Text size="sm" color="dimmed" lineClamp={3}>
                  {scene.visualizationDescription}
                </Text>
              </Card>
            ))}
          </Stack>

          {/* Scene Details */}
          {selectedScene && (
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Stack spacing="md">
                <div>
                  <Group position="apart" mb="xs">
                    <Text weight={700} size="xl">
                      {selectedScene.title}
                    </Text>
                    <Badge color={getTypeColor(selectedScene.type)}>
                      {selectedScene.type}
                    </Badge>
                  </Group>
                  <Badge color="gray" variant="outline" mb="sm">
                    {selectedScene.category}
                  </Badge>
                </div>

                <Tabs defaultValue="description">
                  <Tabs.List>
                    <Tabs.Tab value="description">Description</Tabs.Tab>
                    <Tabs.Tab value="variables">Variables</Tabs.Tab>
                    <Tabs.Tab value="code">Example Code</Tabs.Tab>
                  </Tabs.List>

                  <Tabs.Panel value="description" pt="md">
                    <Text size="sm">
                      {selectedScene.visualizationDescription}
                    </Text>
                  </Tabs.Panel>

                  <Tabs.Panel value="variables" pt="md">
                    <Stack spacing="sm">
                      <div>
                        <Text weight={600} size="sm" mb="xs">
                          Mathematical Variables:
                        </Text>
                        {selectedScene.editableMathVars.map(
                          (variable, index) => (
                            <Badge
                              key={index}
                              variant="light"
                              color="blue"
                              mr="xs"
                              mb="xs"
                            >
                              {variable}
                            </Badge>
                          )
                        )}
                      </div>

                      <div>
                        <Text weight={600} size="sm" mb="xs">
                          Scene Variables:
                        </Text>
                        {selectedScene.editableSceneVars.map(
                          (variable, index) => (
                            <Badge
                              key={index}
                              variant="light"
                              color="green"
                              mr="xs"
                              mb="xs"
                            >
                              {variable}
                            </Badge>
                          )
                        )}
                      </div>
                    </Stack>
                  </Tabs.Panel>

                  <Tabs.Panel value="code" pt="md">
                    <Code
                      block
                      style={{
                        backgroundColor: "#1a1b1e",
                        color: "#c1c2c5",
                        padding: "16px",
                        borderRadius: "8px",
                        fontSize: "14px",
                        fontFamily: "Monaco, Consolas, monospace",
                      }}
                    >
                      {selectedScene.exampleCode}
                    </Code>
                  </Tabs.Panel>
                </Tabs>

                <Button
                  fullWidth
                  variant="filled"
                  onClick={() => {
                    // This would navigate to the visualization workspace
                    console.log("Opening scene:", selectedScene.id);
                  }}
                >
                  Open Visualization
                </Button>
              </Stack>
            </Card>
          )}
        </div>
      </Stack>
    </div>
  );
};

export default SceneLibraryBrowser;
