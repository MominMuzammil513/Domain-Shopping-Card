'use client';
import { useState, useCallback } from 'react';
import { Button, VStack } from '@chakra-ui/react';
import { Buttons } from './Buttons';
import { isDomainAvailable } from '@/lib/mockApi';
import { DomainInput } from './DomainInput';
import { DomainList } from './DomainList';
import { ProgressIndicator } from './ProgressIndicator';
import { toaster } from './ui/toaster';
import { EditDomainModal } from './EditDomainModal ';

interface ChallengeProps {
  numDomainsRequired: number;
}

export const Challenge = ({ numDomainsRequired }: ChallengeProps) => {
  const [domains, setDomains] = useState<
    { domain: string; isAvailable: boolean }[]
  >([]);
  const [newDomains, setNewDomains] = useState<string[]>([]);
  const [editingDomain, setEditingDomain] = useState<string | null>(null);
  const [newDomainName, setNewDomainName] = useState('');

  const handleAddDomain = useCallback(
    async (domain: string) => {
      if (
        domains.some((d) => d.domain === domain) ||
        newDomains.includes(domain)
      )
        return;
      setNewDomains((prev) => [...prev, domain]);
      try {
        const isAvailable = await isDomainAvailable(domain);
        setDomains((prev) => [...prev, { domain, isAvailable }]);
      } catch (error) {
        toaster.create({
          title: 'Error checking domain availability:',
          description: String(error),
          type: 'error',
        });
      } finally {
        setNewDomains((prev) => prev.filter((d) => d !== domain));
      }
    },
    [domains, newDomains]
  );

  const handleDeleteDomain = useCallback((domain: string) => {
    setDomains((prev) => prev.filter((d) => d.domain !== domain));
  }, []);

  const handleEditDomain = useCallback(
    async (oldDomain: string, newDomain: string) => {
      if (domains.some((d) => d.domain === newDomain)) {
        toaster.create({
          title: 'Domain Already Exists',
          description: 'This domain is already in the list.',
          type: 'error',
        });
        return;
      }

      // Validate the new domain format
      const isValid = /^[a-zA-Z0-9]+\.(com|xyz|app)$/.test(newDomain);
      if (!isValid) {
        toaster.create({
          title: 'Invalid Domain Format',
          description: 'Domain must end with .com, .xyz, or .app.',
          type: 'error',
        });
        return;
      }
      const isAvailable = await isDomainAvailable(newDomain);
      setDomains((prev) =>
        prev.map((d) =>
          d.domain === oldDomain ? { domain: newDomain, isAvailable } : d
        )
      );

      setEditingDomain(null);
      setNewDomainName('');

      toaster.create({
        title: 'Domain Updated',
        description: 'The domain has been successfully updated.',
        type: 'success',
      });
    },
    [domains]
  );

  const handleClearCart = useCallback(() => setDomains([]), []);

  const handleRemoveUnavailable = useCallback(() => {
    setDomains((prev) => prev.filter((d) => d.isAvailable));
  }, []);

  const handleKeepBestDomains = useCallback(() => {
    const availableDomains = domains.filter((d) => d.isAvailable);
    const sortedDomains = [...availableDomains].sort((a, b) => {
      const priority: Record<string, number> = {
        '.com': 1,
        '.app': 2,
        '.xyz': 3,
      };
      const aDomainExtension = a.domain.split('.').pop() || '';
      const bDomainExtension = b.domain.split('.').pop() || '';
      const aPriority = priority[aDomainExtension] || 0;
      const bPriority = priority[bDomainExtension] || 0;
      if (aPriority !== bPriority) return aPriority - bPriority;
      return a.domain.length - b.domain.length;
    });
    setDomains(sortedDomains.slice(0, numDomainsRequired));
  }, [domains, numDomainsRequired]);

  const isSuggestedDomain = (domain: string, isAvailable: boolean) => {
    if (!isAvailable) return false;

    const isShort = domain.length <= 10;
    const hasCommonExtension = ['.com', '.app', '.xyz'].some((ext) =>
      domain.endsWith(ext)
    );
    const isMemorable = /^[a-zA-Z]+$/.test(domain.split('.')[0]);

    return isShort && hasCommonExtension && isMemorable;
  };

  return (
    <VStack align="stretch">
      <DomainInput
        onAddDomain={handleAddDomain}
        loading={newDomains.length > 0}
        domains={domains}
      />
      <ProgressIndicator
        current={domains.length}
        required={numDomainsRequired}
      />
      <Buttons
        domains={domains}
        numDomainsRequired={numDomainsRequired}
        onClearCart={handleClearCart}
        onRemoveUnavailable={handleRemoveUnavailable}
        onCopyToClipboard={() => {}}
        onKeepBestDomains={handleKeepBestDomains}
      />
      <DomainList
        domains={domains}
        newDomains={newDomains}
        onDeleteDomain={handleDeleteDomain}
        onEditDomain={(domain) => {
          setEditingDomain(domain);
          setNewDomainName(domain);
        }}
        isSuggestedDomain={isSuggestedDomain}
      />
      {editingDomain && (
        <EditDomainModal
          editingDomain={editingDomain}
          newDomainName={newDomainName}
          setNewDomainName={setNewDomainName}
          setEditingDomain={setEditingDomain}
          handleEditDomain={handleEditDomain}
        />
      )}
      <Button
        onClick={() => alert('Domains purchased successfully!')}
        colorScheme="brand"
        disabled={domains.length !== numDomainsRequired}
        size="lg"
        pos={'sticky'}
        bottom={1}
      >
        Purchase Domains
      </Button>
    </VStack>
  );
};
