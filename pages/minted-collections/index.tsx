import React from "react";

import {
    Box,
    Button,
    Grid,
    GridItem,
    HStack,
    Icon,
    Image,
    Modal,
    ModalBody,
    ModalContent,
    ModalOverlay,
    ScaleFade,
    SimpleGrid,
    StackProps,
    Text,
    useBreakpointValue,
    useDisclosure,
    useMediaQuery,
    VStack,
} from "@chakra-ui/react";

import { ButtonLinkProps } from "components/button-link/button-link";
import { BackgroundGradient } from "components/gradients/background-gradient";
import { Section, SectionTitle } from "components/section";

import Confetti from 'react-confetti';
import { FiChevronDown } from "react-icons/fi";
import ScratchCard from "react-scratchcard-v2";
import AnimatedCursor from 'react-animated-cursor';

import pricing from "data/pricing";



interface PlayersListProps {
    name: string;
    type: "batsman" | "rounder" | "bowler" | "keeper";
}

interface PlayerProps {
    number: number;
    name: string;
    type: "batsman" | "rounder" | "bowler" | "keeper";
}

const playersList: PlayersListProps[] = [
    { name: 'S. Tendulkar (IND)', type: 'batsman' },
    { name: 'V. Kohli (IND)', type: 'batsman' },
    { name: 'S. T. Jayasuriya (SL)', type: 'batsman' },
    { name: 'A. R. Border (AUS)', type: 'batsman' },
    { name: 'S. P. Fleming (NZ)', type: 'rounder' },
    { name: 'S. E. Marsh (AUS)', type: 'rounder' },
    { name: 'A. J. Stewart (ENG)', type: 'keeper' },
    { name: 'H. J. Tayfield (SA)', type: 'bowler' },
    { name: 'J. Bumrah (IND)', type: 'bowler' },
    { name: 'G. D. McGrath (AUS)', type: 'bowler' },
    { name: 'C. A. Walsh (WI)', type: 'bowler' },
]

const teamScores = [
    { score: "99", label: "Team Score" },
    { score: "35", label: "Bating Score" },
    { score: "102", label: "Bowling Score" },
    { score: "75", label: "Experience Score" },
    { score: "62", label: "Luck Score" },
    { score: "Home", label: "Ground" }
]

const Player: React.FC<PlayerProps> = ({ number, name, type }) => {
    const staticData = {
        batsman: { color: '#d11049', image: '/static/images/player-type/attacker.png' },
        rounder: { color: '#a70d3a', image: '/static/images/player-type/rounder.png' },
        bowler: { color: '#54061d', image: '/static/images/player-type/bowler.png' },
        keeper: { color: '#690825', image: '/static/images/player-type/keeper.png' }
    }
    const [playerImage, setPlayerImage] = React.useState('')
    const [bgColor, setBgColor] = React.useState('')
    const [isLargerThan375] = useMediaQuery('(max-width: 375px)')

    React.useEffect(() => {
        if (type) {
            setPlayerImage(staticData[type].image)
            setBgColor(staticData[type].color)
        }

    }, [type])

    return (
        <HStack bgColor={bgColor} justifyContent={'space-between'} >
            <HStack>
                <Text fontSize={isLargerThan375 ? '11px' : 'md'} color={'#b3adaf'}>{number + 1 < 10 ? `0${number + 1}` : `${number + 1}`}</Text>
                <Text fontSize={isLargerThan375 ? '11px' : 'md'}>{name}</Text>
            </HStack>
            <Image src={playerImage} alt="" width={30} height={30} />
        </HStack>
    )
}



interface TeamScoreProps {
    score: string;
    label: string;
}
const TeamScore: React.FC<TeamScoreProps> = ({ score, label }) => {
    const [isLargerThan375] = useMediaQuery('(max-width: 375px)')
    return (
        <Box bgColor={'#313034'} >
            <VStack gap={0}>
                <Text fontSize={isLargerThan375 ? '2xl' : '4xl'} fontWeight={900} color={"#1a8fe3"}>{score}</Text>
                <Text fontSize={isLargerThan375 ? '13px' : 'md'} textAlign={'center'}>{label}</Text>
            </VStack>
        </Box >
    )
}



