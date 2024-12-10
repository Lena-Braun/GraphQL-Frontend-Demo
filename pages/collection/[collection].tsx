import React from "react";
import { useRouter } from "next/navigation";

import {
    Box,
    Button,
    Checkbox,
    Divider,
    Drawer,
    DrawerBody,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
    Grid,
    GridItem,
    HStack,
    Icon,
    Image,
    RangeSlider,
    RangeSliderFilledTrack,
    RangeSliderThumb,
    RangeSliderTrack,
    StackProps,
    Text,
    useBreakpointValue,
    useDisclosure,
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
    const router = useRouter()
    const { type, name, image, action, children, ...rest } = props;

    const handleGotoDetail = () => {
        router.push(`/collection/${name}/detail`)
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
            onClick={handleGotoDetail}
        >
            <Image src={image} bg="transparent" alt="NFT" />
        </VStack>
    );
};

const Filters = () => {
    const collectionsCheckList: string[] = ['All products', 'Best sellers', 'New Arrivals', 'Accessories'];
    const optionsCheckList: string[] = ['All products', 'Best sellers', 'New Arrivals', 'Accessories'];

    return (
        <>
            <Text fontSize={'2xl'} mb={1}>
                Price
            </Text>
            <Box width={'96%'} margin={'auto'}>
                <RangeSlider
                    aria-label={['min', 'max']}
                    defaultValue={[100, 130]}
                    colorScheme='blue'
                    min={100}
                    max={300}
                    step={5}
                >
                    <RangeSliderTrack height={'7px'}>
                        <RangeSliderFilledTrack />
                    </RangeSliderTrack>
                    <RangeSliderThumb index={0} />
                    <RangeSliderThumb index={1} />
                </RangeSlider>
            </Box>
            <HStack justifyContent={'space-between'} width={'full'}>
                <Text color={'#a7a7a7'}>
                    $100
                </Text>
                <Text color={'#a7a7a7'}>
                    $300
                </Text>
            </HStack>
            <Divider borderBottomWidth={3} my={5} />
            <VStack width={'full'} alignItems={'flex-start'} spacing={3}>
                <Text fontSize={'2xl'} mb={1}>
                    Collections
                </Text>
                {collectionsCheckList.map((item, index) => (
                    <Checkbox
                        colorScheme="blue"
                        size={'lg'}
                        _checked={{
                            color: 'blue.400', // This changes the text color when checked
                        }}
                        key={index}
                    >
                        {item}
                    </Checkbox>
                ))}
            </VStack>
            <Divider borderBottomWidth={3} my={5} />
            <VStack width={'full'} alignItems={'flex-start'} spacing={3}>
                <Text fontSize={'2xl'} mb={1}>
                    Select Options
                </Text>
                {optionsCheckList.map((item, index) => (
                    <Checkbox
                        size={'lg'}
                        colorScheme="blue"
                        _checked={{
                            color: 'blue.400', // This changes the text color when checked
                        }}
                        key={index}
                    >
                        {item}
                    </Checkbox>
                ))}
            </VStack>
        </>
    )
}

const Collections = () => {
    const [isActive, setIsActive] = React.useState('Best Sellers');
    const [collections, setCollections] = React.useState([...pricing.discovernfts]);
    const buttonList: string[] = ['Best Sellers', 'Trending', 'Popular', 'Latest', 'top'];
    const { isOpen, onOpen, onClose } = useDisclosure()
    const showDrawer = useBreakpointValue({ base: true, lg: false });

    const handleTypeChange = (type: string) => {
        setIsActive(type)
    }

    return (
        <Section innerWidth={'1640px'} id="pricing" pos="relative" overflow={'hidden'}>
            <BackgroundGradient left={'50px'} top={'100px'} height="100%" zIndex="-1" />
            <Box zIndex="2" pos="relative">
                <SectionTitle title={"Discover more NFTs"} align={'left'} pt={10} />
                <Box pb={4} px={2} display={'flex'} justifyContent={'space-between'}>
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
                    {showDrawer &&
                        <Button
                            rightIcon={<Icon as={FiChevronDown} />}
                            variant="outline"
                            borderRadius="full"
                            px={6}
                            size="md"
                            onClick={onOpen}
                        >
                            Sort
                        </Button>
                    }
                </Box>

                <Grid
                    templateRows='repeat(2, 1fr)'
                    templateColumns='repeat(12, 1fr)'
                    gap={4}
                    pt={5}
                >
                    {!showDrawer ?
                        <GridItem rowSpan={10} colSpan={[3, 2]} >
                            <VStack
                                p={5}
                                bgColor={'rgba(255, 255, 255, 0.05)'}
                                backdropFilter='blur(75px)'
                                borderRadius={'10px'}
                                alignItems={'flex-start'}
                            >
                                <Filters />
                            </VStack>
                        </GridItem> :
                        <Drawer placement={'left'} onClose={onClose} isOpen={isOpen}>
                            <DrawerOverlay
                                bg='rgba(0, 0, 0, 0.5)'
                                backdropFilter='blur(2px)' />
                            <DrawerContent bgColor={'#1f1125bf'}>
                                <DrawerHeader borderBottomWidth='1px'>Filters</DrawerHeader>
                                <DrawerBody>
                                    <Filters />
                                </DrawerBody>
                            </DrawerContent>
                        </Drawer>
                    }
                    {collections.slice(0, 10)?.map((nft, id) => (
                        <GridItem colSpan={[6, 4, 3, 2]} key={id}>
                            <NFTCollection
                                type={nft.type}
                                name={nft.name}
                                image={nft.image}
                                action={nft.action}
                                sx={{}}
                            />
                        </GridItem>
                    ))}
                </Grid>
            </Box>
        </Section>
    );
};

export default Collections
