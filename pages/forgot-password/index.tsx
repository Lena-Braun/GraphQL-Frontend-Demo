import React, { useState } from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/navigation'

import { Box, Button, Center, Heading, Input, Text, VStack } from '@chakra-ui/react'

import { Section } from 'components/section'
import { PageTransition } from 'components/motion/page-transition'
import { BackgroundGradient } from 'components/gradients/background-gradient'

const ForgotPassword: NextPage = () => {
    const router = useRouter();

    const [email, setEmail] = useState('')

    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }
    const handleSendResetLink = () => {
        if (email === "") {
            router.push('/forgot-password/email-notfound')
        } else{
            router.push('/forgot-password/email-sent')
        }
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
                    <Heading variant={'h1'} size={'xl'} textAlign={'center'} py={7}>Forgot password, rest here</Heading>
                    <Box display={'flex'} justifyContent={'center'} mb={20}>
                        <VStack maxW={350} py={10} spacing={5}>
                            <Text fontSize="md" color="muted" textAlign={'center'} >
                                Enter registered email, you  will receive a reset link:
                            </Text>
                            <Input
                                placeholder='Enter email address'
                                borderRadius={'50px'}
                                bgColor={'transparent'}
                                size={'lg'}
                                sx={{
                                    borderColor: '#660FF2 !important'
                                }}
                                onChange={(e) => handleEmailChange(e)}
                            />
                            <Button
                                variant='primary'
                                width={'full'}
                                sx={{
                                    height: '50px',
                                    borderRadius: '50px',
                                    textAlign: 'center',
                                    fontSize: 15
                                }}
                                onClick={handleSendResetLink}
                            >
                                Send Reset Link
                            </Button>
                        </VStack>
                    </Box>
                </PageTransition>
            </Center>
        </Section>
    )
}

export default ForgotPassword
