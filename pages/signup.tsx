import React from 'react'
import { NextPage } from 'next'

import { Box, Button, Center, Divider, Heading, HStack, IconButton, Image, Input, InputGroup, InputRightElement, SimpleGrid, Text, VStack } from '@chakra-ui/react'

import { Section } from 'components/section'
import { PageTransition } from 'components/motion/page-transition'
import { BackgroundGradient } from 'components/gradients/background-gradient'

import { FiEye } from "react-icons/fi";
import { FiEyeOff } from "react-icons/fi";
import { useRouter } from 'next/navigation'

const providers = [
  {
    name: 'Google',
    icon: '/static/images/login/Google.png',
  },
  {
    name: 'Facebook',
    icon: '/static/images/login/Facebook.png',
  },
  {
    name: 'Instagram',
    icon: '/static/images/login/Instagram.png',
  },
]

const Signup: NextPage = () => {
  const router = useRouter()
  const [show, setShow] = React.useState(false)
  const handleClick = () => setShow(!show)

  const handleSignup = () => {
    router.push('/verify-account')
  }

  return (
    <Section innerWidth="container.md" >
      <BackgroundGradient left={200} top={300} zIndex="-1" />

      <Center height="100%" pt="20">
        <PageTransition
          width="100%"
          sx={{
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(75px)',
            borderRadius: '12px',
            position: "relative",
            '&::before': {
              content: '""',
              position: 'absolute',
              inset: '0px',
              padding: '1px', // Border length
              background: 'linear-gradient(150deg, #FF4E50, #40C0CB)', // Gradient background
              borderRadius: 'inherit', // Inherit border radius
              mask: 'conic-gradient(#000 0 0) content-box exclude, conic-gradient(#000 0 0)', // Masking
              zIndex: -1, // Place behind the content
            },
          }}>
          <Heading variant={'h1'} size={'xl'} textAlign={'center'} py={7}>Create account and get start</Heading>
          <SimpleGrid columns={[1, 2]}>
            <Box position={'relative'}>
              <Divider orientation='vertical' sx={{ height: 200, borderColor: 'grey', position: 'absolute', right: 15, top: '90px' }} />
              <Text fontSize="md" color="muted" textAlign={'center'} py={4}>
                Signup with your personal account
              </Text>
              <VStack py={4} spacing={3}>
                {providers.map((item, index) => (
                  <Button
                    key={index}
                    leftIcon={<Image src={item.icon} alt='' />}
                    variant='solid'
                    colorScheme='whiteAlpha'
                    sx={{ minWidth: '300px', height: '50px', bgColor: 'white', borderRadius: '50px', color: 'black' }}
                  >
                    {`Login using ${item.name}`}
                  </Button>
                ))}
              </VStack>
            </Box>
            <Box width={'95%'}>
              <Text fontSize="md" color="muted" textAlign={'center'} py={4}>
                Create Account with username and password
              </Text>
              <VStack py={4} spacing={6}>
                <HStack>
                  <Input
                    placeholder='First Name'
                    borderRadius={'50px'}
                    bgColor={'transparent'}
                    size={'lg'}
                    sx={{
                      borderColor: '#660FF2 !important'
                    }}
                  />
                  <Input
                    placeholder='Last Name'
                    borderRadius={'50px'}
                    bgColor={'transparent'}
                    size={'lg'}
                    sx={{
                      borderColor: '#660FF2 !important'
                    }}
                  />
                </HStack>
                <Input
                  placeholder='Enter email address'
                  borderRadius={'50px'}
                  bgColor={'transparent'}
                  size={'lg'}
                  sx={{
                    borderColor: '#660FF2 !important'
                  }}
                />
                <InputGroup size='lg'>
                  <Input
                    pr='4.5rem'
                    type={show ? 'text' : 'password'}
                    placeholder='Enter password'
                    borderRadius={'50px'}
                    sx={{
                      borderColor: '#660FF2 !important'
                    }}
                  />
                  <InputRightElement width='4.5rem'>
                    <IconButton
                      aria-label='show-password'
                      borderRadius={'50px'}
                      h='1.75rem'
                      size='md'
                      onClick={handleClick}
                      icon={show ? <FiEye /> : <FiEyeOff />}
                    />
                  </InputRightElement>
                </InputGroup>
              </VStack>
              <Box display={'flex'} justifyContent={'center'} py={5}>
                <Button
                  variant='primary'
                  width={'full'}
                  sx={{
                    height: '50px',
                    borderRadius: '50px',
                    textAlign: 'center'
                  }}
                  onClick={handleSignup}
                >
                  Signup
                </Button>
              </Box>
            </Box>
          </SimpleGrid>
        </PageTransition>
      </Center>
    </Section>
  )
}

export default Signup
