import {
  Card,
  CardProps,
  Grid,
  GridItem,
  GridItemProps,
  Heading,
} from "@chakra-ui/react";
import { Section, SectionProps } from "components/section";

export interface HighlightBoxProps
  extends GridItemProps,
  Omit<CardProps, "title"> { }

export const AmazingSportsItem: React.FC<HighlightBoxProps> = (props) => {
  const { children, title, ...rest } = props;
  return (
    <GridItem
      as={Card}
      flex="1 0"
      alignItems="center"
      justifyContent={'center'}
      overflow="hidden"
      position="relative"
      bg={'inherit'}
      border={'none'}
      {...rest}
    >
      {title && (
        <Heading fontSize={{ base: '2xl', lg: "4xl" }} m={'auto'} pb={[10, 20]} textAlign={'center'}>
          {title}
        </Heading>
      )}
      {children}
    </GridItem>
  );
};

export const AmazingSports: React.FC<SectionProps> = (props) => {
  const { children, ...rest } = props;

  return (
    <Section
      innerWidth="1640"
      position="relative"
      overflow="hidden"
      {...rest}
    >
      <Grid
        templateColumns={{ base: "repeat(1, 1fr)", lg: "repeat(3, 1fr)" }}
        position="relative"
      >
        {children}
      </Grid>
    </Section>
  );
};
