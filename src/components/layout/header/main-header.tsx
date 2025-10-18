'use client'

import { Button } from '@/components/ui/button'
import { useTranslations } from 'next-intl'
import Link from 'next/link'

interface MainHeaderProps {
  isLogin: boolean
}

export default function MainHeader() {
  const t = useTranslations('MainHeader')

  const navLinkItems = [
    { title: t('feature'), href: '/' },
    { title: t('pricing'), href: '/' },
    { title: t('faq'), href: '/' }
  ]

  return (
    <header className='z-30 backdrop-blur-2xl border-b-[0.5px] border-b-gray-300/10 pl-2 pr-2 sticky top-0'>
      <div className='container flex justify-between gap-10 items-center h-16'>
        <Link href='/#'>LOGO</Link>
        <div className='hidden md:flex gap-10 items-center'>
          {navLinkItems.map((item, index) =>
            <Link href={item.href} key={index}>{item.title}</Link>)
          }
        </div>
      </div>
    </header>
  )
}
