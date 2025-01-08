import { Text, Box, HStack } from '@chakra-ui/react';
import { ProgressBar, ProgressRoot } from '@/components/ui/progress';
import { Tooltip } from './ui/tooltip';
import { Button } from './ui/button';
import { AiOutlineUndo, AiOutlineRedo } from 'react-icons/ai'; // Import icons

interface ProgressIndicatorProps {
  current: number;
  required: number;
  onUndo: () => void;
  onRedo: () => void;
}

export const ProgressIndicator = ({
  current,
  required,
  onRedo,
  onUndo,
}: ProgressIndicatorProps) => (
  <Box py={2}>
    {/* Horizontal Stack for Text and Buttons */}
    <HStack justifyContent="space-between" alignItems="center" mb={2}>
      {/* Progress Text (Left Side) */}
      <Text
        fontSize={{ base: 'xs', md: 'sm' }} // Smaller text on mobile
        whiteSpace="nowrap"
        textAlign="left"
      >
        {current} out of {required} domains added
      </Text>

      {/* Buttons (Right Side) */}
      <HStack spaceX={1}>
        {/* Undo Button with Tooltip */}
        <Tooltip content="Undo the last action" showArrow>
          <Button
            onClick={onUndo}
            colorPalette="green"
            size="sm"
            variant="surface"
            px={2}
            aria-label="Undo"
          >
            <AiOutlineUndo />
          </Button>
        </Tooltip>

        {/* Redo Button with Tooltip */}
        <Tooltip content="Redo the last undone action" showArrow>
          <Button
            onClick={onRedo}
            colorPalette="green"
            size="sm"
            variant="surface"
            px={2}
            aria-label="Redo"
          >
            <AiOutlineRedo />
          </Button>
        </Tooltip>
      </HStack>
    </HStack>

    {/* Progress Bar */}
    <ProgressRoot size="sm" value={(current / required) * 100}>
      <ProgressBar />
    </ProgressRoot>
  </Box>
);
