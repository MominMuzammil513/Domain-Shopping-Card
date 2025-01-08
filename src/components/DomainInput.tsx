import { Input, Flex } from '@chakra-ui/react';
import { useState } from 'react';
import { toaster } from './ui/toaster';
import { Button } from './ui/button';
import { isDomainAvailable } from '@/lib/mockApi';
import { Tooltip } from '@/components/ui/tooltip';

interface DomainInputProps {
  onAddDomain: (domain: string) => void;
  loading: boolean;
  domains: { domain: string; isAvailable: boolean }[];
}

export const DomainInput = ({
  onAddDomain,
  loading,
  domains,
}: DomainInputProps) => {
  const [domain, setDomain] = useState('');

  const handleAddDomain = () => {
    const trimmedDomain = domain.trim().toLowerCase();
    if (domains.some((d) => d.domain === trimmedDomain)) {
      toaster.create({ title: 'Domain Already Exists', type: 'error' });
      return;
    }
    if (!isDomainAvailable(trimmedDomain)) {
      toaster.create({ title: 'Invalid Domain', type: 'error' });
      return;
    }
    onAddDomain(trimmedDomain);
    setDomain('');
  };

  return (
    <Flex gap={2}>
      <Tooltip content="Enter a domain ending with .com, .xyz, or .app">
        <Input
          placeholder="Enter a domain (e.g., example.com)"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAddDomain()}
          disabled={loading}
        />
      </Tooltip>
      <Button onClick={handleAddDomain} loading={loading}>
        Add
      </Button>
    </Flex>
  );
};
