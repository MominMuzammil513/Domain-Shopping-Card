import { ColorModeButton } from '@/components/ui/color-mode';
import { Skeleton } from '@chakra-ui/react';
import { ClientOnly } from '@chakra-ui/react';
import { Provider } from '@/components/ui/provider';
import { Box } from '@chakra-ui/react';
import { Inter } from 'next/font/google';
import { Toaster } from '@/components/ui/toaster';
import { Heading } from '@chakra-ui/react';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className={inter.className} suppressHydrationWarning>
      <head />
      <body>
        <Provider>
          <Box
            maxW="800px"
            mx="auto"
            minH={'svh'}
            p={{ base: 4, md: 8 }}
            boxShadow="md"
            spaceY={4}
          >
            <Box
              maxW="800px"
              mx="auto"
              p={4}
              display="flex"
              justifyContent="center"
              alignItems="center"
              pos="relative"
              borderRadius="lg"
              boxShadow="md"
            >
              <Heading size="lg">Domain Shopping</Heading>
              <Box
                borderRight="1px"
                pos="absolute"
                right={12}
                borderColor="gray.300"
                height="6"
              />
              <ClientOnly fallback={<Skeleton w="10" h="10" rounded="md" />}>
                <Box position="absolute" right={4}>
                  <ColorModeButton />
                </Box>
              </ClientOnly>
            </Box>
            {children}
          </Box>
          <Toaster />
        </Provider>
      </body>
    </html>
  );
}
