import { useRouter } from 'next/navigation'

import { Box, Button, ResponsiveValue, SimpleGrid } from '@chakra-ui/react'

import { BackgroundGradient } from 'components/gradients/background-gradient'
import { Section, SectionProps, SectionTitle, SectionTitleProps } from 'components/section'

export interface BestTeamScoreProps
  extends Omit<SectionProps, 'title'>,
  Pick<SectionTitleProps, 'title' | 'description'> {
  columns?: ResponsiveValue<number>
}

export const BestTeamScore: React.FC<BestTeamScoreProps> = (props) => {
  const router = useRouter()
  const { children, title, columns = [1, null, 2], ...rest } = props

  const hangleGotoCollections = () => {
    router.push('/collections')
  }
  return (
    <Section position={'relative'} overflow={'hidden'} {...rest}>
      <SectionTitle title={title} />
      <SimpleGrid columns={columns} spacing="4">
        {children}
      </SimpleGrid>
      <Box pt={10} width={'100%'} textAlign={'center'}>
        <Button variant={'outline'} margin={'auto'} size="lg" borderRadius={50} onClick={hangleGotoCollections}>
          View all collections
        </Button>
      </Box>
      <BackgroundGradient left={'50px'} top={'200px'} height="100%" zIndex="-1" />
    </Section>
  )
}
