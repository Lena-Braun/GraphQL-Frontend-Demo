import * as React from "react";
import { Avatar, Box, Button, HStack, Menu, MenuButton, MenuItem, MenuList, Skeleton, SkeletonCircle, Text, useToast, VStack } from "@chakra-ui/react";

import { useRouter } from "next/router";

import siteConfig from "data/config";

import { NavLink } from "components/nav-link";

import { MobileNavButton } from "components/mobile-nav";
import { MobileNavContent } from "components/mobile-nav";
import { useDisclosure, useUpdateEffect } from "@chakra-ui/react";
import { ChevronDownIcon } from "@saas-ui/react";
import { useAppDispatch, useAppSelector } from "hooks/hooks";
import { login, logout } from "store/slices/authSlice";

import { inAppWallet } from "thirdweb/wallets";
import { createThirdwebClient } from 'thirdweb';
import { ethereum, sepolia } from "thirdweb/chains";
import { darkTheme, useActiveAccount, useActiveWallet, useDisconnect } from "thirdweb/react";
import { ConnectButton } from 'thirdweb/react';

import Axios from "utils/axios";
import CToast from "utils/toast";

const client = createThirdwebClient({ clientId: siteConfig.thirdwebClientId });

const wallets = [
  inAppWallet({
    auth: {
      options: [
        "google",
        "discord",
        "telegram",
        "email",
        "facebook",
        "passkey",
        "phone",
        "apple",
      ],
    },
    smartAccount: {
      chain: sepolia,
      sponsorGas: true,
    },
  }),
];


