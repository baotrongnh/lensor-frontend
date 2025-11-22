import React from 'react'
import { MessageCircle } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

export default function MessagePage() {
  return (
    <div className="container mx-auto py-6 px-4">
      <Card>
        <CardContent className="p-12 text-center">
          <MessageCircle className="h-16 w-16 mx-auto text-muted-foreground/40 mb-4" />
          <h2 className="text-xl font-semibold mb-2">No Messages</h2>
          <p className="text-sm text-muted-foreground">
            You don't have any messages yet. Start a conversation to see your messages here.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
