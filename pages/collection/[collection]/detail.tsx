import React from "react";
import dynamic from "next/dynamic";

import {
    Box,
    Button,
    Grid,
    GridItem,
    Heading,
    HStack,
    Image,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Text,
    VStack,
    Icon,
} from "@chakra-ui/react";

import { Section } from "components/section";
import { BackgroundGradient } from "components/gradients/background-gradient";

import { FiHeart } from "react-icons/fi";
import { AiFillEye, AiFillHeart, AiFillShopping } from "react-icons/ai";

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });



interface TextPairProps {
    label: string;
    text: string;
}
const TextPair: React.FC<TextPairProps> = ({ label, text }) => {
    return (
        <HStack justifyContent={'space-between'} width={'full'}>
            <Text color={'#a7a7a7'}>
                {label}:
            </Text>
            <Text color={'#a7a7a7'} textDecoration={'underline'} textAlign={'right'}>
                {text}
            </Text>
        </HStack>
    )
}


const Header = () => {
    const [isFavor, setIsFavor] = React.useState(false);
    const [isBumping, setIsBumping] = React.useState(false);

    const handleClick = () => {
        setIsFavor(!isFavor);
        setIsBumping(!isBumping);
    };

    React.useEffect(() => {
        if (isBumping) {
            const timer = setTimeout(() => setIsBumping(false), 300); // Duration of the bump animation
            return () => clearTimeout(timer);
        }
    }, [isBumping]);


    return (
        <Box>
            <HStack spacing={5}>
                <Heading fontSize={'4xl'}>
                    Platinum Card
                </Heading>
                <Icon
                    as={FiHeart}
                    fill={isFavor ? 'red' : 'transparent'}
                    color={isFavor ? 'red' : 'white'}
                    onClick={handleClick}
                    style={{
                        cursor: 'pointer',
                        transition: 'transform 0.3s ease-in-out',
                        transform: isBumping ? 'scale(1.2)' : 'scale(1)',
                    }}
                />
            </HStack>
            <Text fontSize={'xl'} color={'#b5b5b5'}>#46220</Text>
            <HStack color={'#b5b5b5'} spacing={5} py={2}>
                <HStack><AiFillEye /><Text fontSize={'md'}>150+</Text></HStack>
                <HStack><AiFillShopping /><Text fontSize={'md'}>79 Buyers</Text></HStack>
                <HStack><AiFillHeart /><Text fontSize={'md'}>2k+</Text></HStack>
            </HStack>
        </Box>
    )
}

const Description = () => {
    return (
        <VStack
            p={5}
            bgColor={'rgba(255, 255, 255, 0.05)'}
            backdropFilter='blur(75px)'
            borderRadius={'10px'}
            alignItems={'flex-start'}
            width={'full'}
        >
            <Text fontSize={'2xl'} mb={1}>
                Description
            </Text>
            <Text color={'#a7a7a7'} mb={3} fontSize={['sm', 'md', 'lg']}>
                Lorem ipsum dolor sit amet consectetur. Mi ut neque nunc scelerisque a gravida nullam. Amet sed egestas id gravida. Est ultrices vitae aliquam at eget pellentesque nulla dictum. Ultrices risus suspendisse ut dis fames mattis in rutrum in. Auctor donec vel non quis diam. Ante tellus feugiat amet porttitor quam velit cursus
            </Text>
            <Box>
                <HStack>
                    <Text fontSize={'md'} color={'#a7a7a7'}>Discord:</Text>
                    <Text fontSize={'md'} color={'#1B8FE4'} textDecoration={'underline'}>https://discord.gg/play11s</Text>
                </HStack>
                <HStack>
                    <Text fontSize={'md'} color={'#a7a7a7'}>X/Twitter:</Text>
                    <Text fontSize={'md'} color={'#1B8FE4'} textDecoration={'underline'}>https://twitter.com/play11s</Text>
                </HStack>
            </Box>
            <Text fontSize={'lg'} mt={4} color={'#E6C229'} >Currnet Price</Text>
            <HStack>
                <Text color={'#1B8FE4'} fontSize={'3xl'} fontWeight={900}>0.12 ETH</Text>
                <Text fontSize={'md'}>$23</Text>
            </HStack>
        </VStack>
    )
}

