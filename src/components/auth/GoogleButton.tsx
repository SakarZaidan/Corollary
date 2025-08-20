import React from 'react';
import { Button, ButtonProps } from '@mantine/core';
import { FaGoogle } from 'react-icons/fa';

interface GoogleButtonProps extends ButtonProps {
  onClick?: () => void;
}

/**
 * Google authentication button component
 * Used for Google OAuth sign-in functionality
 */
export function GoogleButton({ onClick, ...props }: GoogleButtonProps) {
  return (
    <Button
      leftIcon={<FaGoogle />}
      variant="outline"
      color="gray"
      onClick={onClick}
      fullWidth
      {...props}
    >
      Continue with Google
    </Button>
  );
}