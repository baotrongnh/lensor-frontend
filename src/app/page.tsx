import { Button } from "@mantine/core"
import Link from 'next/link'

export default function Home() {
  return (
    <div className="">
      <h1>Home page</h1>
      <Button component={Link} href="/hello">
        Test
      </Button>
    </div>
  )
}
