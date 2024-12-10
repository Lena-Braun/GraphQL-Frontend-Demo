import * as React from 'react'

import {
  Box,
  BoxProps,
  Container,
  Flex,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react'
import Navigation from './navigation'
import { Logo } from './logo'
import { useScroll } from 'framer-motion'
import DailyNFTClaim from 'components/dailynftclaim'
import { useAppSelector } from 'hooks/hooks'

export interface HeaderProps extends Omit<BoxProps, 'children'> { }

export const Header = (props: HeaderProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  const ref = React.useRef<HTMLHeadingElement>(null)
  const [y, setY] = React.useState(0)
  const { height = 0 } = ref.current?.getBoundingClientRect() ?? {}

  const { scrollY } = useScroll()

  React.useEffect(() => {
    return scrollY.onChange(() => setY(scrollY.get()))
  }, [scrollY])

  React.useEffect(() => {
    if (isAuthenticated) {
      onOpen();
    }
  }, [isAuthenticated])

  const bg = useColorModeValue('whiteAlpha.700', 'rgba(29, 32, 37, 0.7)')

  return (
    <Box
      ref={ref}
      as="header"
      top="0"
      w="full"
      h='100px'
      position="fixed"
      backdropFilter="blur(5px)"
      zIndex="sticky"
      borderColor="whiteAlpha.100"
      transitionProperty="common"
      transitionDuration="normal"
      boxShadow={y > height ? 'md' : ''}
      borderBottomWidth={y > height ? '1px' : ''}
      {...props}
    >
      <Container maxW="1640" px="8" py="4" h={'full'}>
        <Flex width="full" height='full' align="center" justify="space-between">
          <Logo
            onClick={(e) => {
              if (window.location.pathname === '/') {
                e.preventDefault()

                window.scrollTo({
                  top: 0,
                  behavior: 'smooth',
                })
              }
            }}
          />
          <Navigation />
          <DailyNFTClaim isOpen={isOpen} onClose={onClose} />
        </Flex>
      </Container>
    </Box>
  )
}