interface ReavealModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const ReavealModal: React.FC<ReavealModalProps> = ({ isOpen, onClose }) => {
    const scaleFadeRef = React.useRef(null);
    const [isFliping, setIsFliping] = React.useState(false);
    const [isScratching, setIsScratching] = React.useState(false);
    const [showConfetti, setShowConfetti] = React.useState(false);
    const [cardDimensions, setCardDimensions] = React.useState({ width: 0, height: 0 });

    const handleFlip = () => {
        setIsFliping(true)
    }

    const handleScratchReveal = () => {
        setIsScratching(true)

    }

    const handleShowCard = () => {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 10000); // Confetti effect lasts for 3 seconds
    }

    React.useEffect(() => {
        const updateDimensions = () => {

            if (scaleFadeRef.current) {
                const { offsetWidth, offsetHeight } = scaleFadeRef.current;
                setCardDimensions({ width: offsetWidth, height: offsetHeight });
            }
        };

        updateDimensions();

        window.addEventListener('resize', updateDimensions);
        return () => {
            window.removeEventListener('resize', updateDimensions);
        };
    }, [isFliping]);

    React.useEffect(() => {
        // Cleanup function to reset cursor when component unmounts
        return () => {
            document.body.style.cursor = 'auto'; // or 'default'
        };
    }, [isOpen]);


    return (
        <Modal isCentered isOpen={isOpen} onClose={onClose}>
            <ModalOverlay
                bg='rgba(0, 0, 0, 0.5)'
                backdropFilter='blur(75px)'
                zIndex={1300}
            />
            <ModalContent bg="transparent" boxShadow="none">
                <ModalBody padding={[1, 4]}>
                    <VStack width={'95%'} margin={'auto'} position={'relative'}>
                        <Image src={'/static/images/slide/Silver.png'} ref={scaleFadeRef} bg="transparent" width={'100%'} position={'absolute'} zIndex={-10} opacity={0} alt="" />
                        {!isFliping ?
                            <ScaleFade initialScale={1} in={true} style={{ width: '100%' }}>
                                <Image src={'/static/images/slide/Silver.png'} bg="transparent" width={'100%'} alt="" />
                            </ScaleFade > :
                            <ScaleFade initialScale={1} in={true} style={{ width: '100%' }}>
                                {isScratching ?
                                    <ScratchCard
                                        width={cardDimensions.width}
                                        height={cardDimensions.height}
                                        image={'/static/images/reveal-card.png'}
                                        finishPercent={50}
                                        onComplete={handleShowCard}
                                    >
                                        {/* <Image src={'/static/images/blink-card.png'} bg="transparent" width={'100%'} /> */}
                                        <Box
                                            bgImage={'/static/images/blink-card.png'}
                                            height={'100%'}
                                            backgroundSize={'100% 100%'}
                                            display={'flex'}
                                            justifyContent={'center'}
                                            alignItems={'center'}
                                            padding={'10px'}
                                        >
                                            <Grid templateColumns='repeat(5, 1fr)' width={'100%'} height={'100%'} borderRadius={'10px'} overflow={'hidden'}>
                                                <GridItem colSpan={3} display={'flex'} justifyContent={'space-between'} flexDirection={'column'}>
                                                    {playersList.map((item, index) => (
                                                        <Player key={index} number={index} name={item.name} type={item.type} />
                                                    ))}
                                                </GridItem>
                                                <GridItem colSpan={2} ml={'10px'} display={'flex'} justifyContent={'space-between'} flexDirection={'column'}>
                                                    {teamScores.map((item, index) => (
                                                        <TeamScore key={index} score={item.score} label={item.label} />
                                                    ))}
                                                </GridItem>
                                            </Grid>
                                        </Box>
                                        <AnimatedCursor
                                            innerSize={10} // Size of the inner cursor
                                            outerSize={25} // Size of the outer cursor
                                            color='255, 255, 255' // RGB color for the cursor
                                            outerAlpha={0.5} // Opacity of the outer cursor
                                            innerScale={0.7} // Scale of the inner cursor on hover
                                            outerScale={1.5} // Scale of the outer cursor on hover
                                            clickables={['br']}
                                        />
                                    </ScratchCard> :
                                    <Image src={'/static/images/reveal-card.png'} alt="" bg="transparent" width={'100%'} />
                                }
                            </ScaleFade >
                        }
                        {!isFliping ?
                            <HStack width={'full'}>
                                <Button
                                    variant="outline"
                                    borderRadius="full"
                                    size="lg"
                                    width={'full'}
                                    onClick={onClose}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    variant="primary"
                                    borderRadius="full"
                                    width={'full'}
                                    size="lg"
                                    onClick={handleFlip}
                                >
                                    Flip the Card
                                </Button>
                            </HStack> :
                            <>
                                {!isScratching ?
                                    <Button
                                        variant="primary"
                                        borderRadius="full"
                                        width={'full'}
                                        size="lg"
                                        onClick={handleScratchReveal}
                                    >
                                        Scratch and Reveal
                                    </Button> :
                                    <Button
                                        variant="primary"
                                        borderRadius="full"
                                        width={'full'}
                                        size="lg"
                                        disabled={!showConfetti}
                                    >
                                        Woohoo! Let Play
                                    </Button>
                                }
                            </>
                        }
                    </VStack>
                </ModalBody>
            </ModalContent>
            {showConfetti && <Confetti style={{ position: 'fixed', top: '0px', left: '0px', zIndex: 1400 }} />}
        </Modal>
    )
}

