import forum from '@/data-test/forum.json'
import { Divider } from '@mantine/core'
import Post from '../../../components/forum/post'

export default function ForumPage() {
     const { data: dataForum } = forum

     return (
          <div className='w-150 mx-auto'>
               {dataForum?.map((post, index) =>
                    <div key={index}>
                         <Post
                              id={post.id}
                              user={post.user}
                              time={post.createdAt}
                              title={post.title}
                              content={post.content}
                              imageUrl={post.imageUrl}
                              commentCount={post.commentCount}
                         />
                         {index + 1 < dataForum.length && <Divider />}
                    </div>
               )}
          </div>
     )
}
