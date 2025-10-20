import {
     Dialog,
     DialogContent,
     DialogDescription,
     DialogHeader,
     DialogTitle,
     DialogTrigger,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import React from 'react'
import Comment from "./comment"
import { Input } from "@/components/ui/input"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function DialogComment({ children }: { children: React.ReactNode }) {
     return (
          <Dialog>
               <DialogTrigger asChild>{children}</DialogTrigger>
               <DialogContent className="h-[85%] !max-w-[750px]">
                    <DialogHeader className="shrink-0">
                         <DialogTitle>Comment (25)</DialogTitle>
                         <DialogDescription>
                              Share your comment
                         </DialogDescription>

                    </DialogHeader>
                    <div
                         className="pr-4 overflow-y-auto 
                              [&::-webkit-scrollbar]:w-1
                              hover:[&::-webkit-scrollbar]:w-1
                              [&::-webkit-scrollbar-track]:bg-transparent
                              [&::-webkit-scrollbar-thumb]:bg-gray-400/0
                              hover:[&::-webkit-scrollbar-thumb]:bg-gray-400
                              [&::-webkit-scrollbar-thumb]:rounded-full
                              transition-colors
                              duration-300"
                    >
                         <Comment hasChild />
                         <Comment />
                         <Comment />
                         <Comment />
                    </div>
                    <InputGroup>
                         <InputGroupInput placeholder="Search..." />
                         <InputGroupAddon>
                              <Avatar>
                                   <AvatarImage src="https://github.com/shadcn.png" />
                                   <AvatarFallback>CN</AvatarFallback>
                              </Avatar>
                         </InputGroupAddon>
                         <InputGroupAddon align="inline-end">12 results</InputGroupAddon>
                    </InputGroup>
               </DialogContent>
          </Dialog>
     )
}
