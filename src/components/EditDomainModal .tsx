import { Box, VStack, Text, Input, HStack, Button } from '@chakra-ui/react';
import { useColorModeValue } from './ui/color-mode';

export const EditDomainModal = ({
  editingDomain,
  newDomainName,
  setNewDomainName,
  setEditingDomain,
  handleEditDomain,
}: {
  editingDomain: string | null;
  newDomainName: string;
  setNewDomainName: (value: string) => void;
  setEditingDomain: (value: null) => void;
  handleEditDomain: (oldDomain: string, newDomain: string) => void;
}) => {
  const bgColor = useColorModeValue('white', 'black');

  return (
    <Box
      position="fixed"
      top="50%"
      left="50%"
      transform="translate(-50%, -50%)"
      bg={bgColor}
      p={6}
      borderRadius="md"
      boxShadow="lg"
      zIndex={1000}
    >
      <VStack align="stretch" gap={4}>
        <Text fontWeight="bold">Edit Domain</Text>
        <Input
          value={newDomainName}
          onChange={(e) => setNewDomainName(e.target.value)}
          placeholder="Enter new domain"
        />
        <HStack justify="flex-end">
          <Button onClick={() => setEditingDomain(null)} variant="ghost">
            Cancel
          </Button>
          <Button
            onClick={() => handleEditDomain(editingDomain!, newDomainName)}
            colorScheme="blue"
          >
            Save
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
};
