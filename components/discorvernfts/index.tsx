import React from "react";
import { useRouter } from "next/navigation";

import {
  Box,
  Button,
  Heading,
  HStack,
  Icon,
  Image,
  Link,
  SimpleGrid,
  StackProps,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Section, SectionProps, SectionTitle } from "components/section";
import { ButtonLinkProps } from "components/button-link/button-link";
import { BackgroundGradient } from "components/gradients/background-gradient";

import { FiFilter } from "react-icons/fi";

export interface DiscorverNFTsPlan {
  type: string;
  image: string;
  action: ButtonLinkProps & { label?: string };
}

export interface DiscorverNFTsProps extends SectionProps {
  discovernfts: Array<DiscorverNFTsPlan>;
}

const SocialMediaIcons = () => {
  return (
    <HStack py={8} justifyContent={'center'}>
      {['Discord', 'Facebook', 'Instagram', 'Twitter'].map((platform) => (
        <Link key={platform} href={`/${platform.toLowerCase()}`} target="_blank" _hover={{ textDecoration: 'none' }}>
          <Image
            src={`/static/images/${platform}.png`}
            bg="transparent"
            alt={`${platform} logo`}
            transitionDuration=".3s"
            _hover={{
              cursor: 'pointer',
              transform: 'scale(1.2)',
              transitionDuration: '.5s',
            }}
          />
        </Link>
      ))}
    </HStack>
  );
};

export const DiscorverNFTs: React.FC<DiscorverNFTsProps> = (props) => {
  const { title, discovernfts, ...rest } = props;
  const router = useRouter();

  const [isActive, setIsActive] = React.useState('Best Sellers')
  const buttonList: string[] = ['Best Sellers', 'Trending', 'Popular', 'Latest', 'top']

  const handleTypeChange = (type: string) => {
    setIsActive(type)
  }

  const hangleGotoCollections = () => {
    router.push('/collections')
  }

  return (
    <Section innerWidth={'1640px'} id="pricing" pos="relative" overflow={'hidden'} {...rest}>
      <BackgroundGradient right={'50px'} top={'100px'} height="100%" zIndex="-1" />
      <BackgroundGradient left={'50px'} bottom={'300px'} height="100%" zIndex="-1" />
      <Box zIndex="2" pos="relative">
        <SectionTitle title={title} align={'left'}></SectionTitle>
        <Box py={4} px={2} display={'flex'} justifyContent={'space-between'}>
          <HStack spacing={4} flexWrap={'wrap'}>
            {buttonList.map((text, index) => (
              <Button
                key={index}
                colorScheme={isActive === text ? 'blue' : ''}
                variant={isActive === text ? 'solid' : 'outline'}
                size="md"
                borderRadius={50}
                onClick={() => handleTypeChange(text)}
              >
                {text}
              </Button>
            ))}
          </HStack>
          <Button
            rightIcon={<Icon as={FiFilter} />}
            colorScheme="blue"
            variant="outline"
            borderRadius="full"
            px={6}
            size="md"
          >
            Filters
          </Button>
        </Box>

        <SimpleGrid columns={[2, 3, 4, 5, 6]} spacing={4}>
          {discovernfts?.map((nft, id) => (
            <DiscorverNFT
              key={id}
              type={nft.type}
              image={nft.image}
              action={nft.action}
              sx={{}}
            />
          ))}
        </SimpleGrid>
        <Box pt={10} width={'100%'} textAlign={'center'}>
          <Button variant={'outline'} margin={'auto'} size="lg" borderRadius={50} onClick={hangleGotoCollections}>
            View all collections
          </Button>
        </Box>
        <VStack pt={60} pb={10} position={"relative"}>
          <Image display={{ base: 'none', xl: 'block' }} width={{ xl: '380px' }} position={'absolute'} left={'0px'} top={'70px'} src={'/static/images/Art.png'} bg="transparent" alt="" />
          <Image display={{ base: 'none', xl: 'block' }} width={{ xl: '380px' }} position={'absolute'} right={'0px'} top={'70px'} src={'/static/images/Art-1.png'} bg="transparent" alt="" />
          <Heading as='h2' size='xl'>
            Follow us on Social Media
          </Heading>
          <Text maxW={600}> Lorem ipsum dolor sit amet consectetur. Eget erat pharetra sagittis nisl amet ut vel nunc odio. Nibh molestie ornare arcu erat ut.</Text>
          <SocialMediaIcons />
        </VStack>
      </Box>
    </Section>
  );
};

export interface DiscorverNFTProps extends Omit<StackProps, "title"> {
  type: string;
  image: string
  action: ButtonLinkProps & { label?: string };
}

const DiscorverNFT: React.FC<DiscorverNFTProps> = (props) => {
  const { type, image, action, children, ...rest } = props;
  return (
    <VStack
      zIndex="2"
      bg="whiteAlpha.600"
      borderRadius="15px"
      alignItems="stretch"
      border="1px solid"
      borderColor="gray.400"
      _dark={{
        bg: "blackAlpha.300",
        borderColor: "gray.800",
      }}
      transitionDuration=".3s"
      _hover={{
        bg: '#feffdd',
        cursor: 'pointer',
        transform: 'translate(0, -4px) rotate(0) skewX(0) skewY(0) scaleX(1) scaleY(1)',
        transitionDuration: '.5s',
      }}
      {...rest}
    >
      <Image src={image} bg="transparent" alt="" />
    </VStack>
  );
};
