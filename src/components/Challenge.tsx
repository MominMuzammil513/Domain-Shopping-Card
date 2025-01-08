'use client';
import { useState, useCallback } from 'react';
import { Button, VStack, useDisclosure } from '@chakra-ui/react';
import { Buttons } from './Buttons';
import { DomainInput } from './DomainInput';
import { DomainList } from './DomainList';
import { ProgressIndicator } from './ProgressIndicator';
import { toaster } from './ui/toaster';
import { EditDomainModal } from '@/components/EditDomainModal ';
import { isDomainAvailable } from '@/lib/mockApi';
import { useUndoManager } from '@/components/useUndoManager';

interface ChallengeProps {
  numDomainsRequired: number;
}

export const Challenge = ({ numDomainsRequired }: ChallengeProps) => {
  const [newDomains, setNewDomains] = useState<string[]>([]);
  const [editingDomain, setEditingDomain] = useState<string | null>(null);
  const [newDomainName, setNewDomainName] = useState('');
  const { open, onOpen, onClose } = useDisclosure();

  const {
    current: domains,
    setCurrent: setDomains,
    undo,
    redo,
  } = useUndoManager([]);

  const handleAddDomain = useCallback(
    async (domain: string) => {
      if (
        domains.some((d) => d.domain === domain) ||
        newDomains.includes(domain)
      ) {
        toaster.create({ title: 'Domain Already Exists', type: 'error' });
        return;
      }
      if (!isDomainAvailable(domain)) {
        toaster.create({ title: 'Invalid Domain Format', type: 'error' });
        return;
      }
      setNewDomains((prev) => [...prev, domain]);
      try {
        const isAvailable = await isDomainAvailable(domain);
        setDomains([...domains, { domain, isAvailable }]);
        toaster.create({ title: 'Domain Added', type: 'success' });
      } catch (error) {
        toaster.create({
          title: 'Error Checking Availability',
          description: String(error),
          type: 'error',
        });
      } finally {
        setNewDomains((prev) => prev.filter((d) => d !== domain));
      }
    },
    [domains, newDomains, setDomains]
  );

  const handleDeleteDomain = useCallback(
    (domain: string) => {
      setDomains(domains.filter((d) => d.domain !== domain));
      toaster.create({ title: 'Domain Deleted', type: 'info' });
    },
    [domains, setDomains]
  );

  const handleEditDomain = useCallback(
    async (oldDomain: string, newDomain: string) => {
      if (domains.some((d) => d.domain === newDomain)) {
        toaster.create({ title: 'Domain Already Exists', type: 'error' });
        return;
      }
      if (!isDomainAvailable(newDomain)) {
        toaster.create({ title: 'Invalid Domain Format', type: 'error' });
        return;
      }
      const isAvailable = await isDomainAvailable(newDomain);
      setDomains(
        domains.map((d) =>
          d.domain === oldDomain ? { domain: newDomain, isAvailable } : d
        )
      );
      toaster.create({ title: 'Domain Updated', type: 'success' });
    },
    [domains, setDomains]
  );

  const handleClearCart = useCallback(() => {
    setDomains([]);
    toaster.create({ title: 'Cart Cleared', type: 'info' });
  }, [setDomains]);

  const handleRemoveUnavailable = useCallback(() => {
    setDomains(domains.filter((d) => d.isAvailable));
    toaster.create({ title: 'Unavailable Domains Removed', type: 'info' });
  }, [domains, setDomains]);

  const handleKeepBestDomains = useCallback(() => {
    const availableDomains = domains.filter((d) => d.isAvailable);
    const sortedDomains = [...availableDomains].sort((a, b) => {
      const priority: Record<string, number> = {
        '.com': 1,
        '.app': 2,
        '.xyz': 3,
      };
      const aExt = a.domain.split('.').pop() || '';
      const bExt = b.domain.split('.').pop() || '';
      return (
        (priority[aExt] || 0) - (priority[bExt] || 0) ||
        a.domain.length - b.domain.length
      );
    });
    setDomains(sortedDomains.slice(0, numDomainsRequired));
    toaster.create({ title: 'Best Domains Kept', type: 'success' });
  }, [domains, numDomainsRequired, setDomains]);

  const isSuggestedDomain = useCallback(
    (domain: string, isAvailable: boolean) => {
      if (!isAvailable) return false;
      const isShort = domain.length <= 10;
      const hasCommonExtension = ['.com', '.app', '.xyz'].some((ext) =>
        domain.endsWith(ext)
      );
      const isMemorable = /^[a-zA-Z]+$/.test(domain.split('.')[0]);
      return isShort && hasCommonExtension && isMemorable;
    },
    []
  );

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
        onRedo={redo}
        onUndo={undo}
      />
      <Buttons
        domains={domains}
        numDomainsRequired={numDomainsRequired}
        onClearCart={handleClearCart}
        onRemoveUnavailable={handleRemoveUnavailable}
        onKeepBestDomains={handleKeepBestDomains}
      />
      <DomainList
        domains={domains}
        newDomains={newDomains}
        onDeleteDomain={handleDeleteDomain}
        onEditDomain={(domain) => {
          setEditingDomain(domain);
          setNewDomainName(domain);
          onOpen();
        }}
        isSuggestedDomain={isSuggestedDomain}
      />
      <EditDomainModal
        isOpen={open}
        onClose={onClose}
        editingDomain={editingDomain}
        newDomainName={newDomainName}
        setNewDomainName={setNewDomainName}
        handleEditDomain={handleEditDomain}
      />
      <Button
        onClick={() => alert('Domains purchased successfully!')}
        colorScheme="brand"
        disabled={domains.length !== numDomainsRequired}
        size="lg"
        pos="sticky"
        bottom={1}
      >
        Purchase Domains
      </Button>
    </VStack>
  );
};
