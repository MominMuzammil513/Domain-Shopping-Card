'use client';

import { Button, HStack } from '@chakra-ui/react';
import { toaster } from './ui/toaster';

interface ButtonsProps {
  domains: { domain: string; isAvailable: boolean }[];
  numDomainsRequired: number;
  onClearCart: () => void;
  onRemoveUnavailable: () => void;
  onCopyToClipboard: () => void;
  onKeepBestDomains: () => void;
}

export const Buttons = ({
  domains,
  onClearCart,
  onRemoveUnavailable,
  onKeepBestDomains,
}: ButtonsProps) => {

  const handleCopyToClipboard = () => {
    const domainsText = domains.map((d) => d.domain).join(', ');
    navigator.clipboard.writeText(domainsText);
    toaster.create({
      title: 'Copied to Clipboard',
      description: 'Domains copied successfully.',
      type: 'success',
    });
  };

  return (
    <HStack gap={6} flexWrap="wrap">
      <Button onClick={onClearCart} colorScheme="red" size="sm">
        Clear Cart
      </Button>
      <Button onClick={onRemoveUnavailable} colorScheme="orange" size="sm">
        Remove Unavailable
      </Button>
      <Button onClick={handleCopyToClipboard} colorScheme="blue" size="sm">
        Copy to Clipboard
      </Button>
      <Button onClick={onKeepBestDomains} colorScheme="purple" size="sm">
        Keep Best Domains
      </Button>
    </HStack>
  );
};