'use client';

import { Input, Button, Flex } from '@chakra-ui/react';
import { useState } from 'react';
import { toaster } from './ui/toaster';

interface DomainInputProps {
  onAddDomain: (domain: string) => void;
}

export const DomainInput = ({ onAddDomain }: DomainInputProps) => {
  const [domain, setDomain] = useState('');

  const handleAddDomain = () => {
    const trimmedDomain = domain.trim().toLowerCase();
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
      />
      <Button onClick={handleAddDomain} colorScheme="teal">
        Add
      </Button>
    </Flex>
  );
};