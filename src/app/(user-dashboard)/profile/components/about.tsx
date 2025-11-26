import { useUserStore } from '@/stores/user-store';
import { CircleCheckBig, Mail } from 'lucide-react';

export default function About() {
  const user = useUserStore(state => state.user)

  const joinDate = user?.created_at;

  const formattedJoinDate = joinDate
    ? new Date(joinDate).toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
    : ''

  return (
    <div className='flex flex-col h-auto py-4 px-8 pt-0'>
      <h3 className='font-bold text-2xl mb-10'>About me</h3>
      <div className='flex flex-col gap-2'>
        <div className='flex justify-start items-start gap-2'>
          <CircleCheckBig className='flex-shrink-0' />
          <h4 className='text-md'>Joined on {formattedJoinDate}</h4>
        </div>
        <div className='border-t border-grey/10 my-3' />
        <div className='flex justify-start items-start gap-2 mb-4'>
          <Mail className='flex-shrink-0' />
          <h4 className='text-md'>{user?.email}</h4>
        </div>
      </div>
    </div>
  )
}
