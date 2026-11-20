import { PortableText, type PortableTextComponents } from '@portabletext/react'
import Image from 'next/image'
import { urlFor } from '@/sanity/image'
import type { Block } from '@/lib/types'

const components: PortableTextComponents = {
  types: {
    image: ({ value }) =>
      value?.asset ? (
        <Image src={urlFor(value).width(1440).fit('max').url()} alt={value.alt || ''} width={1440} height={900} style={{ height: 'auto' }} />
      ) : null,
  },
  marks: {
    link: ({ value, children }) => {
      const href: string = value?.href || '#'
      const external = /^https?:/.test(href)
      return (
        <a href={href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
          {children}
        </a>
      )
    },
  },
}

export function RichText({ value }: { value?: Block[] }) {
  if (!value?.length) return null
  return (
    <div className="prose">
      <PortableText value={value} components={components} />
    </div>
  )
}
