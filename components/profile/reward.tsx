import { Box, Button, Divider, HStack, Image, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";

export const ProfileReward = () => {
    return (
        <Box>
            <VStack
                p={4}
                background='rgba(255, 255, 255, 0.05)'
                backdropFilter='blur(75px)'
                borderRadius={'md'}
                spacing={4} alignItems={'flex-start'}
                justifyContent={'space-between'}
            >
                <Text>Total Earned Loyalty Points</Text>
                <HStack justifyContent={'space-between'} width={'full'}>
                    <HStack>
                        <Text color={'#1B8FE4'} fontSize={['3xl', '4xl']} fontWeight={800}>355215</Text>
                        <Text fontSize={['sm', 'md']}>Points</Text>
                    </HStack>
                    <Button colorScheme="blue" borderRadius={50} size={['sm', 'md']} minWidth={120}>Reddem</Button>
                </HStack>
            </VStack>
            <VStack
                p={4}
                mt={4}
                background='rgba(255, 255, 255, 0.05)'
                backdropFilter='blur(75px)'
                borderRadius={'md'}
                spacing={4} alignItems={'flex-start'}
                justifyContent={'space-between'}
            >
                <Text>Earned Badges</Text>
                <SimpleGrid columns={[2, 4, 6]} py={5}>
                    <VStack alignItems={'center'}>
                        <Image src="/static/images/Badge.png" alt="" />
                        <Text fontSize={'md'} textAlign={'center'}>1st Milestone Reward</Text>
                    </VStack>
                    <VStack alignItems={'center'}>
                        <Image src="/static/images/Badge.png" alt="" />
                        <Text fontSize={'md'} textAlign={'center'}>2nd Milestone Reward</Text>
                    </VStack>
                    <VStack alignItems={'center'}>
                        <Image src="/static/images/Badge.png" alt="" />
                        <Text fontSize={'md'} textAlign={'center'}>3rd Milestone Reward</Text>
                    </VStack>
                    <VStack alignItems={'center'}>
                        <Image src="/static/images/Badge.png" alt="" />
                        <Text fontSize={'md'} textAlign={'center'}>4th Milestone Reward</Text>
                    </VStack>
                    <VStack alignItems={'center'}>
                        <Image src="/static/images/Badge.png" alt="" />
                        <Text fontSize={'md'} textAlign={'center'}>5th Milestone Reward</Text>
                    </VStack>
                    <VStack alignItems={'center'}>
                        <Image src="/static/images/Badge.png" alt="" />
                        <Text fontSize={'md'} textAlign={'center'}>6th Milestone Reward</Text>
                    </VStack>
                </SimpleGrid>
            </VStack>
        </Box >
    );
};
