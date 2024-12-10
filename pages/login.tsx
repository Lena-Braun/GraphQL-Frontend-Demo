import React from 'react'
import { NextPage } from 'next'
import Link from "next/link";

import { Box, Button, Center, Checkbox, Divider, Heading, HStack, IconButton, Image, Input, InputGroup, InputRightElement, SimpleGrid, Text, VStack } from '@chakra-ui/react'

import { Section } from 'components/section'
import { PageTransition } from 'components/motion/page-transition'
import { BackgroundGradient } from 'components/gradients/background-gradient'

import { FiEye } from "react-icons/fi";
import { FiEyeOff } from "react-icons/fi";
import { useRouter } from 'next/navigation';
import { useAppDispatch } from 'hooks/hooks';
import { login } from 'store/slices/authSlice';
import useRedirect from 'hooks/useRedirect';

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

const Login: NextPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [show, setShow] = React.useState(false)

  useRedirect('/');

  const handleClick = () => setShow(!show)

  const handleLogin = () => {
    // dispatch(login({ username: "rst", email: '123123@gmail.com' }));
    router.push("/")
  }

  return (
    <Section innerWidth="container.md" >
      <BackgroundGradient left={[0, 100]} top={300} zIndex="-1" />

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
          }}
        >
          <Heading variant={'h1'} size={'xl'} textAlign={'center'} py={7}>Login and explore</Heading>
          <SimpleGrid columns={[1, 2]}>
            <Box position={'relative'}>
              <Divider orientation='vertical' display={{ base: 'none', sm: 'block' }} sx={{ height: 200, borderColor: 'grey', position: 'absolute', right: 15, top: '90px' }} />
              <Text fontSize="md" color="muted" textAlign={'center'} py={4}>
                Login with your personal account
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
            <Box width={'90%'} margin={'auto'}>
              <Text fontSize="md" color="muted" textAlign={'center'} py={4}>
                Login using email and password
              </Text>
              <VStack py={4} spacing={7}>
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
              <HStack justifyContent={'space-between'} mx={2} py={4}>
                <Checkbox colorScheme='blue' >Stay logged in</Checkbox>
                <Link href="/forgot-password" ><Text sx={{ textDecoration: 'underline', fontSize: 14 }}>Forgot password</Text></Link>
              </HStack>
              <Box display={'flex'} justifyContent={'center'} py={5}>
                <Button
                  variant='primary'
                  width={'full'}
                  sx={{
                    height: '50px',
                    borderRadius: '50px',
                    textAlign: 'center'
                  }}
                  onClick={handleLogin}
                >
                  Login
                </Button>
              </Box>
            </Box>
          </SimpleGrid>
        </PageTransition>
      </Center>
    </Section>
  )
}

export default Login
