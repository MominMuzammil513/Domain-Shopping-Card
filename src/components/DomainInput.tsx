import { Input, Flex } from '@chakra-ui/react';
import { useState } from 'react';
import { toaster } from './ui/toaster';
import { Button } from './ui/button';

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
      toaster.create({
        title: 'Domain Already Exists',
        description: 'This domain is already in the list.',
        type: 'error',
      });
      return;
    }

    const isValid = /^[a-zA-Z0-9]+\.(com|xyz|app)$/.test(trimmedDomain);
    if (!isValid) {
      toaster.create({
        title: 'Invalid Domain',
        description: 'Domain must end with .com, .xyz, or .app.',
        type: 'error',
      });
      return;
    }

    onAddDomain(trimmedDomain);
    setDomain('');
  };

  return (
    <Flex gap={2}>
      <Input
        placeholder="Enter a domain (e.g., example.com)"
        value={domain}
        onChange={(e) => setDomain(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleAddDomain()}
        disabled={loading}
      />
      <Button onClick={handleAddDomain} loading={loading}>
        Add
      </Button>
    </Flex>
  );
};
