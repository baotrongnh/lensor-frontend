import { ActionIcon, Button, Image } from '@mantine/core'
import { MdOutlineMessage } from 'react-icons/md'
import ProfileContent from './(profile-content)/profile-content'
import About from './about'

export default function ProfilePage() {

     return (
          <div className='container mx-auto p-5'>
               <div className='bg-[var(--color-box-inside)] rounded-md'>
                    <div className='relative'>
                         <Image src='/images/cover_photo.png' />
                         <div className='absolute flex items-end bottom-[-90px] left-[10%]'>
                              <Image
                                   src='/images/avatar_test.jpg'
                                   w={180}
                                   h={180}
                                   radius={100}
                                   className='border-2'
                              />
                              <span className='text-3xl font-bold mb-5'>Trúc Phương</span>
                         </div>
                    </div>
                    <div className='h-30 flex justify-end items-center gap-5 px-20'>
                         <ActionIcon className='rounded' radius='xl' size='xl'>
                              <MdOutlineMessage className='pt-0.5' size={29} />
                         </ActionIcon>
                         <Button size='md'><span className='w-29'>Follow</span></Button>
                         <Button size='md' variant='default'><span className='w-29'>Go to portfolio</span></Button>
                    </div>
               </div>

               <div className='grid grid-cols-4 h-20 gap-5 mt-5'>
                    <div className='bg-[var(--color-box-inside)] rounded-md'>
                         <About />
                    </div>
                    <div className='col-span-2 bg-[var(--color-box-inside)] rounded-md p-4'>
                         <ProfileContent />
                    </div>
                    <div className='bg-[var(--color-box-inside)] rounded-md'></div>
               </div>
          </div>
     )
}
