import { useEffect } from 'react'

const SITE_TITLE = 'SwiftFormat - Fast, Free, AI-Powered File Converter'
const SITE_DESCRIPTION = 'SwiftFormat is a fast, free, AI-powered online file converter for documents, audio, video, and images. Convert and optimize files instantly.'
const SITE_URL = 'https://swiftformat.vercel.app'

function upsertMeta(selector: string, attrs: Record<string, string>) {
  let el = document.querySelector(selector) as HTMLMetaElement | null
  if (!el) {
    el = document.createElement('meta')
    const parts = selector.match(/meta\[name="(.+)"\]|meta\[property="(.+)"\]/)
    if (parts) {
      const name = parts[1] || parts[2]
      if (selector.includes('property')) el.setAttribute('property', name)
      else el.setAttribute('name', name)
    }
    document.head.appendChild(el)
  }
  Object.entries(attrs).forEach(([k, v]) => el!.setAttribute(k, v))
}

export default function SEOHead() {
  useEffect(() => {
    document.title = SITE_TITLE

    upsertMeta('meta[name="description"]', { content: SITE_DESCRIPTION })
    upsertMeta('meta[property="og:title"]', { content: SITE_TITLE })
    upsertMeta('meta[property="og:description"]', { content: SITE_DESCRIPTION })
    upsertMeta('meta[property="og:type"]', { content: 'website' })
    upsertMeta('meta[property="og:url"]', { content: SITE_URL })
    upsertMeta('meta[name="twitter:card"]', { content: 'summary_large_image' })
    upsertMeta('meta[name="twitter:title"]', { content: SITE_TITLE })
    upsertMeta('meta[name="twitter:description"]', { content: SITE_DESCRIPTION })

    // canonical link
    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null
    if (!link) {
      link = document.createElement('link')
      link.setAttribute('rel', 'canonical')
      document.head.appendChild(link)
    }
    link.setAttribute('href', SITE_URL + window.location.pathname)

    // Basic JSON-LD
    const ldId = 'site-json-ld'
    let ld = document.getElementById(ldId) as HTMLScriptElement | null
    const jsonld = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'SwiftFormat',
      url: SITE_URL,
      description: SITE_DESCRIPTION,
    }

    if (!ld) {
      ld = document.createElement('script')
      ld.type = 'application/ld+json'
      ld.id = ldId
      document.head.appendChild(ld)
    }
    ld.textContent = JSON.stringify(jsonld)
  }, [])

  return null
}
