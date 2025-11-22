import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
     Dialog,
     DialogContent,
     DialogDescription,
     DialogHeader,
     DialogTitle,
     DialogTrigger,
} from "@/components/ui/dialog"
import { Skeleton } from "@/components/ui/skeleton"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import { Send } from "lucide-react"
import { useState, useMemo } from 'react'
import Comment from "./comment"
import { useTranslations } from "next-intl"
import { useUserStore } from "@/stores/user-store"
import { useCreateComment, useComments } from "@/lib/hooks/usePostHooks"
import { CommentResponseType } from "@/types/post"
import { LoginRequiredDialog } from "@/components/ui/login-required-dialog"

export default function DialogComment({ children, postId, handleUpdateCommentCount }: { children: React.ReactNode, postId: string, handleUpdateCommentCount: (increment: number) => void }) {
     const t = useTranslations('Forum')
     const user = useUserStore(state => state.user)
     const [content, setContent] = useState('')
     const [isLoading, setIsLoading] = useState(false)
     const [isOpen, setIsOpen] = useState(false)
     const [showLoginDialog, setShowLoginDialog] = useState(false)
     const { createComment } = useCreateComment()
     const { data: commentsData, isLoading: isLoadingComments } = useComments(postId, isOpen)

     const organizedComments = useMemo(() => {
          if (!commentsData?.data?.comments) return []

          const comments = commentsData.data.comments
          const commentMap = new Map<string, CommentResponseType>()
          const rootComments: CommentResponseType[] = []

          // Build comment map and tree structure
          comments.forEach((comment: CommentResponseType) => {
               commentMap.set(comment.id, { ...comment, replies: [] })
          })

          comments.forEach((comment: CommentResponseType) => {
               const commentWithReplies = commentMap.get(comment.id)!
               if (comment.parentId) {
                    const parent = commentMap.get(comment.parentId)
                    if (parent) {
                         if (!parent.replies) parent.replies = []
                         parent.replies.push(commentWithReplies)
                    }
               } else {
                    rootComments.push(commentWithReplies)
               }
          })

          // Sort: root comments newest first, replies oldest first
          rootComments.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
          rootComments.forEach(root => {
               root.replies?.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
          })

          return rootComments
     }, [commentsData])

     const handleCreateComment = async () => {
          if (!content.trim()) return

          setIsLoading(true)
          try {
               await createComment(postId, content, null)
               setContent('')
               handleUpdateCommentCount(1)
          } catch (error) {
               console.error('Error creating comment:', error)
          } finally {
               setIsLoading(false)
          }
     }

     const handleTriggerClick = () => {
          if (!user) {
               setShowLoginDialog(true)
               return
          }
          setIsOpen(true)
     }

     return (
          <>
               <div onClick={handleTriggerClick}>
                    {children}
               </div>

               <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogContent className="w-[calc(100vw-1rem)] sm:w-[90vw] md:w-[750px] h-[90vh] sm:h-[85vh] md:h-[95%] max-w-[750px] p-3 sm:p-4 md:p-6 flex flex-col">
                         <DialogHeader className="shrink-0 space-y-1 sm:space-y-2">
                              <DialogTitle className="text-base sm:text-lg">{t('comment')} ({commentsData?.data?.count || 0})</DialogTitle>
                              <DialogDescription className="text-xs sm:text-sm">
                                   {t('shareYourComment')}
                              </DialogDescription>

                         </DialogHeader>
                         <div
                              className="pr-1 sm:pr-2 flex-1 overflow-y-auto
                              [&::-webkit-scrollbar]:w-1
                              hover:[&::-webkit-scrollbar]:w-1
                              [&::-webkit-scrollbar-track]:bg-transparent
                              [&::-webkit-scrollbar-thumb]:bg-gray-400/0
                              hover:[&::-webkit-scrollbar-thumb]:bg-gray-400
                              [&::-webkit-scrollbar-thumb]:rounded-full
                              transition-colors
                              duration-300"
                         >
                              {isLoadingComments ? (
                                   <div className="space-y-4 p-2">
                                        {[1, 2, 3].map((i) => (
                                             <div key={i} className="flex gap-3">
                                                  <Skeleton className="h-10 w-10 rounded-full shrink-0" />
                                                  <div className="flex-1 space-y-2">
                                                       <Skeleton className="h-4 w-24" />
                                                       <Skeleton className="h-16 w-full rounded-2xl" />
                                                  </div>
                                             </div>
                                        ))}
                                   </div>
                              ) : organizedComments.length > 0 ? (
                                   organizedComments.map((comment: CommentResponseType) => (
                                        <Comment
                                             key={comment.id}
                                             data={comment}
                                             postId={postId}
                                             onDelete={() => handleUpdateCommentCount(-1)}
                                             onCommentCreated={() => handleUpdateCommentCount(1)}
                                             allComments={commentsData?.data?.comments || []}
                                        />
                                   ))
                              ) : (
                                   <div className="text-center py-8 text-muted-foreground text-xs sm:text-sm">
                                        {t('noComments')}
                                   </div>
                              )}
                         </div>
                         <InputGroup className="h-10 sm:h-11 md:h-12 shrink-0">
                              <InputGroupInput
                                   placeholder={`${t('shareYourComment')}...`}
                                   value={content}
                                   onChange={(e) => setContent(e.target.value)}
                                   onKeyDown={(e) => {
                                        if (e.key === 'Enter' && !e.shiftKey) {
                                             e.preventDefault()
                                             handleCreateComment()
                                        }
                                   }}
                                   className="text-xs sm:text-sm"
                              />
                              <InputGroupAddon className="hidden sm:flex">
                                   <Avatar className="h-8 w-8 sm:h-9 sm:w-9">
                                        <AvatarImage src={user?.user_metadata.avatar_url} />
                                        <AvatarFallback className="text-xs">CN</AvatarFallback>
                                   </Avatar>
                              </InputGroupAddon>
                              <InputGroupAddon align="inline-end">
                                   <Button
                                        onClick={handleCreateComment}
                                        disabled={isLoading || !content.trim()}
                                        size="sm"
                                        className="h-8 sm:h-9 w-8 sm:w-9 p-0"
                                   >
                                        <Send className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                                   </Button>
                              </InputGroupAddon>
                         </InputGroup>
                    </DialogContent>
               </Dialog>

               <LoginRequiredDialog
                    open={showLoginDialog}
                    onOpenChange={setShowLoginDialog}
                    title="Login Required"
                    description="You need to be logged in to comment on this post. Please login to continue."
               />
          </>
     )
}
