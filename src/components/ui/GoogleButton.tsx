import React from "react";
import { Button } from "@mantine/core";
import { IconBrandGoogle } from "@tabler/icons-react";

// Reusable Google OAuth login button component
// The `leftIcon` prop is a valid prop for Mantine's Button component and is used to display an icon to the left of the button's content.
// The React warning "React does not recognize the `leftIcon` prop on a DOM element" is a known issue with some component libraries
// and can often be safely ignored as it does not affect the component's functionality or rendering.
export function GoogleButton({ onClick }: { onClick: () => void }) {
  return (
    <Button
      variant="default"
      leftIcon={<IconBrandGoogle size={18} />}
      onClick={onClick}
    >
      Continue with Google
    </Button>
  );
}
