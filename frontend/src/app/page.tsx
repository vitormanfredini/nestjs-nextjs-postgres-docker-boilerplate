import {
  FeatureSection,
  FeatureSectionProps,
} from '@/components/custom/FeaturesSection'
import { HeroSection, HeroSectionProps } from '@/components/custom/HeroSection'

const heroSectionProps: HeroSectionProps = {
  title: 'Coolest dashboard on earth!',
  subtitle: 'Login or sign up for a free account right now',
  buttonText: 'Login',
  buttonUrl: '/login',
}

const featureSectionData: FeatureSectionProps = {
  title: 'Things you will have access',
  description: 'possibilities to get the most insights out of your data',
  features: [
    {
      heading: 'Visualizations',
      subHeading: 'graphs, charts, heatmaps and more',
      icon: 'check',
    },
    {
      heading: 'Fast responses',
      subHeading: 'your data is loaded in real-time',
      icon: 'clock',
    },
    {
      heading: 'Cloud enabled',
      subHeading: 'your dashboards are saved automatically',
      icon: 'cloud',
    },
  ],
}

export default function Home() {
  return (
    <main>
      <HeroSection props={heroSectionProps} />
      <FeatureSection data={featureSectionData} />
    </main>
  )
}
