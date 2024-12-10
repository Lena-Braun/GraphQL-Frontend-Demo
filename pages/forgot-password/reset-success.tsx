import React from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/navigation'

import { Box, Button, Center, Heading, Image, Text, VStack } from '@chakra-ui/react'

import { Section } from 'components/section'
import { PageTransition } from 'components/motion/page-transition'
import { BackgroundGradient } from 'components/gradients/background-gradient'

const ResetSuccess: NextPage = () => {

    const router = useRouter();

    const handleGoToLogin = () => {
        router.push('/login');
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
                            <Image src="/static/images/action-success.png" alt ="Action Success"/>
                            <Text fontSize="md" color="muted" textAlign={'center'} >
                                Password changed successfully. please login now.
                            </Text>
                            <Button
                                variant='primary'
                                width={'full'}
                                sx={{
                                    height: '50px',
                                    borderRadius: '50px',
                                    textAlign: 'center',
                                    fontSize: 15
                                }}
                                onClick={handleGoToLogin}
                            >
                                Login Now
                            </Button>
                        </VStack>
                    </Box>
                </PageTransition>
            </Center>
        </Section>
    )
}

export default ResetSuccess
