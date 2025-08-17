import { Hero } from './components/sections/Hero'
import { Features } from './components/sections/Features'
import { Demos } from './components/sections/Demos'
import { CTA } from './components/sections/CTA'
import { Pricing } from './components/sections/Pricing'

export default function Home() {
  return (
    <div className="relative">
      <Hero />
      <Features /> 
      <Pricing />
      <Demos />
      <CTA />
 
    </div>
  )
}
