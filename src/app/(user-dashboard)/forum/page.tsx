"use client"

import Post from '@/components/forum/post'
import { usePosts } from '@/lib/hooks/usePostHooks'
import { PostType } from '@/types/post'

export default function ForumPage() {
     const { data: dataForum, isLoading } = usePosts()

     return (
          <div className='w-150 my-5 mx-auto'>
               {dataForum?.data?.map((post: PostType, index: string) =>
                    <div key={index}>
                         <Post
                              dataPost={post}
                         />
                         {index + 1 < dataForum?.data.length && <hr className="solid" />}
                    </div>
               )}
          </div>
     )
}
