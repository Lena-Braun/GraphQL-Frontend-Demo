import { Box, Button, Flex, FormControl, FormErrorMessage, FormLabel, HStack, IconButton, Input, InputGroup, InputProps, InputRightElement, SimpleGrid, Text, VStack } from "@chakra-ui/react"
import { useAppDispatch, useAppSelector } from "hooks/hooks"
import { useCallback, useEffect, useState } from "react"
import { FiEye, FiEyeOff } from "react-icons/fi"
import Axios from "utils/axios"
import { setdata } from "store/slices/authSlice";
import CToast from "utils/toast"
import { getUserEmail } from "thirdweb/wallets/in-app";
import { createThirdwebClient } from "thirdweb"
import siteConfig from "data/config"

const StyledInput: React.FC<InputProps> = (props) => {
    return (
        <Input
            borderRadius={'50px'}
            bgColor={'transparent'}
            size={'lg'}
            sx={{
                borderColor: '#660FF2 !important'
            }}
            {...props}
        />
    )
}

export const ProfileEdit = () => {
    const dispatch = useAppDispatch();
    const toast = CToast();
    const client = createThirdwebClient({ clientId: siteConfig.thirdwebClientId });

    const storedUserData = useAppSelector((state) => state?.auth?.user);
    const isLogged = useAppSelector((state) => state.auth.isAuthenticated);

    const [viewBox, setViewBox] = useState('normal');
    const [show, setShow] = useState(false)
    const [userData, setUserData] = useState({
        firstname: storedUserData?.firstname,
        lastname: storedUserData?.lastname,
        username: storedUserData?.username,
        email: storedUserData?.email,
        phone: storedUserData?.phone
    })

    const [errors, setErrors] = useState({
        firstname: '',
        lastname: '',
        username: '',
        email: '',
        phone: ''
    });

    const validateField = (key: string, value: string) => {
        let error = '';
        switch (key) {
            case 'email':
                if (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                    error = 'Invalid email address';
                }
                break;
            case 'phone':
                if (value && !/^\+?\d{10,15}$/.test(value)) {
                    error = 'Invalid phone number';
                }
                break;
            case 'firstname':
            case 'lastname':
            case 'username':
                if (value && value.length > 20) {
                    error = 'Maximum length is 20 characters';
                }
                break;

            default:
                break;
        }
        setErrors(prevErrors => ({ ...prevErrors, [key]: error }));
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
        setUserData({ ...userData, [key]: e.target.value })
        validateField(key, e.target.value);
    }

    const fetchUserEmail = useCallback(async () => {
        const email = await getUserEmail({ client });
        setUserData({ ...userData, email });
    }, [client]);

    const handleEditDetail = useCallback(async () => {
        setViewBox('editdetail');
        await fetchUserEmail();
    }, [fetchUserEmail]);

    const handleUpdateProfile = useCallback(async () => {
        try {
            const { data } = await Axios.put('/auth/profile', userData);
            dispatch(setdata(data));
            setViewBox('normal');
            toast.success("Success!", "You have updated data successfully.");
        } catch (error: any) {
            toast.error("Error!", `${error.response.data}`);
        }
    }, [userData, dispatch]);

    const handleClick = useCallback(() => setShow(!show), [show]);

    const getProfileData = useCallback(async () => {
        try {
            const { data } = await Axios.get('/auth/profile');
            dispatch(setdata(data));
        } catch (error) {
            console.error('Error:', error);
        }
    }, [dispatch]);

    useEffect(() => {
        isLogged && getProfileData();
    }, [isLogged, getProfileData]);


    const hasErrors = Object.values(errors).some(error => error !== '');

    return (
        <>
            {viewBox === "normal" && <>
                <Text fontSize="lg" fontWeight="bold" color="yellow.400" my={5}>
                    Basic Info
                </Text>
                <SimpleGrid columns={[1, 2, 3]} spacing={5}>
                    <Box>
                        <Text color={'#d9d9d9'}>Name</Text>
                        <Text fontWeight="bold">{`${storedUserData?.firstname} ${storedUserData?.lastname}`}</Text>
                    </Box>
                    <Box>
                        <Text color={'#d9d9d9'}>Username</Text>
                        <Text fontWeight="bold">{storedUserData?.username}</Text>
                    </Box>
                    <Box>
                        <Text color={'#d9d9d9'}>Email</Text>
                        <Text fontWeight="bold">{storedUserData?.email}</Text>
                    </Box>
                    <Box>
                        <Text color={'#d9d9d9'}>Phone Number</Text>
                        <Text fontWeight="bold">{storedUserData?.phone}</Text>
                    </Box>
                </SimpleGrid >
                <Flex justify="flex-end" mt={8}>
                    <HStack spacing={4}>
                        {/* <Button colorScheme="blue" fontSize={['sm', 'lg']} borderRadius={50} size={['sm', 'lg']} onClick={() => setViewBox('changepass')}>Change Password</Button> */}
                        <Button colorScheme="purple" fontSize={['sm', 'lg']} borderRadius={50} size={['sm', 'lg']} onClick={handleEditDetail}>Edit Details</Button>
                    </HStack>
                </Flex>
            </>
            }
            {viewBox === "editdetail" &&
                <>
                    <VStack spacing={4} align="stretch">
                        <Text fontSize="lg" fontWeight="bold" color="yellow.400" my={5}>
                            Basic Infomation
                        </Text>
                        <SimpleGrid columns={[1, 2, 3]} spacing={5}>
                            <FormControl id="first-name" isInvalid={!!errors.firstname}>
                                <FormLabel>First Name</FormLabel>
                                <StyledInput placeholder='First Name' value={userData.firstname} onChange={(e) => handleInputChange(e, 'firstname')} />
                                <FormErrorMessage>{errors.firstname}</FormErrorMessage>
                            </FormControl>
                            <FormControl id="last-name" isInvalid={!!errors.lastname}>
                                <FormLabel>Last Name</FormLabel>
                                <StyledInput placeholder="Last Name" value={userData.lastname} onChange={(e) => handleInputChange(e, 'lastname')} />
                                <FormErrorMessage>{errors.lastname}</FormErrorMessage>
                            </FormControl>
                            <FormControl id="username" isInvalid={!!errors.username}>
                                <FormLabel>Username</FormLabel>
                                <StyledInput placeholder="@username" value={userData.username} onChange={(e) => handleInputChange(e, 'username')} />
                                <FormErrorMessage>{errors.username}</FormErrorMessage>
                            </FormControl>
                            <FormControl id="email" isInvalid={!!errors.email}>
                                <FormLabel>Email</FormLabel>
                                <StyledInput type="email" placeholder="Email" value={userData.email} onChange={(e) => handleInputChange(e, 'email')} />
                                <FormErrorMessage>{errors.email}</FormErrorMessage>
                            </FormControl>
                            <FormControl id="phone" isInvalid={!!errors.phone}>
                                <FormLabel>Phone Number</FormLabel>
                                <StyledInput type="tel" placeholder="+91XXXXXXXXXX" value={userData.phone} onChange={(e) => handleInputChange(e, 'phone')} />
                                <FormErrorMessage>{errors.phone}</FormErrorMessage>
                            </FormControl>
                        </SimpleGrid>
                        {/* Buttons */}
                        <HStack justify="end">
                            <Button variant="outline" size={'md'} borderRadius={50} onClick={() => setViewBox('normal')}>
                                Cancel
                            </Button>
                            <Button colorScheme="purple" size={'md'} borderRadius={50} onClick={handleUpdateProfile} isDisabled={hasErrors}>
                                Save
                            </Button>
                        </HStack>
                    </VStack>
                </>
            }
            {viewBox === "changepass" &&
                <>
                    <VStack spacing={4} align="stretch">
                        <Text fontSize="lg" fontWeight="bold" color="yellow.400" my={3}>
                            Change Password
                        </Text>
                        <SimpleGrid columns={[1, 2, 3]} spacing={5}>
                            <FormControl id="first-name">
                                <FormLabel>Old Password</FormLabel>
                                <InputGroup size='lg'>
                                    <StyledInput
                                        type={show ? 'text' : 'password'}
                                        placeholder='Enter Old Password'
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
                            </FormControl>
                            <FormControl id="last-name">
                                <FormLabel>New Password</FormLabel>
                                <InputGroup size='lg'>
                                    <StyledInput
                                        type={show ? 'text' : 'password'}
                                        placeholder='Enter New Password'
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
                            </FormControl>
                            <FormControl id="username">
                                <FormLabel>Re-enter New Password</FormLabel>
                                <InputGroup size='lg'>
                                    <StyledInput
                                        type={show ? 'text' : 'password'}
                                        placeholder='Re-enter New Password'
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
                            </FormControl>
                        </SimpleGrid>
                        {/* Buttons */}
                        <HStack justify="end" mt={4}>
                            <Button variant="outline" size={'md'} borderRadius={50} onClick={() => setViewBox('normal')}>
                                Cancel
                            </Button>
                            <Button colorScheme="purple" size={'md'} borderRadius={50} onClick={() => setViewBox('normal')}>
                                Save
                            </Button>
                        </HStack>
                    </VStack>
                </>
            }
        </>
    )
}