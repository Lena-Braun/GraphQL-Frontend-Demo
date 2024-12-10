import {
  Box,
  BoxProps,
  SimpleGrid,
  Container,
  Text,
  Stack,
  Flex,
  HStack,
  Divider,
  VStack,
  Heading,
  Button,
  InputGroup,
  Input,
  InputRightElement,
} from '@chakra-ui/react'

import { Link, LinkProps } from '@saas-ui/react'
import { BackgroundGradient } from 'components/gradients/background-gradient'

import siteConfig from 'data/config'

export interface FooterProps extends BoxProps {
  columns?: number
}

export const Footer: React.FC<FooterProps> = (props) => {
  const { columns = 3, ...rest } = props

  return (
    <Box bg="white" _dark={{ bg: '#18172300' }} position={'relative'} overflow={'hidden'} {...rest} >
      <Divider border={'1px solid rgba(255, 255, 255, 0.15)'} width={'100%'} />
      <Container maxW="1640px" py="8">
        <SimpleGrid columns={[1, 2, 3]} spacing={4}>
          <Stack spacing="8">
            <Stack alignItems="flex-start">
              <Flex>
                <Box as={siteConfig.logo} flex="1" height="40px" />
              </Flex>
              <Text fontSize="md" color="muted" maxWidth={'350px'}>
                The world’s first and largest digital marketplace for crypto collectibles and non-fungible tokens (NFTs). Buy, sell, and discover exclusive digital items.
              </Text>
            </Stack>
          </Stack>
          <HStack spacing="4" alignItems={'flex-start'} justifyContent={['flex-start', 'center']}>
            <SimpleGrid columns={2} spacing={10}>
              <VStack alignItems={'flex-start'}>
                <Heading as={'h2'} size={"lg"}>Market Place</Heading>
                <Button as={Link} href={'/#'} height={'auto'} variant="nav-link" fontWeight="300" p={0} textAlign={'left'}>
                  All NFTs
                </Button>
                <Button as={Link} href={'/#'} height={'auto'} variant="nav-link" fontWeight="300" p={0} textAlign={'left'}>
                  New &nbsp;
                </Button>
                <Button as={Link} href={'/#'} height={'auto'} variant="nav-link" fontWeight="300" p={0} textAlign={'left'}>
                  Art &nbsp; &nbsp;
                </Button>
                <Button as={Link} href={'/#'} height={'auto'} variant="nav-link" fontWeight="300" p={0} textAlign={'left'}>
                  Sports
                </Button>
                <Button as={Link} href={'/#'} height={'auto'} variant="nav-link" fontWeight="300" p={0} textAlign={'left'}>
                  Music
                </Button>
              </VStack>
              <VStack alignItems={'flex-start'}>
                <Heading as={'h2'} size={"lg"}>My Account</Heading>
                <Button as={Link} href={'/#'} height={'auto'} variant="nav-link" fontWeight="300" p={0} textAlign={'left'}>
                  Profile
                </Button>
                <Button as={Link} href={'/#'} height={'auto'} variant="nav-link" fontWeight="300" p={0} textAlign={'left'}>
                  Favorite
                </Button>
                <Button as={Link} href={'/#'} height={'auto'} variant="nav-link" fontWeight="300" p={0} textAlign={'left'}>
                  My collections
                </Button>
                <Button as={Link} href={'/#'} height={'auto'} variant="nav-link" fontWeight="300" p={0} textAlign={'left'}>
                  Settings
                </Button>
              </VStack>
            </SimpleGrid>
          </HStack>
          <VStack spacing="4" alignItems={'flex-start'}>
            <Heading as={'h2'} size={"lg"}>Stay in the loop</Heading>
            <Text fontSize="md" color="muted" maxW={'400px'}>
              Join our mailing list to stay in the loop with our newest feature releases, NFT drops, and tips and tricks for navigating NFTs.
            </Text>
            <InputGroup size={['sm', 'lg']}>
              <Input
                pr='4.5rem'
                type={'text'}
                placeholder='Enter your email address...'
                borderRadius={'50px'}
                bgColor={'white'}
                color={'black'}
                fontSize={['sm', 'md', 'lg']}
                sx={{
                  '::placeholder': {
                    color: 'gray',  // Change this to your desired color
                  },
                }}

              />
              <InputRightElement width='auto'>
                <Button size={['sm', 'md']} variant={'primary'} borderRadius={'50px'}>
                  Subscribe Now
                </Button>
              </InputRightElement>
            </InputGroup>
          </VStack>
        </SimpleGrid>
      </Container>
      <Divider border={'1px solid rgba(255, 255, 255, 0.15)'} width={'99%'} />
      <Container maxW="1640" py="8">
        <HStack justifyContent={'space-between'} flexDirection={['column', 'row']} alignItems={['flex-start', 'center']}>
          <HStack px={[3, 0]}>
            <Copyright>Copyright © 2024 Play11s</Copyright>
          </HStack>
          <HStack>
            <Button as={Link} href={'/#'} height={'auto'} variant="nav-link" fontWeight="300">
              Terms & Conditions
            </Button>
            <Button as={Link} href={'/#'} height={'auto'} variant="nav-link" fontWeight="300">
              Privacy Policy
            </Button>
            <Button as={Link} href={'/#'} height={'auto'} variant="nav-link" fontWeight="300">
              FAQs
            </Button>
          </HStack>
        </HStack>
      </Container>
      <BackgroundGradient right={'50px'} bottom={{ base: '-50px', md: '-350px' }} height="100%" zIndex="-1" />
    </Box>
  )
}

export interface CopyrightProps {
  title?: React.ReactNode
  children: React.ReactNode
}

export const Copyright: React.FC<CopyrightProps> = ({
  title,
  children,
}: CopyrightProps) => {
  let content
  if (title && !children) {
    content = `&copy; ${new Date().getFullYear()} - ${title}`
  }
  return (
    <Text color="muted" fontSize="sm">
      {content || children}
    </Text>
  )
}

export const FooterLink: React.FC<LinkProps> = (props) => {
  const { children, ...rest } = props
  return (
    <Link
      color="muted"
      fontSize="sm"
      textDecoration="none"
      _hover={{
        color: 'white',
        transition: 'color .2s ease-in',
      }}
      {...rest}
    >
      {children}
    </Link>
  )
}
