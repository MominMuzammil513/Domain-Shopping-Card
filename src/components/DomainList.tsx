'use client';
import {
  Box,
  Text,
  IconButton,
  VStack,
  HStack,
  Badge,
  Stack,
  Flex,
} from '@chakra-ui/react';
import { FaTrash, FaStar } from 'react-icons/fa';
import { SkeletonCircle, SkeletonText } from './ui/skeleton';
import { BiSolidEdit } from 'react-icons/bi';

interface DomainListProps {
  domains: { domain: string; isAvailable: boolean }[];
  newDomains?: string[];
  onDeleteDomain: (domain: string) => void;
  onEditDomain: (domain: string) => void;
  isSuggestedDomain: (domain: string, isAvailable: boolean) => boolean;
}

export const DomainList = ({
  domains,
  newDomains = [],
  onDeleteDomain,
  onEditDomain,
  isSuggestedDomain,
}: DomainListProps) => {
  return (
    <VStack align="stretch" gap={4}>
      {domains.map(({ domain, isAvailable }) => (
        <HStack
          key={domain}
          justifyContent="space-between"
          p={2}
          borderWidth="1px"
          borderRadius="md"
        >
          <Box>
            <Text fontWeight="bold">{domain}</Text>
            <Stack direction="row" mt={1}>
              <Badge colorPalette={isAvailable ? 'green' : 'red'}>
                {isAvailable ? 'Available' : 'Unavailable'}
              </Badge>
              {isSuggestedDomain(domain, isAvailable) && (
                <Badge colorPalette="purple" variant="solid">
                  <Flex align="center" gap={1}>
                    <FaStar /> Suggested
                  </Flex>
                </Badge>
              )}
            </Stack>
          </Box>
          <HStack>
            <IconButton
              aria-label="Edit domain"
              onClick={() => onEditDomain(domain)}
              size="sm"
              variant="surface"
            >
              <BiSolidEdit />
            </IconButton>
            <IconButton
              aria-label="Delete domain"
              onClick={() => onDeleteDomain(domain)}
              size="sm"
              variant="surface"
              color="red.500"
            >
              <FaTrash />
            </IconButton>
          </HStack>
        </HStack>
      ))}
      {newDomains.map((domain) => (
        <HStack
          key={domain}
          justifyContent="space-between"
          p={2}
          borderWidth="1px"
          borderRadius="md"
        >
          <Box flex={1}>
            <SkeletonText noOfLines={2} spaceX={2} />
          </Box>
          <SkeletonCircle size="8" />
        </HStack>
      ))}
    </VStack>
  );
};