interface MintedCollectionProps extends Omit<StackProps, "title"> {
    type: string;
    name: string;
    image: string
    action: ButtonLinkProps & { label?: string };
}

const MintedCollection: React.FC<MintedCollectionProps> = (props) => {
    const { image } = props;
    const { isOpen, onOpen, onClose } = useDisclosure()

    const [isHovered, setIsHovered] = React.useState(false);

    return (
        <Box
            position="relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >

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
                transitionProperty="all" // Apply transition to all properties  
                _hover={{
                    bg: '#413e3e !important',
                }}

            >
                <Image src={image} alt="" bg="transparent" />
            </VStack>
            {isHovered && (
                <Box
                    position="absolute"
                    bottom="30px"
                    left="50%"
                    zIndex="3"
                    width='80%'
                >
                    <Button
                        colorScheme="blue"
                        transform="translateX(-50%)"
                        transition="opacity 0.3s ease"
                        opacity={isHovered ? 1 : 0}
                        borderRadius={'50px'}
                        width={'full'}
                        height={'40px'}
                        onClick={onOpen}
                    >
                        Reveal
                    </Button>
                </Box>
            )}
            <ReavealModal isOpen={isOpen} onClose={onClose} />
        </Box>
    );
};

const MintedCollections = () => {
    const [collections, setCollections] = React.useState([...pricing.discovernfts])

    return (
        <Section innerWidth={'1640px'} id="pricing" pos="relative" overflow={'hidden'}>
            <BackgroundGradient left={'50px'} top={'250px'} height="100%" zIndex="-1" />
            <Box zIndex="2" pos="relative">
                <HStack justifyContent={'space-between'} alignItems={'center'} pt={10}>
                    <SectionTitle title={"My Minted Collections"} />
                    <Button
                        rightIcon={<Icon as={FiChevronDown} />}
                        colorScheme="blue"
                        variant="outline"
                        borderRadius="full"
                        size="md"
                    >
                        Sort
                    </Button>
                </HStack>

                <SimpleGrid columns={[2, 3, 4, 5, 6]} spacing={4} pt={5}>
                    {collections.slice(0, 10)?.map((nft, id) => (
                        <MintedCollection
                            key={id}
                            type={nft.type}
                            name={nft.name}
                            image={nft.image}
                            action={nft.action}
                        />
                    ))}
                </SimpleGrid>
            </Box >
        </Section >
    );
};

export default MintedCollections
