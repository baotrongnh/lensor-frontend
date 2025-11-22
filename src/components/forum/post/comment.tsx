import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Trash2, Send, CornerDownRight } from 'lucide-react'
import { CommentResponseType } from '@/types/post'
import { formatDistanceToNow } from 'date-fns'
import { useState } from 'react'
import { useUserStore } from '@/stores/user-store'
import { useCreateComment } from '@/lib/hooks/usePostHooks'
import { postApi } from '@/lib/apis/postApi'
import { endpoints } from '@/lib/apis/endpoints'
import { toast } from 'sonner'
import { useSWRConfig } from 'swr'
import {
     AlertDialog,
     AlertDialogAction,
     AlertDialogCancel,
     AlertDialogContent,
     AlertDialogDescription,
     AlertDialogFooter,
     AlertDialogHeader,
     AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface CommentProps {
     data: CommentResponseType
     postId: string
     onDelete?: () => void
     onCommentCreated?: () => void
     allComments?: CommentResponseType[]
     isReply?: boolean
}

const INITIAL_REPLIES_SHOWN = 2

export default function Comment({ data, postId, onDelete, onCommentCreated, allComments = [], isReply = false }: CommentProps) {
     const user = useUserStore(state => state.user)
     const { mutate } = useSWRConfig()
     const { createComment } = useCreateComment()

     const [showReplyInput, setShowReplyInput] = useState(false)
     const [replyContent, setReplyContent] = useState('')
     const [isSubmitting, setIsSubmitting] = useState(false)
     const [showDeleteDialog, setShowDeleteDialog] = useState(false)
     const [isDeleting, setIsDeleting] = useState(false)
     const [showAllReplies, setShowAllReplies] = useState(false)

     const isOwner = user?.id === data.userId
     const parentComment = data.parentId ? allComments.find(c => c.id === data.parentId) : null
     const replies = data.replies || []
     const visibleReplies = showAllReplies ? replies : replies.slice(0, INITIAL_REPLIES_SHOWN)
     const hiddenRepliesCount = replies.length - INITIAL_REPLIES_SHOWN

     const handleReply = async () => {
          if (!replyContent.trim()) return

          setIsSubmitting(true)
          try {
               const rootParentId = data.parentId || data.id
               await createComment(postId, replyContent, rootParentId)
               setReplyContent('')
               setShowReplyInput(false)
               toast.success('Reply posted successfully')
               onCommentCreated?.()
          } catch (error) {
               console.error('Error creating reply:', error)
               toast.error('Failed to post reply')
          } finally {
               setIsSubmitting(false)
          }
     }

     const handleDeleteConfirm = async () => {
          setIsDeleting(true)
          try {
               await postApi.deleteComment(postId, data.id)
               await mutate(endpoints.comment.byPostId(postId))
               toast.success('Comment deleted successfully')
               onDelete?.()
          } catch (error) {
               console.error('Error deleting comment:', error)
               toast.error('Failed to delete comment')
          } finally {
               setIsDeleting(false)
               setShowDeleteDialog(false)
          }
     }

     return (
          <div>
               <div className="flex gap-2 sm:gap-3 mt-3 sm:mt-4">
                    <Avatar className="h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 shrink-0">
                         <AvatarImage src={data.user.avatarUrl} />
                         <AvatarFallback className="text-xs sm:text-sm">
                              {data.user.name[0]?.toUpperCase()}
                         </AvatarFallback>
                    </Avatar>

                    <div className="flex-1 min-w-0">
                         <div className="bg-muted/50 rounded-2xl px-3 sm:px-4 py-2 sm:py-2.5">
                              <div className="flex items-center justify-between gap-2 mb-1">
                                   <div className="flex items-center gap-2 flex-wrap">
                                        <span className="font-semibold text-xs sm:text-sm md:text-base">{data.user.name}</span>
                                        <span className="text-muted-foreground text-[10px] sm:text-xs">
                                             {formatDistanceToNow(new Date(data.createdAt), { addSuffix: true })}
                                        </span>
                                   </div>

                                   {isOwner && (
                                        <Button
                                             variant="ghost"
                                             size="sm"
                                             onClick={() => setShowDeleteDialog(true)}
                                             className="h-6 w-6 sm:h-7 sm:w-7 p-0 hover:bg-destructive/10 hover:text-destructive shrink-0"
                                        >
                                             <Trash2 className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                                        </Button>
                                   )}
                              </div>

                              {parentComment && isReply && (
                                   <div className="flex items-center gap-1 mb-1.5 text-[10px] sm:text-xs text-muted-foreground">
                                        <CornerDownRight className="h-3 w-3" />
                                        <span>Reply to</span>
                                        <span className="font-semibold text-primary">@{parentComment.user.name}</span>
                                   </div>
                              )}

                              <p className="leading-5 sm:leading-6 text-xs sm:text-sm md:text-base break-words">
                                   {data.content}
                              </p>
                         </div>

                         <div className="flex items-center gap-1 sm:gap-2 mt-1.5 sm:mt-2 ml-2">
                              {user && (
                                   <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => setShowReplyInput(!showReplyInput)}
                                        className="h-6 sm:h-7 text-[10px] sm:text-xs px-2 sm:px-3 text-muted-foreground hover:text-foreground"
                                   >
                                        Reply
                                   </Button>
                              )}
                         </div>

                         {showReplyInput && (
                              <div className="mt-2 sm:mt-3 flex gap-2 items-start ml-2">
                                   <Avatar className="h-7 w-7 sm:h-8 sm:w-8 shrink-0">
                                        <AvatarImage src={user?.user_metadata.avatar_url} />
                                        <AvatarFallback className="text-xs">{user?.user_metadata.name?.[0]?.toUpperCase()}</AvatarFallback>
                                   </Avatar>
                                   <Input
                                        value={replyContent}
                                        onChange={(e) => setReplyContent(e.target.value)}
                                        placeholder={`Reply to ${data.user.name}...`}
                                        onKeyDown={(e) => {
                                             if (e.key === 'Enter' && !e.shiftKey) {
                                                  e.preventDefault()
                                                  handleReply()
                                             }
                                             if (e.key === 'Escape') {
                                                  setShowReplyInput(false)
                                                  setReplyContent('')
                                             }
                                        }}
                                        disabled={isSubmitting}
                                        className="flex-1 h-8 sm:h-9 text-xs sm:text-sm"
                                        autoFocus
                                   />
                                   <Button
                                        size="sm"
                                        onClick={handleReply}
                                        disabled={isSubmitting || !replyContent.trim()}
                                        className="h-8 sm:h-9 px-2 sm:px-3"
                                   >
                                        <Send className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                                   </Button>
                              </div>
                         )}

                         {!isReply && replies.length > 0 && (
                              <div className="mt-2 sm:mt-3 ml-2 sm:ml-3 md:ml-4 pl-3 sm:pl-4 border-l-2 border-muted space-y-0">
                                   {visibleReplies.map((reply) => (
                                        <Comment
                                             key={reply.id}
                                             data={reply}
                                             postId={postId}
                                             onDelete={onDelete}
                                             onCommentCreated={onCommentCreated}
                                             allComments={allComments}
                                             isReply={true}
                                        />
                                   ))}

                                   {!showAllReplies && hiddenRepliesCount > 0 && (
                                        <Button
                                             variant="ghost"
                                             size="sm"
                                             onClick={() => setShowAllReplies(true)}
                                             className="h-7 sm:h-8 text-[10px] sm:text-xs text-muted-foreground hover:text-foreground mt-2 px-2"
                                        >
                                             <CornerDownRight className="h-3 w-3 mr-1" />
                                             Show {hiddenRepliesCount} more {hiddenRepliesCount === 1 ? 'reply' : 'replies'}
                                        </Button>
                                   )}
                              </div>
                         )}
                    </div>
               </div>

               <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                    <AlertDialogContent className="max-w-[90vw] sm:max-w-md">
                         <AlertDialogHeader>
                              <AlertDialogTitle className="text-base sm:text-lg">Delete Comment</AlertDialogTitle>
                              <AlertDialogDescription className="text-xs sm:text-sm">
                                   Are you sure you want to delete this comment? This action cannot be undone.
                              </AlertDialogDescription>
                         </AlertDialogHeader>
                         <AlertDialogFooter className="gap-2 sm:gap-0">
                              <AlertDialogCancel disabled={isDeleting} className="h-9 text-xs sm:text-sm">
                                   Cancel
                              </AlertDialogCancel>
                              <AlertDialogAction
                                   onClick={handleDeleteConfirm}
                                   disabled={isDeleting}
                                   className="h-9 text-xs sm:text-sm bg-destructive hover:bg-destructive/90"
                              >
                                   {isDeleting ? 'Deleting...' : 'Delete'}
                              </AlertDialogAction>
                         </AlertDialogFooter>
                    </AlertDialogContent>
               </AlertDialog>
          </div>
     )
}
