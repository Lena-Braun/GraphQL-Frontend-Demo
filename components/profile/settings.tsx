import { Box, Button, Divider, Flex, FormControl, FormLabel, HStack, Image, Input, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { useAppSelector, useAppDispatch } from "hooks/hooks";
import { useEffect, useState } from "react";
import { setdata } from "store/slices/authSlice";
import Axios from "utils/axios";
import CToast from "utils/toast";

interface SocialAccount {
    id: string;
    image: string;
    isLinked: boolean;
    isEditing: boolean;
}

export const ProfileSettings = () => {
    const dispatch = useAppDispatch();
    const toast = CToast();
    const storedUserData = useAppSelector((state) => state?.auth?.user);

    const [socialAccounts, setSocialAccounts] = useState<SocialAccount[]>([]);

    const [activeId, setActiveId] = useState<string>('');
    const [socialInfo, setSocialInfo] = useState<string>('');
    const handleLinkToggle = (id: string) => {
        setSocialAccounts(prevAccounts =>
            prevAccounts.map(account =>
                account.id === id
                    ? { ...account, isEditing: !account.isEditing }
                    : account
            )
        );
        setActiveId(id);
        setSocialInfo(storedUserData ? storedUserData[id + '_link'] : '');
    };

    const cancelSocialInfoEdit = () => {
        setSocialAccounts(prevAccounts =>
            prevAccounts.map(account =>
                account.id === activeId
                    ? { ...account, isEditing: false }
                    : account
            )
        );
        setActiveId('');
        setSocialInfo('');
    }

    const handleSocialInfoSave = async () => {
        console.log("save")

        try {
            const { data } = await Axios.put('/auth/social_update', { [activeId + '_link']: socialInfo });
            dispatch(setdata(data));
            toast.success("Success!", "You have updated data successfully.")
            setActiveId('');
            setSocialInfo('');
        } catch (error: any) {
            toast.error("Error!", `${error.response.data}`)
        }
    }

    useEffect(() => {
        if (storedUserData) {
            setSocialAccounts([
                { id: 'linkedin', image: '/static/images/Linkedin.png', isLinked: storedUserData.linkedin_link !== "", isEditing: false },
                { id: 'facebook', image: '/static/images/Facebook.png', isLinked: storedUserData.facebook_link !== "", isEditing: false },
                { id: 'instagram', image: '/static/images/Instagram.png', isLinked: storedUserData.instagram_link !== "", isEditing: false },
                { id: 'twitter', image: '/static/images/Twitter.png', isLinked: storedUserData.twitter_link !== "", isEditing: false }
            ]);
        }
    }, [storedUserData]);

    return (
        <Box
            p={5}
            background='rgba(255, 255, 255, 0.05)'
            backdropFilter='blur(75px)'
            borderRadius={'md'}
        >
            <Text fontSize="lg" fontWeight="bold" color="yellow.400" py={3}>
                Profile Settings
            </Text>
            <Text my={5}>
                Connect your social accounts.
            </Text>
            <SimpleGrid columns={[1, 2, 4]} spacing={[1, 5]}>
                {socialAccounts.map((item) => (
                    <HStack
                        key={item.id}
                        background='rgba(255, 255, 255, 0.05)'
                        backdropFilter='blur(75px)'
                        borderRadius={12}
                        alignItems={'center'}
                        justifyContent={'center'}
                    >
                        <Image src={item.image} bg="transparent" alt="" />
                        <Button
                            variant={item.isLinked ? "solid" : 'outline'}
                            colorScheme={item.isLinked ? "blue" : 'white'}
                            borderRadius={50}
                            px={5}
                            onClick={() => handleLinkToggle(item.id)}
                            mr={2}
                        >
                            {item.isLinked ? "Show" : "Add"}
                        </Button>
                    </HStack>
                ))}
            </SimpleGrid>
            {activeId.length > 0 && (
                <Flex align="stretch" mt={5} alignItems={'flex-end'} gap={2} direction={{ base: 'column', md: 'row' }}>
                    <FormControl id="social-input">
                        <FormLabel>{`Enter your ${activeId} user name`}</FormLabel>
                        <Input placeholder="Enter user name" value={socialInfo} onChange={(e) => setSocialInfo(e.target.value)} />
                    </FormControl>
                    <HStack>
                        <Button px={5} colorScheme="purple" size={'md'} borderRadius={50} onClick={handleSocialInfoSave}>
                            Save
                        </Button>
                        <Button px={5} variant="outline" size={'md'} borderRadius={50} onClick={cancelSocialInfoEdit}>
                            Cancel
                        </Button>
                    </HStack>
                </Flex>
            )}
            <Box py={7}>
                <Divider />
            </Box>
            {/* <Flex flexDirection={['column', 'row']} align="start" alignItems={'center'} justifyContent={'space-between'}>
                <VStack alignItems={'flex-start'}>
                    <Text>Refer a friend</Text>
                    <Text fontSize={'md'} color={'#d9d9d9'}>Share a personalized referral link with a friend and get reward points on his joining.</Text>
                </VStack>
                <Button colorScheme="blue" borderRadius={50} size={'md'} minWidth={120}>Copy Link</Button>
            </Flex>
            <Box py={7}>
                <Divider />
            </Box>
            <Flex align="start" flexDirection={['column', 'row']} alignItems={'center'} justifyContent={'space-between'}>
                <VStack alignItems={'flex-start'}>
                    <Text>Communication</Text>
                    <Text fontSize={'md'} color={'#d9d9d9'}>Unsubscribe daily communication mails.</Text>
                </VStack>
                <Button colorScheme="red" borderRadius={50} size={'md'} bgColor={'#D11049'} minWidth={120}>Unsubscribe</Button>
            </Flex> */}
        </Box >
    );
};
