import { HStack } from '@chakra-ui/react';
import { toaster } from './ui/toaster';
import { Button } from './ui/button';

interface ButtonsProps {
  domains: { domain: string; isAvailable: boolean }[];
  numDomainsRequired: number;
  onClearCart: () => void;
  onRemoveUnavailable: () => void;
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
    <HStack
      gap={{ base: 2, md: 6 }}
      flexWrap="wrap"
      justifyContent={{ base: 'center', md: 'space-around' }}
      pb={4}
    >
      {/* Clear Cart Button */}
      <Button
        onClick={onClearCart}
        colorPalette="red"
        size="sm"
        flex={{ base: '1 1 45%', md: 'none' }}
        variant="surface"
        fontSize={{ base: 'xs', md: 'sm' }}
      >
        Clear Cart
      </Button>

      {/* Remove Unavailable Button */}
      <Button
        onClick={onRemoveUnavailable}
        colorPalette="orange"
        size="sm"
        flex={{ base: '1 1 45%', md: 'none' }}
        variant="surface"
        fontSize={{ base: 'xs', md: 'sm' }}
      >
        Remove Unavailable
      </Button>

      {/* Copy to Clipboard Button */}
      <Button
        onClick={handleCopyToClipboard}
        colorPalette="blue"
        size="sm"
        flex={{ base: '1 1 45%', md: 'none' }}
        variant="surface"
        fontSize={{ base: 'xs', md: 'sm' }}
      >
        Copy to Clipboard
      </Button>

      {/* Keep Best Domains Button */}
      <Button
        onClick={onKeepBestDomains}
        colorPalette="purple"
        size="sm"
        flex={{ base: '1 1 45%', md: 'none' }}
        variant="surface"
        fontSize={{ base: 'xs', md: 'sm' }}
      >
        Keep Best Domains
      </Button>
    </HStack>
  );
};
