import { Box } from '@chakra-ui/react'

export const BackgroundGradient = ({ left, right, top, bottom }: any) => {
  let gradientOverlay = `linear-gradient(88.83deg, rgba(196, 188, 0, 0.3) 1%, #CA00EB 99%);`

  return (
    <Box
      backgroundImage={gradientOverlay}
      position="absolute"
      width={{ base: '200px', md: "350px" }}
      height={{ base: '300px', md: "350px" }}
      left={left}
      top={top}
      bottom={bottom}
      right={right}
      zIndex="-1"
      mixBlendMode="normal"
      filter={{ md: 'blur(215px)', base: 'blur(150px)' }}
      transform='rotate(45deg)'
    ></Box>
  )
}