const Navigation: React.FC = () => {
  const mobileNav = useDisclosure();
  const router = useRouter();
  const toast = CToast();
  const dispatch = useAppDispatch();

  const wallet = useActiveWallet();
  const smartAccount = useActiveAccount();
  const { disconnect } = useDisconnect();

  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const user = useAppSelector((state) => state.auth.user);

  const [isAuth, setIsAuth] = React.useState(isAuthenticated)
  const [showSkelton, setShowSkelton] = React.useState(isAuthenticated)
  const [userName, setUserName] = React.useState("User")

  const mobileNavBtnRef = React.useRef<HTMLButtonElement>();


  const handleLogout = async () => {
    if (wallet) {
      disconnect(wallet);  // Pass the wallet if it exists
    }
    dispatch(logout());
    setIsAuth(false);
    localStorage.removeItem('x-token');
    router.push('/')
    toast.info('Info!', "Logged Out.")
  }

  const handleGotoProfile = () => {
    router.push('/profile')
  }

  const handleGoSetting = async () => {
    try {
      const { data: { data } } = await Axios.post('/auth/asdsd', { address: smartAccount?.address });
    } catch (error) {
      console.error('Error:', error);
      toast.error("Error", `${error}`)
    }
  }

  const handleOnConnected = async () => {
    // toast.success('Success!', "Smart wallet connected.")
    setShowSkelton(true)
  }

  const handleLogin = async () => {
    const signedMessage = await smartAccount?.signMessage({ message: "sign to elevens" });
    try {
      const { data: { data, usertoken } } = await Axios.post('/auth/login', { address: smartAccount?.address, signature: signedMessage });
      dispatch(login(data));
      setShowSkelton(false);
      setIsAuth(true);
      toast.success('Success!', "Logged in successfully.");
      localStorage.setItem('x-token', usertoken);
    } catch (error) {
      console.error('Error:', error);
      toast.error("Error", `${error}`)
    }
  }

  const getUserName = () => {
    const name = `${user?.firstname} ${user?.lastname}`;
    return name === " " ? "User" : name;
  }

  React.useEffect(() => {
    if (smartAccount && !isAuthenticated) {
      handleLogin();
    }
  }, [smartAccount])

  React.useEffect(() => {
    user && setUserName(getUserName())
  }, [user])

  useUpdateEffect(() => {
    mobileNavBtnRef.current?.focus();
  }, [mobileNav.isOpen]);


  return (
    <HStack spacing="2" flexShrink={0}>
      {siteConfig.header.links.map(({ href, ...props }, i) => {
        if (isAuthenticated && i > 2) {
          return (<></>);
        }
        return (
          <NavLink
            display={["none", null, "block"]}
            ml={href === "/signin" ? '40px' : 'none'}
            href={href}
            key={i}
            isActive={
              !!(
                (href && !!router.asPath.match(new RegExp(href)))
              )
            }
            {...props}
          >
            {props.label}
          </NavLink>
        );
      })}
      {(!showSkelton && !isAuth) &&
        < ConnectButton
          client={client}
          wallets={wallets}
          chains={[sepolia, ethereum]}
          theme={darkTheme({
            colors: { modalBg: "#171622" },
          })}
          connectButton={{ label: 'Sign In / Up', style: { minWidth: '130px', borderRadius: 50, background: '#8952e0', color: 'white' } }}
          connectModal={{
            size: "compact",
            titleIcon:
              '/static/images/Logo.png',
            showThirdwebBranding: false,
            termsOfServiceUrl:
              "https://playground.thirdweb.com/connect/sign-in/button",
            privacyPolicyUrl:
              "https://playground.thirdweb.com/connect/sign-in/button",
          }}
          accountAbstraction={{
            chain: sepolia, // replace with the chain you want
            sponsorGas: true,
          }}
          onConnect={handleOnConnected}
        />
      }
      {showSkelton &&
        <Menu>
          <MenuButton
            as={Button}
            p={'5px'}
            bg="transparent"
            border="2px solid"
            borderColor="whiteAlpha.400"
            borderRadius="full"
            display="flex"
            alignItems="center"
            _hover={{ bg: "whiteAlpha.100" }}
            _focus={{ boxShadow: "outline" }}
            rightIcon={<ChevronDownIcon color="white" />}
            size={['md', 'lg']}
          >
            <HStack display={"flex"}>
              <SkeletonCircle size='9' />
              <VStack alignItems={'flex-start'}>
                <Skeleton height={'18px'} width={'60px'} />
                <Skeleton height={'10px'} width={'50px'} />
              </VStack>
            </HStack>
          </MenuButton>
        </Menu>
      }
      {isAuth &&
        <Menu>
          <MenuButton
            as={Button}
            bg="transparent"
            border="2px solid"
            borderColor="whiteAlpha.400"
            borderRadius="full"
            display="flex"
            alignItems="center"
            _hover={{ bg: "whiteAlpha.100" }}
            _focus={{ boxShadow: "outline" }}
            rightIcon={<ChevronDownIcon color="white" />}
            size={['md', 'lg']}
          >
            <Box as="span" display="flex" alignItems="center">
              <Avatar
                size="sm"
                bg='yellow.300'
                name={getUserName()}
                mr={2}
              />
              <Text color="white" >
                {userName}
              </Text>
            </Box>
          </MenuButton>
          <MenuList bg="gray.700" borderColor="gray.600">
            {/* <MenuItem _hover={{ bg: "gray.600" }} onClick={() => disconnect(wallet)}>disconnect</MenuItem> */}
            <MenuItem _hover={{ bg: "gray.600" }} onClick={handleGotoProfile}>Profile</MenuItem>
            <MenuItem _hover={{ bg: "gray.600" }} onClick={handleGoSetting}>Settings</MenuItem>
            <MenuItem _hover={{ bg: "gray.600" }} onClick={handleLogout}>Logout</MenuItem>
          </MenuList>
        </Menu>
      }

      <MobileNavButton
        ref={mobileNavBtnRef}
        aria-label="Open Menu"
        onClick={mobileNav.onOpen}
      />

      <MobileNavContent isOpen={mobileNav.isOpen} onClose={mobileNav.onClose} />
    </HStack>
  );
};

export default Navigation;
