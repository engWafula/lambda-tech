import Image from 'next/image'
import { urlFor } from '@/sanity/image'
import type { SanityImage } from '@/lib/types'

type Props = {
  image?: SanityImage
  label: string
  className?: string
  dark?: boolean
  sizes?: string
  priority?: boolean
  width?: number
  height?: number
}

/** A Sanity image, or the striped placeholder from the design when none is set. */
export function Media({ image, label, className = '', dark, sizes = '100vw', priority, width = 1600, height = 1100 }: Props) {
  const cls = `media${dark ? ' dark' : ''} ${className}`
  if (!image?.asset) {
    return (
      <div className={cls} role="img" aria-label={`${label} (placeholder)`}>
        <span className="media-label" aria-hidden="true">{label}</span>
      </div>
    )
  }
  return (
    <div className={cls}>
      <Image
        src={urlFor(image).width(width).height(height).url()}
        alt={image.alt || label}
        width={width}
        height={height}
        sizes={sizes}
        priority={priority}
      />
    </div>
  )
}
