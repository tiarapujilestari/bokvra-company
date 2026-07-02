import type { Testimonial } from '@/types'
import StarRating from './StarRating'

export default function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const initials = testimonial.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)

  return (
    <div className="flex h-full flex-col justify-between rounded-3xl bg-espresso text-cream p-7 shadow-sm">
      <div>
        <StarRating rating={testimonial.rating} />
        <p className="mt-4 font-display text-lg leading-relaxed text-cream/90">
          &ldquo;{testimonial.quote}&rdquo;
        </p>
      </div>
      <div className="mt-6 flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-caramel/90 text-xs font-semibold text-espresso">
          {initials}
        </span>
        <div className="leading-tight">
          <p className="text-sm font-semibold text-cream">{testimonial.name}</p>
          <p className="text-xs text-cream/50">{testimonial.role}</p>
        </div>
      </div>
    </div>
  )
}