const PriceHistoryChart = () => {

    const options = {
        chart: {
            toolbar: {
                show: false
            },
            zoom: {
                enabled: true
            },
            foreColor: '#ffffff', // Set text color to white for the dark background
        },
        grid: {
            borderColor: '#444444',
            yaxis: {
                lines: {
                    show: true
                }
            }
        },
        xaxis: {
            categories: ['5k', '10k', '15k', '20k', '25k', '30k', '35k', '40k', '45k', '50k', '55k', '60k', '65k', '70k', '75k', '80k', '85k', '90k', '95k'],
            labels: {
                style: {
                    colors: '#ffffff',
                }
            },
            crosshairs: {
                width: 1
            },
        },
        yaxis: {
            min: 0, // Minimum value on y-axis
            max: 100, // Maximum value on y-axis
            tickAmount: 5, // Number of ticks between min and max (4 will create 5 labels)
            labels: {
                formatter: (value) => `${value}%`,
                style: {
                    colors: '#ffffff',
                }
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            width: 1
        },
        tooltip: {
            theme: 'dark',
            y: {
                formatter: (value) => value.toFixed(2),
            }
        },
        markers: {
            size: 3,
            colors: ['#4f8ef7'],
            strokeColors: '#4f8ef7',
            hover: {
                size: 6,
                sizeOffset: 20
            }
        },
        fill: {
            type: 'gradient',
            gradient: {
                shade: 'dark',
                type: 'horizontal',
                shadeIntensity: 1,
                gradientToColors: ['#4f8ef7'],
                inverseColors: false,
                opacityFrom: 0.5,
                opacityTo: 0.3,
                stops: [0, 100]
            }
        },
        colors: ['#4f8ef7'], // Line color
    };


    const series = [{
        name: 'Price',
        data: [25, 35, 45, 50, 30, 65, 45, 40, 55, 30, 25, 60, 50, 45, 55, 60, 70, 75, 80]
    }];

    return (
        <VStack
            py={5}
            bgColor={'rgba(255, 255, 255, 0.05)'}
            backdropFilter='blur(75px)'
            borderRadius={'10px'}
            alignItems={'flex-start'}
            width={'full'}
        >
            <Text fontSize={'2xl'} mb={1} px={4}>
                Price History
            </Text>
            <Box h="300px" w={'full'} color={'white'} py={4} borderRadius="lg">
                {/* <Line ref={chartRef} data={chartData} options={options} /> */}
                {/* <Chart series={series} options={options} type="area" width={'100%'} height={'100%'} /> */}
                <ReactApexChart options={options} series={series} type="area" height={'100%'} />
            </Box>
        </VStack>
    );
};

const PlatformStateTable = () => {
    const data = [
        { price: '0.12 ETH', usdPrice: '$23', quantity: '01', expiration: '5 Days 01h:52m:30s', from: 'Play11s' },
        { price: '0.14 ETH', usdPrice: '$24', quantity: '02', expiration: '5 Days 01h:52m:30s', from: 'Play11s' },
        { price: '0.16 ETH', usdPrice: '$25', quantity: '03', expiration: '5 Days 01h:52m:30s', from: 'Play11s' },
    ];

    return (
        <VStack
            p={5}
            bgColor={'rgba(255, 255, 255, 0.05)'}
            backdropFilter='blur(75px)'
            borderRadius={'10px'}
            alignItems={'flex-start'}
            width={'full'}
        >
            <Text fontSize={'2xl'} mb={1}>
                Platform State
            </Text>
            <Box w="full" p={4} borderRadius="lg" mt={4} overflow={'auto'}>
                <Table variant="simple" >
                    <Thead>
                        <Tr>
                            <Th>Price</Th>
                            <Th>USD Price</Th>
                            <Th>Quantity</Th>
                            <Th>Expiration</Th>
                            <Th>From</Th>
                            <Th>Action</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {data.map((item, index) => (
                            <Tr key={index}>
                                <Td>{item.price}</Td>
                                <Td>{item.usdPrice}</Td>
                                <Td>{item.quantity}</Td>
                                <Td>{item.expiration}</Td>
                                <Td>{item.from}</Td>
                                <Td>
                                    <Button colorScheme="purple" borderRadius={50} px={4}>Buy</Button>
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </Box>
        </VStack>
    );
};

const Collections = () => {

    return (
        <Section innerWidth={'1640px'} id="pricing" pos="relative" overflow={'hidden'}>
            <BackgroundGradient left={'50px'} top={'100px'} height="100%" zIndex="-1" />
            <BackgroundGradient right={'50px'} bottom={'500px'} height="100%" zIndex="-1" />
            <Box zIndex="2" pos="relative">
                <Grid
                    templateRows='repeat(1, 1fr)'
                    templateColumns={'repeat(10, 1fr)'}
                    gap={4}
                    pt={5}
                >
                    <GridItem rowSpan={1} colSpan={{ base: 10, md: 4, xl: 3 }} >
                        <VStack
                            borderRadius={'10px'}
                            alignItems={['center', 'flex-start']}
                            width={{ base: '80%', sm: '100%' }}
                            margin={'auto'}
                            pt={4}
                        >
                            <Box width={'full'}>
                                <Image src={'/static/images/slide/Silver.png'} alt="NFT" bg="transparent" margin={'auto'} width={'full'} />
                            </Box>
                            <VStack
                                p={5}
                                bgColor={'rgba(255, 255, 255, 0.05)'}
                                backdropFilter='blur(75px)'
                                borderRadius={'10px'}
                                alignItems={'flex-start'}
                                width={'full'}
                                gap={4}
                            >
                                <Text fontSize={'2xl'} mb={1}>
                                    Legal Information
                                </Text>
                                <TextPair label="Contract Address" text="0x4ca3...1197" />
                                <TextPair label="Token ID" text="2354" />
                                <TextPair label="Token Standard" text="Currency" />
                                <TextPair label="Currency" text="Doller" />
                                <TextPair label="Last Updated" text="2days ago" />
                                <TextPair label="Creator Earnings" text="0%" />
                            </VStack>
                            <Button
                                my={3}
                                colorScheme="blue"
                                borderRadius="full"
                                size="md"
                                width={'full'}
                            >
                                Buy Now
                            </Button>
                        </VStack>
                    </GridItem>
                    <GridItem rowSpan={1} colSpan={{ base: 10, md: 6, xl: 7 }} >
                        <VStack
                            py={5}
                            borderRadius={'10px'}
                            alignItems={'flex-start'}
                            spacing={5}
                        >
                            <Header />
                            <Description />
                            <PriceHistoryChart />
                            <PlatformStateTable />
                        </VStack>
                    </GridItem>
                </Grid>
            </Box>
        </Section>
    );
};

export default Collections
