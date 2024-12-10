import {
  Image,
  Card,
  CardBody,
  CardHeader,
  CardProps,
  Heading,
  Stack,
  Text,
  HStack,
  Box,
  Icon
} from "@chakra-ui/react";

export interface BestSellerProps extends CardProps {
  name: string;
  type: string;
  buyers: string;
  price: React.ReactNode;
  image: string;
  href?: string;
}

const ETHImage = ({ color }: { color: string }) => {
  return (
    <svg fill={`${color}`} width="15px" height="15px" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
      <path d="M15.927 23.959l-9.823-5.797 9.817 13.839 9.828-13.839-9.828 5.797zM16.073 0l-9.819 16.297 9.819 5.807 9.823-5.801z" />
    </svg>
  )
}

export const BestSeller = ({
  name,
  type,
  buyers,
  price,
  image,
  href,
  ...rest
}: BestSellerProps) => {
  const getColor = (type: string) => {
    switch (type) {
      case 'p':
        return "#E5E4E2"
      case 'r':
        return "#1B8FE4"
      case 'b':
        return "#F7931E"
      case 's':
        return "#C0C0C0"
      case 'g':
        return "#FFD700"
    }
  }
  const textColor = getColor(type);
  return (
    <Card position="relative" {...rest}>
      <CardHeader display="flex" flexDirection="row" alignItems="center">
        <Image src={image} bg="transparent" width={'50px'} height={'50px'} alt=""/>
        <Stack ms="4" width={'100%'}>
          <Heading size="sm" color={`${textColor}`} pl={'3px'}>{name}</Heading>
          <HStack justifyContent={'space-between'}>
            <HStack gap={0}>
              <ETHImage color={textColor || "#000"} />
              <Text color={`${textColor}`} fontSize="xs">
                {price}
              </Text>
            </HStack>
            <Text color="#00AC4F" fontSize="xs">
              {buyers} Buyers
            </Text>
          </HStack>
        </Stack>
      </CardHeader>
      {/* <CardBody>
        {children}
      </CardBody> */}
    </Card>
  );
};
