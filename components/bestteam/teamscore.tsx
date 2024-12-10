import {
  Image,
  Card,
  CardHeader,
  CardProps,
  Heading,
  Stack,
  Text,
  HStack,
} from "@chakra-ui/react";

export interface TeamScoreProps extends CardProps {
  name: string;
  type: string;
  buyers: string;
  price: React.ReactNode;
  image: string;
  href?: string;
}

export const TeamScore = ({
  name,
  type,
  buyers,
  price,
  image,
  href,
  ...rest
}: TeamScoreProps) => {
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
              <Text color={`${textColor}`} fontSize="xs">
                Score: {price}
              </Text>
            </HStack>
            <Text color="#00AC4F" fontSize="xs">
              {buyers}%
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
