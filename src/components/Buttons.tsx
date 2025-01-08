import { HStack } from '@chakra-ui/react';
import { toaster } from './ui/toaster';
import { Button } from './ui/button';

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
    <HStack
      gap={{ base: 2, md: 6 }}
      flexWrap="wrap"
      justifyContent={{ base: 'center', md: 'space-around' }}
      pb={4}
    >
      <Button
        onClick={onClearCart}
        colorScheme="red"
        size="sm"
        flex={{ base: '1 1 45%', md: 'none' }}
        variant={'surface'}
      >
        Clear Cart
      </Button>
      <Button
        onClick={onRemoveUnavailable}
        colorScheme="orange"
        size="sm"
        flex={{ base: '1 1 45%', md: 'none' }}
        variant={'surface'}
      >
        Remove Unavailable
      </Button>
      <Button
        onClick={handleCopyToClipboard}
        colorScheme="blue"
        size="sm"
        flex={{ base: '1 1 45%', md: 'none' }}
        variant={'surface'}
      >
        Copy to Clipboard
      </Button>
      <Button
        onClick={onKeepBestDomains}
        colorScheme="purple"
        size="sm"
        flex={{ base: '1 1 45%', md: 'none' }}
        variant={'surface'}
      >
        Keep Best Domains
      </Button>
    </HStack>
  );
};
