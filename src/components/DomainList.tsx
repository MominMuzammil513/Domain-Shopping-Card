'use client';

import { Box, Text, IconButton, VStack, HStack } from '@chakra-ui/react';
import { FaTrash } from 'react-icons/fa';

interface DomainListProps {
  domains: { domain: string; isAvailable: boolean }[];
  onDeleteDomain: (domain: string) => void;
}

export const DomainList = ({ domains, onDeleteDomain }: DomainListProps) => (
  <VStack align="stretch">
    {domains.map(({ domain, isAvailable }) => (
      <HStack key={domain} justifyContent="space-between">
        <Box>
          <Text>{domain}</Text>
          <Text fontSize="sm" color={isAvailable ? 'green.500' : 'red.500'}>
            {isAvailable ? 'Available' : 'Unavailable'}
          </Text>
        </Box>
        <IconButton
          aria-label="Delete domain"
          onClick={() => onDeleteDomain(domain)}
          colorScheme="red"
          size="sm"
        ><FaTrash /></IconButton>
      </HStack>
    ))}
  </VStack>
);