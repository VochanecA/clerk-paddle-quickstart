import { Button } from '../Button'
import { SOCIAL_LINKS, AUTHOR } from '@/app/config/constants'

export function CTA() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-24 text-center">
      <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
      <p className="text-zinc-400 max-w-2xl mx-auto mb-8">
        Star us on GitHub, contribute to the project, or follow {AUTHOR.TWITTER} for updates.
      </p>
      <div className="flex gap-4 justify-center">
        <a href={SOCIAL_LINKS.GITHUB} target="_blank" rel="noopener noreferrer">
          <Button variant="primary">Star on GitHub</Button>
        </a>
        <a href={SOCIAL_LINKS.TWITTER} target="_blank" rel="noopener noreferrer">
          <Button variant="secondary">Follow on Twitter</Button>
        </a>
      </div>
    </div>
  )
} 