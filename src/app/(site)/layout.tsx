import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { getSettings } from '@/lib/content'

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSettings()
  return (
    <>
      <a href="#main" className="skip">Skip to content</a>
      <Header />
      <main id="main">{children}</main>
      <Footer heading={settings.footerHeading} email={settings.email} title={settings.title} />
    </>
  )
}
