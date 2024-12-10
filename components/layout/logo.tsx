import * as React from 'react'
import { Box, Flex, Heading, VisuallyHidden } from '@chakra-ui/react'
import Link from 'next/link';


export interface LogoProps {
  href?: string
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void
}

import siteConfig from 'data/config'

export const Logo = ({ href = '/', onClick }: LogoProps) => {
  let logo
  if (siteConfig.logo) {
    logo = <Box as={siteConfig.logo} height="32px" mt="-4px" />
  } else {
    logo = (
      <Heading as="h1" size="md">
        {siteConfig.seo?.title}
      </Heading>
    )
  }

  return (
    <Flex flexShrink="0" alignItems="flex-start">
      <Link
        href={href}
        onClick={onClick}
      >
        {logo}
        <VisuallyHidden>{siteConfig.seo?.title}</VisuallyHidden>
      </Link>
    </Flex>
  )
}
