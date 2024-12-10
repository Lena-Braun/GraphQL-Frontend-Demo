import { Image, Box, HTMLChakraProps } from '@chakra-ui/react'

export const Logo: React.FC<HTMLChakraProps<'svg'>> = (props) => {
  return (
    <Image
      src='/static/images/Logo.png'
      alt="Logo"
      width='60px'
    />
  )
}
