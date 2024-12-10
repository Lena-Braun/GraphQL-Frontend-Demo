import React from 'react';
import {
    Box,
    Text,
    Button,
    Flex,
    Tag,
    HStack,
    Icon,
    Menu,
    MenuButton,
    Avatar,
    MenuList,
    MenuItem,
} from '@chakra-ui/react';
import { FiInfo, FiUpload, FiDownload } from 'react-icons/fi';
import { ChevronDownIcon } from '@saas-ui/react';
const SwapIcon = () => (
    <svg width="18" height="12" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13.5564 6.61111V4.77778H6.27065V2.33333H13.5564V0.5L17.1992 3.55556L13.5564 6.61111ZM3.84208 11.5V9.66667H11.1278V7.22222H3.84208V5.38889L0.199219 8.44444L3.84208 11.5Z" fill="white" />
    </svg>
)

export const ProfileBalance = () => {
    return (
        <>
            <Flex
                justify="space-between"
                p={0}
                flexWrap={'wrap'}
                gap={2}
            >
                <Box
                    background='rgba(255, 255, 255, 0.05)'
                    backdropFilter='blur(75px)'
                    borderRadius="md"
                    p={4}
                    flex="1"
                    mr={2}
                >
                    <HStack>
                        <Text fontSize="xl" >Spending</Text>
                        <Icon as={FiInfo} sx={{ width: '15px', height: '15px' }} />
                    </HStack>
                    <Tag mt={3} fontSize={'md'}>f639hch8...38ycd83yfk2</Tag>
                    <HStack py={3}>
                        <Text color={'#1B8FE4'} fontSize={'4xl'} fontWeight={800}>12.231</Text>
                        <Text fontSize={'md'}>$FAT Dollars</Text>
                    </HStack>
                    <Text>0.0 USDT | 0.0 SOL | 0.0 NEAR</Text>
                </Box>

                <Box
                    background='rgba(255, 255, 255, 0.05)'
                    backdropFilter='blur(75px)'
                    borderRadius="md"
                    p={4}
                    flex="1"
                    mr={2}
                >
                    <HStack justifyContent={'space-between'}>
                        <HStack>
                            <Text fontSize="xl" >Spending</Text>
                            <Icon as={FiInfo} sx={{ width: '15px', height: '15px' }} />
                        </HStack>
                        <Menu>
                            <MenuButton
                                as={Button}
                                bg="transparent"
                                border="2px solid"
                                borderColor="whiteAlpha.400"
                                borderRadius="full"
                                display="flex"
                                p={1}
                                alignItems="center"
                                _hover={{ bg: "whiteAlpha.100" }}
                                _focus={{ boxShadow: "outline" }}
                                rightIcon={<ChevronDownIcon color="white" />}
                            >
                                <Box as="span" display="flex" alignItems="center">
                                    <Avatar
                                        size="xs"
                                        name="Emma W."
                                        src="/static/images/USDT.png" // Replace with the actual image source
                                        mr={2}
                                    />
                                </Box>
                            </MenuButton>
                            <MenuList bg="gray.700" borderColor="gray.600">
                                <MenuItem _hover={{ bg: "gray.600" }} >
                                    <Avatar
                                        size="xs"
                                        name="Emma W."
                                        src="/static/images/USDT.png" // Replace with the actual image source
                                        mr={2}
                                    />
                                    <Text color="white" mr={2}>
                                        USDT
                                    </Text>
                                </MenuItem>
                                <MenuItem _hover={{ bg: "gray.600" }} >
                                    <Avatar
                                        size="xs"
                                        name="Emma W."
                                        src="/static/images/USDT.png" // Replace with the actual image source
                                        mr={2}
                                    />
                                    <Text color="white" mr={2}>
                                        USDT
                                    </Text>
                                </MenuItem>
                                <MenuItem _hover={{ bg: "gray.600" }} >
                                    <Avatar
                                        size="xs"
                                        name="Emma W."
                                        src="/static/images/USDT.png" // Replace with the actual image source
                                        mr={2}
                                    />
                                    <Text color="white" mr={2}>
                                        USDT
                                    </Text>
                                </MenuItem>
                            </MenuList>
                        </Menu>
                    </HStack>
                    <Tag mt={3} fontSize={'md'}>f639hch8...38ycd83yfk2</Tag>
                    <HStack py={3}>
                        <Text color={'#1B8FE4'} fontSize={'4xl'} fontWeight={800}>20.321</Text>
                        <Text fontSize={'md'}>$FAT Dollars</Text>
                    </HStack>
                    <Text>0.0 USDT | 0.001 NEAR</Text>
                </Box>
            </Flex>
            <Flex justify="flex-end" mt={8} mr={1}>
                <Flex gap={[1, 2]}>
                    <Button leftIcon={<FiUpload />} variant={'primary'} borderRadius={50} fontSize={['10px !important', 'md']} size={['sm', 'lg']}>Transfer</Button>
                    <Button leftIcon={<FiDownload />} variant={'primary'} borderRadius={50} fontSize={['10px !important', 'md']} size={['sm', 'lg']}>Receive</Button>
                    <Button leftIcon={<SwapIcon />} variant={'primary'} borderRadius={50} fontSize={['10px !important', 'md']} size={['sm', 'lg']}>Swap</Button>
                </Flex>
            </Flex>
        </>
    );
};  