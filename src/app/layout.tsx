import { ColorModeButton } from "@/components/ui/color-mode"
import { Skeleton } from "@chakra-ui/react"
import { ClientOnly } from "@chakra-ui/react"
import { Provider } from "@/components/ui/provider"
import { Box } from "@chakra-ui/react"
import { Inter } from "next/font/google"
import { Toaster } from "@/components/ui/toaster"


const inter = Inter({
  subsets: ["latin"],
  display: "swap",
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html className={inter.className} suppressHydrationWarning>
      <head />
      <body>
        <Provider>
        <Box pos="absolute" top="4" right="4">
        <ClientOnly fallback={<Skeleton w="10" h="10" rounded="md" />}>
          <ColorModeButton />
        </ClientOnly>
      </Box>
         <Box >
         {children}
         </Box>
         <Toaster/>
          </Provider>
      </body>
    </html>
  )
}