import { Button } from "@mantine/core"
import { useTranslations } from "next-intl"
import Link from 'next/link'

export default function Home() {
  const t = useTranslations ('HomePage');
  return (
    <div className="">
      <h1>{t('title')}</h1>
      <Button component={Link} href="/hello">
        Test
      </Button>
    </div>
  )
}
