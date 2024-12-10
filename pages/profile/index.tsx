import React from 'react'
import { NextPage } from 'next'

import { Avatar, Box, Center, Divider, Tab, TabList, TabPanel, TabPanels, Tabs, Text, VStack } from '@chakra-ui/react'

import { Section } from 'components/section'
import { PageTransition } from 'components/motion/page-transition'
import { BackgroundGradient } from 'components/gradients/background-gradient'
import { ProfileSettings, ProfileEdit, ProfileReward, ProfileBalance } from 'components/profile'
import { useAppSelector } from 'hooks/hooks'

const Profile: NextPage = () => {
    const storedUserData = useAppSelector((state) => state?.auth?.user);

    const getAvatarName = () => {
        if (!storedUserData?.firstname && !storedUserData?.lastname) {
            return "Username";
        }
        return `${storedUserData?.firstname} ${storedUserData?.lastname}`;
    }

    return (
        <Section innerWidth="container.lg" >
            <BackgroundGradient left={[10, 200]} top={300} zIndex="-1" />

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
                    <Box width="90%" margin={'auto'} p={[1, 10]}>
                        <VStack spacing={4} mb={6} py={2}>
                            <Avatar
                                size="xl"
                                bg='yellow.300'
                                name={getAvatarName()}
                            />
                            <Box textAlign="center">
                                <Text fontSize="2xl" fontWeight="bold">
                                    {`${storedUserData?.firstname} ${storedUserData?.lastname}`}
                                </Text>
                                <Text fontSize="lg" color="gray.400">
                                    {`@${storedUserData?.username || "---"}`}
                                </Text>
                            </Box>
                        </VStack>
                        <Divider borderWidth={1} />
                        {/* Tabs Section */}
                        <Tabs variant="soft-rounded" colorScheme="purple" py={5}>
                            <TabList justifyContent="flex-start" border={'solid 1px'} width={'fit-content'} borderRadius={50} p={1}>
                                <Tab _selected={{ bgColor: '#660FF2' }} fontSize={['sm', 'md']} px={[1.5, 3, 4]} color='white'>Profile</Tab>
                                <Tab _selected={{ bgColor: '#660FF2' }} fontSize={['sm', 'md']} px={[1.5, 3, 4]} color='white'>Balance</Tab>
                                <Tab _selected={{ bgColor: '#660FF2' }} fontSize={['sm', 'md']} px={[1.5, 3, 4]} color='white'>Rewards</Tab>
                                <Tab _selected={{ bgColor: '#660FF2' }} fontSize={['sm', 'md']} px={[1.5, 3, 4]} color='white'>Settings</Tab>
                            </TabList>

                            <TabPanels>
                                <TabPanel px={0.5}>
                                    <ProfileEdit />
                                </TabPanel>
                                <TabPanel px={0.5}>
                                    <ProfileBalance />
                                </TabPanel>
                                <TabPanel px={0.5}>
                                    <ProfileReward />
                                </TabPanel>
                                <TabPanel px={0.5}>
                                    <ProfileSettings />
                                </TabPanel>
                            </TabPanels>
                        </Tabs>

                    </Box>
                </PageTransition>
            </Center>
        </Section >
    )
}

export default Profile
