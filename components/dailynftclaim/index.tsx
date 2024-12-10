import { Button, Grid, GridItem, Heading, HStack, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, Text, VStack } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import React from "react"
import Confetti from 'react-confetti';


interface DailyNFTClaimProps {
    isOpen: boolean;
    onClose: () => void;
}

const DailyNFTClaim: React.FC<DailyNFTClaimProps> = ({ isOpen, onClose }) => {
    const router = useRouter();
    const [showConfetti, setShowConfetti] = React.useState(false);
    const [isClaimed, setIsClaimed] = React.useState(false);

    const handleClaimNFT = () => {
        setIsClaimed(true)
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 10000); // Confetti effect lasts for 10 seconds
    }

    const handleGotoCollections = () => {
        router.push('/minted-collections')
        onClose()
    }

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose} size={'3xl'} >
                <ModalOverlay
                    bg='blackAlpha.400'
                    backdropFilter='blur(2px) hue-rotate(90deg)'
                />
                <ModalContent sx={{
                    py: '40px',
                    backdropFilter: 'blur(75px)',
                    borderRadius: '12px',
                    position: "relative",
                    bgColor: 'transparent',
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
                    width: { base: '95%', md: '100%' }
                }}>
                    <ModalCloseButton />
                    <ModalBody>
                        <Grid templateColumns='repeat(5, 1fr)' width={'100%'}>
                            <GridItem colSpan={[5, 2]} >
                                <Image src={'/static/images/slide/Regular.png'} alt="NFT" bg="transparent" width={'100%'} />
                            </GridItem>
                            <GridItem colSpan={[5, 3]} ml={4}>
                                {isClaimed ?
                                    <VStack alignItems={'flex-start'} mt={8} spacing={5}>
                                        <Heading>
                                            {`Congrats,\n You've got a free NFT`}
                                        </Heading>
                                        <Text fontSize={'md'}>
                                            visit your collection and reveal the nft to see more details.
                                        </Text>
                                        <HStack width={'full'} my={4}>
                                            <Button
                                                variant="outline"
                                                borderRadius="full"
                                                width={'full'}
                                                onClick={onClose}
                                                size={'md'}
                                            >
                                                Got it
                                            </Button>
                                            <Button
                                                variant="primary"
                                                borderRadius="full"
                                                width={'full'}
                                                onClick={handleGotoCollections}
                                                size={'md'}
                                                fontSize={['xs', 'sm', 'md']}
                                            >
                                                Visit my Collections
                                            </Button>
                                        </HStack>
                                    </VStack> :
                                    <VStack alignItems={'flex-start'} mt={8} spacing={5}>
                                        <Heading>
                                            Claim your daily reward NFT.
                                        </Heading>
                                        <Text fontSize={'md'}>
                                            Lorem ipsum dolor sit amet consectetur. Integer sem eu imperdiet volutpat et rutrum scelerisque. In eget neque urna tellus neque nibh cursus. Sit augue in mi commodo proin neque pellentesque. Magnis imperdiet tempus et lacinia in feugiat.
                                        </Text>
                                        <HStack width={'full'} my={4}>
                                            <Button
                                                variant="outline"
                                                borderRadius="full"
                                                width={'full'}
                                                onClick={onClose}
                                                size={'md'}
                                            >
                                                Maybe Later
                                            </Button>
                                            <Button
                                                variant="primary"
                                                borderRadius="full"
                                                width={'full'}
                                                onClick={handleClaimNFT}
                                                size={'md'}
                                            >
                                                Claim now
                                            </Button>
                                        </HStack>
                                    </VStack>
                                }
                            </GridItem>
                        </Grid>
                    </ModalBody>
                </ModalContent>
                {showConfetti && <Confetti style={{ position: 'fixed', top: '0px', left: '0px', zIndex: 1400 }} />}
            </Modal>
        </>
    )
}
export default DailyNFTClaim