import * as React from "react";
import type { NextPage } from "next";
import {
  Container,
  Box,
  Stack,
  HStack,
  ButtonGroup,
  Text,
  VStack,
  Button,
  Icon,
  GridItem,
  Image,
  SimpleGrid
} from "@chakra-ui/react";

import { Br } from "@saas-ui/react";

import { SEO } from "components/seo/seo";
import { Hero } from "components/hero";
import { DiscorverNFTs } from "components/discorvernfts";
import { FallInPlace } from "components/motion/fall-in-place";
import { BestTeamScore, TeamScore } from "components/bestteam";
import { BestSeller, BestSellers } from "components/bestseller";
import { BackgroundGradient } from "components/gradients/background-gradient";
import { AmazingSports, AmazingSportsItem } from "components/amazingsports";

import { FiInfo } from "react-icons/fi";

import pricing from "data/pricing";
import testimonials from "data/testimonials";


import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';


const Home: NextPage = () => {
  return (
    <Box>
      <SEO
        title="Elevens Landingspage"
        description="Elevens landingspage"
      />
      <Box>
        <SlideSection />

        <AmazingSportsSection />

        <BestSellersSection />

        <BestTeamSection />

        <DiscoverNFTs />
      </Box>
    </Box>
  );
};

const SlideSection: React.FC = () => {
  return (
    <Box position="relative" overflow="hidden">
      <BackgroundGradient left={'150px'} top={'276px'} height="100%" zIndex="-1" />
      <Container maxW="1640" pt={{ base: 20, lg: 40 }} pb="40">
        <Stack direction={{ base: "column", lg: "row" }} alignItems="center">
          <Hero
            id="home"
            justifyContent="flex-start"
            px="0"
            title={
              <FallInPlace fontSize={['3xl', '4xl', '38px']}>
                Discover, and collect Digital
                <Br /> Cricket Collectables.
              </FallInPlace>
            }
            description={
              <FallInPlace delay={0.4} fontWeight="medium" fontSize={['sm', 'lg']}>
                Digital marketplace for crypto collectibles and non-
                <Br /> fungible tokens (NFTs). Buy, Sell, and discover exclusive
                <Br /> digital assets.
              </FallInPlace>
            }
          >
            <FallInPlace delay={0.8}>
              <HStack pt="6" pb="12" spacing="8">
                <Box>
                  <Text fontSize={['xl', '4xl']}>
                    90K+
                  </Text>
                  <Text fontSize={14} color={'#E6C229'}>
                    NFT Mints
                  </Text>
                </Box>
                <Box>
                  <Text fontSize={['xl', '4xl']}>
                    40K+
                  </Text>
                  <Text fontSize={14} color={'#E6C229'}>
                    Auction
                  </Text>
                </Box>
                <Box>
                  <Text fontSize={['xl', '4xl']}>
                    105K+
                  </Text>
                  <Text fontSize={14} color={'#E6C229'}>
                    Daily Sales
                  </Text>
                </Box>
              </HStack>

              <ButtonGroup spacing={4} alignItems="center">
                <Button colorScheme="red" size="lg" borderRadius={50} bgColor={'#D11149'}>
                  Claim Daily Free NFT
                </Button>
              </ButtonGroup>
            </FallInPlace>
          </Hero>
          <Box
            height={{ base: "200px", lg: '250px' }}
            position={{ base: 'unset', xl: "absolute" }}
            left={{ lg: "60%", xl: "55%" }}
            width={{ base: '100%', lg: '40vw' }}
          >
            <FallInPlace delay={1}>
              <Swiper
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={'auto'}
                coverflowEffect={{
                  rotate: 50,
                  stretch: 0,
                  depth: 100,
                  modifier: 1,
                  slideShadows: true,
                }}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
                pagination={{
                  clickable: true,
                }}
                navigation={true}
                modules={[EffectCoverflow, Pagination, Autoplay, Navigation]}
                className="mySwiper"
              >
                <SwiperSlide>
                  <Image src='static/images/slide/Regular.png' alt="" />
                </SwiperSlide>
                <SwiperSlide>
                  <Image src='static/images/slide/Bronze.png' alt="" />
                </SwiperSlide>
                <SwiperSlide>
                  <Image src='static/images/slide/Silver.png' alt="" />
                </SwiperSlide>
                <SwiperSlide>
                  <Image src='static/images/slide/Gold.png' alt="" />
                </SwiperSlide>
                <SwiperSlide>
                  <Image src='static/images/slide/Regular.png' alt="" />
                </SwiperSlide>
                <SwiperSlide>
                  <Image src='static/images/slide/Bronze.png' alt="" />
                </SwiperSlide>
                <SwiperSlide>
                  <Image src='static/images/slide/Silver.png' alt="" />
                </SwiperSlide>
                <SwiperSlide>
                  <Image src='static/images/slide/Gold.png' alt="" />
                </SwiperSlide>
              </Swiper>
            </FallInPlace>
          </Box>
        </Stack>
      </Container>
    </Box >
  );
};

