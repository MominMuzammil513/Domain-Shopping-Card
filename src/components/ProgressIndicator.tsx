'use client';

import { Text, Box } from '@chakra-ui/react';
import { ProgressBar, ProgressRoot } from "@/components/ui/progress"

interface ProgressIndicatorProps {
  current: number;
  required: number;
}

export const ProgressIndicator = ({ current, required }: ProgressIndicatorProps) => (
  <Box>
    <Text>
      {current} out of {required} domains added
    </Text>
    <ProgressRoot size="sm" value={(current / required) * 100}>
      <ProgressBar />
    </ProgressRoot>
  </Box>
);