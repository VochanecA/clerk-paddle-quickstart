import { Hero } from './components/sections/Hero'
import { Features } from './components/sections/Features'
import { Demos } from './components/sections/Demos'
import { CTA } from './components/sections/CTA'

export default function Home() {
  return (
    <div className="relative">
      <Hero />
      <Features />
      <Demos />
      <CTA />
    </div>
  )
}