const AmazingSportsSection = () => {
  return (
    <AmazingSports bg={'rgba(255, 255, 255, 0.05)'} innerWidth="1640">
      <AmazingSportsItem colSpan={[3, null, 3]} title="The amazing Sports Collectibles is here">
        <VStack alignItems="flex-start" spacing="8" px={3}>
          <SimpleGrid columns={[1, 2, 3, 5]} gap={6}>
            <GridItem w='100%' >
              <HStack>
                <Icon as={FiInfo} sx={{ color: '#D11149', width: '25px', height: '25px' }} />
                <Text color="#D11149" fontSize="2xl" fontWeight={700}>
                  Daily Free Mint
                </Text>
              </HStack>
              <Text color="muted" fontSize="xl">
                Get your daily free collectible by simply claiming. You might get lucky and win a rariable.
              </Text>
            </GridItem>
            <GridItem w='100%'>
              <HStack>
                <Icon as={FiInfo} sx={{ color: '#D11149', width: '25px', height: '25px' }} />
                <Text color="#D11149" fontSize="2xl" fontWeight={700}>
                  11-player Rarity
                </Text>
              </HStack>
              <Text color="muted" fontSize="xl">
                {`Each collectable that users claim will have "TEAM SCORE" which would provide an instant view on the rarity of the card.`}
              </Text>
            </GridItem>
            <GridItem w='100%'>
              <HStack>
                <Icon as={FiInfo} sx={{ color: '#D11149', width: '25px', height: '25px' }} />
                <Text color="#D11149" fontSize="2xl" fontWeight={700}>
                  Daily Free Mint
                </Text>
              </HStack>
              <Text color="muted" fontSize="xl">
                Get your daily free collectible by simply claiming. You might get lucky and win a rariable.
              </Text>
            </GridItem>
            <GridItem w='100%'>
              <HStack>
                <Icon as={FiInfo} sx={{ color: '#D11149', width: '25px', height: '25px' }} />
                <Text color="#D11149" fontSize="2xl" fontWeight={700}>
                  11-player Rarity
                </Text>
              </HStack>
              <Text color="muted" fontSize="xl">
                {`Each collectable that users claim will have "TEAM SCORE" which would provide an instant view on the rarity of the card.`}
              </Text>
            </GridItem>
            <GridItem w='100%'>
              <HStack>
                <Icon as={FiInfo} sx={{ color: '#D11149', width: '25px', height: '25px' }} />
                <Text color="#D11149" fontSize="2xl" fontWeight={700}>
                  Daily Free Mint
                </Text>
              </HStack>
              <Text color="muted" fontSize="xl">
                Get your daily free collectible by simply claiming. You might get lucky and win a rariable.
              </Text>
            </GridItem>
          </SimpleGrid>
        </VStack>
      </AmazingSportsItem>
    </AmazingSports>
  );
};

const BestSellersSection = () => {

  return (
    <BestSellers
      title={"Best Sellers"}
      columns={[1, 2, 3, 4, 5]}
      innerWidth="1640"
      py={20}
      overflow={"hidden"}
    >
      <>
        {testimonials.items.map((t, i) => (
          <BestSeller key={i} {...t} />
        ))}
      </>
    </BestSellers>
  );
};

const BestTeamSection = () => {
  return (
    <BestTeamScore
      title={"Best Team Score Minted"}
      columns={[1, 2, 3, 4, 5]}
      innerWidth="1640"
      bg={'rgba(255, 255, 255, 0.05)'}
      py={20}
      overflow={"hidden"}
    >
      <>
        {testimonials.items.map((t, i) => (
          <TeamScore key={i} {...t} />
        ))}
      </>
    </BestTeamScore>
  );
};

const DiscoverNFTs = () => {
  return (
    <DiscorverNFTs title="Discover more NFTs" {...pricing}>
      <Text p="8" textAlign="center" color="muted">
      </Text>
    </DiscorverNFTs>
  );
};

export default Home;
