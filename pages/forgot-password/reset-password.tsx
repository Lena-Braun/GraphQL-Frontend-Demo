import React from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/navigation'

import { Box, Button, Center, Heading, IconButton, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react'

import { Section } from 'components/section'
import { PageTransition } from 'components/motion/page-transition'
import { BackgroundGradient } from 'components/gradients/background-gradient'

import { FiEye, FiEyeOff } from 'react-icons/fi'

const ResetPassword: NextPage = () => {

    const router = useRouter();

    const [show, setShow] = React.useState(false)
    const handleClick = () => setShow(!show)

    const handleResetPassword = () => {
        router.push('/forgot-password/reset-success');
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
                    <Heading variant={'h1'} size={'xl'} textAlign={'center'} py={7}>Reset your password</Heading>
                    <Box display={'flex'} justifyContent={'center'} mb={20}>
                        <VStack maxW={400} py={10} spacing={5}>
                            <InputGroup size='lg'>
                                <Input
                                    pr='4.5rem'
                                    type={show ? 'text' : 'password'}
                                    placeholder='New password'
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
                            <InputGroup size='lg'>
                                <Input
                                    pr='4.5rem'
                                    type={show ? 'text' : 'password'}
                                    placeholder='Confirm password'
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
                            <Button
                                variant='primary'
                                width={'full'}
                                sx={{
                                    height: '50px',
                                    borderRadius: '50px',
                                    textAlign: 'center',
                                    fontSize: 15
                                }}
                                onClick={handleResetPassword}
                            >
                                Change
                            </Button>
                        </VStack>
                    </Box>
                </PageTransition>
            </Center>
        </Section>
    )
}

export default ResetPassword
