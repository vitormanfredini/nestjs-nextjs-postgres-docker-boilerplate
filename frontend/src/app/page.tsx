'use client'
import { redirect } from 'next/navigation'

import {
  FeatureSection,
  FeatureSectionProps,
} from '@/components/custom/FeaturesSection'
import { HeroSection, HeroSectionProps } from '@/components/custom/HeroSection'
import { useUser } from '@/context/UserContext'

const heroSectionProps: HeroSectionProps = {
  title: 'Coolest dashboard on earth!',
  subtitle: 'Sign up for a free account right now',
  buttonText: 'Sign up',
  buttonUrl: '/signup',
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
  const { userData } = useUser()

  if (userData) {
    redirect('/dashboards')
  }

  return (
    <main>
      <HeroSection props={heroSectionProps} />
      <FeatureSection data={featureSectionData} />
    </main>
  )
}
