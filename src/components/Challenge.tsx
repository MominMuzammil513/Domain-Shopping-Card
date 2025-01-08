'use client';

import { useState, useCallback } from 'react';
import { Box, Button, VStack } from '@chakra-ui/react';
import { Buttons } from './Buttons';
import { isDomainAvailable } from '@/lib/mockApi';
import { DomainInput } from './DomainInput';
import { DomainList } from './DomainList';
import { ProgressIndicator } from './ProgressIndicator';

interface ChallengeProps {
  numDomainsRequired: number;
}

export const Challenge = ({ numDomainsRequired }: ChallengeProps) => {
  const [domains, setDomains] = useState<{ domain: string; isAvailable: boolean }[]>([]);

  const handleAddDomain = useCallback(
    async (domain: string) => {
      if (domains.some((d) => d.domain === domain)) return;

      const isAvailable = await isDomainAvailable(domain);
      setDomains((prev) => [...prev, { domain, isAvailable }]);
    },
    [domains]
  );

  const handleDeleteDomain = useCallback((domain: string) => {
    setDomains((prev) => prev.filter((d) => d.domain !== domain));
  }, []);

  const handleClearCart = useCallback(() => setDomains([]), []);
  const handleRemoveUnavailable = useCallback(() => {
    setDomains((prev) => prev.filter((d) => d.isAvailable));
  }, []);

  const handleKeepBestDomains = useCallback(() => {
    const sortedDomains = [...domains].sort((a, b) => {
      const priority: Record<string, number> = { '.com': 1, '.app': 2, '.xyz': 3 };
      const aDomainExtension = a.domain.split('.').pop() || '';
      const bDomainExtension = b.domain.split('.').pop() || '';
      const aPriority = priority[aDomainExtension] || 0;
      const bPriority = priority[bDomainExtension] || 0;

      if (aPriority !== bPriority) return aPriority - bPriority;
      return a.domain.length - b.domain.length;
    });

    setDomains(sortedDomains.slice(0, numDomainsRequired));
  }, [domains, numDomainsRequired]);

  return (
    <Box maxW="800px" mx="auto" p={{ base: 4, md: 8 }}  borderRadius="lg" boxShadow="md">
      <VStack  align="stretch">
        <DomainInput onAddDomain={handleAddDomain} />
        <DomainList domains={domains} onDeleteDomain={handleDeleteDomain} />
        <ProgressIndicator current={domains.length} required={numDomainsRequired} />
        <Buttons
          domains={domains}
          numDomainsRequired={numDomainsRequired}
          onClearCart={handleClearCart}
          onRemoveUnavailable={handleRemoveUnavailable}
          onCopyToClipboard={() => {}}
          onKeepBestDomains={handleKeepBestDomains}
        />
        <Button
          onClick={() => alert('Domains purchased successfully!')}
          colorScheme="brand"
          disabled={domains.length !== numDomainsRequired}
          size="lg"
        >
          Purchase Domains
        </Button>
      </VStack>
    </Box>
  );
};