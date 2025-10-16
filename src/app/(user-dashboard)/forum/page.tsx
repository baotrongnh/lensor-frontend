"use client"

import { usePosts } from '@/lib/hooks/usePostHooks'
import { PostType } from '@/types/post'
import { Divider } from '@mantine/core'
import Post from '../../../components/forum/post'

export default function ForumPage() {
     const { data: dataForum } = usePosts()
     console.log(dataForum);

     return (
          <div className='w-150 mx-auto'>
               {dataForum?.data?.map((post: PostType, index: string) =>
                    <div key={index}>
                         <Post
                              dataPost={post}
                         />
                         {index + 1 < dataForum.length && <Divider />}
                    </div>
               )}
          </div>
     )
}
