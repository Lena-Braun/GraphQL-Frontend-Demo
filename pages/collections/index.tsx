import React from "react";
import { useRouter } from "next/navigation";

import {
    Box,
    Button,
    HStack,
    Icon,
    Image,
    SimpleGrid,
    StackProps,
    VStack,
} from "@chakra-ui/react";

import { Section, SectionTitle } from "components/section";
import { ButtonLinkProps } from "components/button-link/button-link";
import { BackgroundGradient } from "components/gradients/background-gradient";

import { FiChevronDown } from "react-icons/fi";

import pricing from "data/pricing";

interface NFTCollectionProps extends Omit<StackProps, "title"> {
    type: string;
    name: string;
    image: string
    action: ButtonLinkProps & { label?: string };
}

const NFTCollection: React.FC<NFTCollectionProps> = (props) => {
    const router = useRouter();
    const { type, name, image, action, children, ...rest } = props;

    const handleGotoCollection = () => {
        router.push(`/collection/${name}`)
    }

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
            onClick={handleGotoCollection}
        >
            <Image src={image} alt="NFT" bg="transparent" />
        </VStack>
    );
};

const Collections = () => {
    const [isActive, setIsActive] = React.useState('Best Sellers')
    const [collections, setCollections] = React.useState([...pricing.discovernfts])
    const buttonList: string[] = ['Best Sellers', 'Trending', 'Popular', 'Latest', 'top']

    const handleTypeChange = (type: string) => {
        setIsActive(type)
    }

    return (
        <Section innerWidth={'1640px'} id="pricing" pos="relative" overflow={'hidden'}>
            <BackgroundGradient left={'50px'} top={'100px'} height="100%" zIndex="-1" />
            <Box zIndex="2" pos="relative">
                <SectionTitle title={"Expolre colections"} align={'left'} pt={10} />
                <Box pb={4} px={2} display={'flex'} justifyContent={'space-between'}>
                    <HStack flexWrap={'wrap'}>
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
                        rightIcon={<Icon as={FiChevronDown} />}
                        colorScheme="blue"
                        variant="outline"
                        borderRadius="full"
                        px={6}
                        size="md"
                    >
                        Sort
                    </Button>
                </Box>

                <SimpleGrid columns={[2, 3, 4, 5, 6]} spacing={4} pt={5}>
                    {collections.slice(0, 5)?.map((nft, id) => (
                        <NFTCollection
                            key={id}
                            type={nft.type}
                            name={nft.name}
                            image={nft.image}
                            action={nft.action}
                            sx={{}}
                        />
                    ))}
                </SimpleGrid>
            </Box>
        </Section>
    );
};

export default Collections
